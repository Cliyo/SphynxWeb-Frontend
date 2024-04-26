export function showMessage(mensagem) {
    var message = document.getElementById("mensagem");
    message.className = "show";
    message.innerHTML = mensagem;
    setTimeout(
        function(){
            message.className = message.className.replace("show", ""); 
        }, 5000);
  }