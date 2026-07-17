(function () {
  const previewLabels = [
    "preview_01.webp",
    "preview_02.webp",
    "preview_03.webp",
    "preview_04.webp",
    "preview_05.webp",
    "preview_06.webp",
    "preview_07.webp",
    "preview_08.webp",
    "preview_09.webp",
    "preview_10.webp",
  ];

  const personaCards = [
    {
      icon: "people",
      title: "Mãe, pai ou cuidador",
      items: [
        "Ajuda a criança a pedir, escolher e se expressar melhor",
        "Facilita a comunicação na rotina de casa",
        "Reduz frustrações causadas pela dificuldade de comunicação",
      ],
    },
    {
      icon: "teacher",
      title: "Professor, AEE ou educador",
      items: [
        "Recursos visuais prontos para usar em sala",
        "Apoia alunos com TEA, TDAH, surdez ou dificuldade de comunicação",
        "Facilita rotina, combinados, pedidos e participação",
      ],
    },
    {
      icon: "brain",
      title: "Psicopedagogo, fono ou terapeuta",
      items: [
        "Materiais prontos para atendimentos infantis",
        "Apoia intervenções com comunicação alternativa e Libras",
        "Facilita avaliação, rotina, expressão e autonomia",
      ],
    },
    {
      icon: "hands",
      title: "Família ou profissional da inclusão",
      items: [
        "Materiais em Libras, CAA e apoio visual completos",
        "Pode ser reutilizado com diferentes crianças e contextos",
        "Facilita a comunicação no dia a dia, em qualquer ambiente",
      ],
    },
  ];

  function iconSvg(type) {
    const attrs = 'width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    const icons = {
      people: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
      board: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/><path d="M7 8h10"/><path d="M7 12h6"/>',
      teacher: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
      brain: '<path d="M12 5a3 3 0 1 0-5.5 1.7A3 3 0 0 0 7 12h1"/><path d="M12 5a3 3 0 1 1 5.5 1.7A3 3 0 0 1 17 12h-1"/><path d="M8 12a3 3 0 0 0 0 6h1"/><path d="M16 12a3 3 0 0 1 0 6h-1"/><path d="M12 5v14"/><path d="M9 19a3 3 0 0 0 6 0"/>',
      hands: '<path d="m11 17-2 2a2.8 2.8 0 0 1-4 0l-2-2 5-5"/><path d="m13 17 2 2a2.8 2.8 0 0 0 4 0l2-2-5-5"/><path d="m8 12 2-2a2.8 2.8 0 0 1 4 0l2 2"/><path d="m12 14 2-2"/>',
    };
    return `<svg ${attrs}>${icons[type]}</svg>`;
  }

  function makeCheckItem(text) {
    return `
      <li class="flex items-start gap-2.5 text-sm text-foreground/85">
        <span class="custom-check checkmark-circle mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center">✓</span>
        <span>${text}</span>
      </li>
    `;
  }

  function makePreviewSection() {
    const cards = previewLabels.map((label, index) => `
      <figure class="preview-card">
        <img class="preview-image" src="assets/previews/${label}" alt="Preview do material ${index + 1}" loading="lazy" decoding="async">
      </figure>
    `).join("");

    const section = document.createElement("section");
    section.className = "section-padding bg-background";
    section.dataset.customPreviewSection = "true";
    section.innerHTML = `
      <div class="section-container px-4 sm:px-6">
        <div class="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <span class="mb-3 inline-block rounded-full bg-lilas-claro px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-roxo">CONTEÚDO REAL</span>
          <h2 class="mb-3 text-roxo-deep">Veja tudo o que você vai receber</h2>
          <p class="text-base text-muted-foreground sm:text-lg">Pranchas de comunicação, CAA, Libras e atividades inclusivas prontas para imprimir e usar.<br><strong>Passe para o lado e veja exemplos reais do material.</strong></p>
        </div>
        <div class="preview-carousel mx-auto max-w-6xl">
          <button class="preview-nav preview-prev" type="button" aria-label="Preview anterior">‹</button>
          <div class="preview-track" tabindex="0" aria-label="Carrossel de previews do material">${cards}</div>
          <button class="preview-nav preview-next" type="button" aria-label="Proximo preview">›</button>
        </div>
        <div class="mt-8 text-center sm:mt-10">
          <button class="custom-cta-btn inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-bold uppercase tracking-wide text-accent-foreground shadow-cta transition-all duration-300 hover:bg-accent/90 sm:h-14 sm:px-8 sm:text-lg lg:h-16 lg:px-10 lg:text-xl" type="button">SIM, QUERO ACESSAR AGORA →</button>
        </div>
      </div>
    `;
    section.querySelector(".custom-cta-btn").addEventListener("click", () => {
      document.querySelector("#packages")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    const track = section.querySelector(".preview-track");
    const scrollAmount = () => track.clientWidth;
    section.querySelector(".preview-prev").addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });
    section.querySelector(".preview-next").addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });

    return section;
  }

  function makePersonaSection() {
    const cards = personaCards.map((card) => `
      <article class="h-full rounded-3xl border-2 border-lilas-medio bg-lilas p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-roxo sm:p-8">
        <div class="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-white text-roxo shadow-md sm:h-20 sm:w-20">${iconSvg(card.icon)}</div>
        <h3 class="mb-4 text-xl font-bold text-roxo-deep">${card.title}</h3>
        <ul class="space-y-2.5 text-left">${card.items.map(makeCheckItem).join("")}</ul>
      </article>
    `).join("");

    const section = document.createElement("section");
    section.className = "section-padding bg-background";
    section.dataset.customPersonaSection = "true";
    section.innerHTML = `
      <div class="section-container px-4 sm:px-6">
        <div class="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <span class="mb-3 inline-block rounded-full bg-lilas-claro px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-roxo">VOCÊ SE IDENTIFICA?</span>
          <h2 class="mb-3 text-roxo-deep">Você se identifica com alguma dessas situações?</h2>
          <p class="text-base text-muted-foreground sm:text-lg">Se você convive ou trabalha com crianças que precisam de apoio para se comunicar, esse material foi feito para você.</p>
        </div>
        <div class="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">${cards}</div>
      </div>
    `;
    return section;
  }

  function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function findSectionByText(main, text) {
    const needle = normalizeText(text);
    return Array.from(main.querySelectorAll("section")).find((section) => normalizeText(section.textContent).includes(needle));
  }



  const categoryChecklistCards = [
    {
      title: "Comunicação Alternativa e CAA",
      items: [
        "160 cards de comunicação alternativa",
        "Modelos de prancha de comunicação",
        "Cards de necessidades, ações e rotina",
      ],
    },
    {
      title: "Libras e Inclusão",
      items: [
        "+100 cards de Libras com sinal visual",
        "Alfabeto completo em Libras",
        "Prancha de comunicação para crianças surdas",
      ],
    },
    {
      title: "Emoções, Rotina e Socialização",
      items: [
        "Cards de emoções e sentimentos",
        "Atividades de expressão emocional",
        "Recursos para socialização e escolhas",
      ],
    },
    {
      title: "Apoio para Escola, Família e Clínica",
      items: [
        "Apostila completa de 80 páginas em PDF",
        "Fichas de acompanhamento e relatórios prontos",
        "Materiais reutilizáveis para diferentes crianças",
      ],
    },
  ];
  function makeCategoryChecklistBlock() {
    const wrapper = document.createElement("div");
    wrapper.className = "custom-category-checklist mt-10 sm:mt-12 max-w-5xl mx-auto bg-white rounded-3xl p-7 sm:p-10 shadow-soft border border-lilas-medio";
    wrapper.dataset.customCategoryChecklist = "true";
    wrapper.innerHTML = `
      <div class="grid md:grid-cols-2 gap-4 sm:gap-5">
        ${categoryChecklistCards.map((card) => `
          <div class="bg-gradient-to-b from-white to-lilas border border-lilas-medio rounded-2xl p-5 sm:p-6 shadow-soft h-full">
            <h4 class="inline-block bg-roxo text-white px-3 py-1.5 rounded-full text-sm sm:text-base font-heading font-extrabold mb-4">${card.title}</h4>
            <ul class="space-y-2.5">
              ${card.items.map((item) => `
                <li class="flex items-start gap-2.5 text-sm sm:text-base text-foreground/85">
                  <span class="checkmark-circle w-5 h-5 mt-0.5 flex-shrink-0 custom-check">✓</span>
                  <span>${item}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    `;
    return wrapper;
  }

  const practicalSectionCards = [
    {
      icon: "home",
      accent: "#1f7cff",
      accentSoft: "#e7f0ff",
      title: "Em casa",
      text: "Use a rotina visual para organizar a sa\u00EDda de casa pela manh\u00E3 e os cards de comunica\u00E7\u00E3o para a crian\u00E7a pedir o que precisa sem frustra\u00E7\u00E3o.",
    },
    {
      icon: "board",
      accent: "#16b874",
      accentSoft: "#e6f8ef",
      title: "Na sala de aula",
      text: "Aplique a prancha de comunica\u00E7\u00E3o na roda do dia e os combinados visuais nas transi\u00E7\u00F5es entre atividades.",
    },
    {
      icon: "brain",
      accent: "#7c3aed",
      accentSoft: "#f0e9ff",
      title: "No atendimento",
      text: "Use os cards de emo\u00E7\u00F5es para trabalhar autopercep\u00E7\u00E3o e as fichas de acompanhamento para registrar a evolu\u00E7\u00E3o da sess\u00E3o.",
    },
    {
      icon: "hands",
      accent: "#f97316",
      accentSoft: "#fff0e5",
      title: "Na inclus\u00E3o escolar",
      text: "Leve os recursos de Libras para refor\u00E7ar a comunica\u00E7\u00E3o com colegas surdos e reutilize o material em diferentes turmas.",
    },
  ];

  function makePracticalSection() {
    const section = document.createElement("section");
    section.className = "section-padding bg-lilas";
    section.dataset.customPracticalSection = "true";
    section.innerHTML = `
      <div class="section-container px-4 sm:px-6">
        <div class="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <span class="mb-3 inline-block rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-roxo">COMO USAR NA PR\u00C1TICA</span>
          <h2 class="mb-3 text-roxo-deep">Veja como isso funciona no seu dia a dia</h2>
          <p class="text-base text-muted-foreground sm:text-lg">Veja como os recursos podem facilitar a comunica\u00E7\u00E3o, a rotina e os atendimentos com crian\u00E7as que precisam de apoio visual.</p>
        </div>
        <div class="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          ${practicalSectionCards.map((card) => `
            <article class="flex h-full items-center gap-4 rounded-3xl border-2 bg-white p-5 text-left shadow-soft transition-all duration-300 hover:-translate-y-1 sm:p-6" style="border-color: ${card.accentSoft};">
              <div class="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full shadow-md sm:h-16 sm:w-16" style="background-color: ${card.accentSoft}; color: ${card.accent};">${iconSvg(card.icon)}</div>
              <div class="min-w-0">
                <h3 class="mb-2 text-xl font-bold text-roxo-deep">${card.title}</h3>
                <p class="text-sm leading-relaxed text-muted-foreground sm:text-base">${card.text}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    `;
    return section;
  }
  function updateContentAndPracticalSections(main, previewSection) {
    const section = findSectionByText(main, "Comunica\u00E7\u00E3o Alternativa e CAA");

    const ctaBlock = previewSection?.querySelector(".custom-cta-btn")?.parentElement;
    if (ctaBlock && !previewSection.querySelector("[data-custom-category-checklist]")) {
      ctaBlock.insertAdjacentElement("beforebegin", makeCategoryChecklistBlock());
    }

    if (section) {
      section.remove();
    }

    const personaSection = document.querySelector("[data-custom-persona-section]");
    if (personaSection && !document.querySelector("[data-custom-practical-section]")) {
      personaSection.insertAdjacentElement("afterend", makePracticalSection());
    }
  }
  function markCompactBonusSections() {
    const main = document.querySelector("#root main");
    if (!main) return false;

    const packageBonusSection = findSectionByText(main, "Bônus do Pacote Completo");
    if (packageBonusSection) {
      packageBonusSection.classList.add("custom-mobile-compact-bonus", "custom-mobile-bonus-grid");
      packageBonusSection.classList.remove("custom-mobile-bonus-carousel");
      const cardsTrack = packageBonusSection.querySelector(".grid.max-w-6xl");
      if (cardsTrack) cardsTrack.classList.add("custom-bonus-track");
    }

    return true;
  }
  function applySections() {
    if (document.querySelector("[data-custom-preview-section]")) return true;

    const main = document.querySelector("#root main");
    if (!main) return false;

    const hero = Array.from(main.querySelectorAll("section")).find((section) => section.querySelector("h1"));
    const firstPersona = findSectionByText(main, "Você se identifica com alguma dessas situações?");
    const secondPersona = findSectionByText(main, "Feito para quem precisa facilitar a comunicação da criança");

    if (!hero || !firstPersona) return false;

    markCompactBonusSections();

    const previewSection = makePreviewSection();
    hero.insertAdjacentElement("afterend", previewSection);
    firstPersona.replaceWith(makePersonaSection());

    if (secondPersona && !secondPersona.dataset.customPersonaSection) {
      secondPersona.remove();
    }

    updateContentAndPracticalSections(main, previewSection);

    return true;
  }

  function start() {
    let attempts = 0;
    function tick() {
      attempts += 1;
      if (applySections() || attempts > 80) return;
      window.requestAnimationFrame(tick);
    }
    tick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
