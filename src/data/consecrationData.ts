export interface ProcessionMember {
  id: string;
  letter: string;
  role: string;
  description: string;
  iconName: string;
  vesture?: string;
  symbolism?: string;
}

export interface ProgramItem {
  id: number;
  order: number;
  title: string;
  subtitle?: string;
  category: 'procession' | 'liturgy' | 'word' | 'vows' | 'anointing' | 'vestments' | 'giving' | 'addresses' | 'recession';
  description?: string;
  details?: string;
  scriptureRef?: string;
  scriptureText?: string;
  orderList?: ProcessionMember[];
  hymnTitle?: string;
  hymnRefrain?: string;
  hymnStanzas?: string[];
  ceremonialNote?: string;
  actionRequired?: string;
  isMilestone?: boolean;
}

export interface SacredSymbol {
  id: string;
  name: string;
  title: string;
  scripture: string;
  meaning: string;
  ceremonyRole: string;
  iconName: string;
}

export const CONSECRATION_SERVICE_METADATA = {
  churchName: 'Rhema Inner Court Gospel Church (Worldwide)',
  acronym: 'RICGCW',
  eventTitle: 'Solemn Episcopal Consecration & Sacred Ordination Service',
  eventSubtitle: 'Inner Court: Where Sacrifices Are Made Unto Heaven',
  themeYear: '2026',
  themeMotto: 'Divine Manifestation • Perfecting the Saints • Taking Territories',
  date: 'September 2026',
  location: 'Main Sanctuary & International Cathedral, Accra, Ghana',
  scripturalAnchor: {
    verse: 'Now it came to pass on the third day, that Esther put on her royal apparel, and stood in the inner court of the king’s house...',
    ref: 'Esther 5:1',
  },
  chiefConsecrator: {
    role: 'Chief Consecrator & Presiding Prelate',
    description: 'Bearer of the Apostolic Mantle & Sacred Episcopacy',
  },
};

export const CONSECRATION_PROGRAM: ProgramItem[] = [
  {
    id: 1,
    order: 1,
    title: 'OPENING PRAYER / INTRODUCTION OF PROCESSION',
    subtitle: 'Sanctification of the Temple & Holy Invocation',
    category: 'procession',
    description: 'The sacred invocation opening the heavens, consecrating the sanctuary atmosphere, and heralding the entrance of the liturgical procession.',
    ceremonialNote: 'The congregation stands in solemn reverence as the opening prayer is offered and the procession is announced.',
    actionRequired: 'Congregation stands in reverence',
    isMilestone: true,
  },
  {
    id: 2,
    order: 2,
    title: 'SONG MINISTRATION & ORDER OF PROCESSION',
    subtitle: 'Ceremonial Entrance into the Inner Court of the King',
    category: 'procession',
    description: 'Majestic processional entry of assisting ceremonial ministers, the candidate, guest bishops, sacred regalia bearers, and the Consecrating Bishop.',
    ceremonialNote: 'Solemn liturgical order of entry into the holy sanctuary according to ancient apostolic tradition.',
    orderList: [
      {
        id: 'proc-a',
        letter: 'a',
        role: 'Assisting Ceremonial Ministers',
        description: 'Bearing sacred vestments, pastoral staff, and holy Scriptures.',
        iconName: 'Scroll',
        vesture: 'Liturgical Altar Vestments',
        symbolism: 'Stewardship of the divine mysteries and service to the altar of God.',
      },
      {
        id: 'proc-b',
        letter: 'b',
        role: 'The Candidate',
        description: 'Entering in humble surrender before the Lord.',
        iconName: 'UserCheck',
        vesture: 'White Cassock',
        symbolism: 'Symbolizing purity, total submission, and readiness for sacred consecration.',
      },
      {
        id: 'proc-c',
        letter: 'c',
        role: 'Fully Robed Guest Bishops & Assisting Bishops',
        description: 'Distinguished apostolic council and ecumenical witnesses.',
        iconName: 'Users',
        vesture: 'Episcopal Robes & Regalia',
        symbolism: 'The apostolic succession and unity of the global body of Christ.',
      },
      {
        id: 'proc-d',
        letter: 'd',
        role: 'Bearer of the Consecrating Bishop’s Sword',
        description: 'Carrying the ceremonial Sword of Truth and Victory.',
        iconName: 'Shield',
        vesture: 'Ceremonial Robe',
        symbolism: 'The Sword of the Spirit, defending orthodoxy and taking territorial dominion.',
      },
      {
        id: 'proc-e',
        letter: 'e',
        role: 'Bearer of the Consecrating Bishop’s Bible',
        description: 'Elevating the Holy Scriptures of the Living God.',
        iconName: 'BookOpen',
        vesture: 'Ceremonial Robe',
        symbolism: 'The uncompromised Word of God as the sole supreme authority of faith.',
      },
      {
        id: 'proc-f',
        letter: 'f',
        role: 'Bearer of the Consecrating Bishop’s Staff',
        description: 'Bearing the Episcopal Pastoral Crozier.',
        iconName: 'Award',
        vesture: 'Ceremonial Robe',
        symbolism: 'The shepherd’s authority, pastoral vigilance, and ecclesiastical discipline.',
      },
      {
        id: 'proc-g',
        letter: 'g',
        role: 'The Consecrating Bishop',
        description: 'Chief Consecrator & Presiding Prelate.',
        iconName: 'Crown',
        vesture: 'Full Episcopal Vestments wearing Mitre on skull cap for procession',
        symbolism: 'Apostolic headship, ministerial unction, and episcopal oversight.',
      },
    ],
    isMilestone: true,
  },
  {
    id: 3,
    order: 3,
    title: 'REMOVAL OF MITRE',
    subtitle: 'Humility Before the Throne of the King of Kings',
    category: 'liturgy',
    description: 'The Consecrating Bishop removes the Episcopal Mitre upon approaching the holy altar, signifying total submission and reverence before Almighty God.',
    ceremonialNote: 'The Bishop bows before the altar and deposits the mitre, acknowledging that Christ alone is the Chief Shepherd and Bishop of our souls.',
  },
  {
    id: 4,
    order: 4,
    title: 'PRAYER BY CONSECRATING BISHOP',
    subtitle: 'Sacerdotal Altar Intercession',
    category: 'liturgy',
    description: 'The Presiding Prelate offers the solemn episcopal opening prayer, consecrating the service and calling down the manifest glory of God.',
  },
  {
    id: 5,
    order: 5,
    title: 'PURPOSE OF SERVICE',
    subtitle: 'The Canonical Warrant & Ecclesial Mandate',
    category: 'liturgy',
    description: 'Reading and declaration of the sacred purpose, biblical justification, and ecclesiastical warrant for the Episcopal Consecration.',
    ceremonialNote: 'Establishment of the divine authority and biblical heritage of the Episcopate (1 Timothy 3:1, Titus 1:5).',
  },
  {
    id: 6,
    order: 6,
    title: 'PRAYER',
    subtitle: 'Congregational Supplication & Spiritual Alignment',
    category: 'liturgy',
    description: 'General congregational prayer committing the assembly and the consecration rite into God’s sovereign hands.',
  },
  {
    id: 7,
    order: 7,
    title: 'READING OF PROFILE',
    subtitle: 'Citation of the Candidate’s Ministerial Mandate & Life',
    category: 'liturgy',
    description: 'Formal reading of the profile, spiritual lineage, ministerial achievements, character, and testimony of the candidate being consecrated.',
    ceremonialNote: 'Public witness and affirmation of the candidate’s godly character and lifelong labor in the vineyard of the Lord.',
    isMilestone: true,
  },
  {
    id: 8,
    order: 8,
    title: 'SONGS',
    subtitle: 'Worship & Choral Elevation',
    category: 'liturgy',
    description: 'Sacred musical ministrations elevating the congregation into intimate fellowship in the Inner Court.',
  },
  {
    id: 9,
    order: 9,
    title: 'FIRST SCRIPTURE READING (Hebrews 5:1-10)',
    subtitle: 'The Calling, Order, and Priesthood of Christ',
    category: 'word',
    scriptureRef: 'Hebrews 5:1-10',
    description: 'Scriptural reading declaring the divine origin of the priesthood: "And no man taketh this honour unto himself, but he that is called of God, as was Aaron."',
    scriptureText: `1 For every high priest taken from among men is ordained for men in things pertaining to God, that he may offer both gifts and sacrifices for sins:
2 Who can have compassion on the ignorant, and on them that are out of the way; for that he himself also is compassed with infirmity.
3 And by reason hereof he ought, as for the people, so also for himself, to offer for sins.
4 And no man taketh this honour unto himself, but he that is called of God, as was Aaron.
5 So also Christ glorified not himself to be made an high priest; but he that said unto him, Thou art my Son, to day have I begotten thee.
6 As he saith also in another place, Thou art a priest for ever after the order of Melchisedec.
7 Who in the days of his flesh, when he had offered up prayers and supplications with strong crying and tears unto him that was able to save him from death, and was heard in that he feared;
8 Though he were a Son, yet learned he obedience by the things which he suffered;
9 And being made perfect, he became the author of eternal salvation unto all them that obey him;
10 Called of God an high priest after the order of Melchisedec.`,
    isMilestone: true,
  },
  {
    id: 10,
    order: 10,
    title: 'SPECIAL SONGS BY PSALMIST',
    subtitle: 'Prophetic Ministration in Song',
    category: 'word',
    description: 'Heartfelt psalmody and prophetic melodies preparing hearts for the proclamation of the second holy scripture.',
  },
  {
    id: 11,
    order: 11,
    title: 'SECOND SCRIPTURE READING (Isaiah 42:1-9)',
    subtitle: 'The Chosen Servant Endued with the Spirit',
    category: 'word',
    scriptureRef: 'Isaiah 42:1-9',
    description: 'Prophetic proclamation of the Servant of the Lord: "Behold my servant, whom I uphold; mine elect, in whom my soul delighteth; I have put my spirit upon him..."',
    scriptureText: `1 Behold my servant, whom I uphold; mine elect, in whom my soul delighteth; I have put my spirit upon him: he shall bring forth judgment to the Gentiles.
2 He shall not cry, nor lift up, nor cause his voice to be heard in the street.
3 A bruised reed shall he not break, and the smoking flax shall he not quench: he shall bring forth judgment unto truth.
4 He shall not fail nor be discouraged, till he have set judgment in the earth: and the isles shall wait for his law.
5 Thus saith God the LORD, he that created the heavens, and stretched them out; he that spread forth the earth, and that which cometh out of it; he that giveth breath unto the people upon it, and spirit to them that walk therein:
6 I the LORD have called thee in righteousness, and will hold thine hand, and will keep thee, and give thee for a covenant of the people, for a light of the Gentiles;
7 To open the blind eyes, to bring out the prisoners from the prison, and them that sit in darkness out of the prison house.
8 I am the LORD: that is my name: and my glory will I not give to another, neither my praise to graven images.
9 Behold, the former things are come to pass, and new things do I declare: before they spring forth I tell you of them.`,
    isMilestone: true,
  },
  {
    id: 12,
    order: 12,
    title: 'SPECIAL SONGS BY PSALMIST',
    subtitle: 'Sacred Anthem of Divine Elevation',
    category: 'word',
    description: 'Anointed worship preparing the atmosphere for the solemn administration of Consecration Vows.',
  },
  {
    id: 13,
    order: 13,
    title: 'CONSECRATION VOWS',
    subtitle: 'Solemn Covenant Oaths of Apostolic Stewardship',
    category: 'vows',
    description: 'The candidate stands before God, the Presiding Bishops, and the congregation to answer the sacred canonical interrogatories and make eternal covenants of faithfulness.',
    ceremonialNote: 'The Candidate swears fidelity to the Word of God, doctrinal purity, holiness, pastoral vigilance, and sacrificial servant-leadership.',
    isMilestone: true,
  },
  {
    id: 14,
    order: 14,
    title: 'PRAYER',
    subtitle: 'Sacerdotal Sealing of the Vows',
    category: 'vows',
    description: 'Prayer of divine acceptance and fortification following the solemn oath of office.',
  },
  {
    id: 15,
    order: 15,
    title: 'ASK CONGREGATION TO STAND AND ADDRESS THEM',
    subtitle: 'The Ecclesial Covenant with the Assembly',
    category: 'vows',
    description: 'The Consecrating Bishop charges the congregation, demanding their covenant pledge of honor, prayer, obedience, and kingdom support for the new Episcopate.',
    actionRequired: 'Entire congregation stands to receive the episcopal charge',
  },
  {
    id: 16,
    order: 16,
    title: 'PRAYERS AND ANOINTING OF CANDIDATE WITH HORN OF OIL',
    subtitle: 'The Imposition of Hands & Holy Consecration',
    category: 'anointing',
    description: 'The College of Bishops lays hands on the candidate while the Consecrating Bishop pours sacred oil from the Biblical horn upon his head, imparting the episcopal apostolic mantle.',
    ceremonialNote: 'Symbolizes the unbroken apostolic lineage, the fragrant unction of Psalm 133, and the empowerment of the Holy Ghost for extraordinary kingdom exploits.',
    isMilestone: true,
  },
  {
    id: 17,
    order: 17,
    title: 'COMMUNION FOR NEW CANDIDATE',
    subtitle: 'The Lord’s Table & Eucharistic Fellowship',
    category: 'anointing',
    description: 'The newly consecrated leader partakes of the Holy Eucharist at the altar, entering into the eternal covenant of the body and blood of Jesus Christ.',
    ceremonialNote: 'First sacred communion received in the newly consecrated episcopal office.',
    isMilestone: true,
  },
  {
    id: 18,
    order: 18,
    title: 'PRESENTATION OF THE VESTMENTS',
    subtitle: 'Sacred Investiture with Episcopal Robes & Regalia',
    category: 'vestments',
    description: 'The Candidate is vested in the full liturgical apparel of an Overseer/Bishop: the Cassock, Cincture, Chimere, Rochet, Tippet, Stole, Pectoral Cross, and Episcopal Ring.',
    ceremonialNote: 'Vestments represent dignity, holy office, spiritual covering, and the beauty of holiness in royal apparel (Esther 5:1).',
    isMilestone: true,
  },
  {
    id: 19,
    order: 19,
    title: 'PRESENTATION OF THE BIBLE',
    subtitle: 'Bestowal of the Sword of the Spirit',
    category: 'vestments',
    description: 'The Holy Bible is presented into the hands of the new Bishop with the charge: "Take heed unto thyself, and unto the doctrine; preach the Word with all boldness and wisdom."',
  },
  {
    id: 20,
    order: 20,
    title: 'PRESENTATION OF THE CERTIFICATE AND LICENSE',
    subtitle: 'Canonical Credentials & Ecumenical Authority',
    category: 'vestments',
    description: 'Formal bestowal of the official episcopal charter, ecclesiastical certificate of consecration, and worldwide ministerial license.',
  },
  {
    id: 21,
    order: 21,
    title: 'SPECIAL SONGS',
    subtitle: 'Joyful Jubilee & Celebration',
    category: 'vestments',
    description: 'Jubilant praise and thanksgiving honoring God for the historic elevation and consecration.',
  },
  {
    id: 22,
    order: 22,
    title: 'PRESENTATION OF THE OVERSEER / BISHOP',
    subtitle: 'Official Public Unveiling to the Global Church',
    category: 'vestments',
    description: 'The Chief Consecrator presents the newly robed and consecrated Overseer/Bishop to the body of Christ, heralding his new title and episcopal authority.',
    ceremonialNote: 'The congregation erupts in thunderous praise, standing ovation, and kingdom celebration.',
    isMilestone: true,
  },
  {
    id: 23,
    order: 23,
    title: 'FIRST OFFERING',
    subtitle: 'Sacrificial Altar Giving & Kingdom Support',
    category: 'giving',
    description: 'Congregational giving and seed sowing into the consecrated altar of God.',
    ceremonialNote: 'Attendees may give directly through the digital portal or ceremonial offering envelopes.',
  },
  {
    id: 24,
    order: 24,
    title: 'SERMON',
    subtitle: 'The Apostolic Proclamation of the Word',
    category: 'word',
    description: 'The divine word of revelation and charge preached by the guest prelates or consecrating bishop to anchor the spiritual mantle.',
    isMilestone: true,
  },
  {
    id: 25,
    order: 25,
    title: 'SPEECHES OF GUEST BISHOPS / APOSTLES IN ROBES',
    subtitle: 'Fraternal Apostolic Goodwill & Blessings',
    category: 'addresses',
    description: 'Congratulatory addresses, episcopal exhortations, and prophetic blessings delivered by guest fathers, bishops, and apostles.',
  },
  {
    id: 26,
    order: 26,
    title: 'MAIDEN SPEECHES OF THE NEW BISHOP OR OVERSEER',
    subtitle: 'Inaugural Apostolic Address & Vision Declaration',
    category: 'addresses',
    description: 'The newly consecrated Bishop/Overseer addresses the church for the first time in his elevated capacity, laying out vision, gratitude, and prophetic charge.',
    ceremonialNote: 'A historic moment marking the beginning of a fresh apostolic era in the church worldwide.',
    isMilestone: true,
  },
  {
    id: 27,
    order: 27,
    title: 'SECOND OFFERING',
    subtitle: 'Love Offering & Consecration Thanksgiving Seed',
    category: 'giving',
    description: 'Special thanksgiving offering honoring the newly consecrated leadership and supporting the worldwide work of the ministry.',
  },
  {
    id: 28,
    order: 28,
    title: 'CLOSING PRAYER',
    subtitle: 'Final Sacerdotal Benediction',
    category: 'liturgy',
    description: 'Solemn closing prayer and apostolic benediction pronounced over the assembly and global viewership.',
  },
  {
    id: 29,
    order: 29,
    title: 'RECESSIONAL TEAM LINE UP FOR RECESSION',
    subtitle: 'Assembly of the Liturgical Exit Guard',
    category: 'recession',
    description: 'The ceremonial ministers, guest prelates, and new bishops take their designated positions for the royal recession.',
  },
  {
    id: 30,
    order: 30,
    title: 'ORDER OF RECESSION',
    subtitle: 'Triumphant Royal Liturgical Departure',
    category: 'recession',
    description: 'The majestic recessional exit of the newly consecrated leadership, bishops, and ceremonial guard in sacred protocol.',
    orderList: [
      {
        id: 'rec-a',
        letter: 'a',
        role: 'New Bishops / Apostles / Prophets',
        description: 'Each triumphantly holding his own sacred staff.',
        iconName: 'Award',
        vesture: 'Full Episcopal / Apostolic Vestments with Pastoral Staff',
        symbolism: 'Equipped and commissioned to shepherd the flock of God worldwide.',
      },
      {
        id: 'rec-b',
        letter: 'b',
        role: 'Assisting Ceremonial Ministers',
        description: 'Bearing Bibles and Official Certificates of the New Bishop.',
        iconName: 'Scroll',
        vesture: 'Liturgical Altar Vestments',
        symbolism: 'Guardians of the holy credentials and Word of Life.',
      },
      {
        id: 'rec-c',
        letter: 'c',
        role: 'Guest / Fully Robed Bishops',
        description: 'The distinguished college of prelates.',
        iconName: 'Users',
        vesture: 'Episcopal Robes',
        symbolism: 'Ecumenical fellowship and worldwide church unity.',
      },
      {
        id: 'rec-d',
        letter: 'd',
        role: 'Bearer of the Consecrating Bishop’s Sword',
        description: 'Carrying the Sword of Victory and Spiritual Power.',
        iconName: 'Shield',
        vesture: 'Ceremonial Robe',
        symbolism: 'Continuing the spiritual warfare and kingdom conquest.',
      },
      {
        id: 'rec-e',
        letter: 'e',
        role: 'Bearer of the Consecrating Bishop’s Bible',
        description: 'Carrying the Holy Word of God.',
        iconName: 'BookOpen',
        vesture: 'Ceremonial Robe',
        symbolism: 'The everlasting Gospel enduring forever.',
      },
      {
        id: 'rec-f',
        letter: 'f',
        role: 'Bearer of the Consecrating Bishop’s Staff',
        description: 'Bearing the Chief Consecrator’s Crozier.',
        iconName: 'Award',
        vesture: 'Ceremonial Robe',
        symbolism: 'Enduring apostolic oversight.',
      },
      {
        id: 'rec-g',
        letter: 'g',
        role: 'The Consecrating Bishop',
        description: 'Presiding Prelate & Chief Consecrator.',
        iconName: 'Crown',
        vesture: 'Full Episcopal Vestments with Mitre',
        symbolism: 'The apex of episcopal leadership and spiritual parenthood.',
      },
      {
        id: 'rec-h',
        letter: 'h',
        role: 'The Clergy & Presbytery',
        description: 'Pastors, elders, and ministers of the gospel.',
        iconName: 'Users',
        vesture: 'Clerical Attire & Stoles',
        symbolism: 'The consecrated workforce advancing the harvest.',
      },
    ],
    isMilestone: true,
  },
  {
    id: 31,
    order: 31,
    title: 'WEARING OF THE MITRE FOR RECESSION',
    subtitle: 'Re-investiture of the Episcopal Crown of Office',
    category: 'recession',
    description: 'The Consecrating Bishop is ceremonially re-crowned with the Episcopal Mitre, representing apostolic authority as he leads the procession out of the sanctuary.',
  },
  {
    id: 32,
    order: 32,
    title: 'RECESSIONAL SONG: TO GOD BE THE GLORY',
    subtitle: 'Hymn of Eternal Doxology & Exaltation',
    category: 'recession',
    description: 'The entire assembly stands to lift their voices in triumphant praise: "To God be the glory, great things He hath done!"',
    hymnTitle: 'To God Be The Glory',
    hymnRefrain: 'Praise the Lord, praise the Lord, let the earth hear His voice! Praise the Lord, praise the Lord, let the people rejoice! O come to the Father, through Jesus the Son, and give Him the glory, great things He hath done!',
    hymnStanzas: [
      'To God be the glory, great things He hath done; So loved He the world that He gave us His Son, Who yielded His life an atonement for sin, And opened the life-gate that all may go in.',
      'O perfect redemption, the purchase of blood, To every believer the promise of God; The vilest offender who truly believes, That moment from Jesus a pardon receives.',
      'Great things He hath taught us, great things He hath done, And great our rejoicing through Jesus the Son; But purer, and higher, and greater will be Our wonder, our transport, when Jesus we see.',
    ],
    isMilestone: true,
  },
  {
    id: 33,
    order: 33,
    title: 'GREETINGS AND PHOTOGRAPHS',
    subtitle: 'Episcopal Felicitations & Fellowship',
    category: 'recession',
    description: 'Official portraits of the newly consecrated Overseer/Bishop with the College of Prelates, family, presbytery, and church community.',
  },
];

export const PASTOR_ORDINATION_PROGRAM: ProgramItem[] = [
  {
    id: 101,
    order: 1,
    title: 'PROCESSION',
    subtitle: 'Entrance of the Ordinands & Presbytery',
    category: 'procession',
    description: 'Solemn processional entrance of pastoral candidates, presiding elders, and church leaders into the presence of God.',
    isMilestone: true,
  },
  {
    id: 102,
    order: 2,
    title: 'PROCESSIONAL HYMN',
    subtitle: 'Sacred Hymn of Devotion & Surrender',
    category: 'procession',
    description: 'Congregational hymn of entrance setting an atmosphere of holy reverence and commitment.',
  },
  {
    id: 103,
    order: 3,
    title: 'DECLARATION OF PURPOSE',
    subtitle: 'The Holy Call & Scriptural Qualifications of a Pastor',
    category: 'liturgy',
    description: 'Declaration of the pastoral mandate according to 1 Timothy 3 and Titus 1, defining the shepherd’s heart to care for God’s flock.',
  },
  {
    id: 104,
    order: 4,
    title: 'READING OF PROFILE',
    subtitle: 'Presentation of Pastoral Candidates',
    category: 'liturgy',
    description: 'Testimony and citation of the candidates’ spiritual background, theological training, and faithful ministry in the house of God.',
    isMilestone: true,
  },
  {
    id: 105,
    order: 5,
    title: 'ORDINATION VOWS',
    subtitle: 'Sacred Vows of Pastoral Fidelity & Loyalty',
    category: 'vows',
    description: 'Ordinands answer the pastoral interrogatories, pledging unswerving loyalty to Christ, holiness of life, doctrinal truth, and devotion to the flock.',
    isMilestone: true,
  },
  {
    id: 106,
    order: 6,
    title: 'ORDINATION PRAYERS',
    subtitle: 'Intercession & Spiritual Impartation',
    category: 'anointing',
    description: 'The presbytery gathers around the ordinands in solemn prayer for spiritual empowerment, wisdom, and pastoral protection.',
  },
  {
    id: 107,
    order: 7,
    title: 'OFFERING AND SPECIAL SONGS',
    subtitle: 'Sacrificial Giving & Worship',
    category: 'giving',
    description: 'Congregational praise and offering honoring God’s faithfulness in providing pastors after His own heart (Jeremiah 3:15).',
  },
  {
    id: 108,
    order: 8,
    title: 'FIRST SCRIPTURE READING',
    subtitle: 'The Pastoral Epistle & Charge',
    category: 'word',
    scriptureRef: '1 Timothy 4:12-16',
    description: 'Scripture reading commanding the minister: "Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity."',
    scriptureText: `12 Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.
13 Till I come, give attendance to reading, to exhortation, to doctrine.
14 Neglect not the gift that is in thee, which was given thee by prophecy, with the laying on of the hands of the presbytery.
15 Meditate upon these things; give thyself wholly to them; that thy profiting may appear to all.
16 Take heed unto thyself, and unto the doctrine; continue in them: for in doing this thou shalt both save thyself, and them that hear thee.`,
    isMilestone: true,
  },
  {
    id: 109,
    order: 9,
    title: 'SPECIAL SONGS BY PSALMIST',
    subtitle: 'Sacred Ministration in Song',
    category: 'word',
    description: 'Anointed vocal ministry ushering the congregation into deeper worship before the holy investiture.',
  },
  {
    id: 110,
    order: 10,
    title: 'PRESENTATION OF CERTIFICATES, CROSS AND BIBLE, PRAYER, LAYING OF HANDS, ANOINTING WITH OIL',
    subtitle: 'Sacred Ordination Investiture & Seal',
    category: 'anointing',
    description: 'The Presiding Prelate and presbytery lay hands on each candidate, anoint their heads with consecrated oil, and present them with the Holy Bible, Pastoral Cross, and Ordination Certificate.',
    ceremonialNote: 'The sacred climax of ordination confirming them as duly ordained Pastors in the Church of God.',
    isMilestone: true,
  },
  {
    id: 111,
    order: 11,
    title: 'RECESSION',
    subtitle: 'Liturgical Departure of the Newly Ordained Pastors',
    category: 'recession',
    description: 'The newly ordained pastors lead out in joyful recession accompanied by the church presbytery.',
    isMilestone: true,
  },
  {
    id: 112,
    order: 12,
    title: 'SONG',
    subtitle: 'Congregational Doxology',
    category: 'recession',
    description: 'Triumphant praise as the congregation rejoices for new laborers sent into the harvest field.',
  },
  {
    id: 113,
    order: 13,
    title: 'OFFICIAL PICTURES TAKEN',
    subtitle: 'Archival Photography & Commemoration',
    category: 'recession',
    description: 'Official photographic session with the General Overseer, Presbytery, ordained ministers, and families.',
  },
];

export const SACRED_SYMBOLS: SacredSymbol[] = [
  {
    id: 'mitre',
    name: 'The Episcopal Mitre',
    title: 'Crown of Apostolic Oversight',
    scripture: 'Exodus 28:4, Revelation 1:6',
    meaning: 'Shaped with two peaks representing the Old and New Testaments, and the tongues of fire at Pentecost. It signifies apostolic headship. Removed in solemn prayer to acknowledge that Jesus Christ alone is Supreme.',
    ceremonyRole: 'Worn during the royal procession and recession, but reverently removed during altar prayers.',
    iconName: 'Crown',
  },
  {
    id: 'horn-oil',
    name: 'The Horn of Consecration Oil',
    title: 'Prophetic & Kingly Unction',
    scripture: '1 Samuel 16:13, Psalm 89:20',
    meaning: 'In ancient Israel, kings and priests were anointed not from a flask (fragile) but from a horn (symbolizing strength, power, and everlasting covenant). Consecrates the candidate for supernatural endurance.',
    ceremonyRole: 'Poured directly upon the candidate’s head by the Consecrating Bishop during the imposition of hands.',
    iconName: 'Sparkles',
  },
  {
    id: 'crozier',
    name: 'The Pastoral Staff (Crozier)',
    title: 'The Shepherd’s Crook & Authority',
    scripture: 'Psalm 23:4, 1 Peter 5:2-4',
    meaning: 'Carried in the left hand with the hook turned outward toward the flock, representing the duty to guide, pull back the straying sheep, and defend the flock from wolves.',
    ceremonyRole: 'Borne by the Staff Bearer in the procession and handed to the newly elevated Overseer/Bishop.',
    iconName: 'Award',
  },
  {
    id: 'sword',
    name: 'The Consecrating Sword',
    title: 'The Sword of the Spirit',
    scripture: 'Ephesians 6:17, Hebrews 4:12',
    meaning: 'Represents spiritual warfare, apostolic courage, and taking territories for the Kingdom of God. A pledge that the church shall prevail against the gates of hell.',
    ceremonyRole: 'Borne ceremonially before the Consecrating Bishop as a declaration of territorial dominion.',
    iconName: 'Shield',
  },
  {
    id: 'vestments',
    name: 'Episcopal Vestments & White Cassock',
    title: 'Royal Apparel & Holiness',
    scripture: 'Esther 5:1, Revelation 19:8',
    meaning: 'The white cassock signifies personal purity and spiritual rebirth; the rochet, chimere, and stole denote the dignity and holy gravity of the Episcopal office.',
    ceremonyRole: 'Candidate enters in a plain white cassock and is ceremonially vested after the consecration prayer.',
    iconName: 'Sparkles',
  },
  {
    id: 'bible',
    name: 'The Holy Scriptures',
    title: 'The Inerrant Word of God',
    scripture: '2 Timothy 4:1-5, Joshua 1:8',
    meaning: 'The supreme foundation of all Christian doctrine and life. Bestowed upon the minister as his chief weapon, daily guide, and divine commission.',
    ceremonyRole: 'Elevated during the procession and officially presented to the candidate with the apostolic charge.',
    iconName: 'BookOpen',
  },
  {
    id: 'pectoral-cross',
    name: 'The Pectoral Cross & Ring',
    title: 'Covenant over the Heart & Marriage to the Church',
    scripture: 'Galatians 6:14, Song of Solomon 8:6',
    meaning: 'The cross rests directly over the heart, symbolizing constant remembrance of the crucified Lord. The episcopal ring signifies solemn covenant fidelity and spiritual marriage to the flock.',
    ceremonyRole: 'Placed over the neck and upon the finger of the newly consecrated prelate.',
    iconName: 'Heart',
  },
];

export const HYMNS_AND_LITURGY = {
  recessionalHymn: {
    title: 'To God Be The Glory',
    author: 'Fanny J. Crosby (1875)',
    tune: 'TO GOD BE THE GLORY (William H. Doane)',
    stanzas: [
      {
        number: 1,
        lines: [
          'To God be the glory, great things He hath done;',
          'So loved He the world that He gave us His Son,',
          'Who yielded His life an atonement for sin,',
          'And opened the life-gate that all may go in.',
        ],
      },
      {
        number: 2,
        lines: [
          'O perfect redemption, the purchase of blood,',
          'To every believer the promise of God;',
          'The vilest offender who truly believes,',
          'That moment from Jesus a pardon receives.',
        ],
      },
      {
        number: 3,
        lines: [
          'Great things He hath taught us, great things He hath done,',
          'And great our rejoicing through Jesus the Son;',
          'But purer, and higher, and greater will be',
          'Our wonder, our transport, when Jesus we see.',
        ],
      },
    ],
    chorus: [
      'Praise the Lord, praise the Lord,',
      'Let the earth hear His voice!',
      'Praise the Lord, praise the Lord,',
      'Let the people rejoice!',
      'O come to the Father, through Jesus the Son,',
      'And give Him the glory, great things He hath done!',
    ],
  },
  episcopalVowExcerpts: [
    'Are you persuaded that God has called you to the office of Bishop / Overseer in His Church?',
    'Will you maintain and set forward, as much as in you lies, quietness, love, and peace among all men?',
    'Will you faithfully instruct the people committed to your care, out of the Holy Scriptures?',
    'Will you show yourself gentle, and be merciful for Christ’s sake to poor and needy people, and to all strangers destitute of help?',
  ],
};
