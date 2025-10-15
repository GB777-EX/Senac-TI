let valor_reais
let valor_dolar
let cotacao_dolar

valor_dolar = prompt("Digite a quantidade de dólares no cofre")
cotacao_dolar = prompt("Digite a cotação do dólar hoje")

valor_reais =Number(valor_dolar) *Number(cotacao_dolar)

alert(`seu dinheiro em Reais é R$${valor_reais .toFixed(2)}`)