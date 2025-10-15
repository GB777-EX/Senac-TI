let val_principal
let taxa
let prazo_total
let taxaDecimal
let montante
let parcela
let juros

val_principal = prompt("Digite o valor principal do empréstimo")
taxa = prompt("Digite a taxa de juros mensal (em %)")
prazo_total = prompt("Digite o prazo total em meses")

taxaDecimal= taxa/100
montante = val_principal * Math.pow(1 + taxaDecimal, prazo_total)
parcela = montante / prazo_total
juros = montante - val_principal

alert (`Montante final: R$ ${montante.toFixed(2)}`)
alert (`Valor da parcela mensal: R$ ${parcela.toFixed(2)}`)
alert (`Valor total dos juros: R$ ${juros.toFixed(2)}`)
