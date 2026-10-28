export const principles = [
  {
    id: "architecture-before-interface",
    eyebrow: "Foundation",
    title: "Plan the system before the screens",
    summary: "What the product has to do shapes what the screens look like.",
    content:
      "Before anyone draws a screen, I map the data, how the pieces relate and the main flows. Doing it in that order means the product can grow without being rewritten every few months. The screens then show the structure instead of fighting it.",
    emphasis: "Get the structure right and the design gets easier.",
  },
  {
    id: "user-flow-before-features",
    eyebrow: "Clarity",
    title: "Finish one journey before adding more",
    summary: "One complete path beats many half-built ones.",
    content:
      "I get one full journey working from start to finish before looking at extras. A single flow that works well is worth more than a dozen features that almost do. It also keeps the product easy to explain.",
    emphasis: "Do fewer things, and finish them.",
  },
  {
    id: "monetization-as-architecture",
    eyebrow: "Sustainability",
    title: "Plan how it earns from day one",
    summary: "Payments and access belong in the first design.",
    content:
      "Payments, who can access what, and usage tracking are part of the core system from the start, not something squeezed in after launch. When money is planned for early, the product can grow and pay for itself.",
    emphasis: "Build the business side in. Do not add it later.",
  },
  {
    id: "scalable-foundations",
    eyebrow: "Longevity",
    title: "Build to last",
    summary: "Make growth easy, not painful.",
    content:
      "I choose approaches that are easy to change and tune the parts that matter. I would rather write code the next person can read than code that is clever. Good structure expects change and makes it cheap.",
    emphasis: "Software that lasts is software that is easy to change.",
  },
] as const;

export const operatingPrinciples = [
  {
    heading: "How I make decisions",
    items: [
      "Clear structure comes before extra features",
      "Make it easy to maintain first, then make it fast",
      "Draw the boundaries between parts before designing how they connect",
      "Let the data model decide how the system behaves",
    ],
  },
  {
    heading: "What I aim for",
    items: [
      "Being able to change things easily, even if it costs some speed at the start",
      "Fewer moving parts where systems connect",
      "Every change to data is recorded and can be traced",
      "Being able to see what the system is doing from day one",
    ],
  },
] as const;
