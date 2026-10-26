export interface OpenSourceTool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  liveUrl: string;
  repoUrl: string;
  repoPath: string;
  domain: string;
  tags: string[];
}
export interface ProductionSite {
  id: string;
  name: string;
  domain: string;
  url: string;
  description: string;
  role: string;
  monogram: string;
}
export const openSourceTools: OpenSourceTool[] = [
  {
    id: "qr",
    name: "QR",
    tagline: "Make QR codes in seconds.",
    description:
      "A fast QR code maker. Choose what it holds, adjust the look and download it.",
    liveUrl: "https://qr.brandonkimathi.top",
    repoUrl: "https://github.com/berry-ramon/qr",
    repoPath: "berry-ramon/qr",
    domain: "qr.brandonkimathi.top",
    tags: ["Free tool", "QR codes", "Open source"],
  },
  {
    id: "cutout",
    name: "Cutout",
    tagline: "Remove the background from a picture.",
    description:
      "Upload an image and get a clean cut-out without leaving the page.",
    liveUrl: "https://cutout.brandonkimathi.top",
    repoUrl: "https://github.com/berry-ramon/cutout",
    repoPath: "berry-ramon/cutout",
    domain: "cutout.brandonkimathi.top",
    tags: ["Free tool", "Images", "Open source"],
  },
  {
    id: "favicons",
    name: "Favicons",
    tagline: "Make a full set of site icons.",
    description:
      "Turn one image into every small icon a website and phone home screen needs.",
    liveUrl: "https://favicon.brandonkimathi.top",
    repoUrl: "https://github.com/berry-ramon/favicons",
    repoPath: "berry-ramon/favicons",
    domain: "favicon.brandonkimathi.top",
    tags: ["Free tool", "Icons", "Open source"],
  },
  {
    id: "nubby",
    name: "Nubby",
    tagline: "Simple notes, kept tidy.",
    description:
      "A simple note-taking app for writing things down and finding them again.",
    liveUrl: "https://note.brandonkimathi.top",
    repoUrl: "https://github.com/berry-ramon/Note",
    repoPath: "berry-ramon/Note",
    domain: "note.brandonkimathi.top",
    tags: ["Free tool", "Notes", "Open source"],
  },
  {
    id: "pocket-plan",
    name: "Pocket Plan",
    tagline: "Plan and track your spending.",
    description:
      "A simple budgeting app to set a budget, record spending and see where the money goes.",
    liveUrl: "https://budget.brandonkimathi.top",
    repoUrl: "https://github.com/berry-ramon/budget",
    repoPath: "berry-ramon/budget",
    domain: "budget.brandonkimathi.top",
    tags: ["Free tool", "Budgeting", "Open source"],
  },
];
export const productionSites: ProductionSite[] = [
  {
    id: "cartzuri",
    name: "Cartzuri",
    domain: "cartzuri.com",
    url: "https://www.cartzuri.com",
    description: "An online shopping website.",
    role: "Software design and build",
    monogram: "C",
  },
  {
    id: "veldris",
    name: "Veldris",
    domain: "veldris.kodees.co.ke",
    url: "https://veldris.kodees.co.ke",
    description: "A product built within the KODÈS family.",
    role: "Software design and build",
    monogram: "V",
  },
  {
    id: "kodes-site",
    name: "KODÈS",
    domain: "kodees.co.ke",
    url: "https://kodees.co.ke",
    description: "Digital tools and learning for communities across Africa.",
    role: "Software Architect",
    monogram: "K",
  },
  {
    id: "bookmine",
    name: "BookMine",
    domain: "bookmine.vercel.app",
    url: "https://bookmine.vercel.app",
    description: "A book-focused web app.",
    role: "Design and build",
    monogram: "B",
  },
  {
    id: "shakshi-grill",
    name: "Shakshi Grill",
    domain: "shakshigrill.com",
    url: "https://shakshigrill.com",
    description: "A restaurant website.",
    role: "Design and build",
    monogram: "S",
  },
  {
    id: "viable-surveyors",
    name: "Viable Surveyors",
    domain: "viablesurveyors.com",
    url: "https://viablesurveyors.com",
    description: "A website for a surveying business.",
    role: "Design and build",
    monogram: "V",
  },
];
