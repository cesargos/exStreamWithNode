// podemos trabalhar com ele invertido 
// assim ele vai imprimir primeiro na tela o que esta no ON para ´so depois imprimir o que esta no stdout
// mas não é um boa pratica
const stdin = process.stdin
.on('data', msg => console.log('data terminal', msg.toString()))

stdin.pipe(process.stdout)
// .on('error')
// .on('end')
// .on('close')