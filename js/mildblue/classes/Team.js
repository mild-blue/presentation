import { ContentService } from '../services/ContentService';
import { Translations } from '../language';

export class Team {

  options;

  contentService = new ContentService();
  teamContainer = document.querySelector('[data-selector="team"]');
  headingContainer = document.querySelector('[data-selector="team-heading"]');

  constructor(options) {
    this.options = options;
  }

  async init(photosDirectory, members, email, phone, locale) {
    console.log('Loaded team', members);
    if (!members) {
      return;
    }

    // Render heading
    if(this.headingContainer) {
      this.headingContainer.innerHTML = Translations[`our_team_${locale}`];
    }

    // Render team
    if(this.options.team !== undefined && this.options.team.length > 0) {
      members = members.filter(m => this.options.team.includes(m.key));
    }

    this.teamContainer.parentElement.classList.add(`size--${members.length}`);
    this.teamContainer.innerHTML = '';
    let showInfo = true; // just for the first member
    for (const m of members) {
      this.teamContainer.insertAdjacentHTML('beforeend', this._renderMember(photosDirectory, m, showInfo, email, phone, locale));
      showInfo = false; // cancel for others
    }
  }

  _renderMember(photosDirectory, member, showInfo = false, email, phone, locale) {

    const image = `${photosDirectory}/${member.key}.webp`;
    const contactInfo = showInfo && email && phone ? `<p class="contact-info"><a href="mailto:${email}">${email}</a><br>${this._formatPhoneNumber(phone)}</p>` : '';
    return `<div class="team-member">
              <div class="team-member__image">
                <img src="${image}" alt="${member.name}"/>
              </div>
              <div class="team-member__desc">
                <p><strong>${member.name}</strong></p>
                <p>${this._formatTitle(member[`title_${locale}`])}</p>
                ${contactInfo}
              </div>
            </div>`;
  }

  _formatTitle(title) {
    console.log(title, this.options.showCoFounderLabel)
    if(this.options.showCoFounderLabel !== undefined && !this.options.showCoFounderLabel) {
      title = title.replace(/, co-founder|& co-founder|co-founder/gi, '')
    }

    return title;
  }

  _formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(420|)?(\d{3})(\d{3})(\d{3})$/);
    if (match) {
      const intlCode = (match[1] ? '+420 ' : '');
      return `${intlCode} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return '';
  }
}
