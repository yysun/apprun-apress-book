"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apprun_1 = require("apprun");
class default_1 extends apprun_1.Component {
    constructor() {
        super(...arguments);
        this.state = 'Home';
        this.view = (state) => {
            return apprun_1.default.createElement("div", null,
                state,
                " - ",
                new Date().toLocaleTimeString());
        };
        this.update = {
            '/, /home': state => state,
        };
    }
}
exports.default = default_1;
//# sourceMappingURL=Home.js.map