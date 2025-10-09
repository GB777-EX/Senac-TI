/*Elabore um programa em JavaScript que realize as quatro operações 
básicas da matemática (soma, subtração, multiplicação e divisão) com 
base em dois números inteiros fornecidos pelo usuário.*/

//Declaração de variaveis 
var valor1
var valor2
var soma
var subtração
var multiplicação
var divisão

//Entrada de dados 
 var valor1 = prompt ("Digite o valor")
 var valor2 = prompt ("Digite o valor")

 //Filtragem de dados
 var valor1 = Number (valor1)
 var valor2 = Number (valor2)

 soma = valor1 + valor2
 subtração = valor1 - valor2
 multiplicação = valor1 * valor2
 divisão = valor1/valor2

 //Saída de dados

 alert(`a soma é igual á ${soma}`)
 alert(`a subtração é igual á ${subtração}`)
 alert(`a multiplicação é igual á ${multiplicação}`)
 alert(`a divisão é igual á ${divisão}`)