export function mostrarMensagem(texto) {
    var mensagem = document.getElementById("mensagem");
    mensagem.className = "show";
    mensagem.innerHTML = texto;
    setTimeout(
        function(){
            mensagem.className = mensagem.className.replace("show", ""); 
        }, 5000);
  }