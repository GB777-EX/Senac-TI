let numero = prompt("Qual operação deseja realizar? (1 - Saldo/2 - Depositar/3 - Sacar/4 - Sair)");
let saldo = 1000;
let i = 0;
let tentativa = 3;
let valorDeposito;
let valorSaque;
let validacao = true;


/*switch (numero) {
  case "1":
    console.log("Você digitou 1.");
    break;
  case "2":
    console.log("Você digitou 2.");
    break;
    default:
      console.log("Número inválido.");
}*/
while (validacao = true) {
switch (numero) {
    case "1":
        console.log("Seu saldo é: " + saldo);
        break;

    case "2": valorDeposito = Number(prompt("Digite o valor a depositar:")); saldo += valorDeposito;
        console.log(`Depósito realizado de forma MAGNÍFICA! Novo saldo:R$${saldo}`);
        break;

    case "3":  valorSaque = Number(prompt("Digite o valor a sacar:")); if (valorSaque > saldo) { console.log("Saldo insuficiente para saque."); }
    else {
        saldo -= valorSaque;
        console.log(`Saque realizado MAGESTOSAMENTE! Novo saldo: R$${saldo}`);
    }
        break;

    case "4": console.log("Obrigado por usar nosso sistema. Até logo!");
        break; (validacao = false);

    default: console.log("Operação invalida. Tente novamente")
}

}

