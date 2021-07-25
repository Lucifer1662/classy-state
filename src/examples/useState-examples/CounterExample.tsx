import { useStateClass } from "../../lib";
import {Counter} from '../Counter';

export default function CounterExample() {
    const counter = useStateClass(new Counter(5));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
            <h2>Counter Example State</h2>
            <h3 style={{ textAlign: 'center' }}>{counter.count}</h3>
            <div>
                <button onClick={() => counter.increment()}>increment</button>
                <button onClick={() => counter.decrment()}>decrement</button>
            </div>
        </div>
    )
}



