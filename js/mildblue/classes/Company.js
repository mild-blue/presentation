import { Translations } from '../language';

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
    const companyEmail = company['email'];
    if (companyEmail && this.contactContainer) {
      this._renderContact(companyEmail, locale);
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

  _renderContact(email, locale) {
    const template = `${Translations[`company_contact_${locale}`]} <a href="mailto:${email}">${email}</a>`;
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
