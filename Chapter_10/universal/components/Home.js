"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apprun_1 = require("apprun");
class default_1 extends apprun_1.Component {
    constructor() {
        super(...arguments);
        this.state = '';
        this.view = (state) => apprun_1.default.createElement("div", null,
            "Home - ",
            state);
        this.update = {
            '/home': _ => new Date().toLocaleTimeString()
        };
    }
}
exports.default = default_1;
//# sourceMappingURL=Home.js.map