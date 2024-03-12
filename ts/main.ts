let apiData;
// const $home = document.querySelector('[data-view="homepage"]');
const $agentContainer = document.querySelector('#agent-container');
const $agentSearch = document.querySelector('input');
const $form = document.querySelector('form');

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
  name.textContent = displayName;
  agentCard.appendChild(name);

  const desc = document.createElement('p');
  desc.textContent = description;
  agentCard.appendChild(desc);

  $agentContainer.appendChild(agentCard);
}

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
      }
    } else {
      $agentContainer.textContent = 'no agents listed';
    }
  } catch (error) {
    console.error('new error', error);
  }
  $agentSearch.value = '';
});
