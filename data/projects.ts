export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  date: string;
  role: string;
  description: string;
  context: string;
  problem: string;
  approach: string;
  outcome: string;
  palette: {
    wash: string;
    line: string;
    accent: string;
  };
  links: {
    label: string;
    href: string;
  }[];
};

export const projects: Project[] = [
  {
    slug: "floodchat",
    title: "FloodChat",
    category: "Civic Tech / Climate Resilience",
    year: "2026",
    date: "January 2026",
    role: "Product strategy, research, prototyping",
    description: "A conversational civic tool for navigating neighborhood-scale flood risk and preparedness.",
    context: "Cities are asking residents to interpret increasingly complex flood data, emergency guidance, and infrastructure plans.",
    problem: "Risk information is often fragmented across maps, agency pages, and technical documents that are difficult to use during stressful moments.",
    approach: "Frame the experience around plain-language questions, local context, preparedness steps, and trust-building source references.",
    outcome: "Placeholder outcome: a testable MVP concept for climate communication that can support neighborhood workshops and agency pilots.",
    palette: {
      wash: "#d9e5e2",
      line: "#789792",
      accent: "#486f6a"
    },
    links: [
      { label: "Case study placeholder", href: "#" },
      { label: "Prototype placeholder", href: "#" }
    ]
  },
  {
    slug: "oonee-marketplace-mvp",
    title: "Oonee Marketplace MVP",
    category: "Product Strategy / Micromobility",
    year: "2026",
    date: "February 2026",
    role: "Marketplace strategy, MVP definition",
    description: "A product concept for connecting secure bike parking, riders, partners, and neighborhood mobility services.",
    context: "Micromobility infrastructure often succeeds when physical access, digital onboarding, and local partnerships move together.",
    problem: "A marketplace model needs to feel simple to riders while coordinating supply, demand, operations, and partner value.",
    approach: "Define core marketplace actors, key flows, service tiers, pilot metrics, and a launchable MVP scope.",
    outcome: "Placeholder outcome: a focused product roadmap and pilot-ready service model for secure urban micromobility.",
    palette: {
      wash: "#e1ded7",
      line: "#998c78",
      accent: "#6d604e"
    },
    links: [
      { label: "Strategy notes placeholder", href: "#" },
      { label: "MVP flow placeholder", href: "#" }
    ]
  },
  {
    slug: "pops-explorer",
    title: "POPS Explorer",
    category: "Public Space / Urban Data",
    year: "2026",
    date: "March 2026",
    role: "Urban data, interface design",
    description: "A public-space discovery and accountability interface for privately owned public spaces.",
    context: "POPS are distributed across the city but can be hard to discover, evaluate, or understand as a public network.",
    problem: "Public access obligations, amenities, and lived experience are difficult to compare across sites.",
    approach: "Combine spatial browsing, amenity metadata, field notes, and simple public-space quality signals.",
    outcome: "Placeholder outcome: a civic data interface concept for residents, advocates, journalists, and planners.",
    palette: {
      wash: "#dfe5d3",
      line: "#8b9873",
      accent: "#67704d"
    },
    links: [
      { label: "Explorer placeholder", href: "#" },
      { label: "Dataset placeholder", href: "#" }
    ]
  },
  {
    slug: "choking-hazard-signs",
    title: "Choking Hazard Signs",
    category: "Cultural Criticism / NYC Visual Culture",
    year: "2026",
    date: "April 2026",
    role: "Visual research, writing",
    description: "A close reading of the signs, warnings, and visual systems that shape everyday attention in New York.",
    context: "The city communicates through informal signage as much as official policy, creating a dense language of caution and command.",
    problem: "These visual systems are easy to overlook even as they shape behavior, fear, humor, and neighborhood texture.",
    approach: "Collect, categorize, and interpret found signage as urban storytelling and public design.",
    outcome: "Placeholder outcome: an essay series and image archive about civic language hiding in plain sight.",
    palette: {
      wash: "#eadcda",
      line: "#ae7d7a",
      accent: "#8a5654"
    },
    links: [
      { label: "Essay placeholder", href: "#" },
      { label: "Image archive placeholder", href: "#" }
    ]
  },
  {
    slug: "neighborhood-value-capture",
    title: "Neighborhood Value Capture",
    category: "Housing / Urban Policy",
    year: "2026",
    date: "May 2026",
    role: "Policy research, analysis",
    description: "A policy framework for linking neighborhood growth, land value, and equitable housing investment.",
    context: "Public action can create private land value, but cities often struggle to return that value to public priorities.",
    problem: "Value capture tools can become abstract, politically brittle, or disconnected from neighborhood-level trust.",
    approach: "Map policy tools against development context, resident benefits, governance models, and implementation risks.",
    outcome: "Placeholder outcome: a practical policy brief structure for housing advocates and planning teams.",
    palette: {
      wash: "#e6e1cf",
      line: "#a69867",
      accent: "#756a3d"
    },
    links: [
      { label: "Policy brief placeholder", href: "#" },
      { label: "Model placeholder", href: "#" }
    ]
  },
  {
    slug: "cities-rewired",
    title: "Cities Rewired",
    category: "Podcast / Urban Technology",
    year: "2026",
    date: "June 2026",
    role: "Host, editor, narrative strategy",
    description: "A podcast about how technology changes the experience, governance, and imagination of cities.",
    context: "Urban technology is often discussed as procurement or infrastructure, but its human story is wider and stranger.",
    problem: "The best conversations about civic technology can get trapped between hype, bureaucracy, and jargon.",
    approach: "Use interviews and narrative framing to connect policy, design, public life, and the future of urban systems.",
    outcome: "Placeholder outcome: a flexible show format for conversations with planners, founders, researchers, and civic leaders.",
    palette: {
      wash: "#dfe1e8",
      line: "#7b8498",
      accent: "#586275"
    },
    links: [
      { label: "Episode placeholder", href: "#" },
      { label: "Show notes placeholder", href: "#" }
    ]
  },
  {
    slug: "ibx-transit-oriented-development",
    title: "IBX Transit-Oriented Development",
    category: "Research / Transportation",
    year: "2026",
    date: "July 2026",
    role: "Research, planning analysis",
    description: "A transit-oriented development research study around the Interborough Express corridor.",
    context: "The IBX could reshape mobility and land-use conversations across Brooklyn and Queens.",
    problem: "Corridor planning needs to connect station access, housing capacity, public realm, and anti-displacement strategy.",
    approach: "Assess station areas through mobility, zoning, housing, open space, and implementation lenses.",
    outcome: "Placeholder outcome: a corridor research framework for pairing transit investment with neighborhood benefits.",
    palette: {
      wash: "#d9e2e8",
      line: "#7490a4",
      accent: "#506f84"
    },
    links: [
      { label: "Research memo placeholder", href: "#" },
      { label: "Map set placeholder", href: "#" }
    ]
  },
  {
    slug: "in-spaces-writing",
    title: "In Spaces Writing",
    category: "Essays / Urban Storytelling",
    year: "2026",
    date: "August 2026",
    role: "Writer, editor",
    description: "Essays about cities, attention, public life, technology, housing, and the textures of urban change.",
    context: "Urban issues become more understandable when they are treated as lived stories, not only technical systems.",
    problem: "Policy and technology writing can flatten the emotional, cultural, and spatial experience of city life.",
    approach: "Write with a hybrid voice: analytical, observant, accessible, and grounded in everyday urban experience.",
    outcome: "Placeholder outcome: a growing body of essays designed to bridge civic analysis and narrative curiosity.",
    palette: {
      wash: "#e4ddd4",
      line: "#9b8673",
      accent: "#725e4e"
    },
    links: [
      { label: "Substack placeholder", href: "#" },
      { label: "Essay index placeholder", href: "#" }
    ]
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
