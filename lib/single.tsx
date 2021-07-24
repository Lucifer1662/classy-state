
import React, { createContext, ReactNode, useContext } from "react";
import { useState } from "./useState";
import { Action } from './action';

export function ContextProvider<State extends Action<State>>(context: any, state: State) {
    return function ProjectsContextProvider(props: { value?: State }) {
        const states = useState(props.value || state);     
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

