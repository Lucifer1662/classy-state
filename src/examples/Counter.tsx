import { Action } from "../lib";

export class Counter extends Action<Counter> {
    public count: number = 0;
    constructor(count: number) {
        super();
        this.count = count;
    }

    public increment() { this.add(1) }
    public decrment() { this.merge({ count: this.count - 1 }) }
    public add(amount: number) { this.setCount(this.count + amount) }
    public subtract(amount: number) { this.setCount(this.count - amount) }
    private setCount(count: number) { this.merge({ count }) }
}
