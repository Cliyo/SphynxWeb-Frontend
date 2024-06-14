var link = document.querySelector("link[rel~='icon']");

function changeFavicon(){
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        link.href = './../../../assets/img/favicon-light.ico';
    }
    else if (window.matchMedia('(prefers-color-scheme: light)').matches){
        link.href = './../../../assets/img/favicon-dark.ico';
    }
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    changeFavicon();
});

changeFavicon();