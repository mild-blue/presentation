import { ContentService } from '../services/ContentService';

export class Team {

  contentService = new ContentService();
  teamContainer = document.querySelector('[data-selector="team"]');

  async init(photosDirectory, members, companyEmail) {
    console.log('Loaded team', members);
    if (!members) {
      return;
    }

    // Render team
    for (const m of members) {
      this.teamContainer.insertAdjacentHTML('beforeend', this._renderMember(photosDirectory, m, companyEmail));
    }
  }

  _renderMember(photosDirectory, member, companyEmail) {

    const image = `${photosDirectory}/${member.key}.webp`;
    return `<div class="team-member">
              <div class="team-member__image">
                <img src="${image}" alt="${member.name}"/>
              </div>
              <div class="team-member__desc">
                <p><strong>${member.name}</strong></p>
                <p>${member.title_en}</p>
              </div>
            </div>`;
  }
}
