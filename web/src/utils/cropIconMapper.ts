import cropIcons from 'open-crop-icons';

/**
 * Uzbek ingredient / crop name dictionary mapping to Open Crop Icons keys
 */
const uzbekToCropKeyMap: Record<string, string> = {
  // Sabzavotlar
  'pomidor': 'cherryTomato',
  'tomati': 'cherryTomato',
  'bodring': 'cucumber',
  'sabzi': 'carrot',
  'piyoz': 'shirazOnion',
  'sharlot': 'shallot',
  'sarimsoq': 'garlic',
  'baqlajon': 'eggplant',
  'kartoshka': 'potato',
  'qovoq': 'butternutSquash',
  'karam': 'cabbage',
  'brokkoli': 'broccoli',
  'cauliflower': 'cauliflower',
  'qalampir': 'chiliPepper',
  'bulgori': 'bellPepper',
  'bulg\'or': 'bellPepper',

  // Ko'kat va ziravorlar
  'rayhon': 'basil',
  'kashnich': 'cilantro',
  'petrushka': 'parsley',
  'yalpiz': 'mint',
  'rukkola': 'arugula',
  'selderash': 'celery',

  // Mevalar va Donlar
  'olma': 'apple',
  'limon': 'lemon',
  'uzum': 'grape',
  'qovun': 'cantaloupe',
  'tarvuz': 'watermelon',
  'bodom': 'almond',
  'makkajoxori': 'corn',
  'makkajo\'xori': 'corn',
  'suli': 'oats',
  'bug\'doy': 'wheat',
  'qo\'ziqorin': 'chantrelle',
  'shampinyon': 'cremini',
  'veshenka': 'blueOyster',
};

/**
 * Resolves an Uzbek ingredient/crop term to an Open Crop Icon SVG URL string.
 * Returns null if no matching crop icon is found.
 */
export function getCropIconUrl(term: string): string | null {
  if (!term) return null;
  const lower = term.toLowerCase().trim();

  for (const [key, iconName] of Object.entries(uzbekToCropKeyMap)) {
    if (lower.includes(key)) {
      const src = (cropIcons as Record<string, string>)[iconName];
      if (src) return src;
    }
  }

  if ((cropIcons as Record<string, string>)[lower]) {
    return (cropIcons as Record<string, string>)[lower];
  }

  return null;
}

export default cropIcons;
