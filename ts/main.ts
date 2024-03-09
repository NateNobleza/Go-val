let apiData;
// const $home = document.querySelector('[data-view="homepage"]');
const $agentContainer = document.querySelector('#agent-container');
const $agentSearch = document.querySelector('input');
const $form = document.querySelector('form');

$form?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const agent = $agentSearch.value.trim();
  if (!agent) {
    $agentContainer.textContent = 'enter agent';
    return;
  }

  try {
    const response = await fetch('https://valorant-api.com/v1/agents');
    if (!response.ok) {
      throw new Error('HTTP error');
    } else {
      const data = await response.json();
      console.log(data);
      const $newAgent = document.createElement('li');
      $newAgent.setAttribute('class', 'agents.displayName agents.description');
      $agentContainer?.appendChild($newAgent);
    }

    apiData = data.data;
    if (apiData.length > 0) {
      for (let i = 0; apiData.length; i++) {
        $agentContainer?.append(data[i]);
      }
    } else {
      $agentContainer.textContent = 'no agents listed';
    }
  } catch (error) {
    console.error('new error', error);
  }
  $agentSearch.value = '';
});
