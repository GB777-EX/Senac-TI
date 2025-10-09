/*Elabore um programa que solicite quatro partes de uma frase e as 
combine. O usuário digita o sujeito da frase (Ex: "O gato"). Depois o verbo
(Ex: "comeu"). E o complemento (Ex: "o rato"). Por fim deve solicitar o 
pontoFinal (exclamação, ponto final, interrogação, entre outros...) Ao final 
exibir: O gato comeu o rato!*/

//declaração de dados
var sujeito
var verbo
var complemento
var pontoFinal
var resultado

//Entrada de dados

var sujeito = prompt ("digite o sujeito de uma frase (Ex: 'O gato')")
var verbo = prompt ("digite o verbo(Ex: 'comeu').")
var complemento = prompt ("Digite o complemento (Ex: 'o rato').")
var pontoFinal = prompt ("Digite o pontoFinal (Ex: exclamação, ponto final, interrogação, entre outros...) ")


resultado = sujeito  +  verbo +  complemento +  pontoFinal

//Saída de dados
 alert (`Sua frase está pronta. aqui está: ${ sujeito } ${ verbo } ${complemento } ${ pontoFinal }`)
