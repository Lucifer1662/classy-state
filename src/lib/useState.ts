import { useState } from "react";

export function useStateClass<T>(defaultValue: T) {
        const [state, setState] = useState(defaultValue);

        const newState = {};
        Object.assign(newState, state);
        //@ts-ignore
        newState.__proto__ = defaultValue.__proto__;
        //@ts-ignore
        newState.setState = setState;
        //@ts-ignore
        newState.init();

        return newState as T;
}

