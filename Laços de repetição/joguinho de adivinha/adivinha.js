// Jogo usando apenas: do/while, switch, case, prompt e alert

let jogarNovamente;

do {
  // gera os números secretos toda vez que o jogo inicia
  let nivelFacil = Math.floor(Math.random() * 10);   // 0..9
  let nivelMedio = Math.floor(Math.random() * 100);  // 0..99
  let nivelDificil = Math.floor(Math.random() * 1000); // 0..999

  let nivel = prompt("Escolha o nível de dificuldade: (1 - Fácil (0 a 9), 2 - Médio (0 a 99), 3 - Difícil (0 a 999))");
  if (!nivel) { // cancelou
    alert("Jogo cancelado.");
    break;
  }

  switch (nivel) {
    case "1": {
      let tentativas = 3;
      let acertou = false;
      while (tentativas > 0 && !acertou) {
        let chute = parseInt(prompt("Você tem " + tentativas + " tentativas. Qual o seu chute?"), 10);
        if (Number.isNaN(chute)) {
          alert("Chute inválido. Insira um número.");
          continue;
        }
        if (chute === nivelFacil) {
          alert("Parabéns! Você acertou!");
          acertou = true;
        } else {
          tentativas--;
          if (chute < nivelFacil) {
            alert("O valor secreto é maior que " + chute + ". Restam " + tentativas + " tentativas.");
          } else {
            alert("O valor secreto é menor que " + chute + ". Restam " + tentativas + " tentativas.");
          }
        }
      }
      if (!acertou) alert("Suas tentativas acabaram! O número era " + nivelFacil);
      break;
    }

    case "2": {
      let tentativas = 10;
      let acertou = false;
      while (tentativas > 0 && !acertou) {
        let chute = parseInt(prompt("Você tem " + tentativas + " tentativas. Qual o seu chute?"), 10);
        if (Number.isNaN(chute)) {
          alert("Chute inválido. Insira um número.");
          continue;
        }
        if (chute === nivelMedio) {
          alert("Parabéns! Você acertou!");
          acertou = true;
        } else {
          tentativas--;
          if (chute < nivelMedio) {
            alert("O valor secreto é maior que " + chute + ". Restam " + tentativas + " tentativas.");
          } else {
            alert("O valor secreto é menor que " + chute + ". Restam " + tentativas + " tentativas.");
          }
        }
      }
      if (!acertou) alert("Suas tentativas acabaram! O número era " + nivelMedio);
      break;
    }

    case "3": {
      let tentativas = 20;
      let acertou = false;
      while (tentativas > 0 && !acertou) {
        let chute = parseInt(prompt("Você tem " + tentativas + " tentativas. Qual o seu chute?"), 10);
        if (Number.isNaN(chute)) {
          alert("Chute inválido. Insira um número.");
          continue;
        }
        if (chute === nivelDificil) {
          alert("Parabéns! Você acertou!");
          acertou = true;
        } else {
          tentativas--;
          if (chute < nivelDificil) {
            alert("O valor secreto é maior que " + chute + ". Restam " + tentativas + " tentativas.");
          } else {
            alert("O valor secreto é menor que " + chute + ". Restam " + tentativas + " tentativas.");
          }
        }
      }
      if (!acertou) alert("Suas tentativas acabaram! O número era " + nivelDificil);
      break;
    }

    default:
      alert("Nível inválido! Por favor, escolha 1, 2 ou 3.");
  }

  // pergunta usando prompt (sem confirm). Aceita 's' ou 'sim' (minúsculo/maiúsculo).
  let resposta = prompt("Quer jogar de novo, lindão? (s/n)");
  if (!resposta) {
    jogarNovamente = false; // cancelou -> sai
  } else {
    resposta = resposta.trim().toLowerCase();
    jogarNovamente = (resposta === 's' || resposta === 'sim');
  }

} while (jogarNovamente);

alert("Obrigado por jogar!");