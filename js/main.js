"use strict";
let apiData;
const $home = document.querySelector('[data-view="homepage"]');
const $agentContainer = document.querySelector('#agent-container');
const $agentSearch = document.querySelector('input');
const $form = document.querySelector('form');
const $star = document.querySelector('.star');
const $agentContainer2 = document.querySelector('#agent-container2');
function card(displayIcon, displayName, description) {
    const agentCard = document.createElement('div');
    agentCard.setAttribute('class', 'agent-card');
    const icon = document.createElement('img');
    icon.setAttribute('src', displayIcon);
    icon.setAttribute('alt', `${displayName} icon`);
    agentCard.appendChild(icon);
    const name = document.createElement('h2');
    name.setAttribute('class', 'agent-name');
    name.textContent = displayName;
    agentCard.appendChild(name);
    const desc = document.createElement('p');
    desc.textContent = description;
    agentCard.appendChild(desc);
    const button = document.createElement('button');
    button.setAttribute('id', 'add-button');
    button.textContent = 'add';
    agentCard.appendChild(button);
    $agentContainer.appendChild(agentCard);
}
function card2(displayIcon, displayName, description) {
    const agentCard2 = document.createElement('div');
    agentCard2.setAttribute('class', 'agent-card2');
    const icon2 = document.createElement('img');
    icon2.setAttribute('src', displayIcon);
    icon2.setAttribute('alt', `${displayName} icon`);
    agentCard2.appendChild(icon2);
    const name2 = document.createElement('h2');
    name2.setAttribute('class', 'agent-name2');
    name2.textContent = displayName;
    agentCard2.appendChild(name2);
    const desc2 = document.createElement('p');
    desc2.textContent = description;
    agentCard2.appendChild(desc2);
    $agentContainer2.appendChild(agentCard2);
}
// $star?.addEventListener('click', () => {
//   const $homepageView = document.querySelector('[data-view="homepage"]');
//   const $hiddenView = document.querySelector('.hidden');
//   $homepageView.classList.toggle('hidden');
//   $hiddenView.classList.toggle('hidden');
//   if (!$hiddenView.classList.contains('hidden')) {
//     populateFavorites();
//   }
// });
// function populateFavorites() {
//   const $favoriteList = document.querySelector('.favorite-list');
//   $favoriteList.innerHTML = '';
//   if (data.agentList.length === 0) {
//     $favoriteList.textContent = 'No favorites yet.';
//     return;
//   }
//   const favoritesFragment = document.createDocumentFragment();
//  if (data.agentList.length > 0) {
//       for (let i = 0; data.agentList.length; i++) {
//         const { displayName, description, displayIcon } = data.agentList[i];
//     card2(displayIcon, displayName, description);
//   });
//   $favoriteList.appendChild(favoritesFragment);
// }
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
        }
        else {
            const data = await response.json();
            apiData = data.data;
        }
        if (apiData.length > 0) {
            for (let i = 0; apiData.length; i++) {
                const { displayName, description, displayIcon } = apiData[i];
                card(displayIcon, displayName, description);
                console.log(apiData);
            }
        }
        else {
            $agentContainer.textContent = 'no agents listed';
        }
    }
    catch (error) {
        console.error('new error', error);
    }
    $agentSearch.value = '';
});
$agentContainer?.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON')
        console.log('button clicked');
    const agentCard = event.target.closest('.agent-card');
    if (agentCard) {
        const agentName = agentCard.querySelector('h2')?.textContent;
        console.log('agentName');
        if (agentName) {
            const matchingAgent = apiData.find((agent) => agent.displayName === agentName);
            if (matchingAgent) {
                console.log(matchingAgent);
                pushData(matchingAgent);
            }
            else {
                console.log('No matching agent');
            }
        }
        else {
            console.log('Agent name not found');
        }
    }
    else {
        console.log('Agent card not found');
    }
});
$star?.addEventListener('click', () => {
    const $homepageView = document.querySelector('[data-view="homepage"]');
    const $hiddenView = document.querySelector('.hidden');
    $homepageView.classList.toggle('hidden');
    $hiddenView.classList.toggle('hidden');
    if (!$hiddenView.classList.contains('hidden')) {
        populateFavorites();
    }
});
function populateFavorites() {
    const $favoriteList = document.querySelector('.favorite-list');
    $favoriteList.innerHTML = '';
    if (data.agentList.length === 0) {
        $favoriteList.textContent = 'No favorites yet.';
        return;
    }
    if (data.agentList.length > 0) {
        for (let i = 0; data.agentList.length; i++) {
            const { displayName, description, displayIcon } = data.agentList[i];
            card2(displayIcon, displayName, description);
        }
    }
    else {
        console.log('no card found');
    }
}
;
function pushData(agentData) {
    data.agentList.push(agentData);
}
function deleteItems() {
}
