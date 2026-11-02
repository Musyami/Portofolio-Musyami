/**
 * Data cadangan (fallback-data) untuk Musyami Portfolio.
 * Bersumber langsung dari file-file seeds API.
 * Digunakan saat REST API Fastify belum aktif atau gagal dihubungi.
 */

import {
  Education,
  Experience,
  Skill,
  SkillCategoryGroup,
  Project,
  Achievement,
  BlogPost,
  Social,
  Profile,
  PortfolioData,
} from './types';

// Data Profil (diselaraskan dengan profile.json)
export const PROFILE_DATA: Profile = {
  name: 'Muhammad Rasya Islami',
  nickname: 'Musyami',
  title: 'Web Developer & Robotics Enthusiast',
  tagline: 'The Developer’s Deck | Musyami',
  about:
    'I am an Information Systems undergraduate student at Institut Teknologi Sepuluh Nopember (ITS) who bridges technical adaptability with organizational leadership. I specialize in AI-assisted Vibe Coding and modern web platforms, alongside a strong passion for robotics, microcontrollers, and hardware integration. Beyond technical execution, my background leading student organizations drives my ability to coordinate cross-functional teams and manage complex projects. I am always open to exciting collaborations and internships where I can build impactful digital realities.',
};

// Data Pendidikan (diselaraskan dengan education.json)
export const EDU: Education[] = [
   {
    "id": "edu-1",
    "order": 1,
    "title": "Institut Teknologi Sepuluh Nopember",
    "major": "Information Systems",
    "period": "JUl 2026 – sekarang",
    "description": "As a first-year undergraduate student focusing on the intersection of technology, data, and business management, I have a strong interest in developing skills in Information Systems Architecture, Business Intelligence, Data Analytics, and Software Development. I am also actively exploring 'vibe coding' paradigms by leveraging AI-driven development tools to rapidly prototype and build software solutions for real-world problems. Building upon a solid foundation in robotics, microcontrollers, and scientific research gained in high school, I aim to drive innovative, tech-driven solutions throughout my academic journey at ITS."
  },
  {
    "id": "edu-2",
    "order": 2,
    "title": "MAN 9 Jakarta Timur",
    "major": "",
    "period": "Jul 2023 – Mei 2026",
    "description": "As the Head of the Student Representative Council (MPK) for the 2024/2025 term, I led student legislative functions, monitored OSIS performance, and effectively managed student aspirations, while also extending my leadership impact regionally through active contribution and engagement in the Forum MPK Daerah Khusus Jakarta by collaborating with student leaders across the province. Beyond student governance, I conducted innovative scientific research in the Scientific Research Club (KIR), which included implementing molecular gastronomy via spherification to transform traditional jamu herbal drinks into edible spheres and performing comparative studies between manual and tech-based hydroponic systems on kangkung plant growth metrics. Furthermore, I leveraged my technical skills in the Robotics Club to achieve prestigious accolades, including a National Bronze Medal (Ranked 7th) at KoSSMI 2025 at IPB University, 3rd Place internationally at Kerian EduTech '25 Malaysia, and a Silver Medal at the Jakarta Madrasah Competition 2024."
  },
  {
    "id": "edu-3",
    "order": 3,
    "title": "SMPIT Thariq Bin Ziyad Boarding School",
    "major": "",
    "period": "Jul 2020– Mei 2023",
    "description": "Maintained high academic excellence by consistently ranking in the Top 3 of the class while balancing a demanding boarding school environment, and served as the OSIS Coordinator for the Arabic Language Department by leading language-enrichment programs, managing student activities, and fostering a multilingual environment within the school community. Alongside accomplishing a significant spiritual milestone by memorizing 6 Juz of the Al-Qur'an (Juz 30, 29, 28, 27, 26, and 1) that demonstrated high discipline, focus, and exceptional memory retention, I also actively participated in the Social Sciences Extracurricular Club (Ekskul IPS) and represented the school in prestigious national competitions, successfully winning the Bronze Medal at the 9th National Geography Olympiad (OLGENAS 2023) at Universitas Gadjah Mada and securing 2nd Honorable Mention out of 1,210 participants at the National Social Science Olympiad XXIII (SMA Darul Ulum 2 Jombang CIS)."
  }
];

// Data Pengalaman (diselaraskan dengan experience.json)
export const EXP: Experience[] = [
  {
    "id": "exp-1",
    "order": 1,
    "title": "Coordinator of Social Media Commission",
    "organization": "Forum MPK DKI Jakarta",
    "startDate": "Feb 2025",
    "endDate": "Mei 2026",
    "period": "Feb 2025 – Mei 2026",
    "description": "",
    "bullets": [
      "• Managed and developed digital communication strategies for Forum MPK DKI, maintaining full oversight of the official Instagram account and professional email correspondence.",
      "• Designed and published creative content and visual assets for national holidays, successfully boosting the forum's digital visibility and driving active engagement from school MPK representatives."
      "• Designed and built the forum's official website from scratch to centralize information, expand digital accessibility, and modernize the organization's online image."
      "• Organized and restructured the institutional Google Drive storage system, successfully streamlining internal file management while ensuring secure and well-coordinated data access."
    ],
    "emoji": "",
    "rank": "A",
    "suit": "♠",
    "isCurrent": false
  },
  {
    "id": "exp-2",
    "order": 2,
    "title": "Public Relations, Publication & Design Coordinator for MPK DKI Open Recruitment",
    "organization": "Forum MPK DKI Jakarta",
    "startDate": "Agt 2025",
    "endDate": "Mei 2026",
    "period": "Agt 2025 – Mei 2026",
    "description": "",
    "bullets": [
      "• Mapped 1,190 high and vocational schools (SMA/SMK/MA) in DKI Jakarta into a comprehensive spreadsheet to identify the presence of the MPK (Student Representative Council) and collect active contact details, including conducting alternative outreach via Instagram for schools without direct phone numbers.",
      "• Led a 3-member team in designing, scheduling, and executing end-to-end digital publication and visual branding strategies for a recruitment campaign."
      "• Handled the independent production of creative content using Canva (posters, feeds, stories) and InShot (videos), while directly managing live event photography and videography documentation."
      "• Coordinated with the core committee to streamline operational workflows, successfully attracting and confirming 27 high-quality final applicants from various schools across the DKI Jakarta region."
    ],
    "emoji": "",
    "rank": "K",
    "suit": "♥",
    "isCurrent": true
  },
  {
    "id": "exp-3",
    "order": 3,
    "title": "Public Relations, Publication & Design Coordinator for MPK DKI Goes To School",
    "organization": "Forum MPK DKI Jakarta",
    "startDate": "Mar 2025",
    "endDate": "Mei 2026",
    "period": "Mar2025 – Mei 2026",
    "description": "",
    "bullets": [
      "• Led a 3-member team in designing, scheduling, and executing end-to-end digital publication and visual branding strategies for a school visit campaign.",
      "• Handled end-to-end content production, utilizing Canva for promotional assets (feeds, stories, posters) and InShot for video editing, while overseeing live event documentation."
      "• Acted as the primary external liaison, responsible for contacting MPK (Student Representative Council) representatives at target schools, coordinating visit readiness, and distributing informational broadcasts."
      "• Facilitated benchmarking visits and Focus Group Discussions (FGD) at SMA Wijaya Kusuma and SMAN 74 Jakarta to introduce the MPK DKI program while providing strategic insights to address their organizational challenges."
    ],
    "emoji": "",
    "rank": "Q",
    "suit": "♣",
    "isCurrent": false
  },
];

// Data Prestasi (diselaraskan dengan achievements.json)
export const ACHV: Achievement[] = [
  {
    id: 'achv-1',
    order: 1,
    title: '4th Bronze Medalist (Ranked 7th Nationally) - Robotics Level 4 Kompetisi Sains Siswa Muslim Indonesia 2025',
    organizer: 'Abak Academy',
    date: 'Mei 2025',
    description: '',
    bullets: [
      '• Awarded the 4th Bronze Medal (Ranked 7th overall) in the Robotics Level 4 (High School division) at the Kompetisi Sains Siswa Muslim Indonesia (KoSSMI 2025), with the Grand Final hosted at Sekolah Vokasi IPB University, Bogor.',
      '• Designed and engineered an innovative "Smart Streetlight" project during the preliminary round, utilizing an Arduino Uno (programmed via Arduino IDE) to integrate a vehicle air pollution filtration system powered by renewable energy from pedestrian footsteps via piezoelectric sensors.',
      '• Successfully advanced through rigorous national eliminations, outperforming 49 competing teams in the preliminary video and source-code selection to reach the top 25 semifinalists.',
      '• Secured a spot as one of the top 10 grand finalists to compete offline at IPB after delivering a comprehensive 15-minute live project presentation and defending the design during the jury Q&A session.',
      '• Demonstrated advanced robotics programming and autonomous navigation during the Grand Final by coding a "Leanbot" robot from scratch to execute a precise mission: retrieving 3 miniature pipes, depositing them into a designated container, and executing an automated parking sequence.',
    ],
    emoji: '',
    rank: 'A',
    suit: '♠',
  },
  {
    id: 'achv-2',
    order: 2,
    title: '3rd Place - Minecraft Education Competition (Kerian EduTech \'25)',
    organizer: 'Sekolah Menengah Kebangsaan Kubang Kerian',
    date: 'Apr 2025',
    description: '',
    bullets: [
      '• Secured 3rd Place internationally in the Minecraft Education Competition at the Karnival Digital Teknologi Pendidikan 2025 (Kerian EduTech\'25), organized by SMK Kubang Kerian and officially supported by the Ministry of Education Malaysia (Kementerian Pendidikan Malaysia).',
      '• Designed and simulated an advanced sustainable Cyberpunk smart city aimed at solving critical global challenges across three UN Sustainable Development Goals: SDG 2 (Zero Hunger), SDG 11 (Sustainable Cities), and SDG 13 (Climate Action).',
      '• Engineered complex automated systems within the digital environment, including an autonomous farming system for free food distribution, a microgrid powered by integrated wind turbines and solar panels, and a zero-emission waste-to-energy plant featuring a smoke filtration mechanism and organic composting system.',
    ],
    emoji: '',
    rank: 'K',
    suit: '♥',
  },
  {
    id: 'achv-3',
    order: 3,
    title: 'Silver Medalist (2nd Place Best Point) Robot Challenge - Jakarta Madrasah Competition 2024',
    organizer: 'Kementrian Agama DKI Jakarta',
    date: 'Nov 2024',
    description: '',
    bullets: [
      '• Awarded the Silver Medal for 2nd Place Best Point in the Robot Challenge category out of 96 competing Madrasah Aliyah teams across DKI Jakarta, organized by the Ministry of Religious Affairs (Kementerian Agama) DKI Jakarta.',
      '• Executed a high-pressure, 30-minute live virtual engineering challenge, successfully designing circuits, organizing components, and writing Arduino code from scratch on-site using the Tinkercad simulation platform.',
      '• Secured maximum points in program functionality and simulation accuracy during the 5-minute project demonstration and rigorous jury Q&A, showcasing robust logic design, precise sensor integration, and efficient code execution.',
    ],
    emoji: '',
    rank: 'Q',
    suit: '♣',
  },
  {
    id: 'achv-4',
    order: 4,
    title: '9th Bronze Medalist - National Geography Olympiad (OLGENAS 2023)',
    organizer: 'Fakultas Geografi Universitas Gadjah Mada',
    date: 'Jan 2023',
    description: '',
    bullets: [
      '• Awarded the 9th Bronze Medal (Ranked 19th overall) out of 116 competing teams nationwide in the National Geography Olympiad (OLGENAS International Geolympiad 2023), hosted by the Faculty of Geography, Universitas Gadjah Mada (UGM).',
      '• Successfully secured a national medal position through high-level performance across rigorous cumulative evaluations, including a Written Examination, Multimedia Test, and an Outdoor Learning session.',
      '• Demonstrated strong spatial analysis, environmental comprehension, and practical field-testing skills under strict national competitive standards.',
    ],
    emoji: '',
    rank: 'J',
    suit: '♦',
  },
  {
    id: 'achv-5',
    order: 5,
    title: 'Honorable Mention 2nd - National Social Science Olympiad XXIII',
    organizer: 'SMA Darul Ulum 2 Unggulan BPPT Cambridge International School (CIS) ID 113',
    date: 'Okt 2022',
    description: '',
    bullets: [
      '• Awarded Honorable Mention 2nd in the National Science and Social Olympiad XXIII, organized by SMA Darul Ulum 2 Unggulan BPPT Jombang (Cambridge International School ID 113).',
      '• Successfully advanced to the Grand Final as one of the top 20 finalists, outperforming 1,210 participants nationwide through consecutive, rigorous Olympiad examinations across the Preliminary, Semifinal, and Final rounds, testing comprehensive Social Sciences (Ilmu Pengetahuan Sosial) topics including Economics, Sociology, Geography, and History.',
      '• Demonstrated strategic critical thinking during the final stage by simultaneously solving complex social case studies and delivering a live presentation using provided materials to the board of judges.',
    ],
    emoji: '',
    rank: '10',
    suit: '♠',
  },
];

// Data Keterampilan (diselaraskan dengan skills.json)
export const SKL: Skill[] = [
  {
    id: 'skl-1',
    order: 1,
    name: 'HTML',
    description: 'Struktur web',
    level: 80,
    iconKey: 'd:html5',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    category: 'Bahasa Pemrograman',
    suit: '♠',
  },
  {
    id: 'skl-2',
    order: 2,
    name: 'CSS',
    description: 'Gaya & layout',
    level: 80,
    iconKey: 'd:css3',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    category: 'Bahasa Pemrograman',
    suit: '♠',
  },
  {
    id: 'skl-3',
    order: 3,
    name: 'JavaScript',
    description: 'Web interaktif',
    level: 40,
    iconKey: 'd:javascript',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    category: 'Bahasa Pemrograman',
    suit: '♠',
  },
  {
    id: 'skl-4',
    order: 4,
    name: 'TypeScript',
    description: 'JS bertipe',
    level: 40,
    iconKey: 'd:typescript',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    category: 'Bahasa Pemrograman',
    suit: '♠',
  },
  {
    id: 'skl-5',
    order: 5,
    name: 'Python',
    description: 'Scripting & ROS',
    level: 40,
    iconKey: 'd:python',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    category: 'Bahasa Pemrograman',
    suit: '♠',
  },
  {
    id: 'skl-6',
    order: 6,
    name: 'C++',
    description: 'Robotika',
    level: 40,
    iconKey: 'd:cplusplus',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    category: 'Bahasa Pemrograman',
    suit: '♠',
  },
  {
    id: 'skl-7',
    order: 7,
    name: 'React 18',
    description: 'UI interaktif',
    level: 40,
    iconKey: 'd:react',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    category: 'Framework & Tools',
    suit: '♥',
  },
  {
    id: 'skl-8',
    order: 8,
    name: 'Tailwind CSS',
    description: 'Styling cepat',
    level: 40,
    iconKey: 'd:tailwindcss',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    category: 'Framework & Tools',
    suit: '♥',
  },
  {
    id: 'skl-9',
    order: 9,
    name: 'Git',
    description: 'Kontrol versi',
    level: 40,
    iconKey: 'd:git',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    category: 'Framework & Tools',
    suit: '♥',
  },
  {
    id: 'skl-10',
    order: 10,
    name: 'GitHub',
    description: 'Kolaborasi kode',
    level: 30,
    iconKey: 'd:github',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    category: 'Framework & Tools',
    suit: '♥',
  },
  {
    id: 'skl-11',
    order: 11,
    name: 'VS Code',
    description: 'Editor utama',
    level: 30,
    iconKey: 'd:vscode',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    category: 'Framework & Tools',
    suit: '♥',
  },
  {
    id: 'skl-12',
    order: 12,
    name: 'Vercel',
    description: 'Deploy web',
    level: 50,
    iconKey: 'd:vercel',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',
    category: 'Framework & Tools',
    suit: '♥',
  },
  {
    id: 'skl-13',
    order: 13,
    name: 'Supabase',
    description: 'Backend & DB',
    level: 50,
    iconKey: 'd:supabase',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',
    category: 'Framework & Tools',
    suit: '♥',
  },
  {
    id: 'skl-14',
    order: 14,
    name: 'Firebase',
    description: 'Backend cloud',
    level: 60,
    iconKey: 'd:firebase',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
    category: 'Framework & Tools',
    suit: '♥',
  },
  {
    id: 'skl-15',
    order: 15,
    name: 'Google AI Studio',
    description: 'Prototipe AI',
    level: 50,
    iconKey: 's:googlegemini',
    iconUrl: 'https://cdn.simpleicons.org/googlegemini',
    category: 'Framework & Tools',
    suit: '♥',
  },
  {
    id: 'skl-16',
    order: 16,
    name: 'ROS 2',
    description: 'Middleware robot',
    level: 40,
    iconKey: 's:ros',
    iconUrl: 'https://cdn.simpleicons.org/ros',
    category: 'Framework & Tools',
    suit: '♥',
  },
  {
    id: 'skl-17',
    order: 17,
    name: 'Arduino Uno',
    description: 'Mikrokontroler',
    level: 80,
    iconKey: 'd:arduino',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg',
    category: 'Software & Hardware',
    suit: '♦',
  },
  {
    id: 'skl-18',
    order: 18,
    name: 'Arduino IDE',
    description: 'Pemrograman board',
    level: 80,
    iconKey: 'd:arduino',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg',
    category: 'Software & Hardware',
    suit: '♦',
  },
  {
    id: 'skl-19',
    order: 19,
    name: 'Tinkercad',
    description: 'Simulasi sirkuit',
    level: 80,
    iconKey: 's:tinkercad',
    iconUrl: 'https://cdn.simpleicons.org/tinkercad',
    category: 'Software & Hardware',
    suit: '♦',
  },
  {
    id: 'skl-20',
    order: 20,
    name: 'Leanbot',
    description: 'Robot edukasi',
    level: 60,
    iconKey: '',
    iconUrl: '',
    category: 'Software & Hardware',
    suit: '♦',
  },
  {
    id: 'skl-21',
    order: 21,
    name: 'Google Workspace',
    description: 'Kolaborasi kerja',
    level: 90,
    iconKey: 's:google',
    iconUrl: 'https://cdn.simpleicons.org/google',
    category: 'Software & Hardware',
    suit: '♦',
  },
  {
    id: 'skl-22',
    order: 22,
    name: 'Figma',
    description: 'Desain UI',
    level: 70,
    iconKey: 'd:figma',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    category: 'Software & Hardware',
    suit: '♦',
  },
  {
    id: 'skl-23',
    order: 23,
    name: 'Canva',
    description: 'Desain grafis',
    level: 80,
    iconKey: 'd:canva',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg',
    category: 'Software & Hardware',
    suit: '♦',
  },
];

export const SKILL_GROUPS: SkillCategoryGroup[] = [
  {
    category: 'Bahasa Pemrograman',
    suit: '♠',
    skills: SKL.filter((s) => s.category === 'Bahasa Pemrograman'),
  },
  {
    category: 'Framework & Tools',
    suit: '♥',
    skills: SKL.filter((s) => s.category === 'Framework & Tools'),
  },
  {
    category: 'Software & Hardware',
    suit: '♦',
    skills: SKL.filter((s) => s.category === 'Software & Hardware'),
  },
];

// Data Proyek (diselaraskan dengan projects.json)
export const PRJ: Project[] = [
   {
    "id": "prj-1",
    "order": 1,
    "title": "AEROVOLT (Air and Energy Regenerator Via Oscillating Piezoelectric Tech)",
    "description": "Sistem inovatif pengurang polusi udara perkotaan dengan sensor gas MQ-135 dan pemanen energi langkah kaki piezoelektrik.",
    "tags": ["Arduino", "C++", "IoT", "Sensor MQ-135", "Piezoelectric"],
    "category": "Robotics",
    "date": "2025",
    "caseStudy": "AEROVOLT dikembangkan oleh Tim Rogyfution (MAN 9 Jakarta Timur) untuk ajang KOSSMI Robotik 2025. Proyek ini menggabungkan sistem penyaringan udara bertahap (karbon aktif dan kapur aktif) dengan teknologi piezoelektrik untuk mengubah tekanan langkah kaki pejalan kaki menjadi energi listrik ramah lingkungan.",
    "buttons": [{ "label": "Lihat di GitHub", "url": "https://github.com/Musyami" }],
    "rank": "A",
    "suit": "♥"
  },
];

// Data Blog (diselaraskan dengan blog.json)
export const BLG: BlogPost[] = [
 {
    id: 'blg-1',
    order: 1,
    slug: 'aerovolt-kossami-2025',
    date: '15 Jan 2025',
    title: 'AEROVOLT: Air Purification & Piezoelectric Energy System Innovation',
    excerpt: 'The journey of designing AEROVOLT for the KOSSMI Robotics 2025 competition with Team Rogyfution.',
    emoji: '',
    content: [
      'AEROVOLT (Air and Energy Regenerator Via Oscillating Piezoelectric Tech) was developed to tackle rising urban air pollution alongside the energy crisis.',
      'This system combines an MQ-135 gas sensor to detect pollution and activate layered air-filtering fans (activated carbon and active lime), while also utilizing piezoelectric technology to convert pedestrians footstep pressure into electrical energy.',
      'Through the KOSSMI Robotics 2025 competition with Alifah Hasna, this project taught me how to integrate Arduino microcontrollers with environmental sensors to create sustainable urban solutions.',
    ],
  },
];

// Data Media Sosial (diselaraskan dengan socials.json)
export const SOC: Social[] = [
  {
    id: 'soc-1',
    order: 1,
    name: 'Email',
    handle: 'musyami.20@gmail.com',
    url: 'mailto:musyami.20@gmail.com',
    color: '#B8483E',
    iconSvg:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 7l9 6.5L21 7"/></svg>',
  },
  {
    id: 'soc-2',
    order: 2,
    name: 'Instagram',
    handle: '@musyami._',
    url: 'https://www.instagram.com/musyami._/',
    color: '#C13584',
    iconSvg:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></svg>',
  },
  {
    id: 'soc-3',
    order: 3,
    name: 'LinkedIn',
    handle: 'Muhammad Rasya Islami',
    url: 'https://www.linkedin.com/in/muhammad-rasya-islami-122744347',
    color: '#0A66C2',
    iconSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="9" width="4" height="12"/><circle cx="5" cy="5" r="2.2"/><path d="M10 9h3.8v1.7c.6-1.1 2-2 3.9-2 3.6 0 4.3 2.3 4.3 5.4V21h-4v-5.8c0-1.4 0-3.1-1.9-3.1s-2.1 1.5-2.1 3V21h-4z"/></svg>',
  },
  {
    id: 'soc-4',
    order: 4,
    name: 'GitHub',
    handle: 'Musyami',
    url: 'https://github.com/Musyami',
    color: '#1A1816',
    iconSvg:
      '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
  },
];

// Seluruh data cadangan tergabung
export const FALLBACK_DATA: PortfolioData = {
  profile: PROFILE_DATA,
  education: EDU,
  experience: EXP,
  skills: SKL,
  projects: PRJ,
  achievements: ACHV,
  blogPosts: BLG,
  socials: SOC,
};
