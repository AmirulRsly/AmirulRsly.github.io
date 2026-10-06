// All portfolio content lives here. Add a project by adding an object to this list;
// the grid, the timeline and the detail viewer are all built from it.
// media: "name.webp" for a still, { src: "name.webp", clip: true } for an animated clip.
window.PROJECTS = [
  {
    slug: "kanamoji",
    title: "Kanamoji: Final Year Project",
    short: "A turn-based battle game where you learn Japanese kana by racing an AI to answer quiz questions.",
    category: "games",
    kind: "Educational Game",
    engine: "Unity · C#",
    date: "2023-06",
    featured: true,
    cover: "cover-fyp.webp",
    coverLarge: "fyp3.webp",
    preview: "fypgif3.webp",
    tags: ["Unity", "C#", "Finite State Machine", "Fuzzy Logic", "2D Art"],
    links: [{ label: "Play the demo on itch.io", url: "https://amirulrsly.itch.io/amirulrsly-fyp-demo" }],
    body: [
      "My degree final year project, titled “Intelligent Enemy in Turn-Based Battle System to Learn Kanamoji”. It is an educational game about learning the Japanese alphabet, built around a mechanic I designed: a turn-based combat system fused with a quiz game, so every attack is a question.",
      "I built the enemy AI with a finite state machine and fuzzy logic. The AI learns Kanamoji alongside the player and competes with them on who can answer correctly and fastest.",
      "The project was still in development when I wrote this, but a playable demo is available on itch.io."
    ],
    media: ["fyp1.webp", "fyp2.webp", "fyp3.webp", "fyp4.webp", "fyp5.webp", "fyp6.webp", "fyp7.webp", "fyp8.webp",
      { src: "fypgif1.webp", clip: true }, { src: "fypgif2.webp", clip: true }, { src: "fypgif3.webp", clip: true },
      { src: "fypgif4.webp", clip: true }, { src: "fypgif5.webp", clip: true }]
  },
  {
    slug: "rhythm-hero",
    title: "Rhythm Hero",
    short: "A rhythm game: hit the right button as each monster arrives, in time with the music.",
    category: "games",
    kind: "Rhythm Game",
    engine: "Unity · C#",
    date: "2023-02",
    cover: "cover-rhythm.webp",
    preview: "rhygif2.webp",
    tags: ["Unity", "C#", "Spawner Systems", "2D Art", "Story Art"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/rhythm-hero" }],
    body: [
      "My second Unity project, a rhythm game set to music from Undertale. The player presses the button matching each approaching monster, on the beat.",
      "The hardest part was keeping the spawns in sync with the music. I solved it by splitting the song into waves of pre-arranged monster groups that follow its rhythm, then spawning each wave as the previous one finished, until the song ends.",
      "I designed and drew the player character, the monsters and the story art in Clip Studio Paint."
    ],
    media: ["rhythm1.webp", "rhythm2.webp", "rhythm3.webp", "rhythm4.webp", "rhythm5.webp", "rhythm6.webp",
      { src: "rhygif2.webp", clip: true }, { src: "rhygif3.webp", clip: true }, { src: "rhygif4.webp", clip: true }, { src: "rhygif1.webp", clip: true }]
  },
  {
    slug: "covid-busters",
    title: "Covid Busters",
    short: "My first Unity game: a turn-based battler with hand-drawn, frame-by-frame animated heroes.",
    category: "games",
    kind: "Turn-Based Combat Game",
    engine: "Unity · C#",
    date: "2022-06",
    cover: "cover-covid.webp",
    preview: "covgif2.webp",
    tags: ["Unity", "C#", "Coroutines", "Singletons", "Frame-by-frame Animation"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/covid-busters" }],
    body: [
      "My first Unity project, built with what I learned from a Udemy Unity programming course and YouTube tutorials. After a month of development, the turn-based combat system worked as intended.",
      "It taught me how useful the singleton pattern is, and how to use coroutines with IEnumerators to sequence turns and animations.",
      "I designed and drew the player characters and monsters in Clip Studio Paint, and animated both heroes' attacks frame by frame."
    ],
    media: ["covid1.webp", "covid2.webp", "covid3.webp", "covid4.webp", "covid5.webp", "covid6.webp",
      { src: "covgif2.webp", clip: true }, { src: "covgif3.webp", clip: true }, { src: "covgif4.webp", clip: true },
      { src: "covgif5.webp", clip: true }, { src: "covgif6.webp", clip: true }, { src: "covgif1.webp", clip: true }]
  },
  {
    slug: "dnd-seraphim",
    title: "Seraphim: DnD Character Commission",
    short: "My first Fiverr commission: a seraphim character for a Dungeons & Dragons campaign, from sketch to full render.",
    category: "art",
    kind: "Character Design Commission",
    engine: "Clip Studio Paint",
    date: "2024-09",
    cover: "cover-dnd.webp",
    tags: ["Character Design", "Illustration", "Commission", "Fiverr"],
    links: [],
    body: [
      "My first commission on Fiverr, for a client named Inari8: a character of the seraphim race from Dungeons & Dragons.",
      "Girls and wings were two things I struggled to draw, so this one stretched me, and I love how it turned out. The gallery walks through the whole process: sketch, line art, flat colour, half render, glow lines and the full render."
    ],
    media: ["dnd6.webp", "dnd1.webp", "dnd2.webp", "dnd3.webp", "dnd4.webp", "dnd5.webp"]
  },
  {
    slug: "fuji-dojo",
    title: "Fuji Dojo Cafe",
    short: "A menu ordering GUI for a cafe. I built the back end for our group.",
    category: "apps",
    kind: "Desktop GUI App",
    engine: "Java · NetBeans",
    date: "2022-02",
    cover: "cover-fuji.webp",
    tags: ["Java", "Apache NetBeans", "Back end", "Group Project"],
    links: [{ label: "Source on GitHub", url: "https://github.com/AmirulRsly/fujiDojoGUI/" }],
    body: [
      "A graphical menu ordering system my group developed for a mini project, built in Apache NetBeans. I was responsible for the back end.",
      "The finished app takes orders, edits them, keeps a running total and prints a receipt with the order list and total price."
    ],
    media: ["fujidojo01.webp", "fujidojo02.webp"]
  },
  {
    slug: "sit-and-stay",
    title: "Sit and Stay",
    short: "A portable massage chair designed to tight size, material and budget limits.",
    category: "art",
    kind: "Product Design",
    engine: "Clip Studio Paint",
    date: "2022-08",
    cover: "cover-sitstay.webp",
    tags: ["Product Design", "Technical Illustration"],
    links: [],
    body: [
      "A product design for the entrepreneurship course in my degree. The brief was a portable massage chair that stays marketable within strict limits on dimensions, materials and budget."
    ],
    media: ["sitstay1.webp", "sitstay2.webp", "sitstay3.webp", "sitstay4.webp", "sitstay5.webp", "sitstay6.webp", "sitstay7.webp"]
  },
  {
    slug: "jawi-nft",
    title: "Jawi NFT Intro Sequence",
    short: "A commissioned intro sequence for the first episode of an animation studio's series.",
    category: "art",
    kind: "Art Commission",
    engine: "Clip Studio Paint",
    date: "2021-11",
    cover: "cover-jawi.webp",
    tags: ["Illustration", "Backgrounds", "Commission"],
    links: [{ label: "Watch the episode on YouTube (00:37 to 02:02)", url: "https://www.youtube.com/watch?v=2gbniv4gCBc" }],
    body: [
      "My first art commission, for an NFT animation studio. The client asked me to draw the introduction sequence for the first episode of their animation.",
      "It pushed me, because the job was mostly backgrounds, which were not my strong suit. I finished the commission and the client was happy with it. My part of the video runs from 00:37 to 02:02."
    ],
    media: ["jawi1.webp", "jawi2.webp", "jawi3.webp", "jawi4.webp", "jawi5.webp"]
  },
  {
    slug: "astralis",
    title: "Astralis: Webtoon Series Test",
    short: "A medieval fantasy webtoon I wrote and drew, tested on desktop and phone. 2.5 chapters finished.",
    category: "art",
    kind: "Webtoon",
    engine: "Clip Studio Paint",
    date: "2020-10",
    cover: "cover-astralis.webp",
    preview: "astralisclip2.webp",
    tags: ["Comics", "Storytelling", "Character Design", "Paneling"],
    links: [],
    body: [
      "A test of how my art reads on a webtoon site, in a desktop browser and on a phone. It was a passion project: my own webtoon series in a medieval fantasy setting.",
      "Astralis is about humans who gain powers from the stars that could help them flourish, but human nature leads them to misuse those powers for personal gain and start a war against each other.",
      "I started it in 2020 while waiting for my UPU result to begin my degree. I finished 2.5 chapters before balancing it with my studies got too hard. It is unfinished, but I am happy with how it turned out.",
      "It also showed me I needed to improve my writing and my background art. That realisation is what got me reading novels and drawing more backgrounds."
    ],
    media: ["astralis1.webp", "astralis2.webp", "astralis3.webp",
      { src: "astralisclip1.webp", clip: true }, { src: "astralisclip2.webp", clip: true }, { src: "astralisclip3.webp", clip: true }]
  },
  {
    slug: "flat-tire",
    title: "Flat Tire",
    short: "A 2D short animation. I handled the animation, character design, backgrounds and storyboard.",
    category: "art",
    kind: "2D Animation",
    engine: "Adobe Animate",
    date: "2021-06",
    cover: "cover-flat.webp",
    tags: ["Adobe Animate", "Character Design", "Storyboarding", "Backgrounds"],
    links: [{ label: "Watch on YouTube", url: "https://youtu.be/7HZfgsFyH0E" }],
    body: [
      "A 2D short story animation made in Adobe Animate for a group project on multimedia elements.",
      "As the only digital artist in the group, I handled most of the art: the animation, character design, background art and storyboarding, while juggling other commissions and assignments."
    ],
    media: ["flat1.webp", "flat2.webp", "flat3.webp", "flat4.webp", "flat5.webp"]
  }
];
