'use strict';

const title = document.getElementsByTagName('H1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback > .main-controls__range > [type="range"]');
const rangeValue = document.querySelector('.rollback > .main-controls__range > .range-value');

const cmsOpen = document.getElementById('cms-open'); // Усложненное задание
const cmsVariants = document.querySelector('.hidden-cms-variants'); // Усложненное задание
const cmsInput = document.querySelector('.hidden-cms-variants > .main-controls__input') // Усложненное задание

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
    cmsValue: 0, // Усложненное задание
    cmsPrice: 0, // Усложненное задание

    init: function () {
        this.addTitle();

        buttonPlus.addEventListener('click', this.addScreenBlock)
        startBtn.addEventListener('click', this.start.bind(appData))
        resetBtn.addEventListener('click', this.reset.bind(this))
        cmsOpen.addEventListener('change', this.getCms) // Усложненное задание
        inputRange.addEventListener('input', this.getRollback)
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    start: function () {
        this.addScreens();
        this.addServices();
        this.getCmsPrice(); // Усложненное задание
        this.addPrices();

        console.log(appData);
        this.showResult();
    },

    showResult: function () {
        total.value = this.screenPrice;
        screensCount.value = this.count;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.cmsPrice; // Усложненное задание
        fullPriceRollback.value = this.servicePercentPrice;
    },

    reset: function () {
        resetBtn.style.display = 'none';
        startBtn.style.display = 'block';
        this.clearScreens();
        this.clearServices();
        this.clearCms(); // Усложненное задание
        this.clearPrices();

        console.log(appData);
        appData.showResult();
    },

    checkValue: function () {
        screens = document.querySelectorAll('.screen');

        this.isError = false

        screens.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            if (selectName == select.options[0].textContent) {
                this.isError = true;
            } else if (input.value == '') {
                this.isError = true;
            }
        })
        if (!this.isError) {
            appData.start();
            startBtn.style.display = 'none';
            resetBtn.style.display = 'block';
        }
    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            })
            select.setAttribute('disabled', 'disabled')
            input.setAttribute('disabled', 'disabled')
        })
    },

    addServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }
            check.setAttribute('disabled', 'disabled')
        })

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
            check.setAttribute('disabled', 'disabled')
        })
    },

    addScreenBlock: function () {
        screens = document.querySelectorAll('.screen');

        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);
    },

    addPrices: function () {
        this.screenPrice = this.screens.reduce((sum, item) => {
            return sum += +item.price
        }, 0)

        screens.forEach((screen) => {
            const input = screen.querySelector('input');
            this.count += +input.value;
        })

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }

        this.fullPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber; // Усложненное задание
        this.cmsPrice = this.fullPrice + this.fullPrice * (this.cmsValue / 100); // Усложненное задание
        this.servicePercentPrice = Math.ceil(this.cmsPrice - (this.cmsPrice * (this.rollback / 100)));
    },

    getCms: function () { // Усложненное задание
        if (cmsOpen.checked) {
            cmsVariants.style.display = 'flex';
            const select = document.getElementById('cms-select')

            select.addEventListener('change', () => {
                if (select.selectedIndex == 2) {
                    cmsInput.style.display = 'block';
                }
            })
        }
    },

    getCmsPrice: function () { // Усложненное задание
        if (cmsOpen.checked) {
            const select = document.getElementById('cms-select')

            if (select.selectedIndex == 1) {
                this.cmsValue = 50;
            } else if (select.selectedIndex == 2) {
                const input = document.getElementById('cms-other-input');
                this.cmsValue = input.value;
            }
        } else {
            this.cmsValue = 0;
        }
    },

    getRollback: function () {
        rangeValue.textContent = inputRange.value + '%';
        appData.rollback = inputRange.value;
        appData.servicePercentPrice = Math.ceil(appData.cmsPrice - (appData.cmsPrice * (appData.rollback / 100)));
        fullPriceRollback.value = appData.servicePercentPrice;
    },

    clearScreens: function () {
        let screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            if (index == 0) {
                select[0].selected = true;
                input.value = '';
            } else {
                screens[index].remove();
            }
            select.removeAttribute('disabled');
            input.removeAttribute('disabled');
        })
        this.screens = [];
    },

    clearServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');

            check.checked = false;
            check.removeAttribute('disabled')
        })
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');

            check.checked = false;
            check.removeAttribute('disabled')
        })
    },

    clearCms: function () { // Усложненное задание
        const select = document.getElementById('cms-select')
        const input = document.getElementById('cms-other-input');

        select[0].selected = true;
        cmsOpen.checked = false;
        input.value = '';
        cmsVariants.style.display = 'none';
        cmsInput.style.display = 'none';
    },

    clearPrices: function () {
        this.screenPrice = 0;
        this.servicesPercent = {};
        this.servicePricesPercent = 0;
        this.servicesNumber = {};
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.count = 0;
        this.rollback = 0;
        this.cmsValue = 0; // Усложненное задание
        this.cmsPrice = 0; // Усложненное задание
        inputRange.value = 0;
        rangeValue.textContent = 0 + '%';
    }
}

appData.init();
