"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apprun_1 = require("apprun");
class default_1 extends apprun_1.Component {
    constructor() {
        super(...arguments);
        this.state = 'Contact';
        this.view = (state) => {
            return apprun_1.default.createElement("div", null,
                state,
                " - ",
                new Date().toLocaleTimeString());
        };
        this.update = {
            '/contact': state => state,
        };
    }
}
exports.default = default_1;
//# sourceMappingURL=Contact.js.map