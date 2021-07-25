import { Action } from "../lib";

//reuasable search action
export class Search extends Action {
    public searchKey: string = "";

    public itemsThatMatch<T>(items: T[], predicate: (t: T, searchKey: string) => boolean) {
        if (this.searchKey)
            return items.filter((item) => predicate(item, this.searchKey));
        return items;
    }

    setSearch(search: string){
        this.setState({...this, searchKey: search})
    }
}
