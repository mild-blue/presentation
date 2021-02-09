export const MoreInfoType = {
  Contact: 1,
  Team: 2
}

// todo: Send options from HTML
export const BASE_OPTIONS = {
  team: ['tomas', 'honza', 'marek', 'lukas', 'nasta', 'beta'],
  projects: ['breviary', 'txm', 'datavid', 'ekg'],
  showCooperation: false,
  showSubtitle: true,
  showCoFounderLabel: true,
  moreInfoType: MoreInfoType.Contact
}

export const EDWARDS_OPTIONS = {
  team: ['tomas', 'honza', 'marek', 'lukas', 'beta'],
  projects: ['txm', 'breviary', 'ekg'],
  showCooperation: true,
  showSubtitle: false,
  showCoFounderLabel: false,
  moreInfoType: MoreInfoType.Team
}
