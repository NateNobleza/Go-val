interface Agent {
  displayName: string;
  description: string;
  displayIcon: string;
}

interface Data {
  agentList: Agent[];
}

let data: Data = {
  agentList: [],
};

let data: Agent[] = [
  {
    displayName: 'Agent 1',
    description: 'Description of Agent 1',
    displayIcon: 'url/to/agent1/icon.png',
  },
  {
    displayName: 'Agent 2',
    description: 'Description of Agent 2',
    displayIcon: 'url/to/agent2/icon.png',
  },
];

window.addEventListener('beforeunload', () => {
  const info = JSON.stringify(data);
  localStorage.setItem('valorant-storage', info);
});
const getInfo = localStorage.getItem('valorant-storage');
if (getInfo !== null) {
  data = JSON.parse(getInfo);
}
