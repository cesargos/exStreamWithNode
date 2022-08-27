/* 
O pipe() usado anteriormente (ex06.mjs) é perigoso pois se alguma etapa se perder 
dentro do processo como é um pipe por padrão ele não consegue manipular todos
 os erros e por causa disso temos vazamento de memoria

Para resolver isso o nodejs tem o modulo pipeline dentro de stream
Ele funciona da mesma maneira do pipe porem trabalha com callback 
que não é legal de se trabalhar por isso é legal converter ele para 
uma promise para podermos usar o AWAIT 
*/

import { pipeline, Readable } from 'stream'
import { promisify } from 'util'

const pipelineAsync = promisify(pipeline)

// ele pode ser instanciado com 'new' (melhor) ou usado com o proprio construtor
const readableStream = Readable({
  // usamos function e não arrowFunc pois precisaremos usar o this (a menos q queira passar o bind)
  read: function (){
    this.push('Hi x 1')
    this.push('Hi x 2')
    this.push('Hi x 3')
    this.push('Hi x 4')
    this.push('Hi x 5')
    this.push('Hi x 6')
    this.push('Hi x 7')
    this.push('Hi x 8')
    this.push('Hi x 9')
    this.push('Hi x 10')
    // a gente passa o null para ele entender e encerrar a comunicação
    this.push(null)
  }
  // por padrão não montamos o readable na "unha" assim mas é para entender
})
.on('data', () => console.log('')) // o proprio console.lod da quebra de linha
// .on() => (colocado aqui) o readableStream tem todos os eventos q vimos .on("data/error/end/close",()=>{})
pipelineAsync(
  // para cada push dado no Readable(primeiro parametro) ele vai passar para 
  // o stdout (segundo parametro) como se tivesse sido quebrado em pedacinhos
  readableStream,
  process.stdout // o stdout é um writable 
)
