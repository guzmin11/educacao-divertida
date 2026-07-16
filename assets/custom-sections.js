(function () {
  const previewLabels = [
    "preview_01.png",
    "preview_02.png",
    "preview_03.png",
    "preview_04.png",
    "preview_05.png",
    "preview_06.png",
    "preview_07.png",
    "preview_08.png",
    "preview_09.png",
    "preview_10.png",
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
          <h2 class="mb-3 text-roxo-deep">Feito para quem precisa facilitar a comunicação da criança</h2>
          <p class="text-base text-muted-foreground sm:text-lg">Use em casa, na sala de aula ou no atendimento com recursos visuais prontos para imprimir.</p>
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



  const practicalUseCards = [
    {
      tag: "🏠 Em casa",
      color: "bg-roxo text-white",
      title: "Em casa",
      desc: "Use a rotina visual para organizar a saída de casa pela manhã e os cards de comunicação para a criança pedir o que precisa sem frustração.",
    },
    {
      tag: "🏫 Na sala de aula",
      color: "bg-accent text-white",
      title: "Na sala de aula",
      desc: "Aplique a prancha de comunicação na roda do dia e os combinados visuais nas transições entre atividades.",
    },
    {
      tag: "🧠 No atendimento",
      color: "bg-amarelo text-roxo-deep",
      title: "No atendimento",
      desc: "Use os cards de emoções para trabalhar autopercepção e as fichas de acompanhamento para registrar a evolução da sessão.",
    },
    {
      tag: "🤝 Na inclusão escolar",
      color: "bg-coral text-white",
      title: "Na inclusão escolar",
      desc: "Leve os recursos de Libras para reforçar a comunicação com colegas surdos e reutilize o material em diferentes turmas.",
    },
  ];

  function makePracticalUseCard(card) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div class="bg-white rounded-2xl overflow-hidden shadow-soft border border-lilas-medio hover:shadow-card hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <div class="px-5 py-3 font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 ${card.color}">${card.tag}</div>
        <div class="p-5 sm:p-7 flex-grow">
          <h3 class="text-roxo-deep text-xl sm:text-2xl mb-2.5 leading-tight">${card.title}</h3>
          <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">${card.desc}</p>
        </div>
      </div>
    `.trim();
    return wrapper.firstElementChild;
  }

  function updateContentAndPracticalSections(main, previewSection) {
    const section = findSectionByText(main, "Comunicação Alternativa e CAA");
    if (!section) return;

    const contentCard = Array.from(section.querySelectorAll("div")).find((element) =>
      normalizeText(element.textContent).includes("comunicacao alternativa e caa") &&
      normalizeText(element.textContent).includes("libras e inclusao") &&
      element.querySelector('img[src*="recursos-prontos-comunica-kids"]')
    );

    if (contentCard) {
      Array.from(contentCard.children).forEach((child) => {
        const text = normalizeText(child.textContent || "");
        const hasCategoryGrid = text.includes("comunicacao alternativa e caa") && text.includes("libras e inclusao");
        const hasMockup = !!child.querySelector('img[src*="recursos-prontos-comunica-kids"]');
        if (!hasCategoryGrid || hasMockup) child.remove();
      });
      contentCard.className = contentCard.className.replace(/\bmb-14\b/g, "").replace(/\bsm:mb-16\b/g, "").trim();
    }

    const practicalHeader = Array.from(section.querySelectorAll("div")).find((element) =>
      normalizeText(element.textContent).includes("como usar na pratica") &&
      normalizeText(element.textContent).includes("ajudar no dia a dia")
    );

    if (practicalHeader) {
      const heading = practicalHeader.querySelector("h2");
      const paragraph = practicalHeader.querySelector("p");
      if (heading) heading.innerHTML = "Veja como isso funciona no seu dia a dia";
      if (paragraph) paragraph.remove();
    }

    const practicalImage = section.querySelector('img[src*="como-ajuda-dia-a-dia-comunica-kids"]');
    const practicalImageBlock = practicalImage?.closest("div.max-w-3xl") || practicalImage?.parentElement;
    if (practicalImageBlock) practicalImageBlock.remove();

    const practicalGrid = Array.from(section.querySelectorAll("div")).find((element) =>
      normalizeText(element.textContent).includes("para comunicacao diaria") &&
      normalizeText(element.textContent).includes("para rotina e autonomia")
    );

    if (practicalGrid) {
      practicalGrid.innerHTML = "";
      practicalUseCards.forEach((card) => {
        const item = document.createElement("div");
        item.appendChild(makePracticalUseCard(card));
        practicalGrid.appendChild(item);
      });
    }

    if (previewSection && section.previousElementSibling !== previewSection) {
      previewSection.insertAdjacentElement("afterend", section);
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
    updateContentAndPracticalSections(main, previewSection);
    firstPersona.replaceWith(makePersonaSection());

    if (secondPersona && !secondPersona.dataset.customPersonaSection) {
      secondPersona.remove();
    }

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
