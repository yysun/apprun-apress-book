"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apprun_1 = require("apprun");
const Home_1 = require("./Home");
const About_1 = require("./About");
const Contact_1 = require("./Contact");
const state = {};
const Route = ({ path }, children) => {
    const child = children.find(ch => ch.props.id === path);
    return child || children;
};
const view = (state) => {
    const vdom = apprun_1.default.createElement(Route, { path: state.path },
        apprun_1.default.createElement(Home_1.default, { id: "/home" }),
        apprun_1.default.createElement(About_1.default, { id: "/about" }),
        apprun_1.default.createElement(Contact_1.default, { id: "/contact" }));
    return state.cb ? state.cb(vdom) : vdom;
};
const update = {
    '#': (_, path, cb) => ({ path, cb })
};
exports.default = apprun_1.default.start('', state, view, update);
//# sourceMappingURL=main.js.map