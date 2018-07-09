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
const Home_1 = require("./Home");
const About_1 = require("./About");
const Contact_1 = require("./Contact");
class default_1 {
    constructor() {
        delete global['app'];
        new Home_1.default().mount();
        new About_1.default().mount();
        new Contact_1.default().mount(null, { history });
    }
    route(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // new Contact().mount(null, { history: (html) => resolve(html) });
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
    }
}
exports.default = default_1;
//# sourceMappingURL=main.js.map