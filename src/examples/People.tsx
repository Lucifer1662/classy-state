import { Action } from "../lib";
import { Mixin } from 'ts-mixer';
import { useEffect } from "react";
import { Search } from "./Search";
import { isLoading } from "./Loading";

//A person with name, DOB and can change their name
export class Person extends Action {
    constructor(
        public name: string = "",
        public DOB: Date = new Date(Date.now())
    ) { super(); }

    setName(name: string) {
        console.log(name)
        this.setState({ ...this, name })
    }
}

//A list of people
export class People extends Action {
    public people: Person[] = [];

    init() {
        //have to assign each person their own setState function manually
        this.people.forEach((person, index) => {
            person.setState = this.setStateForPerson(index);
        })
    }

    //create a custom setState for each person based on index
    setStateForPerson(index: number) {
        return (e: any) => {
            Object.assign(this.people[index], e)
            this.setState({ ...this })
        }
    }

    setPeople(people: Person[]) {
        this.people = people;
        this.setState({ ...this })
    }

    addPerson(person: Person) {
        this.people.push(person);
        this.setState({ ...this })
    }
}


//make people searchable
export class PeopleSearch extends Mixin(People, Search) {
    public getPeople() {
        return this.itemsThatMatch(this.people, (person, name) => person.name === name);
    }
}

//pull people from a database
export class PeopleRemote extends Mixin(People, isLoading) {

    public init() {
        super.init();
        //hack to use hooks inside member functions
        const Foo = () => {
            useEffect(() => {
                setTimeout(() => {
                    this.setPeople([
                        new Person("Jason", new Date(Date.now())),
                        new Person("Maddy", new Date(Date.now()))
                    ]);
                    this.setLoading(false);
                }, 1000);
            }, [])
        };
        Foo();
    }
}



//mix all the actions together
export class PeopleStateRemote
    extends Mixin(People, Search, PeopleSearch, PeopleRemote) { }