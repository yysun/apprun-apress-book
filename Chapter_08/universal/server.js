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
const Home_1 = require("./components/Home");
const About_1 = require("./components/About");
const Contact_1 = require("./components/Contact");
new Home_1.default().mount();
new About_1.default().mount();
new Contact_1.default().mount();
const route = (req) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        console.log(apprun_1.default);
        const path = `${req.path}/${Date.now()}`;
        apprun_1.default.on('debug', p => {
            if (p.vdom && p.state.path === path.substring(2))
                resolve(p.vdom);
        });
        setTimeout(() => { reject('Timeout'); }, 10000);
        try {
            apprun_1.default.run('route', path);
        }
        catch (ex) {
            reject(ex.message);
        }
    });
});
app.get('*', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ssr = req.headers.accept.indexOf('application/json') < 0;
    try {
        const vdom = yield route(req);
        res.render('layout', { ssr, vdom });
    }
    catch (ex) {
        res.render('layout', { ssr, vdom: ex.message || ex });
    }
}));
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
//# sourceMappingURL=server.js.map