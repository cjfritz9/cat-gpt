import http from 'http';
import https from 'https';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { app } from './app.js';
dotenv.config({ path: '.env.dev' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;
const server =
  process.env.NODE_ENV === 'development'
    ? https.createServer(
        {
          key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
          cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
        },
        app
      )
    : app

server.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});
