import React from "react";
declare type Constructor<T> = new (...args: any[]) => T;
export declare function ContextProvider<Action, State>(context: any, state: State, action: Action, stateConstructor: Constructor<State>, aa: Constructor<Action>): (props: {
    value?: State;
}) => JSX.Element;
export declare function createCoupled<Action, State>(state: State, action: Action, stateConstructor: Constructor<State>, actionConstructor: Constructor<Action>): [
    (props: {
        children: React.ReactNode;
        value?: State | undefined;
    }) => JSX.Element,
    () => State & Action
];
export {};
