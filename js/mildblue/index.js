import { App } from './App';

// todo: Send options from HTML
const BASE_OPTIONS = {
  team: ['tomas', 'honza', 'marek', 'lukas', 'nasta', 'beta'],
  projects: ['breviary', 'txm', 'datavid', 'ekg'],
  showCooperation: false,
  showSubtitle: true,
  showCoFounderLabel: true
}

const EDWARDS_OPTIONS = {
  team: ['tomas', 'honza', 'marek', 'lukas', 'beta'],
  projects: ['txm', 'breviary', 'ekg'],
  showCooperation: true,
  showSubtitle: false,
  showCoFounderLabel: false
}

document.addEventListener("DOMContentLoaded", function(event) {

  // todo: quick solution, do not look at it
  const pathParts = window.location.pathname.split('/')
  const templateHtml = pathParts[pathParts.length - 1];
  const options = templateHtml.includes('base.html') ? BASE_OPTIONS : EDWARDS_OPTIONS;

  new App().init(options);
});
