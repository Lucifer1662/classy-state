import React from 'react';

export class Action<T = any>{
    setState(e:T){}
    /**
     * Called every time a render occurs
     * Overide this function to use hooks and pass down setState to 
     * children
     */
    public init(){}

    /**
     * Merges the params with the current state
     * @param newState the newState to be merge in with the old
     */
    public merge(newState:any){this.setState({...this, ...newState})}
    
    /**
     * Pass the new inplace updates to setState
     * this.setState({...this})
     */
    public update(){ 
        //@ts-ignore
        this.setState({...this})
    }
}

