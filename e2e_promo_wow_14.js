//Deal is wallet applicable, user has refundable credit only.
var config = require('./e2e_promo_config.js');

describe("Wow-14. Deal is wallet applicable, user has refundable credit only", function() {

    afterEach(function () {

        browser.sleep(3000);

    });

    var discount = "50";
    var promoCode = new Date().getTime();
    var promoCode2string = String(promoCode);
    promoCode2string = ('Wow' + promoCode2string).toUpperCase();

    it("Save promocode", function (){

        browser.ignoreSynchronization=true;

        browser.get(config.wps_home_url);

        element(By.id("iun")).sendKeys(config.wps_user);
        element(by.id("passwd")).sendKeys(config.wps_password);
        element(by.buttonText("Login")).click();
        browser.sleep(2000);
        element(by.id("ext-gen87")).click();
        element(by.id("ext-comp-1008")).sendKeys("Wowcher");
        browser.sleep(1000);
        element(by.css("#ext-gen136 > div.x-combo-list-item.group-item.x-combo-selected")).click();
        browser.sleep(2000);


        element(by.id("user-name")).getText().then(function (text) {

            console.log(text);
            expect(text).toContain("Ivan Test");

        });

        element(by.css("#ext-gen55")).click();
        browser.sleep(1000);
        element(by.css("#ext-gen124")).click();

        element(by.id("breadcrumb")).getText().then(function (text) {

            console.log(text);
            expect(text).toContain("Wowcher List Promo Codes");

        });

        // Promo Code Details
        browser.sleep(1000);
        element(by.id("description")).sendKeys("Brexit deal of the century");
        element(by.id("code")).sendKeys(promoCode2string);
        element(by.id("percentage-amount")).sendKeys(discount);
        element(by.id("valid-from")).sendKeys("30/01/2017");
        element(by.id("valid-to")).sendKeys("30/09/2017");

        //Save
        element(by.id("ext-gen88")).click();
        browser.sleep(1000);

        element(by.className("ext-mb-text")).getText().then(function (text) {

            console.log(text);
            expect(text).toEqual("Saved promocode "+ promoCode2string);
        });
        
    });

    it("Edit promocode and set it to Live", function () {

        browser.ignoreSynchronization=true;

        browser.get(config.wps_home_url);

        element(By.id("iun")).sendKeys(config.wps_user);
        element(by.id("passwd")).sendKeys(config.wps_password);
        element(by.buttonText("Login")).click();
        browser.sleep(2000);
        element(by.id("ext-gen87")).click();
        element(by.id("ext-comp-1008")).sendKeys("Wowcher");
        browser.sleep(1000);
        element(by.css("#ext-gen136 > div.x-combo-list-item.group-item.x-combo-selected")).click();
        browser.sleep(2000);


        element(by.id("user-name")).getText().then(function (text) {

            console.log(text);
            expect(text).toContain("Ivan Test");

        });

        element(by.css("#ext-gen55")).click();
        browser.sleep(1000);
        element(by.css("#ext-gen124")).click();

        element(by.id("breadcrumb")).getText().then(function (text) {

            console.log(text);
            expect(text).toContain("Wowcher List Promo Codes");

        });

        browser.sleep (1000);
        element(by.xpath('//*[@id="ext-gen171"]/div[1]/table/tbody/tr/td[1]')).click();
        element(by.id("ext-gen253")).click();
        browser.sleep (1000);
        element(by.id('ext-gen253')).click();
        browser.sleep(1000);
        element(by.id('status-combo')).clear().sendKeys('Live').sendKeys(protractor.Key.ENTER);
        browser.sleep(1000);

        //Save
        element(by.id("ext-gen88")).click();
        browser.sleep(1000);

        element(by.className("ext-mb-text")).getText().then(function (text) {

            console.log(text);
            expect(text).toEqual("Edited promocode "+ promoCode2string);
        });
    });

    it("Login to Wowcher, check credit box, then apply promocode", function() {

        //browser.ignoreSynchronization=true;
        //Login
        browser.get(config.wow_home_url);
        browser.sleep(1000);
        browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
        browser.sleep(1000);
        element(by.className('login')).click();
        element(by.name('email')).sendKeys(config.user02);
        element(by.name('password')).sendKeys(config.generic_password);
        element(by.xpath('//*[@id="app"]/cmp-container/div/div/cmp-content/main/div/cmp-login/div/div/cmp-tile/div/div/main/div/cmp-tile-content/cmp-login-form/div/div[1]/form/div[3]/cmp-button')).click();
        browser.sleep(1000);

        //Go to your deal
        browser.get(config.wow_deal_url01);
        browser.sleep(1000);
        element(by.css('.btn-xlg.pull-right')).click();
        element(by.xpath("//*[@id='product-form']/div[1]/div/div[2]/div[3]/select")).sendKeys('2');
        browser.sleep(1000);
        element(by.xpath('//*[@id="product-form"]/div[2]/div[1]/button')).click();
        browser.sleep(2000);

        element(by.model('$ctrl.isWalletBalanceApplied')).click(); // User credit

        element(by.id('add-promo-code')).isPresent().then(function(isVisible) {
            if (isVisible === true) {
                console.log("Promo code is visible");
            } else {
                console.log("Promo code is not visible");
            }
        });

        element(by.id("add-promo-code")).click(); // Display promocode field
        element(by.model("$ctrl.promoCodeInput")).click(); // Click on the promocode field
        element(by.model("$ctrl.promoCodeInput")).sendKeys(promoCode2string); // Apply promocode
        browser.sleep(1000);

        element(by.id('apply-promo-code')).click();

        element(by.id("checkout__row--promo-code")).getText().then(function (text) {

            console.log(text);
            expect(text).toContain("Promo code ("+discount+"%):");

        });
        browser.sleep(1000);
        element(by.xpath("//*[@id='app']/cmp-container/div/div/cmp-content/main/div/cmp-checkout/div/div[2]/cmp-tile/div/div/main/div/cmp-tile-content[2]/div/div/div/div[4]/div[1]")).getText().then(function (text) {

            console.log(text);
            expect(text).toContain("Credit applied");

        });
    });
});
