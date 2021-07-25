import { Action } from "../lib";

//reuasable loading action
export class isLoading extends Action {
    public isLoading: boolean = true;

    setLoading(loading:boolean){
        this.setState({...this, isLoading: loading})
    }
}