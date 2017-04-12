//Deal is wallet applicable, user has marketing and refundable credit.
var config = require('./e2e_promo_config.js');

describe("Liv-15. Deal is wallet applicable, user has marketing and refundable credit", function() {

    afterEach(function () {

        browser.sleep(3000);

    });

    var discount = "50";
    var promoCode = new Date().getTime();
    var promoCode2string = String(promoCode);
    promoCode2string = ('Liv' + promoCode2string).toUpperCase();

    it("Save promocode", function (){

        browser.ignoreSynchronization=true;

        browser.get(config.wps_home_url);

        element(By.id("iun")).sendKeys(config.wps_user);
        element(by.id("passwd")).sendKeys(config.wps_password);
        element(by.buttonText("Login")).click();
        browser.sleep(2000);
        element(by.id("ext-gen87")).click();
        element(by.id("ext-comp-1008")).sendKeys("Living Social");
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
            expect(text).toContain("Living Social List Promo Codes");

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
        element(by.id("ext-comp-1008")).sendKeys("Living Social");
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
            expect(text).toContain("Living Social List Promo Codes");

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

    it("Login to Living-social, check credit box, then apply promocode", function() {

        //browser.ignoreSynchronization=true;
        //Login
        browser.get(config.liv_home_url);
        browser.sleep(1000);
        $('body').sendKeys(protractor.Key.ESCAPE);
        browser.sleep(1000);
        element(by.className('icon-person')).click();
        element(by.name('email')).sendKeys(config.user03);
        element(by.xpath("//*[@id='content-fixed']/div/div/div/div/div[2]/div/div/div/div/ng-form/div/div[2]/button")).click();
        element(by.model('vm.password')).sendKeys(config.generic_password);
        element(by.xpath('//*[@id="content-fixed"]/div/div/div/div/div[2]/div/div/div/div/div[2]/div[3]/button')).click();
        browser.sleep(1000);

        //Go to your deal
        browser.get(config.liv_deal_url01);
        browser.sleep(1000);
        element(by.css('.btn-xlg.pull-right')).click();
        element(by.xpath("//*[@id='product-form']/div[1]/div/div[2]/div[3]/select")).sendKeys('2');
        browser.sleep(1000);
        element(by.xpath('//*[@id="product-form"]/div[2]/div[1]/button')).click();
        browser.sleep(2000);

        element(by.name('useCredit')).click(); // User credit

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

        element(by.xpath("//*[@id='content-fixed']/div/ui-view/div/div/div/div[1]/div/div/div/div[5]/div/div[3]/div/div/p[2]")).getText().then(function (text) {
            console.log(text);
            expect(text).toContain("marketing credit cannot be used with a promo code");
        });

        element(by.xpath("//*[@id='content-fixed']/div/ui-view/div/div/div/div[1]/div/div/div/div[7]/div[3]/div[1]/p")).getText().then(function (text) {
            console.log(text);
            expect(text).toContain("promo code ("+discount+"%):");
        });

        element(by.xpath("//*[@id='content-fixed']/div/ui-view/div/div/div/div[1]/div/div/div/div[7]/div[4]/div[1]/p")).getText().then(function (text) {
            console.log(text);
            expect(text).toContain("credit applied");
        });
    });
});
