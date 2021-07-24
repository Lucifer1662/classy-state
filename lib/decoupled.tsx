
import React, { createContext, ReactNode, useState, useContext } from "react";
import { Action } from './action';

export function ContextProvider<ActionT extends Action<State>, State>(context: any, state: State, action: ActionT) {
    return function ProjectsContextProvider(props: { children: ReactNode, value?: State }) {
        const [states, dispatch] = useState(props.value || state);     

        //@ts-ignore
        states.__proto__ = state.__proto__;

        //@ts-ignore
        action.setState = dispatch;

        //@ts-ignore
        states.use();

        return <context.Provider {...props} value={[states, action]} />
    }
}

export function createDecoupled<ActionT extends Action<State>, State>(state: State, action: ActionT)
    : [(props: { value?: State | undefined;  children: React.ReactNode; } ) => JSX.Element, () => [State, ActionT]] {

    const context = createContext([state, action]);
    const provider = ContextProvider(context, state, action);
    const useCon = () => useContext(context);

    //@ts-ignore
    return [provider, useCon];
}









