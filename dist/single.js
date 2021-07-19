"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSingle = exports.ContextProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
function ContextProvider(context, state) {
    return function ProjectsContextProvider(props) {
        var _a = react_1.useState(props.value || state), states = _a[0], dispatch = _a[1];
        //@ts-ignore
        states.__proto__ = state.__proto__;
        //@ts-ignore
        states.setState = dispatch;
        return jsx_runtime_1.jsx(context.Provider, __assign({}, props, { value: states }), void 0);
    };
}
exports.ContextProvider = ContextProvider;
function createSingle(state) {
    var context = react_1.createContext(state);
    var provider = ContextProvider(context, state);
    var useCon = function () { return react_1.useContext(context); };
    //@ts-ignore
    return [provider, useCon];
}
exports.createSingle = createSingle;
