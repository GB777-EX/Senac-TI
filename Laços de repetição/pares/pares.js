let num = prompt("Digite um número:");
let pares = 0;
let texto 
let fim


if (num==2) {
    texto = "Não existem números pares entre 0 e 2";
} else {   
}
if (pares % 2 == 1) {
    pares = pares/2 
    }else{
        pares = (pares/2) - 1;
} 

pares = Math.floor(pares,0);
if (num ==1) {
    texto = `entre 0 e ${num} existe ${pares} numero par que é: ${cont}`;
}else{
    texto = `entre 0 e ${num} existem ${pares} numeros pares e são: ${cont}`;
} 
console.log(texto);
 
for (i=2; i < num; i+=2) {
    if (i== num - 1 || i == num - 2) {
        fim = ".";
    } else {
        fim = ", ";
    }
    console.log(i + fim);
}    