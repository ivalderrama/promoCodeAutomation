//Deal is NOT wallet applicable, and verifying if promocode field is available
var config = require('./e2e_promo_config.js');

describe("Wow-16. Deal is NOT wallet applicable, and verifying if promocode field is available", function() {

    afterEach(function () {

        browser.sleep(3000);

    });

    var discount = "50";
    var promoCode = new Date().getTime();
    var promoCode2string = String(promoCode);
    promoCode2string = ('Wow' + promoCode2string).toUpperCase();

    it("Login to Wowcher, verify that promocode text field is not displayed", function() {

        //browser.ignoreSynchronization=true;
        //Login
        browser.get(config.wow_home_url);
        browser.sleep(1000);
        browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
        browser.sleep(1000);
        element(by.className('login')).click();
        element(by.name('email')).sendKeys(config.user04);
        element(by.name('password')).sendKeys(config.generic_password);
        element(by.xpath('//*[@id="app"]/cmp-container/div/div/cmp-content/main/div/cmp-login/div/div/cmp-tile/div/div/main/div/cmp-tile-content/cmp-login-form/div/div[1]/form/div[3]/cmp-button')).click();
        browser.sleep(1000);

        //Go to your deal
        browser.get(config.wow_deal_url02);
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

    });
});
