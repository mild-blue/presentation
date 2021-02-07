import { ContentService } from '../services/ContentService';

export class Team {

  contentService = new ContentService();
  teamContainer = document.querySelector('[data-selector="team"]');

  async init(photosDirectory, members, email, phone) {
    console.log('Loaded team', members);
    if (!members) {
      return;
    }

    // Render team
    let showInfo = true; // just for the first member
    for (const m of members) {
      this.teamContainer.insertAdjacentHTML('beforeend', this._renderMember(photosDirectory, m, showInfo, email, phone));
      showInfo = false; // cancel for others
    }
  }

  _renderMember(photosDirectory, member, showInfo = false, email, phone) {

    const image = `${photosDirectory}/${member.key}.webp`;
    const contactInfo = showInfo && email && phone ? `<p class="contact-info"><a href="mailto:${email}">${email}</a><br>${this._formatPhoneNumber(phone)}</p>` : '';
    return `<div class="team-member">
              <div class="team-member__image">
                <img src="${image}" alt="${member.name}"/>
              </div>
              <div class="team-member__desc">
                <p><strong>${member.name}</strong></p>
                <p>${member.title_en}</p>
                ${contactInfo}
              </div>
            </div>`;
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
