/* jshint esversion: 6 */
define(["require", "exports", "./app/_namespace"], function (require, exports, _namespace_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Setup {
        constructor(data, requireCfg) {
            this.config = {
                data: data,
                'require-config': requireCfg
            };
        }
        init() {
            console.log('init()', this);
            requirejs.config(this.config['require-config']);
            requirejs(['app/main']);
            console.log('myApp', _namespace_1.App);
        }
    }
    exports.Setup = Setup;
    _namespace_1.App.setup = new Setup({
        about: 'data/about.json',
        nav: 'data/nav.json',
        portfolio: 'data/portfolio.json',
        resume: 'data/resume.json'
    }, {
        baseUrl: 'scripts',
        findNestedDependencies: true,
        paths: {
            app: 'app'
        }
    });
    _namespace_1.App.setup.init();
});
