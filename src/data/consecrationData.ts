export interface SubItem {
  letter: string;
  text: string;
}

export interface ProgramItem {
  id: number;
  order: number;
  title: string;
  sectionHeader?: string;
  subItems?: SubItem[];
}

export const CONSECRATION_SERVICE_TITLE = 'CONSECRATION AND ORDINATION SERVICE';
export const CONSECRATION_SERVICE_SUBTITLE = 'PROGRAM LINE UP';

export const CONSECRATION_PROGRAM: ProgramItem[] = [
  {
    id: 1,
    order: 1,
    title: 'OPENING PRAYER / INTRODUCTION OF PROCESSION',
  },
  {
    id: 2,
    order: 2,
    title: 'Song Ministration',
    sectionHeader: 'Order of Procession',
    subItems: [
      { letter: 'a', text: 'Assisting Ceremonial Ministers bearing vestments, staff and Bibles' },
      { letter: 'b', text: 'Candidate (in white cassock)' },
      { letter: 'c', text: 'Fully robed Guest Bishops/Assisting Bishops' },
      { letter: 'd', text: 'Bearer of the Consecrating Bishop’s Sword' },
      { letter: 'e', text: 'Bearer of the Consecrating Bishop’s Bible' },
      { letter: 'f', text: 'Bearer of the Consecrating Bishop’s Staff' },
      { letter: 'g', text: 'Consecrating Bishop wearing Mitre on skull cap for procession' },
    ],
  },
  {
    id: 3,
    order: 3,
    title: 'REMOVAL OF MITRE',
  },
  {
    id: 4,
    order: 4,
    title: 'PRAYER BY CONSECRATING BISHOP',
  },
  {
    id: 5,
    order: 5,
    title: 'PURPOSE OF SERVICE',
  },
  {
    id: 6,
    order: 6,
    title: 'PRAYER',
  },
  {
    id: 7,
    order: 7,
    title: 'READING OF PROFILE',
  },
  {
    id: 8,
    order: 8,
    title: 'SONGS',
  },
  {
    id: 9,
    order: 9,
    title: 'FIRST SCRIPTURE READING (Hebrews 5:1-10)',
  },
  {
    id: 10,
    order: 10,
    title: 'SPECIAL SONGS BY PSALMIST',
  },
  {
    id: 11,
    order: 11,
    title: 'SECOND SCRIPTURE READING (Isaiah 42:1-9)',
  },
  {
    id: 12,
    order: 12,
    title: 'SPECIAL SONGS BY PSALMIST',
  },
  {
    id: 13,
    order: 13,
    title: 'CONSECRATION VOWS',
  },
  {
    id: 14,
    order: 14,
    title: 'PRAYER',
  },
  {
    id: 15,
    order: 15,
    title: 'ASK CONGREGATION TO STAND AND ADDRESS THEM',
  },
  {
    id: 16,
    order: 16,
    title: 'PRAYERS AND ANOINTING OF CANDIDATE with HORN of OIL',
  },
  {
    id: 17,
    order: 17,
    title: 'CUMMUNION FOR NEW CANDIDATE',
  },
  {
    id: 18,
    order: 18,
    title: 'PRESENTATION OF THE VESTMENTS',
  },
  {
    id: 19,
    order: 19,
    title: 'PRESENTATION OF THE BIBLE',
  },
  {
    id: 20,
    order: 20,
    title: 'PRESENTATION OF THE CERTIFICATE AND LICENSE',
  },
  {
    id: 21,
    order: 21,
    title: 'SPECIAL SONGS',
  },
  {
    id: 22,
    order: 22,
    title: 'PRESENTATION OF THE OVERSEER / BISHOP',
  },
  {
    id: 23,
    order: 23,
    title: 'FIRST OFFERING',
  },
  {
    id: 24,
    order: 24,
    title: 'SERMON',
  },
  {
    id: 25,
    order: 25,
    title: 'SPEECHES OF GUEST BISHOPS/ APOSTLES IN ROBED',
  },
  {
    id: 26,
    order: 26,
    title: 'MAIDEN SPEECHES OF THE NEW BISHOP OR OVERSEER',
  },
  {
    id: 27,
    order: 27,
    title: 'SECOND OFFERING',
  },
  {
    id: 28,
    order: 28,
    title: 'CLOSING PRAYER',
  },
  {
    id: 29,
    order: 29,
    title: 'RECESSIONAL TEAM LINE UP FOR RECESSION',
  },
  {
    id: 30,
    order: 30,
    title: 'ORDER OF RECESSION',
    sectionHeader: 'Order of Recession',
    subItems: [
      { letter: 'a', text: 'New Bishops / Apostles / Prophets (each holding his own staff)' },
      { letter: 'b', text: 'Assisting Ceremonial Ministers bearing Bibles and Certificates of New Bishop' },
      { letter: 'c', text: 'Guest / fully robed Bishops' },
      { letter: 'd', text: 'Bearer of the Consecrating Bishop’s Sword' },
      { letter: 'e', text: 'Bearer of the Consecrating Bishop’s Bible' },
      { letter: 'f', text: 'Bearer of the Consecrating Bishop’s Staff' },
      { letter: 'g', text: 'Consecrating Bishop' },
      { letter: 'h', text: 'Clergy' },
    ],
  },
  {
    id: 31,
    order: 31,
    title: 'WEARING OF THE MITRE FOR RECESSION',
  },
  {
    id: 32,
    order: 32,
    title: 'RECESSIONAL SONG: To God be the Glory',
  },
  {
    id: 33,
    order: 33,
    title: 'GREETINGS AND PHOTOGRAPHS',
  },
];

export const PASTORS_ORDINATION_TITLE = 'ORDINATION OF PASTORS';
export const PASTORS_ORDINATION_SUBTITLE = 'PROGRAM LINE UP';

export const PASTOR_ORDINATION_PROGRAM: ProgramItem[] = [
  {
    id: 1,
    order: 1,
    title: 'PROCESSION',
  },
  {
    id: 2,
    order: 2,
    title: 'PROCESSIONAL HYMN',
  },
  {
    id: 3,
    order: 3,
    title: 'DECLARATION OF PURPOSE',
  },
  {
    id: 4,
    order: 4,
    title: 'READING OF PROFILE',
  },
  {
    id: 5,
    order: 5,
    title: 'ORDINATION VOWS',
  },
  {
    id: 6,
    order: 6,
    title: 'ORDINATION PRAYERS',
  },
  {
    id: 7,
    order: 7,
    title: 'OFFERING AND SPECIAL SONGS',
  },
  {
    id: 8,
    order: 8,
    title: 'FIRST SCRIPTURE READING',
  },
  {
    id: 9,
    order: 9,
    title: 'SPECIAL SONGS BY PSALMIST',
  },
  {
    id: 10,
    order: 10,
    title: 'PRESENTATION OF CERTIFICATES, CROSS AND BIBLE, prayer, laying of hands, anointing with oil',
  },
  {
    id: 11,
    order: 11,
    title: 'RECESSION',
  },
  {
    id: 12,
    order: 12,
    title: 'SONG',
  },
  {
    id: 13,
    order: 13,
    title: 'OFFICIAL PICTURES TAKEN',
  },
];
