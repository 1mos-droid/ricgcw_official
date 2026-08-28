import logoImg from '../assets/church/logo.jpg';
import themeImg from '../assets/church/this_year_theme/IMG-20260408-WA0064.jpg';
import pastorsGroupImg from '../assets/church/all_church_pastors/IMG-20260301-WA0187.jpg';
import overseerImg from '../assets/church/pastor/IMG-20260408-WA0061.jpg';
import pastorImg2 from '../assets/church/pastor/IMG-20260408-WA0062.jpg';
import coupleImg1 from '../assets/church/pastor_and_wife/IMG-20260408-WA0060.jpg';
import coupleImg2 from '../assets/church/pastor_and_wife/IMG-20260408-WA0063.jpg';

export interface ServiceSchedule {
  day: string;
  time: string;
  name: string;
  description: string;
  isMain?: boolean;
}

export interface Branch {
  id: string;
  name: string;
  tagline: string;
  location: string;
  address: string;
  directions: string;
  phone: string;
  email: string;
  pastor: string;
  isHeadquarters?: boolean;
  services: ServiceSchedule[];
}

export interface LeadershipMember {
  name: string;
  title: string;
  role: string;
  image: string;
  bio: string;
}

export interface ChurchColor {
  name: string;
  hex: string;
  spiritualMeaning: string;
  biblicalReference: string;
  accentClass: string;
}

export const CHURCH_INFO = {
  name: 'Rhema Inner Court Gospel Church (Worldwide)',
  shortName: 'RICGCW',
  themeYear: '2026',
  themeTitle: 'Divine Manifestation',
  themeSubtitle: 'Touching Lives Worldwide',
  motto: [
    { title: 'Perfecting the Saints', scripture: 'Ephesians 4:12' },
    { title: 'Taking Territories', scripture: 'Joshua 1:3' },
    { title: 'Where Impossibility Becomes Possible', scripture: 'Luke 1:37' },
  ],
  slogan: 'Inner court – where sacrifices made to heaven!!!',
  vision: 'To Reach Out To People; To Love The People; To Care For The People, Spiritual And Physical Needs.',
  scripturalAnchor: {
    verse: "Now it came to pass on the third day, that Esther put on her royal apparel, and stood in the inner court of the king's house...",
    reference: 'Esther 5:1',
  },
  contact: {
    phone: '+233 244 485 7403',
    phoneSecondary: '+233 500 000 000',
    email: 'innercourtch@gmail.com',
    location: 'Accra, Ghana (West Africa)',
    youtube: 'https://youtube.com/@innercourtgospelchurchworl2293',
    instagram: 'https://www.instagram.com/ofttouchinglives',
    facebook: 'https://www.facebook.com/share/1CT6hkuLu8/',
  },
  giving: {
    momo: {
      network: 'MTN Mobile Money',
      number: '024 448 5740',
      accountName: 'Rhema Inner Court Gospel Church',
      merchantId: 'RICGCW-GIVING',
    },
    telecel: {
      network: 'Telecel Cash',
      number: '050 000 0000',
      accountName: 'Rhema Inner Court Gospel Church',
    },
    bank: {
      bankName: 'Ecobank Ghana',
      accountNumber: '1441000000000',
      branch: 'Mallam Branch, Accra',
      swiftCode: 'ECOCGHAC',
    }
  }
};

export const BRANCHES: Branch[] = [
  {
    id: 'mallam',
    name: 'Mallam Sanctuary (Main Cathedral)',
    tagline: 'Mother Church & Global Headquarters',
    location: 'Mallam, Accra, Ghana',
    address: 'Near Mallam Junction, Greater Accra Region, Ghana',
    directions: 'Located right off the Mallam-Gbawe road, easily accessible by public transit & private vehicles.',
    phone: '+233 244 485 7403',
    email: 'mallam@ricgcw.org',
    pastor: 'Rev. Nicholas Dobeng (General Overseer)',
    isHeadquarters: true,
    services: [
      {
        day: 'Sunday',
        time: '9:00 AM – 12:00 PM',
        name: 'Glorious Sunday Celebration & Word Feast',
        description: 'Atmosphere of high praise, deep worship, prophetic utterance, and kingdom transformation.',
        isMain: true,
      },
      {
        day: 'Tuesday',
        time: '6:00 PM – 8:45 PM',
        name: 'Mid-Week Rhema Teaching Service',
        description: 'In-depth systematic study of the Word of God, discipleship, and spiritual empowerment.',
      },
      {
        day: 'Thursday',
        time: '6:00 PM – 9:00 PM',
        name: 'Prophetic Encounter & Deliverance Service',
        description: 'Unlocking divine destiny, prayer warfare, breakthrough, and signs & wonders.',
      },
      {
        day: 'Saturday',
        time: '6:00 PM – 7:00 PM',
        name: 'Intercessory Hour & Altar of Fire',
        description: 'Power-packed corporate prayer covering families, nation, and church vision.',
      },
    ],
  },
  {
    id: 'kokrobitey',
    name: 'Kokrobitey Branch',
    tagline: 'Beacon of Light on the Coast',
    location: 'Kokrobitey, Greater Accra',
    address: 'Kokrobitey Coastal Road, Greater Accra, Ghana',
    directions: '5 minutes from Kokrobitey town center, close to the coastal township.',
    phone: '+233 244 485 7403',
    email: 'kokrobitey@ricgcw.org',
    pastor: 'Pastoral Council',
    services: [
      {
        day: 'Sunday',
        time: '7:00 AM – 9:00 AM',
        name: 'Early Morning Divine Encounter Service',
        description: 'Start your Lord’s day in reverence, passionate prayer, and life-changing ministry.',
        isMain: true,
      },
      {
        day: 'Wednesday',
        time: '6:30 PM – 8:30 PM',
        name: 'Mid-Week Breakthrough Service',
        description: 'Spiritual fellowship, scripture exposition, and communal prayers.',
      },
      {
        day: 'Friday',
        time: '7:00 PM – 9:00 PM',
        name: 'Prophetic Miracle & Revival Night',
        description: 'Intense intercession, healing, and supernatural breakthroughs.',
      },
    ],
  },
  {
    id: 'langma',
    name: 'Langma Branch',
    tagline: 'The Haven of Grace & Revival',
    location: 'Langma, Greater Accra',
    address: 'Langma Main Road, Greater Accra Region, Ghana',
    directions: 'Situated along the Langma central corridor.',
    phone: '+233 244 485 7403',
    email: 'langma@ricgcw.org',
    pastor: 'Pastoral Council',
    services: [
      {
        day: 'Sunday',
        time: '8:30 AM – 11:00 AM',
        name: 'Sunday Morning Miracle & Praise Service',
        description: 'Vibrant worship, powerful communion, and prophetic instructions.',
        isMain: true,
      },
      {
        day: 'Thursday',
        time: '6:30 PM – 8:30 PM',
        name: 'Mid-Week Word & Prayer Encounter',
        description: 'Building spiritual stamina and fellowship in the presence of God.',
      },
    ],
  },
];

export const LEADERSHIP: LeadershipMember[] = [
  {
    name: 'Rev. Nicholas Dobeng',
    title: 'General Overseer & Founder',
    role: 'Apostolic & Prophetic Leader',
    image: overseerImg,
    bio: 'An anointed servant of God with a profound mandate to preach the unadulterated Gospel, raise kingdom leaders, take territories, and touch lives across all continents.',
  },
  {
    name: 'Rev. & Mrs. Nicholas Dobeng',
    title: 'Founding Pastoral Family',
    role: 'Pillars of Love & Marriage Ministry',
    image: coupleImg1,
    bio: 'Exemplifying godly marriage, family values, and spiritual mentorship, leading the flock with compassion, faith, and dedication.',
  },
  {
    name: 'Pastoral Council & Executives',
    title: 'Pastoral Council',
    role: 'Branch Pastors & Departmental Heads',
    image: pastorsGroupImg,
    bio: 'A consecrated assembly of branch pastors, ministers, and elders committed to the flock’s spiritual welfare, church administration, and global missions.',
  },
];

export const CHURCH_COLORS: ChurchColor[] = [
  {
    name: 'White',
    hex: '#FFFFFF',
    spiritualMeaning: 'Light, Purity, Bride of Christ, Surrender, Joy, Angels, Holiness',
    biblicalReference: 'Revelation 19:8, Isaiah 1:18',
    accentClass: 'border-slate-300 text-slate-900 bg-white',
  },
  {
    name: 'Gold',
    hex: '#FFD700',
    spiritualMeaning: 'Glory of God, Divine Nature, Refining Process, Kingship, Wisdom, Truth, Anointing Oil',
    biblicalReference: '1 Peter 1:7, Revelation 3:18',
    accentClass: 'border-amber-400 text-amber-950 bg-gradient-to-br from-amber-200 to-amber-400',
  },
  {
    name: 'Deep Orange',
    hex: '#FF4500',
    spiritualMeaning: 'Holy Spirit Fire, Prophetic Ministry, Harvest, Zeal, Strength, Endurance, Awakening',
    biblicalReference: 'Acts 2:3, Matthew 3:11',
    accentClass: 'border-orange-500 text-white bg-gradient-to-br from-orange-500 to-orange-700',
  },
  {
    name: 'Lemon Green',
    hex: '#32CD32',
    spiritualMeaning: 'Prosperity, New Life, Fruitfulness, Spiritual Growth, Healing, Divine Rest, Victory',
    biblicalReference: 'Psalm 1:3, Psalm 23:2',
    accentClass: 'border-emerald-400 text-emerald-950 bg-gradient-to-br from-emerald-300 to-emerald-500',
  },
  {
    name: 'Black',
    hex: '#0F172A',
    spiritualMeaning: 'Death to Flesh, Humility, Holy Reverence, Fear of the Lord, Total Consecration',
    biblicalReference: 'Galatians 2:20, Proverbs 9:10',
    accentClass: 'border-slate-700 text-slate-100 bg-slate-900',
  },
];

export const MINISTRIES = [
  {
    id: 'men',
    name: 'Men of Valor',
    tagline: 'Pillars of Strength & Spiritual Leaders',
    description: 'Empowering fathers, husbands, and young men to step boldly into kingdom leadership, family stewardship, and community impact.',
    schedule: 'Every 2nd & 4th Saturday at 5:00 PM',
    iconName: 'Shield',
    gradient: 'from-blue-600/20 to-indigo-900/30',
    borderGlow: 'hover:border-blue-500/50',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    id: 'women',
    name: "Women of Grace & Honor",
    tagline: 'Virtue, Prayer & Sisterhood',
    description: 'A vibrant fellowship fostering godly character, prayer intercession, family building, and entrepreneurial development for all women.',
    schedule: 'Every 1st & 3rd Saturday at 4:30 PM',
    iconName: 'Heart',
    gradient: 'from-pink-600/20 to-rose-900/30',
    borderGlow: 'hover:border-rose-500/50',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  },
  {
    id: 'youth',
    name: 'Youth Alive (NextGen)',
    tagline: 'Igniting Purpose & Passion for Christ',
    description: 'Dynamic meetings for teens and young adults featuring modern worship, career mentoring, relationship forums, and street evangelism.',
    schedule: 'Every Saturday at 4:00 PM',
    iconName: 'Flame',
    gradient: 'from-orange-600/20 to-amber-900/30',
    borderGlow: 'hover:border-amber-500/50',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    id: 'worship',
    name: 'Levites Worship Arts',
    tagline: 'Leading the Congregation into His Presence',
    description: 'Anointed vocalists, instrumentalists, sound engineers, and creative media ministers crafting sacred encounters through worship.',
    schedule: 'Rehearsals: Friday 6:00 PM & Saturday 3:00 PM',
    iconName: 'Music',
    gradient: 'from-purple-600/20 to-violet-900/30',
    borderGlow: 'hover:border-purple-500/50',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    id: 'kids',
    name: 'Kids Court (Children Ministry)',
    tagline: 'Raising the Next Generation of Believers',
    description: 'A loving, safe, and fun environment where children discover Bible truths, memory verses, songs, and godly values tailored for their ages.',
    schedule: 'Every Sunday during Main Service',
    iconName: 'Baby',
    gradient: 'from-emerald-600/20 to-teal-900/30',
    borderGlow: 'hover:border-emerald-500/50',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    id: 'missions',
    name: 'Global Outreach & Welfare',
    tagline: 'Touching Lives & Planting Churches',
    description: 'Active outreach providing medical aid, food parcels, clothes, and school fees to the underprivileged while spreading the saving grace of Jesus.',
    schedule: 'Monthly Community Outreaches',
    iconName: 'Globe',
    gradient: 'from-cyan-600/20 to-blue-900/30',
    borderGlow: 'hover:border-cyan-500/50',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
];

export const UPCOMING_EVENTS = [
  {
    id: 'ev-1',
    title: 'Divine Manifestation Annual Convention 2026',
    date: 'April 20 – 26, 2026',
    time: '6:00 PM Daily | Sunday 8:30 AM',
    location: 'Mallam Main Sanctuary & Online',
    category: 'Annual Conference',
    description: 'Our flagship spiritual gathering with Overseer Rev. Nicholas Dobeng and guest ministers. A week of glory, healing, and open doors.',
    isFeatured: true,
  },
  {
    id: 'ev-2',
    title: 'All-Night Prophetic Intercession & Breakthrough',
    date: 'Last Friday of Every Month',
    time: '10:00 PM – 4:30 AM',
    location: 'Mallam Main Sanctuary',
    category: 'Vigil',
    description: 'Wrestling in prayer for our families, destinies, and businesses until the clouds drop with divine rain.',
  },
  {
    id: 'ev-3',
    title: 'Touching Lives Community Health & Welfare Outreach',
    date: 'May 16, 2026',
    time: '8:00 AM – 3:00 PM',
    location: 'Kokrobitey Community Grounds',
    category: 'Missions',
    description: 'Free medical screening, distribution of clothing & food supplies, and soul-winning ministration.',
  },
  {
    id: 'ev-4',
    title: 'Youth Ignition & Talent Showcase',
    date: 'June 6, 2026',
    time: '2:00 PM – 6:00 PM',
    location: 'Langma Sanctuary',
    category: 'Youth',
    description: 'Creative arts, spoken word, praise jam, and career mentorship for all high school and university students.',
  },
];

export const SPONSORSHIP_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Community Welfare & Orphanage Outreach',
    category: 'Compassion & Mercy',
    target: 'GHS 45,000',
    raised: 'GHS 28,500',
    percent: 63,
    description: 'Providing nutritious meals, shelter assistance, clean drinking water, and back-to-school packs for 100+ children in need.',
    impact: '120+ Children supported monthly',
  },
  {
    id: 'proj-2',
    title: 'Rural Church Planting & Missions Crusades',
    category: 'Evangelism & Missions',
    target: 'GHS 60,000',
    raised: 'GHS 41,200',
    percent: 68,
    description: 'Equipping mission teams with PA systems, Bibles, and logistics to conduct open-air crusades in unreached coastal and rural villages.',
    impact: '3 New branch plants targeted this year',
  },
  {
    id: 'proj-3',
    title: 'Youth & Underprivileged Student Scholarships',
    category: 'Education',
    target: 'GHS 35,000',
    raised: 'GHS 22,000',
    percent: 62,
    description: 'Funding tuition, exam fees, and vocational training for brilliant young minds from low-income families in our church community.',
    impact: '24 Students actively enrolled in school',
  },
  {
    id: 'proj-4',
    title: 'Sanctuary Expansion & Broadcast Studio',
    category: 'Church Infrastructure',
    target: 'GHS 120,000',
    raised: 'GHS 84,000',
    percent: 70,
    description: 'Upgrading auditorium seating, acoustic treatment, high-definition streaming cameras, and audio mixing consoles for global digital broadcast.',
    impact: 'Reaching 50,000+ online viewers weekly',
  },
];

export const FAQS = [
  {
    q: 'What should I expect on my first visit to RICGCW?',
    a: 'You will receive a warm, royal welcome by our hospitality team! Our services feature spirit-filled worship, fervent prayers, deep scripture-based preaching, and personal ministry. Dress comfortably in your Sunday best.',
  },
  {
    q: 'How can I submit a prayer request or speak with a Pastor?',
    a: 'You can submit your prayer request anytime via the online Prayer Request form on this website or call our pastoral hotline directly at +233 244 485 7403. Every request is kept strictly confidential.',
  },
  {
    q: 'Do you have programs for children and teenagers?',
    a: 'Yes! Kids Court provides fun, age-appropriate Bible teaching and care during all Sunday services. Youth Alive meets weekly with tailored sessions for teenagers and young adults.',
  },
  {
    q: 'How do I pay tithes, offerings, or sponsor a church project?',
    a: 'We accept Mobile Money (MTN MoMo: 024 448 5740 / Telecel Cash) and direct Bank Wire transfers. You can view full giving channels on our Giving & Sponsorship pages.',
  },
];

export const IMAGES = {
  logo: logoImg,
  theme: themeImg,
  pastors: pastorsGroupImg,
  overseer: overseerImg,
  pastor2: pastorImg2,
  couple1: coupleImg1,
  couple2: coupleImg2,
};
