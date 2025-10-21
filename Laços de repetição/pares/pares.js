let num = Number(prompt("Digite um número:"));
let pares = 0;
let lista = "";

for (let i = 1; i <= num; i++) {
  if (i % 2 === 0) {
    pares++;
    lista += i + ", ";
  }
}

if (pares === 0) {
  console.log(`Não existem números pares entre 1 e ${num}.`);
} else if (pares === 1) {
  console.log(`Entre 1 e ${num} existe 1 número par: ${lista.slice(0, -2)}.`);
} else {
  console.log(`Entre 1 e ${num} existem ${pares} números pares: ${lista.slice(0, -2)}.`);
}