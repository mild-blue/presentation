export class Projects {

  limit = 4;
  projectsListContainer = document.querySelector('[data-selector="projects"]');

  async init(projects) {
    console.log('Loaded projects', projects);
    if (!projects) {
      return;
    }

    if (this.projectsListContainer) {
      for (let i = 0; i < this.limit; i++) {
        const item = this._renderProjectListItem(projects[i]);
        this.projectsListContainer.insertAdjacentHTML('beforeend', item);
      }
    }
  }

  _renderProjectListItem(project) {
    const website = project['website'] ? `<p>Demo: <a href="${project['website']}">${project['website'].replace(/https:\/\/|http:\/\/|www\./gi, '')}</a>.</p>` : '';
    return `<div class="flyer__project">
      <h2>${project['name_en']}</h2>
      <h3>${project['subtitle_en']}</h3>
      <p>${project['desc_en']}</p>
      ${website}
    </div>`;
  }
}
