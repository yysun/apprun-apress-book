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
const viewEngine = require("apprun/viewEngine");
const express = require("express");
const app = express();
app.use(express.static('public'));
// set apprun as view engine
app.engine('js', viewEngine());
app.set('view engine', 'js');
app.set('views', __dirname + '/components');
const route = (component, req, res) => __awaiter(this, void 0, void 0, function* () {
    const getVdom = () => new Promise((resolve, reject) => {
        let vdom = false;
        const path = req.path === '/' ? '/home' : req.path;
        setTimeout(() => !vdom && reject(new Error('Cannot route:' + [path])), 300);
        component.run(path, html => resolve(vdom = html));
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
const Home_1 = require("./components/Home");
const About_1 = require("./components/About");
const Contact_1 = require("./components/Contact");
app.get(/^\/(home)?$/, (req, res) => __awaiter(this, void 0, void 0, function* () {
    route(Home_1.default, req, res);
}));
app.get('/about', (req, res) => __awaiter(this, void 0, void 0, function* () {
    route(About_1.default, req, res);
}));
app.get('/contact', (req, res) => __awaiter(this, void 0, void 0, function* () {
    route(Contact_1.default, req, res);
}));
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
//# sourceMappingURL=server.js.map