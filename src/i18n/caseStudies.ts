import type { ProjectId } from "@/data/projects";
import type { Lang } from "./messages";

/**
 * Case study content. The fixed spine is enforced by the types: every project
 * must have a case study in every language, with exactly three decisions.
 *
 * Every fact here traces to a repo (README, PLAN.md, ADRs, git log) or to
 * João's LifeOS notes. For FinLivre and the Dispute Triage Agent the "why"
 * lines are João's own written reasoning; for Mixórdia and vizinhelp they are
 * inferred from commit history and should be rewritten in his own words.
 *
 * Inline syntax (see RichText): **emphasis**, `code`, [label](url).
 */
export interface Decision {
  title: string;
  considered: string;
  why: string;
}

export interface CaseStudy {
  tagline: string;
  year: string;
  role: string;
  context: string[];
  decisions: [Decision, Decision, Decision];
  outcome: string[];
  retrospective?: string[];
}

type CaseStudies = Record<ProjectId, CaseStudy>;

const en: CaseStudies = {
  finlivre: {
    tagline:
      "A local-first personal finance app I built because I knew I was spending, but couldn't see where.",
    year: "2026",
    role: "Solo · design + build",
    context: [
      "I use credit cards across several banks, and every statement tells a different partial story. The Brazilian apps that promise to unify them either ask for bank credentials or keep your data on their servers. I wanted one honest picture of my money without handing it to anyone.",
      "So I built it for myself first: dogfooding was the point, a portfolio piece second. It imports OFX files, reads statement photos and PDFs, projects installments and recurring items into future months, and splits spending into a **50/30/20** budget.",
    ],
    decisions: [
      {
        title: "Everything stays in the browser; no backend",
        considered:
          "A conventional server with accounts and a database, like the apps I was trying to avoid.",
        why:
          "The whole premise is that you never have to trust me, or anyone, with your financial data, because it never leaves your machine. Entries live in IndexedDB through Dexie, so there is no account, no server and nothing to breach, and it still persists across reloads.",
      },
      {
        title: "Code parses OFX; AI only reads what code can't",
        considered:
          "Sending every import through a model, which is the fashionable default.",
        why:
          "Parsing a known format is a job for code, not for AI: OFX parsing is deterministic and unit-tested. Claude Vision is reserved for photos and PDFs, runs on the user's own API key straight from the browser: no project key, no proxy server. The first plan had no AI at all; it became an opt-in importer once the deterministic path was solid.",
      },
      {
        title: "Future months are computed, never stored",
        considered:
          "Writing projected installments and recurring bills into the database as rows.",
        why:
          "Materialized projections go stale the moment a real statement arrives and risk double counting. Computing them on read means the real OFX always wins, with nothing to reconcile.",
      },
    ],
    outcome: [
      "I use it every month with my own data.",
      "**112 unit tests** across 11 suites: OFX parsing, projections, budget buckets and the import pipeline.",
      "Every source (OFX, Vision, manual, recurring) flows into one `Entry` ledger, so a new importer never needs its own path through the app.",
      "Built across 22 commits between late June and the end of July 2026, then launched publicly. [Live](https://finlivre.vercel.app).",
    ],
  },

  disputeAgent: {
    tagline:
      "An LLM agent that helps a merchant decide whether to fight or accept a card chargeback, and drafts the letter when it's worth fighting.",
    year: "2026",
    role: "Solo · design + build",
    context: [
      "Fraud and chargeback was the domain I used to work in at PicPay, mostly fraud. I wanted to see what an LLM adds to it (honestly measured, not assumed) and to close my own Python gap, so I built this in Python on purpose instead of in the Node stack I already know.",
      "It's decision support on synthetic sample data, not a production platform. A LangGraph pipeline runs four steps (`classify → assess → decide → draft`) and a Next.js front end shows the verdict and the letter.",
    ],
    decisions: [
      {
        title: "LangGraph instead of one big prompt",
        considered:
          "A single mega-prompt, or a hand-rolled tool loop on the raw SDK.",
        why:
          "A mega-prompt has no structure, is hard to test and can't branch. Explicit nodes let me test each step and route between them, and LangGraph is a skill worth being able to show.",
      },
      {
        title: "The fight/accept decision is code, not the model",
        considered: "Letting Claude make the final call.",
        why:
          "The model weighs conflicting signals: that's judgment, not `if/else`, and it's where AI earns its place. The verdict itself is a threshold on its estimate, so the decision boundary is testable without mocking an LLM.",
      },
      {
        title: "The letter can only cite evidence the merchant has",
        considered:
          "Trusting the prompt alone to keep the model from inventing evidence.",
        why:
          "A representment letter that cites evidence you don't have loses the dispute. The prompt separates available from unavailable evidence, and the eval set fails any letter that mentions the second list.",
      },
    ],
    outcome: [
      "Built a **rules-only baseline first**, then upgraded it in vertical slices, so I can say exactly what the AI adds over plain rules.",
      "**22 tests** with Claude mocked, plus a 10-case eval set that checks every drafted letter for invented evidence.",
      "If a Claude call fails, each model-driven step falls back to rules instead of failing the request.",
      "Deployed as two services: FastAPI on Render and Next.js on Vercel, with per-IP rate limiting on the analysis endpoint.",
    ],
  },

  mixordia: {
    tagline:
      "A signup portal for an electronic-music events brand, inherited as a half-built React + Flask project, rebuilt on Supabase, and turned into a full CRT-television experience: a power-on boot sequence, scanlines and flicker running through the whole site.",
    year: "2026",
    role: "Freelance · took over & rebuilt",
    context: [
      "Mixórdia runs electronic-music events in Brazil and abroad, and needed a site to turn visitors into subscribers. Another developer had started it (a React front end, a Flask server and a gallery pulled from Google Drive), and the TV-screen look was already part of the brand.",
      "I took the project over in March 2026 and rebuilt it end to end: a new Supabase data layer, a signup flow with LGPD consent, a page for the brand's own rituals, recordings and merch, a partner directory, and the TV power-on intro and CRT effects we wanted as part of Mixórdia's identity.",
    ],
    decisions: [
      {
        title: "Replace the Flask server with Supabase",
        considered:
          "Keeping the inherited Flask backend and the Google Drive gallery.",
        why:
          "A marketing site shouldn't need a server to host and babysit. Supabase gives the database, file storage and a function runtime in one place, so I could delete the backend entirely.",
      },
      {
        title: "Signups go through one locked-down function",
        considered:
          "Row-level-security policies that let the public key insert into the subscribers table.",
        why:
          "The public key ships to every browser. All signups go through one `subscribe_follower` RPC (`SECURITY DEFINER`), and a later migration explicitly revokes direct INSERT and UPDATE on `followers` for the public key, so a compromised frontend key still can't write anything by itself.",
      },
      {
        title: "One table drives three sections of the site",
        considered: "A separate table, or a separate CMS collection, for events, recordings and merch.",
        why:
          "The three sections (rituals, recordings, merch) are the same shape: a name, a description, a link, an image, a toggle to show or hide it. One `highlights` table with a `type` column routes each row to its section, so a new kind of content later means adding a value to an enum, not a new table and a new page. Same instinct as the config-driven queues I build at PicPay, aimed at a marketing site instead of a fraud workspace.",
      },
    ],
    outcome: [
      "Live at [mixordiamusic.com](https://www.mixordiamusic.com) on Vercel, with a protected preview environment on a separate branch, so the site can keep evolving and new features get tested before they reach production.",
      "Signup with LGPD consent capture, de-duplicated by CPF (or by email for foreign visitors), and a welcome email sent through Resend.",
      "The owner runs the site themselves: an operations manual with two embedded tools, a UTM link builder and SQL insert generators for partners and highlights, means adding content never requires writing SQL by hand or asking me for a deploy.",
      "Every signup records which campaign and channel brought it in, so the team can tell which Instagram story or WhatsApp broadcast actually turns into subscribers, not just clicks.",
      "Bilingual in Portuguese and English, matching an audience that spans Brazil and events abroad.",
    ],
  },

  vizinhelp: {
    tagline:
      "My postgraduate thesis: a neighborhood skill-exchange app, taken end to end, from an Angular front end and Node API to Keycloak auth and CI deploying to AWS.",
    year: "2024",
    role: "Solo · postgraduate thesis, PUC-RS",
    context: [
      "Built as the final project of my full-stack postgraduate program at PUC-RS. The idea: neighbors post things they can teach or help with, other neighbors register interest, and the author gets an email.",
      "It was my chance to own a whole system rather than one layer of it: front end, API, database, authentication, and the pipeline that ships it.",
    ],
    decisions: [
      {
        title: "Keycloak for authentication",
        considered: "Hand-rolling login and JWT handling in the API.",
        why:
          "Identity is a solved problem and an easy one to get wrong. A dedicated identity server handled login and tokens, and the Express API just validated requests.",
      },
      {
        title: "Registering interest doesn't require an account",
        considered: "Requiring login before contacting a neighbor.",
        why:
          "The first interaction should be cheap. Making that endpoint public removed the biggest drop-off point in the flow.",
      },
      {
        title: "Automated deploys from day one",
        considered: "Building and copying files to the server by hand.",
        why:
          "A pipeline builds the front end and deploys it to EC2 on every push, with a separate job for the API, so the thesis demo always matched the code.",
      },
    ],
    outcome: [
      "Shipped over two months, April to May 2024, through 21 pull requests.",
      "Node/Express API on PostgreSQL with Jest unit tests on the endpoints.",
      "One-command local environment with Docker Compose: Keycloak, Postgres and pgAdmin.",
    ],
  },
};

const pt: CaseStudies = {
  finlivre: {
    tagline:
      "Um app de finanças pessoais local-first que construí porque eu sabia que estava gastando, mas não conseguia ver onde.",
    year: "2026",
    role: "Solo · design + desenvolvimento",
    context: [
      "Uso cartões de crédito de vários bancos, e cada fatura conta uma parte diferente da história. Os apps brasileiros que prometem juntar tudo pedem a senha do banco ou guardam seus dados nos servidores deles. Eu queria uma visão honesta do meu dinheiro sem entregá-lo a ninguém.",
      "Então construí para mim primeiro: usar no dia a dia era o objetivo, ser peça de portfólio vinha depois. Ele importa arquivos OFX, lê fotos e PDFs de faturas, projeta parcelas e recorrências nos meses seguintes e divide os gastos em um orçamento **50/30/20**.",
    ],
    decisions: [
      {
        title: "Tudo fica no navegador; sem backend",
        considered:
          "Um servidor convencional com contas e banco de dados, como os apps que eu queria evitar.",
        why:
          "A premissa inteira é que você nunca precisa confiar em mim, ou em ninguém, com seus dados financeiros, porque eles nunca saem da sua máquina. Os lançamentos ficam no IndexedDB via Dexie: não há conta, nem servidor, nem nada para vazar, e os dados continuam lá depois de recarregar.",
      },
      {
        title: "Código lê OFX; IA só lê o que o código não consegue",
        considered:
          "Mandar toda importação para um modelo, que é o padrão da moda.",
        why:
          "Ler um formato conhecido é trabalho para código, não para IA: o parser de OFX é determinístico e testado. O Claude Vision fica para fotos e PDFs, roda com a chave de API do próprio usuário direto do navegador: sem chave do projeto, sem servidor intermediário. O plano inicial não tinha IA nenhuma; ela virou um importador opcional depois que o caminho determinístico estava sólido.",
      },
      {
        title: "Meses futuros são calculados, nunca gravados",
        considered:
          "Gravar parcelas projetadas e contas recorrentes no banco como registros.",
        why:
          "Projeções gravadas ficam desatualizadas assim que a fatura real chega e arriscam contar em dobro. Calculando na leitura, o OFX real sempre vence e não há nada para reconciliar.",
      },
    ],
    outcome: [
      "Uso todo mês com os meus próprios dados.",
      "**112 testes unitários** em 11 suítes: parser de OFX, projeções, faixas do orçamento e o pipeline de importação.",
      "Toda fonte (OFX, Vision, manual, recorrente) entra em um único registro de `Entry`, então um importador novo nunca precisa de um caminho próprio no app.",
      "Construído em 22 commits entre o fim de junho e o fim de julho de 2026, e depois lançado publicamente. [No ar](https://finlivre.vercel.app).",
    ],
  },

  disputeAgent: {
    tagline:
      "Um agente de LLM que ajuda o lojista a decidir se contesta ou aceita um chargeback de cartão, e escreve a carta quando vale a pena contestar.",
    year: "2026",
    role: "Solo · design + desenvolvimento",
    context: [
      "Fraude e chargeback foi o domínio em que trabalhei no PicPay, principalmente fraude. Eu queria ver o que um LLM acrescenta a ele (medido com honestidade, não presumido) e fechar minha própria lacuna em Python, então construí em Python de propósito em vez de usar a stack Node que já conheço.",
      "É apoio à decisão com dados de exemplo sintéticos, não uma plataforma de produção. Um pipeline em LangGraph roda quatro etapas (`classify → assess → decide → draft`) e um front-end em Next.js mostra o veredito e a carta.",
    ],
    decisions: [
      {
        title: "LangGraph em vez de um prompt gigante",
        considered:
          "Um único mega-prompt, ou um loop de ferramentas feito à mão com o SDK puro.",
        why:
          "Um mega-prompt não tem estrutura, é difícil de testar e não consegue ramificar. Nós explícitos me deixam testar cada etapa e rotear entre elas, e LangGraph é uma habilidade que vale a pena poder mostrar.",
      },
      {
        title: "Contestar ou aceitar é código, não o modelo",
        considered: "Deixar o Claude tomar a decisão final.",
        why:
          "O modelo pondera sinais conflitantes: isso é julgamento, não `if/else`, e é onde a IA se justifica. O veredito em si é um limiar sobre a estimativa dele, então a fronteira da decisão é testável sem simular um LLM.",
      },
      {
        title: "A carta só pode citar evidências que o lojista tem",
        considered:
          "Confiar só no prompt para impedir o modelo de inventar evidências.",
        why:
          "Uma carta de contestação que cita evidências que você não tem perde a disputa. O prompt separa evidências disponíveis das indisponíveis, e o conjunto de avaliação reprova qualquer carta que mencione a segunda lista.",
      },
    ],
    outcome: [
      "Construí primeiro uma **base só com regras** e depois evoluí em fatias verticais, para poder dizer exatamente o que a IA acrescenta às regras simples.",
      "**22 testes** com o Claude simulado, mais um conjunto de 10 casos de avaliação que verifica cada carta em busca de evidências inventadas.",
      "Se uma chamada ao Claude falha, cada etapa guiada pelo modelo cai para regras em vez de derrubar a requisição.",
      "Publicado como dois serviços: FastAPI no Render e Next.js na Vercel, com limite de requisições por IP no endpoint de análise.",
    ],
  },

  mixordia: {
    tagline:
      "Um portal de inscrição para uma marca de eventos de música eletrônica, herdado como um projeto React + Flask pela metade, reconstruído em Supabase e transformado numa experiência completa de TV de tubo: uma sequência de ligar a TV, scanlines e flicker por todo o site.",
    year: "2026",
    role: "Freelance · assumi e reconstruí",
    context: [
      "A Mixórdia faz eventos de música eletrônica no Brasil e no exterior, e precisava de um site que transformasse visitantes em inscritos. Outro desenvolvedor tinha começado (front-end em React, um servidor Flask e uma galeria puxada do Google Drive), e o visual de tela de TV já fazia parte da marca.",
      "Assumi o projeto em março de 2026 e o reconstruí de ponta a ponta: uma nova camada de dados no Supabase, um fluxo de inscrição com consentimento LGPD, uma página para os próprios rituais, gravações e produtos da marca, um diretório de parceiros, e a intro de TV ligando e os efeitos CRT que quisemos trazer como parte da identidade da Mixórdia.",
    ],
    decisions: [
      {
        title: "Trocar o servidor Flask pelo Supabase",
        considered:
          "Manter o backend Flask herdado e a galeria do Google Drive.",
        why:
          "Um site institucional não deveria precisar de um servidor para hospedar e vigiar. O Supabase reúne banco de dados, armazenamento de arquivos e funções em um lugar só, então pude apagar o backend inteiro.",
      },
      {
        title: "Inscrições passam por uma única função trancada",
        considered:
          "Políticas de row-level security que deixam a chave pública inserir na tabela de inscritos.",
        why:
          "A chave pública vai para todo navegador. Todas as inscrições passam por uma única RPC `subscribe_follower` (`SECURITY DEFINER`), e uma migration posterior revoga explicitamente o INSERT e o UPDATE diretos na tabela `followers` para a chave pública, então mesmo que a chave do frontend seja comprometida, ela sozinha não consegue escrever nada.",
      },
      {
        title: "Uma tabela só direciona três seções do site",
        considered: "Uma tabela separada, ou uma coleção separada de CMS, para eventos, gravações e produtos.",
        why:
          "As três seções (rituais, gravações, produtos) têm o mesmo formato: nome, descrição, link, imagem, um botão para mostrar ou esconder. Uma única tabela `highlights` com uma coluna `type` direciona cada linha para sua seção, então um novo tipo de conteúdo no futuro significa adicionar um valor a um enum, não uma tabela nova e uma página nova. O mesmo instinto das filas guiadas por configuração que construo no PicPay, aplicado a um site institucional em vez de um workspace de fraude.",
      },
    ],
    outcome: [
      "No ar em [mixordiamusic.com](https://www.mixordiamusic.com) na Vercel, com um ambiente de preview protegido numa branch separada, para o site poder continuar evoluindo e testar novidades antes de chegarem à produção.",
      "Inscrição com registro de consentimento LGPD, sem duplicatas por CPF (ou por e-mail para estrangeiros), e e-mail de boas-vindas enviado pelo Resend.",
      "O dono do site opera tudo sozinho: um manual operacional com duas ferramentas embutidas, um gerador de links UTM e geradores de SQL de inserção para parceiros e destaques, faz com que adicionar conteúdo nunca exija escrever SQL à mão ou me pedir um deploy.",
      "Cada inscrição registra de qual campanha e canal ela veio, então a equipe consegue saber qual story do Instagram ou disparo no WhatsApp realmente converte gente em inscrito, não só clique.",
      "Bilíngue em português e inglês, para um público que vai do Brasil a eventos no exterior.",
    ],
  },

  vizinhelp: {
    tagline:
      "Meu TCC da pós-graduação: um app de troca de conhecimento entre vizinhos, de ponta a ponta, do front-end em Angular e API em Node até a autenticação com Keycloak e CI publicando na AWS.",
    year: "2024",
    role: "Solo · TCC da pós, PUC-RS",
    context: [
      "Construído como projeto final da minha pós-graduação em desenvolvimento full stack na PUC-RS. A ideia: vizinhos publicam o que podem ensinar ou ajudar, outros vizinhos registram interesse e o autor recebe um e-mail.",
      "Foi minha chance de ser dono de um sistema inteiro em vez de uma camada dele: front-end, API, banco de dados, autenticação e o pipeline que coloca tudo no ar.",
    ],
    decisions: [
      {
        title: "Keycloak para autenticação",
        considered: "Implementar login e JWT à mão na API.",
        why:
          "Identidade é um problema resolvido e fácil de errar. Um servidor de identidade dedicado cuidou de login e tokens, e a API em Express só validava as requisições.",
      },
      {
        title: "Registrar interesse não exige conta",
        considered: "Exigir login antes de contatar um vizinho.",
        why:
          "A primeira interação precisa ser barata. Tornar esse endpoint público removeu o maior ponto de desistência do fluxo.",
      },
      {
        title: "Deploy automatizado desde o primeiro dia",
        considered: "Buildar e copiar arquivos para o servidor à mão.",
        why:
          "Um pipeline builda o front-end e publica no EC2 a cada push, com um job separado para a API, assim a demo do TCC sempre batia com o código.",
      },
    ],
    outcome: [
      "Entregue em dois meses, de abril a maio de 2024, em 21 pull requests.",
      "API em Node/Express sobre PostgreSQL com testes unitários em Jest nos endpoints.",
      "Ambiente local com um comando via Docker Compose: Keycloak, Postgres e pgAdmin.",
    ],
  },
};

export const caseStudies: Record<Lang, CaseStudies> = { en, pt };
