import React from "react";
import { Action } from './action';
export declare function ContextProvider<State extends Action<State>>(context: any, state: State): (props: {
    value?: State;
}) => JSX.Element;
export declare function createSingle<State extends Action<State>>(state: State): [(props: {
    value?: State | undefined;
    children: React.ReactNode;
}) => JSX.Element, () => State];
