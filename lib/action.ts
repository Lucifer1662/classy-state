import { Dispatch } from "./dispatch";

export class Action<T>{
    protected setState: Dispatch<T> = ()=>{};
}
