// All portfolio content lives here. Add a project by adding an object to this list;
// the grid, the timeline and the detail viewer are all built from it.
// media: "name.webp" for a still, { src: "name.webp", clip: true } for an animated clip.
// Galleries always show clips before stills (site.js sorts them). client: true adds a "Freelance" label.
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
    slug: "keycombowombo",
    title: "KeyComboWombo",
    short: "A roguelike typing game inspired by Slay the Spire: every attack, parry and combo is a word you type.",
    category: "games",
    kind: "Roguelike Typing Game",
    engine: "Unity · C# · WebGL",
    date: "2026-09",
    cover: "cover-kcw.webp",
    preview: "kcwclip3.webp",
    tags: ["Unity", "C#", "Roguelike", "Typing", "Claude Code", "AI-assisted Art"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/keycombowombo" }],
    body: [
      "A roguelike typing game inspired by Slay the Spire. I couldn't find a game that had really tried this mix, and I thought typing and roguelike progression could make a great core mechanic together.",
      "I built the game mechanics with Claude Code and generated the art assets with ChatGPT. The sound effects and music are royalty-free tracks from Pixabay. It turned out to be a very enjoyable game, especially for people who love typing on a keyboard.",
      "The main feedback from players: they focus on the bottom half of the screen, where the words to type are, and miss the sprites, the effects and the HP bars. That is the next thing I want to solve."
    ],
    media: ["kcw1.webp", "kcw2.webp", "kcw3.webp", "kcw4.webp", "kcw5.webp",
      { src: "kcwclip3.webp", clip: true }, { src: "kcwclip4.webp", clip: true }, { src: "kcwclip5.webp", clip: true },
      { src: "kcwclip1.webp", clip: true }, { src: "kcwclip2.webp", clip: true }, { src: "kcwclip6.webp", clip: true }]
  },
  {
    slug: "jump-game",
    title: "Jump Game",
    short: "A Doodle Jump style climber for a client, steered by tilting your phone.",
    category: "games",
    kind: "Mobile Minigame",
    engine: "Unity · C# · WebGL",
    date: "2026-02",
    client: true,
    cover: "cover-jg.webp",
    preview: "jgclip1.webp",
    tags: ["Unity", "C#", "WebGL", "Gyroscope Controls", "Freelance"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/jump-game" }],
    body: [
      "A take on Doodle Jump without the shooting or the enemies, built for a client.",
      "The game itself was simple to make. The real challenge was tuning the gyroscope that steers the player left and right: finding the sweet spot took a lot of playtesting. It was my first project with gyro controls."
    ],
    media: ["jg1.webp", "jg2.webp", "jg3.webp",
      { src: "jgclip1.webp", clip: true }, { src: "jgclip2.webp", clip: true }]
  },
  {
    slug: "endless-runner",
    title: "Endless Runner",
    short: "A Subway Surfers style runner for a client, with the curved-world shader that makes the track bend.",
    category: "games",
    kind: "Mobile Runner",
    engine: "Unity · C# · WebGL",
    date: "2026-01",
    client: true,
    cover: "cover-er.webp",
    preview: "erclip1.webp",
    tags: ["Unity", "C#", "WebGL", "Shaders", "Procedural Generation", "Freelance"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/endlessrunner" }],
    body: [
      "My attempt at a Subway Surfers style runner, built for a client.",
      "I found out that the way Subway Surfers' world sways left, right, up and down doesn't come from where the objects are placed: it is a shader. Following a YouTube tutorial, I recreated that curved-world shader and built it into this game."
    ],
    media: ["er1.webp", "er2.webp", "er3.webp",
      { src: "erclip1.webp", clip: true }]
  },
  {
    slug: "battle-quiz",
    title: "Battle Quiz",
    short: "A quiz battler for a client: answer right to attack, answer wrong and spin the roulette.",
    category: "games",
    kind: "Gamified Quiz",
    engine: "Unity · C# · WebGL",
    date: "2025-07",
    client: true,
    cover: "cover-bq.webp",
    preview: "bqclip1.webp",
    tags: ["Unity", "C#", "WebGL", "Quiz", "Freelance"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/battlequiz" }],
    body: [
      "Another gamified quiz for a client, this time set in a battle.",
      "Answer correctly and you attack the enemy: the damage depends on how many times you tap the prompt button before time runs out. Answer wrong and a roulette spins, and whatever it lands on changes your HP."
    ],
    media: ["bq1.webp", "bq2.webp", "bq3.webp", "bq4.webp", "bq5.webp",
      { src: "bqclip1.webp", clip: true }, { src: "bqclip2.webp", clip: true }, { src: "bqclip3.webp", clip: true }]
  },
  {
    slug: "inflation-game",
    title: "Inflation Game",
    short: "An educational game about addition and inflation: tap jewels until they add up to the target.",
    category: "games",
    kind: "Educational Minigame",
    engine: "Unity · C# · WebGL",
    date: "2025-06",
    client: true,
    cover: "cover-inf.webp",
    preview: "infclip1.webp",
    tags: ["Unity", "C#", "WebGL", "Educational", "Freelance"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/inflationgame" }],
    body: [
      "An educational game about addition and how inflation works, built for a client.",
      "The player taps numbered jewels until their total matches the number in the box, before time runs out."
    ],
    media: ["inf1.webp", "inf2.webp", "inf3.webp",
      { src: "infclip1.webp", clip: true }]
  },
  {
    slug: "land-mine-panic",
    title: "Land Mine Panic",
    short: "A memory game for a client: remember where the keys are hidden, or get blown up.",
    category: "games",
    kind: "Memory Minigame",
    engine: "Unity · C# · WebGL",
    date: "2025-05",
    client: true,
    cover: "cover-lm.webp",
    preview: "lmclip1.webp",
    tags: ["Unity", "C#", "WebGL", "Memory Game", "UI Animation", "Freelance"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/landmine-panic" }],
    body: [
      "A memory minigame for a client. The player gets a few seconds to memorise where the keys are across the 2 × 2 hole segments, then the keys are buried under dirt.",
      "Pick the right hole to find a key; pick wrong and you get bombed and lose health. The part I'm proudest of is the intro animation, with the hole segments dropping in one by one."
    ],
    media: ["lm1.webp", "lm2.webp", "lm3.webp",
      { src: "lmclip1.webp", clip: true }, { src: "lmclip2.webp", clip: true }]
  },
  {
    slug: "speed-reading",
    title: "Speed Reading",
    short: "A reading game for kids that tests speed and comprehension, with three answers to choose from.",
    category: "games",
    kind: "Educational Minigame",
    engine: "Unity · C# · WebGL",
    date: "2025-05",
    client: true,
    cover: "cover-sr.webp",
    preview: "srclip1.webp",
    tags: ["Unity", "C#", "WebGL", "Educational", "Freelance"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/speed-reading-game" }],
    body: [
      "A minigame for kids that challenges their reading speed and comprehension, built for a client.",
      "Players read a short passage, then pick the right answer from three choices. At heart it is a simple quiz, with extra interactivity and animation to make it fun."
    ],
    media: ["sr1.webp", "sr2.webp", "sr3.webp", "sr4.webp",
      { src: "srclip1.webp", clip: true }, { src: "srclip2.webp", clip: true }]
  },
  {
    slug: "maze-quiz",
    title: "Maze Quiz",
    short: "My first freelance game job: memorise a maze from above, then guide a fox through it in the dark.",
    category: "games",
    kind: "Memory Minigame",
    engine: "Unity · C# · WebGL",
    date: "2025-04",
    client: true,
    cover: "cover-mq.webp",
    preview: "mqclip1.webp",
    tags: ["Unity", "C#", "WebGL", "NavMesh AI", "Freelance"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/mazequiz-prototype1" }],
    body: [
      "My first ever freelance game developer job: a maze minigame.",
      "The player first sees the whole maze from a bird's-eye view. Then the camera zooms in and their view shrinks to a small circle, so they have to rely on memory to pick the path to the exit. Wrong turns cost health.",
      "It was my first time using Unity's AI NavMesh, and it worked nicely: the fox finds its own way to wherever the player chooses to move."
    ],
    media: ["mq1.webp", "mq2.webp", "mq3.webp", "mq4.webp", "mq5.webp",
      { src: "mqclip1.webp", clip: true }]
  },
  {
    slug: "infinite-run",
    title: "Infinite Run",
    short: "A Temple Run style runner for a client, controlled by swiping.",
    category: "games",
    kind: "Mobile Runner",
    engine: "Unity · C# · WebGL",
    date: "2025-01",
    client: true,
    cover: "cover-ir.webp",
    preview: "irclip1.webp",
    tags: ["Unity", "C#", "WebGL", "Swipe Controls", "Procedural Generation", "Freelance"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/infiniterun" }],
    body: [
      "My attempt at a Temple Run style game, built for a client, and it turned out well.",
      "Players swipe up, left and right to jump and turn."
    ],
    media: ["ir1.webp", "ir2.webp",
      { src: "irclip1.webp", clip: true }]
  },
  {
    slug: "hotel-check-in",
    title: "Cozy Cottage: Hotel Check-In",
    short: "A Papers, Please style minigame prototype from my Novalearn internship: spot fake tickets and hand out the right keys.",
    category: "games",
    kind: "Minigame Prototype",
    engine: "Unity · C# · WebGL",
    date: "2023-11",
    cover: "cover-hotel.webp",
    preview: "hotelclip1.webp",
    tags: ["Unity", "C#", "WebGL", "Prototype", "Internship", "Novalearn"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/hotel-check-in-minigamefornovalearn" }],
    body: [
      "A small proof of concept for a minigame planned for Novalearn's gamified learning website, built during my internship there as a junior developer.",
      "It is a hotel check-in game inspired by Papers, Please. The player checks each guest's ticket against the booking book, makes sure their appearance matches, and hands over the right room key."
    ],
    media: ["hotel1.webp", "hotel2.webp", "hotel3.webp", "hotel4.webp", "hotel5.webp", "hotel6.webp",
      { src: "hotelclip1.webp", clip: true }]
  },
  {
    slug: "grade-4-math",
    title: "Grade 4 Math Activities",
    short: "The gamified math quiz I built as Novalearn's hiring test. It got me the internship.",
    category: "games",
    kind: "Gamified Quiz",
    engine: "Unity · C# · WebGL",
    date: "2023-08",
    cover: "cover-math.webp",
    preview: "mathclip1.webp",
    tags: ["Unity", "C#", "WebGL", "Drag and Drop", "Educational"],
    links: [{ label: "Play on itch.io", url: "https://amirulrsly.itch.io/grade-4-math" }],
    body: [
      "The test Novalearn gave me before hiring me as a junior developer intern: take five grade 4 math questions and gamify them.",
      "I kept the game layer light on purpose. Players answer with buttons that raise and lower values, and by dragging objects into the right place. I passed, and got the internship."
    ],
    media: ["math1.webp", "math2.webp", "math3.webp",
      { src: "mathclip1.webp", clip: true }, { src: "mathclip2.webp", clip: true }]
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
    client: true,
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
    client: true,
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
