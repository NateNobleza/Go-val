let apiData;
const $home = document.querySelector('[data-view="homepage"]');
const $agentContainer = document.querySelector('#agent-container');
const $agentSearch = document.querySelector('input');
const $form = document.querySelector('form');
const $star = document.querySelector('.star')

function card(
  displayIcon: object,
  displayName: object,
  description: object,
): void {
  const agentCard = document.createElement('div');
  agentCard.setAttribute('class', 'agent-card');

  const icon = document.createElement('img');
  icon.setAttribute('src', displayIcon);
  icon.setAttribute('alt', `${displayName} icon`);
  agentCard.appendChild(icon);

  const name = document.createElement('h2');
  name.setAttribute('class', 'agent-name')
  name.textContent = displayName;
  agentCard.appendChild(name);

  const desc = document.createElement('p');
  desc.textContent = description;
  agentCard.appendChild(desc);

  const button = document.createElement('button')
  button.setAttribute('id', 'add-button')
  button.textContent = 'add'
  agentCard.appendChild(button)

  $agentContainer.appendChild(agentCard);
}

$star?.addEventListener('click',(event: Event)=>{
console.log('button clicked')
} )

$form?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const agent = $agentSearch.value.trim();
  if (!agent) {
    $agentContainer.textContent = 'Enter Agent';
    return;
  }

  try {
    const response = await fetch('https://valorant-api.com/v1/agents');
    if (!response.ok) {
      throw new Error('HTTP error');
    } else {
      const data = await response.json();

      apiData = data.data;
    }

    if (apiData.length > 0) {
      for (let i = 0; apiData.length; i++) {
        const { displayName, description, displayIcon } = apiData[i];
        card(displayIcon, displayName, description);
        console.log(apiData)
      }

    } else {
      $agentContainer.textContent = 'no agents listed';
    }
  } catch (error) {
    console.error('new error', error);
  }
  $agentSearch.value = '';
});

$agentContainer?.addEventListener('click', (event) =>{
  if(event.target.tagName === 'BUTTON')
  console.log('button clicked')
const agentCard = event.target.closest ('.agent-card')
if(agentCard){
  const agentName = agentCard.querySelector('h2')?.textContent;
  console.log('agentName')
  if (agentName){
    const matchingAgent = apiData.find((agent: any) => agent.displayName === agent);
    if (matchingAgent){
      console.log(matchingAgent)
      pushData(matchingAgent)
    } else{
      console.log('No matching agent')
    }
  } else {
    console.log('Agent name not found')
  }
} else{
  console.log('Agent card not found')
}

  //have logic that targets a specific li that was clicked
  //grab something in the dom tree 'agent name"
  //compare agent name to api data, find a match that matches the name and object
  //push object that matches into data.ts file
})
// const nate =  {
//     displayName: "Agent 3",
//     description: "Description of Agent 3",
//     displayIcon: "url/to/agent3/icon.png"
//   },

function pushData(agentData: Agent): void {
  data.push(agentData)

}
// pushData(nate)
