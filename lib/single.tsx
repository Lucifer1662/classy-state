
import React, { createContext, ReactNode, useState, useContext } from "react";
import { Action } from './action';

export function ContextProvider<State extends Action<State>>(context: any, state: State) {
    return function ProjectsContextProvider(props: { value?: State }) {
        const [states, dispatch] = useState(props.value || state);     
        //@ts-ignore
        states.__proto__ = state.__proto__;
        //@ts-ignore
        states.setState = dispatch;

        return <context.Provider {...props} value={states} />
    }
}

export function createSingle<State extends Action<State>>(state: State)
    : [(props: { value?: State | undefined;  children: React.ReactNode; } ) => JSX.Element, () => State] {

    const context = createContext(state);
    const provider = ContextProvider(context, state);
    const useCon = () => useContext(context);

    //@ts-ignore
    return [provider, useCon];
}

