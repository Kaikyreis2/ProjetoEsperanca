const videoHero = document.querySelector("#hero-video");

if (videoHero) {
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  const controlarVideo = () => {
    if (reduzirMovimento.matches) {
      videoHero.pause();
      return;
    }

    videoHero.play().catch(() => {
      videoHero.style.display = "none";
    });
  };

  controlarVideo();
  reduzirMovimento.addEventListener("change", controlarVideo);

  videoHero.addEventListener("error", () => {
    videoHero.style.display = "none";
  });
}



/* =========================================================
   PHOTO GALLERY SECTION
   Save as: assets/js/gallery.js
   Then add this before </body> in index.html:
   <script src="/assets/js/gallery.js" defer></script>
   ========================================================= */

   



/* PARALLAX SECTION */
const parallaxSection = document.querySelector(".parallax-section");
const parallaxImage = document.querySelector("[data-parallax-image]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (parallaxSection && parallaxImage && !reducedMotion.matches) {
  let frameId = null;

  function updateParallax() {
    const bounds = parallaxSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (bounds.bottom < -200 || bounds.top > viewportHeight + 200) {
      frameId = null;
      return;
    }

    const imageHeight = parallaxImage.offsetHeight;
    const imageScale = 1.2;
    const safeTravelDistance = Math.max(
      0,
      ((imageHeight * imageScale) - bounds.height) / 2 - 8
    );

    const scrollRange = viewportHeight + bounds.height;
    const progress = (viewportHeight - bounds.top) / scrollRange;
    const clampedProgress = Math.max(0, Math.min(1, progress));

    const translateY =
      -safeTravelDistance +
      clampedProgress * (safeTravelDistance * 2);

    parallaxImage.style.transform = `
      translate3d(0, calc(-50% + ${translateY}px), 0)
      scale(${imageScale})
    `;

    frameId = null;
  }

  function requestParallaxUpdate() {
    if (frameId !== null) return;

    frameId = window.requestAnimationFrame(updateParallax);
  }

  window.addEventListener("scroll", requestParallaxUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestParallaxUpdate);
  window.addEventListener("load", requestParallaxUpdate);

  requestParallaxUpdate();
}



/* interactive tour */
const comparison = document.querySelector("#image-comparison");
const comparisonRange = document.querySelector("#comparison-range");
const tourTabs = [...document.querySelectorAll(".tour-tab")];
const spaceEyebrow = document.querySelector("#space-eyebrow");
const spaceTitle = document.querySelector("#space-title");
const spaceDescription = document.querySelector("#space-description");
const beforeImage = document.querySelector("#before-image");
const afterImage = document.querySelector("#after-image");

const spaces = {
  "main-hall": {
    eyebrow: "Salão principal",
    title: "O coração do sítio",
    description: "Veja o salão ganhar vida: de um espaço amplo e acolhedor ao cenário completo para receber seus convidados.",
    beforeImage: "/assets/img/main-hall/main-hall2.png",
    beforeAlt: "Salão principal antes da montagem do evento",
    afterImage: "/assets/img/main-hall/main-hall.png",
    afterAlt: "Salão principal preparado para um evento"
  },
  rooms: {
    eyebrow: "Quartos",
    title: "Conforto para ficar",
    description: "Ambientes preparados para que anfitriões e convidados possam descansar com tranquilidade depois da celebração.",
    beforeImage: "/assets/images/interactive-tour/rooms-before.webp",
    beforeAlt: "Quarto antes da decoração",
    afterImage: "/assets/images/interactive-tour/rooms-after.webp",
    afterAlt: "Quarto preparado para receber hóspedes"
  },
  "lake-garden": {
    eyebrow: "Lago & jardim",
    title: "Natureza como cenário",
    description: "O jardim e o lago dão ao evento uma paisagem aberta, leve e especial em cada momento do dia.",
    beforeImage: "/assets/images/interactive-tour/lake-garden-before.webp",
    beforeAlt: "Jardim e lago antes da cerimônia",
    afterImage: "/assets/images/interactive-tour/lake-garden-after.webp",
    afterAlt: "Jardim e lago preparados para uma cerimônia"
  },
  barbecue: {
    eyebrow: "Churrasqueira",
    title: "Encontros sem pressa",
    description: "Uma área acolhedora para refeições, confraternizações e celebrações que atravessam o dia.",
    beforeImage: "/assets/images/interactive-tour/barbecue-before.webp",
    beforeAlt: "Área de churrasqueira antes da montagem",
    afterImage: "/assets/images/interactive-tour/barbecue-after.webp",
    afterAlt: "Área de churrasqueira preparada para convidados"
  }
};

function updateComparisonPosition(value) {
  if (!comparison) return;
  comparison.style.setProperty("--comparison-position", `${value}%`);
}

function updateSpace(spaceKey) {
  const space = spaces[spaceKey];

  if (!space || !beforeImage || !afterImage) return;

  spaceEyebrow.textContent = space.eyebrow;
  spaceTitle.textContent = space.title;
  spaceDescription.textContent = space.description;

  beforeImage.src = space.beforeImage;
  beforeImage.alt = space.beforeAlt;
  afterImage.src = space.afterImage;
  afterImage.alt = space.afterAlt;

  comparisonRange.value = 50;
  updateComparisonPosition(50);
}

if (comparison && comparisonRange) {
  updateComparisonPosition(comparisonRange.value);

  comparisonRange.addEventListener("input", (event) => {
    updateComparisonPosition(event.target.value);
  });
}

tourTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const isAlreadyActive = tab.classList.contains("is-active");

    tourTabs.forEach((button) => {
      const isActive = button === tab;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    if (!isAlreadyActive) {
      updateSpace(tab.dataset.space);
    }
  });
});

/* MAP JS */

const mapMarkers = [...document.querySelectorAll(".map-marker")];
const mapCapacity = document.querySelector("#map-details-capacity");
const mapTitle = document.querySelector("#map-details-title");
const mapImage = document.querySelector("#map-details-image");
const mapDescription = document.querySelector("#map-details-description");


const siteSpaces = {
  "pools": {
    "name": "Piscinas",
    "alt": "Ver detalhes das piscinas",
    "description": "Área de piscinas integrada a um espaço de lazer em meio à natureza.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290738/AreaDePiscinas_pwjpvu.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790290738/AreaDePiscinas_pwjpvu.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790290738/AreaDePiscinas_pwjpvu.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290738/AreaDePiscinas_pwjpvu.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790290738/AreaDePiscinas_pwjpvu.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  },

  "gourmet-area": {
    "name": "Área gourmet",
    "alt": "Ver detalhes da área gourmet",
    "description": "Espaço para refeições, confraternizações e momentos de convivência.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290736/AreaDaChurrasqueira_sphv9w.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790290736/AreaDaChurrasqueira_sphv9w.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790290736/AreaDaChurrasqueira_sphv9w.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290736/AreaDaChurrasqueira_sphv9w.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790290736/AreaDaChurrasqueira_sphv9w.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  },

  "field-sand": {
    "name": "Campo de areia",
    "alt": "Ver detalhes do campo de areia",
    "description": "Área de areia destinada a atividades esportivas e momentos de lazer.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291089/CampoDeAreia_wq1yox.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790291089/CampoDeAreia_wq1yox.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790291089/CampoDeAreia_wq1yox.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291089/CampoDeAreia_wq1yox.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790291089/CampoDeAreia_wq1yox.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  },

  "soccer-field": {
    "name": "Campo de futebol",
    "alt": "Ver detalhes do campo de futebol",
    "description": "Campo gramado destinado à prática de futebol e atividades esportivas.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291090/CampoFutebol2_ui4l51.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790291090/CampoFutebol2_ui4l51.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790291090/CampoFutebol2_ui4l51.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291090/CampoFutebol2_ui4l51.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790291090/CampoFutebol2_ui4l51.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  },

  "games-area": {
    "name": "Área de jogos",
    "alt": "Ver detalhes da área de jogos",
    "description": "Espaço destinado a jogos e atividades recreativas para os visitantes.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291149/SalaoDeJogos3_pxamzm.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790291149/SalaoDeJogos3_pxamzm.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790291149/SalaoDeJogos3_pxamzm.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291149/SalaoDeJogos3_pxamzm.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790291149/SalaoDeJogos3_pxamzm.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  },

  "main-hall": {
    "name": "Salão principal",
    "alt": "Ver detalhes do salão principal",
    "description": "Ambiente amplo para celebrações, eventos e encontros.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291488/VistaAreaCentral3_dqyh8y.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790291488/VistaAreaCentral3_dqyh8y.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790291488/VistaAreaCentral3_dqyh8y.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291488/VistaAreaCentral3_dqyh8y.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790291488/VistaAreaCentral3_dqyh8y.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  },

  "meeting-hall": {
    "name": "Salão de reunião",
    "alt": "Ver detalhes do salão de reunião",
    "description": "Espaço reservado para reuniões, encontros e atividades em grupo.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291374/EntradaSalaoDeReuniao_gqsgr9.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790291374/EntradaSalaoDeReuniao_gqsgr9.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790291374/EntradaSalaoDeReuniao_gqsgr9.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291374/EntradaSalaoDeReuniao_gqsgr9.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790291374/EntradaSalaoDeReuniao_gqsgr9.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  },

  "secondary-hall": {
    "name": "Salão secundário",
    "alt": "Ver detalhes do salão secundário",
    "description": "Ambiente complementar para eventos, encontros e atividades do sítio.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291621/DormitorioSecundarioVistaFora_ksjyax.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790291621/DormitorioSecundarioVistaFora_ksjyax.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790291621/DormitorioSecundarioVistaFora_ksjyax.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291621/DormitorioSecundarioVistaFora_ksjyax.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790291621/DormitorioSecundarioVistaFora_ksjyax.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  },

  "tertiary-room": {
    "name": "Quarto terciário",
    "alt": "Ver detalhes do quarto terciário",
    "description": "Acomodação destinada ao descanso e à hospedagem dos visitantes.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291617/QuartoComFrigobar_kpjtcy.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790291617/QuartoComFrigobar_kpjtcy.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790291617/QuartoComFrigobar_kpjtcy.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790291617/QuartoComFrigobar_kpjtcy.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790291617/QuartoComFrigobar_kpjtcy.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  },

  "lake-four": [
    {
      "name": "Lago 4",
      "alt": "Ver detalhes do lago 4",
      "description": "Área de lago cercada por vegetação e integrada à paisagem natural.",
      "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290230/Lago5_uc21re.png",
      "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790290230/Lago5_uc21re.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790290230/Lago5_uc21re.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290230/Lago5_uc21re.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790290230/Lago5_uc21re.png 1600w",
      "sizes": "(max-width: 1024px) 100vw, 50vw"
    },
    {
      "name": "Lago 4",
      "alt": "Ver detalhes do lago 4",
      "description": "Área de lago cercada por vegetação e integrada à paisagem natural.",
      "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290230/Lago5_uc21re.png",
      "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790290230/Lago5_uc21re.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790290230/Lago5_uc21re.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290230/Lago5_uc21re.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790290230/Lago5_uc21re.png 1600w",
      "sizes": "(max-width: 1024px) 100vw, 50vw"
    }
  ],

  "lake-five": {
    "name": "Lago 5",
    "alt": "Ver detalhes do lago 5",
    "description": "Lago inserido em uma área verde que valoriza o contato com a natureza.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290221/Lago4_p0l6yx.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790290221/Lago4_p0l6yx.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790290221/Lago4_p0l6yx.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290221/Lago4_p0l6yx.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790290221/Lago4_p0l6yx.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  },

  "lake-two": [
    {
      "name": "Lago 2",
      "alt": "Ver detalhes do lago 2",
      "description": "Espelho d'água cercado por áreas verdes e caminhos do sítio.",
      "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290229/Lago2_lsltcs.png",
      "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790290229/Lago2_lsltcs.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790290229/Lago2_lsltcs.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290229/Lago2_lsltcs.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790290229/Lago2_lsltcs.png 1600w",
      "sizes": "(max-width: 1024px) 100vw, 50vw"
    },
    {
      "name": "Lago 2",
      "alt": "Ver detalhes do lago 2",
      "description": "Espelho d'água cercado por áreas verdes e caminhos do sítio.",
      "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290229/Lago2_lsltcs.png",
      "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790290229/Lago2_lsltcs.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790290229/Lago2_lsltcs.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290229/Lago2_lsltcs.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790290229/Lago2_lsltcs.png 1600w",
      "sizes": "(max-width: 1024px) 100vw, 50vw"
    }
  ],

  "lake-three": {
    "name": "Lago 3",
    "alt": "Ver detalhes do lago 3",
    "description": "Lago integrado à vegetação e aos espaços de convivência do sítio.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290227/Lago3_miaami.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790290227/Lago3_miaami.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790290227/Lago3_miaami.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290227/Lago3_miaami.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790290227/Lago3_miaami.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  },

  "green-area": {
    "name": "Área verde",
    "alt": "Ver detalhes da área verde",
    "description": "Área arborizada destinada ao descanso, circulação e contato com a natureza.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/v1790290555/Paisagem2_w2mibl.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790290555/Paisagem2_w2mibl.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790290555/Paisagem2_w2mibl.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290555/Paisagem2_w2mibl.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790290555/Paisagem2_w2mibl.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  },

  "lake-one": {
    "name": "Lago 1",
    "alt": "Ver detalhes do lago 1",
    "description": "Área de lago integrada à vegetação e à paisagem natural do sítio.",
    "src": "https://res.cloudinary.com/djekybsww/image/upload/v1790290555/Paisagem2_w2mibl.png",
    "srcset": "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790290555/Paisagem2_w2mibl.png 480w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790290555/Paisagem2_w2mibl.png 768w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790290555/Paisagem2_w2mibl.png 1200w, https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790290555/Paisagem2_w2mibl.png 1600w",
    "sizes": "(max-width: 1024px) 100vw, 50vw"
  }
}

preloadMapImages();

function selectMapSpace(spaceKey) {
  let selectedSpace = siteSpaces[spaceKey];

  if (!selectedSpace || !mapImage) return;

  if (Array.isArray(selectedSpace)) {
    selectedSpace = selectedSpace[0];
  }

  mapMarkers.forEach((marker) => {
    const isActive = marker.dataset.space === spaceKey;

    marker.classList.toggle("is-active", isActive);
    marker.setAttribute("aria-pressed", String(isActive));
  });

  mapTitle.textContent = selectedSpace.name;
  mapImage.src = selectedSpace.src;
  mapImage.srcset = selectedSpace.srcset || "";
  mapImage.sizes = selectedSpace.sizes || "";
  mapImage.alt = selectedSpace.alt;
  mapDescription.textContent = selectedSpace.description;
}
function preloadMapImages() {
  Object.values(siteSpaces).forEach((space) => {
    const items = Array.isArray(space) ? space : [space];

    items.forEach((item) => {
      if (!item?.src) return;

      const image = new Image();

      image.srcset = item.srcset || "";
      image.sizes = item.sizes || "";
      image.src = item.src;
    });
  });
}

mapMarkers.forEach((marker) => {
  marker.addEventListener("click", () => {
    selectMapSpace(marker.dataset.space);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const mapToggle = document.getElementById("map-layer-toggle");
  const mapLayout = document.querySelector(".site-map__layout");
  const mapImage = document.querySelector(".map-panel__image");

  if (!mapToggle || !mapLayout || !mapImage) {
    return;
  }

  const DESKTOP_BREAKPOINT = 1025;

  const map4x3 = {
    src: "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790636475/Map4x3_az5cpk.png",

    srcset: `
      https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790636475/Map4x3_az5cpk.png 480w,
      https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790636475/Map4x3_az5cpk.png 768w,
      https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790636475/Map4x3_az5cpk.png 1200w,
      https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790636475/Map4x3_az5cpk.png 1600w,
      https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_2200/v1790636475/Map4x3_az5cpk.png 2200w
    `,

    width: 1600,
    height: 1200
  };

  const map16x9 = {
    src: "https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790866494/Map16x9_bomi9w.png",

    srcset: `
      https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_480/v1790866494/Map16x9_bomi9w.png 480w,
      https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_768/v1790866494/Map16x9_bomi9w.png 768w,
      https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1200/v1790866494/Map16x9_bomi9w.png 1200w,
      https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_1600/v1790866494/Map16x9_bomi9w.png 1600w,
      https://res.cloudinary.com/djekybsww/image/upload/f_auto,q_auto,w_2200/v1790866494/Map16x9_bomi9w.png 2200w
    `,

    width: 1600,
    height: 900
  };

  function isDesktop() {
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  }

  function changeMapImage(map) {
  mapImage.classList.add("is-changing");

  const newImage = new Image();

  newImage.onload = () => {
    mapImage.removeAttribute("srcset");

    mapImage.width = map.width;
    mapImage.height = map.height;

    mapImage.src = map.src;
    mapImage.srcset = map.srcset;

    requestAnimationFrame(() => {
      mapImage.classList.remove("is-changing");
    });
  };

  newImage.src = map.src;
}

  mapToggle.addEventListener("click", () => {
    const isActive =
      mapToggle.getAttribute("aria-pressed") === "true";

    if (isDesktop()) {

      if (isActive) {
      
        changeMapImage(map16x9);

        mapLayout.classList.add("is-map-only");

        mapToggle.setAttribute("aria-pressed", "false");
        mapToggle.setAttribute(
          "aria-label",
          "Mostrar pontos interativos do mapa"
        );

      } else {
       
        changeMapImage(map4x3);

        mapLayout.classList.remove("is-map-only");

        mapToggle.setAttribute("aria-pressed", "true");
        mapToggle.setAttribute(
          "aria-label",
          "Ocultar pontos interativos do mapa"
        );
      }

      return;
    }

    /*
     * ================================================
     * TELAS PEQUENAS
     * ================================================
     */

    mapLayout.classList.toggle("pins-hidden", isActive);

    mapToggle.setAttribute(
      "aria-pressed",
      String(!isActive)
    );

    mapToggle.setAttribute(
      "aria-label",
      isActive
        ? "Mostrar pontos do mapa"
        : "Ocultar pontos do mapa"
    );
  });
});

/*WHATSAPP*/
const openWhatsappModalButton = document.querySelector("#open-whatsapp-modal");
const whatsappModal = document.querySelector("#whatsapp-modal");
const whatsappForm = document.querySelector("#whatsapp-form");
const whatsappCloseButtons = [...document.querySelectorAll("[data-modal-close]")];
const contactName = document.querySelector("#contact-name");
const contactPhone = document.querySelector("#contact-phone");
const contactDate = document.querySelector("#contact-date");
const contactGuests = document.querySelector("#contact-guests");
const contactEventType = document.querySelector("#contact-event-type");
const contactMessage = document.querySelector("#contact-message");

let previouslyFocusedElement = null;

function openWhatsappModal() {
  if (!whatsappModal) return;

  previouslyFocusedElement = document.activeElement;
  whatsappModal.classList.add("is-open");
  whatsappModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-modal-open");
  contactName.focus();
}

function closeWhatsappModal() {
  if (!whatsappModal) return;

  whatsappModal.classList.remove("is-open");
  whatsappModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-modal-open");
  previouslyFocusedElement?.focus();
}

function formatDateForMessage(dateValue) {
  if (!dateValue) return "Não informada";

  const [year, month, day] = dateValue.split("-");
  return `${day}/${month}/${year}`;
}

function formatPhoneInput(event) {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    event.target.value = digits;
  } else if (digits.length <= 6) {
    event.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  } else if (digits.length <= 10) {
    event.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  } else {
    event.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
}

openWhatsappModalButton?.addEventListener("click", openWhatsappModal);
whatsappCloseButtons.forEach((button) => button.addEventListener("click", closeWhatsappModal));
contactPhone?.addEventListener("input", formatPhoneInput);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && whatsappModal?.classList.contains("is-open")) {
    closeWhatsappModal();
  }
});

whatsappForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!whatsappForm.checkValidity()) {
    whatsappForm.reportValidity();
    return;
  }

  const whatsappNumber = "55SEUDDDSEUNUMERO";
  const message = [
    "Olá! Gostaria de consultar a disponibilidade do sítio.",
    "",
    `Nome: ${contactName.value.trim()}`,
    `Telefone: ${contactPhone.value.trim()}`,
    `Data pretendida: ${formatDateForMessage(contactDate.value)}`,
    `Convidados: ${contactGuests.value}`,
    `Tipo de evento: ${contactEventType.value}`,
    contactMessage.value.trim() ? `Mensagem: ${contactMessage.value.trim()}` : ""
  ].filter(Boolean).join("\n");

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});


const navigation = document.querySelector("#site-navigation");
const navigationToggle = document.querySelector("#navigation-toggle");
const navigationMenu = document.querySelector("#navigation-menu");

const navigationLinks = [
  ...document.querySelectorAll(".site-navigation__inner [data-target]")
];


function updateNavigationVisibility() {
  if (!navigation) return;

  const shouldShowNavigation = window.scrollY > 120;

  navigation.classList.toggle(
    "is-visible",
    shouldShowNavigation
  );

  if (!shouldShowNavigation) {
    navigationMenu?.classList.remove("is-open");
    navigationToggle?.setAttribute("aria-expanded", "false");
  }
}


function closeNavigationMenu() {
  navigationMenu?.classList.remove("is-open");
  navigationToggle?.setAttribute("aria-expanded", "false");
}


/* =========================================================
   ABRIR / FECHAR MENU
   ========================================================= */

navigationToggle?.addEventListener("click", () => {
  const isOpen = navigationMenu?.classList.toggle("is-open");

  navigationToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
});


/* =========================================================
   NAVEGAÇÃO POR ID
   ========================================================= */

navigationLinks.forEach((link) => {

  link.addEventListener("click", () => {

    const targetId = link.dataset.target;

    if (!targetId) return;

    const targetSection = document.getElementById(targetId);

    if (!targetSection) {
      console.warn(
        `Seção com ID "${targetId}" não encontrada.`
      );

      return;
    }

    const navigationHeight =
      navigation?.getBoundingClientRect().height ?? 0;

    const targetPosition =
      targetSection.getBoundingClientRect().top + window.scrollY + 50;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

    closeNavigationMenu();
  });

});


/* =========================================================
   ESC
   ========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavigationMenu();
  }
});


/* =========================================================
   SCROLL / RESIZE
   ========================================================= */

window.addEventListener(
  "scroll",
  updateNavigationVisibility,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateNavigationVisibility
);

updateNavigationVisibility();


/* =========================================================
   IDENTIFICAR SEÇÃO ATIVA
   ========================================================= */

const navigationObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      navigationLinks.forEach((link) => {

        const targetId = link.dataset.target;

        const isCurrentSection =
          targetId === entry.target.id;

        link.classList.toggle(
          "is-active",
          isCurrentSection
        );

      });

    });

  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);


/* =========================================================
   OBSERVAR SEÇÕES
   ========================================================= */

navigationLinks.forEach((link) => {

  const targetId = link.dataset.target;

  if (!targetId) return;

  const section =
    document.getElementById(targetId);

  if (section) {
    navigationObserver.observe(section);
  }

});


const pastEvents = {
  "camila-rafael": {
    eyebrow: "Casamento · Junho de 2026 · 140 convidados",
    title: "Casamento Camila & Rafael",
    description: "Cerimônia à beira do lago e recepção no gramado com varal de luzes, jantar servido em mesas comunitárias e festa no Salão Principal.",
    spaces: ["Gramado principal", "Salão Principal", "Lagos"],
    photos: [
      {
        src: "/assets/img/lake/lake1.png",
        alt: "Mesas de casamento no gramado com iluminação suspensa",
        location: "Gramado principal"
      },
      {
        src: "/assets/img/eventos/camila-rafael-02.jpg",
        alt: "Cerimônia de casamento ao ar livre à beira do lago",
        location: "Lago lateral"
      },
      {
        src: "/assets/img/eventos/camila-rafael-03.jpg",
        alt: "Festa de casamento montada no Salão Principal",
        location: "Salão Principal"
      }
    ]
  },
  alice: {
    eyebrow: "Aniversário · Abril de 2026 · 60 convidados",
    title: "Aniversário da Alice — 7 anos",
    description: "Festa infantil na beira da piscina com mesas decoradas, recreação ao ar livre e lanche servido na área gourmet.",
    spaces: ["Piscina", "Área gourmet", "Gramado"],
    photos: [
      {
        src: "/assets/img/eventos/alice-01.jpg",
        alt: "Decoração de aniversário infantil perto da piscina",
        location: "Área da piscina"
      },
      {
        src: "/assets/img/eventos/alice-02.jpg",
        alt: "Atividades infantis no gramado do sítio",
        location: "Gramado"
      },
      {
        src: "/assets/img/eventos/alice-03.jpg",
        alt: "Mesa de lanche montada na área gourmet",
        location: "Área gourmet"
      }
    ]
  },
  horizonte: {
    eyebrow: "Retiro corporativo · Março de 2026 · 45 participantes",
    title: "Retiro da Equipe Horizonte",
    description: "Dois dias de imersão com dinâmicas no Salão de Reuniões, pernoite nos quartos e roda de conversa na fogueira ao entardecer.",
    spaces: ["Salão de Reuniões", "Quartos", "Fogueira"],
    photos: [
      {
        src: "/assets/img/eventos/horizonte-01.jpg",
        alt: "Dinâmica de equipe no Salão de Reuniões",
        location: "Salão de Reuniões"
      },
      {
        src: "/assets/img/eventos/horizonte-02.jpg",
        alt: "Acomodação preparada para os participantes do retiro",
        location: "Acomodação"
      },
      {
        src: "/assets/img/eventos/horizonte-03.jpg",
        alt: "Roda de conversa junto à fogueira no fim da tarde",
        location: "Área da fogueira"
      }
    ]
  }
};

const eventModal = document.querySelector("#event-modal");
const carouselTrack = document.querySelector("#event-carousel-track");
const carouselDots = document.querySelector("#event-carousel-dots");
const carouselLocation = document.querySelector("#event-carousel-location");
const modalEyebrow = document.querySelector("#event-modal-eyebrow");
const modalTitle = document.querySelector("#event-modal-title");
const modalDescription = document.querySelector("#event-modal-description");
const modalSpaces = document.querySelector("#event-modal-spaces");
const closeButton = document.querySelector("[data-event-close]");
const previousButton = document.querySelector("[data-carousel-previous]");
const nextButton = document.querySelector("[data-carousel-next]");

let activeEvent = null;
let activePhotoIndex = 0;

function renderCarousel() {
  carouselTrack.innerHTML = activeEvent.photos
    .map((photo) => `
      <figure class="event-carousel__slide">
        <img src="${photo.src}" alt="${photo.alt}" />
      </figure>
    `)
    .join("");

  carouselDots.innerHTML = activeEvent.photos
    .map((_, index) => `
      <button
        class="event-carousel__dot${index === 0 ? " is-active" : ""}"
        type="button"
        data-carousel-dot="${index}"
        aria-label="Ir para a foto ${index + 1}"
        aria-current="${index === 0 ? "true" : "false"}"
      ></button>
    `)
    .join("");

  updateCarouselPosition();
}

function updateCarouselPosition() {
  const currentPhoto = activeEvent.photos[activePhotoIndex];

  carouselTrack.style.transform = `translateX(-${activePhotoIndex * 100}%)`;
  carouselLocation.textContent = `⌖ ${currentPhoto.location}`;

  carouselDots.querySelectorAll("[data-carousel-dot]").forEach((dot, index) => {
    const isActive = index === activePhotoIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function changePhoto(direction) {
  const totalPhotos = activeEvent.photos.length;
  activePhotoIndex = (activePhotoIndex + direction + totalPhotos) % totalPhotos;
  updateCarouselPosition();
}

function openEventModal(eventId) {
  activeEvent = pastEvents[eventId];
  if (!activeEvent) return;

  activePhotoIndex = 0;
  modalEyebrow.textContent = activeEvent.eyebrow;
  modalTitle.textContent = activeEvent.title;
  modalDescription.textContent = activeEvent.description;
  modalSpaces.innerHTML = activeEvent.spaces.map((space) => `<li>⌖ ${space}</li>`).join("");

  renderCarousel();
  eventModal.showModal();
}

function closeEventModal() {
  eventModal.close();
}

document.querySelectorAll("[data-event-id]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openEventModal(link.dataset.eventId);
  });
});

closeButton.addEventListener("click", closeEventModal);
previousButton.addEventListener("click", () => changePhoto(-1));
nextButton.addEventListener("click", () => changePhoto(1));

carouselDots.addEventListener("click", (event) => {
  const dot = event.target.closest("[data-carousel-dot]");
  if (!dot) return;

  activePhotoIndex = Number(dot.dataset.carouselDot);
  updateCarouselPosition();
});

eventModal.addEventListener("click", (event) => {
  if (event.target === eventModal) closeEventModal();
});

document.addEventListener("keydown", (event) => {
  if (!eventModal.open) return;
  if (event.key === "ArrowLeft") changePhoto(-1);
  if (event.key === "ArrowRight") changePhoto(1);
});




/* GALLERY */
const galleryAlbums = {
  rooms: {
    title: "Quartos",
    photos: [
      {
        src: "/assets/img/room/room1.png",
        alt: "Quarto confortável do sítio"
      },
      {
        src: "/assets/img/room/room2.png",
        alt: "Quarto preparado para receber hóspedes"
      },
      {
        src: "/assets/img/room/room3.png",
        alt: "Detalhe da acomodação do sítio"
      }
    ]
  },

  parking: {
    title: "Estacionamento",
    photos: [
      {
        src: "/assets/img/parker/parker1.png",
        alt: "Estacionamento amplo e gramado"
      },
      {
        src: "/assets/img/parker/parker2.png",
        alt: "Entrada do estacionamento do sítio"
      },
      {
        src: "/assets/img/parker/parker3.png",
        alt: "Área de estacionamento próxima aos ambientes"
      }
    ]
  },

  pool: {
    title: "Piscina",
    photos: [
      {
        src: "/assets/img/swimming-pool/pool1.png",
        alt: "Piscina com vista para a natureza"
      },
      {
        src: "/assets/img/swimming-pool/pool2.png",
        alt: "Área da piscina do sítio"
      },
      {
        src: "/assets/img/swimming-pool/pool3.png",
        alt: "Espreguiçadeiras ao redor da piscina"
      },
      {
        src: "/assets/img/swimming-pool/pool4.png",
        alt: "Piscina preparada para receber convidados"
      },
      {
        src: "/assets/img/swimming-pool/pool5.png",
        alt: "Vista da piscina e do gramado"
      }
    ]
  },

  lakes: {
    title: "Lagos",
    photos: [
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790290231/Lago3.1_uvvzgm.png",
        alt: "Lago do sítio ao entardecer"
      },
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790290230/Lago5_uc21re.png",
        alt: "Vista do lago lateral do sítio"
      },
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790290229/Lago2_lsltcs.png",
        alt: "Área verde próxima aos lagos"
      },
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790290227/Lago2.1_x1q4r4.png",
        alt: "Vista do lago lateral do sítio"
      },
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790290227/Lago3_miaami.png",
        alt: "Área verde próxima aos lagos"
      },
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790290221/Lago4_p0l6yx.png",
        alt: "Área verde próxima aos lagos"
      }
    ]
  },

  bathrooms: {
    title: "Banheiros",
    photos: [
      {
        src: "/assets/img/bathroom/bathroom1.png",
        alt: "Banheiro do sítio"
      },
      {
        src: "/assets/img/bathroom/bathroom2.png",
        alt: "Detalhe do banheiro preparado para os convidados"
      },
      {
        src: "/assets/img/bathroom/bathroom3.png",
        alt: "Lavabo do sítio"
      },
      {
        src: "/assets/img/bathroom/bathroom4.png",
        alt: "Banheiro amplo e iluminado"
      },
      {
        src: "/assets/img/bathroom/bathroom5.png",
        alt: "Detalhe da estrutura dos banheiros"
      }
    ]
  },

  "main-hall": {
    title: "Salão Principal",
    photos: [
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790291488/VistaAreaCentral3_dqyh8y.png",
        alt: "Salão Principal preparado para evento"
      },
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790291488/VistaAreaCentral3_dqyh8y.png",
        alt: "Mesas montadas no Salão Principal"
      },
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790291027/CozinhaIndustrial_elsqqf.png",
        alt: "Vista interna do Salão Principal"
      },
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790291024/CozinhaIndustrial3_t6ex7d.png",
        alt: "Salão Principal preparado para evento"
      },
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790290973/DormitorioESaladeRefeicoesAreaCentral_dex0ms.png",
        alt: "Mesas montadas no Salão Principal"
      },
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790290949/DormitorioAreaCentral_qnywe0.png",
        alt: "Vista interna do Salão Principal"
      },
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790290931/BanheiroExteriorSalaoPrincipal_xeslnp.png",
        alt: "Vista interna do Salão Principal"
      }
    ]
  },

  "meeting-hall": {
    title: "Salão de Reuniões",
    photos: [
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790291374/EntradaSalaoDeReuniao_gqsgr9.png",
        alt: "Salão de Reuniões com mesa de madeira"
      },
      {
        src: "https://res.cloudinary.com/djekybsww/image/upload/v1790291371/SalaoDeReuniao_scghcj.png",
        alt: "Ambiente preparado para encontro corporativo"
      }
    ]
  }
};


/* =========================================================
   ELEMENTOS DA PÁGINA
========================================================= */

const gallerySection = document.querySelector("#gallery");

const galleryFilters = document.querySelectorAll(
  ".gallery-filter[data-filter]"
);

const galleryAlbumCards = document.querySelectorAll(
  ".gallery-album[data-category]"
);

const galleryGrid = document.querySelector(".gallery-grid");

const galleryViewer = document.querySelector("#gallery-viewer");

const galleryCarousel = document.querySelector("#gallery-carousel");

const galleryTrack = document.querySelector(
  "#gallery-carousel-track"
);

const galleryCounter = document.querySelector(
  "#gallery-carousel-counter"
);

const previousGalleryButton = document.querySelector(
  "[data-gallery-previous]"
);

const nextGalleryButton = document.querySelector(
  "[data-gallery-next]"
);


/* =========================================================
   ESTADO ATUAL DO CARROSSEL
========================================================= */

let activeGalleryCategory = null;
let activeGalleryPhotos = [];
let activeGalleryPhotoIndex = 0;
let galleryScrollFrame = null;


/* =========================================================
   FUNÇÕES DE APOIO
========================================================= */

function getGallerySlides() {
  if (!galleryTrack) return [];

  return Array.from(
    galleryTrack.querySelectorAll(".gallery-carousel__item")
  );
}

function getSlideScrollPosition(slide) {
  if (!galleryCarousel || !slide) return 0;

  const carouselBounds = galleryCarousel.getBoundingClientRect();
  const slideBounds = slide.getBoundingClientRect();

  return (
    galleryCarousel.scrollLeft +
    slideBounds.left -
    carouselBounds.left
  );
}

function getClosestGalleryPhotoIndex() {
  const slides = getGallerySlides();

  if (!slides.length || !galleryCarousel) return 0;

  let closestIndex = 0;
  let smallestDistance = Infinity;

  slides.forEach((slide, index) => {
    const slidePosition = getSlideScrollPosition(slide);

    const distance = Math.abs(
      galleryCarousel.scrollLeft - slidePosition
    );

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}



function getTotalGalleryPhotos() {
  return activeGalleryPhotos.length;
}

function getPhotoLabel(totalPhotos) {
  return totalPhotos === 1 ? "foto" : "fotos";
}


/* =========================================================
   FILTROS
========================================================= */

function updateGalleryFilters(activeCategory) {
  galleryFilters.forEach((button) => {
    const isActive = button.dataset.filter === activeCategory;

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}


/* =========================================================
   FOTOS DA CATEGORIA
========================================================= */

function getPhotosFromCategory(category) {
  if (category === "all") {
    return Object.entries(galleryAlbums).flatMap(
      ([categoryId, album]) =>
        album.photos.map((photo, index) => ({
          ...photo,
          categoryId,
          albumTitle: album.title,
          photoNumber: index + 1
        }))
    );
  }

  const album = galleryAlbums[category];

  if (!album) return [];

  return album.photos.map((photo, index) => ({
    ...photo,
    categoryId: category,
    albumTitle: album.title,
    photoNumber: index + 1
  }));
}

/* =========================================================
   RENDERIZAÇÃO DAS FOTOS
========================================================= */

function renderGalleryPhotos(category) {
  if (
    !galleryGrid ||
    !galleryViewer ||
    !galleryTrack ||
    !galleryCarousel
  ) {
    return;
  }

  activeGalleryCategory = category;
  activeGalleryPhotos = getPhotosFromCategory(category);
  activeGalleryPhotoIndex = 0;



  galleryTrack.innerHTML = activeGalleryPhotos
    .map((photo, index) => {
      const loading = index === 0 ? "eager" : "lazy";

      return `
        <figure class="gallery-carousel__item">
          <img
          src="${photo.src}"
          srcset="
            ${photo.src.replace('/upload/', '/upload/f_auto,q_auto,w_480/')} 480w,
            ${photo.src.replace('/upload/', '/upload/f_auto,q_auto,w_768/')} 768w,
            ${photo.src.replace('/upload/', '/upload/f_auto,q_auto,w_1024/')} 1024w,
            ${photo.src.replace('/upload/', '/upload/f_auto,q_auto,w_1440/')} 1440w,
            ${photo.src.replace('/upload/', '/upload/f_auto,q_auto,w_1920/')} 1920w,
            ${photo.src.replace('/upload/', '/upload/f_auto,q_auto,w_2560/')} 2560w
          "
          sizes="
            (max-width: 480px) 100vw,
            (max-width: 768px) 100vw,
            (max-width: 1024px) 100vw,
            (max-width: 1440px) 100vw,
            100vw
          "
          alt="${photo.alt}"
          loading="${loading}"
          decoding="async"
          width="1200"
          height="900"
        />

          <figcaption class="gallery-carousel__caption">
            ${photo.albumTitle} · Foto ${photo.photoNumber}
          </figcaption>
        </figure>
      `;
    })
    .join("");

  galleryGrid.hidden = true;
  galleryViewer.hidden = false;

  updateGalleryFilters(category);

  window.requestAnimationFrame(() => {
    galleryCarousel.scrollTo({
      left: 0,
      behavior: "auto"
    });

    updateGalleryCarousel();
  });
}


/* =========================================================
   CONTADOR E ESTADO DAS SETAS
========================================================= */

function updateGalleryCounter() {
  if (!galleryCounter) return;

  const totalPhotos = getTotalGalleryPhotos();

  galleryCounter.textContent =
    `${activeGalleryPhotoIndex + 1} de ${totalPhotos} ` +
    getPhotoLabel(totalPhotos);
}

function updateGalleryNavigationButtons() {
  if (!previousGalleryButton || !nextGalleryButton) return;

  const totalPhotos = getTotalGalleryPhotos();

  previousGalleryButton.disabled = activeGalleryPhotoIndex <= 0;

  nextGalleryButton.disabled =
    activeGalleryPhotoIndex >= totalPhotos - 1;
}

function updateGalleryCarousel() {
  updateGalleryCounter();
  updateGalleryNavigationButtons();
}


/* =========================================================
   MOVIMENTAÇÃO DO CARROSSEL
========================================================= */

function goToGalleryPhoto(index, behavior = "smooth") {
  if (!galleryCarousel || !activeGalleryPhotos.length) return;

  const slides = getGallerySlides();
  const totalPhotos = slides.length;

  if (!totalPhotos) return;

  const normalizedIndex = Math.max(
    0,
    Math.min(index, totalPhotos - 1)
  );

  const targetSlide = slides[normalizedIndex];
  const targetPosition = getSlideScrollPosition(targetSlide);

  activeGalleryPhotoIndex = normalizedIndex;

  galleryCarousel.scrollTo({
    left: targetPosition,
    behavior
  });

  updateGalleryCarousel();
}

function showPreviousGalleryPhoto() {
  if (activeGalleryPhotoIndex <= 0) return;

  goToGalleryPhoto(activeGalleryPhotoIndex - 1);
}

function showNextGalleryPhoto() {
  const totalPhotos = getTotalGalleryPhotos();

  if (activeGalleryPhotoIndex >= totalPhotos - 1) return;

  goToGalleryPhoto(activeGalleryPhotoIndex + 1);
}


function showGalleryOverview() {
  if (!galleryGrid || !galleryViewer) return;

  activeGalleryCategory = null;
  activeGalleryPhotos = [];
  activeGalleryPhotoIndex = 0;

  galleryViewer.hidden = true;
  galleryGrid.hidden = false;

  updateGalleryFilters("all");
}
/* =========================================================
   CLIQUES NOS FILTROS
========================================================= */

galleryFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    if (selectedCategory === "all") {
      showGalleryOverview();
      return;
    }

    renderGalleryPhotos(selectedCategory);
  });
});


/* =========================================================
   CLIQUES NOS CARDS / ÁLBUNS DA GRADE
========================================================= */

galleryAlbumCards.forEach((albumCard) => {
  albumCard.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedCategory = albumCard.dataset.category;

    renderGalleryPhotos(selectedCategory);

    window.setTimeout(() => {
      galleryViewer.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 80);
  });
});


/* =========================================================
   BOTÕES DO CARROSSEL
========================================================= */

if (previousGalleryButton) {
  previousGalleryButton.addEventListener(
    "click",
    showPreviousGalleryPhoto
  );
}

if (nextGalleryButton) {
  nextGalleryButton.addEventListener(
    "click",
    showNextGalleryPhoto
  );
}




/* =========================================================
   ATUALIZAÇÃO AO ARRASTAR / ROLAR
========================================================= */

if (galleryCarousel) {
  galleryCarousel.addEventListener(
    "scroll",
    () => {
      if (galleryScrollFrame !== null) return;

      galleryScrollFrame = window.requestAnimationFrame(() => {
        const totalPhotos = getTotalGalleryPhotos();

        if (!totalPhotos) {
          galleryScrollFrame = null;
          return;
        }

        activeGalleryPhotoIndex = getClosestGalleryPhotoIndex();

        updateGalleryCarousel();

        galleryScrollFrame = null;
      });
    },
    { passive: true }
  );
}


/* =========================================================
   NAVEGAÇÃO PELO TECLADO
========================================================= */

if (galleryCarousel) {
  galleryCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousGalleryPhoto();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextGalleryPhoto();
    }

    if (event.key === "Home") {
      event.preventDefault();
      goToGalleryPhoto(0);
    }

    if (event.key === "End") {
      event.preventDefault();

      const lastPhotoIndex = getTotalGalleryPhotos() - 1;

      goToGalleryPhoto(lastPhotoIndex);
    }
  });
}


/* =========================================================
   AJUSTE APÓS REDIMENSIONAMENTO DA TELA
========================================================= */

window.addEventListener("resize", () => {
  if (!activeGalleryPhotos.length) return;

  goToGalleryPhoto(activeGalleryPhotoIndex, "auto");
});