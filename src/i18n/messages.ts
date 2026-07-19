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
    projects: ".projects()",
    skills: ".skills()",
    contact: ".contact()",
  },
  hero: {
    greeting: "Hi, I'm João.",
    tagline1: "Front-end developer specializing in Angular and Next.js.",
    tagline2: "Building clean, functional, and minimalist interfaces.",
    downloadCv: "Download CV",
    cvUrl: "/cv/joao-costa-cv-en.pdf",
    stats: [
      { value: "4+ years", label: "of experience with digital products" },
      { value: "Angular & Next.js", label: "main stack and current focus" },
      { value: "AWS. AI. React", label: "currently exploring" },
    ],
    terminal: [
      "Currently a Software Engineer at PicPay, one of Brazil's largest digital banks...",
      "Focused on Angular, TypeScript, and RxJS in production. Now learning React and Next.js...",
      "Studying AWS and AI on the side. Not everything I build runs in a terminal...",
    ],
  },
  about: {
    heading: ".about()",
    paragraphs: [
      "I'm a Front-end Engineer at **PicPay**, one of Brazil's largest digital banks with over 60 million users, where I build scalable interfaces using Angular, TypeScript, and RxJS.",
      "I'm currently expanding my stack into **React and Next.js**. This portfolio is the living proof of that journey.",
      "Outside of work, I freelance and build personal projects. The ones that push me the most are the ones built for real people with real problems.",
    ],
  },
  projects: {
    heading: ".projects()",
    liveLabel: "Live",
    items: {
      finlivre: {
        badge: "Personal · Live",
        description:
          "Local-first personal finance app that turns messy bank and credit-card statements into one honest picture of your money. Parses OFX deterministically and reads photos/PDFs via Claude Vision (bring-your-own-key, no backend). Projects installments and recurring items into future months, with a 50/30/20 budget view. Everything stays in the browser (IndexedDB). 67 unit tests.",
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
      chatgptClone: {
        badge: "Study",
        description:
          "A ChatGPT-like interface built to practice React state management, streaming responses, and clean UI design.",
      },
      picpayChallenge: {
        badge: "Job · Tech Challenge",
        description:
          "A frontend technical challenge from PicPay, implementing core banking UI features with Angular and TypeScript.",
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
  },
};

export type Messages = typeof en;

const pt: Messages = {
  nav: {
    home: ".inicio()",
    about: ".sobre()",
    projects: ".projetos()",
    skills: ".habilidades()",
    contact: ".contato()",
  },
  hero: {
    greeting: "Olá, eu sou o João.",
    tagline1: "Desenvolvedor front-end especializado em Angular e Next.js.",
    tagline2: "Construindo interfaces limpas, funcionais e minimalistas.",
    downloadCv: "Baixar CV",
    cvUrl: "/cv/joao-costa-cv-pt.pdf",
    stats: [
      { value: "4+ anos", label: "de experiência com produtos digitais" },
      { value: "Angular & Next.js", label: "stack principal e foco atual" },
      { value: "AWS. AI. React", label: "explorando atualmente" },
    ],
    terminal: [
      "Atualmente Engenheiro de Software no PicPay, um dos maiores bancos digitais do Brasil...",
      "Focado em Angular, TypeScript e RxJS em produção. Agora aprendendo React e Next.js...",
      "Estudando AWS e IA nas horas livres. Nem tudo que eu construo roda num terminal...",
    ],
  },
  about: {
    heading: ".sobre()",
    paragraphs: [
      "Sou Engenheiro Front-end no **PicPay**, um dos maiores bancos digitais do Brasil, com mais de 60 milhões de usuários, onde construo interfaces escaláveis usando Angular, TypeScript e RxJS.",
      "Atualmente estou expandindo minha stack para **React e Next.js**. Este portfólio é a prova viva dessa jornada.",
      "Fora do trabalho, faço freelas e construo projetos pessoais. Os que mais me desafiam são os feitos para pessoas reais, com problemas reais.",
    ],
  },
  projects: {
    heading: ".projetos()",
    liveLabel: "Ver online",
    items: {
      finlivre: {
        badge: "Pessoal · Online",
        description:
          "App de finanças pessoais local-first que transforma faturas bagunçadas de banco e cartão em uma visão honesta do seu dinheiro. Faz parsing de OFX de forma determinística e lê fotos/PDFs via Claude Vision (chave própria, sem backend). Projeta parcelas e itens recorrentes para meses futuros, com uma visão de orçamento 50/30/20. Tudo fica no navegador (IndexedDB). 67 testes unitários.",
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
      chatgptClone: {
        badge: "Estudo",
        description:
          "Uma interface no estilo ChatGPT feita para praticar gerenciamento de estado em React, respostas em streaming e design de UI limpo.",
      },
      picpayChallenge: {
        badge: "Vaga · Desafio Técnico",
        description:
          "Um desafio técnico de front-end do PicPay, implementando funcionalidades centrais de UI bancária com Angular e TypeScript.",
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
  },
};

export const dictionaries: Record<Lang, Messages> = { en, pt };
