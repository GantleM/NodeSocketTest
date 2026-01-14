const WebSocket = require('ws');

const server = new WebSocket.Server({
  port: 8080,
  host: '0.0.0.0'
});

server.on('connection', socket => {
  console.log('Client connected');

  socket.on('close', () => {
    console.log(`Client disconnected: ${socket.name || 'unknown'}`);
  });

  socket.on('message', msg => {
    const data = JSON.parse(msg);

    if (data.type === 'introduce') {
      socket.name = data.name;
      console.log(`Client introduced as: ${socket.name}`);
      return;
    }

    socket.send(JSON.stringify({
      reply: `Message received from ${socket.name || 'unknown'}`
    }));
  });
});
