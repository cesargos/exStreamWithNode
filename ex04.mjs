
// RODE: (-e means evóla)
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
// vamos escrever uma strig usando o writable
// vamos jogar o que agente gerou no arquivo big.file
// 1e9 é 1*10^9 de bytes a serem gerados pelo crypto
import http from 'http'
import { readFileSync } from 'fs'

// agora nossa api quer retornar esse arquivo
http.createServer((req, res) => {
  const file = readFileSync('big.file').toString()
  res.write(file)
  res.end()
}).listen(3000, () => console.log('running at 3000'))

// 1 - rode o projeto em um terminal "node ex04.mjs"
// 2 - rode no segundo terminal 
//    curl localhost:3000


// vai dar erro pois a string é muito grande 
// 1 - Error: Cannot create a string longer then 0x1fffffffffffe8 characters
// 2 - curl: (52) Empty reply from server