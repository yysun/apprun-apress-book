"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apprun_1 = require("apprun");
const view = (children) => apprun_1.default.createElement("html", null,
    apprun_1.default.createElement("head", null,
        apprun_1.default.createElement("meta", { charset: "utf-8" }),
        apprun_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no" }),
        apprun_1.default.createElement("title", null, "AppRun - SSR"),
        apprun_1.default.createElement("link", { rel: "stylesheet", href: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css", integrity: "sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm", crossorigin: "anonymous" })),
    apprun_1.default.createElement("body", null,
        apprun_1.default.createElement("div", { className: "container" },
            apprun_1.default.createElement("nav", { className: "navbar navbar-expand-lg navbar-light bg-light" },
                apprun_1.default.createElement("a", { className: "navbar-brand", href: "/" }, "AppRun App"),
                apprun_1.default.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                    apprun_1.default.createElement("span", { className: "navbar-toggler-icon" })),
                apprun_1.default.createElement("div", { className: "collapse navbar-collapse", id: "navbarSupportedContent" },
                    apprun_1.default.createElement("ul", { className: "navbar-nav mr-auto" },
                        apprun_1.default.createElement("li", { className: "nav-item" },
                            apprun_1.default.createElement("a", { className: "nav-link active", href: "/home" }, "Home")),
                        apprun_1.default.createElement("li", { className: "nav-item" },
                            apprun_1.default.createElement("a", { className: "nav-link", href: "/about" }, "About")),
                        apprun_1.default.createElement("li", { className: "nav-item" },
                            apprun_1.default.createElement("a", { className: "nav-link", href: "/contact" }, "Contact")),
                        apprun_1.default.createElement("li", null,
                            apprun_1.default.createElement("a", { className: "nav-link" }, new Date().toLocaleTimeString()))))),
            apprun_1.default.createElement("div", { className: "container", id: "my-app" }, children || '')),
        apprun_1.default.createElement("script", { src: "https://code.jquery.com/jquery-3.2.1.min.js" }),
        apprun_1.default.createElement("script", { src: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js", integrity: "sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl", crossorigin: "anonymous" }),
        apprun_1.default.createElement("script", { src: "https://unpkg.com/apprun@latest/dist/apprun.js" }),
        apprun_1.default.createElement("script", { src: "spa.js" })));
exports.default = view;
const Home_1 = require("./Home");
const About_1 = require("./About");
const Contact_1 = require("./Contact");
new Home_1.default().mount();
new About_1.default().mount();
new Contact_1.default().mount();
//# sourceMappingURL=main.js.map