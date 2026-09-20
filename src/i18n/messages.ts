export type Lang = "en" | "pt";

export const LANGS: Lang[] = ["en", "pt"];
export const DEFAULT_LANG: Lang = "en";

/**
 * All user-facing copy lives here, keyed by language.
 * `en` is the canonical shape; `pt` is type-checked against it so a missing
 * translation is a compile error, not a runtime surprise.
 *
 * Inline emphasis uses **double asterisks** — see <RichText /> — so translated
 * sentences stay readable instead of being chopped into span fragments.
 */
const en = {
  nav: {
    home: ".home()",
    about: ".about()",
    experience: ".experience()",
    projects: ".projects()",
    skills: ".skills()",
    contact: ".contact()",
  },
  hero: {
    greeting: "Hi, I'm João.",
    tagline1: "Front-end developer specializing in Angular, expanding into React and Next.js.",
    tagline2: "Building clean, functional, and minimalist interfaces.",
    downloadCv: "Download CV",
    cvUrl: "/cv/joao-costa-cv-en.pdf",
    stats: [
      { value: "4+ years", label: "of experience with digital products" },
      { value: "Angular & TypeScript", label: "main stack in production" },
      { value: "React. Next.js. AWS.", label: "currently exploring" },
    ],
    telemetry: { modules: "modules", squads: "squads", products: "products" },
    terminal: [
      "Currently a Software Engineer at PicPay, one of Brazil's largest digital banks...",
      "Focused on Angular, TypeScript, and RxJS in production. Now learning React and Next.js...",
      "Studying AWS and AI on the side. Not everything I build runs in a terminal...",
    ],
  },
  achievements: {
    label: "Things I've built and shipped",
    hint: "tap a node",
    core: "whoami",
    seeExperience: "See it in experience",
    readCaseStudy: "Read the case study",
    aboutMe: "More about me",
    close: "Close",
    whoami: {
      label: "joão",
      lines: [
        "from são paulo, brazil",
        "virgo, for whatever that's worth",
        "horror movies, 2000 to 2010 was the golden run",
        "felines of any size pull me in",
      ],
    },
    items: {
      backoffice: {
        label: "Back-office for analysts",
        detail:
          "At PicPay I joined the fraud and chargeback squad on HeroDash, the back-office platform several squads share (customer journeys, platform tooling, wallet, and mine). My squad owns the screens where an analyst picks up a case, reads the customer's data pulled from several systems, and approves or rejects it with a justification that gets recorded.",
      },
      workspace: {
        label: "Fraud workspace",
        detail:
          "A config-driven fraud-analysis workspace that replaced a menu of per-product screens with 4 unified analysis queues across 14+ financial products. I was one of the engineers who built and iterated on it from early on, not just maintaining it afterward.",
      },
      queues: {
        label: "−90% queue code",
        detail:
          "Led the refactor to config-level queue delivery, cutting new-queue code by about 90%, which is what made shipping MED, the Central Bank's mandatory Pix-refund queue, fast.",
      },
      promoted: {
        label: "Promoted · new squad",
        detail:
          "Promoted to mid-level Software Engineer in July 2026, then joined a squad building two internal platforms that replace software the company used to license: a corporate training platform, and a decision tree that guides support agents during customer conversations. My first React in production.",
      },
      pix: {
        label: "PIX & SPB",
        detail:
          "I joined Sinqia as an intern on the team behind their PIX and SPB products, banking software sold to banks and credit unions that weren't directly connected to the Central Bank, so they could still offer PIX to their customers. Mostly Angular front end: transaction processing, SPB monitoring, transaction search and unlock screens, plus config work with Keycloak, RabbitMQ and Jenkins, for banks with zero tolerance for downtime.",
      },
      mixordia: {
        label: "Mixórdia",
        detail:
          "Took over a half-built site for an electronic-music events brand, rebuilt it on Supabase and shipped its TV power-on intro.",
      },
      dispute: {
        label: "Dispute agent",
        detail:
          "A LangGraph + Claude pipeline that decides whether a chargeback is worth fighting and drafts the letter, citing only evidence the merchant has.",
      },
      finlivre: {
        label: "FinLivre",
        detail:
          "A local-first finance app I use every month: OFX parsed by code, photos read by Claude Vision, nothing leaves the browser. 112 unit tests.",
      },
      vizinhelp: {
        label: "vizinhelp",
        detail:
          "I built vizinhelp to finish my postgraduate degree in full-stack development at PUC-RS: a neighborhood app where people offer to teach or help with something, and interested neighbors reach out. I owned it end to end, Angular front end, Node API, PostgreSQL, Keycloak auth, and CI deploying to AWS.",
      },
    },
  },
  about: {
    heading: ".about()",
    paragraphs: [
      "I'm a Front-end Engineer at **PicPay**, one of Brazil's largest digital banks with over 60 million users, where I help build and scale **HeroDash**, our Angular monorepo of 66 feature modules shared across 10+ squads, using TypeScript and RxJS.",
      "I'm currently expanding my stack into **React and Next.js**. This portfolio is the living proof of that journey.",
      "Outside of work, I freelance and build personal projects. The ones that push me the most are the ones built for real people with real problems.",
    ],
  },
  experience: {
    heading: ".experience()",
    jobs: [
      {
        company: "PicPay",
        role: "Frontend Engineer",
        period: "Nov 2024 to Present",
        location: "São Paulo, Brazil",
        note: "One of Brazil's largest digital banks, with 68M+ registered users.",
        bullets: [
          "Built and scaled **HeroDash**, PicPay's Angular monorepo of 66 feature modules shared by 10+ squads, spanning fraud prevention, chargeback, lending, cards, and insurance.",
          "Architected a config-driven fraud-analysis workspace, replacing per-product screens with a unified system of 4 analysis queues across 14+ financial products.",
          "Led the refactor to config-level queue delivery, cutting new-queue code by roughly **90%** and enabling rapid delivery of MED, the Central Bank's mandatory Pix-refund queue.",
        ],
        promotion: "Promoted to mid-level Software Engineer in July 2026.",
      },
      {
        company: "Sinqia",
        role: "Frontend Developer",
        period: "Nov 2021 to Oct 2024",
        location: "São Paulo, Brazil",
        note: "One of Brazil's largest financial software providers, serving banks and credit unions.",
        bullets: [
          "Developed and maintained mission-critical **PIX and SPB** systems, Brazil's real-time payment infrastructure, building Angular screens for transaction processing and monitoring for banks with zero tolerance for downtime.",
          "Integrated REST APIs and RabbitMQ-backed monitoring flows, collaborating daily with Java and C#/.NET backend teams in a multi-team agile environment.",
        ],
        promotion: "Promoted from Software Development Intern to Junior Software Engineer in October 2022.",
      },
    ],
  },
  projects: {
    heading: ".projects()",
    liveLabel: "Live",
    items: {
      finlivre: {
        badge: "Personal · Live",
        description:
          "Local-first personal finance app that turns messy bank and credit-card statements into one honest picture of your money. Parses OFX deterministically and reads photos/PDFs via Claude Vision (bring-your-own-key, no backend). Projects installments and recurring items into future months, with a 50/30/20 budget view. Everything stays in the browser (IndexedDB). 112 unit tests.",
      },
      disputeAgent: {
        badge: "Personal · Live",
        description:
          "Agentic system (LangGraph + Claude) that triages card chargebacks end to end: reasons over conflicting signals to recommend fight or accept, then drafts the representment letter itself when fighting, citing only evidence the merchant actually has. FastAPI backend, Next.js frontend, deployed as two services with real rate limiting. Fraud and chargeback was the domain I used to work in at PicPay, mostly fraud, tackled here with an LLM agent instead of a rules engine.",
      },
      mixordia: {
        badge: "Freelance",
        description:
          "Signup portal for an electronic-music events brand in Brazil. I took over a half-built React + Flask project, moved it onto Supabase (subscribers, event storage and a locked-down signup function) and built its TV power-on intro and CRT signal effects.",
      },
      vizinhelp: {
        badge: "Academic",
        description:
          "My postgraduate thesis (PUC-RS, 2024): a neighborhood skill-exchange app built end to end: Angular front end, Node/Express API on PostgreSQL, Keycloak auth and CI deploying to AWS EC2.",
      },
    },
    caseStudyLink: "Case study",
  },
  caseStudy: {
    back: "cd ../projects",
    context: "context",
    stack: "stack",
    decisions: "decisions",
    considered: "considered",
    why: "why",
    outcome: "outcome",
    retrospective: "retrospective",
    live: "Live",
    source: "Source",
    next: "next project",
  },
  skills: {
    heading: ".skills()",
    categories: {
      expert: "Expert",
      learning: "Learning",
      tooling: "Testing & Tooling",
    },
  },
  contact: {
    heading: ".contact()",
    intro:
      "I'm genuinely interested in people with real problems. If you need more creativity and innovation in your digital product, I can help. I'm curious and always up for it, so if you want to talk tech, collaboration, or anything else, let's connect.",
  },
  ui: {
    backToTop: "Back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    soundToggle: "Keyboard sound",
  },
};

export type Messages = typeof en;

const pt: Messages = {
  nav: {
    home: ".inicio()",
    about: ".sobre()",
    experience: ".experiencia()",
    projects: ".projetos()",
    skills: ".habilidades()",
    contact: ".contato()",
  },
  hero: {
    greeting: "Olá, eu sou o João.",
    tagline1: "Desenvolvedor front-end especializado em Angular, expandindo para React e Next.js.",
    tagline2: "Construindo interfaces limpas, funcionais e minimalistas.",
    downloadCv: "Baixar CV",
    cvUrl: "/cv/joao-costa-cv-pt.pdf",
    stats: [
      { value: "4+ anos", label: "de experiência com produtos digitais" },
      { value: "Angular & TypeScript", label: "stack principal em produção" },
      { value: "React. Next.js. AWS.", label: "explorando atualmente" },
    ],
    telemetry: { modules: "módulos", squads: "squads", products: "produtos" },
    terminal: [
      "Atualmente Engenheiro de Software no PicPay, um dos maiores bancos digitais do Brasil...",
      "Focado em Angular, TypeScript e RxJS em produção. Agora aprendendo React e Next.js...",
      "Estudando AWS e IA nas horas livres. Nem tudo que eu construo roda num terminal...",
    ],
  },
  achievements: {
    label: "Coisas que construí e entreguei",
    hint: "toque em um ponto",
    core: "whoami",
    seeExperience: "Ver na experiência",
    readCaseStudy: "Ler o estudo de caso",
    aboutMe: "Mais sobre mim",
    close: "Fechar",
    whoami: {
      label: "joão",
      lines: [
        "de são paulo, brasil",
        "virginiano, se é que isso diz algo",
        "filmes de terror, de 2000 a 2010 foi a melhor fase",
        "felinos de qualquer tamanho me atraem",
      ],
    },
    items: {
      backoffice: {
        label: "Back-office dos analistas",
        detail:
          "No PicPay entrei na squad de prevenção a fraude e chargeback do HeroDash, a plataforma de back-office compartilhada por várias squads (jornadas do cliente, ferramentas da plataforma, wallet e a minha). Minha squad é dona das telas onde o analista pega um caso, lê os dados do cliente vindos de vários sistemas e aprova ou recusa com uma justificativa registrada.",
      },
      workspace: {
        label: "Workspace de fraude",
        detail:
          "Um workspace de análise de fraude guiado por configuração que substituiu um menu de telas por produto por 4 filas de análise unificadas em mais de 14 produtos financeiros. Fui um dos engenheiros que construiu e iterou nele desde o início, não só manteve depois de pronto.",
      },
      queues: {
        label: "−90% de código por fila",
        detail:
          "Liderei o refactor para entrega de filas por configuração, reduzindo o código de uma fila nova em cerca de 90%, o que permitiu entregar rápido o MED, a fila obrigatória de devolução do Pix do Banco Central.",
      },
      promoted: {
        label: "Promovido · nova squad",
        detail:
          "Promovido a Engenheiro de Software pleno em julho de 2026 e, na sequência, entrei numa squad que constrói duas plataformas internas para substituir softwares que a empresa licenciava: uma plataforma de treinamento corporativo e uma árvore de decisão que guia os atendentes durante as conversas com clientes. Meu primeiro React em produção.",
      },
      pix: {
        label: "PIX & SPB",
        detail:
          "Entrei na Sinqia como estagiário, na equipe responsável pelos produtos PIX e SPB: software bancário que a Sinqia vendia para bancos e cooperativas que não eram diretamente conectados ao Banco Central, pra que pudessem oferecer o PIX aos clientes deles. Trabalhei principalmente no front-end Angular: telas de boletagem, monitor do SPB, consulta detalhada de transações e desbloqueio de transação, além de configuração com Keycloak, RabbitMQ e Jenkins, para bancos com tolerância zero a indisponibilidade.",
      },
      mixordia: {
        label: "Mixórdia",
        detail:
          "Assumi um site pela metade de uma marca de eventos de música eletrônica, reconstruí em Supabase e entreguei a intro de TV ligando.",
      },
      dispute: {
        label: "Agente de disputas",
        detail:
          "Um pipeline em LangGraph + Claude que decide se vale contestar um chargeback e escreve a carta, citando só evidências que o lojista tem.",
      },
      finlivre: {
        label: "FinLivre",
        detail:
          "Um app de finanças local-first que uso todo mês: OFX lido por código, fotos lidas pelo Claude Vision, nada sai do navegador. 112 testes unitários.",
      },
      vizinhelp: {
        label: "vizinhelp",
        detail:
          "Construí a vizinhelp para finalizar minha pós-graduação em desenvolvimento full stack na PUC-RS: um app de bairro onde as pessoas oferecem pra ensinar ou ajudar com algo, e os vizinhos interessados entram em contato. Toquei o projeto de ponta a ponta: front-end em Angular, API em Node, PostgreSQL, autenticação com Keycloak e CI publicando na AWS.",
      },
    },
  },
  about: {
    heading: ".sobre()",
    paragraphs: [
      "Sou Engenheiro Front-end no **PicPay**, um dos maiores bancos digitais do Brasil, com mais de 60 milhões de usuários, onde ajudo a construir e escalar o **HeroDash**, nosso monorepo Angular com 66 módulos compartilhados por mais de 10 squads, usando TypeScript e RxJS.",
      "Atualmente estou expandindo minha stack para **React e Next.js**. Este portfólio é a prova viva dessa jornada.",
      "Fora do trabalho, faço freelas e construo projetos pessoais. Os que mais me desafiam são os feitos para pessoas reais, com problemas reais.",
    ],
  },
  experience: {
    heading: ".experiencia()",
    jobs: [
      {
        company: "PicPay",
        role: "Frontend Engineer",
        period: "Nov 2024 até o momento",
        location: "São Paulo, Brasil",
        note: "Um dos maiores bancos digitais do Brasil, com mais de 68 milhões de usuários registrados.",
        bullets: [
          "Construí e escalei o **HeroDash**, o monorepo Angular do PicPay com 66 módulos de feature compartilhados por mais de 10 squads, cobrindo prevenção a fraude, chargeback, crédito, cartões e seguros.",
          "Arquitetei um workspace de análise de fraude orientado a configuração, substituindo telas separadas por produto por um sistema unificado de 4 filas de análise em mais de 14 produtos financeiros.",
          "Liderei o refactor para entrega de filas via configuração, reduzindo o código de novas filas em cerca de **90%** e viabilizando a entrega rápida da MED, a fila obrigatória de estorno Pix do Banco Central.",
        ],
        promotion: "Promovido a Analista de Engenharia de Software Pleno em julho de 2026.",
      },
      {
        company: "Sinqia",
        role: "Frontend Developer",
        period: "Nov 2021 a Out 2024",
        location: "São Paulo, Brasil",
        note: "Uma das maiores fornecedoras de software financeiro do Brasil, atendendo bancos e cooperativas de crédito.",
        bullets: [
          "Desenvolvi e mantive os sistemas **PIX e SPB**, a infraestrutura de pagamentos em tempo real do Brasil, construindo telas Angular para processamento e monitoramento de transações para bancos com tolerância zero a indisponibilidade.",
          "Integrei APIs REST e fluxos de monitoramento via RabbitMQ, colaborando diariamente com times de backend em Java e C#/.NET em um ambiente ágil multi-times.",
        ],
        promotion: "Promovido de Estagiário de Desenvolvimento de Software para Engenheiro de Software Júnior em outubro de 2022.",
      },
    ],
  },
  projects: {
    heading: ".projetos()",
    liveLabel: "Ver online",
    items: {
      finlivre: {
        badge: "Pessoal · Online",
        description:
          "App de finanças pessoais local-first que transforma faturas bagunçadas de banco e cartão em uma visão honesta do seu dinheiro. Faz parsing de OFX de forma determinística e lê fotos/PDFs via Claude Vision (chave própria, sem backend). Projeta parcelas e itens recorrentes para meses futuros, com uma visão de orçamento 50/30/20. Tudo fica no navegador (IndexedDB). 112 testes unitários.",
      },
      disputeAgent: {
        badge: "Pessoal · Online",
        description:
          "Sistema agente (LangGraph + Claude) que faz a triagem de chargebacks de cartão de ponta a ponta: pondera sinais conflitantes para recomendar contestar ou aceitar e, ao contestar, redige sozinho a carta de representment (contestação), citando só a evidência que o lojista realmente tem. Backend em FastAPI, frontend em Next.js, dois serviços implantados com rate limiting real. Fraude e chargeback foi o domínio em que trabalhei no PicPay, principalmente fraude, resolvido aqui com um agente de IA em vez de um motor de regras.",
      },
      mixordia: {
        badge: "Freelance",
        description:
          "Portal de inscrição para uma marca de eventos de música eletrônica no Brasil. Assumi um projeto React + Flask pela metade, migrei para o Supabase (inscritos, armazenamento dos eventos e uma função de inscrição trancada) e construí a intro de TV ligando e os efeitos de sinal CRT.",
      },
      vizinhelp: {
        badge: "Acadêmico",
        description:
          "Meu TCC da pós-graduação (PUC-RS, 2024): um app de troca de conhecimento entre vizinhos feito de ponta a ponta: front-end em Angular, API Node/Express sobre PostgreSQL, autenticação com Keycloak e CI publicando no AWS EC2.",
      },
    },
    caseStudyLink: "Estudo de caso",
  },
  caseStudy: {
    back: "cd ../projetos",
    context: "contexto",
    stack: "stack",
    decisions: "decisões",
    considered: "alternativa",
    why: "por quê",
    outcome: "resultado",
    retrospective: "retrospectiva",
    live: "No ar",
    source: "Código",
    next: "próximo projeto",
  },
  skills: {
    heading: ".habilidades()",
    categories: {
      expert: "Domínio",
      learning: "Aprendendo",
      tooling: "Testes e Ferramentas",
    },
  },
  contact: {
    heading: ".contato()",
    intro:
      "Tenho interesse genuíno por gente com problemas reais. Se você quer dar mais criatividade e inovação ao seu produto digital, posso ajudar. Sou curioso e estou sempre disponível: se quiser falar sobre tech, colaboração ou só trocar uma ideia, vamos nos conhecer.",
  },
  ui: {
    backToTop: "Voltar ao topo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    soundToggle: "Som do teclado",
  },
};

export const dictionaries: Record<Lang, Messages> = { en, pt };
