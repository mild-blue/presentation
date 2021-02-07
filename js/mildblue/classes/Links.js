export class Links {

  linksContainer = document.querySelector('[data-jsSelector="linksContainer"]');
  carouselOptions = {
    dots: false,
    nav: true,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>'
    ],
    loop: true,
    items: 1,
    margin: 0,
    responsiveClass: true,
    responsive: {
      0: { items: 1 },
      992: { items: 2 }
    }
  };

  async init(imagesDirectory, links) {
    console.log('Loaded links', links);

    if (links.length) {
      this._renderLinks(imagesDirectory, links);
      this._initCarousel();
    }
  }

  _initCarousel() {
    $(this.linksContainer).owlCarousel(this.carouselOptions);

    // Set same heights
    const renderedLinks = this.linksContainer.querySelectorAll('.links-item');
    const maxHeight = Math.max(...Array.from(renderedLinks).map(l => l.offsetHeight));
    renderedLinks.forEach(link => {
      link.style.height = `${maxHeight}px`;
      link.classList.remove('hidden');
    });
  }

  _renderLinks(imagesDirectory, links) {
    const linksOnSlide = 1;
    const slides = Math.ceil(links.length / linksOnSlide);

    for (let i = 0; i < slides; i++) {
      const slide = document.createElement('div');
      slide.classList.add('links-slide');

      const currentLinks = links.slice(linksOnSlide * i, linksOnSlide * (i + 1));
      for (const l of currentLinks) {
        slide.insertAdjacentHTML('beforeend', this._renderLink(imagesDirectory, l));
      }

      this.linksContainer.appendChild(slide);
    }
  }

  _renderLink(imagesDirectory, link) {
    return `<a href="${link.url}" target="_blank" class="links-item hidden">
              <i class="fas fa-external-link-alt"></i>
              <div class="image">
                <div class="image-inner">
                  <img src="${imagesDirectory}/${link.img}" alt="${link.title}"/>
                </div>
              </div>
              <div class="content">
                <div>
                  <h4>${link.source}, ${link.date}</h4>
                  <h3>${link.title}</h3>
                </div>
                <div class="tags">
                    ${link.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
              </div>
            </a>`;
  }
}
