exports.config = {

    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [{
        'browserName': 'chrome',
        //'chromeOptions': {
        //    'args': ['--disable-extensions']
        //},
        'shardTestFiles': 'false',
        'maxInstances': '1'
    }],
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    framework: 'jasmine2',
    restartBrowserBetweenTests: true,

    onPrepare: function() {

        //browser.ignoreSynchronization=true;

        var AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));

        jasmine.getEnv().afterEach(function(done){
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });
    },

    specs: [
        //'wps_promo_livingsocial.js',
        //'wps_promo_wowcher.js',
        //'wps_edit_promo_wowcher.js',
        //'user_session_api.js',
        //'wps_promo_livingsocial_all.js',
        //'wps_promo_wowcher_all.js',
        //'wps_promo_basic.js'
        // './promoCode/e2e_promo_ls_01.js',
        // './promoCode/e2e_promo_ls_02.js',
        // './promoCode/e2e_promo_ls_03.js',
         './promoCode/e2e_promo_ls_04.js',
        // './promoCode/e2e_promo_ls_04a.js',
        // './promoCode/e2e_promo_ls_05.js',
        // './promoCode/e2e_promo_ls_06.js',
        // './promoCode/e2e_promo_ls_07.js',
        // './promoCode/e2e_promo_ls_08.js',
        // './promoCode/e2e_promo_ls_09.js',
        // './promoCode/e2e_promo_ls_10.js',
        // './promoCode/e2e_promo_ls_11.js',
        // './promoCode/e2e_promo_ls_12.js',
         './promoCode/e2e_promo_ls_13.js',
        // './promoCode/e2e_promo_ls_14.js',
        // './promoCode/e2e_promo_ls_15.js',
        // './promoCode/e2e_promo_ls_16.js',
        // './promoCode/e2e_promo_ls_17.js',
        // './promoCode/e2e_promo_ls_18.js',
        // './promoCode/e2e_promo_ls_19.js',
        // './promoCode/e2e_promo_ls_20.js',
        // './promoCode/e2e_promo_ls_21.js',
        // './promoCode/e2e_promo_ls_22.js',
        // './promoCode/e2e_promo_ls_23.js',
        // './promoCode/e2e_promo_ls_24.js',
        // './promoCode/e2e_promo_ls_25.js',
        // './promoCode/e2e_promo_wow_01.js',
        // './promoCode/e2e_promo_wow_02.js',
        // './promoCode/e2e_promo_wow_03.js',
        // './promoCode/e2e_promo_wow_04.js',
        // './promoCode/e2e_promo_wow_04a.js',
        // './promoCode/e2e_promo_wow_05.js',
        // './promoCode/e2e_promo_wow_06.js',
        // './promoCode/e2e_promo_wow_07.js',
        // './promoCode/e2e_promo_wow_08.js',
        // './promoCode/e2e_promo_wow_09.js',
        // './promoCode/e2e_promo_wow_10.js',
        // './promoCode/e2e_promo_wow_11.js',
        // './promoCode/e2e_promo_wow_12.js',
        // './promoCode/e2e_promo_wow_13.js',
        // './promoCode/e2e_promo_wow_14.js',
        // './promoCode/e2e_promo_wow_15.js',
        // './promoCode/e2e_promo_wow_16.js',
        // './promoCode/e2e_promo_wow_17.js',
        // './promoCode/e2e_promo_wow_18.js',
        // './promoCode/e2e_promo_wow_19.js',
        // './promoCode/e2e_promo_wow_20.js',
        // './promoCode/e2e_promo_wow_21.js',
        // './promoCode/e2e_promo_wow_22.js',
        // './promoCode/e2e_promo_wow_23.js',
        // './promoCode/e2e_promo_wow_24.js',
         './promoCode/e2e_promo_wow_25.js'
    ],

/*  suites: {

        smoke: ['./TestSuites/smoke/*.spec.js'],
        regression: ['./TestSuites/regression/*.spec.js'],
        selected: [],
    },
*/

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }

};