import { Dispatch } from "./dispatch";
export declare class Action<T> {
    protected setState: Dispatch<T>;
}
