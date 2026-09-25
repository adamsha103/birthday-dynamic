const fs = require('fs');
const path = require('path');

// 44.1kHz 16-bit Stereo WAV Generator
const SAMPLE_RATE = 44100;

// Note frequencies (Hz)
const N = {
  REST: 0,
  C4: 261.63,
  CS4: 277.18,
  D4: 293.66,
  DS4: 311.13,
  E4: 329.63,
  F4: 349.23,
  FS4: 369.99,
  G4: 392.00,
  GS4: 415.30,
  A4: 440.00,
  AS4: 466.16,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
};

// Happy Birthday Tune sequence: [note, duration_beats]
const bpm = 110;
const beatSec = 60 / bpm;

const melody = [
  // Verse 1
  [N.C4, 0.75], [N.C4, 0.25], [N.D4, 1.0], [N.C4, 1.0], [N.F4, 1.0], [N.E4, 2.0],
  [N.REST, 0.5],
  [N.C4, 0.75], [N.C4, 0.25], [N.D4, 1.0], [N.C4, 1.0], [N.G4, 1.0], [N.F4, 2.0],
  [N.REST, 0.5],
  [N.C4, 0.75], [N.C4, 0.25], [N.C5, 1.0], [N.A4, 1.0], [N.F4, 1.0], [N.E4, 1.0], [N.D4, 2.0],
  [N.REST, 0.5],
  [N.AS4, 0.75], [N.AS4, 0.25], [N.A4, 1.0], [N.F4, 1.0], [N.G4, 1.0], [N.F4, 2.5],
  [N.REST, 1.0]
];

// Calculate total samples
let totalDurationBeats = 0;
melody.forEach(([_, beats]) => totalDurationBeats += beats);
const totalSamples = Math.ceil(totalDurationBeats * beatSec * SAMPLE_RATE);

// Left & Right sample channels
const leftChannel = new Float32Array(totalSamples);
const rightChannel = new Float32Array(totalSamples);

let currentSample = 0;

function addSynthNote(freq, startSample, durationSamples, left, right) {
  if (freq === 0) return;

  for (let i = 0; i < durationSamples; i++) {
    const idx = startSample + i;
    if (idx >= left.length) break;

    const t = i / SAMPLE_RATE;
    const durSec = durationSamples / SAMPLE_RATE;

    // ADSR envelope
    let env = 0;
    const attack = 0.02;
    const decay = 0.3;
    const sustain = 0.6;
    const release = 0.3;

    if (t < attack) {
      env = t / attack;
    } else if (t < attack + decay) {
      env = 1.0 - (1.0 - sustain) * ((t - attack) / decay);
    } else if (t < durSec - release) {
      env = sustain * Math.exp(-1.5 * (t - attack - decay));
    } else {
      const relStart = durSec - release;
      env = sustain * Math.exp(-1.5 * (relStart - attack - decay)) * (1.0 - (t - relStart) / release);
    }
    if (env < 0) env = 0;

    // Rich Piano/Music-box Tone with Harmonics (Fundamental + Overtones)
    const fundamental = Math.sin(2 * Math.PI * freq * t);
    const overtone2 = 0.5 * Math.sin(2 * Math.PI * freq * 2 * t);
    const overtone3 = 0.25 * Math.sin(2 * Math.PI * freq * 3 * t);
    const overtone4 = 0.12 * Math.sin(2 * Math.PI * freq * 4 * t);

    // Warm stereo shimmer
    const shimmerL = Math.sin(2 * Math.PI * 0.5 * t);
    const shimmerR = Math.cos(2 * Math.PI * 0.5 * t);

    const rawSignal = (fundamental + overtone2 + overtone3 + overtone4) * env * 0.25;

    left[idx] += rawSignal * (0.85 + 0.15 * shimmerL);
    right[idx] += rawSignal * (0.85 + 0.15 * shimmerR);
  }
}

// Render melody to audio buffer
melody.forEach(([freq, beats]) => {
  const durSec = beats * beatSec;
  const durSamples = Math.floor(durSec * SAMPLE_RATE);
  addSynthNote(freq, currentSample, durSamples, leftChannel, rightChannel);
  
  // Harmony chord note (3rd below/above for lush sound)
  if (freq !== 0) {
    const harmonyFreq = freq * 1.25; // Major 3rd
    addSynthNote(harmonyFreq, currentSample, Math.floor(durSamples * 0.8), leftChannel, rightChannel);
  }

  currentSample += durSamples;
});

// Create 16-bit PCM Stereo WAV Buffer
const numChannels = 2;
const bytesPerSample = 2;
const blockAlign = numChannels * bytesPerSample;
const byteRate = SAMPLE_RATE * blockAlign;
const dataSize = totalSamples * blockAlign;
const headerSize = 44;
const totalSize = headerSize + dataSize;

const buffer = Buffer.alloc(totalSize);

// RIFF header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(totalSize - 8, 4);
buffer.write('WAVE', 8);

// fmt chunk
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(SAMPLE_RATE, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34); // BitsPerSample

// data chunk
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

// Write 16-bit interleaved PCM samples
let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  // Clamp samples
  let l = Math.max(-1, Math.min(1, leftChannel[i]));
  let r = Math.max(-1, Math.min(1, rightChannel[i]));

  const intL = l < 0 ? Math.floor(l * 32768) : Math.floor(l * 32767);
  const intR = r < 0 ? Math.floor(r * 32768) : Math.floor(r * 32767);

  buffer.writeInt16LE(intL, offset);
  buffer.writeInt16LE(intR, offset + 2);
  offset += 4;
}

const outDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outFile = path.join(outDir, 'birthday_tune.wav');
fs.writeFileSync(outFile, buffer);
console.log('Successfully generated high-quality birthday audio tune at:', outFile, '(' + (buffer.length / 1024).toFixed(1) + ' KB)');
