import { useStateClass, useContextClass } from "../../lib";
import {createContext} from 'react'
import { Counter } from '../Counter';

//provide global default value
const CounterContext = createContext(new Counter(5));

export default function CounterExample() {
   const counter = useStateClass(new Counter(3));
    return (
        //override global default value, note this is still a default
        <CounterContext.Provider value={counter}>
            <Header></Header>
            <Page></Page>
        </CounterContext.Provider>
    )
}

function Header() {
    const counter = useContextClass(CounterContext);
    console.log(counter)
    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
        <h2>Counter Example Context</h2>
        <h3 style={{ textAlign: 'center' }}>{counter.count}</h3>
    </div>
}

function Page() {
    const counter = useContextClass(CounterContext);
    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
        <div>
            <button onClick={() => counter.increment()}>increment</button>
            <button onClick={() => counter.decrment()}>decrement</button>
        </div>
    </div>
}



