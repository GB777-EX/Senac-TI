/*Elabore um programa para calcular a área de uma sala,
 sendo que os comprimentos das paredes são fornecidos pelo usuário.
  Apresente a área depois de calculada.*/
  
  //declaração de variaveis
  var ladoA;
  var ladoB;
  var areaSala;
  //entrada de dados
  var ladoA = prompt ("digite o tamanho do lado A");
  var ladoB = prompt ("digite o tamanho do lado B");
    //FILTRAGEM DE INFORMAÇÕES
  var ladoA = Number (ladoA);
  var ladoB = Number (ladoB);
   areaSala = ladoA * ladoB;
//saida de dados
alert(`A área da sala é ${areaSala} m²`);
