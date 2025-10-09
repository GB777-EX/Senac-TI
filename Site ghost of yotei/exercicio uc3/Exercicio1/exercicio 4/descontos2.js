/*Elabore um programa para calcular quanto será pago por um produto,
 sendo que o preço do produto e o valor de desconto são fornecidos pelo usuário (em reais).
  Apresentar o valor a ser pago pelo produto.*/

  // Declaração de variaveis
  var valor;
  var desconto;
  var resultado;
    //Entrada de dados
  var valor = prompt ("digite o valor em reais");
  var desconto = prompt ("Digite o valor do descontos ");
    // Filtragem de dados
  var valor = Number (valor);
  var desconto = Number (desconto);

  desconto = valor * desconto/100;

  resultado = valor - desconto;
//Saída de dados
  alert (`o valor final será ${resultado}`);

