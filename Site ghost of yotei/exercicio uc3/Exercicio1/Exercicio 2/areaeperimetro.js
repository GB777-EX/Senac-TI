/*Elabore um programa para calcular a área e o perímetro de uma sala,
 sendo que os comprimentos são fornecidos pelo usuário.
  Apresente a área e o perímetro depois de calculados.*/

  //Declaração de dados
   var ladoA
  var ladoB
  
  var areaSala
  var perímetro
  //entrada de dados
  var ladoA = prompt ("digite o tamanho do lado A")
  var ladoB = prompt ("digite o tamanho do lado B")
  

    //FILTRAGEM DE INFORMAÇÕES
  var ladoA = Number (ladoA)
  var ladoB = Number (ladoB)
  

   areaSala = ladoA * ladoB
   perímetro = ladoA + ladoB * 2

//saida de dados
alert(`A área da sala é ${areaSala} m²`)
alert(`O perimetro da sala é ${perímetro}cm`)