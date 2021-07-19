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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProjectsContext = exports.ProjectsContextProvider = exports.ProjectsActionsReducer = exports.ProjectsState = void 0;
var context_class_1 = require("context-class");
var ProjectsState = /** @class */ (function () {
    function ProjectsState(ProjectsState) {
        this.projects = [];
        this.filterLanguages = [];
        this.filterFrameworks = [];
        this.filterFuncLanguages = function (languages) { return function (p) { var _a; return (_a = p.languages) === null || _a === void 0 ? void 0 : _a.some(function (language) { return languages.includes(language); }); }; };
        this.filterFuncFrameworks = function (frameworks) { return function (p) { var _a; return (_a = p.frameworks) === null || _a === void 0 ? void 0 : _a.some(function (framework) { return frameworks.includes(framework); }); }; };
        for (var key in ProjectsState) {
            //@ts-ignore
            this[key] = ProjectsState[key];
        }
    }
    Object.defineProperty(ProjectsState.prototype, "filteredProjects", {
        get: function () {
            var _this = this;
            var filter = function (p) {
                return _this.filterFuncLanguages(_this.filterLanguages)(p) || _this.filterFuncFrameworks(_this.filterFrameworks)(p);
            };
            return (this.filterLanguages.length > 0 || this.filterFrameworks.length > 0) ? this.projects.filter(filter) : this.projects;
        },
        enumerable: false,
        configurable: true
    });
    ProjectsState.prototype.projectsThatMatchLanguages = function (languages) {
        return this.projects.filter(this.filterFuncLanguages(languages));
    };
    ProjectsState.prototype.projectsThatMatchFrameworks = function (frameworks) {
        return this.projects.filter(this.filterFuncFrameworks(frameworks));
    };
    return ProjectsState;
}());
exports.ProjectsState = ProjectsState;
var ProjectsActionsReducer = /** @class */ (function () {
    function ProjectsActionsReducer() {
    }
    ProjectsActionsReducer.addProjects = function (projects) { return function (prev) {
        return __assign(__assign({}, prev), { projects: __spreadArrays(prev.projects, projects) });
    }; };
    ProjectsActionsReducer.setLanguageFilter = function (languages) { return function (prev) {
        return __assign(__assign({}, prev), { filterLanguages: __spreadArrays(prev.filterLanguages, languages) });
    }; };
    ProjectsActionsReducer.removeLanguageFilter = function (languages) { return function (prev) {
        var filterLanguages = prev.filterLanguages.filter(function (language) { return !languages.includes(language); });
        return __assign(__assign({}, prev), { filterLanguages: filterLanguages });
    }; };
    ProjectsActionsReducer.setFrameworkFilter = function (frameworks) { return function (prev) {
        return __assign(__assign({}, prev), { filterFrameworks: __spreadArrays(prev.filterFrameworks, frameworks) });
    }; };
    ProjectsActionsReducer.removeFrameworkFilter = function (frameworks) { return function (prev) {
        var filterFrameworks = prev.filterFrameworks.filter(function (framework) { return !frameworks.includes(framework); });
        return __assign(__assign({}, prev), { filterFrameworks: filterFrameworks });
    }; };
    ProjectsActionsReducer.setSelectedProject = function (selectedProject) { return function (prev) {
        return __assign(__assign({}, prev), { selectedProject: selectedProject });
    }; };
    return ProjectsActionsReducer;
}());
exports.ProjectsActionsReducer = ProjectsActionsReducer;
var Action = /** @class */ (function () {
    function Action() {
    }
    return Action;
}());
var ProjectsActions = /** @class */ (function (_super) {
    __extends(ProjectsActions, _super);
    function ProjectsActions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProjectsActions.prototype.addProjects = function (projects) { this.setState(ProjectsActionsReducer.addProjects(projects)); };
    ProjectsActions.prototype.setLanguageFilter = function (languages) { this.setState(ProjectsActionsReducer.setLanguageFilter(languages)); };
    ProjectsActions.prototype.removeLanguageFilter = function (languages) { this.setState(ProjectsActionsReducer.removeLanguageFilter(languages)); };
    ProjectsActions.prototype.setFrameworkFilter = function (frameworks) { this.setState(ProjectsActionsReducer.setFrameworkFilter(frameworks)); };
    ProjectsActions.prototype.removeFrameworkFilter = function (frameworks) { this.setState(ProjectsActionsReducer.removeFrameworkFilter(frameworks)); };
    ProjectsActions.prototype.setSelectedProject = function (selectedProject) { this.setState(ProjectsActionsReducer.setSelectedProject(selectedProject)); };
    return ProjectsActions;
}(Action));
exports.ProjectsContextProvider = (_a = context_class_1.create(ProjectsState, ProjectsActions), _a[0]), exports.useProjectsContext = _a[1];
