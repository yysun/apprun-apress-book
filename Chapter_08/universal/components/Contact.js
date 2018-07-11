"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apprun_1 = require("apprun");
class Contact extends apprun_1.Component {
    constructor() {
        super(...arguments);
        this.state = '';
        this.view = (state) => {
            return apprun_1.default.createElement("div", null,
                "Contact - ",
                state);
        };
        this.update = {
            '/contact': _ => new Date().toLocaleTimeString()
        };
    }
}
exports.Contact = Contact;
exports.default = new Contact().mount();
//# sourceMappingURL=Contact.js.map