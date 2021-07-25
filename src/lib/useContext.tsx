
import { useContext as useContextReact } from 'react';

export function useContextClass<T>(provider: React.Context<T>){
    const state = useContextReact(provider);

    const newState = {}
    Object.assign(newState, state);
    
    //@ts-ignore
    newState.__proto__ = provider._currentValue.__proto__;

    return newState as T;
}