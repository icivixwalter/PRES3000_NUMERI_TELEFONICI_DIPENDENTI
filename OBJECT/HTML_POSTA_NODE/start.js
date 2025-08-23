// start.js - avvia server e apre browser automaticamente

import { exec } from 'child_process';
import open from 'open';

// Avvia server
const server = exec('node server.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Errore server: ${error}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});

// Apri browser dopo un piccolo ritardo
setTimeout(() => {
  open('http://localhost:3000');
}, 1000);
