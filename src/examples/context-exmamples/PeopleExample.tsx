import { createContext } from "react";
import { useStateClass, useContextClass} from "../../lib";
import { PeopleStateRemote, Person } from "../People";

const PeopleContext = createContext(new PeopleStateRemote());
const PersonContext = createContext(new Person());


export default function CounterExample() {
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
                <PeopleComponent />
            </PersonContext.Provider>
        
        )}

        <button onClick={() => {
            const jason = new Person("Jason", new Date(Date.now()));
            people.addPerson(jason)
        }}>Add new person</button>

    </div>
}

function PeopleComponent() {
    const person = useContextClass(PersonContext);
    return <div>
        <input type="text" value={person.name} onChange={(e) => {
            person.setName(e.target.value)
        }} />
        <p>{person.DOB.toString()}</p>
    </div>
}



