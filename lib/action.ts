import { Dispatch } from "./dispatch";

export class Action<T>{
    public setState: Dispatch<T> = ()=>{};
    protected use(){};
}
