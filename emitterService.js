const fs = require('fs');
const crypto = require('crypto');
const sha256 = require('sha256');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const intervalMs = 10; // Adjust this interval as needed
const minMessages = 0;
const maxMessages = 5;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomMessage() {
  const randomIndex = getRandomInt(0, data.length - 1);
  const { name, origin, destination } = data[randomIndex];

  const originalMessage = {
    name,
    origin,
    destination,
  };

  const secretKey = sha256(JSON.stringify(originalMessage));

  const sumCheckMessage = {
    ...originalMessage,
    secret_key: secretKey,
  };

  return sumCheckMessage;
}

function emitRandomMessages() {
  const numMessages = getRandomInt(minMessages, maxMessages);
   
  for (let i = 0; i < numMessages; i++) {
    const message = generateRandomMessage();
    // Encrypt and emit the message here
    console.log('sumCheckMessage:', message);
  }
}

setInterval(emitRandomMessages,intervalMs);
