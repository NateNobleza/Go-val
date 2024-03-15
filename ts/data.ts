// /* exported data */
// //create data object (local storage) (code journal)
// Define the interface for Agent data
 interface Agent {
  displayName: string;
  description: string;
  displayIcon: string;
}
interface Data {
  agentList: Agent[];
}

// Sample data for demonstration
// let data: Agent[] = [];
let data: Data = {
  agentList: [],
}
window.addEventListener('beforeunload', ()=>{
  const info = JSON.stringify(data);
  localStorage.setItem('valorant-storage', info)
})
const getInfo = localStorage.getItem('valorant-storage');
if(getInfo !== null){
  data = JSON.parse(getInfo);
}
