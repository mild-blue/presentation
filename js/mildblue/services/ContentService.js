export class ContentService {

  options;
  sourcesFilename;
  apiUrl = 'https://raw.githubusercontent.com/mild-blue/about/master';

  constructor(options) {
    this.options = options;
  }

  async getCompany() {
    return await fetch(`${this.apiUrl}/company.json`).then(res => res.status === 200 ? res.json() : undefined);
  }

  async getProjects(directory) {
    if (!directory) {
      return [];
    }

    let projects = await fetch(`${this.apiUrl}/${directory}/${this.sourcesFilename}`).then(res => res.status === 200 ? res.json() : res);
    if (projects && projects.length) {
      if(this.options.projects !== undefined && this.options.projects.length > 0) {
        projects = projects.filter(p => this.options.projects.includes(p));
      }
      return this._fetch(directory, projects);
    }
  }

  async getLinks(directory) {
    if (!directory || !this.sourcesFilename) {
      return;
    }

    const sources = await fetch(`${this.apiUrl}/${directory}/${this.sourcesFilename}`).then(res => res.status === 200 ? res.json() : res);
    if (!sources || !sources.length) {
      return;
    }

    const links = await this._fetch(directory, sources);
    const articlesKey = 'best_articles';
    const articlesCount = [...links.map(l => l[articlesKey])].reduce((a, b) => a + b.length, 0);
    const articles = [];

    for (let i = 0; i <= articlesCount; i++) {
      for (const l of links) {
        if (l[articlesKey][i] !== undefined) {
          articles.push(l[articlesKey][i]);
        }
      }
    }

    return articles;
  }

  async getTeam(directory) {
    if (!directory || !this.sourcesFilename) {
      return [];
    }

    const members = await fetch(`${this.apiUrl}/${directory}/${this.sourcesFilename}`).then(res => res.status === 200 ? res.json() : res);
    if (members && members.length) {
      return this._fetch(directory, members);
    }
  }

  async _fetch(directory, files) {
    let responses = await Promise.all(files.map(f => fetch(`${this.apiUrl}/${directory}/${f}.json`)));
    responses = responses.filter(response => response.status === 200); // filter unsuccessful responses
    return await Promise.all(responses.map(response => response.json())); // get json data
  }
}
