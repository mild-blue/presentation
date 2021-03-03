import { Translations } from '../language';
import { MoreInfoType } from '../constants';

export class Company {

  options;

  // Texts
  sloganContainer = document.querySelector('[data-selector="slogan"]');
  mottoContainer = document.querySelector('[data-selector="motto"]');
  submottoContainer = document.querySelector('[data-selector="submotto"]');

  // Contact
  contactContainer = document.querySelector('[data-selector="company-contact"]');

  constructor(options) {
    this.options = options;
  }

  async init(company, locale) {

    // Email
    if(this.contactContainer) {
      let label = Translations[`company_contact_${locale}`];
      let link = company['email'];

      if(!link || (this.options.moreInfoType !== undefined && this.options.moreInfoType === MoreInfoType.Team)) {
        label = Translations[`more_team_info_${locale}`]
        link = 'https://mild.blue/';
      }

      if (link) {
        this._renderContact(label, link);
      }
    }


    // Texts
    if (company[`slogan_${locale}`] && this.sloganContainer) {
      this._renderSlogan(company[`slogan_${locale}`]);
    }
    if (company[`motto_${locale}`] && this.mottoContainer) {
      this._renderMotto(company[`motto_${locale}`]);
    }

    if(this.options.showSubtitle === undefined || this.options.showSubtitle) {
      if (company[`submotto_${locale}`] && this.submottoContainer) {
        this._renderSubmotto(company[`submotto_${locale}`]);
      }
    }
  }

  _renderContact(label, link) {
    let template = `${label} <a href="${link}">${link}</a>.`;

    this.contactContainer.innerHTML = '';
    this.contactContainer.insertAdjacentHTML('beforeend', template);
  }

  _renderSlogan(content) {
    this.sloganContainer.innerHTML = content;
  }

  _renderMotto(content) {
    content = content.replace('the potential of AI and machine learning', `<strong>the potential of AI and machine learning</strong>`);
    content = content.replace('potenciál umělé inteligence a strojového učení', `<strong>potenciál umělé inteligence a strojového učení</strong>`);
    this.mottoContainer.innerHTML = content;
  }

  _renderSubmotto(content) {
    this.submottoContainer.innerHTML = content;
  }
}
