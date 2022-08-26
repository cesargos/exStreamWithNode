/* 
CRIANDO NOSSO WRITABLE
*/

import { pipeline, Readable, Writable, Transform } from 'stream'
import { promisify } from 'util'

const pipelineAsync = promisify(pipeline)

// ele pode ser instanciado com 'new' (melhor) ou usado com o proprio construtor
{
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

  // callback é para ser usádo somente em stream. Ou seja so aqui é o lugar certo de se usar
  const writableStream = Writable({
    write(chunk, enconding, callback){
      // temos q usar o toStringo no chunk pois ele é um Buffer
      console.log('msg: ', chunk.toString());

      // usamos a função de callback para fazer ele ir para o proximo passo
      callback()
    }
  })

  // .on() => (colocado aqui) o readableStream tem todos os eventos q vimos .on("data/error/end/close",()=>{})
  await pipelineAsync(
    // para cada push dado no Readable(primeiro parametro) ele vai passar para 
    // o stdout (segundo parametro) como se tivesse sido quebrado em pedacinhos
    readableStream,
    //process.stdout
    writableStream
  )
  console.log('Processo 1  acabou!')

}

// TRABALHANDO COM TRANSFORMER
{

  const readableStream = Readable({
    read (){
      for( let index = 0; index < 1e5; index++){
        const person = {
          id: Date.now() + index, 
          name: `Cesar-${index}`
        }
        const data = JSON.stringify(person)
        this.push(data)
      }
      // avisa que acabaram os dados
      this.push(null)
    }
  })

  // não faz diferença ele vir antes ou depois do readableStream
  const writableMapToCSV = Transform({
    transform(chunk, enconding, callback){
      
      // para cada push vem um obj no caso a "data" que demos um stringify
      const data = JSON.parse(chunk)
      
      // vamos alterar os dados para se caracterisar um "Transform"
      const result = `${data.id},${data.name.toUpperCase()}\n`
      
      //quando usamos o callback na writableStream do exemplo anterior não passamos nada por ele pois era a ultima etapa
      callback(null, result) // padrão é <erro>, <sucesso>
    }
  })

  //agora vamos montar um transformer para deixar no jeito do CSV
  const setHeader = Transform({
    transform(chunk, enconding, cb){
      this.counter = this.counter ?? 0
      if ( this.counter ){
        return cb(null, chunk)
      }

      this.counter += 1
      // se for o primeiro acesso ele add a coluna
      cb(null, "id,name\n".concat(chunk))
    }
  })

  await pipelineAsync(
    readableStream,
    writableMapToCSV,
    setHeader,
    process.stdout
  )
  // .then(()=>{
  console.log('Processo acabou!')
  // })
}