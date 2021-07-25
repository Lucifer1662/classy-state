import CounterExample from './useState-examples/CounterExample'
import CounterExampleContext from './context-exmamples/CounterExample'
import PeopleExample from './context-exmamples/PeopleExample'

export function Examples(){
 return <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:"100%"}}>
     <CounterExample/>
     <CounterExampleContext/> 
     <PeopleExample/>
 </div>
}
