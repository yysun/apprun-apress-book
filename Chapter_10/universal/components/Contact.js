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
class default_1 extends apprun_1.Component {
    constructor() {
        super(...arguments);
        this.state = '';
        this.view = (state) => {
            return apprun_1.default.createElement("div", null,
                "Contact - ",
                state);
        };
        this.update = {
            '/contact': (_) => __awaiter(this, void 0, void 0, function* () {
                return new Promise(resolve => setTimeout(() => resolve(new Date().toLocaleTimeString() + ' - delayed'), 200));
            })
        };
    }
}
exports.default = default_1;
//# sourceMappingURL=Contact.js.map