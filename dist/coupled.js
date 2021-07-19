"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.createCoupled = exports.ContextProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
function ContextProvider(context, state, action, stateConstructor, aa) {
    var W = /** @class */ (function (_super) {
        __extends(W, _super);
        function W() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return W;
    }(aggregation(stateConstructor, aa)));
    var w = new W();
    for (var key in state) {
        //@ts-ignore
        w[key] = state[key];
    }
    for (var key in action) {
        //@ts-ignore
        w[key] = action[key];
    }
    return function ProjectsContextProvider(props) {
        var _a = react_1.useState(props.value || w), states = _a[0], setState = _a[1];
        //@ts-ignore
        states.__proto__ = w.__proto__;
        if (props.value) {
            for (var key in action) {
                //@ts-ignore
                states[key] = action[key];
            }
        }
        //@ts-ignore
        states.setState = setState;
        return jsx_runtime_1.jsx(context.Provider, __assign({}, props, { value: states }), void 0);
    };
}
exports.ContextProvider = ContextProvider;
function createCoupled(state, action, stateConstructor, actionConstructor) {
    var context = react_1.createContext([state, action]);
    var provider = ContextProvider(context, state, action, stateConstructor, actionConstructor);
    var useCon = function () {
        return react_1.useContext(context);
    };
    //@ts-ignore
    return [provider, useCon];
}
exports.createCoupled = createCoupled;
var aggregation = function (baseClastateConstructor) {
    var mixins = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        mixins[_i - 1] = arguments[_i];
    }
    var base = /** @class */ (function (_super) {
        __extends(base, _super);
        function base() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            mixins.forEach(function (mixin) {
                copyProps(_this, (new mixin));
            });
            return _this;
        }
        return base;
    }(baseClastateConstructor));
    var copyProps = function (target, source) {
        Object.getOwnPropertyNames(source)
            //@ts-ignore
            .concat(Object.getOwnPropertySymbols(source))
            .forEach(function (prop) {
            if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
                //@ts-ignore
                Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
        });
    };
    mixins.forEach(function (mixin) {
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
    });
    return base;
};
