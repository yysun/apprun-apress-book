"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apprun_1 = require("apprun");
class Home extends apprun_1.Component {
    constructor() {
        super(...arguments);
        this.state = '';
        this.view = (state) => {
            const html = apprun_1.default.createElement("div", null,
                "Home - ",
                state);
            return state.cb ? state.cb(html) : html;
        };
        this.update = {
            '/home': (_, cb) => ({ time: new Date().toLocaleTimeString(), cb })
        };
    }
}
exports.Home = Home;
exports.default = new Home().mount();
//# sourceMappingURL=Home.js.map