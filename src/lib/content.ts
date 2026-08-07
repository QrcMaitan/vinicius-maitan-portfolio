export type Locale = "en" | "pt";

export type CrossPlatformItem = {
  tag: string;
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  client: string;
  title: string;
  role: string;
  year: string;
  tags: string[];
  description: string;
  highlights: string[];
};

export type TimelineEntry = {
  company: string;
  role: string;
  period: string;
  tags: string[];
  bullets: string[];
};

export type Metric = {
  value: string;
  suffix?: string;
  label: string;
};

export type Content = {
  meta: { title: string; description: string };
  nav: { home: string; projects: string; experience: string; contact: string };
  langLabel: { en: string; pt: string };
  hero: {
    kicker: string;
    name: string;
    role: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  cross: {
    eyebrow: string;
    title: string;
    items: CrossPlatformItem[];
  };
  projects: {
    eyebrow: string;
    title: string;
    viewCase: string;
    items: Project[];
  };
  experience: {
    eyebrow: string;
    title: string;
    metrics: Metric[];
  };
  timeline: TimelineEntry[];
  contact: {
    eyebrow: string;
    title: string;
    whatsappLabel: string;
    emailLabel: string;
    linkedinLabel: string;
    whatsapp: string;
    email: string;
    linkedin: string;
  };
  caseStudy: {
    back: string;
    client: string;
    role: string;
    year: string;
    overview: string;
    highlights: string;
    next: string;
  };
};

export const content: Record<Locale, Content> = {
  en: {
    meta: {
      title: "Vinicius Maitan — Senior Product Designer",
      description:
        "Specialist in digital product design with over 5 years of experience building complex end-to-end projects for desktop, mobile, and web.",
    },
    nav: { home: "Home", projects: "Projects", experience: "Experience", contact: "Contact" },
    langLabel: { en: "EN", pt: "PT" },
    hero: {
      kicker: "Senior Product Designer",
      name: "Vinicius Maitan",
      role: "Senior Product Designer",
      subtitle:
        "Specialist in digital product design with over 5 years of experience building complex end-to-end projects for desktop, mobile, and web.",
      ctaPrimary: "View experience",
      ctaSecondary: "Access CV",
    },
    cross: {
      eyebrow: "Cross-platform experience",
      title: "One practice, three surfaces",
      items: [
        {
          tag: "Desktop",
          title: "Desktop Product Design",
          description:
            "This is where we provide the most complete version of the product, delivering agility for more complex tasks.",
        },
        {
          tag: "Mobile",
          title: "Mobile Product Design",
          description:
            "Designed for specific actions. Each action must be completed with the minimum number of interactions.",
        },
        {
          tag: "Web",
          title: "Web Design",
          description:
            "Website presents the company and its products, highlighting our solutions and the value we deliver.",
        },
      ],
    },
    projects: {
      eyebrow: "Latest projects",
      title: "Selected work",
      viewCase: "View case study",
      items: [
        {
          slug: "tractian",
          client: "Tractian",
          title: "Condition Overview",
          role: "Senior Product Designer",
          year: "2023 — Present",
          tags: ["SaaS", "B2B", "Industrial"],
          description:
            "Designed to enhance visibility into the progression of equipment failures in industrial environments, the system supports daily operations by enabling more efficient allocation of maintenance hours.",
          highlights: [
            "End-to-end involvement in over 30 projects, leading product discovery, UX/UI, prototyping, handoff, and delivery",
            "Active contribution to the creation and evolution of the Design System, enhancing team consistency and speed",
            "Responsible for monitoring and evolving core products, directly involved in strategic decisions with Product Analytics (PostHog)",
          ],
        },
        {
          slug: "plific",
          client: "Plific",
          title: "Receivables Anticipation",
          role: "Mid-level Product Designer",
          year: "2021 — 2023",
          tags: ["Fintech", "B2C", "Open Banking"],
          description:
            "Financial tool that advances earnings for app-based drivers and delivery personnel (iFood, Uber, Rappi, 99) — no loan required, with a fixed rate of 4%.",
          highlights: [
            "Involvement in building a mobile app with integration via Open Banking",
            "Design of flows and interfaces for a credit product (receivables anticipation)",
            "Active participation in ideation, user validation, and usability testing",
          ],
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Five years, three companies",
      metrics: [
        { value: "5", suffix: "+", label: "Years experience" },
        { value: "30", suffix: "+", label: "Projects shipped" },
        { value: "3", label: "Companies" },
        { value: "1", label: "Design system built" },
      ],
    },
    timeline: [
      {
        company: "Tractian",
        role: "Senior Product Designer",
        period: "Mar 2023 — Present",
        tags: ["SaaS", "B2B", "Artificial Intelligence"],
        bullets: [
          "End-to-end involvement in over 30 projects, leading product discovery, UX/UI, prototyping, handoff, and delivery",
          "Active contribution to the creation and evolution of the Design System, enhancing team consistency and speed",
          "Participation in defining and implementing design processes to improve product team deliveries and collaboration with Product and Engineering",
          "Responsible for monitoring and evolving core products, directly involved in strategic decisions with Product Analytics (PostHog)",
          "Collaboration with stakeholders, PMs, and developers to align business and user experience",
          "Application of AI tools in the design process — research, ideation, documentation, prototyping, refinement of solutions, assets, and microcopy",
        ],
      },
      {
        company: "Plific",
        role: "Mid-level Product Designer",
        period: "May 2021 — Mar 2023",
        tags: ["Fintech", "B2C"],
        bullets: [
          "Product Designer in fintech, focused on financial solutions for delivery drivers and app drivers",
          "Involvement in building a mobile app with integration via Open Banking",
          "Design of flows and interfaces for a credit product (receivables anticipation)",
          "Active participation in ideation, user validation, and usability testing",
          "Building the new institutional website with the addition of new products",
        ],
      },
      {
        company: "QR Culture",
        role: "Co-founder & Product Designer",
        period: "Nov 2018 — Feb 2022",
        tags: ["B2C"],
        bullets: [
          "Co-founder and responsible for Product Design and UX of the platform",
          "Creation of a digital product aimed at valuing and monetizing street artists",
          "Defining the product vision, flows, interface, and user experience",
          "Involvement in product strategy, hypothesis validation, and MVP",
          "Building the institutional website",
        ],
      },
    ],
    contact: {
      eyebrow: "Contact",
      title: "Let's build the next one.",
      whatsappLabel: "WhatsApp",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      whatsapp: "+55 (21) 96811-9541",
      email: "viniciusmaitan1@gmail.com",
      linkedin: "linkedin.com/in/vinicius-maitan",
    },
    caseStudy: {
      back: "Back to home",
      client: "Client",
      role: "Role",
      year: "Year",
      overview: "Overview",
      highlights: "Contributions",
      next: "Next project",
    },
  },
  pt: {
    meta: {
      title: "Vinicius Maitan — Product Designer Sênior",
      description:
        "Especialista em design de produtos digitais, com mais de 5 anos de experiência construindo projetos complexos de ponta a ponta para desktop, mobile e web.",
    },
    nav: { home: "Início", projects: "Projetos", experience: "Experiência", contact: "Contato" },
    langLabel: { en: "EN", pt: "PT" },
    hero: {
      kicker: "Product Designer Sênior",
      name: "Vinicius Maitan",
      role: "Product Designer Sênior",
      subtitle:
        "Especialista em design de produtos digitais, com mais de 5 anos de experiência construindo projetos complexos de ponta a ponta para desktop, mobile e web.",
      ctaPrimary: "Ver experiência",
      ctaSecondary: "Acessar currículo",
    },
    cross: {
      eyebrow: "Experiência multiplataforma",
      title: "Uma prática, três superfícies",
      items: [
        {
          tag: "Desktop",
          title: "Product Design para Desktop",
          description:
            "É aqui que entregamos a versão mais completa do produto, com agilidade para tarefas mais complexas.",
        },
        {
          tag: "Mobile",
          title: "Product Design para Mobile",
          description:
            "Desenhado para ações específicas. Cada ação deve ser concluída com o menor número possível de interações.",
        },
        {
          tag: "Web",
          title: "Web Design",
          description:
            "O site apresenta a empresa e seus produtos, destacando nossas soluções e o valor que entregamos.",
        },
      ],
    },
    projects: {
      eyebrow: "Últimos projetos",
      title: "Trabalhos selecionados",
      viewCase: "Ver case",
      items: [
        {
          slug: "tractian",
          client: "Tractian",
          title: "Condition Overview",
          role: "Product Designer Sênior",
          year: "2023 — Atual",
          tags: ["SaaS", "B2B", "Industrial"],
          description:
            "Desenvolvido para aumentar a visibilidade sobre a progressão de falhas em equipamentos em ambientes industriais, o sistema apoia a operação diária ao permitir uma alocação mais eficiente das horas de manutenção.",
          highlights: [
            "Envolvimento de ponta a ponta em mais de 30 projetos, liderando discovery de produto, UX/UI, prototipação, handoff e entrega",
            "Contribuição ativa na criação e evolução do Design System, aumentando a consistência e a velocidade do time",
            "Responsável por monitorar e evoluir produtos core, diretamente envolvido em decisões estratégicas com Product Analytics (PostHog)",
          ],
        },
        {
          slug: "plific",
          client: "Plific",
          title: "Antecipação de Recebíveis",
          role: "Product Designer Pleno",
          year: "2021 — 2023",
          tags: ["Fintech", "B2C", "Open Banking"],
          description:
            "Ferramenta financeira que antecipa os ganhos de motoristas e entregadores de aplicativo (iFood, Uber, Rappi, 99) — sem empréstimo, com taxa fixa de 4%.",
          highlights: [
            "Envolvimento na construção de um app mobile com integração via Open Banking",
            "Design de fluxos e interfaces para um produto de crédito (antecipação de recebíveis)",
            "Participação ativa em ideação, validação com usuários e testes de usabilidade",
          ],
        },
      ],
    },
    experience: {
      eyebrow: "Experiência",
      title: "Cinco anos, três empresas",
      metrics: [
        { value: "5", suffix: "+", label: "Anos de experiência" },
        { value: "30", suffix: "+", label: "Projetos entregues" },
        { value: "3", label: "Empresas" },
        { value: "1", label: "Design system criado" },
      ],
    },
    timeline: [
      {
        company: "Tractian",
        role: "Product Designer Sênior",
        period: "mar. 2023 — atual",
        tags: ["SaaS", "B2B", "Inteligência Artificial"],
        bullets: [
          "Envolvimento de ponta a ponta em mais de 30 projetos, liderando discovery de produto, UX/UI, prototipação, handoff e entrega",
          "Contribuição ativa na criação e evolução do Design System, aumentando a consistência e a velocidade do time",
          "Participação na definição e implementação de processos de design para melhorar as entregas do time de produto e a colaboração com Produto e Engenharia",
          "Responsável por monitorar e evoluir produtos core, diretamente envolvido em decisões estratégicas com Product Analytics (PostHog)",
          "Colaboração com stakeholders, PMs e desenvolvedores para alinhar negócio e experiência do usuário",
          "Aplicação de ferramentas de IA no processo de design — pesquisa, ideação, documentação, prototipação, refinamento de soluções, assets e microcopy",
        ],
      },
      {
        company: "Plific",
        role: "Product Designer Pleno",
        period: "mai. 2021 — mar. 2023",
        tags: ["Fintech", "B2C"],
        bullets: [
          "Product Designer em fintech, focado em soluções financeiras para motoristas e entregadores de aplicativo",
          "Envolvimento na construção de um app mobile com integração via Open Banking",
          "Design de fluxos e interfaces para um produto de crédito (antecipação de recebíveis)",
          "Participação ativa em ideação, validação com usuários e testes de usabilidade",
          "Construção do novo site institucional com a adição de novos produtos",
        ],
      },
      {
        company: "QR Culture",
        role: "Cofundador & Product Designer",
        period: "nov. 2018 — fev. 2022",
        tags: ["B2C"],
        bullets: [
          "Cofundador e responsável pelo Product Design e UX da plataforma",
          "Criação de um produto digital voltado à valorização e monetização de artistas de rua",
          "Definição da visão de produto, fluxos, interface e experiência do usuário",
          "Envolvimento na estratégia de produto, validação de hipóteses e MVP",
          "Construção do site institucional",
        ],
      },
    ],
    contact: {
      eyebrow: "Contato",
      title: "Vamos construir o próximo.",
      whatsappLabel: "WhatsApp",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      whatsapp: "+55 (21) 96811-9541",
      email: "viniciusmaitan1@gmail.com",
      linkedin: "linkedin.com/in/vinicius-maitan",
    },
    caseStudy: {
      back: "Voltar para o início",
      client: "Cliente",
      role: "Função",
      year: "Ano",
      overview: "Visão geral",
      highlights: "Contribuições",
      next: "Próximo projeto",
    },
  },
};
