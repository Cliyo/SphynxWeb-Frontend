import { language } from "./dashboardScript.js";

var userLanguage = language || navigator.language || navigator.userLanguage;
console.log(userLanguage);
var elements = document.getElementsByTagName('*');

fetch('../assets/i18n/' + userLanguage + '.json')
    .then(response => response.json())
    .then(data => {
        Object.keys(data).forEach(key => {

            var elements = document.querySelectorAll(key);
            if(elements.length > 1){
                elements.forEach(element => {
                    if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'password')) {
                        element.placeholder = data[key];
                    } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                        element.value = data[key];
                    } else {
                        element.textContent = data[key];
                    }
                })
            }

            var element = document.getElementById(key);
            if (element) {
                if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'password')) {
                    element.placeholder = data[key];
                } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = data[key];
                } else {
                    element.textContent = data[key];
                }
            }
        });
    })
    .catch(error => {
        console.error('Error loading language file:', error);
    });

