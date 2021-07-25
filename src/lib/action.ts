import { SetStateAction } from "react"

export class Action<T = any>{
    setState(e: SetStateAction<T>) { }
    /**
     * Called every time a render occurs
     * Overide this function to use hooks and pass down setState to 
     * children
     */
    public init() { }

    /**
     * Merges the params with the current state
     * @param newState the newState to be merge in with the old
     */
    public merge(newState: any) { this.setState({ ...this, ...newState }) }

    /**
     * Pass the new inplace updates to setState
     * this.setState({...this})
     */
    public update() {
        //@ts-ignore
        this.setState({ ...this })
    }

    /**
     * Applies setState to the items in the list
     * @param items 
     */
    public applySetStateToList<T>(items: T[]) {
        const setStateForChild = (index: number) => {
            return (e: any) => {

                if (typeof e === 'function') {
                    Object.assign(items[index], e(items[index]))
                } else {
                    Object.assign(items[index], e)
                }

                //@ts-ignore                
                this.setState({ ...this })
            }
        }

        items.forEach((item, index) => {
            //@ts-ignore
            item.setState = setStateForChild(index);
        })
    }

    /**
     * Applies setState to the child object
     * @param object 
     */
    public applySetStateToObject<T>(object: T) {
        const setStateForObject = (e: any) => {
            if (typeof e === 'function') {
                Object.assign(object, e(object))
            } else {
                Object.assign(object, e)
            }

            //@ts-ignore                
            this.setState({ ...this })
        }

        //@ts-ignore
        object.setState = setStateForObject;
    }
}

