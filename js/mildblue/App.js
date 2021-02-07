import { Company } from './classes/Company';
import { Projects } from './classes/Projects';
import { Team } from './classes/Team';
import { ContentService } from './services/ContentService';

export class App {

  contentService = new ContentService();

  company = new Company();
  team = new Team();
  projects = new Projects();

  async init() {

    // Get company
    const company = await this.contentService.getCompany();
    console.log('Loaded company', company);
    if (!company) {
      return;
    }

    // Render company info
    this.company.init(company);

    // Render projects, media links and team
    const photosDirectory = `${this.contentService.apiUrl}/${company['people_dir']}/photos`;
    this.contentService.sourcesFilename = company['sources_filename'];
    this.contentService.getTeam(company['people_dir']).then(members => this.team.init(photosDirectory, members, company['contact_person_email'], company['contact_person_phone_number']));
    this.contentService.getProjects(company['projects_dir']).then(projects => this.projects.init(projects));
  }
}
