var aresta
var volume
var catetoA
var catetoB
var HipotenusaC
var HipotenusaD

var aresta = prompt ("digite o valor da aresta")
var catetoA = prompt ("digite o valor do cateto A")
var catetoB = prompt ("digite o valor do cateto B")

volume = Math.pow (aresta, 3)
HipotenusaC = Math.pow(catetoA,2) + Math.pow(catetoB,2)
HipotenusaD = Math.sqrt (HipotenusaC)


alert (`a area do cubo é igual à ${volume}`)
alert (`O resultado do teorema de pitagoras será:${HipotenusaD}m²`)



