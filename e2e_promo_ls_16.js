//Deal is NOT wallet applicable, and verifying if promocode field is available
var config = require('./e2e_promo_config.js');

describe("Liv-16. Deal is NOT wallet applicable, and verifying if promocode field is available", function() {

    afterEach(function () {

        browser.sleep(3000);

    });

    var discount = "50";
    var promoCode = new Date().getTime();
    var promoCode2string = String(promoCode);
    promoCode2string = ('Liv' + promoCode2string).toUpperCase();

    it("Login to Living-social, verify that promocode text field is not displayed", function() {

        //browser.ignoreSynchronization=true;
        //Login
        browser.get(config.liv_home_url);
        browser.sleep(1000);
        element(by.css('body > div.modal.fade.in > div > div > div > div.modal-footer > div > div.col-xs-12.col-sm-6.skip-ctrl > span')).click();
        browser.sleep(1000);
        element(by.className('icon-person')).click();
        element(by.name('email')).sendKeys(config.user04);
        element(by.xpath("//*[@id='content-fixed']/div/div/div/div/div[2]/div/div/div/div/ng-form/div/div[2]/button")).click();
        element(by.model('vm.password')).sendKeys(config.generic_password);
        element(by.xpath('//*[@id="content-fixed"]/div/div/div/div/div[2]/div/div/div/div/div[2]/div[3]/button')).click();
        browser.sleep(1000);

        //Go to your deal
        browser.get(config.liv_deal_url02);
        browser.sleep(1000);
        element(by.id('dtm-buy')).click();

        //expect(element(by.id('add-promo-code')).isPresent()).toBeFalsy());

        element(by.id('add-promo-code')).isPresent().then(function(isVisible) {
            if (isVisible === true) {
                console.log("Promo code is visible");
            } else {
                console.log("Promo code is not visible");
            }
        });

/*
        element(by.id("add-promo-code")).isDisplayed().then(function (isVisible) {
            //console.log(result);
            if (isVisible === true) {
                console.log("Disabled is True");
            } else {
                console.log("Disabled is False");
            }
            //console.log(isVisible === 'true'? 'Promocode text field is disabled = True': 'Promocode text field is disabled = False');
        });
*/
    });
});
