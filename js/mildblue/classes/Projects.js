import { Translations } from '../language';

export class Projects {

  options;

  limit = 4;
  projectsListContainer = document.querySelector('[data-selector="projects"]');
  headingContainer = document.querySelector('[data-selector="projects-heading"]');

  constructor(options) {
    this.options = options;
  }

  async init(projects, locale) {
    console.log('Loaded projects', projects);
    if (!projects) {
      return;
    }

    // Render heading
    if(this.headingContainer) {
      this.headingContainer.innerHTML = Translations[`our_projects_${locale}`];
    }

    // Render projects
    if(this.options.showCooperation !== undefined && this.options.showCooperation) {
      this.limit = 3;
    }

    if (this.projectsListContainer) {
      this.projectsListContainer.innerHTML = '';
      for (let i = 0; i < this.limit; i++) {
        const item = this._renderProjectListItem(projects[i], locale);
        this.projectsListContainer.insertAdjacentHTML('beforeend', item);
      }
    }

    // Render cooperation
    if(this.options.showCooperation !== undefined && this.options.showCooperation) {
      const texts = Translations[`cooperation_${locale}`];
      const cooperation = this._renderCooperation(texts);
      this.projectsListContainer.insertAdjacentHTML('beforeend', cooperation);
    }
  }

  _renderProjectListItem(project, locale) {
    const website = project['website'] ? `<p>Demo available at <a href="${project['website']}">${project['website'].replace(/https:\/\/|http:\/\/|www\./gi, '')}</a>.</p>` : '';
    return `<div class="flyer__project">
      <p><strong>${project[`name_${locale}`]}</strong></p>
      <p><span>${project[`subtitle_${locale}`]}</span></p>
      <div class="desc">
        <p>${project[`desc_${locale}`]}</p>
        ${website}
      </div>
    </div>`;
  }

  _renderCooperation(cooperation) {
    return `<div class="flyer__project cooperation">
      <p><strong>${cooperation.title}</strong></p>
      <div class="desc">
        <p>${cooperation.content}</p>
      </div>
    </div>`;
  }
}
