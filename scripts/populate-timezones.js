import timezones from './timezones.js';

export function populateTimezones(selectElementId) {
  const select = document.getElementById(selectElementId);
  if (!select) return;
  timezones.forEach(zone => {
    const option = document.createElement('option');
    option.value = zone.value;
    option.textContent = zone.label;
    select.appendChild(option);
  });
}
