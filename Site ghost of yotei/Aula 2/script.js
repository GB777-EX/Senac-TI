//Declaração de variavel
var A;
var B;
var C;
//Entrada de dados
var A = prompt("crie um valor para o A")
var B = prompt("crie um valor para o B")


console.log(`O valor de A é ${A} e o valor de B é ${B}`)

var C=A;
A=B;
B=C;



console.log(`Invertido =O valor de A é ${A} e o valor de B é ${B}`)