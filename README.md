# classy-state
## Purpose
This library is created to leverage object orientated programming with react style hooks, using the best of both worlds. 
By providing new <b>useStateClass</b> and <b>useContextClass</b> functions.

## Usage
Create a class that inherits from Action. This provides three new methods.

<b>this.setState()</b>, which is the same as React setState function.

<b>this.use()</b>, can be overriden to call React hooks in.

<b>this.merge(newData)</b>, will merge the newData with the existing.

(the setState method is assigned in the custom useStateClass)

Create a class like you would in any other Object Orientated language with member variables and functions. The one key difference is updating state. Instead of changing variables locally call this.setState or this.merge to update variables. Then create this object in the (new) useStateClass or useStateClass functions.

```typescript
import { createContext } from 'react';
import { Action, useStateClass, useStateClass } from "classy-state";

export class Counter extends Action<Counter> {
    public count: number = 0;

    public increment() { this.setCount(this.count + amount)) }
    public decrment() { this.setCount(this.count - amount) }
    private setCount(count: number) { this.merge({ count }) }
}


// use it as a simple state
function Component(){
    const counter = useStateClass(new Counter());
    return ( ... )
}


//use it in context
const CounterContext = createContext(new Counter());

function Component(){
    const counter = useStateClass(new Counter());
    return (
        <CounterContext.Provider value={counter}>
            <ChildComponent/>
        <CounterContext.Provider>
    )
}

function ChildComponent(){
    const counter = useContextClass(CounterContexts);
    return ( ... )
}
```


# Examples

## Counter class
``` typescript
export class Counter extends Action<Counter> {
    public count: number = 0;
    constructor(count: number) {
        super();
        this.count = count;
    }

    public increment() { this.add(1) }
    public decrement() { this.merge({ count: this.count - 1 }) }
    public add(amount: number) { this.setCount(this.count + amount) }
    public subtract(amount: number) { this.setCount(this.count - amount) }
    private setCount(count: number) { this.merge({ count }) }
}
```

### Counter with useStateClass

```typescript
import { useStateClass, Action } from "classy-state";
import {Counter} from '../Counter'

export default function CounterExample() {
    const counter = useStateClass(new Counter(5));

    return (
        <div>
            <h2>Counter Example</h2>
            <h3>{counter.count}</h3>
            <div>
                <button onClick={() => counter.increment()}>increment</button>
                <button onClick={() => counter.decrement()}>decrement</button>
            </div>
        </div>
    )
}
```

### Counter Context

```typescript
import { createContext } from "classy-state";
import { Counter } from '../Counter';

//provide global default value
const CounterContext = createContext(new Counter(5));

export default function CounterExample() {
    const counter = useStateClass(new Counter(5));
    return (
        //override global default value, note this is still a default
        <CounterContext.Provider value={counter}>
            <Header></Header>
            <Page></Page>
        </CounterContext.Provider>
    )
}

function Header() {
    const counter = useContextClass(CounterContext);
    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
        <h2>Counter Example</h2>
        <h3 style={{ textAlign: 'center' }}>{counter.count}</h3>
    </div>
}

function Page() {
    const counter = useContextClass(CounterContext);
    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
        <div>
            <button onClick={() => counter.increment()}>increment</button>
            <button onClick={() => counter.decrement()}>decrement</button>
        </div>
    </div>
}
```


# Complex People List example
In this example, we create a list of people, with a name and DOB, this data is retrieved from the DB, is able to search for people by name, add a new person, finally edit a persons name.

Note the complexity of each different requirmenent and how it overlaps with state requirements of each other. We will heavily be utilising <b>MixIn</b> to make the design reusable.

Specifically <a href="https://www.npmjs.com/package/ts-mixer">ts-mixer</a> library which is the best typescript mixin library I have found so far.

## Main logic
Contains:
* Person class - describes a person's name, DOB and changeName
* People class - describes a list of people
* PeopleSearch class - adds functionality for filtering out people based on searc keyword
* People Remote class - pulls data from the database when first loaded
* PeopleStateRemote class - the final state with all actions mixed in together

Structured like so:
* PeopleStateRemote
  * PeopleSearch
    * Search
    * People
      * Person
  * PeopleRemote
    * IsLoading
    * People
      * Person

By using mixins we can do this re-inheritance of People, with both instances still refereing to the same data.

``` typescript
import { Action } from "classy-state";
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
    extends Mixin(PeopleSearch, PeopleRemote) { }
```

# Reusable Logic
These classes can be reused easily with other parts of the system
* Search - contains a keyword, and a helper function to filter items
* isLoading - contains the state for loading
``` typescript
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

//reuasable loading action
export class isLoading extends Action {
    public isLoading: boolean = true;

    setLoading(loading:boolean){
        this.setState({...this, isLoading: loading})
    }
}

```

## Rendering People
Rendering is split up into 4 components, and is structured hierarchialy as below
* PeopleExample - the root component, which will hold all the state
  * Header - where a search bar will live 
  * Page - where the list of People will be shown, and filters based on search keyword
    * PersonComponent - that renders a person name and DOB, and can edit the person name in a textfield

Note how all business logic implementation and requirements are not present in this file, only the state and the components and abstract actions.
``` typescript
import { createContext } from "react";
import { useStateClass, useContextClass} from "../../lib";
import { PeopleStateRemote, Person } from "../People";

const PeopleContext = createContext(new PeopleStateRemote());
const PersonContext = createContext(new Person());


export default function PeopleExample() {
    const people = useStateClass(new PeopleStateRemote());
    return (
        <PeopleContext.Provider value={people}>
            <Header></Header>
            <Page></Page>
        </PeopleContext.Provider>
    )
}

function Header() {
    const people = useContextClass(PeopleContext);
    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
        <h2>People Example</h2>
        <input type="text" value={people.searchKey} onChange={(e) => people.setSearch(e.target.value)} />
    </div>
}

function Page() {
    const people = useContextClass(PeopleContext);
    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
        { people.isLoading && "loading" }

        {people.getPeople().map((person) =>
            <PersonContext.Provider value={person}>
                <PersonComponent />
            </PersonContext.Provider>
        
        )}

        <button onClick={() => {
            const jason = new Person("Jason", new Date(Date.now()));
            people.addPerson(jason)
        }}>Add new person</button>

    </div>
}

function PersonComponent() {
    const person = useContextClass(PersonContext);
    return <div>
        <input type="text" value={person.name} onChange={(e) => {
            person.setName(e.target.value)
        }} />
        <p>{person.DOB.toString()}</p>
    </div>
}

```

