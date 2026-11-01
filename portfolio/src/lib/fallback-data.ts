/**
 * Data cadangan (fallback-data) untuk Musyami Portfolio.
 * Bersumber langsung dari reference/design.html dan AGENTS.md.
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

// Data Profil
export const PROFILE_DATA: Profile = {
  name: 'Muhammad Rasya Islami',
  nickname: 'Musyami',
  title: 'Web Developer & Robotics Enthusiast',
  tagline: 'The Developer’s Deck | Musyami',
  about:
    'I am an Information Systems undergraduate student at Institut Teknologi Sepuluh Nopember (ITS) who bridges technical adaptability with organizational leadership. I specialize in AI-assisted Vibe Coding and modern web platforms, alongside a strong passion for robotics, microcontrollers, and hardware integration. Beyond technical execution, my background leading student organizations drives my ability to coordinate cross-functional teams and manage complex projects. I am always open to exciting collaborations and internships where I can build impactful digital realities.',
};

// Data Pendidikan (EDU)
export const EDU: Education[] = [
  {
    id: 'edu-1',
    order: 1,
    title: 'Institut Teknologi Sepuluh Nopember',
    major: 'Sistem Informasi',
    period: '2024 – sekarang',
    description:
      'Menempuh pendidikan S1 Sistem Informasi, mendalami pengembangan sistem, web, dan pengelolaan teknologi informasi untuk organisasi.',
  },
  {
    id: 'edu-2',
    order: 2,
    title: 'MAN 9 Jakarta Timur',
    major: 'MIPA',
    period: '2021 – 2024',
    description:
      'Menempuh pendidikan menengah atas sambil aktif di organisasi sekolah dan Forum MPK DKI.',
  },
  {
    id: 'edu-3',
    order: 3,
    title: 'SMPIT Thariq Bin Ziyad Boarding School',
    major: 'Pendidikan Menengah Pertama',
    period: '2018 – 2021',
    description:
      'Menempuh pendidikan menengah pertama di lingkungan boarding school yang melatih kemandirian dan kedisiplinan.',
  },
];

// Data Pengalaman (EXP)
export const EXP: Experience[] = [
  {
    id: 'exp-1',
    order: 1,
    title: 'Web Developer (Magang)',
    organization: 'Barunastra ITS Robotics Team',
    startDate: 'Sep 2025',
    endDate: null,
    period: 'Sep 2025 – sekarang',
    description: 'Mengembangkan web dan sistem pendukung tim robotika kapal ITS.',
    bullets: [
      'Membangun antarmuka web untuk kebutuhan tim',
      'Belajar ROS 2 dan sistem robotika',
    ],
    emoji: '🚢',
    rank: 'A',
    suit: '♠',
    isCurrent: true,
  },
  {
    id: 'exp-2',
    order: 2,
    title: 'Anggota Divisi Teknologi',
    organization: 'Organisasi Kampus (contoh)',
    startDate: 'Agu 2025',
    endDate: 'Des 2025',
    period: 'Agu 2025 – Des 2025',
    description: 'Mengerjakan website dan alat bantu digital untuk kegiatan organisasi.',
    bullets: [
      'Membuat website kegiatan',
      'Mendampingi anggota baru belajar web',
    ],
    emoji: '💻',
    rank: 'K',
    suit: '♥',
    isCurrent: false,
  },
  {
    id: 'exp-3',
    order: 3,
    title: 'Asisten Praktikum',
    organization: 'Laboratorium ITS (contoh)',
    startDate: 'Sep 2025',
    endDate: 'Des 2025',
    period: 'Sep 2025 – Des 2025',
    description: 'Membantu mahasiswa memahami praktikum pemrograman.',
    bullets: [
      'Menjelaskan konsep dasar pemrograman',
      'Menilai dan memberi masukan tugas',
    ],
    emoji: '🧪',
    rank: 'Q',
    suit: '♣',
    isCurrent: false,
  },
  {
    id: 'exp-4',
    order: 4,
    title: 'Peserta Lomba Robotika',
    organization: 'Kompetisi Nasional (contoh)',
    startDate: 'Okt 2024',
    endDate: 'Nov 2024',
    period: 'Okt 2024 – Nov 2024',
    description: 'Ikut berkompetisi dan belajar kerja tim di bawah tekanan waktu.',
    bullets: [
      'Mengerjakan bagian perangkat lunak',
      'Uji coba dan perbaikan sistem',
    ],
    emoji: '🏆',
    rank: 'J',
    suit: '♦',
    isCurrent: false,
  },
  {
    id: 'exp-5',
    order: 5,
    title: 'Panitia Acara Kampus',
    organization: 'Kepanitiaan ITS (contoh)',
    startDate: 'Mar 2024',
    endDate: 'Mei 2024',
    period: 'Mar 2024 – Mei 2024',
    description: 'Terlibat dalam perencanaan dan pelaksanaan acara kampus.',
    bullets: [
      'Koordinasi divisi dan jadwal',
      'Dokumentasi dan publikasi',
    ],
    emoji: '🎪',
    rank: '10',
    suit: '♠',
    isCurrent: false,
  },
  {
    id: 'exp-6',
    order: 6,
    title: 'Perwakilan Forum MPK DKI',
    organization: 'Forum MPK DKI',
    startDate: 'Mar 2023',
    endDate: 'Des 2023',
    period: 'Mar 2023 – Des 2023',
    description: 'Berkolaborasi lintas sekolah di tingkat provinsi DKI Jakarta.',
    bullets: [
      'Koordinasi antar perwakilan sekolah',
      'Menjalankan program bersama',
    ],
    emoji: '🤝',
    rank: '9',
    suit: '♥',
    isCurrent: false,
  },
  {
    id: 'exp-7',
    order: 7,
    title: 'Pengurus Organisasi Sekolah',
    organization: 'MAN 9 Jakarta',
    startDate: 'Jul 2022',
    endDate: 'Jun 2023',
    period: 'Jul 2022 – Jun 2023',
    description: 'Aktif di organisasi sekolah dan belajar memimpin tim sejak dini.',
    bullets: [
      'Terlibat dalam kegiatan sekolah',
      'Melatih komunikasi dan kerja tim',
    ],
    emoji: '🏫',
    rank: '8',
    suit: '♣',
    isCurrent: false,
  },
];

// Data Prestasi (ACHV)
export const ACHV: Achievement[] = [
  {
    id: 'achv-1',
    order: 1,
    title: 'Juara Lomba (contoh)',
    organizer: 'Penyelenggara Lomba (contoh)',
    date: 'Nov 2025',
    description: 'Penghargaan atas hasil kerja tim di lomba tingkat nasional.',
    bullets: [
      'Bekerja sama dalam tim',
      'Mempresentasikan hasil karya',
    ],
    emoji: '🏆',
    rank: 'A',
    suit: '♠',
  },
  {
    id: 'achv-2',
    order: 2,
    title: 'Finalis Kompetisi (contoh)',
    organizer: 'Penyelenggara Kompetisi (contoh)',
    date: 'Sep 2025',
    description: 'Lolos ke babak final setelah melewati seleksi ketat.',
    bullets: [
      'Menyiapkan proposal dan prototipe',
      'Presentasi di depan juri',
    ],
    emoji: '🥈',
    rank: 'K',
    suit: '♥',
  },
  {
    id: 'achv-3',
    order: 3,
    title: 'Sertifikat Pelatihan (contoh)',
    organizer: 'Lembaga Pelatihan (contoh)',
    date: 'Agu 2025',
    description: 'Menyelesaikan pelatihan dan mendapat sertifikat kelulusan.',
    bullets: [
      'Mengikuti seluruh sesi pelatihan',
      'Menyelesaikan tugas akhir',
    ],
    emoji: '📜',
    rank: 'Q',
    suit: '♣',
  },
  {
    id: 'achv-4',
    order: 4,
    title: 'Beasiswa (contoh)',
    organizer: 'Pemberi Beasiswa (contoh)',
    date: 'Jul 2025',
    description: 'Menerima beasiswa atas prestasi dan komitmen belajar.',
    bullets: [
      'Lolos seleksi administrasi',
      'Lolos wawancara',
    ],
    emoji: '🎓',
    rank: 'J',
    suit: '♦',
  },
];

// Data Keterampilan Mentah (SKL)
const RAW_SKILLS: Array<[string, string, Array<[string, string, number, string]>]> = [
  [
    'Bahasa Pemrograman',
    '♠',
    [
      ['HTML', 'Struktur web', 80, 'd:html5'],
      ['CSS', 'Gaya & layout', 80, 'd:css3'],
      ['JavaScript', 'Web interaktif', 40, 'd:javascript'],
      ['TypeScript', 'JS bertipe', 40, 'd:typescript'],
      ['Python', 'Scripting & ROS', 40, 'd:python'],
      ['C++', 'Robotika', 40, 'd:cplusplus'],
    ],
  ],
  [
    'Framework & Tools',
    '♥',
    [
      ['React 18', 'UI interaktif', 40, 'd:react'],
      ['Tailwind CSS', 'Styling cepat', 40, 'd:tailwindcss'],
      ['Git', 'Kontrol versi', 40, 'd:git'],
      ['GitHub', 'Kolaborasi kode', 30, 'd:github'],
      ['VS Code', 'Editor utama', 30, 'd:vscode'],
      ['Vercel', 'Deploy web', 50, 'd:vercel'],
      ['Supabase', 'Backend & DB', 50, 'd:supabase'],
      ['Firebase', 'Backend cloud', 60, 'd:firebase'],
      ['Google AI Studio', 'Prototipe AI', 50, 's:googlegemini'],
      ['ROS 2', 'Middleware robot', 40, 's:ros'],
    ],
  ],
  [
    'Software & Hardware',
    '♦',
    [
      ['Arduino Uno', 'Mikrokontroler', 80, 'd:arduino'],
      ['Arduino IDE', 'Pemrograman board', 80, 'd:arduino'],
      ['Tinkercad', 'Simulasi sirkuit', 80, 's:tinkercad'],
      ['Leanbot', 'Robot edukasi', 60, ''],
      ['Google Workspace', 'Kolaborasi kerja', 90, 's:google'],
      ['Figma', 'Desain UI', 70, 'd:figma'],
      ['Canva', 'Desain grafis', 80, 'd:canva'],
    ],
  ],
];

// Helper untuk URL icon (devicon / simpleicons)
export function getSkillIconUrl(iconKey: string): string {
  if (!iconKey) return '';
  if (iconKey.startsWith('d:')) {
    const slug = iconKey.slice(2);
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;
  }
  if (iconKey.startsWith('s:')) {
    const slug = iconKey.slice(2);
    return `https://cdn.simpleicons.org/${slug}`;
  }
  return '';
}

// Transformasi SKL ke array Skill ber-ID dan berurutan
let skillCounter = 1;
export const SKL: Skill[] = RAW_SKILLS.flatMap(([category, suit, items]) =>
  items.map(([name, description, level, iconKey]) => ({
    id: `skl-${skillCounter}`,
    order: skillCounter++,
    name,
    description,
    level,
    iconKey,
    iconUrl: getSkillIconUrl(iconKey),
    category,
    suit,
  }))
);

export const SKILL_GROUPS: SkillCategoryGroup[] = RAW_SKILLS.map(([category, suit]) => ({
  category,
  suit,
  skills: SKL.filter((s) => s.category === category),
}));

// Data Proyek Mentah (PL)
const RAW_PROJECTS: Record<string, Array<[string, string, string]>> = {
  Web: [
    ['MyActivity', 'Aplikasi pencatat aktivitas harian dengan tampilan bersih.', 'Next.js,TypeScript'],
    ['Barunastra Web', 'Website dan dashboard untuk kebutuhan tim robotika.', 'React,TypeScript'],
    ['Portofolio Ini', 'Deck interaktif yang sedang kamu lihat sekarang.', 'HTML,CSS,JS'],
    ['Landing Page Acara (contoh)', 'Halaman informasi untuk acara organisasi.', 'React,Tailwind'],
    ['Toko Kecil (contoh)', 'Katalog produk sederhana dengan keranjang.', 'Next.js,Tailwind'],
    ['Blog Pribadi (contoh)', 'Blog dengan halaman baca dan tanggal.', 'Next.js,MDX'],
    ['Dashboard Data (contoh)', 'Visualisasi data sederhana untuk tim.', 'React,Chart'],
  ],
  Robotik: [
    ['Turtlesim Task 3', 'Tugas robotika: mengendalikan turtle di simulator ROS 2.', 'ROS 2,Python'],
    ['Kontrol Kapal (contoh)', 'Simulasi kontrol arah kapal otonom di Gazebo.', 'ROS 2,C++'],
    ['Line Follower (contoh)', 'Robot pengikut garis dengan sensor sederhana.', 'C++,Arduino'],
    ['Pembaca Sensor (contoh)', 'Node ROS 2 untuk membaca dan menampilkan data sensor.', 'ROS 2,Python'],
    ['Navigasi Waypoint (contoh)', 'Navigasi robot melewati beberapa titik tujuan.', 'ROS 2,C++'],
    ['Node Kamera (contoh)', 'Mengolah gambar kamera untuk deteksi objek.', 'Python,OpenCV'],
    ['Lengan Robot Mini (contoh)', 'Kontrol lengan robot dengan servo.', 'C++,Arduino'],
  ],
  Desain: [
    ['Poster Kegiatan (contoh)', 'Poster untuk acara organisasi.', 'Figma'],
    ['Logo Tim (contoh)', 'Eksplorasi logo untuk tim kecil.', 'Figma,Ilustrasi'],
    ['Kaos Angkatan (contoh)', 'Desain kaos untuk angkatan.', 'Ilustrasi'],
    ['Sampul Buku (contoh)', 'Sampul untuk buku kegiatan.', 'Figma'],
    ['Set Ikon (contoh)', 'Kumpulan ikon dengan gaya seragam.', 'Vektor'],
    ['Banner Acara (contoh)', 'Banner untuk publikasi digital.', 'Figma'],
    ['Stiker Pack (contoh)', 'Paket stiker bertema kartu remi.', 'Ilustrasi'],
  ],
  'UI/UX': [
    ['UI Kit Hijau Emas (contoh)', 'Komponen UI bertema kartu remi.', 'Figma,Design system'],
    ['Prototipe Aplikasi Catatan (contoh)', 'Alur onboarding sampai pencatatan.', 'Figma,Prototyping'],
    ['Redesign Dashboard (contoh)', 'Perbaikan tampilan dashboard tim.', 'Figma'],
    ['Alur Onboarding (contoh)', 'Rancangan alur pengguna baru.', 'Figma,UX'],
    ['Aplikasi Pantau Kapal (contoh)', 'Desain antarmuka pemantauan kapal.', 'Figma'],
    ['Wireframe Toko (contoh)', 'Wireframe toko online sederhana.', 'Figma'],
    ['Riset Pengguna (contoh)', 'Wawancara singkat dan peta empati.', 'UX Research'],
  ],
};

const CARD_RANKS = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5'];
const CARD_SUITS = ['♠', '♥', '♦', '♣'];

// Transformasi Proyek (PRJ)
export const PRJ: Project[] = [];
let prjCounter = 1;

for (let i = 0; i < 7; i++) {
  for (const cat of ['Web', 'Robotik', 'Desain', 'UI/UX'] as const) {
    const item = RAW_PROJECTS[cat][i];
    const index = PRJ.length;
    PRJ.push({
      id: `prj-${prjCounter}`,
      order: prjCounter++,
      title: item[0],
      description: item[1],
      tags: item[2].split(',').map((t) => t.trim()),
      category: cat,
      date: '2025 – 2026',
      caseStudy: `Case study ${item[0].replace(' (contoh)', '')} menyusul: latar belakang, proses, dan hasil akhirnya.`,
      buttons: [
        {
          label: 'Lihat di GitHub',
          url: 'https://github.com/Musyami',
        },
      ],
      rank: CARD_RANKS[index % 10],
      suit: CARD_SUITS[index % 4],
    });
  }
}

// Data Blog (BLG)
export const BLG: BlogPost[] = [
  {
    id: 'blg-1',
    order: 1,
    slug: 'eksperimen-pertama-dengan-ros-2',
    date: '12 Okt 2026',
    title: 'Eksperimen pertama dengan ROS 2',
    excerpt: 'Catatan membuat node pertama dan salah paham yang bikin lama debug.',
    emoji: '🤖',
    content: [
      'Hari pertama aku menyentuh ROS 2, semuanya terasa asing: node, topic, dan message. Aku mengira cukup menjalankan satu skrip, ternyata sistemnya terdiri dari banyak proses kecil yang saling bicara.',
      'Yang paling lama membuatku debug adalah nama topic yang salah satu huruf. Dari situ aku belajar membaca daftar topic dulu sebelum menyalahkan kode.',
      'Sekarang aku punya kebiasaan baru: catat setiap eksperimen sekecil apa pun. Cerita lengkapnya akan aku tambah seiring belajar.',
    ],
  },
  {
    id: 'blg-2',
    order: 2,
    slug: 'kenapa-aku-pakai-typescript-strict',
    date: '28 Sep 2026',
    title: 'Kenapa aku pakai TypeScript strict',
    excerpt: 'Mode ketat repot di awal, tapi menghemat banyak waktu belakangan.',
    emoji: '🧠',
    content: [
      'Awalnya strict mode terasa seperti guru galak yang memarahi tiap baris. Banyak error merah muncul di proyek lamaku.',
      'Tapi setelah semuanya dibereskan, bug yang tersisa jauh lebih sedikit. Aku jadi lebih percaya diri saat mengubah kode.',
      'Saran singkatku: nyalakan sejak proyek dimulai, jangan menunggu proyeknya membesar.',
    ],
  },
  {
    id: 'blg-3',
    order: 3,
    slug: 'dari-web-ke-robot',
    date: '9 Sep 2026',
    title: 'Dari web ke robot',
    excerpt: 'Opini tentang bagaimana kebiasaan web developer membantu di robotika.',
    emoji: '🛠️',
    content: [
      'Banyak orang mengira web dan robotika dunia yang berbeda. Menurutku keduanya sama-sama soal sistem yang bertukar pesan.',
      'Kebiasaan menulis API yang rapi dan mendokumentasikannya ternyata sangat berguna saat bekerja dengan tim robotika.',
    ],
  },
  {
    id: 'blg-4',
    order: 4,
    slug: 'catatan-ngoding-animasi-kartu',
    date: '15 Agu 2026',
    title: 'Catatan ngoding animasi kartu',
    excerpt: 'Belajar CSS 3D, perspective, dan kenapa backface-visibility penting.',
    emoji: '🃏',
    content: [
      'Membuat kartu yang bisa dibalik ternyata butuh tiga hal: perspective, transform-style preserve-3d, dan backface-visibility hidden.',
      'Kalau salah satu lupa, kartunya akan terlihat terbalik atau menembus satu sama lain. Aku belajar dari banyak percobaan.',
    ],
  },
  {
    id: 'blg-5',
    order: 5,
    slug: 'riset-kontrol-kapal-otonom',
    date: '2 Agu 2026',
    title: 'Riset kontrol kapal otonom',
    excerpt: 'Ringkasan bacaan tentang sistem navigasi dan kontrol kapal.',
    emoji: '⚓',
    content: [
      'Aku mulai membaca dasar kontrol kapal: heading, kecepatan, dan gangguan gelombang.',
      'Catatan ini masih awal, tapi cukup untuk memetakan apa yang perlu dipelajari berikutnya.',
    ],
  },
];

// Data Media Sosial (SOC)
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
