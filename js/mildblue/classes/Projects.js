export class Projects {

  limit = 4;
  projectsListContainer = document.querySelector('[data-selector="projects"]');

  async init(projects, locale) {
    console.log('Loaded projects', projects);
    if (!projects) {
      return;
    }

    if (this.projectsListContainer) {
      this.projectsListContainer.innerHTML = '';
      for (let i = 0; i < this.limit; i++) {
        const item = this._renderProjectListItem(projects[i], locale);
        this.projectsListContainer.insertAdjacentHTML('beforeend', item);
      }
    }
  }

  _renderProjectListItem(project, locale) {
    const website = project['website'] ? `<p>Demo: <a href="${project['website']}">${project['website'].replace(/https:\/\/|http:\/\/|www\./gi, '')}</a></p>` : '';
    return `<div class="flyer__project">
      <p><strong>${project[`name_${locale}`]}</strong></p>
      <p><span>${project[`subtitle_${locale}`]}</span></p>
      <div class="desc">
        <p>${project[`desc_${locale}`]}</p>
        ${website}
      </div>
    </div>`;
  }
}
