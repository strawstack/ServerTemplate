import express from 'express';
import { createServer } from 'node:http';
import path from 'path';
import url from 'url';

// SOCKET
//import { Server } from 'socket.io';

// FIREBASE
//import { initializeApp } from "firebase/app";
//import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

// FIREBASE
//const io = new Server(server);
//const firebaseConfig = CONFIG_HERE;
//const firebase_app = initializeApp(firebaseConfig);
//const db = getFirestore(firebase_app);

app.get('/', (req, res) => {
    res.send("root");
});

app.get('/test', (req, res) => {
  res.send("test");
});

// SOCKET
/*
app.get('/socket', (req, res) => {
  res.sendFile(path.join(__dirname, '/socketio/index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    socket.broadcast.emit('message', `${socket.id} says: ${msg}`);
  });
}); */

// FIREBASE
/*
app.get('/add', async (req, res) => {
  await setDoc(doc(db, "test_collection_name", "test_key_name"), { value: "test value data" });
  res.send(`Document added.`);
});

app.get('/get', async (req, res) => {
  const docRef = doc(db, "test_collection_name", "test_key_name");
  const docSnap = await getDoc(docRef);
  res.send(`Document found: ${JSON.stringify(docSnap.data())}`);
});

app.get('/key', async (req, res) => {
  res.sendFile(path.join(__dirname, '/firebase/index.html'));
}); */

const port = 8080;
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
