"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apprun_1 = require("apprun");
class default_1 extends apprun_1.Component {
    constructor() {
        super(...arguments);
        this.state = '';
        this.view = (state) => {
            return apprun_1.default.createElement("div", null,
                "About  - ",
                state);
        };
        this.update = {
            '/about': _ => {
                throw new Error('test');
            }
        };
    }
}
exports.default = default_1;
//# sourceMappingURL=About.js.map