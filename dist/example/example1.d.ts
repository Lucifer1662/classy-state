declare type ProjectData = {
    languages?: string[];
    frameworks?: string[];
};
export declare class ProjectsState {
    projects: ProjectData[];
    filterLanguages: string[];
    filterFrameworks: string[];
    selectedProject?: number;
    get filteredProjects(): ProjectData[];
    projectsThatMatchLanguages(languages: string[]): ProjectData[];
    projectsThatMatchFrameworks(frameworks: string[]): ProjectData[];
    private filterFuncLanguages;
    private filterFuncFrameworks;
    constructor(ProjectsState?: ProjectsState);
}
export declare class ProjectsActionsReducer {
    static addProjects: (projects: ProjectData[]) => (prev: ProjectsState) => ProjectsState;
    static setLanguageFilter: (languages: string[]) => (prev: ProjectsState) => ProjectsState;
    static removeLanguageFilter: (languages: string[]) => (prev: ProjectsState) => ProjectsState;
    static setFrameworkFilter: (frameworks: string[]) => (prev: ProjectsState) => ProjectsState;
    static removeFrameworkFilter: (frameworks: string[]) => (prev: ProjectsState) => ProjectsState;
    static setSelectedProject: (selectedProject?: number | undefined) => (prev: ProjectsState) => ProjectsState;
}
export declare const ProjectsContextProvider: any, useProjectsContext: any;
export {};
