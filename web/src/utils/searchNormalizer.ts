/**
 * Smart Uzbek Culinary Search Normalizer & Typo Tolerant Fuzzy Matcher
 * Maps common typos, variations, and regional spelling variants to canonical search terms.
 */
export function normalizeSearchQuery(query: string): string {
  if (!query) return '';
  let q = query.toLowerCase().trim();

  const synonymMap: [RegExp, string][] = [
    // Avokado variations (avacado, avakado, avokada, avokod, abokado, avocado)
    [/\b(avacado|avakado|avokada|avokod|abokado|avocado)\b/gi, 'avokado'],
    
    // Pomidor variations (pamidor, pamdor, pamido, tomati, tomato)
    [/\b(pamidor|pamdor|pamido|tomati|tomato)\b/gi, 'pomidor'],
    
    // Kartoshka variations (kartoska, kartochka, kartofel, batat)
    [/\b(kartoska|kartochka|kartofel)\b/gi, 'kartoshka'],
    
    // Piyoz variations (pyoz, poyoz, pioz, onion)
    [/\b(pyoz|poyoz|pioz|onion)\b/gi, 'piyoz'],
    
    // Sarimsoq variations (sarimsok, chesnok, sarimsoqpiyoz, garlic)
    [/\b(sarimsok|chesnok|sarimsoqpiyoz|garlic)\b/gi, 'sarimsoq'],
    
    // Go'sht variations (gosht, g'osht, gusht, meat)
    [/\b(gosht|g'osht|gusht|meat)\b/gi, "go'sht"],
    
    // Sabzi variations (sabze, sabzy, carrot)
    [/\b(sabze|sabzy|carrot)\b/gi, 'sabzi'],
    
    // Bodring variations (bodrin, badring, cucumber)
    [/\b(bodrin|badring|cucumber)\b/gi, 'bodring'],

    // Karam variations (kram, qaram, cabbage)
    [/\b(kram|qaram|cabbage)\b/gi, 'karam'],

    // Tovuq variations (tavuk, tavuq, chicken)
    [/\b(tavuk|tavuq|chicken)\b/gi, 'tovuq'],

    // Sariyog' variations (sariyog|saryog|butter)
    [/\b(sariyog|saryog|butter)\b/gi, "sariyog'"],
  ];

  for (const [regex, replacement] of synonymMap) {
    q = q.replace(regex, replacement);
  }

  return q;
}

/**
 * Checks if a target text matches the user's search query, accounting for typos and variations.
 */
export function fuzzyMatchSearch(text: string, searchQuery: string): boolean {
  if (!searchQuery) return true;
  if (!text) return false;

  const textLower = text.toLowerCase();
  const rawQ = searchQuery.toLowerCase().trim();
  const normQ = normalizeSearchQuery(searchQuery);

  // Direct match or normalized match
  if (textLower.includes(rawQ) || textLower.includes(normQ)) {
    return true;
  }

  return false;
}
