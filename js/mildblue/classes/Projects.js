export class Projects {

  projectsListContainer = document.querySelector('[data-jsSelector="projectsList"]');
  projectsDetailContainer = document.querySelector('[data-jsSelector="projectsDetail"]');
  projectsNavs = document.querySelector('[data-jsSelector="projectsNavs"]');

  async init(projects) {
    console.log('Loaded projects', projects);
    if (!projects) {
      return;
    }

    if (this.projectsListContainer) {
      for (let i = 0; i < projects.length; i++) {
        const item = this._renderProjectListItem(i + 1, projects[i]);
        this.projectsListContainer.insertAdjacentHTML('beforeend', item);
      }
    }

    if (this.projectsDetailContainer) {
      for (let i = 0; i < projects.length; i++) {
        const item = this._renderProjectDetail(i + 1, projects[i]);
        this.projectsDetailContainer.insertAdjacentHTML('beforeend', item);
      }
    }

    if (this.projectsListContainer && window.innerWidth <= 929) {
      const links = $(this.projectsListContainer.querySelectorAll('a'));
      this._initMobileCarousel(links);
    }
  }

  _renderProjectListItem(key, project) {
    const index = key < 10 ? `0${key}` : key;
    const activeClass = key === 1 ? 'active' : '';
    return `<a class="list-group-item list-group-item-action ${activeClass}" id="list-project${key}"
               data-toggle="list" href="#project${key}" role="tab">
              <div class="index">${index}</div>
              <div class="content">
                <h2>${project.name_en}</h2>
                <h4>${project.subtitle_en}</h4>
              </div>
            </a>`;
  }

  _renderProjectDetail(key, project) {
    const link = project.website ? `<a href="${project.website}" target="_blank" class="btn btn-outline-white">See more</a>` : '';
    const activeClass = key === 1 ? 'show active' : '';
    return `<div id="project${key}" class="tab-pane fade ${activeClass}" role="tabpanel" aria-labelledby="list-project${key}">
              <h2>${project.name_en}</h2>
              <p>${project.desc_en}</p>
              ${link}
            </div>`;
  }

  _initMobileCarousel(projectLinks) {
    let activeTab = 0;

    // Function to show one link and hide others
    const showTab = (me) => {
      for (let i = 0; i < projectLinks.length; i++) {
        const tabLink = projectLinks[i];
        if (i === me) {
          tabLink.style.display = 'flex';
          $(tabLink).tab('show');
        } else {
          tabLink.style.display = 'none';
        }
      }
    };

    // Show only first link
    showTab(activeTab);

    // Listen for arrow clicks
    const navs = this.projectsNavs.querySelectorAll('[data-jsSelector^="projects-nav"]');
    for (const n of navs) {
      n.addEventListener('click', (e) => {
        e.preventDefault();

        if (n.dataset.jsselector.includes('prev')) {
          activeTab -= 1;
          activeTab = activeTab < 0 ? projectLinks.length - 1 : activeTab;
        } else if (n.dataset.jsselector.includes('next')) {
          activeTab += 1;
          activeTab = activeTab === projectLinks.length ? 0 : activeTab;
        }

        showTab(activeTab);
      });
    }
  }
}
