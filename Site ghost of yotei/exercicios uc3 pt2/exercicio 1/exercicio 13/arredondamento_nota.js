let notaA
let notaB
let notaC
let media

notaA = prompt("Digite sua primeira nota")
notaB = prompt("Digite sua segunda nota ")
notaC = prompt("Digite sua terceira nota")

media=Math.round(( Number(notaA) + Number(notaB) + Number(notaC)) / 3)

alert (`sua nota final é ${media}`)

