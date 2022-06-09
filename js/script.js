'use strict';

const titleSite = document.getElementsByTagName('h1');
const btnCount = document.getElementsByClassName('handler_btn')[0];
const btnReset = document.getElementsByClassName('handler_btn')[1];
const btnAdd = document.querySelector('.screen-btn');
const otherItems = document.querySelectorAll('.other-items.percent');
const otherItems2 = document.querySelectorAll('.other-items.number');
const inputRollback = document.querySelector('.rollback input[type="range"]');
const spanRollback = document.querySelector('.rollback .range-value');
let inputTotalInput = document.getElementsByClassName('total-input')[0];
let inputTotalCount = document.getElementsByClassName('total-input')[1];
let inputTotalCountOther = document.getElementsByClassName('total-input')[2];
let inputTotalFullCount = document.getElementsByClassName('total-input')[3];
let inputTotalCountRollback = document.getElementsByClassName('total-input')[4];
let blockScreen = document.querySelectorAll('.screen');

for(let i = 0; i < inputTotal.length; i++) {
    console.log(inputTotal[i]);
}

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    services: {},
    allServicePrices: 0,
    fullPrice: 0,
    rollback: 10,
    servicePercentPrice: 0,

    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getTitle();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.logger();
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    asking: function () {

        do {
            appData.title = prompt("Как называется ваш проект?");
        }
        while (appData.isNumber(appData.title));

        for (let i = 0; i < 2; i++) {
            let name = '';
            let price = 0;

            do {
                name = prompt("Какие типы экранов нужно разработать?");
            }
            while (appData.isNumber(name));

            do {
                price = Number(price = prompt("Сколько будет стоить данная работа?"));
            }
            while (!appData.isNumber(price));

            appData.screens.push({
                id: i,
                name: name,
                price: price
            });

        }

        for (let i = 0; i < 2; i++) {
            let name = '';
            let price = 0;

            do {
                name = i + prompt("Какой дополнительный тип услуги нужен?");
            }
            while (appData.isNumber(name));

            do {
                price = Number(price = prompt("Сколько это будет стоить?"));
            }
            while (!appData.isNumber(price));

            appData.services[name] = +price;

        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    addPrices: function () {
        appData.screenPrice = 0;

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },
    getTitle: function () {
        appData.title = appData.title[0].toUpperCase() + appData.title.toLowerCase().slice(1);
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = +Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)).toFixed(2));
    },
    getRollbackMessage: function (price) {
        if (price > 30000) {
            return 'Даем скидку в 10%';
        }
        if (price > 15000 && price <= 30000) {
            return 'Даем скидку в 5%';
        }
        if (price >= 0 && price <= 15000) {
            return 'Скидка не предусмотрена';
        }
        if (price < 0) {
            return 'Что то пошло не так';
        }
    },

    logger: function () {
        for (let item in appData) {
            console.log(item, appData[item]);
        }
    },

};

console.log(titleSite);
console.log(btnCount);
console.log(btnReset);
console.log(btnAdd);
console.log(otherItems);
console.log(otherItems2);
console.log(inputRollback);
console.log(spanRollback);
console.log(inputTotal);
console.log(inputTotalCount);
console.log(inputTotalCountOther);
console.log(inputTotalFullCount);
console.log(inputTotalCountRollback);
console.log(blockScreen);
