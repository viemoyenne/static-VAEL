// ============================================================
// Site Configuration — VAEL Brand Experience
// Content adapted from "VAEL — Brand Corporate Deck · 2026"
// ============================================================

// --- Site ---

export interface SiteConfig {
  language: string
  brandName: string
}

export const siteConfig: SiteConfig = {
  language: "en",
  brandName: "VAEL",
}

// --- Navigation ---

export interface NavigationConfig {
  menuLabel: string
  closeLabel: string
  fullscreenMenuLinks: { label: string; target: string }[]
  menuSideInfo: string[]
  menuLogo?: string
}

export const navigationConfig: NavigationConfig = {
  menuLabel: "MENU",
  closeLabel: "CLOSE",
  fullscreenMenuLinks: [
    { label: "The Rooms", target: "hero" },
    { label: "The Brand", target: "consciousness" },
    { label: "Live Entertainment", target: "lighthouse" },
    { label: "The Gallery", target: "waves-gallery" },
    { label: "Destinations", target: "waves-video" },
    { label: "Contact", target: "footer" },
  ],
  menuSideInfo: [
    "VAEL — BRAND CORPORATE DECK · 2026",
    "A BESPOKE GLOBAL ENTERTAINMENT & EXPERIENTIAL BRAND",
    "SINGAPORE — MALAYSIA — AUSTRALIA",
    "PURPOSE · ENERGY · LASTING VALUE",
  ],
  menuLogo: "images/vael-logo.png",
}

// --- Hero Room Gallery ---

export interface RoomConfig {
  name: string
  className: string
  theme: "light" | "dark"
  images: {
    back: string[]
    left: string[]
    right: string[]
  }
}

export interface HeroConfig {
  mainTitle: string
  rooms: RoomConfig[]
  metaLines: string[]
}

export const heroConfig: HeroConfig = {
  mainTitle: "Step Into the VAEL",
  rooms: [
    {
      name: "Live Entertainment",
      className: "room--waves",
      theme: "dark",
      images: {
        back: ["images/rooms/room1-back.jpg"],
        left: ["images/rooms/room1-left.jpg"],
        right: ["images/rooms/room1-right.jpg"],
      },
    },
    {
      name: "Creative Storytelling",
      className: "room--lighthouse",
      theme: "dark",
      images: {
        back: ["images/rooms/room2-back.jpg"],
        left: ["images/rooms/room2-left.jpg"],
        right: ["images/rooms/room2-right.jpg"],
      },
    },
    {
      name: "Cultural Programming",
      className: "room--monk",
      theme: "dark",
      images: {
        back: ["images/rooms/room3-back.jpg"],
        left: ["images/rooms/room3-left.jpg"],
        right: ["images/rooms/room3-right.jpg"],
      },
    },
    {
      name: "Hospitality Experiences",
      className: "room--orlando",
      theme: "dark",
      images: {
        back: ["images/rooms/room4-back.jpg"],
        left: ["images/rooms/room4-left.jpg"],
        right: ["images/rooms/room4-right.jpg"],
      },
    },
  ],
  metaLines: [
    "A Bespoke Global Entertainment & Experiential Brand",
    "Purposeful Entertainment · Lasting Experiences",
    "Singapore — Malaysia — Australia",
  ],
}

// --- Particle Sculpture ---

export interface ParticleConfig {
  sectionLabel: string
  title: string
  paragraphs: string[]
  quote: string
}

export const particleConfig: ParticleConfig = {
  sectionLabel: "02 / THE BRAND",
  title: "Every Destination Has a Story",
  paragraphs: [
    "VAEL is a bespoke global entertainment and experiential brand dedicated to creating experiences that transform destinations into vibrant places where people <em>gather, connect, and belong</em>.",
    "Within the Layker & Leesbourne ecosystem, VAEL works closely with KeyStone and partners across hospitality, tourism and lifestyle — independently positioned as a brand, backed by ecosystem strength.",
    "Through live entertainment, creative storytelling, digital media, cultural programming and hospitality-integrated experiences, VAEL enriches destinations with purpose, energy and lasting value.",
    "Entertainment made with intention — every show, story and program serving the destination it calls home, creating value long after the lights go down.",
  ],
  quote: "Destinations are not backdrops — they are co-authors of it.",
}

// --- Lighthouse Video ---

export interface LighthouseVideoConfig {
  sectionLabel: string
  dataPoints: string[]
  description: string
  videoPath: string
}

export const lighthouseVideoConfig: LighthouseVideoConfig = {
  sectionLabel: "LIVE ENTERTAINMENT",
  dataPoints: [
    "CONCERTS · FESTIVALS · STAGE PRODUCTIONS",
    "SINGAPORE — MALAYSIA — AUSTRALIA",
    "PURPOSE · ENERGY · LASTING VALUE",
  ],
  description: "Every show built around the story of its destination.",
  videoPath: "videos/stage.mp4",
}

// --- Waves Video ---

export interface WavesVideoConfig {
  sectionLabel: string
  title: string
  ctaText: string
  videoPath: string
}

export const wavesVideoConfig: WavesVideoConfig = {
  sectionLabel: "05 / WHERE WE OPERATE",
  title: "Three Markets. One Standard.",
  ctaText: "STEP INTO THE EXPERIENCE",
  videoPath: "videos/waves.mp4",
}

// --- Image Gallery ---

export interface GalleryItem {
  src: string
  caption: string
  description: string
}

export interface GalleryConfig {
  sectionLabel: string
  sectionTitle: string
  items: GalleryItem[]
  lightboxCloseHint: string
}

export const galleryConfig: GalleryConfig = {
  sectionLabel: "04 / THE VAEL WORLD",
  sectionTitle: "The Gallery",
  items: [
    {
      src: "images/gallery/item1.jpg",
      caption: "The Stage Is Only Where It Begins",
      description:
        "From intimate venue takeovers to destination-scale festivals, VAEL produces live entertainment that gives people a reason to gather — and a reason to return. Every production is built around the story of its destination: the place, the culture, the people.",
    },
    {
      src: "images/gallery/item2.jpg",
      caption: "A Reason to Gather",
      description:
        "Concerts, festivals and stage productions give destinations a heartbeat. VAEL measures success not only in audiences, but in what audiences become — communities that return, and destinations that stay alive after the show ends.",
    },
    {
      src: "images/gallery/item3.jpg",
      caption: "Before the Lights Go Up",
      description:
        "The quiet before a show is part of the experience too. VAEL designs every detail — from the first arrival to the final encore — so that the memory outlasts the moment.",
    },
    {
      src: "images/gallery/item4b.jpg",
      caption: "One Voice, One Destination",
      description:
        "Narratives drawn from each destination's culture, crafted to be remembered. Story, film and content carry the experience far beyond the venue and into the world.",
    },
    {
      src: "images/gallery/item5.jpg",
      caption: "Heritage in Motion",
      description:
        "Cultural programming that celebrates local heritage and invites communities to take part. VAEL works with the custodians of each destination's story — never around them.",
    },
    {
      src: "images/gallery/item6.jpg",
      caption: "Lanterns Over the Night Market",
      description:
        "Programs rooted in place turn evenings into rituals. Festivals, markets and gatherings become the moments travelers carry home — and the reasons they come back sooner.",
    },
    {
      src: "images/gallery/item7.jpg",
      caption: "Lobbies That Become Stages",
      description:
        "Working closely with KeyStone and partners across hospitality, VAEL weaves entertainment into the places guests already love. Stays become stories; destinations travel home with every guest.",
    },
    {
      src: "images/gallery/item8.jpg",
      caption: "The City as Canvas",
      description:
        "Digital media and projection carry a destination's story onto its streets and skyline. Content and channels extend the experience far beyond the venue's walls.",
    },
    {
      src: "images/gallery/item9.jpg",
      caption: "The Stay Becomes the Experience",
      description:
        "Experiences woven into hotels, resorts and lifestyle venues keep guests on-property — and give them reasons to return. One destination, elevated together.",
    },
  ],
  lightboxCloseHint: "Press Esc or click outside to close",
}

// --- Footer ---

export interface FooterLinkColumn {
  heading: string
  links: string[]
}

export interface FooterConfig {
  linkColumns: FooterLinkColumn[]
  tickerWords: string[]
  copyright: string
}

export const footerConfig: FooterConfig = {
  linkColumns: [
    {
      heading: "THE DISCIPLINES",
      links: [
        "Live Entertainment",
        "Creative Storytelling",
        "Digital Media",
        "Cultural Programming",
        "Hospitality Experiences",
      ],
    },
    {
      heading: "PARTNERSHIPS & ENQUIRIES",
      links: [
        "be@thevaelexperience.com",
        "Hospitality",
        "Tourism",
        "Lifestyle",
      ],
    },
  ],
  tickerWords: [
    "GATHER",
    "CONNECT",
    "BELONG",
    "PURPOSE",
    "ENERGY",
    "STORY",
    "STAGE",
    "CULTURE",
    "LEGACY",
    "DESTINY",
  ],
  copyright: "© 2026 VAEL — A Layker & Leesbourne Brand",
}
