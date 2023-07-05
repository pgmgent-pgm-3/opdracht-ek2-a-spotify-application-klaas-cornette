import fs from 'fs';
import path from 'path';
import { AudioContext } from 'web-audio-api';

export const playMusic = async (req, res) => {
  const id = req.params;
  const audioPlayer = document.getElementById(id.id);
  audioPlayer.play();

  //   try {
  //     // Read the audio file
  //     const audioData = await fs.promises.readFile('public/assets/sound/casual.mp3');

  //     // Create audio context
  //     const audioContext = new AudioContext();

  //     // Decode the audio data
  //     const audioBuffer = await new Promise((resolve, reject) => {
  //       audioContext.decodeAudioData(
  //         audioData,
  //         (decodedBuffer) => {
  //           resolve(decodedBuffer);
  //         },
  //         (error) => {
  //           reject(error);
  //         }
  //       );
  //     });

  //     // Create audio source node
  //     const audioSource = audioContext.createBufferSource();
  //     audioSource.buffer = audioBuffer;

  //     // Create audio nodes
  //     const gainNode = audioContext.createGain();
  //     const filterNode = audioContext.createBiquadFilter();
  //     const analyserNode = audioContext.createAnalyser();

  //     // Connect the audio nodes
  //     audioSource.connect(gainNode);
  //     gainNode.connect(filterNode);
  //     filterNode.connect(analyserNode);
  //     analyserNode.connect(audioContext.destination);

  //     // Set parameter values
  //     gainNode.gain.value = 0.5;
  //     filterNode.frequency.value = 1000;

  //     // Start playing the audio
  //     audioSource.start();

  //     // Handle completion or errors
  //     audioSource.onended = () => {
  //       console.log('Audio playback finished');
  //     };
  //     audioSource.onerror = (err) => {
  //       console.error('Error playing audio:', err);
  //       res.sendStatus(500);
  //     };
  //   } catch (err) {
  //     console.error('Error reading audio file:', err);
  //     res.sendStatus(500);
  //   }
};
