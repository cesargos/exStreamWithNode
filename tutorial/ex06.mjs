
// USANDO SOCKET -> DUPLEX STREAM 

import net from 'net'
net
  .createServer(socket => socket.pipe(process.stdout))
  .listen(1338)

// 1 - rode ele num terminal usando node ex06.mjs
// 2 - rode alguem para conectar no socket
//    node -e "process.stdin.pipe(require('net').connect(1338))"

// vc vai conectar o seu terminal no socket e tudo o que vc digitar vai imprimir no servidor