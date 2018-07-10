"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apprun_1 = require("apprun");
class default_1 extends apprun_1.Component {
    constructor() {
        super(...arguments);
        this.state = { name: 'Home' };
        this.view = (state) => {
            return apprun_1.default.createElement("div", null,
                state.name,
                " - ",
                new Date().toLocaleTimeString());
        };
        this.update = {
            '/': (state) => (Object.assign({}, state, { path: '/' })),
            '/home': (state, path) => (Object.assign({}, state, { path: '/home' }))
        };
    }
}
exports.default = default_1;
//# sourceMappingURL=Home.js.map