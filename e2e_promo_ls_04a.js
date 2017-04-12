//Testing by creating a promo code, edit and set it set to Live, then trying to apply the promo code to a deal.
//Deal is wallet applicable. User does not have refundable on marketing credit.
var config = require('./e2e_promo_config.js');

describe("Liv-04a. Apply an invalid promocode to a wallet applicable deal", function() {

    afterEach(function () {

        browser.sleep(3000);

    });

    var discount = "50";
    var promoCode = new Date().getTime();
    var promoCode2string = String(promoCode);
    promoCode2string = ('Liv' + promoCode2string).toUpperCase();

    it("Login to Living-social purchase an item and apply and invalid code", function() {

        //browser.ignoreSynchronization=true;
        //Login
        browser.get(config.liv_home_url);
        browser.sleep(1000);
        $('body').sendKeys(protractor.Key.ESCAPE);
        browser.sleep(1000);
        element(by.className('icon-person')).click();
        element(by.name('email')).sendKeys(config.user04);
        element(by.xpath("//*[@id='content-fixed']/div/div/div/div/div[2]/div/div/div/div/ng-form/div/div[2]/button")).click();
        element(by.model('vm.password')).sendKeys(config.generic_password);
        element(by.xpath('//*[@id="content-fixed"]/div/div/div/div/div[2]/div/div/div/div/div[2]/div[3]/button')).click();
        browser.sleep(1000);

        //Go to your deal
        browser.get(config.liv_deal_url01);
        browser.sleep(1000);
        element(by.css('.btn-xlg.pull-right')).click();
        element(by.xpath("//*[@id='product-form']/div[1]/div/div[2]/div[3]/select")).sendKeys('1');
        browser.sleep(1000);
        element(by.xpath('//*[@id="product-form"]/div[2]/div[1]/button')).click();
        browser.sleep(2000);

        //Apply promocode
        element(by.id("add-promo-code")).click(); // Display promocode field
        element(by.model("$ctrl.promoCodeInput")).sendKeys(promoCode2string);
        browser.sleep(1000);
        element(by.id('apply-promo-code')).click();
        browser.sleep(1000);

        element(by.id("invalid-promo-code")).getText().then(function (text) {

            console.log(text);
            expect(text).toContain("Sorry, code "+ promoCode2string +" is invalid.");

        });
    });
});
