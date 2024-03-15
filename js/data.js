"use strict";
// Sample data for demonstration
// let data: Agent[] = [];
let data = {
    agentList: [],
};
window.addEventListener('beforeunload', () => {
    const info = JSON.stringify(data);
    localStorage.setItem('valorant-storage', info);
});
const getInfo = localStorage.getItem('valorant-storage');
if (getInfo !== null) {
    data = JSON.parse(getInfo);
}
