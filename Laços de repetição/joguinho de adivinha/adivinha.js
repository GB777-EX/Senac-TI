
//declaração de variáveis
let nivelFacil = parseInt(Math.floor((Math.random() * 10)));
let nivelMedio = parseInt(Math.floor((Math.random() * 100)));
let nivelDificil = parseInt(Math.floor((Math.random() * 1000)));
let tentativaFacil = 3;
let tentativaMedia = 10;
let tentativaDificil = 20;
let acertou = false;
let chuteFacil;
let chuteMedio;
let chuteDificil;
//Entrada de dados
do {
let nivel = prompt("Escolha o nível de dificuldade: (1 - Fácil (0 a 10), 2 - Médio (0 a 100), 3 - Difícil (0 a 1000))");

switch (nivel) {
    case "1":
        while (tentativaFacil > 0 && acertou === false) {
            chuteFacil = parseInt(prompt("Você tem " + tentativaFacil + " tentativas. Qual o seu chute?"), 10);
            // valida entrada
            if (Number.isNaN(chuteFacil)) {
                alert("Chute inválido. Insira um número.");
                continue;
            }

            if (chuteFacil === nivelFacil) {
                alert("Parabéns! Você acertou!");
                acertou = true;
            } else {
              
                tentativaFacil--;
                if (chuteFacil < nivelFacil) {
                
                    alert("O valor secreto é maior que " + chuteFacil + ". Você tem " + tentativaFacil + " tentativas restantes.");
                } else {
                   
                    alert("O valor secreto é menor que " + chuteFacil + ". Você tem " + tentativaFacil + " tentativas restantes.");
                }
            }
        }
        if (acertou === false) {
            alert(`Suas tentativas acabaram! O número era ${nivelFacil}`);
        }
        break;
    case "2":
        while (tentativaMedia > 0 && acertou === false) {
            chuteMedio = parseInt(prompt(`Você tem ${tentativaMedia} tentativas. Qual o seu chute?`), 10);
            if (Number.isNaN(chuteMedio)) {
                alert("Chute inválido. Insira um número.");
                continue;
            }

            if (chuteMedio === nivelMedio) {
                alert("Parabéns! Você acertou!");
                acertou = true;
            } else {
                tentativaMedia--;
                if (chuteMedio < nivelMedio) {
                    alert("O valor secreto é maior que " + chuteMedio + ". Você tem " + tentativaMedia + " tentativas restantes.");
                } else {
                    alert("O valor secreto é menor que " + chuteMedio + ". Você tem " + tentativaMedia + " tentativas restantes.");
                }
            }
        }
        if (acertou === false) {
            alert(`Suas tentativas acabaram! O número era ${nivelMedio}`);
        }
        break;
    case "3":
        while (tentativaDificil > 0 && acertou === false) {
            chuteDificil = parseInt(prompt(`Você tem ${tentativaDificil} tentativas. Qual o seu chute?`), 10);
            if (Number.isNaN(chuteDificil)) {
                alert("Chute inválido. Insira um número.");
                continue;
            }

            if (chuteDificil === nivelDificil) {
                alert("Parabéns! Você acertou!");
                acertou = true;
            } else {
                tentativaDificil--;
                if (chuteDificil < nivelDificil) {
                    alert("O valor secreto é maior que " + chuteDificil + ". Você tem " + tentativaDificil + " tentativas restantes.");
                } else {
                    alert("O valor secreto é menor que " + chuteDificil + ". Você tem " + tentativaDificil + " tentativas restantes.");
                }
            }
        }
        if (acertou === false) {
            alert(`Suas tentativas acabaram! O número era ${nivelDificil}`);
        }
        break;
    default:
        alert("Nível inválido! Por favor, escolha 1, 2 ou 3.");
}
switch (prompt("Fim de jogo! Deseja jogar novamente? (sim/não)")) {
    case "sim":
        sair = "não";
        break;
    case "não":
        sair = "sim";
}
} while (sair !== "sim");