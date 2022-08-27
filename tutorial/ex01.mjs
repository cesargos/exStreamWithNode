// no caso o stout que é o terminal é um writable Stream
// e o stdin readable stream
// agora dê um "node exemplo01.mjs e digite coisas para ver a magica acontecer
// ele não encerra pois para encerrar uma stream é necessário retornar null
process.stdin.pipe(process.stdout)

// assim ele vai replicar oo que vc digitar 


// visto que ele é um pipe vc pode usar os evento .on
// mas nesse caso do exemplo vc so vai conseguir pegar o "data"
.on('data', msg => console.log('data terminal', msg.toString()))
// .on('error')
// .on('end')
// .on('close')