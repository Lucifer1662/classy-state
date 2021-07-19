import React, { ReactNode } from "react";
import { Action } from './action';
export declare function ContextProvider<ActionT extends Action<State>, State>(context: any, state: State, action: ActionT): (props: {
    children: ReactNode;
    value?: State;
}) => JSX.Element;
export declare function createDecoupled<ActionT extends Action<State>, State>(state: State, action: ActionT): [(props: {
    value?: State | undefined;
    children: React.ReactNode;
}) => JSX.Element, () => [State, ActionT]];
