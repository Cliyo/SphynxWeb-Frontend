const urlParams = new URLSearchParams(window.location.search);
const linguagem = urlParams.get("language");

export {linguagem};