export type Locale = "en" | "pt";

export type CrossPlatformItem = {
  tag: string;
  title: string;
  description: string;
};

export type ProjectMeta = {
  label: string;
  values: string[];
};

export type CaseStudyImage = { src: string; alt: string; width: number; height: number };

export type CaseStudyBlock =
  | { type: "text"; eyebrow?: string; title?: string; paragraphs: string[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "quote"; tagTop: string; tagBottom: string; text: string }
  | { type: "steps"; items: { title: string; description: string }[] }
  | { type: "chain"; items: string[] }
  | {
      type: "cta";
      eyebrow: string;
      title: string;
      subtitle?: string;
      buttonLabel: string;
      href: string;
      prototypeEmbedUrl?: string;
      icon?: { src: string; alt: string; width: number; height: number };
      previewImage?: CaseStudyImage;
      previewBox?: { width: number; height: number };
    }
  | { type: "image"; images: CaseStudyImage[] }
  | { type: "tools"; items: { icon: string; label: string }[] };

export type Project = {
  slug: string;
  client: string;
  tagline: string;
  title: string;
  cardDescription: string;
  role: string;
  year: string;
  tags: string[];
  description: string;
  meta: ProjectMeta[];
  heroImage: CaseStudyImage;
  cardImage: CaseStudyImage;
  blocks: CaseStudyBlock[];
};

export type TimelineEntry = {
  company: string;
  role: string;
  period: string;
  tags: string[];
  bullets: string[];
};

export type Content = {
  meta: { title: string; description: string };
  nav: { home: string; projects: string; experience: string; faq: string; contact: string };
  langLabel: { en: string; pt: string };
  hero: {
    kicker: string;
    name: string;
    role: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    cvUrl: string;
    tags: { label: string; active?: boolean }[];
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
  featuredProjects: {
    title: string;
    subtitle: string;
    dragHint: string;
    switchHint: string;
    accessCase: string;
    items: { slug: string; label: string; brand: string }[];
  };
  experience: {
    title: string;
    tags: string[];
  };
  timeline: TimelineEntry[];
  tools: {
    eyebrow: string;
    title: string;
    foldersLabel: string;
    searchLabel: string;
    folderHint: string;
    tapHint: string;
    folders: {
      designAi: string;
      researchTests: string;
      documentation: string;
      vibeCoding: string;
      productDeploy: string;
    };
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { question: string; answer: string }[];
    callCard: { eyebrow: string; title: string; description: string; buttonLabel: string };
  };
  contact: {
    title: string;
    subtitle: string;
    whatsappLabel: string;
    emailLabel: string;
    linkedinLabel: string;
    whatsapp: string;
    email: string;
    linkedin: string;
    footer: {
      socialHeading: string;
      contactHeading: string;
      languageHeading: string;
      backToTop: string;
      pagesHeading: string;
    };
  };
  caseStudy: {
    back: string;
    next: string;
  };
};

const TRACTIAN_PROTOTYPE_EMBED_URL =
  "https://embed.figma.com/proto/0KHJjQGd0S1FyLqg266ZS2/Asset-Prioritization?node-id=162334-15886&viewport=1818%2C-1414%2C0.56&scaling=contain&content-scaling=fixed&starting-point-node-id=162334%3A15886&show-proto-sidebar=35%3A24906&&page-id=35%3A24906&embed-host=share";

export const content: Record<Locale, Content> = {
  en: {
    meta: {
      title: "Vinicius Maitan — Senior Product Designer",
      description:
        "Specialist in digital product design with over 5 years of experience building complex end-to-end projects for desktop, mobile, and web.",
    },
    nav: { home: "Home", projects: "Projects", experience: "Experience", faq: "FAQ", contact: "Contact" },
    langLabel: { en: "EN", pt: "PT" },
    hero: {
      kicker: "Sr. Product Designer with 5+ years of experience",
      name: "Vinicius Maitan",
      role: "Senior Product Designer",
      subtitle:
        "Specialist in digital product design with over 5 years of experience building complex end-to-end projects for desktop, mobile, and web.",
      ctaPrimary: "View projects",
      ctaSecondary: "Access CV",
      cvUrl: "https://drive.google.com/file/d/1qMD_u-lenH0m2VXP3Zoao0ajcCB6ovO5/view",
      tags: [
        { label: "Design System" },
        { label: "Complex workflows" },
        { label: "Product Design", active: true },
        { label: "Data Driven" },
        { label: "Chat GPT" },
        { label: "Usability Tests" },
        { label: "Desktop" },
        { label: "Mobile" },
        { label: "Figma", active: true },
        { label: "Claude" },
        { label: "Figma Make" },
        { label: "HubSpot" },
        { label: "Gemini" },
        { label: "Prototype" },
        { label: "Research" },
        { label: "Artificial Intelligence", active: true },
        { label: "Responsive Interfaces" },
        { label: "SaaS" },
        { label: "ERP" },
        { label: "B2B" },
        { label: "B2C" },
      ],
    },
    cross: {
      eyebrow: "Cross-platform experience",
      title: "Consistent design, crafted for every context",
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
          tagline:
            "Offers intelligent solutions for industrial monitoring, increasing the reliability and efficiency of equipment.",
          title: "Condition Monitoring Overview",
          cardDescription:
            "Designed to enhance visibility into the progression of equipment failures in industrial environments, the system supports daily operations by enabling more efficient allocation of maintenance hours.",
          role: "Product Designer",
          year: "2023 — Present",
          tags: ["B2B", "Software + Hardware", "Industrial IoT", "Predictive Maintenance"],
          description:
            "Main page of the Tractian platform. It provides a comprehensive overview of the status of the assets monitored by a company's TRACTIAN sensors.",
          meta: [
            { label: "Role", values: ["Product Designer"] },
            { label: "Collaborators", values: ["1 Engineering Manager", "1 Product Manager", "Engineering team"] },
            { label: "Skills", values: ["UX Research", "Design Systems", "Prototyping"] },
            { label: "Timeline", values: ["5 Months"] },
          ],
          heroImage: {
            src: "/images/tractian/hero-bg.png",
            alt: "Industrial plant seen through the office window, with the Tractian mobile app and a failure insight card overlaid",
            width: 3796,
            height: 1760,
          },
          cardImage: {
            src: "/images/tractian/project-card-v2.png",
            alt: "Hands holding a Tractian sensor and a phone in front of the Production dashboard",
            width: 2200,
            height: 1520,
          },
          blocks: [
            {
              type: "text",
              eyebrow: "Overview",
              title: "Prioritizing equipment based on health condition",
              paragraphs: [
                "We redesigned the platform's Overview to facilitate understanding of what needs to be done now and what can wait. This is very important as we have companies with over 1,000 monitored equipments and only 3 people to manage them.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/status-cards.png",
                  alt: "Equipment status counts: 176 Normal, 6 Observe, 4 Warning, 2 Danger",
                  width: 7517,
                  height: 877,
                },
              ],
            },
            {
              type: "text",
              eyebrow: "Problems",
              title: "Lack of direction and a sense of urgency",
              paragraphs: [
                "**Not all equipment failures are the same** or at the same stage. The failure detection model alerts the client days or months before it actually poses an imminent risk. Some **early-stage failures** are not even perceived by human senses. This means that maintenance can wait until it is close to becoming a problem.",
              ],
            },
            {
              type: "quote",
              tagTop: "Failure insight",
              tagBottom: "Immediate correction",
              text: "If all failure alerts have the same importance, it means that **nothing is a priority**.",
            },
            {
              type: "text",
              title: "The update of statuses",
              paragraphs: [
                "The statuses changed according to user actions, not the true condition of the equipment. Whenever a failure insight was generated, the asset entered the Alarming status. After the client addressed the Insight, assigning an inspection (to verify the failure) or event (to confirm the failure), the equipment's status was updated to Warning. The true condition of the asset was not taken into account. Thus, the client could be prioritizing the correction of a less severe failure over another.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/overview-legacy.png",
                  alt: "Legacy Tractian Overview page listing equipment by status",
                  width: 1600,
                  height: 926,
                },
              ],
            },
            {
              type: "text",
              title: "Condition x Operation",
              paragraphs: [
                "When equipment in Alarming or Warning status was out of Operation, the status was updated to Stopped. This caused the user to lose the real information about the condition of the equipment, generating a false sense that their equipment was operating as expected. Just like the offline status. Whenever the sensor was offline, the condition or operation statuses were overwritten.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/condition-vs-operation.png",
                  alt: "Diagram showing Condition (Alarming, Warning) is not the same as Operation (Operating, Stopped)",
                  width: 1600,
                  height: 251,
                },
              ],
            },
            {
              type: "text",
              eyebrow: "Impacts",
              title: "Consequences of an inefficient page",
              paragraphs: [
                "This accumulation delivers various negative results that directly influence the ROI of our product's hiring.",
              ],
            },
            {
              type: "steps",
              items: [
                {
                  title: "Stack of unchecked insights",
                  description: "Since everything has the same priority, the sense of urgency is lost.",
                },
                {
                  title: "Outdated failure detection models",
                  description:
                    "The lack of checking insights harms failure detection models by not receiving user feedback.",
                },
                {
                  title: "Reduced accuracy (false positive)",
                  description:
                    "The lack of clarity about a failure being in an early stage increases the number of insights checked as 'No Failure'.",
                },
                {
                  title: "Elevated average time to check",
                  description:
                    "Insights take a considerable amount of time to verify, since they all have the same priority.",
                },
              ],
            },
            {
              type: "text",
              eyebrow: "Solution",
              title: "Change the entire designed structure and create a new prioritization model with AI",
              paragraphs: [
                "We updated the Condition statuses to clarify when a piece of equipment truly needs attention. Now the statuses are defined purely by Artificial Intelligence and only return to Normal status when there are no pending issues linked to the equipment.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/board-redesign.png",
                  alt: "Redesigned insight board grouped by Danger, Warning and Observe columns",
                  width: 1600,
                  height: 750,
                },
              ],
            },
            {
              type: "text",
              paragraphs: [
                "Now the Condition and Operation statuses work together. One does not negate the other. This means I can see if the equipment is operating and what its specific condition is.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/operation-cards.png",
                  alt: "Operating, Idle and Alarming Assets cards shown independently, next to the failure insight detail",
                  width: 1400,
                  height: 591,
                },
              ],
            },
            {
              type: "text",
              paragraphs: [
                "We added a timeline to the Insight to highlight the deterioration and/or improvement of the equipment over time.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/insight-timeline.png",
                  alt: "Insight timeline showing the severity of a failure changing from Observe to Danger over time",
                  width: 1400,
                  height: 529,
                },
              ],
            },
            {
              type: "text",
              eyebrow: "Results",
              title: "The precision of a design that fulfills its role",
              paragraphs: [],
            },
            {
              type: "steps",
              items: [
                {
                  title: "The number of clicks to check has been reduced from 11 to 4",
                  description: "Same task, but it's easier to spot outstanding issues.",
                },
                {
                  title: "The Average Time to Check has been reduced from 10 hours to 2h 43min",
                  description:
                    "By directing where the user should allocate their time, we help reduce their cognitive load and increase their productivity.",
                },
                {
                  title: "The percentage of checked insights increased by 28%",
                  description:
                    "This means that the failure detection models are being better trained and are delivering more accurate results.",
                },
                {
                  title: "We increased the average number of failures recorded per month by 37%",
                  description: "This means a higher ROI for our client and consequently an upsell on contract renewal.",
                },
              ],
            },
            {
              type: "stats",
              items: [
                { value: "6.3x", label: "ROI" },
                { value: "2h 43min", label: "Average Time to Check" },
                { value: "+37%", label: "Registered Failures" },
              ],
            },
            {
              type: "text",
              eyebrow: "The ecosystem",
              title: "An experience for each device",
              paragraphs: [
                "Adapting desktop content and developing a dedicated application for each device are completely different things. We understood what mobile device users would need in their context and created an interface aimed at identifying the problem and acting. Now in a prioritized and organized manner.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/ecosystem-desktop.png",
                  alt: "The redesigned Overview shown on desktop and tablet",
                  width: 1600,
                  height: 725,
                },
              ],
            },
            {
              type: "cta",
              eyebrow: "Prototype",
              title: "Navigable mobile prototype",
              subtitle: "Designed to ensure precision in the smallest details",
              buttonLabel: "View prototype",
              href: "https://viniciusmaitan.figma.site/prototype",
              prototypeEmbedUrl: TRACTIAN_PROTOTYPE_EMBED_URL,
              icon: { src: "/images/tractian/figma-logo.svg", alt: "Figma", width: 20, height: 32 },
              previewImage: {
                src: "/images/tractian/prototype-preview.png",
                alt: "Tractian mobile prototype showing the Alarming Assets panel",
                width: 2201,
                height: 3276,
              },
              previewBox: { width: 260, height: 259 },
            },
          ],
        },
        {
          slug: "plific",
          client: "Plific",
          tagline: "Financial solutions for gig workers",
          title: "Early Pay",
          cardDescription:
            "Financial tool that advances earnings for app-based drivers and delivery personnel (iFood, Uber, Rappi, 99) — no loan required, with a fixed rate of 4%.",
          role: "Product Engineer",
          year: "2026",
          tags: ["B2C", "Gig Economy", "Software", "Finance"],
          description:
            "Created for gig economy professionals, such as app drivers and delivery workers. The product allows users to view earnings from different platforms, check the amount available for anticipation, and receive part of that money before the scheduled payout date.",
          meta: [
            { label: "Role", values: ["Product Engineer"] },
            { label: "Tools", values: ["Claude Code", "Figma", "GitHub"] },
            { label: "Skills", values: ["UX/UI Design", "Web Design", "Vibe coding"] },
            { label: "Timeline", values: ["1 week"] },
          ],
          heroImage: {
            src: "/images/plific/hero.png",
            alt: "Delivery worker on a bike in front of an office building, with three Plific app screens overlaid",
            width: 3796,
            height: 1760,
          },
          cardImage: {
            src: "/images/plific/project-card-v2.png",
            alt: "Delivery worker on a bike in front of an office building, with three Plific app screens overlaid",
            width: 2600,
            height: 1144,
          },
          blocks: [
            {
              type: "text",
              eyebrow: "Overview",
              title: "Rebuilding a product from scratch with AI",
              paragraphs: [
                "The goal of this project was to revisit a receivables anticipation product I worked on in 2021 and rebuild it with an AI-driven workflow. I started with the existing knowledge about users, context, business rules, and value proposition to focus the experiment on product execution.",
                "More than just testing AI's ability to generate interfaces, the project aimed to understand how it can enhance a Product Designer's execution capacity. The comparison between the process carried out by a multidisciplinary team in 2021 and the reconstruction led by a single person in 2026 highlighted gains in speed and autonomy, without eliminating the need for repertoire, critical thinking, and craft.",
              ],
            },
            {
              type: "text",
              eyebrow: "Process",
              title: "Setup",
              paragraphs: [
                "The first step was to structure the work environment and connect the tools that would support the entire product construction cycle, from interpreting design references to code versioning and application publishing.",
              ],
            },
            {
              type: "tools",
              items: [
                { icon: "/images/tools/apps/app-figma.svg", label: "Figma" },
                { icon: "/images/tools/apps/app-claude.svg", label: "Claude" },
                { icon: "/images/tools/apps/app-github.svg", label: "GitHub" },
                { icon: "/images/tools/apps/app-vercel.svg", label: "Vercel" },
              ],
            },
            {
              type: "text",
              paragraphs: [
                "I started with the integration with **Figma**. The goal was to provide Claude Code with a more complete visual and structural context about the project. With this access, it was possible to consult components, variables, styles, layout properties, and assets used as references for the interface implementation. This setup began to function as a source of context for the AI, rather than just an isolated visual reference.",
                "Next, I connected the project to **GitHub** and defined the repository as the central source of code. This integration allowed for organizing application files, recording project evolution through commits, and maintaining traceability of changes made during development.",
                "Finally, I set up **Vercel** as the hosting and publishing platform. The integration with GitHub enabled the automation of the deployment process and the generation of new application versions whenever relevant changes were pushed to the repository.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/plific/setup-connectors.png",
                  alt: "Claude Code connectors panel showing GitHub, Vercel, Figma and Claude in Chrome connected",
                  width: 1600,
                  height: 1046,
                },
              ],
            },
            {
              type: "text",
              title: "Planning the execution",
              paragraphs: [
                "I defined an execution order to break the project into smaller stages, with clear scopes and objectives. Instead of building the entire experience at once, I organized the work incrementally, starting with the landing page and later moving on to the platform.",
              ],
            },
            { type: "chain", items: ["Landing page", "Platform"] },
            {
              type: "text",
              paragraphs: [
                "Still in its initial version, before any refinement round conducted by me, the landing page was published in a functional environment, with structure, content, and interface generated by AI based on the provided context. This allowed for evaluating the result in a real usage situation, identifying visual inconsistencies, testing responsiveness, and adjusting the process before expanding the scope.",
                "This approach allowed for validating the complete development flow right from the first delivery. With the landing page, I was able to test the interpretation of Figma references, the implementation of the interface, versioning on GitHub, and deployment on Vercel before starting the more complex part of the product.",
              ],
            },
            {
              type: "text",
              eyebrow: "Execution",
              title: "First prompt",
              paragraphs: [
                "Before requesting any implementation, I transformed all the discovery knowledge into a structured product briefing. I shared with Claude Code the problem, user profile, value proposition, available data, business rules, main flow, experience principles, tone of voice, and visual guidelines. I also defined the deliverables, technical infrastructure, and execution order.",
                "This level of specificity reduced ambiguity and provided clear criteria for AI decision-making. It prevented decisions from being made in isolation throughout development. Claude Code knew, for example, that the product should not be presented as a loan, that the rate would be fixed at 4%, that the anticipation flow would have a maximum of three screens, and that all costs should be visible before confirmation.",
              ],
            },
            {
              type: "chain",
              items: [
                "Business context",
                "User",
                "Business rules",
                "Flows",
                "Experience and content",
                "Visual identity",
                "Deliverables",
                "Infrastructure",
                "Expected outcome",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/plific/first-prompt.png",
                  alt: "Claude Code chat showing the structured product briefing prompt for the Plific rebuild",
                  width: 1600,
                  height: 1046,
                },
              ],
            },
            {
              type: "text",
              paragraphs: [
                "I did not provide wireframes or ready layouts for the first version. I made the style guide, assets, and necessary references available, but let the AI interpret the context and propose the interface structure. Thus, the first delivery became a way to evaluate not only the visual result but also the AI's ability to understand the problem and transform the defined constraints into a functional experience.",
                "See the first result generated by Claude Code:",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/plific/first-result.png",
                  alt: "First AI-generated version of the Plific landing page, dark hero and a cost breakdown card",
                  width: 1400,
                  height: 1009,
                },
              ],
            },
            {
              type: "text",
              title: "Refinement",
              paragraphs: [
                "Prompt with clear direction: transforming a first version into a refined one.",
                "The first delivery generated by AI served as a starting point, not a final result. From it, I evaluated hierarchy, spacing, visual consistency, responsiveness, interaction behavior, and adherence to the product identity. Each new request was transformed into a specific direction, with references, expected behavior, and clear implementation criteria.",
                'Instead of generic commands like "make it prettier," I described the problem, the necessary change, and the expected effect on the experience. This process highlights the designer\'s role in building with AI: critically analyzing, making decisions, setting priorities, and guiding execution until the result reaches the expected quality level.',
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/plific/refinement-sessions.png",
                  alt: "Six tilted screenshots of Claude Code sessions iterating on animations, tooltips and dark mode",
                  width: 1600,
                  height: 1097,
                },
              ],
            },
            {
              type: "text",
              title: "The craft applied to refinement",
              paragraphs: [],
            },
            {
              type: "steps",
              items: [
                {
                  title: "Rhythm and visual composition",
                  description:
                    "I created images, adjusted margins, spacings, proportions, and border radius to create consistency among components and improve interface readability.",
                },
                {
                  title: "Responsiveness beyond screen adaptation",
                  description:
                    "I reviewed each delivery on mobile, tablet, and desktop, adjusting structure, information density, and element behavior across different resolutions.",
                },
                {
                  title: "Interactions with clear feedback",
                  description:
                    "I directed the creation of tooltips, hover states, click feedback, and behaviors that helped users understand what was interactive.",
                },
                {
                  title: "Movement with purpose",
                  description:
                    "Animations were used to reinforce hierarchy, guide attention, and create continuity between sections, without competing with the main content.",
                },
                {
                  title: "References translated into decisions",
                  description:
                    "I used real products and experiences as references but transformed each inspiration into instructions suitable for the context, identity, and limitations of the project.",
                },
                {
                  title: "Continuous validation and debugging",
                  description:
                    "After each change, I reviewed the result in the functional environment, identified inconsistencies, and requested specific corrections before moving on to the next stage.",
                },
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/plific/craft-result.png",
                  alt: "Refined Plific landing page with a cost clarity section and platform mockup",
                  width: 1600,
                  height: 1019,
                },
              ],
            },
            {
              type: "text",
              paragraphs: [
                "In general, AI accelerated execution, but the final quality depended on the ability to evaluate, direct, and refine each design decision.",
              ],
            },
            {
              type: "text",
              eyebrow: "Learnings",
              title: "The value lies in direction, not just execution",
              paragraphs: [
                "The project showed that AI can concentrate activities that previously depended on different specialties, such as interface structuring, development, versioning, and deployment, into a single person. However, this acceleration only happened because the product context, business rules, references, and quality criteria were already well defined.",
                "It also became clear that the AI's first response rarely represents the best solution. The result evolved through continuous cycles of analysis, direction, implementation, and validation. The more specific the prompts, the greater the precision of the deliveries and the less rework.",
                "The main gain was not eliminating design work but reducing the operational effort needed to transform decisions into products. This opened up more space to focus on aspects that require judgment, such as hierarchy, clarity, consistency, responsiveness, behavior, and appropriateness of the experience to the user's context.",
              ],
            },
            {
              type: "text",
              eyebrow: "Conclusion",
              title: "A new model of building",
              paragraphs: [
                "Rebuilding this product allowed for a comparison of two execution models. In 2021, its construction required the participation of a multidisciplinary team. In 2026, I was able to develop a new end-to-end version with the support of AI, taking on the direction of product, design, and implementation.",
                "The experiment reinforced that AI enhances a designer's execution capacity but does not replace repertoire, critical thinking, or craft. It was responsible for accelerating production, while my role was to provide context, define criteria, evaluate results, and guide each refinement until reaching a coherent and functional experience.",
                "AI reduced the distance between decision and execution. The quality of the product continued to depend on design direction.",
              ],
            },
            {
              type: "cta",
              eyebrow: "Result",
              title: "Access the live product!",
              subtitle: "AI as ~~pilot~~ co-pilot",
              buttonLabel: "Access",
              href: "https://plific.vercel.app/",
              icon: { src: "/images/plific/cursor-icon.svg", alt: "", width: 32, height: 32 },
              previewImage: {
                src: "/images/plific/result-preview.png",
                alt: "Plific landing page open in a browser window",
                width: 3164,
                height: 2070,
              },
              previewBox: { width: 380, height: 249 },
            },
          ],
        },
      ],
    },
    featuredProjects: {
      title: "Latest Projects",
      subtitle: "Combining strategic thinking and modern workflows to build end-to-end digital products",
      dragHint: "Hold and drag to see more details",
      switchHint: "Switch tabs to check out other projects",
      accessCase: "Access Case",
      items: [
        { slug: "tractian", label: "Condition Monitoring", brand: "TRACTIAN" },
        { slug: "plific", label: "Early Pay", brand: "PLIFIC" },
      ],
    },
    experience: {
      title: "Experience",
      tags: ["SaaS", "B2B", "B2C", "ERP", "Fintech", "Artificial Intelligence"],
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
    tools: {
      eyebrow: "TOOLS",
      title: "What powers every project",
      foldersLabel: "Folders",
      searchLabel: "Search",
      folderHint: "Switch folders to see the tools",
      tapHint: "Tap a tool to see details",
      folders: {
        designAi: "Design and Generative AI",
        researchTests: "Research and Tests",
        documentation: "Documentation",
        vibeCoding: "Vibe Coding",
        productDeploy: "Product and Deploy",
      },
    },
    faq: {
      eyebrow: "FAQ",
      title: "Your questions answered",
      callCard: {
        eyebrow: "Still not sure?",
        title: "Book a discovery call",
        description: "Let's talk about how my experience can help with the challenges you're facing.",
        buttonLabel: "Schedule now",
      },
      items: [
        {
          question: "How do you align design decisions with business goals?",
          answer:
            "I don't treat design as a cosmetic layer, but as a growth lever. Before ideation, I align with PMs and stakeholders on the product's KPIs (e.g., conversion, retention, LTV). Every interface or flow decision is grounded in how it solves a user pain point that, in turn, moves a business metric.",
        },
        {
          question: "What's your working dynamic with engineering teams?",
          answer:
            "I believe in co-ownership: design only creates value once it's live and working flawlessly. Collaboration starts at discovery, not at handoff. I involve developers from the conceptual phase to align on technical feasibility, ensure structured handoffs backed by supporting documentation, and stay actively involved in visual and behavioral QA.",
        },
        {
          question: "What's your role in the use and maturity of Design Systems?",
          answer:
            "I see the Design System as an internal product that ensures scale and consistency. I contribute actively by documenting accessible components, defining interaction patterns, and aligning tokens with the engineering team to speed up development.",
        },
        {
          question: "How do you integrate AI into your workflow?",
          answer:
            "I use AI as a productivity lever across the entire product cycle — synthesizing research data, accelerating prototypes, and bridging interface and code. The Plific case study shows in practice how this integration optimized delivery time and project precision.",
        },
        {
          question: "What does your post-launch follow-up process look like?",
          answer:
            "Rollout is the start of the learning cycle, not the end of the project. The metrics set at kickoff serve as a baseline, but impact analysis only gains real depth in production, by crossing quantitative data with qualitative context. In practice, I combine tracking usage metrics and reviewing session recordings at friction points with an active listening routine alongside Customer Success and Sales. To scale that qualitative capture, I use AI to mine transcripts from online client meetings, identifying spontaneous mentions and sentiment about the new feature. Triangulating this data produces concrete insights that feed and reprioritize the iteration backlog.",
        },
      ],
    },
    contact: {
      title: "Let's take the next step",
      subtitle: "Details build the experience, and collaboration builds the product",
      whatsappLabel: "WhatsApp",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      whatsapp: "+55 (21) 96811-9541",
      email: "viniciusmaitan1@gmail.com",
      linkedin: "linkedin.com/in/vinicius-maitan",
      footer: {
        socialHeading: "Social",
        contactHeading: "Contact",
        languageHeading: "Language",
        backToTop: "Back to top",
        pagesHeading: "Pages",
      },
    },
    caseStudy: {
      back: "Back to home",
      next: "Next project",
    },
  },
  pt: {
    meta: {
      title: "Vinicius Maitan — Product Designer Sênior",
      description:
        "Especialista em design de produtos digitais, com mais de 5 anos de experiência construindo projetos complexos de ponta a ponta para desktop, mobile e web.",
    },
    nav: { home: "Início", projects: "Projetos", experience: "Experiência", faq: "FAQ", contact: "Contato" },
    langLabel: { en: "EN", pt: "PT" },
    hero: {
      kicker: "Product Designer Sênior, com mais de 5 anos de experiência",
      name: "Vinicius Maitan",
      role: "Product Designer Sênior",
      subtitle:
        "Especialista em design de produtos digitais, com mais de 5 anos de experiência construindo projetos complexos de ponta a ponta para desktop, mobile e web.",
      ctaPrimary: "Ver projetos",
      ctaSecondary: "Acessar currículo",
      cvUrl: "https://drive.google.com/file/d/1vQUif5jgpU5xw2WLFRafnmVT2F9i_k3o/view",
      tags: [
        { label: "Design System" },
        { label: "Fluxos complexos" },
        { label: "Product Design", active: true },
        { label: "Orientado a dados" },
        { label: "Chat GPT" },
        { label: "Testes de usabilidade" },
        { label: "Desktop" },
        { label: "Mobile" },
        { label: "Figma", active: true },
        { label: "Claude" },
        { label: "Figma Make" },
        { label: "HubSpot" },
        { label: "Gemini" },
        { label: "Protótipo" },
        { label: "Pesquisa" },
        { label: "Inteligência Artificial", active: true },
        { label: "Interfaces responsivas" },
        { label: "SaaS" },
        { label: "ERP" },
        { label: "B2B" },
        { label: "B2C" },
      ],
    },
    cross: {
      eyebrow: "Experiência multiplataforma",
      title: "Design consistente, pensado para todos os contextos",
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
          tagline:
            "Oferece soluções inteligentes para monitoramento industrial, aumentando a confiabilidade e a eficiência dos equipamentos.",
          title: "Visão Geral: Monitoramento de Condição",
          cardDescription:
            "Desenvolvido para aumentar a visibilidade sobre a evolução de falhas em equipamentos industriais, o sistema apoia a operação diária ao permitir uma alocação mais eficiente das horas de manutenção.",
          role: "Product Designer",
          year: "2023 — Atual",
          tags: ["B2B", "Software + Hardware", "Industrial IoT", "Predictive Maintenance"],
          description:
            "Principal página da plataforma Tractian. Reúne tudo sobre a condição dos ativos monitorados pelos sensores TRACTIAN de uma empresa.",
          meta: [
            { label: "Cargo", values: ["Product Designer"] },
            { label: "Colaboradores", values: ["1 Engineering Manager", "1 Product Manager", "Engineering team"] },
            { label: "Skills", values: ["UX Research", "Design Systems", "Prototyping"] },
            { label: "Prazo", values: ["5 Meses"] },
          ],
          heroImage: {
            src: "/images/tractian/hero-bg.png",
            alt: "Planta industrial vista pela janela do escritório, com o app mobile da Tractian e um card de insight de falha sobrepostos",
            width: 3796,
            height: 1760,
          },
          cardImage: {
            src: "/images/tractian/project-card-v2.png",
            alt: "Mãos segurando um sensor Tractian e um celular em frente ao dashboard de Produção",
            width: 2200,
            height: 1520,
          },
          blocks: [
            {
              type: "text",
              eyebrow: "Resumo",
              title: "Priorizando os equipamentos através do nível de saúde",
              paragraphs: [
                "Redesenhamos a visão geral da plataforma para facilitar a compreensão do que deve ser feito agora e o que pode esperar. Isso é muito importante, pois temos empresas com mais de 1.000 equipamentos monitorados e apenas 3 pessoas para gerenciá-los.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/status-cards.png",
                  alt: "Contagem de status dos equipamentos: 176 Normal, 6 Observe, 4 Aviso, 2 Perigo",
                  width: 7517,
                  height: 877,
                },
              ],
            },
            {
              type: "text",
              eyebrow: "Problemas",
              title: "A falta de direcionamento e o sentimento de emergência",
              paragraphs: [
                "**Nem toda falha de um equipamento é igual** ou está no mesmo estágio. O modelo de detecção de falhas notifica o cliente dias ou meses antes de realmente representar um risco iminente. Algumas **falhas em estágio inicial** nem são percebidas pelos sentidos humanos. Isso significa que a manutenção do equipamento pode esperar até que esteja perto de se tornar um problema.",
              ],
            },
            {
              type: "quote",
              tagTop: "Insight de falha",
              tagBottom: "Correção imediata",
              text: "Se todos os alertas de falhas têm a mesma importância, significa que **nada é prioridade**.",
            },
            {
              type: "text",
              title: "A atualização dos status",
              paragraphs: [
                "Os status mudavam de acordo com as ações do usuário, e não com a verdadeira condição do equipamento. Sempre que um insight de falha era gerado, o ativo entrava no status Alarming. E após o cliente tratar o Insight, atribuindo uma inspeção (para verificar a falha) ou evento (para confirmar a falha), o equipamento tinha seu status atualizado para Warning. A verdadeira condição do ativo não era levada em consideração. Então o cliente poderia estar priorizando a correção de uma falha menos grave do que a outra.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/overview-legacy.png",
                  alt: "Página Overview antiga da Tractian listando equipamentos por status",
                  width: 1600,
                  height: 926,
                },
              ],
            },
            {
              type: "text",
              title: "Condição x Operação",
              paragraphs: [
                "Quando um equipamento no status de Alarming ou Warning estava fora de operação, o status era atualizado para Stopped. Isso fazia com que o usuário perdesse a real informação da condição do equipamento, gerando uma falsa sensação de que seu equipamento está conforme o esperado. Assim como o status offline. Sempre que o sensor estava offline, os status de condição ou operação eram sobrescritos.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/condition-vs-operation.png",
                  alt: "Diagrama mostrando que Condição (Alarming, Warning) não é o mesmo que Operação (Operating, Stopped)",
                  width: 1600,
                  height: 251,
                },
              ],
            },
            {
              type: "text",
              eyebrow: "Impactos",
              title: "Consequências de uma tela ineficiente",
              paragraphs: [
                "Esse somatório entrega diversos resultados negativos, que influenciam diretamente no ROI de contratação do nosso produto.",
              ],
            },
            {
              type: "steps",
              items: [
                {
                  title: "Pilha de insights não checados",
                  description: "Como tudo tem a mesma prioridade, o sentimento de emergência é perdido e a lista vai acumulando.",
                },
                {
                  title: "Modelos de detecção de falhas desatualizados",
                  description:
                    "A falta de checagem dos insights prejudica os modelos de detecção de falhas por não receber o feedback do usuário.",
                },
                {
                  title: "Assertividade reduzida (falso positivo)",
                  description:
                    "A falta de clareza sobre a falha estar em um estágio inicial aumenta a quantidade de Insights checados como 'Sem Falha'.",
                },
                {
                  title: "Tempo médio até a checagem elevado",
                  description: "Os insights levam um tempo considerável para serem checados, pois todos tem a mesma prioridade.",
                },
              ],
            },
            {
              type: "text",
              eyebrow: "Solução",
              title: "Alterar toda a estrutura desenhada e criar um novo modelo de priorização com IA",
              paragraphs: [
                "Atualizamos os status de Condição para deixar claro quando um equipamento realmente precisa de atenção. Agora os status são definidos puramente com Inteligência Artificial e só voltam ao status Normal quando não existe uma pendência vinculada ao equipamento.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/board-redesign.png",
                  alt: "Quadro de insights redesenhado, agrupado nas colunas Danger, Warning e Observe",
                  width: 1600,
                  height: 750,
                },
              ],
            },
            {
              type: "text",
              paragraphs: [
                "Agora os status de Condição e Operação funcionam em conjunto. Um não anula o outro. Isso significa que posso ver se o equipamento está operando e qual a sua determinada condição.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/operation-cards.png",
                  alt: "Cards de Operating, Idle e Alarming Assets exibidos de forma independente, ao lado do detalhe do insight",
                  width: 1400,
                  height: 591,
                },
              ],
            },
            {
              type: "text",
              paragraphs: [
                "Adicionamos no Insight uma linha do tempo para destacar o agravamento e/ou a melhora do equipamento ao longo do tempo.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/insight-timeline.png",
                  alt: "Linha do tempo do insight mostrando a severidade de uma falha evoluindo de Observe para Danger",
                  width: 1400,
                  height: 529,
                },
              ],
            },
            {
              type: "text",
              eyebrow: "Resultados",
              title: "A precisão de um design que cumpre o seu papel",
              paragraphs: [],
            },
            {
              type: "steps",
              items: [
                {
                  title: "O número de cliques até a checagem foi reduzido de 11 para 4",
                  description: "Mesma tarefa, porém maior simplicidade para detectar as pendências.",
                },
                {
                  title: "O Tempo Médio até a Checagem foi reduzido de 10 horas para 2h 43min",
                  description: "Direcionando onde o usuário deve alocar seu tempo, ajudamos a reduzir sua carga cognitiva e aumentamos sua produtividade.",
                },
                {
                  title: "A porcentagem de Insights checados subiu em 28%",
                  description:
                    "Isso significa que os modelos de detecção de falhas estão sendo melhor treinados e estão entregando resultados mais assertivos.",
                },
                {
                  title: "Aumentamos a média de falhas registradas por mês em 37%",
                  description: "Isso significa um ROI maior para nosso cliente e, consequentemente, um upsell na renovação de contrato.",
                },
              ],
            },
            {
              type: "stats",
              items: [
                { value: "6.3x", label: "ROI" },
                { value: "2h 43min", label: "Tempo Médio até Checagem" },
                { value: "+37%", label: "Falhas Registradas" },
              ],
            },
            {
              type: "text",
              eyebrow: "O ecossistema",
              title: "Uma experiência para cada dispositivo",
              paragraphs: [
                "Adaptar o conteúdo do desktop e desenvolver uma aplicação exclusiva para cada dispositivo são tarefas completamente diferentes. Entendemos o que os usuários dos dispositivos móveis precisariam em seu contexto e criamos uma interface voltada para identificar o problema e agir. Agora, de forma priorizada e organizada.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/tractian/ecosystem-desktop.png",
                  alt: "A Overview redesenhada exibida em desktop e tablet",
                  width: 1600,
                  height: 725,
                },
              ],
            },
            {
              type: "cta",
              eyebrow: "Protótipo",
              title: "Protótipo mobile navegável",
              subtitle: "Desenhado para garantir precisão nos mínimos detalhes",
              buttonLabel: "Ver protótipo",
              href: "https://viniciusmaitan.figma.site/prototype",
              prototypeEmbedUrl: TRACTIAN_PROTOTYPE_EMBED_URL,
              icon: { src: "/images/tractian/figma-logo.svg", alt: "Figma", width: 20, height: 32 },
              previewImage: {
                src: "/images/tractian/prototype-preview.png",
                alt: "Protótipo mobile da Tractian mostrando o painel de Alarming Assets",
                width: 2201,
                height: 3276,
              },
              previewBox: { width: 260, height: 259 },
            },
          ],
        },
        {
          slug: "plific",
          client: "Plific",
          tagline: "Soluções financeiras para entregadores e motoristas de aplicativos",
          title: "Antecipação de Recebíveis",
          cardDescription:
            "Ferramenta financeira que antecipa os ganhos de motoristas e entregadores de aplicativo (iFood, Uber, Rappi, 99) — sem empréstimo, com taxa fixa de 4%.",
          role: "Product Engineer",
          year: "2026",
          tags: ["B2C", "Gig Economy", "Software", "Finance"],
          description:
            "Criado para trabalhadores autônomos e profissionais da gig economy, como motoristas de aplicativo e entregadores. O produto permite visualizar ganhos provenientes de diferentes plataformas, consultar o valor disponível para antecipação e receber parte desse dinheiro antes da data prevista de repasse.",
          meta: [
            { label: "Cargo", values: ["Product Engineer"] },
            { label: "Ferramentas", values: ["Claude Code", "Figma", "GitHub"] },
            { label: "Skills", values: ["UX/UI Design", "Web Design", "Vibe coding"] },
            { label: "Prazo", values: ["1 semana"] },
          ],
          heroImage: {
            src: "/images/plific/hero.png",
            alt: "Entregador de bicicleta em frente a um prédio comercial, com três telas do app Plific sobrepostas",
            width: 3796,
            height: 1760,
          },
          cardImage: {
            src: "/images/plific/project-card-v2.png",
            alt: "Entregador de bicicleta em frente a um prédio comercial, com três telas do app Plific sobrepostas",
            width: 2600,
            height: 1144,
          },
          blocks: [
            {
              type: "text",
              eyebrow: "Visão Geral",
              title: "Re-construindo um produto do zero com IA",
              paragraphs: [
                "O objetivo deste projeto foi revisitar um produto de antecipação de recebíveis no qual trabalhei em 2021 e reconstruí-lo com um fluxo de trabalho orientado por IA. Dei início com o conhecimento já existente sobre usuários, contexto, regras de negócio e proposta de valor para concentrar o experimento na execução do produto.",
                "Mais do que testar a capacidade da IA de gerar interfaces, o projeto buscou entender como ela pode ampliar a capacidade de execução de um Product Designer. A comparação entre o processo realizado por uma equipe multidisciplinar em 2021 e a reconstrução conduzida por uma única pessoa em 2026 evidenciou ganhos de velocidade e autonomia, sem eliminar a necessidade de repertório, pensamento crítico e craft.",
              ],
            },
            {
              type: "text",
              eyebrow: "Processo",
              title: "Setup",
              paragraphs: [
                "A primeira etapa foi estruturar o ambiente de trabalho e conectar as ferramentas que sustentariam todo o ciclo de construção do produto, desde a interpretação das referências de design até o versionamento do código e a publicação da aplicação.",
              ],
            },
            {
              type: "tools",
              items: [
                { icon: "/images/tools/apps/app-figma.svg", label: "Figma" },
                { icon: "/images/tools/apps/app-claude.svg", label: "Claude" },
                { icon: "/images/tools/apps/app-github.svg", label: "GitHub" },
                { icon: "/images/tools/apps/app-vercel.svg", label: "Vercel" },
              ],
            },
            {
              type: "text",
              paragraphs: [
                "Comecei pela integração com o **Figma**. O objetivo era fornecer ao Claude Code um contexto visual e estrutural mais completo sobre o projeto. Com esse acesso, foi possível consultar componentes, variáveis, estilos, propriedades de layout e assets utilizados como referência para a implementação da interface. Essa configuração passou a funcionar como uma fonte de contexto para a IA, e não apenas como uma referência visual isolada.",
                "Em seguida, conectei o projeto ao **GitHub** e defini o repositório como a fonte central do código. Essa integração permitiu organizar os arquivos da aplicação, registrar a evolução do projeto por meio de commits e manter a rastreabilidade das alterações realizadas durante o desenvolvimento.",
                "Por fim, configurei a **Vercel** como plataforma de hospedagem e publicação. A integração com o GitHub possibilitou automatizar o processo de deploy e gerar novas versões da aplicação sempre que alterações relevantes eram enviadas ao repositório.",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/plific/setup-connectors.png",
                  alt: "Painel de conectores do Claude Code mostrando GitHub, Vercel, Figma e Claude in Chrome conectados",
                  width: 1600,
                  height: 1046,
                },
              ],
            },
            {
              type: "text",
              title: "Planejando a execução",
              paragraphs: [
                "Defini uma ordem de execução para dividir o projeto em etapas menores, com escopos e objetivos claros. Em vez de construir toda a experiência de uma só vez, organizei o trabalho de forma incremental, começando pela landing page e avançando posteriormente para a plataforma.",
              ],
            },
            { type: "chain", items: ["Landing page", "Plataforma"] },
            {
              type: "text",
              paragraphs: [
                "Ainda em sua versão inicial, antes de qualquer rodada de refinamento conduzida por mim, a landing page foi publicada em um ambiente funcional, com estrutura, conteúdo e interface gerados pela IA a partir do contexto fornecido. Isso permitiu avaliar o resultado em uma situação real de uso, identificar inconsistências visuais, testar a responsividade e ajustar o processo antes de ampliar o escopo.",
                "Essa abordagem permitiu validar o fluxo completo de desenvolvimento logo na primeira entrega. Com a landing page, consegui testar a interpretação das referências do Figma, a implementação da interface, o versionamento no GitHub e o deploy na Vercel antes de iniciar a parte mais complexa do produto.",
              ],
            },
            {
              type: "text",
              eyebrow: "Execução",
              title: "Primeiro prompt",
              paragraphs: [
                "Antes de solicitar qualquer implementação, transformei todo o conhecimento da descoberta em um briefing estruturado de produto. Compartilhei com o Claude Code o problema, o perfil do usuário, a proposta de valor, os dados disponíveis, as regras de negócio, o fluxo principal, os princípios de experiência, o tom de voz e as diretrizes visuais. Também defini os entregáveis, a infraestrutura técnica e a ordem de execução.",
                "Esse nível de especificidade reduziu a ambiguidade e forneceu critérios claros para a tomada de decisão da IA. Evitando que decisões fossem tomadas de forma isolada ao longo do desenvolvimento. O Claude Code sabia, por exemplo, que o produto não deveria ser apresentado como empréstimo, que a taxa seria fixa em 4%, que o fluxo de antecipação teria no máximo três telas e que todos os custos deveriam estar visíveis antes da confirmação.",
              ],
            },
            {
              type: "chain",
              items: [
                "Contexto do negócio",
                "Usuário",
                "Regras de negócio",
                "Fluxos",
                "Experiência e conteúdo",
                "Identidade visual",
                "Entregáveis",
                "Infraestrutura",
                "Resultado esperado",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/plific/first-prompt.png",
                  alt: "Chat do Claude Code mostrando o briefing estruturado de produto para a reconstrução da Plific",
                  width: 1600,
                  height: 1046,
                },
              ],
            },
            {
              type: "text",
              paragraphs: [
                "Não forneci wireframes ou layouts prontos para a primeira versão. Disponibilizei o style guide, os assets e as referências necessárias, mas deixei que a IA interpretasse o contexto e propusesse a estrutura da interface. Assim, a primeira entrega se tornou uma forma de avaliar não apenas o resultado visual, mas também a capacidade da IA de compreender o problema e transformar as restrições definidas em uma experiência funcional.",
                "Veja o primeiro resultado gerado pelo Claude Code:",
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/plific/first-result.png",
                  alt: "Primeira versão da landing page da Plific gerada pela IA, com hero escuro e card de custos",
                  width: 1400,
                  height: 1009,
                },
              ],
            },
            {
              type: "text",
              title: "Refinamento",
              paragraphs: [
                "Prompt com direcionamento claro: transformando uma primeira versão em uma versão refinada.",
                "A primeira entrega gerada pela IA funcionou como ponto de partida, não como resultado final. A partir dela, avaliei hierarquia, espaçamento, consistência visual, responsividade, comportamento das interações e aderência à identidade do produto. Cada nova solicitação foi transformada em um direcionamento específico, com referências, comportamento esperado e critérios claros de implementação.",
                'Em vez de comandos genéricos como "deixe mais bonito", descrevi o problema, a alteração necessária e o efeito esperado na experiência. Esse processo evidencia o papel do designer na construção com IA: analisar criticamente, tomar decisões, definir prioridades e orientar a execução até que o resultado alcance o nível de qualidade esperado.',
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/plific/refinement-sessions.png",
                  alt: "Seis capturas inclinadas de sessões do Claude Code iterando em animações, tooltips e modo escuro",
                  width: 1600,
                  height: 1097,
                },
              ],
            },
            {
              type: "text",
              title: "O craft aplicado ao refinamento",
              paragraphs: [],
            },
            {
              type: "steps",
              items: [
                {
                  title: "Ritmo e composição visual",
                  description:
                    "Criei imagens, ajustei margens, espaçamentos, proporções e border radius para criar consistência entre os componentes e melhorar a leitura da interface.",
                },
                {
                  title: "Responsividade além da adaptação de tela",
                  description:
                    "Revisei cada entrega em mobile, tablet e desktop, ajustando estrutura, densidade de informação e comportamento dos elementos em diferentes resoluções.",
                },
                {
                  title: "Interações com feedback claro",
                  description:
                    "Direcionei a criação de tooltips, estados de hover, feedbacks de clique e comportamentos que ajudassem o usuário a compreender o que era interativo.",
                },
                {
                  title: "Movimento com propósito",
                  description:
                    "As animações foram usadas para reforçar hierarquia, conduzir a atenção e criar continuidade entre as seções, sem competir com o conteúdo principal.",
                },
                {
                  title: "Referências traduzidas em decisões",
                  description:
                    "Utilizei produtos e experiências reais como referência, mas transformei cada inspiração em instruções adequadas ao contexto, à identidade e às limitações do projeto.",
                },
                {
                  title: "Validação e debugging contínuos",
                  description:
                    "Após cada alteração, revisei o resultado no ambiente funcional, identifiquei inconsistências e solicitei correções específicas antes de avançar para a próxima etapa.",
                },
              ],
            },
            {
              type: "image",
              images: [
                {
                  src: "/images/plific/craft-result.png",
                  alt: "Landing page refinada da Plific com seção de clareza de custos e mockup da plataforma",
                  width: 1600,
                  height: 1019,
                },
              ],
            },
            {
              type: "text",
              paragraphs: [
                "De forma geral, a IA acelerou a execução, mas a qualidade final dependeu da capacidade de avaliar, direcionar e refinar cada decisão de design.",
              ],
            },
            {
              type: "text",
              eyebrow: "Aprendizados",
              title: "O valor está na direção, não apenas na execução",
              paragraphs: [
                "O projeto mostrou que a IA pode concentrar em uma única pessoa atividades que antes dependiam de diferentes especialidades, como estruturação da interface, desenvolvimento, versionamento e deploy. Essa aceleração, porém, só aconteceu porque o contexto do produto, as regras de negócio, as referências e os critérios de qualidade já estavam bem definidos.",
                "Também ficou claro que a primeira resposta da IA raramente representa a melhor solução. O resultado evoluiu por meio de ciclos contínuos de análise, direcionamento, implementação e validação. Quanto mais específicos eram os prompts, maior era a precisão das entregas e menor era o retrabalho.",
                "O principal ganho não foi eliminar o trabalho de design, mas reduzir o esforço operacional necessário para transformar decisões em produto. Isso abriu mais espaço para atuar em aspectos que exigem julgamento, como hierarquia, clareza, consistência, responsividade, comportamento e adequação da experiência ao contexto do usuário.",
              ],
            },
            {
              type: "text",
              eyebrow: "Conclusão",
              title: "Um novo modelo de construir",
              paragraphs: [
                "Reconstruir esse produto permitiu comparar dois modelos de execução. Em 2021, sua construção exigiu a participação de uma equipe multidisciplinar. Em 2026, consegui desenvolver uma nova versão de ponta a ponta com apoio da IA, assumindo a direção de produto, design e implementação.",
                "O experimento reforçou que a IA amplia a capacidade de execução de um designer, mas não substitui repertório, pensamento crítico ou craft. Ela foi responsável por acelerar a produção, enquanto meu papel foi fornecer contexto, definir critérios, avaliar os resultados e conduzir cada refinamento até chegar a uma experiência coerente e funcional.",
                "A IA reduziu a distância entre a decisão e a execução. A qualidade do produto continuou dependendo da direção de design.",
              ],
            },
            {
              type: "cta",
              eyebrow: "Resultado",
              title: "Acesse o produto no ar!",
              subtitle: "IA como ~~piloto~~ co-piloto",
              buttonLabel: "Acessar",
              href: "https://plific.vercel.app/",
              icon: { src: "/images/plific/cursor-icon.svg", alt: "", width: 32, height: 32 },
              previewImage: {
                src: "/images/plific/result-preview.png",
                alt: "Landing page da Plific aberta em uma janela de navegador",
                width: 3164,
                height: 2070,
              },
              previewBox: { width: 380, height: 249 },
            },
          ],
        },
      ],
    },
    featuredProjects: {
      title: "Últimos Projetos",
      subtitle: "Combinando pensamento estratégico e workflows modernos para construir produtos digitais end-to-end",
      dragHint: "Segure e arraste para ver mais detalhes",
      switchHint: "Troque de aba para conferir outros projetos",
      accessCase: "Acessar Case",
      items: [
        { slug: "tractian", label: "Condition Monitoring", brand: "TRACTIAN" },
        { slug: "plific", label: "Early Pay", brand: "PLIFIC" },
      ],
    },
    experience: {
      title: "Experiência",
      tags: ["SaaS", "B2B", "B2C", "ERP", "Fintech", "Inteligência Artificial"],
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
    tools: {
      eyebrow: "FERRAMENTAS",
      title: "O que impulsiona cada projeto",
      foldersLabel: "Pastas",
      searchLabel: "Buscar",
      folderHint: "Troque de pasta para ver as ferramentas",
      tapHint: "Toque em uma ferramenta para conferir detalhes",
      folders: {
        designAi: "Design e IA Generativa",
        researchTests: "Pesquisa e Testes",
        documentation: "Documentação",
        vibeCoding: "Vibe Coding",
        productDeploy: "Produto e Deploy",
      },
    },
    faq: {
      eyebrow: "FAQ",
      title: "Suas perguntas respondidas",
      callCard: {
        eyebrow: "Ainda com dúvidas?",
        title: "Agende uma call",
        description: "Vamos conversar sobre como minha experiência pode ajudar nos desafios que você precisa enfrentar.",
        buttonLabel: "Agendar agora",
      },
      items: [
        {
          question: "Como você alinha decisões de design com os objetivos de negócio?",
          answer:
            "Não trato design como camada estética, mas como alavanca de crescimento. Antes da ideação, alinho com PMs e stakeholders os KPIs de produto (ex.: conversão, retenção, LTV). Cada escolha de interface ou fluxo é fundamentada em como ela resolve uma dor do usuário que, por consequência, move uma métrica de negócio.",
        },
        {
          question: "Como é a sua dinâmica de trabalho com times técnicos?",
          answer:
            "Acredito em co-propriedade: o design só gera valor quando está no ar e funcionando perfeitamente. A colaboração começa no discovery, não no handoff. Envolvo desenvolvedores desde a fase conceitual para alinhar viabilidade técnica, garanto handoffs estruturados com documentações de apoio e atuo ativamente no QA visual e comportamental.",
        },
        {
          question: "Qual é o seu papel no uso e maturidade de Design Systems?",
          answer:
            "Vejo o Design System como um produto interno que garante escala e consistência. Contribuo ativamente documentando componentes acessíveis, definindo padrões de interação e alinhando tokens com o time de engenharia para acelerar o desenvolvimento.",
        },
        {
          question: "Como você integra IA no seu fluxo de trabalho?",
          answer:
            "Utilizo IA como alavanca de produtividade em todo o ciclo do produto — na síntese de dados de pesquisa, na aceleração de protótipos e na ponte entre interface e código. O case da Plific exemplifica como essa integração otimizou o tempo de entrega e a precisão do projeto na prática.",
        },
        {
          question: "Qual é o seu processo de acompanhamento no pós-lançamento?",
          answer:
            "O rollout é o início do ciclo de aprendizado, não o encerramento do projeto. As métricas estabelecidas no kickoff funcionam como linha de base, mas a análise de impacto ganha real profundidade em produção ao cruzar dados quantitativos com contexto qualitativo. Na prática, combino o acompanhamento das métricas de uso e a observação de gravações de sessão nos pontos de fricção com uma rotina ativa de escuta junto a Customer Success e Vendas. Para dar escala a essa captura qualitativa, utilizo inteligência artificial para minerar transcrições de reuniões online com clientes, identificando menções e sentimentos espontâneos sobre a nova funcionalidade. A triangulação desses dados gera insights concretos que alimentam e reordenam o backlog de iterações.",
        },
      ],
    },
    contact: {
      title: "Vamos dar o próximo passo",
      subtitle: "Os detalhes constroem a experiência e a colaboração constrói o produto",
      whatsappLabel: "WhatsApp",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      whatsapp: "+55 (21) 96811-9541",
      email: "viniciusmaitan1@gmail.com",
      linkedin: "linkedin.com/in/vinicius-maitan",
      footer: {
        socialHeading: "Social",
        contactHeading: "Contato",
        languageHeading: "Idioma",
        backToTop: "Voltar ao topo",
        pagesHeading: "Páginas",
      },
    },
    caseStudy: {
      back: "Voltar para o início",
      next: "Próximo projeto",
    },
  },
};
