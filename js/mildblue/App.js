import { Company } from './classes/Company';
import { Projects } from './classes/Projects';
import { Team } from './classes/Team';
import { ContentService } from './services/ContentService';
import { AllowedLanguages } from './language';

export class App {

  contentService = new ContentService();

  company;
  team;
  projects;

  init(options) {
    // pass options to all elements
    this.contentService = new ContentService(options);

    this.company = new Company(options);
    this.team = new Team(options);
    this.projects = new Projects(options);

    // Get locale from hash and render content
    let locale = window.location.hash.replace('#', '');
    locale = AllowedLanguages.includes(locale) ? locale : 'en';
    this._renderContent(locale);

    // Listen for hash change
    window.removeEventListener('hashchange', this.init.bind(this));
    window.addEventListener('hashchange', this.init.bind(this));
  }

  async _renderContent(locale) {
    console.log('Init', locale)

    // Get company
    const company = await this.contentService.getCompany();
    console.log('Loaded company', company);
    if (!company) {
      return;
    }

    // Render company info
    this.company.init(company, locale);

    // Render projects, media links and team
    const photosDirectory = `${this.contentService.apiUrl}/${company['people_dir']}/photos`;
    this.contentService.sourcesFilename = company['sources_filename'];
    this.contentService.getTeam(company['people_dir']).then(members => this.team.init(photosDirectory, members, company['contact_person_email'], company['contact_person_phone_number'], locale));
    this.contentService.getProjects(company['projects_dir']).then(projects => this.projects.init(projects, locale));
  }
}
