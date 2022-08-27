import http from 'http'
import { readFileSync } from 'fs'


http.createServer((req, res) => {
  // Caso a gente não converta ele vai começar a passar o arquivo sobre demando. Disponibilizar como download
  const file = readFileSync('big.file')//.toString()
  res.write(file)
  res.end()
}).listen(3000, () => console.log('running at 3000'))

// Visto q estamos trabalhando com binario o curl vai dar erro e vai pedir para vc jogar para um arquivo 
// curl localhost:300 --output output.arqBinarioInlegivel

// vai funcionar da mesma maneira
/* USANDO READSTREAM AO INVES DO FS É MAIS PERFORMÁTICO, NATIVO E TE DA A OPÇÃO DE USAR O PIPE E ASSIM PROCESSAR SOB DEMANDA
http.createServer((req, res) => {
  createReadStream('big.file')
    .pipe(res)
}).listen(3000, () => console.log('running at 3000'))
*/