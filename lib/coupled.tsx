
import React, { createContext, ReactNode, useState, useContext } from "react";



type Constructor<T> = new (...args: any[]) => T;

export function ContextProvider<Action, State>(context: any, state: State, action: Action, stateConstructor : Constructor<State>, aa : Constructor<Action>) {

    class W extends aggregation(stateConstructor, aa) {}

    const w = new W();

    for (let key in state) {
        //@ts-ignore
        w[key] = state[key];
    }

    for (let key in action) {
        //@ts-ignore
        w[key] = action[key];
    }

    
    return function ProjectsContextProvider(props: { value?: State }) {       
        const [states, setState] = useState(props.value || w);      
        //@ts-ignore
        states.__proto__ = w.__proto__;

        if(props.value){
            for (let key in action) {
                //@ts-ignore
                states[key] = action[key];
            }
        }

        //@ts-ignore
        states.setState = setState;
        
        //@ts-ignore
        states.use();

        return <context.Provider {...props} value={states} />
    }
}

export function createCoupled<Action, State>(state: State, action: Action, stateConstructor : Constructor<State>, actionConstructor : Constructor<Action>)
    : [(props: {
        children: React.ReactNode;
        value?: State | undefined;
    }) => JSX.Element, () => State & Action] {

    const context = createContext([state, action]);
    const provider = ContextProvider(context, state, action, stateConstructor, actionConstructor);
    const useCon = () => {
        return  useContext(context);
    };

    //@ts-ignore
    return [provider, useCon];
}

var aggregation = (baseClastateConstructor : any, ...mixins : any) => {
    class base extends baseClastateConstructor {
        constructor (...args : any) {
            super(...args);
            mixins.forEach((mixin : any) => {
                copyProps(this,(new mixin));
            });
        }
    }
    let copyProps = (target: any, source: any) => {  // this function copies all properties and symbols, filtering out some special ones
        Object.getOwnPropertyNames(source)
        //@ts-ignore
              .concat(Object.getOwnPropertySymbols(source))
              .forEach((prop) => {
                 if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
                 //@ts-ignore
                    Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
               })
    }
    mixins.forEach((mixin:any) => { // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
    });
    return base;
}








