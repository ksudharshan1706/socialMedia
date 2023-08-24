// // server.js
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Handle socket.io events (like 'connection', 'message', etc.)
// io.on('connection', socket => {
//   console.log('User connected:', socket.id);

//   socket.on('message', message => {
//     // Broadcast the message to all connected clients
//     io.emit('message', message);
//   });
// }
// )
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io(); // Connect to the same server where your backend is hosted

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     socket.on('message', message => {
//       setMessages(prevMessages => [...prevMessages, message]);
//     });
//   }, []);

//   const sendMessage = () => {
//     if (newMessage.trim() !== '')
// {
//       socket.emit('message', newMessage);
//       setNewMessage('');
//     }
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index}>{message}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={e => setNewMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default App;
