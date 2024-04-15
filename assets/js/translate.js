import { language } from "./dashboardScript.js";

var userLanguage = language || navigator.language || navigator.userLanguage;
console.log(userLanguage);

var elements = document.querySelectorAll('*');

function updateInputElement(element, key, value) {
    if (element.tagName === 'INPUT') {
        if (element.type === 'text' || element.type === 'password') {
            element.placeholder = value;
        } else if (element.type === 'submit') {
            element.value = value;
        }
    }
}

function updateNonInputElement(element, key, value) {
    element.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== "") {
            child.textContent = value;
        }
    });
}

fetch('../assets/i18n/' + userLanguage + '.json')
    .then(response => response.json())
    .then(data => {
        Object.keys(data).forEach(key => {
            elements.forEach(element => {
                if (element.id === key) {
                    switch (element.tagName) {
                        case 'INPUT':
                            updateInputElement(element, key, data[key]);
                            break;
                        default:
                            updateNonInputElement(element, key, data[key]);
                    }
                }
            });
        });
    })
    .catch(error => {
        console.error('Error loading language file:', error);
    });