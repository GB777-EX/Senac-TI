// Desvio condicional
// == Comparação
// === Idêntico
// maior q > <Menor q/ <=  >=
// Negar algo !=   <>

var A = 1;
var B = 10;
var texto;

nota = 7

if (A != B) {
 texto = "verdadeiro"   
} else {
texto = "falso"    
}
alert(texto)

/*if (nota >= 7) {
    alert("Aprovado")
} else {alert("Reprovado")
}*/
alert(nota >= 7 ? "Aprovado": "Reprovado")