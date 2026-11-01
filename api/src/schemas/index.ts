/**
 * Definisi skema JSON Schema untuk validasi Fastify dan dokumentasi Swagger / OpenAPI.
 */

export const errorResponseSchema = (statusCode: number, exampleMsg: string) => ({
  type: 'object',
  properties: {
    statusCode: { type: 'number', example: statusCode },
    error: { type: 'string', example: statusCode === 404 ? 'Not Found' : statusCode === 401 ? 'Unauthorized' : 'Bad Request' },
    message: { type: 'string', example: exampleMsg },
  },
});

export const idParamSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', description: 'ID entitas', example: 'prj-1' },
  },
};

// --- Schema Proyek (Project) ---
export const projectSchema = {
  type: 'object',
  required: ['id', 'order', 'title', 'description', 'tags', 'category', 'date', 'caseStudy', 'buttons'],
  properties: {
    id: { type: 'string', example: 'prj-1' },
    order: { type: 'number', example: 1 },
    title: { type: 'string', example: 'MyActivity' },
    description: { type: 'string', example: 'Aplikasi pencatat aktivitas harian dengan tampilan bersih.' },
    tags: { type: 'array', items: { type: 'string' }, example: ['Next.js', 'TypeScript'] },
    category: { type: 'string', example: 'Web' },
    date: { type: 'string', example: '2025 – 2026' },
    imageUrl: { type: 'string', nullable: true, example: '/uploads/myactivity.png' },
    caseStudy: { type: 'string', example: 'Case study MyActivity: latar belakang, proses, dan hasil akhirnya.' },
    buttons: {
      type: 'array',
      items: {
        type: 'object',
        required: ['label', 'url'],
        properties: {
          label: { type: 'string', example: 'Lihat di GitHub' },
          url: { type: 'string', example: 'https://github.com/Musyami' },
        },
      },
      example: [{ label: 'Lihat di GitHub', url: 'https://github.com/Musyami' }],
    },
    rank: { type: 'string', example: 'A' },
    suit: { type: 'string', example: '♠' },
  },
};

export const createProjectBodySchema = {
  type: 'object',
  required: ['title', 'description', 'tags', 'category', 'caseStudy'],
  properties: {
    title: { type: 'string', minLength: 2, example: 'Portfolio Next.js' },
    description: { type: 'string', minLength: 5, example: 'Portfolio interaktif bertema kartu remi.' },
    tags: { type: 'array', items: { type: 'string' }, minItems: 1, example: ['Next.js', 'Fastify', 'TypeScript'] },
    category: { type: 'string', enum: ['Web', 'Robotik', 'Desain', 'UI/UX'], example: 'Web' },
    date: { type: 'string', default: '2026', example: '2026' },
    imageUrl: { type: 'string', example: '' },
    caseStudy: { type: 'string', minLength: 10, example: 'Membangun aplikasi portfolio interaktif dengan 3D tilt.' },
    buttons: {
      type: 'array',
      items: {
        type: 'object',
        required: ['label', 'url'],
        properties: {
          label: { type: 'string', example: 'Lihat Demo' },
          url: { type: 'string', example: 'https://github.com/Musyami' },
        },
      },
      example: [{ label: 'Lihat di GitHub', url: 'https://github.com/Musyami' }],
    },
    rank: { type: 'string', example: 'A' },
    suit: { type: 'string', example: '♠' },
  },
};

// --- Schema Keterampilan (Skill) ---
export const skillSchema = {
  type: 'object',
  required: ['id', 'order', 'name', 'description', 'level', 'category'],
  properties: {
    id: { type: 'string', example: 'skl-1' },
    order: { type: 'number', example: 1 },
    name: { type: 'string', example: 'TypeScript' },
    description: { type: 'string', example: 'JS bertipe' },
    level: { type: 'number', minimum: 0, maximum: 100, example: 80 },
    iconUrl: { type: 'string', example: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    iconKey: { type: 'string', example: 'd:typescript' },
    category: { type: 'string', example: 'Bahasa Pemrograman' },
    suit: { type: 'string', example: '♠' },
  },
};

export const createSkillBodySchema = {
  type: 'object',
  required: ['name', 'description', 'level', 'category'],
  properties: {
    name: { type: 'string', minLength: 1, example: 'Go' },
    description: { type: 'string', minLength: 2, example: 'Bahasa backend performa tinggi' },
    level: { type: 'number', minimum: 0, maximum: 100, example: 50 },
    iconUrl: { type: 'string', example: '' },
    iconKey: { type: 'string', example: 'd:go' },
    category: { type: 'string', example: 'Bahasa Pemrograman' },
    suit: { type: 'string', example: '♠' },
  },
};

// --- Schema Pendidikan (Education) ---
export const educationSchema = {
  type: 'object',
  required: ['id', 'order', 'title', 'major', 'period', 'description'],
  properties: {
    id: { type: 'string', example: 'edu-1' },
    order: { type: 'number', example: 1 },
    title: { type: 'string', example: 'Institut Teknologi Sepuluh Nopember' },
    major: { type: 'string', example: 'Sistem Informasi' },
    period: { type: 'string', example: '2024 – sekarang' },
    description: { type: 'string', example: 'Menempuh pendidikan S1 Sistem Informasi.' },
  },
};

export const createEducationBodySchema = {
  type: 'object',
  required: ['title', 'major', 'period', 'description'],
  properties: {
    title: { type: 'string', minLength: 2, example: 'Universitas Indonesia' },
    major: { type: 'string', example: 'Teknik Komputer' },
    period: { type: 'string', example: '2026 – sekarang' },
    description: { type: 'string', example: 'Mempelajari arsitektur komputer dan jaringan.' },
  },
};

// --- Schema Pengalaman (Experience) ---
export const experienceSchema = {
  type: 'object',
  required: ['id', 'order', 'title', 'organization', 'startDate', 'description', 'bullets'],
  properties: {
    id: { type: 'string', example: 'exp-1' },
    order: { type: 'number', example: 1 },
    title: { type: 'string', example: 'Web Developer' },
    organization: { type: 'string', example: 'Barunastra ITS' },
    startDate: { type: 'string', example: 'Sep 2025' },
    endDate: { type: 'string', nullable: true, example: null },
    period: { type: 'string', example: 'Sep 2025 – sekarang' },
    description: { type: 'string', example: 'Mengembangkan sistem web tim.' },
    bullets: { type: 'array', items: { type: 'string' }, example: ['Membangun antarmuka web'] },
    imageUrl: { type: 'string', example: '' },
    emoji: { type: 'string', example: '🚢' },
    rank: { type: 'string', example: 'A' },
    suit: { type: 'string', example: '♠' },
    isCurrent: { type: 'boolean', example: true },
  },
};

export const createExperienceBodySchema = {
  type: 'object',
  required: ['title', 'organization', 'startDate', 'description', 'bullets'],
  properties: {
    title: { type: 'string', minLength: 2, example: 'Software Engineer Intern' },
    organization: { type: 'string', minLength: 2, example: 'Tech Studio' },
    startDate: { type: 'string', example: 'Jan 2026' },
    endDate: { type: 'string', nullable: true, example: 'Apr 2026' },
    period: { type: 'string', example: 'Jan 2026 – Apr 2026' },
    description: { type: 'string', example: 'Mengembangkan fitur REST API.' },
    bullets: { type: 'array', items: { type: 'string' }, minItems: 1, example: ['Optimasi query database'] },
    imageUrl: { type: 'string', example: '' },
    emoji: { type: 'string', example: '⚡' },
    rank: { type: 'string', example: 'K' },
    suit: { type: 'string', example: '♥' },
    isCurrent: { type: 'boolean', example: false },
  },
};

// --- Schema Prestasi (Achievement) ---
export const achievementSchema = {
  type: 'object',
  required: ['id', 'order', 'title', 'organizer', 'date', 'description', 'bullets'],
  properties: {
    id: { type: 'string', example: 'achv-1' },
    order: { type: 'number', example: 1 },
    title: { type: 'string', example: 'Juara Lomba' },
    organizer: { type: 'string', example: 'Penyelenggara Lomba' },
    date: { type: 'string', example: 'Nov 2025' },
    description: { type: 'string', example: 'Penghargaan atas hasil kerja tim.' },
    bullets: { type: 'array', items: { type: 'string' }, example: ['Bekerja sama dalam tim'] },
    imageUrl: { type: 'string', example: '' },
    emoji: { type: 'string', example: '🏆' },
    rank: { type: 'string', example: 'A' },
    suit: { type: 'string', example: '♠' },
  },
};

export const createAchievementBodySchema = {
  type: 'object',
  required: ['title', 'organizer', 'date', 'description', 'bullets'],
  properties: {
    title: { type: 'string', minLength: 2, example: 'Juara 1 Hackathon' },
    organizer: { type: 'string', minLength: 2, example: 'Kemenkominfo' },
    date: { type: 'string', example: 'Okt 2026' },
    description: { type: 'string', example: 'Membuat solusi AI untuk pertanian' },
    bullets: { type: 'array', items: { type: 'string' }, minItems: 1, example: ['Membangun prototipe dalam 24 jam'] },
    imageUrl: { type: 'string', example: '' },
    emoji: { type: 'string', example: '🥇' },
    rank: { type: 'string', example: 'A' },
    suit: { type: 'string', example: '♠' },
  },
};

// --- Schema Artikel Blog (BlogPost) ---
export const blogPostSchema = {
  type: 'object',
  required: ['id', 'order', 'slug', 'title', 'excerpt', 'date', 'content'],
  properties: {
    id: { type: 'string', example: 'blg-1' },
    order: { type: 'number', example: 1 },
    slug: { type: 'string', example: 'eksperimen-pertama-dengan-ros-2' },
    title: { type: 'string', example: 'Eksperimen pertama dengan ROS 2' },
    excerpt: { type: 'string', example: 'Catatan membuat node pertama.' },
    date: { type: 'string', example: '12 Okt 2026' },
    coverUrl: { type: 'string', example: '' },
    emoji: { type: 'string', example: '🤖' },
    content: { type: 'array', items: { type: 'string' }, example: ['Paragraf 1', 'Paragraf 2'] },
  },
};

export const createBlogPostBodySchema = {
  type: 'object',
  required: ['title', 'excerpt', 'date', 'content'],
  properties: {
    slug: { type: 'string', example: 'belajar-fastify-dan-nextjs' },
    title: { type: 'string', minLength: 2, example: 'Belajar Fastify dan Next.js' },
    excerpt: { type: 'string', minLength: 5, example: 'Panduan integrasi fullstack modern' },
    date: { type: 'string', example: '30 Okt 2026' },
    coverUrl: { type: 'string', example: '' },
    emoji: { type: 'string', example: '⚡' },
    content: { type: 'array', items: { type: 'string' }, minItems: 1, example: ['Isi artikel blog lengkap.'] },
  },
};

// --- Schema Media Sosial (Social) ---
export const socialSchema = {
  type: 'object',
  required: ['id', 'order', 'name', 'handle', 'url', 'color'],
  properties: {
    id: { type: 'string', example: 'soc-1' },
    order: { type: 'number', example: 1 },
    name: { type: 'string', example: 'GitHub' },
    handle: { type: 'string', example: 'Musyami' },
    url: { type: 'string', example: 'https://github.com/Musyami' },
    logoUrl: { type: 'string', example: '' },
    iconSvg: { type: 'string', example: '<svg>...</svg>' },
    color: { type: 'string', example: '#1A1816' },
  },
};

export const createSocialBodySchema = {
  type: 'object',
  required: ['name', 'handle', 'url', 'color'],
  properties: {
    name: { type: 'string', minLength: 2, example: 'Twitter' },
    handle: { type: 'string', example: '@musyami' },
    url: { type: 'string', example: 'https://twitter.com/musyami' },
    logoUrl: { type: 'string', example: '' },
    iconSvg: { type: 'string', example: '' },
    color: { type: 'string', example: '#1DA1F2' },
  },
};

// --- Schema Profil (Profile) ---
export const profileSchema = {
  type: 'object',
  required: ['name', 'nickname', 'title', 'tagline', 'about'],
  properties: {
    name: { type: 'string', example: 'Muhammad Rasya Islami' },
    nickname: { type: 'string', example: 'Musyami' },
    title: { type: 'string', example: 'Web Developer & Robotics Enthusiast' },
    tagline: { type: 'string', example: 'The Developer’s Deck | Musyami' },
    about: { type: 'string', example: 'I am an Information Systems undergraduate student at ITS...' },
    avatarUrl: { type: 'string', example: '' },
  },
};

// --- Schema Kontak (Contact) ---
export const contactBodySchema = {
  type: 'object',
  required: ['name', 'email', 'message'],
  properties: {
    name: { type: 'string', minLength: 2, example: 'Budi Santoso' },
    email: { type: 'string', format: 'email', example: 'budi@example.com' },
    message: { type: 'string', minLength: 5, example: 'Halo Rasya, saya tertarik untuk mengajak kolaborasi proyek robotika.' },
    honeypot: { type: 'string', example: '', description: 'Kolom jebakan anti-bot (harus dibiarkan kosong)' },
  },
};

export const contactResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: true },
    message: { type: 'string', example: 'Pesan berhasil dikirim dan tersimpan.' },
  },
};

// --- Schema Upload Gambar ---
export const uploadResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: true },
    url: { type: 'string', example: '/uploads/1730300000000-gambar.png' },
    filename: { type: 'string', example: '1730300000000-gambar.png' },
    size: { type: 'number', example: 1048576 },
  },
};
