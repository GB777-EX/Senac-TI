/*Elabore um programa para calcular o valor monetário do desconto,
 sendo que o preço do produto é fornecido pelo usuário e o desconto é de 5% = 5 dividido por 100.
  Apresentar o valor do desconto*/

//declaração de dados

var valor
var resultado
var desconto
//Entrada de dados
var valor = prompt("Digite o valor")
//Filtragem de dados
var valor = Number(valor)
var desconto = Number(desconto)
desconto = valor * (5/100)
resultado = valor - desconto
 //Saída de dados
alert (`o valor monetário será de ${resultado} R$`)




