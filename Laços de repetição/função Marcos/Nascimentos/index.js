function verificar() {
  const campoAno = document.getElementById('ano');
  const texto = document.getElementById('texto');
  const img = document.getElementById('imagem');

  const anoAtual = 2025; // pode trocar por: new Date().getFullYear()
  const ano = Number(campoAno.value);

  // Validar do ano
  if (!ano || ano < 1900 || ano > anoAtual) {
    alert('[ERRO] Digite um ano válido (de 1900 até ' + anoAtual + ').');
    texto.innerText = 'Dados inválidos.';
    img.style.display = 'none';
    return; // sai da função
  }

  const idade = anoAtual - ano;

  // verificar sexo
  const radiosSexo = document.getElementsByName('sexo');
  let genero = '';

  if (radiosSexo[0].checked) {
    genero = 'homem';
  } else if (radiosSexo[1].checked) {
    genero = 'mulher';
  }

 //faixa etária
  let faixa = '';

  if (idade < 2) {
    faixa = 'bebê';
  } else if (idade < 12) {
    faixa = 'criança';
  } else if (idade < 21) {
    faixa = 'jovem';
  } else if (idade < 60) {
    faixa = 'adulto';
  } else {
    faixa = 'idoso';
  }

  // resultado em texto
  texto.innerText = `Detectado ${genero} ${faixa} com ${idade} anos.`;

  // imagens
  let src = '';

  if (genero === 'homem') {
    if (idade < 2) src = '../imagens/bebe menino.jpg';
    else if (idade < 12) src = '../imagens/crianca menino.avif';
    else if (idade < 21) src = '../imagens/adolescente menino.webp';
    else if (idade < 60) src = '../imagens/homem adulto.jpg';
    else src = '../imagens/idoso.webp';
  } else if (genero === 'mulher') {
    if (idade < 2) src = '../imagens/bebe menina.webp';
    else if (idade < 12) src = '../imagens/menina crianca.webp';
    else if (idade < 21) src = '../imagens/adolescente menina.webp';
    else if (idade < 60) src = '../imagens/Mulher adulta.jpg';
    else src = '../imagens/idosa.jpg';
  }

  img.src = src;
  img.style.display = 'block';
}
