import { ContentService } from '../services/ContentService';

export class Team {

  contentService = new ContentService();
  teamContainer = document.querySelector('[data-jsSelector="teamContainer"]');

  async init(photosDirectory, members, companyEmail) {
    console.log('Loaded team', members);
    if (!members) {
      return;
    }

    // Set team members count
    const count = document.querySelector('[data-jsSelector="teamMembersCount"]');
    if (count) {
      count.innerHTML = members.length;
    }

    // Render team
    const row = document.createElement('div');
    row.classList.add('row');
    for (const m of members) {
      row.insertAdjacentHTML('beforeend', this._renderMember(photosDirectory, m, companyEmail));
    }
    this.teamContainer.appendChild(row);
  }

  _renderMember(photosDirectory, member, companyEmail) {

    const image = `${photosDirectory}/${member.key}.webp`;
    return `<div class="col-lg-6">
                <a href="mailto:${member.email}?cc=${companyEmail}&subject=Contact from Mild Blue website" class="team-members__item">
                <div>
                  <div class="header">
                    <div class="item-image">
                      <img src="${image}" alt="${member.name}"/>
                    </div>
                    <div>
                      <h2>${member.name}</h2>
                      <h4>${member.title_en}</h4>
                    </div>
                  </div>
                  <p>${member.short_desc_en}</p>
                </div>
                <div class="link"><span class="btn btn-outline-primary">Ask ${member.nick}</span></div>
                </a>
              </div>`;
  }
}
