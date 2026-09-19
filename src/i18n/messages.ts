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
        period: "Nov 2024 — Present",
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
        period: "Nov 2021 — Oct 2024",
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
          "Local-first personal finance app that turns messy bank and credit-card statements into one honest picture of your money. Parses OFX deterministically and reads photos/PDFs via Claude Vision (bring-your-own-key, no backend). Projects installments and recurring items into future months, with a 50/30/20 budget view. Everything stays in the browser (IndexedDB). 224 unit tests.",
      },
      disputeAgent: {
        badge: "Personal · Live",
        description:
          "Agentic system (LangGraph + Claude) that triages card chargebacks end to end: reasons over conflicting signals to recommend fight or accept, then drafts the representment letter itself when fighting, citing only evidence the merchant actually has. FastAPI backend, Next.js frontend, deployed as two services with real rate limiting. Same fraud/chargeback domain I work in at PicPay, tackled here with an LLM agent instead of a rules engine.",
      },
      mixordia: {
        badge: "Freelance",
        description:
          "Event and culture platform for a nightlife venue in Brazil. Built with Supabase for subscriber management and event image storage, SoundCloud integration for music playback, and a curated showcase of cultural partners.",
      },
      vizinhelp: {
        badge: "Academic",
        description:
          "A community platform connecting neighbors for local mutual aid and services.",
      },
    },
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
      "Always curious about interesting problems and the people solving them. If you want to talk tech, collaboration, or what's next, reach out.",
  },
  ui: {
    backToTop: "Back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    soundToggle: "Keyboard sound",
    bootSkip: "press any key to skip",
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
        period: "Nov 2024 — Atual",
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
        period: "Nov 2021 — Out 2024",
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
          "App de finanças pessoais local-first que transforma faturas bagunçadas de banco e cartão em uma visão honesta do seu dinheiro. Faz parsing de OFX de forma determinística e lê fotos/PDFs via Claude Vision (chave própria, sem backend). Projeta parcelas e itens recorrentes para meses futuros, com uma visão de orçamento 50/30/20. Tudo fica no navegador (IndexedDB). 224 testes unitários.",
      },
      disputeAgent: {
        badge: "Pessoal · Online",
        description:
          "Sistema agente (LangGraph + Claude) que faz a triagem de chargebacks de cartão de ponta a ponta: pondera sinais conflitantes para recomendar contestar ou aceitar e, ao contestar, redige sozinho a carta de representment (contestação), citando só a evidência que o lojista realmente tem. Backend em FastAPI, frontend em Next.js, dois serviços implantados com rate limiting real. Mesmo domínio de fraude/chargeback do meu trabalho no PicPay, aqui resolvido com um agente de IA em vez de um motor de regras.",
      },
      mixordia: {
        badge: "Freelance",
        description:
          "Plataforma de eventos e cultura para uma casa noturna no Brasil. Construída com Supabase para gestão de assinantes e armazenamento de imagens dos eventos, integração com SoundCloud para reprodução de música e uma vitrine curada de parceiros culturais.",
      },
      vizinhelp: {
        badge: "Acadêmico",
        description:
          "Uma plataforma comunitária que conecta vizinhos para ajuda mútua e serviços locais.",
      },
    },
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
      "Sempre curioso sobre problemas interessantes e as pessoas que os resolvem. Se quiser falar sobre tech, colaboração ou o que vem a seguir, é só chamar.",
  },
  ui: {
    backToTop: "Voltar ao topo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    soundToggle: "Som do teclado",
    bootSkip: "pressione qualquer tecla para pular",
  },
};

export const dictionaries: Record<Lang, Messages> = { en, pt };
