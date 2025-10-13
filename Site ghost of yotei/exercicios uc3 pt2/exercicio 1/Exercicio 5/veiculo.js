var distanciapercorrida
var consumomédio
var litros

var distanciapercorrida = prompt ("digite a distancia percorrida (em km)")
var consumomédio = prompt ("digite o consumo médio do veiculo (km por litro)")

litros = distanciapercorrida/ consumomédio
alert (`Para percorrer ${distanciapercorrida} km, foram necessários 
${litros} litros de combustível.`)