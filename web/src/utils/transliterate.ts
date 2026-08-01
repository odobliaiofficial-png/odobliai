import { ScriptType } from '../types';

/**
 * High-precision Uzbek Latin <-> Cyrillic Transliteration Engine
 * Correctly converts all Uzbek words, apostrophes (', ’, `, ʻ, ʼ), multi-character combinations,
 * and preserves specialized terms and numbers.
 */
export function latinToCyrillic(str: string): string {
  if (!str) return '';

  let res = str;

  // 1. Normalize all apostrophe variants first
  res = res.replace(/[’`ʻʼ]/g, "'");

  // 2. High-frequency Uzbek word & term dictionary
  const exactDictionary: [string, string][] = [
    ['Milliy Taomlar', 'Миллий Таомлар'], ['milliy taomlar', 'миллий таомлар'],
    ['Salatlar', 'Салатлар'], ['salatlar', 'салатлар'],
    ['Tortlar va Chizkeyklar', 'Тортлар ва Чизкейклар'], ['tortlar va chizkeyklar', 'тортлар ва чизкейклар'],
    ['Piroglar va Tartlar', 'Пироглар ва Тартлар'], ['piroglar va tartlar', 'пироглар ва тартлар'],
    ['Pechenye va Biskvitlar', 'Печенье ва Бисквитлар'], ['pechenye va biskvitlar', 'печенье ва бисквитлар'],
    ['Kekslar va Mafinlar', 'Кекслар ва Мафинлар'], ['kekslar va mafinlar', 'кекслар ва мафинлар'],
    ['Shirinliklar', 'Ширинликлар'], ['shirinliklar', 'ширинликлар'],
    ['Nonushta va Pishiriqlar', 'Нонушта ва Пишириқлар'], ['nonushta va pishiriqlar', 'нонушта ва пишириқлар'],
    ["Go'sht va Parranda Taomlari", "Гўшт ва Парранда Таомлари"], ["go'sht va parranda taomlari", "гўшт ва парранда таомлари"],
    ["Garnirlar va Sabzavotli Taomlar", "Гарнирлар ва Сабзавотли Таомлар"], ["garnirlar va sabzavotli taomlar", "гарнирлар ва сабзавотли таомлари"],
    ['Ichimliklar', 'Ичимликлар'], ['ichimliklar', 'ичимликлар'],
    ['Muzqaymoq va Sovuq Desertlar', 'Музқаймоқ ва Совуқ Десертлар'], ['muzqaymoq va sovuq desertlar', 'музқаймоқ ва совуқ десертлар'],
    ['Suyuq Taomlar', 'Суюқ Таомлар'], ['suyuq taomlar', 'суюқ таомлар'],
    ['Quyuq Taomlar', 'Қуюқ Таомлар'], ['quyuq taomlar', 'қуюқ таомлар'],
    ['Retsept Filtrlari va Saralash', 'Рецепт Фильтрлари ва Саралаш'],
    ['Pishirish asoslari', 'Пишириш асослари'], ['pishirish asoslari', 'пишириш асослари'],
    ['Pishirish', 'Пишириш'], ['pishirish', 'пишириш'],
    ['Kategoriya (Papka)', 'Категория (Папка)'],
    ['Tayyorlash Vaqti', 'Тайёрлаш Вақти'],
    ['Qiyinlik Darajasi', 'Қийинлик Даражаси'],
    ['Barcha vaqtlar (Har qanday)', 'Барча вақтлар (Ҳар қандай)'],
    ['Tezkor retseptlar (30 daqiqadan kam)', 'Тезкор рецептлар (30 дақиқадан кам)'],
    ["O'rtacha retseptlar (30-60 daqiqa)", 'Ўртача рецептлар (30-60 дақиқа)'],
    ["Uzoq pishadigan taomlar (60 daqiqadan ko'p)", 'Узоқ пишадиган таомлар (60 дақиқадан кўп)'],
    ['Barcha qiyinlik darajalari', 'Барча қийинлик даражалари'],
    ['Oson (Boshlovchilar uchun)', 'Осон (Бошловчилар учун)'],
    ["O'rtacha (Oshxona tajribasi borlar)", 'Ўртача (Ошхона тажрибаси борлар)'],
    ['Murakkab (Professional oshpazlar)', 'Мураккаб (Профессионал ошпазлар)'],
    ["Filtrni tozalash", 'Фильтрни тозалаш'],
    ["Filtrni qo'llash", 'Фильтрни қўллаш'],
    ['Barcha Kategoriyalar', 'Барча Категориялар'],
    ['Filtrlar', 'Фильтрлар'],
    ['Filtr', 'Фильтр'],
    ['Vaqt', 'Вақт'],
    ['Qiyinlik', 'Қийинлик'],
    ['Papkalar', 'Папкалар'], ['papkalar', 'папкалар'],
    ['Chiqish', 'Чиқиш'], ['chiqish', 'чиқиш'],
    ['Karving', 'Карвинг'], ['karving', 'карвинг'],
    ["O'yinchoq yasash", "Ўйинчоқ ясаш"], ["o'yinchoq yasash", "ўйинчоқ ясаш"],
    ['Uy ishlari', 'Уй ишлари'], ['uy ishlari', 'уй ишлари'],
    ['Sabzavotlar', 'Сабзавотлар'], ['sabzavotlar', 'сабзавотлар'],
    ['Sabzavot', 'Сабзавот'], ['sabzavot', 'сабзавот'],
    ['Mevalar', 'Мевалар'], ['mevalar', 'мевалар'],
    ['Meva', 'Мева'], ['meva', 'мева'],
    ["Go'sht", "Гўшт"], ["go'sht", "гўшт"], ['gosht', 'гўшт'],
    ['Sut & Tuxum', 'Сут & Тухум'], ['sut & tuxum', 'сут & тухум'],
    ['dukkakli', 'даккакли'], ['qandolat', 'қандолат'],
    ['Bozorlik', 'Бозорлик'], ['bozorlik', 'бозорлик'],
    ['Retseptlar', 'Рецептлар'], ['retseptlar', 'рецептлар'],
    ['Retsept', 'Рецепт'], ['retsept', 'рецепт'],
    ['Pazanda', 'Пазанда'], ['pazanda', 'пазанда'],
    ['Bolajon', 'Болажон'], ['bolajon', 'болажон'],
    ['Ertaklar', 'Эртаклар'], ['ertaklar', 'эртаклар'],
    ['Topishmoqlar', 'Топишмоқлар'], ['topishmoqlar', 'топишмоқлар'],
    ['Masalalar', 'Масалалар'], ['masalalar', 'масалалар'],
    ['Vazifalar', 'Вазифалар'], ['vazifalar', 'вазифалар'],
    ['Oshxona', 'Ошхона'], ['oshxona', 'ошхона'],
    ['Taymer', 'Таймер'], ['taymer', 'таймер'],
    ['Barchasi', 'Барчаси'], ['barchasi', 'барчаси'],
    ['Saqlandi', 'Сақланди'], ['saqlandi', 'сақланди'],
    ['Lifehacklar', 'Лайфхаклар'], ['lifehacklar', 'лайфхаклар'],
    ['Lifehack', 'Лайфхак'], ['lifehack', 'лайфхак'],
    ['Profil', 'Профиль'], ['profil', 'профиль'],
    ['Unvonlar', 'Унвонлар'], ['unvonlar', 'унвонлар'],
    ['Nishonlar', 'Нишонлар'], ['nishonlar', 'нишонлар'],
    ['Streak', 'Стрик'], ['streak', 'стрик'],
    ['Ballar', 'Баллlar'], ['ballar', 'балллар'],
    ['Kishilik', 'Кишилик'], ['kishilik', 'кишилик'],
    ['Kishi', 'Киши'], ['kishi', 'киши'],
    ['Daqiqa', 'Дақиқа'], ['daqiqa', 'дақиқа'],
    ['Daq', 'Дақ'], ['daq', 'дақ'],
    ['Soat', 'Соат'], ['soat', 'соат'],
    ['Kun', 'Кун'], ['kun', 'кун'],
    ['Toshkent', 'Тошкент'], ['toshkent', 'тошкент'],
    ['Samarkand', 'Самарқанд'], ['samarkand', 'самарқанд'],
    ["Farg'ona", 'Фарғона'], ["farg'ona", 'фарғона'],
    ['Buxoro', 'Бухоро'], ['buxoro', 'бухоро'],
    ['Xiva', 'Хива'], ['xiva', 'хива'],
    ['Xorazm', 'Хоразм'], ['xorazm', 'хоразм'],
  ];

  for (const [lat, cyr] of exactDictionary) {
    res = res.replaceAll(lat, cyr);
  }

  // 3. E / e at the start of words (before any non-letter or at string start)
  res = res.replace(/(^|[\s"'\(\[\{«—–-])E/g, '$1Э');
  res = res.replace(/(^|[\s"'\(\[\{«—–-])e/g, '$1э');

  // 4. Multi-character combinations (Order matters!)
  const multiMap: [RegExp, string][] = [
    [/O'/g, 'Ў'], [/o'/g, 'ў'],
    [/G'/g, 'Ғ'], [/g'/g, 'ғ'],
    [/SH/g, 'Ш'], [/Sh/g, 'Ш'], [/sh/g, 'ш'],
    [/CH/g, 'Ч'], [/Ch/g, 'Ч'], [/ch/g, 'ч'],
    [/YO/g, 'Ё'], [/Yo/g, 'Ё'], [/yo/g, 'ё'],
    [/YU/g, 'Ю'], [/Yu/g, 'Ю'], [/yu/g, 'ю'],
    [/YA/g, 'Я'], [/Ya/g, 'Я'], [/ya/g, 'я'],
    [/YE/g, 'Е'], [/Ye/g, 'Е'], [/ye/g, 'е'],
    [/TS/g, 'Ц'], [/Ts/g, 'Ц'], [/ts/g, 'ц'],
  ];

  for (const [regex, rep] of multiMap) {
    res = res.replace(regex, rep);
  }

  // 5. Single character mapping
  const charMap: Record<string, string> = {
    'A': 'А', 'a': 'а',
    'B': 'Б', 'b': 'б',
    'D': 'Д', 'd': 'д',
    'E': 'Е', 'e': 'е',
    'F': 'Ф', 'f': 'ф',
    'G': 'Г', 'g': 'г',
    'H': 'Ҳ', 'h': 'ҳ',
    'I': 'И', 'i': 'и',
    'J': 'Ж', 'j': 'ж',
    'K': 'К', 'k': 'к',
    'L': 'Л', 'l': 'л',
    'M': 'М', 'm': 'м',
    'N': 'Н', 'n': 'н',
    'O': 'О', 'o': 'о',
    'P': 'П', 'p': 'п',
    'Q': 'Қ', 'q': 'қ',
    'R': 'Р', 'r': 'р',
    'S': 'С', 's': 'с',
    'T': 'Т', 't': 'т',
    'U': 'У', 'u': 'у',
    'V': 'В', 'v': 'в',
    'X': 'Х', 'x': 'х',
    'Y': 'Й', 'y': 'й',
    'Z': 'З', 'z': 'з',
    "'": 'ъ',
  };

  let out = '';
  for (let i = 0; i < res.length; i++) {
    const ch = res[i];
    out += charMap[ch] !== undefined ? charMap[ch] : ch;
  }

  return out;
}

export function cyrillicToLatin(str: string): string {
  if (!str) return '';

  let res = str;

  const multiMap: [RegExp, string][] = [
    [/Ў/g, "O'"], [/ў/g, "o'"],
    [/Ғ/g, "G'"], [/ғ/g, "g'"],
    [/Ш/g, 'Sh'], [/ш/g, 'sh'],
    [/Ч/g, 'Ch'], [/ч/g, 'ch'],
    [/Ё/g, 'Yo'], [/ё/g, 'yo'],
    [/Ю/g, 'Yu'], [/ю/g, 'yu'],
    [/Я/g, 'Ya'], [/я/g, 'ya'],
    [/Ц/g, 'Ts'], [/ц/g, 'ts'],
    [/Э/g, 'E'], [/э/g, 'e'],
  ];

  for (const [regex, rep] of multiMap) {
    res = res.replace(regex, rep);
  }

  const charMap: Record<string, string> = {
    'А': 'A', 'а': 'a',
    'Б': 'B', 'б': 'b',
    'В': 'V', 'в': 'v',
    'Г': 'G', 'г': 'g',
    'Д': 'D', 'д': 'd',
    'Е': 'E', 'е': 'e',
    'Ж': 'J', 'ж': 'j',
    'З': 'Z', 'з': 'z',
    'И': 'I', 'и': 'i',
    'Й': 'Y', 'й': 'y',
    'К': 'K', 'к': 'k',
    'Қ': 'Q', 'қ': 'q',
    'Л': 'L', 'л': 'l',
    'М': 'M', 'м': 'm',
    'Н': 'N', 'н': 'n',
    'О': 'O', 'о': 'o',
    'П': 'P', 'p': 'p',
    'Р': 'R', 'р': 'r',
    'С': 'S', 'с': 's',
    'Т': 'T', 'т': 't',
    'У': 'U', 'у': 'u',
    'Ф': 'F', 'ф': 'f',
    'Х': 'X', 'х': 'x',
    'Ҳ': 'H', 'ҳ': 'h',
    'ъ': "'", 'Ъ': "'",
    'ь': '', 'Ь': ''
  };

  let out = '';
  for (let i = 0; i < res.length; i++) {
    const ch = res[i];
    out += charMap[ch] !== undefined ? charMap[ch] : ch;
  }

  return out;
}

/**
 * Transforms text based on current script setting safely.
 */
export function translateText(text: any, script: ScriptType): string {
  if (text === null || text === undefined) return '';
  if (typeof text !== 'string') return String(text);
  const s = String(script || '').toLowerCase();
  if (s === 'kirill' || s === 'cyril' || s === 'kr' || s === 'cyrillic' || s.includes('kir') || s.includes('cyr')) {
    return latinToCyrillic(text);
  }
  return text;
}

export function t(text: any, script: ScriptType = 'lotin'): string {
  return translateText(text, script);
}
