function carregar() {
    let agora = new Date()
    let hora = agora.getHours()
    let minutos = agora.getMinutes()
    let msg = window.document.getElementById('hora')
    let corpo = document.getElementById('corpo')
    let img = document.getElementById('imagem')

   
    hora = 19 + hora % 10  

    if (hora >= 0 && hora <= 5) {
        msg.innerHTML = `Boa madrugada! Agora são ${hora} horas e ${minutos} minutos.`
        corpo.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
        img.src = 'imagens/Madrugada.webp'
    } else if (hora >= 6 && hora <= 11) {
        msg.innerHTML = `Bom dia! Agora são ${hora} horas e ${minutos} minutos.`
        corpo.style.background = 'linear-gradient(135deg, #f5a623 0%, #f7dc6f 100%)'
        img.src = 'imagens/Manhã.jpg'
    } else if (hora >= 12 && hora <= 17) {
        msg.innerHTML = `Boa tarde! Agora são ${hora} horas e ${minutos} minutos.`
        corpo.style.background = 'linear-gradient(135deg, #e67e22 0%, #d68910 100%)'
        img.src = 'imagens/tarde.jpg'
    } else {
        msg.innerHTML = `Boa noite! Agora são ${hora} horas e ${minutos} minutos.`
        corpo.style.background = 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)'
        img.src = 'imagens/noite.webp'
    }
}