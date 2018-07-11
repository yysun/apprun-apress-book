"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apprun_1 = require("apprun");
const viewEngine = require("apprun/viewEngine");
const express = require("express");
const app = express();
app.use(express.static('public'));
// set apprun as view engine
app.engine('js', viewEngine());
app.set('view engine', 'js');
app.set('views', __dirname + '/components');
const route = (component, req, res) => __awaiter(this, void 0, void 0, function* () {
    const getVdom = () => new Promise(resolve => {
        const path = req.path === '/' ? '/home' : req.path;
        apprun_1.default.run('route', path);
        component.run('#', path, html => resolve(html));
    });
    const ssr = req.headers.accept.indexOf('application/json') < 0;
    try {
        const vdom = yield getVdom();
        res.render('layout', { ssr, vdom });
    }
    catch (ex) {
        console.log(ex);
        res.render('layout', { ssr, vdom: { Error: ex.message || ex } });
    }
});
const main_1 = require("./components/main");
app.get(/^\/(home|about|contact)?$/, (req, res) => __awaiter(this, void 0, void 0, function* () {
    route(main_1.default, req, res);
}));
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
//# sourceMappingURL=server.js.map