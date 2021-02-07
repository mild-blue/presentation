import { Company } from './classes/Company';
import { Projects } from './classes/Projects';
import { Links } from './classes/Links';
import { Team } from './classes/Team';
import { ContentService } from './services/ContentService';

export class App {

  contentService = new ContentService();

  company = new Company();
  projects = new Projects();
  links = new Links();
  team = new Team();

  async init() {

    // Get company
    const company = await this.contentService.getCompany();
    console.log('Loaded company', company);
    if (!company) {
      return;
    }

    // Render company info
    this.company.init(company);

    // // Render projects, media links and team
    // const photosDirectory = `${this.contentService.apiUrl}/${company['people_dir']}/photos`;
    // const linksImagesDirectory = `${this.contentService.apiUrl}/${company['links_dir']}/img`;
    // this.contentService.sourcesFilename = company['sources_filename'];
    // this.contentService.getProjects(company['projects_dir']).then(projects => this.projects.init(projects));
    // this.contentService.getLinks(company['links_dir']).then(links => this.links.init(linksImagesDirectory, links));
    // this.contentService.getTeam(company['people_dir']).then(members => this.team.init(photosDirectory, members, company['email']));
  }
}
