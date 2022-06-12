'use strict';

const title = document.getElementsByTagName('H1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const buttonPlus = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback > .main-controls__range > [type="range"]');
const rangeValue = document.querySelector('.rollback > .main-controls__range > .range-value');

const total = document.getElementsByClassName('total-input')[0];
const screensCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const fullPriceRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    count: 0,
    isError: false,

    init: function () {
        appData.addTitle();

        startBtn.addEventListener('click', appData.checkValue)
        buttonPlus.addEventListener('click', appData.addScreenBlock)
        inputRange.addEventListener('input', appData.getRollback)
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.logger();

        console.log(appData);
        appData.showResult();
    },

    showResult: function () {
        total.value = appData.screenPrice;
        screensCount.value = appData.count;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        fullPriceRollback.value = appData.servicePercentPrice;
    },

    logger: function () {
        appData.showTypeOf(appData.title);
        appData.showTypeOf(appData.fullPrice);
        appData.showTypeOf(appData.adaptive);
        console.log("allServicePrices", appData.allServicePrices);
        console.log(appData.servicePercentPrice);
        console.log(appData.getRollbackMessage(appData.fullPrice));
        console.log(appData.screens);
        console.log(appData.screenPrice);
    },

    checkValue: function () {
        screens = document.querySelectorAll('.screen');

        appData.isError = false

        screens.forEach(function (screen) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            if (selectName == select.options[0].textContent) {
                appData.isError = true;
            } else if (input.value == '') {
                appData.isError = true;
            }
        })
        if (!appData.isError) {
            appData.start();
        }
    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            })
        })
    },

    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }
        })

        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }
        })
    },

    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);
    },

    addPrices: function () {
        appData.screenPrice = appData.screens.reduce(function (sum, item) {
            appData.count++;
            return sum += +item.price
        }, 0)

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }

        appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
    },

    getRollback: function () {
        rangeValue.textContent = inputRange.value + '%';
        appData.rollback = inputRange.value;
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))); // усложненное задание
        fullPriceRollback.value = appData.servicePercentPrice; // усложненное задание
    },

    showTypeOf: function (variable) {
        console.log(variable, typeof variable);
    },
}

appData.init();