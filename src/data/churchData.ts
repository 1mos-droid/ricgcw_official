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
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  isFeatured?: boolean;
}

export interface MinistryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  schedule: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export interface SponsorshipProject {
  id: string;
  title: string;
  category: string;
  target: string;
  raised: string;
  percent: number;
  description: string;
  impact: string;
}

export interface SponsorshipStat {
  id: string;
  label: string;
  value: string;
  iconName: 'Users' | 'Gift' | 'Globe' | 'Calendar' | 'Heart' | 'Sparkles' | 'ShieldCheck';
  color?: string;
}

export interface SponsorshipSettings {
  badge: string;
  headline: string;
  subtitle: string;
  gatewayBadge: string;
  gatewayTitle: string;
  gatewaySubtitle: string;
  ctaButtonText: string;
}

export interface GivingConfig {
  paystackPublicKey: string;
  subaccount: string;
  enabled: boolean;
  defaultCurrency: string;
  supportedCurrencies: string[];
  categories: string[];
}

export const CHURCH_INFO = {
  name: 'Rhema Inner Court Gospel Church (Worldwide)',
  shortName: 'RICGCW',
  themeYear: '2026',
  themeTitle: 'Divine Manifestation',
  themeSubtitle: 'Touching Lives Worldwide',
  founder: {
    name: 'Rev. Nicholas Dobeng',
    title: 'General Overseer & Founder',
    quote: "We don't just build church buildings; we build people who build the kingdom of God across every sphere of life.",
  },
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
  coreValues: [
    {
      title: 'Passionate Worship',
      desc: 'Authentic praise and prayer that ushers believers directly into the tangible glory of God’s inner court.',
      iconName: 'Heart',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      title: 'Global Evangelism',
      desc: 'Reaching the unreached, planting vibrant churches, and carrying the Gospel to the ends of the earth.',
      iconName: 'Globe2',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      title: 'Biblical Integrity',
      desc: 'Living a consecrated life of godly character, marital faithfulness, and uncompromised Christian ethics.',
      iconName: 'ShieldCheck',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Taking Territories',
      desc: 'Empowering saints to dominate in their careers, businesses, leadership, and kingdom assignments.',
      iconName: 'Target',
      color: 'text-orange-600 bg-orange-50 border-orange-200',
    },
  ],
  coreCommitments: [
    'Uncompromised Biblical Gospel Preaching',
    'Prophetic Deliverance & Breakthrough Altars',
    'Warm Community & Loving Fellowship',
    'Comprehensive Care for Spiritual & Physical Needs',
  ],
  definitions: [
    {
      term: 'Rhema (ῥῆμα)',
      meaning: 'A Greek term in the New Testament referring to a specific, "spoken utterance" from God. A quickened, timely word applied directly by the Holy Spirit to transform a believer’s situation.',
    },
    {
      term: 'Inner',
      meaning: 'Inside and close to the divine center. Passing beyond the outer realm into intimate communion with the presence and majesty of the King of kings.',
    },
    {
      term: 'Court',
      meaning: 'A sacred assembly and royal throne-room where divine justice, covenants, prayers, and kingdom decrees are established.',
    },
    {
      term: 'Gospel',
      meaning: 'Glad tidings and good news concerning Jesus Christ, salvation, power, righteousness, and eternal life for all humanity.',
    },
    {
      term: 'Church (Worldwide)',
      meaning: 'The global body of consecrated believers; the royal priesthood called out of darkness to take territories across every nation.',
    },
  ],
  loyaltyCulture: {
    quote: "RICGCW believes in our HEAD PASTOR and the ASSOCIATES, also the LEADERS and all the DEPARTMENTAL HEAD EXECUTIVES as well as all the MEMBERS too. We do not speak evil things and will not allow anybody from within or outside to speak evil about them — internally (inside the church) or externally (outside the church). This is the way we think and do our things as a LOYAL PEOPLE unto God.",
    scripture: 'Proverbs 21:21',
  },
  contact: {
    phone: '+233 244 485 7403',
    email: 'innercourtch@gmail.com',
    location: 'Accra, Ghana (West Africa)',
    youtube: 'https://youtube.com/@innercourtgospelchurchworl2293',
    instagram: 'https://www.instagram.com/ofttouchinglives',
    facebook: 'https://www.facebook.com/share/1CT6hkuLu8/',
  },
  giving: {
    paystackPublicKey: 'pk_live_69d9908ea14c21c0a62234144c12414fe8f8d1a7',
    subaccount: 'ACCT_cm4xpwb0z8y7xou',
    enabled: true,
    defaultCurrency: 'GHS',
    supportedCurrencies: ['GHS', 'USD', 'GBP', 'EUR'],
    categories: [
      'Tithe',
      'Offering',
      '2026 Theme Covenant Seed',
      'Sanctuary Expansion & Building',
      'Rural Missions & Outreach',
      'Community Welfare & Orphanage',
      'Youth & Education Scholarship',
    ],
  } as GivingConfig,
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
    email: 'innercourtch@gmail.com',
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
    email: 'innercourtch@gmail.com',
    pastor: 'Pastoral Council',
    services: [
      {
        day: 'Sunday',
        time: '7:00 AM – 9:00 AM',
        name: 'Early Morning Divine Encounter Service',
        description: 'Start your Lord\'s day in reverence, passionate prayer, and life-changing ministry.',
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
    email: 'innercourtch@gmail.com',
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
  },
  {
    name: 'Gold',
    hex: '#FFD700',
    spiritualMeaning: 'Glory of God, Divine Nature, Refining Process, Kingship, Wisdom, Truth, Anointing Oil',
    biblicalReference: '1 Peter 1:7, Revelation 3:18',
  },
  {
    name: 'Deep Orange',
    hex: '#FF4500',
    spiritualMeaning: 'Holy Spirit Fire, Prophetic Ministry, Harvest, Zeal, Strength, Endurance, Awakening',
    biblicalReference: 'Acts 2:3, Matthew 3:11',
  },
  {
    name: 'Lemon Green',
    hex: '#32CD32',
    spiritualMeaning: 'Prosperity, New Life, Fruitfulness, Spiritual Growth, Healing, Divine Rest, Victory',
    biblicalReference: 'Psalm 1:3, Psalm 23:2',
  },
  {
    name: 'Black',
    hex: '#0F172A',
    spiritualMeaning: 'Death to Flesh, Humility, Holy Reverence, Fear of the Lord, Total Consecration',
    biblicalReference: 'Galatians 2:20, Proverbs 9:10',
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
  },
  {
    id: 'women',
    name: "Women of Grace & Honor",
    tagline: 'Virtue, Prayer & Sisterhood',
    description: 'A vibrant fellowship fostering godly character, prayer intercession, family building, and entrepreneurial development for all women.',
    schedule: 'Every 1st & 3rd Saturday at 4:30 PM',
    iconName: 'Heart',
  },
  {
    id: 'youth',
    name: 'Youth Alive (NextGen)',
    tagline: 'Igniting Purpose & Passion for Christ',
    description: 'Dynamic meetings for teens and young adults featuring modern worship, career mentoring, relationship forums, and street evangelism.',
    schedule: 'Every Saturday at 4:00 PM',
    iconName: 'Flame',
  },
  {
    id: 'worship',
    name: 'Levites Worship Arts',
    tagline: 'Leading the Congregation into His Presence',
    description: 'Anointed vocalists, instrumentalists, sound engineers, and creative media ministers crafting sacred encounters through worship.',
    schedule: 'Rehearsals: Friday 6:00 PM & Saturday 3:00 PM',
    iconName: 'Music',
  },
  {
    id: 'kids',
    name: 'Kids Court (Children Ministry)',
    tagline: 'Raising the Next Generation of Believers',
    description: 'A loving, safe, and fun environment where children discover Bible truths, memory verses, songs, and godly values tailored for their ages.',
    schedule: 'Every Sunday during Main Service',
    iconName: 'Baby',
  },
  {
    id: 'missions',
    name: 'Global Outreach & Welfare',
    tagline: 'Touching Lives & Planting Churches',
    description: 'Active outreach providing medical aid, food parcels, clothes, and school fees to the underprivileged while spreading the saving grace of Jesus.',
    schedule: 'Monthly Community Outreaches',
    iconName: 'Globe',
  },
];

export const UPCOMING_EVENTS: EventItem[] = [];


export const SPONSORSHIP_PROJECTS: SponsorshipProject[] = [];


export const DEFAULT_SPONSORSHIP_STATS: SponsorshipStat[] = [
  {
    id: 'stat-3',
    label: 'Active Sanctuaries',
    value: '3',
    iconName: 'Globe',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
];


export const DEFAULT_SPONSORSHIP_SETTINGS: SponsorshipSettings = {
  badge: 'Kingdom Partnership & Sponsorship',
  headline: "Partner with God's Work to Touch Lives Worldwide.",
  subtitle: 'Your financial seeds and sponsorship empower us to spread the Gospel, provide welfare to orphanages, support rural crusades, and expand church sanctuaries across Ghana and beyond.',
  gatewayBadge: 'Paystack Instant Gateway',
  gatewayTitle: 'One-Click Online Giving & Project Sponsorship',
  gatewaySubtitle: 'Send tithes, offerings, covenant seeds, and project donations securely in seconds using MTN Mobile Money, Telecel Cash, AT Money, Visa, Mastercard, or Apple Pay.',
  ctaButtonText: 'Give Online Now',
};

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    q: 'What should I expect on my first visit to RICGCW?',
    a: 'You will receive a warm, royal welcome by our hospitality team! Our services feature spirit-filled worship, fervent prayers, deep scripture-based preaching, and personal ministry. Dress comfortably in your Sunday best.',
  },
  {
    id: 'faq-2',
    q: 'How can I submit a prayer request or speak with a Pastor?',
    a: 'You can submit your prayer request anytime via the online Prayer Request form on this website or call our pastoral hotline directly at +233 244 485 7403. Every request is kept strictly confidential.',
  },
  {
    id: 'faq-3',
    q: 'Do you have programs for children and teenagers?',
    a: 'Yes! Kids Court provides fun, age-appropriate Bible teaching and care during all Sunday services. Youth Alive meets weekly with tailored sessions for teenagers and young adults.',
  },
  {
    id: 'faq-4',
    q: 'How can I pay tithes, offerings, or sponsor a kingdom project online?',
    a: 'You can give seamlessly online through our secure payment gateway which supports Mobile Money (MTN MoMo, Telecel Cash, AT Money), Visa, Mastercard, and Bank Cards.',
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
