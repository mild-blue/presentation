import { App } from './App';
import { BASE_OPTIONS, EDWARDS_OPTIONS } from './constants';

document.addEventListener("DOMContentLoaded", function(event) {

  // todo: quick solution, do not look at it
  const pathParts = window.location.pathname.split('/')
  const templateHtml = pathParts[pathParts.length - 1];
  const options = templateHtml.includes('base.html') ? BASE_OPTIONS : EDWARDS_OPTIONS;

  new App().init(options);
});
