import React, { useState as useStateReact} from "react";
import { Action } from './action';

export function useState<State extends Action<State>>(state: State) {
        const [states, dispatch] = useStateReact(state);     
        //@ts-ignore
        states.__proto__ = state.__proto__;
        //@ts-ignore
        states.setState = dispatch;
        //@ts-ignore
        states.use();   
        return states;
}

