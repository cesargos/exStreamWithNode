// fazendo ele ignorar a entrada e redirecionar para a saida
const stdin = process.stdin
  .on('data', msg => console.log('entrada terminal', msg.toString()))

const stdout = process.stdout
  .on('data', msg => console.log('saida terminal', msg.toString()))

// com o pipe pegamos o evento que estava em stdin e jogamos para o stout
stdin.pipe(stdout)
// .on('error')
// .on('end')
// .on('close')