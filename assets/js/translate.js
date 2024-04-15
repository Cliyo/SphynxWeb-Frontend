import { language } from "./dashboardScript.js";

var userLanguage = language || navigator.language || navigator.userLanguage;
console.log(userLanguage);
var elements = document.querySelectorAll('*')
console.log(elements)

fetch('../assets/i18n/' + userLanguage + '.json')
    .then(response => response.json())
    .then(data => {
        Object.keys(data).forEach(key => {
            if(elements.length > 1){
                elements.forEach(element => {
                    if (element.id === key){
                        if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'password')) {
                        element.placeholder = data[key];
                        } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                            element.value = data[key];
                        } else {
                            element.textContent = data[key];
                        }
                    }
                })
            } 
        });
    })
    .catch(error => {
        console.error('Error loading language file:', error);
    });

