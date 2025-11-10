let lista_frutas = []
//let lista1_frutas = Array()

function gerarSeisUnicos(min = 0, max = 100, count = 6) {
  if (count > (max - min + 1)) {;
  }
  const numeros = new Set();
  while (numeros.size < count) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    numeros.add(n);
  }
  return Array.from(numeros).sort((a, b) => a - b);
}

// Uso:
let numeros = gerarSeisUnicos();
console.log(numeros); 


let pessoa = []

let carros = Array()

carros['marca']= 'Volvo'
carros['modelo']= ['xc80', 'XC60','XC50']


pessoa['nome'] = 'Marcio';
pessoa['idade'] = 54;

//let lista1_frutas = Array('Banana','Maçã','Manga','Goiaba','Abacaxi' )
let lista1_frutas = Array('Banana','Maçã','Manga','Goiaba','Abacaxi' )

lista_frutas[1] = 'Banana'
lista_frutas[2] ='Maçã'
lista_frutas[3] ='Manga'
lista_frutas[4] = 'Goiaba'
lista_frutas[5] ='Abacaxi'

lista_frutas.push('Melancia')//coloca no final do vetor



//carros['modelo'].push('XC100'); // coloca no final do vetor
//carros['modelo'].unshift(); // coloca no inicio do vetor

//carros['modelo'].pop(); // remove do final
//carros['modelo'].shift(); // remove do inicio

console.log(lista_frutas)
console.log(lista1_frutas)

console.log(lista_frutas.length)
console.log(lista1_frutas.length)

console.log(pessoa);
console.log(pessoa.length);

console.log(lista_frutas[2])
console.log(lista1_frutas[3])
console.log(pessoa['nome'])

for(let i = 1; i <lista_frutas.length; i++){
    console.log(lista_frutas[i])
}
console.log(carros)

console.log(carros['marca']+' '+ carros['modelo'][1])

console.log(numeros.sort((a,b)=>a-b))

function ordenarNumeros (a,b){
    return a-b
}