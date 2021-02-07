export class Company {

  // Texts
  sloganContainer = document.querySelector('[data-selector="slogan"]');
  mottoContainer = document.querySelector('[data-selector="motto"]');
  submottoContainer = document.querySelector('[data-selector="submotto"]');

  // Email
  emailContainer = document.querySelector('[data-selector="company-email"]');

  async init(company) {

    // Email
    const companyEmail = company['email'];
    if (companyEmail && this.emailContainer) {
      this._renderEmail(companyEmail);
    }

    // Texts
    if (company['slogan_en'] && this.sloganContainer) {
      this._renderSlogan(company['slogan_en']);
    }
    if (company['motto_en'] && this.mottoContainer) {
      this._renderMotto(company['motto_en']);
    }

    if (company['submotto_en'] && this.submottoContainer) {
      this._renderSubmotto(company['submotto_en']);
    }
  }

  _renderEmail(email) {
    const emailTemplate = `<a href="mailto:${email}">${email}</a>`;
    this.emailContainer.insertAdjacentHTML('beforeend', emailTemplate);
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
