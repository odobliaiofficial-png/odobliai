import { Ingredient, Recipe, Tale, Lifehack, Riddle, MathProblem } from '../types';

export const initialIngredients: Ingredient[] = [
  // 1. Sabzavotlar, Ildizmevalar va Ko'katlar (Vegetables, Roots & Greens)
  { id: 'ing_kartoshka', nomi: 'Kartoshka', kategoriya: 'sabzavot', icon: '🥔' },
  { id: 'ing_piyoz', nomi: 'Piyoz', kategoriya: 'sabzavot', icon: '🧅' },
  { id: 'ing_sabzi', nomi: 'Sabzi', kategoriya: 'sabzavot', icon: '🥕' },
  { id: 'ing_pomidor', nomi: 'Pomidor', kategoriya: 'sabzavot', icon: '🍅' },
  { id: 'ing_bodring', nomi: 'Bodring', kategoriya: 'sabzavot', icon: '🥒' },
  { id: 'ing_kokatlar', nomi: "Ko'katlar (Kashnich / Petrushka)", kategoriya: 'sabzavot', icon: '🌿' },
  { id: 'ing_shivit', nomi: 'Shivit', kategoriya: 'sabzavot', icon: '🌿' },
  { id: 'ing_baqlajon', nomi: 'Baqlajon', kategoriya: 'sabzavot', icon: '🍆' },
  { id: 'ing_bulgor', nomi: "Bulg'or qalampiri", kategoriya: 'sabzavot', icon: '🫑' },
  { id: 'ing_qalampir', nomi: 'Achchiq qalampir', kategoriya: 'sabzavot', icon: '🌶️' },
  { id: 'ing_sarimsoq', nomi: 'Sarimsoqpiyoz', kategoriya: 'sabzavot', icon: '🧄' },
  { id: 'ing_karram', nomi: 'Karam', kategoriya: 'sabzavot', icon: '🥬' },
  { id: 'ing_gul_karam', nomi: 'Gulli karam', kategoriya: 'sabzavot', icon: '🥦' },
  { id: 'ing_brokkoli', nomi: 'Brokkoli', kategoriya: 'sabzavot', icon: '🥦' },
  { id: 'ing_turp', nomi: "Marg'ilon yashil turpi", kategoriya: 'sabzavot', icon: '🧅' },
  { id: 'ing_sholgom', nomi: "Sholg'om", kategoriya: 'sabzavot', icon: '🥔' },
  { id: 'ing_qovoq', nomi: 'Oshqovoq', kategoriya: 'sabzavot', icon: '🎃' },
  { id: 'ing_ismaloq', nomi: 'Ismaloq', kategoriya: 'sabzavot', icon: '🍃' },
  { id: 'ing_kok_piyoz', nomi: "Ko'k piyoz", kategoriya: 'sabzavot', icon: '🌱' },
  { id: 'ing_rayhon', nomi: 'Rayhon', kategoriya: 'sabzavot', icon: '🌿' },
  { id: 'ing_yalpiz', nomi: 'Yalpiz', kategoriya: 'sabzavot', icon: '🌿' },
  { id: 'ing_selerey', nomi: 'Selerey', kategoriya: 'sabzavot', icon: '🥬' },
  { id: 'ing_shavul', nomi: 'Shovul (Otquloq)', kategoriya: 'sabzavot', icon: '🍃' },
  { id: 'ing_zanjabil', nomi: 'Zanjabil ildizi', kategoriya: 'sabzavot', icon: '🫚' },
  { id: 'ing_qoziqorin', nomi: "Qo'ziqorin (Shampinyon)", kategoriya: 'sabzavot', icon: '🍄' },
  { id: 'ing_qabachki', nomi: 'Kabachki', kategoriya: 'sabzavot', icon: '🥒' },
  { id: 'ing_tsukini', nomi: 'Tsukini', kategoriya: 'sabzavot', icon: '🥒' },
  { id: 'ing_lavlagi', nomi: 'Lavlagi', kategoriya: 'sabzavot', icon: '🫛' },
  { id: 'ing_rediska', nomi: 'Rediska', kategoriya: 'sabzavot', icon: '🔴' },
  { id: 'ing_rukola', nomi: 'Rukola', kategoriya: 'sabzavot', icon: '🥗' },
  { id: 'ing_salat_bargi', nomi: 'Salat bargi', kategoriya: 'sabzavot', icon: '🥗' },
  { id: 'ing_zaytun', nomi: 'Zaytun (Oliva)', kategoriya: 'sabzavot', icon: '🫒' },

  // 2. Go'shtlar, Parranda va Baliq (Meats & Poultry)
  { id: 'ing_mol', nomi: "Mol go'shti", kategoriya: 'gosht', icon: '🥩' },
  { id: 'ing_qoy', nomi: "Qo'y go'shti", kategoriya: 'gosht', icon: '🥩' },
  { id: 'ing_tovuq', nomi: "Tovuq go'shti", kategoriya: 'gosht', icon: '🍗' },
  { id: 'ing_ordak', nomi: "O'rdak go'shti", kategoriya: 'gosht', icon: '🦆' },
  { id: 'ing_goz', nomi: "G'oz go'shti", kategoriya: 'gosht', icon: '🪿' },
  { id: 'ing_kurka', nomi: "Kurka go'shti", kategoriya: 'gosht', icon: '🦃' },
  { id: 'ing_bedana_gosht', nomi: "Bedana go'shti", kategoriya: 'gosht', icon: '🐦' },
  { id: 'ing_quyon', nomi: "Quyon go'shti", kategoriya: 'gosht', icon: '🐇' },
  { id: 'ing_ot_goshti', nomi: "Ot go'shti", kategoriya: 'gosht', icon: '🐎' },
  { id: 'ing_qazi', nomi: 'Qazi', kategoriya: 'gosht', icon: '🥩' },
  { id: 'ing_qiyma', nomi: "Mol va Qo'y qiymasi", kategoriya: 'gosht', icon: '🥩' },
  { id: 'ing_dumba', nomi: "Dumba yog'i", kategoriya: 'gosht', icon: '🥓' },
  { id: 'ing_charvi', nomi: "Charvi yog'i", kategoriya: 'gosht', icon: '🥓' },
  { id: 'ing_jigar', nomi: "Mol / Qo'y jigari", kategoriya: 'gosht', icon: '🥩' },
  { id: 'ing_til', nomi: "Mol tili", kategoriya: 'gosht', icon: '🥩' },
  { id: 'ing_kalla_pocha', nomi: 'Kalla-pocha', kategoriya: 'gosht', icon: '🍲' },
  { id: 'ing_ilik_suyak', nomi: 'Ilik suyak', kategoriya: 'gosht', icon: '🍖' },
  { id: 'ing_baliq', nomi: "Baliq go'shti", kategoriya: 'gosht', icon: '🐟' },

  // 3. Sut Mahsulotlari va Tuxum (Dairy & Eggs)
  { id: 'ing_qatiq', nomi: 'Qatiq', kategoriya: 'sut_mahsuloti', icon: '🥛' },
  { id: 'ing_suzma', nomi: 'Suzma / Chakka', kategoriya: 'sut_mahsuloti', icon: '🥛' },
  { id: 'ing_yogurt', nomi: 'Grek yogurti', kategoriya: 'sut_mahsuloti', icon: '🥛' },
  { id: 'ing_smetana', nomi: 'Smetana', kategoriya: 'sut_mahsuloti', icon: '🧈' },
  { id: 'ing_qaymoq', nomi: 'Qaymoq', kategoriya: 'sut_mahsuloti', icon: '🧈' },
  { id: 'ing_ayron', nomi: 'Ayron', kategoriya: 'sut_mahsuloti', icon: '🥛' },
  { id: 'ing_chala', nomi: 'Chala', kategoriya: 'sut_mahsuloti', icon: '🥛' },
  { id: 'ing_tuxum', nomi: 'Tovuq tuxumi', kategoriya: 'sut_mahsuloti', icon: '🥚' },
  { id: 'ing_bedana_tuxum', nomi: 'Bedana tuxumi', kategoriya: 'sut_mahsuloti', icon: '🥚' },
  { id: 'ing_ordak_tuxum', nomi: "O'rdak tuxumi", kategoriya: 'sut_mahsuloti', icon: '🥚' },
  { id: 'ing_goz_tuxum', nomi: "G'oz tuxumi", kategoriya: 'sut_mahsuloti', icon: '🥚' },
  { id: 'ing_pishloq', nomi: 'Pishloq (Gouda / Mozzarella)', kategoriya: 'sut_mahsuloti', icon: '🧀' },
  { id: 'ing_brinza', nomi: "Brinza pishlog'i", kategoriya: 'sut_mahsuloti', icon: '🧀' },
  { id: 'ing_feta', nomi: "Feta pishlog'i", kategoriya: 'sut_mahsuloti', icon: '🧀' },
  { id: 'ing_saryog', nomi: "Sariyog'", kategoriya: 'sut_mahsuloti', icon: '🧈' },
  { id: 'ing_sut', nomi: 'Sut', kategoriya: 'sut_mahsuloti', icon: '🥛' },
  { id: 'ing_tvorog', nomi: 'Tvorog', kategoriya: 'sut_mahsuloti', icon: '🍨' },
  { id: 'ing_qurut', nomi: 'Qurut', kategoriya: 'sut_mahsuloti', icon: '⚪' },

  // 4. Dukkakli, Don, Makaron va Un (Legumes, Grains, Pasta & Flour)
  { id: 'ing_guruch', nomi: 'Guruch (Lazer / Devzira / Alanga)', kategoriya: 'dukkakli', icon: '🍚' },
  { id: 'ing_noxat', nomi: "No'xat", kategoriya: 'dukkakli', icon: '🫘' },
  { id: 'ing_mosh', nomi: 'Mosh', kategoriya: 'dukkakli', icon: '🫘' },
  { id: 'ing_loviya', nomi: 'Lobiya', kategoriya: 'dukkakli', icon: '🫘' },
  { id: 'ing_yasmiq', nomi: 'Yasmiq (Chechevitsa)', kategoriya: 'dukkakli', icon: '🫘' },
  { id: 'ing_makaron', nomi: 'Makaron (Spagetti / Penne)', kategoriya: 'dukkakli', icon: '🍝' },
  { id: 'ing_ugra', nomi: "Uy ugrasi", kategoriya: 'dukkakli', icon: '🍜' },
  { id: 'ing_lagmon', nomi: "Lag'mon xamiri", kategoriya: 'dukkakli', icon: '🍜' },
  { id: 'ing_noodle', nomi: 'Noodle', kategoriya: 'dukkakli', icon: '🍜' },
  { id: 'ing_somsa_xamiri', nomi: 'Somsa xamiri', kategoriya: 'dukkakli', icon: '🥟' },
  { id: 'ing_manti_xamiri', nomi: 'Manti xamiri', kategoriya: 'dukkakli', icon: '🥟' },
  { id: 'ing_un', nomi: "Bug'doy uni", kategoriya: 'dukkakli', icon: '🌾' },
  { id: 'ing_makkajoxori_un', nomi: "Makkajo'xori uni", kategoriya: 'dukkakli', icon: '🌽' },
  { id: 'ing_gerkules', nomi: 'Suli yormasi (Gerkules)', kategoriya: 'dukkakli', icon: '🥣' },
  { id: 'ing_grechka', nomi: 'Grechka', kategoriya: 'dukkakli', icon: '🥣' },
  { id: 'ing_bulgur', nomi: 'Bulgur yormasi', kategoriya: 'dukkakli', icon: '🌾' },
  { id: 'ing_kuskus', nomi: 'Kuskus yormasi', kategoriya: 'dukkakli', icon: '🌾' },
  { id: 'ing_manniy', nomi: 'Manna yormasi (Semolina)', kategoriya: 'dukkakli', icon: '🌾' },

  // 5. Ziravorlar, Urg'ular, Quruq Mevalar va Yong'oqlar (Spices, Nuts & Dried Fruits)
  { id: 'ing_zira', nomi: 'Zira', kategoriya: 'ziravor', icon: '🧂' },
  { id: 'ing_kashnich_urug', nomi: "Kashnich urug'i", kategoriya: 'ziravor', icon: '🧂' },
  { id: 'ing_murch', nomi: 'Qora murch', kategoriya: 'ziravor', icon: '🌶️' },
  { id: 'ing_paprika', nomi: 'Paprika', kategoriya: 'ziravor', icon: '🧂' },
  { id: 'ing_kunjut', nomi: 'Kunjut', kategoriya: 'ziravor', icon: '🧂' },
  { id: 'ing_zirk', nomi: 'Zirk', kategoriya: 'ziravor', icon: '🍇' },
  { id: 'ing_mayiz', nomi: 'Mayiz', kategoriya: 'ziravor', icon: '🍇' },
  { id: 'ing_dolchin', nomi: 'Dolchin', kategoriya: 'ziravor', icon: '🌿' },
  { id: 'ing_qalamfur', nomi: 'Qalamfur (Chinnigullar)', kategoriya: 'ziravor', icon: '🌿' },
  { id: 'ing_lavr', nomi: 'Lavr bargi', kategoriya: 'ziravor', icon: '🍃' },
  { id: 'ing_zafron', nomi: "Za'faron", kategoriya: 'ziravor', icon: '🌸' },
  { id: 'ing_soda', nomi: "Iste'mol sodasi", kategoriya: 'qandolat', icon: '🧂' },
  { id: 'ing_razraxlitel', nomi: 'Xamir yumshatgich (Razraxlitel)', kategoriya: 'qandolat', icon: '🧂' },
  { id: 'ing_vanilin', nomi: 'Vanilin', kategoriya: 'qandolat', icon: '🧁' },
  { id: 'ing_xamirturush', nomi: 'Xamirturush (Drojji)', kategoriya: 'ziravor', icon: '🍞' },
  { id: 'ing_yongoq', nomi: "Yong'oq mag'zi", kategoriya: 'ziravor', icon: '🥜' },
  { id: 'ing_bodom', nomi: 'Bodom', kategoriya: 'ziravor', icon: '🥜' },
  { id: 'ing_pista', nomi: 'Pista (Pistachio)', kategoriya: 'ziravor', icon: '🥜' },
  { id: 'ing_keshju', nomi: 'Keshju', kategoriya: 'ziravor', icon: '🥜' },
  { id: 'ing_turshak', nomi: "O'rik qaqi / Turshak", kategoriya: 'ziravor', icon: '🍑' },
  { id: 'ing_olxori', nomi: "Quritilgan olxo'ri", kategoriya: 'ziravor', icon: '🫐' },

  // 6. Yog'lar, Souslar va Uy-Ro'zg'or Mahsulotlari (Oils, Sauces & Pantry)
  { id: 'ing_paxta_yogi', nomi: "Paxta yog'i", kategoriya: 'yogi', icon: '🍾' },
  { id: 'ing_osimlik_yogi', nomi: "Kungaboqar yog'i", kategoriya: 'yogi', icon: '🍾' },
  { id: 'ing_makkajoxori_yogi', nomi: "Makkajo'xori yog'i", kategoriya: 'yogi', icon: '🍾' },
  { id: 'ing_zaytun_yogi', nomi: "Zaytun yog'i", kategoriya: 'yogi', icon: '🫒' },
  { id: 'ing_kunjut_yogi', nomi: "Kunjut yog'i", kategoriya: 'yogi', icon: '🍾' },
  { id: 'ing_tomat', nomi: 'Tomat pastasi', kategoriya: 'yogi', icon: '🥫' },
  { id: 'ing_soya_sous', nomi: 'Soyali sous', kategoriya: 'boshqa', icon: '🍾' },
  { id: 'ing_xardal', nomi: 'Xardal (Gorchitsa)', kategoriya: 'boshqa', icon: '🫙' },
  { id: 'ing_mayonez', nomi: 'Mayonez', kategoriya: 'boshqa', icon: '🫙' },
  { id: 'ing_ketchup', nomi: 'Ketchup', kategoriya: 'boshqa', icon: '🥫' },
  { id: 'ing_asal', nomi: "Tabiiy Asal", kategoriya: 'boshqa', icon: '🍯' },
  { id: 'ing_shakar', nomi: 'Shakar', kategoriya: 'qandolat', icon: '🍬' },
  { id: 'ing_qand', nomi: 'Qand', kategoriya: 'qandolat', icon: '🧊' },
  { id: 'ing_sirka', nomi: 'Uzum sirkasi', kategoriya: 'boshqa', icon: '🧪' },
  { id: 'ing_olma_sirkasi', nomi: 'Olma sirkasi', kategoriya: 'boshqa', icon: '🍎' },
  { id: 'ing_limon', nomi: 'Limon', kategoriya: 'meva', icon: '🍋' },
  { id: 'ing_suv', nomi: 'Mineral Suv', kategoriya: 'boshqa', icon: '💧' },
  { id: 'ing_choy', nomi: "Choy (Ko'k / Qora)", kategoriya: 'boshqa', icon: '🍵' },
  { id: 'ing_filo_xamiri', nomi: 'Filo xamiri (Yufka)', kategoriya: 'dukkakli', icon: '🥟' },
  { id: 'ing_kraxmal', nomi: "Makkajo'xori kraxmali", kategoriya: 'qandolat', icon: '🥣' },
  { id: 'ing_kadayif', nomi: 'Kadayif xamiri', kategoriya: 'dukkakli', icon: '🌾' },
  { id: "ing_tvorojniy_pishloq", nomi: "Tvorojniy pishloq (Cream cheese)", kategoriya: "sut_mahsuloti", icon: "🧀" },
  { id: "ing_avokado", nomi: "Avokado", kategoriya: "meva", icon: "🥑" },
  { id: "ing_laym", nomi: "Laym (Lime)", kategoriya: "meva", icon: "🍋" },
  { id: "ing_bodom_uni", nomi: "Bodom uni", kategoriya: "dukkakli", icon: "🌾" },
  { id: "ing_funtuk", nomi: "Funtuk yong'og'i", kategoriya: "ziravor", icon: "🌰" },
  { id: "ing_kardamon", nomi: "Kardamon (Hil)", kategoriya: "ziravor", icon: "🌿" },
  { id: "ing_yalpiz_ekstrakti", nomi: "Yalpiz ekstrakti", kategoriya: "ziravor", icon: "🌿" },
  { id: "ing_zukkini", nomi: "Zukkini (Qovoqcha)", kategoriya: "sabzavot", icon: "🥒" },
  { id: "ing_nok", nomi: "Nok (Pears)", kategoriya: "meva", icon: "🍐" },
  { id: "ing_qulupnay", nomi: "Qulupnay", kategoriya: "meva", icon: "🍓" },
  { id: "ing_sgushchenka", nomi: "Quyultirilgan sut (Sgushchenka)", kategoriya: "qandolat", icon: "🥛" }

,
  { id: "ing_tuz", nomi: "Osh tuzi", kategoriya: "ziravor", icon: "🧂" },
  { id: "ing_kakao", nomi: "Kakao kukuni", kategoriya: "qandolat", icon: "🍫" },
  { id: "ing_shokolad_tomchilari", nomi: "Shokolad tomchilari", kategoriya: "qandolat", icon: "🍫" },
  { id: "ing_pekan", nomi: "Pekan yong'og'i", kategoriya: "ziravor", icon: "🌰" }
,
  { id: "ing_chernika", nomi: "Chernika (Qora mirt)", kategoriya: "meva", icon: "🫐" },
  { id: "ing_maymunjon", nomi: "Maymunjon (Yejevika)", kategoriya: "meva", icon: "🫐" },
  { id: "ing_shakar_kukuni", nomi: "Shakar kukuni", kategoriya: "qandolat", icon: "🧂" },
  { id: "ing_pechenye", nomi: "Qumli pechenye (Ushoq)", kategoriya: "dukkakli", icon: "🍪" },
  { id: "ing_jigarrang_shakar", nomi: "Jigarrang shakar", kategoriya: "qandolat", icon: "🍬" },
  { id: "ing_olma", nomi: "Nordon Olma", kategoriya: "meva", icon: "🍎" },
  { id: "ing_klyukva", nomi: "Klyukva / Qizil smorodina", kategoriya: "meva", icon: "🍒" },
  { id: "ing_pirog_korji", nomi: "Tayyor pirog korji", kategoriya: "dukkakli", icon: "🥧" }
];

export const initialRecipes: Recipe[] = [
  {
  "id": "rec_hd_001_strawberry_cheesecake",
  "nomi": "Pishirilmaydigan Qulupnayli Chizkeyk",
  "tayyorlash_vaqti_daq": 25,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Pishirilmaydigan Qulupnayli Chizkeyk — 6-8 kishilik. Halol va mayin tvorojniy desert.",
  "masalliqlar_matni": "225g Tvorojniy pishloq, 70g Shakar, 240g Smetana yoki qaymoq, 2 choy qoshiq Vanil ekstrakti, 225g Ko'pirtirilgan qaymoq, 170g Qumli pechenye asos, 450g Yangi qulupnay",
  "korsatmalari": [
    "1. Tvorojniy pishloqni shakar bilan 2 daqiqa ko'pirtiring.",
    "2. Smetana va vanillani solib aralashtiring.",
    "3. Ko'pirtirilgan qaymoqni ehtiyotkorlik bilan kremga qo'shing.",
    "4. Pekenyeli asos ustiga kremni quyib, 4 soat muzlatgichda tuting.",
    "5. Ustiga yangi qulupnay bo'laklarini terib dasturxonga torting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_002_pistachio_cake",
  "nomi": "Pista va Hil (Kardamon)li Xushbo'y Keks",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Pista va Hil (Kardamon)li Xushbo'y Keks — 8 kishilik. Halol va xushbo'y pishiriq.",
  "masalliqlar_matni": "115g Maydalangan pista, 130g Un, 2 choy qoshiq Razraxlitel, 1 choy qoshiq Maydalangan kardamon, 170g Saryog', 200g Shakar, 3 dona Tuxum, 120ml Sut",
  "korsatmalari": [
    "1. Pechni 175°C ga qizdiring va qolipni yog'lang.",
    "2. Pista, un, razraxlitel va kardamonni aralashtiring.",
    "3. Sariyog' va shakarni ko'pirtirib tuxumlarni soling.",
    "4. Quruq masalliqlar va sutni navbatma-navbat qo'shing.",
    "5. 175°C pechda 35-40 daqiqa pishiring va sovutib torting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_003_shortbread_cookies",
  "nomi": "Shotlandcha Saryog'li Ushoqli Pechenye",
  "tayyorlash_vaqti_daq": 30,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Shotlandcha Saryog'li Ushoqli Pechenye — 12 dona. Og'izda eriydigan saryog'li desert.",
  "masalliqlar_matni": "130g Un, 50g Shakar, 1/4 choy qoshiq Tuz, 115g Muzday saryog'",
  "korsatmalari": [
    "1. Un, shakar va tuzni aralashtiring.",
    "2. Muzday sariyog'ni kubik qilib quruq masalliqlarga uvalang.",
    "3. Xamirdan shakllar yasab 150°C pechda 20 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_004_chocolate_candycane_cookies",
  "nomi": "Shokoladli va Yalpizli Bayram Pechenyesi",
  "tayyorlash_vaqti_daq": 35,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Shokoladli va Yalpizli Bayram Pechenyesi — 20 dona. Qarsildoq va shokoladli pechenye.",
  "masalliqlar_matni": "220g Un, 50g Kakao, 200g Shakar, 170g Saryog', 1 dona Tuxum, Yalpiz ekstrakti",
  "korsatmalari": [
    "1. Sariyog' va shakarni ko'pirtirib tuxum va yalpiz soling.",
    "2. Un va kakaoni elab qo'shib xamir tayyorlang.",
    "3. Patnisga terib 175°C pechda 12 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_005_chhena_poda",
  "nomi": "Chhena Poda (Hindiston Karamel-Pishloqli Pirogi)",
  "tayyorlash_vaqti_daq": 60,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Hindistonning pishirilgan karamelli va pishloqli nozik pirogi.",
  "masalliqlar_matni": "225g Uy pishlog'i (panir/tvorog), 50g Shakar kukuni, 1/2 choy qoshiq Kardamon, 2 osh qoshiq Manniy",
  "korsatmalari": [
    "1. Panir, shakar, kardamon va manniyni birga silliq ezing.",
    "2. Qolip tubiga sariyog' surtib, 175°C pechda 45 daqiqa qizarguncha pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_006_creole_cheesecake",
  "nomi": "Karamel va Olma Sousli Kreol Chizkeyki",
  "tayyorlash_vaqti_daq": 75,
  "qiyinlik": "qiyin",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Karamel-olma qaylasida pishirilgan shohona chizkeyk deserti.",
  "masalliqlar_matni": "200g Pechenye ushog'i, 450g Tvorojniy pishloq, 150g Shakar, 3 dona Tuxum, 2 dona Olma, 50g Saryog'",
  "korsatmalari": [
    "1. Pechenyedan korj tayyorlang.",
    "2. Tvorojniy pishloq va shakarni ko'pirtiring, tuxum soling va pishiring.",
    "3. Olmalarni sariyog'da qovurib karamel bilan ustiga yoying."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_007_frozen_avocado_cake",
  "nomi": "Muzlatilgan Avokado va Laymli Yengil Desert",
  "tayyorlash_vaqti_daq": 20,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Yozgi salqin avokado va laym ta'mli muzlatilgan mevali tort.",
  "masalliqlar_matni": "2 dona Avokado, 1 banka Sgushchenka, 2 dona Laym sharbati, 180g Pechenye korj",
  "korsatmalari": [
    "1. Avokado, sgushchenka va laym sharbatini blenderda pashshaday silliq ezing.",
    "2. Pechenye korjiga quyib 6 soat muzlatgich kamerada tuting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_008_chocolate_zucchini_cake",
  "nomi": "Shokoladli va Zukkinili Nam Keks",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Zukkini va qora shokoladli g'ovakli yumshoq keks.",
  "masalliqlar_matni": "250g Un, 50g Kakao, 150g Shakar, 2 dona Tuxum, 1 dona Rendalangan Zukkini, 100ml O'simlik yog'i",
  "korsatmalari": [
    "1. Masalliqlarni aralashtirib zukkini va kakaoni qo'shing.",
    "2. 180°C pechda 40 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_009_fresh_fruit_tart",
  "nomi": "Yangi Mevali va Bodomli Pirog",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Bodomli xamir ustiga rezavor mevalar terilgan chiroyli frantsuzcha tart.",
  "masalliqlar_matni": "150g Un, 70g Bodom uni, 80g Saryog', 1 dona Tuxum, Yangi mevalar (qulupnay, malina)",
  "korsatmalari": [
    "1. Bodomli korj pishirib sovuting.",
    "2. Ustiga krem surtib yangi mevalar bilan bezang."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_010_pear_hazelnut_tart",
  "nomi": "Nokli va Funtukli Bodomli Pirog",
  "tayyorlash_vaqti_daq": 55,
  "qiyinlik": "qiyin",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Nok parraklari va funtuk yong'og'li krem uyg'unligi.",
  "masalliqlar_matni": "100g Funtuk yong'og'i, 100g Shakar, 35g Un, 90g Saryog', 2 dona Tuxum, 3 dona Nok",
  "korsatmalari": [
    "1. Funtuk va shakarni blenderda ezib krem tayyorlang.",
    "2. Korjga krem surtib nok parraklarini terib 175°C pechda 45 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_011_pistachio_plum_tart",
  "nomi": "Pista va Qizil Olxo'rili Pirog",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Maydalangan pista kremi va sharbatli qizil olxo'rili nozik pirog.",
  "masalliqlar_matni": "100g Pista, 100g Shakar, 100g Saryog', 2 dona Tuxum, 5 dona Qizil Olxo'ri",
  "korsatmalari": [
    "1. Pista va sariyog'dan krem tayyorlang.",
    "2. Olxo'rilarni to'g'rab korjga terib 180°C pechda 40 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_012_ice_cream_cake",
  "nomi": "Ikki Qatlamli Mevali Muzqaymoqli Tort",
  "tayyorlash_vaqti_daq": 30,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Vanil va meva ta'mli muzlatilgan salqin desert.",
  "masalliqlar_matni": "1 litr Muzqaymoq, 200g Pechenye ushog'i, 80g Saryog', 100g Mevali murabbo",
  "korsatmalari": [
    "1. Pechenyedan korj tayyorlang va muzqaymoqni qatlam qilib yoying va muzlatgichda tuting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_013_almond_raspberry_icecream",
  "nomi": "Bodomli va Malinali Uy Muzqaymog'i",
  "tayyorlash_vaqti_daq": 20,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Pishirilmaydigan qaymoq va malina sousli tabiiy muzqaymoq.",
  "masalliqlar_matni": "400ml Qaymoq, 1 banka Sgushchenka, 150g Malina, 50g Bodom bo'laklari",
  "korsatmalari": [
    "1. Qaymoq va sgushchenkani ko'pirtirib malina va bodom aralashtirib 5 soat muzlatgichda qotiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_014_mint_chocolate_icecream",
  "nomi": "Yangi Yalpizli va Shokoladli Muzqaymoq",
  "tayyorlash_vaqti_daq": 20,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Salqin yalpiz va qora shokolad bo'lakli muzqaymoq.",
  "masalliqlar_matni": "400ml Qaymoq, 1 banka Sgushchenka, Yalpiz barglari, 100g Qora shokolad tomchilari",
  "korsatmalari": [
    "1. Masalliqlarni ko'pirtirib muzlatgichda 5 soat qotiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_015_cassava_cake",
  "nomi": "Kassava va Kokosli Sharq Keksi",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Kokos sutida pishirilgan yumshoq sharqona keks.",
  "masalliqlar_matni": "300g Kassava uni, 200ml Kokos suti, 1 banka Sgushchenka, 2 dona Tuxum",
  "korsatmalari": [
    "1. Masalliqlarni aralashtirib 180°C pechda 45 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_016_labneh_lime_icecream",
  "nomi": "Suzmali va Laymli Muzqaymoq",
  "tayyorlash_vaqti_daq": 20,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Nordon suzma va laym sharbatli yengil desert.",
  "masalliqlar_matni": "200g Suzma, 200ml Qaymoq, 1 banka Sgushchenka, 2 dona Laym sharbati",
  "korsatmalari": [
    "1. Aralashtirib muzlatgichda 4 soat tuting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_017_mango_coconut_mousse",
  "nomi": "Tropik Mango va Kokosli Mus Deserti",
  "tayyorlash_vaqti_daq": 25,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Mango va kokos qaymoqli havoday yengil mus deserti.",
  "masalliqlar_matni": "200g Mango pyuresi, 200ml Kokos qaymog'i, 50g Shakar kukuni",
  "korsatmalari": [
    "1. Ko'pirtirib stakanlarga quyib 2 soat sovitib torting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_018_lemon_meringue_pie",
  "nomi": "Limonli va Meringali Salqin Pirog",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Limon kremi va usti oppoq ko'pirtirilgan meringali pirog.",
  "masalliqlar_matni": "1 dona Korj, 3 dona Limon sharbati va po'sti, 1 banka Sgushchenka, 3 dona Tuxum oqi",
  "korsatmalari": [
    "1. Limonli kremni korjga quying, ustiga ko'pirtirilgan meringa yoyib 10 daqiqa pechda pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_019_red_velvet_cake",
  "nomi": "Klassik Qizil Barxat Torti",
  "tayyorlash_vaqti_daq": 60,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Shohona qizil biskvit va tvorojniy krem-chizli mashhur tort.",
  "masalliqlar_matni": "300g Un, 200g Shakar, 2 dona Tuxum, 200ml Qatiq, 300g Tvorojniy pishloq",
  "korsatmalari": [
    "1. Biskvit tayyorlab 180°C pechda 30 daqiqa pishiring va sovutib krem surting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_020_strawberry_shortcake",
  "nomi": "Qulupnayli va Qaymoqli Mayin Keks",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Sharbatli qulupnay va ko'pirtirilgan qaymoqli mayin keks.",
  "masalliqlar_matni": "400g Qulupnay, 360g Un, 115g Saryog', 180ml Sut, 250ml Qaymoq",
  "korsatmalari": [
    "1. Keks pishirib ikkiga bo'ling va qaymoq hamda qulupnay solib yoping."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_qulupnay",
    "ing_un",
    "ing_saryog",
    "ing_sut",
    "ing_qaymoq"
  ]
},
  {
  "id": "rec_hd_021_cinnamon_scones",
  "nomi": "Dolchinli va Saryog'li Shirin Skonlar",
  "tayyorlash_vaqti_daq": 35,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Dolchinli va Saryog'li Shirin Skonlar — 8-10 dona. Qarsildoq va saryog'li mayin pishiriq.",
  "masalliqlar_matni": "300 g un, 100 g muzday saryog', 70 g shakar, 1 dona tuxum, 120 ml sut, 1 osh qoshiq dolchin, 1 choy qoshiq razraxlitel",
  "korsatmalari": [
    "1. Pechni 200°C gacha qizdiring va patnisga pergament qog'oz yozing.",
    "2. Chuqur idishda un, shakar, dolchin va razraxlitelni elab aralashtiring.",
    "3. Muzday saryog'ni mayda kubik qilib to'g'rab qumsimon massa hosil qiling va yumshoq xamir qoring.",
    "4. Xamirni 2 sm qalinlikda yoyib 8 ta bo'lakka kesing va 15-18 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum",
    "ing_sut",
    "ing_dolchin",
    "ing_razraxlitel"
  ]
},
  {
  "id": "rec_hd_022_vanilla_cupcakes",
  "nomi": "Vanilli Kapkeyklar Krem-Chizli Krem Bilan",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Vanilli Kapkeyklar Krem-Chizli Krem Bilan — 12 dona. Mayin va shirali mini-kekslar.",
  "masalliqlar_matni": "250 g un, 200 g shakar, 115 g saryog', 2 dona tuxum, 180 ml sut, 200 g tvorojniy pishloq",
  "korsatmalari": [
    "1. Kapkeyk xamiri tayyorlab qoliplarga soling.",
    "2. 180°C pechda 20 daqiqa pishirib sovuting va ustiga krem surting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_shakar",
    "ing_saryog",
    "ing_tuxum",
    "ing_sut",
    "ing_vanilin",
    "ing_tvorojniy_pishloq"
  ]
},
  {
  "id": "rec_hd_023_pumpkin_pancakes",
  "nomi": "Oshqovoqli va Asalli Mayin Pankeyklar",
  "tayyorlash_vaqti_daq": 25,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Oshqovoqli va Asalli Mayin Pankeyklar — 4 kishilik. Kuzgi boy vitaminli nonushta.",
  "masalliqlar_matni": "200 g oshqovoq pyuresi, 250 g un, 2 dona tuxum, 250 ml sut, 3 osh qoshiq asal, 50 g saryog'",
  "korsatmalari": [
    "1. Masalliqlarni birga ko'pirtirib xamir tayyorlang.",
    "2. Tovada ikkala tomonini qizarguncha pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_qovoq",
    "ing_un",
    "ing_tuxum",
    "ing_sut",
    "ing_asal",
    "ing_saryog"
  ]
},
  {
  "id": "rec_hd_024_blueberry_pie",
  "nomi": "Chernikali Xushbo'y Pirog",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Chernikali Xushbo'y Pirog — 8 kishilik. Sharbatli rezavor mevali qarsildoq pirog.",
  "masalliqlar_matni": "300 g un, 150 g saryog', 1 dona tuxum, 400 g chernika, 100 g shakar",
  "korsatmalari": [
    "1. Xamir tayyorlab qolipga yoying va chernikali ichlikni solib 190°C pechda 40 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_tuxum",
    "ing_chernika",
    "ing_shakar"
  ]
},
  {
  "id": "rec_hd_025_blackberry_cheesecake",
  "nomi": "Maymunjonli Chizkeyk",
  "tayyorlash_vaqti_daq": 70,
  "qiyinlik": "qiyin",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Maymunjonli Chizkeyk — 10 kishilik. Tvorojniy pishloq va maymunjonli sous.",
  "masalliqlar_matni": "200 g pechenye, 500 g tvorojniy pishloq, 150 g shakar, 250 g maymunjon",
  "korsatmalari": [
    "1. Korj tayyorlab tvorojniy kremni quying va 160°C pechda 50 daqiqa pishirib sovutib torting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_pechenye",
    "ing_saryog",
    "ing_tvorojniy_pishloq",
    "ing_shakar",
    "ing_maymunjon"
  ]
},
  {
  "id": "rec_hd_026_raspberry_cream_pie",
  "nomi": "Malinali va Qaymoqli Pirog",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Malinali va Qaymoqli Pirog — 8 kishilik. Yangi malina va ko'pirtirilgan krem.",
  "masalliqlar_matni": "1 dona pirog korji, 300 g malina, 400 ml sut, 3 dona tuxum sarig'i, 200 ml qaymoq",
  "korsatmalari": [
    "1. Pishgan korj ustiga krem va yangi malinalarni yoyib 2 soat sovitib torting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_pirog_korji",
    "ing_malina",
    "ing_sut",
    "ing_tuxum",
    "ing_qaymoq"
  ]
},
  {
  "id": "rec_hd_027_chocolate_roll_cookies",
  "nomi": "Shokoladli Rulet Bulochkalar",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Shokoladli Rulet Bulochkalar — 12 dona. Xushbo'y va shirin shokoladli bulochka.",
  "masalliqlar_matni": "350 g un, 1 choy qoshiq drojji, 150 ml sut, 150 g shokolad tomchilari",
  "korsatmalari": [
    "1. Xamir oshirib shokolad sepib rulet o'rang va 180°C pechda 25 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_xamirturush",
    "ing_sut",
    "ing_shokolad_tomchilari"
  ]
},
  {
  "id": "rec_hd_028_apple_pie",
  "nomi": "Amerikancha Qarsildoq Olmali Pirog",
  "tayyorlash_vaqti_daq": 60,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Amerikancha Qarsildoq Olmali Pirog — 8 kishilik. Dolchinli va shirali olma to'ldirmali pirog.",
  "masalliqlar_matni": "320 g un, 180 g saryog', 5 dona olma, 100 g shakar, 1 osh qoshiq dolchin",
  "korsatmalari": [
    "1. Xamir yoyib olma ichlik soling va 190°C pechda 45 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_olma",
    "ing_shakar",
    "ing_dolchin"
  ]
},
  {
  "id": "rec_hd_029_cranberry_pie",
  "nomi": "Nantaketcha Klyukvali va Yong'oqli Pirog",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Nantaketcha Klyukvali va Yong'oqli Pirog — 8 kishilik. Yong'oqli va klyukvali tezkor pirog.",
  "masalliqlar_matni": "2 stakan klyukva, 1/2 stakan yong'oq mag'zi, 1 stakan un, 115 g saryog', 2 dona tuxum",
  "korsatmalari": [
    "1. Qolipga meva va yong'oq yoyib xamir quying va 175°C pechda 40 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_klyukva",
    "ing_yongoq",
    "ing_un",
    "ing_saryog",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_030_blueberry_lemon_rolls",
  "nomi": "Chernikali va Limonli Shirin Ruletlar",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Chernikali va Limonli Shirin Ruletlar — 12 dona. Limon aromatli chernikali bulochkalar.",
  "masalliqlar_matni": "380 g un, 1 stakan sut, 200 g chernika, 1 dona limon po'sti rendasi",
  "korsatmalari": [
    "1. Xamir oshirib chernika va limon rendasi sepib 180°C pechda 25 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_sut",
    "ing_chernika",
    "ing_limon"
  ]
},
  {
  "id": "rec_hd_031_chicken_potato_gratin",
  "nomi": "Tovuqli va Kartoshkali Saryog'li Gratin",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Tovuqli va Kartoshkali Saryog'li Gratin — 6 kishilik. Yumshoq pishirilgan qaymoqli toba taom.",
  "masalliqlar_matni": "500g Tovuq go'shti, 500g Kartoshka, 200ml Qaymoq, 50g Saryog', 1 tish Sarimsoq, Tuz va Murch",
  "korsatmalari": [
    "1. Kartoshkalarni yupqa parrak qilib kesing.",
    "2. Tovuq go'shtini ziravorlar bilan qovurib oling.",
    "3. Qolipga kartoshka va tovuqni qatlam qilib terib, qaymoq va sariyog' quying.",
    "4. 180°C pechda 40 daqiqa qizarguncha pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_tovuq",
    "ing_kartoshka",
    "ing_qaymoq",
    "ing_saryog",
    "ing_tuz"
  ]
},
  {
  "id": "rec_hd_032_creamy_mashed_potatoes",
  "nomi": "Krem-Smetanali Yumshoq Kartoshka Pyuresi",
  "tayyorlash_vaqti_daq": 25,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Krem-Smetanali Yumshoq Kartoshka Pyuresi — 4 kishilik. Sariyog' va smetana bilan boyitilgan mayin garnir.",
  "masalliqlar_matni": "1kg Kartoshka, 100g Saryog', 150ml Smetana, 100ml Sut, Tuz",
  "korsatmalari": [
    "1. Kartoshkani tuzli suvda pishirib oling va suvidan ajrating.",
    "2. Sariyog', smetana va issiq sut solib mikser yoki ezgich bilan silliq pyure qiling."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_kartoshka",
    "ing_saryog",
    "ing_smetana",
    "ing_sut",
    "ing_tuz"
  ]
},
  {
  "id": "rec_hd_033_coconut_creamed_corn",
  "nomi": "Kokos Sutida Pishirilgan Makkajo'xori",
  "tayyorlash_vaqti_daq": 25,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Kokos Sutida Pishirilgan Makkajo'xori — 4 kishilik. Tropik xushbo'y va shirin taom.",
  "masalliqlar_matni": "300g Shiringo'sht Makkajo'xori, 200ml Kokos suti, 30g Saryog', Tuz va Murch",
  "korsatmalari": [
    "1. Makkajo'xorini sariyog'da 3 daqiqa qovuring.",
    "2. Kokos sutini quyib past olovda 15 daqiqa quyuqlashguncha pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_makkajoxori_un",
    "ing_sut",
    "ing_saryog",
    "ing_tuz"
  ]
},
  {
  "id": "rec_hd_034_tomato_garlic_pie",
  "nomi": "Sarimsoq va Pomidorli Qarsildoq Pirog",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Sarimsoq va Pomidorli Qarsildoq Pirog — 6 kishilik. Yangi pomidor va pishloqli tart.",
  "masalliqlar_matni": "1 dona Tayyor Korj, 3 dona Pomidor, 3 tish Sarimsoq, 150g Pishloq, Zaytun yog'i",
  "korsatmalari": [
    "1. Korjga rendalangan pishloq va sarimsoq yoying.",
    "2. Ustidan pomidor parraklarini terib 190°C pechda 30 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_pomidor",
    "ing_sarimsoq",
    "ing_pishloq",
    "ing_un"
  ]
},
  {
  "id": "rec_hd_035_sourcream_potato_salad",
  "nomi": "Smetana va Ko'k Piyozli Kartoshka Salati",
  "tayyorlash_vaqti_daq": 20,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Smetana va Ko'k Piyozli Kartoshka Salati — 4 kishilik. Salqin va to'yimli mehmondorchilik salati.",
  "masalliqlar_matni": "500g Pishirilgan Kartoshka, 150g Smetana, 1 bog' Ko'k piyoz, Tuz va Murch",
  "korsatmalari": [
    "1. Kartoshkani kubik to'g'rang.",
    "2. Smetana va ko'k piyoz bilan aralashtirib 30 daqiqa muzlatgichda tuting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_kartoshka",
    "ing_smetana",
    "ing_piyoz",
    "ing_tuz"
  ]
},
  {
  "id": "rec_hd_036_dakgangjeong_korean_chicken",
  "nomi": "Koreyscha Shiringo'sht Qovurilgan Tovuq",
  "tayyorlash_vaqti_daq": 35,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Koreyscha Shiringo'sht Qovurilgan Tovuq — 4 kishilik. Qarsildoq va asalli sousli tovuq bo'laklari.",
  "masalliqlar_matni": "500g Tovuq filalari, 3 osh qoshiq Asal, 2 osh qoshiq Soya sousi, Kraxmal, Qovurish uchun yog'",
  "korsatmalari": [
    "1. Tovuqni kraxmalga bulab yog'da qarsillab qovuring.",
    "2. Asal va soya sousini qaynatib qovurilgan tovuqni sousga bulang."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_tovuq",
    "ing_asal",
    "ing_kraxmal",
    "ing_osimlik_yogi"
  ]
},
  {
  "id": "rec_hd_037_salted_pbj_icecream_pie",
  "nomi": "Araxas Yog'i va Murabboli Muzqaymoqli Pirog",
  "tayyorlash_vaqti_daq": 25,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Araxas Yog'i va Murabboli Muzqaymoqli Pirog — 8 kishilik.",
  "masalliqlar_matni": "200g Pechenye, 150g Araxas yog'i, 500g Vanilli muzqaymoq, 100g Qulupnay murabbosi",
  "korsatmalari": [
    "1. Pechenye va araxas yog'idan korj qilib muzqaymoq quyib 4 soat muzlatgichda tuting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_pechenye",
    "ing_araxis",
    "ing_qulupnay"
  ]
},
  {
  "id": "rec_hd_038_tamale_pie",
  "nomi": "Pomidor va Makkajo'xorili Tamale Pirogi",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Pomidor va Makkajo'xorili Tamale Pirogi — 6 kishilik. Makkajo'xori xamiri va pomidorli taom.",
  "masalliqlar_matni": "200g Makkajo'xori uni, 3 dona Pomidor, 150g Pishloq, 1 dona Piyoz, Ziravorlar",
  "korsatmalari": [
    "1. Pomidor va piyozni qovurib qolipga soling.",
    "2. Ustiga makkajo'xori xamirini yoyib 180°C pechda 35 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_makkajoxori_un",
    "ing_pomidor",
    "ing_pishloq",
    "ing_piyoz"
  ]
},
  {
  "id": "rec_hd_039_plantain_chips",
  "nomi": "Qovurilgan Banan Qarsildoqlari va Mango Sousi",
  "tayyorlash_vaqti_daq": 20,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Qarsildoq banan chipsi va nordon mango sousi.",
  "masalliqlar_matni": "2 dona Banan / Plantayn, Qovurish uchun yog', 1 dona Mango, 1 dona Laym",
  "korsatmalari": [
    "1. Bananni yupqa kesib qarsillab qovuring va mango eziqlanib sous bilan suzing."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_osimlik_yogi",
    "ing_laym"
  ]
},
  {
  "id": "rec_hd_040_mississippi_corn_pudding",
  "nomi": "Makkajo'xorili Puding-Pirog",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Shohona makkajo'xorili va qaymoqli pishiriq puding.",
  "masalliqlar_matni": "300g Makkajo'xori, 100g Saryog', 3 dona Tuxum, 100ml Sut, 2 osh qoshiq Un",
  "korsatmalari": [
    "1. Masalliqlarni aralashtirib 175°C pechda 40 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_makkajoxori_un",
    "ing_saryog",
    "ing_tuxum",
    "ing_sut",
    "ing_un"
  ]
},
  {
  "id": "rec_hd_041_strawberry_balsamic_shortcakes",
  "nomi": "Qulupnayli va Balzamikli Qarsildoq Kekslar",
  "tayyorlash_vaqti_daq": 35,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Qulupnay va qaymoqli qarsildoq mini-kekslar.",
  "masalliqlar_matni": "250g Un, 100g Saryog', 300g Qulupnay, 200ml Qaymoq, 50g Shakar",
  "korsatmalari": [
    "1. Kekslarni pishirib ikkiga bo'ling va qaymoq hamda qulupnay soling."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_qulupnay",
    "ing_qaymoq",
    "ing_shakar"
  ]
},
  {
  "id": "rec_hd_042_strawberry_coconut_cake",
  "nomi": "Qulupnayli va Kokosli Mayin Tort",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Kokos ushoqlari va qulupnayli shohona biskvit tort.",
  "masalliqlar_matni": "250g Un, 50g Kokos ushog'i, 150g Shakar, 3 dona Tuxum, 300g Qulupnay",
  "korsatmalari": [
    "1. Kokosli biskvit pishirib krem va qulupnay bilan qatlang."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_shakar",
    "ing_tuxum",
    "ing_qulupnay"
  ]
},
  {
  "id": "rec_hd_043_tea_cakes",
  "nomi": "Klassik Inglis Choy Pechenyesi",
  "tayyorlash_vaqti_daq": 25,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Choy va kofe bilan tanavvul qilinadigan mayin pechenye.",
  "masalliqlar_matni": "250g Un, 100g Saryog', 100g Shakar, 1 dona Tuxum, 1 choy qoshiq Razraxlitel",
  "korsatmalari": [
    "1. Xamirdan doiralar kesib 180°C pechda 12 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_044_roasted_strawberry_cake",
  "nomi": "Qovurilgan Qulupnayli Ko'p Qavatli Tort",
  "tayyorlash_vaqti_daq": 60,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Pechda karamellangan qulupnayli bayramona tort.",
  "masalliqlar_matni": "300g Un, 200g Shakar, 4 dona Tuxum, 400g Qulupnay, 200ml Qaymoq",
  "korsatmalari": [
    "1. Qulupnayni shakar bilan 10 daqiqa pechda qovurib sovuting.",
    "2. Biskvitlar orasiga qaymoq va qulupnay yoyib tort tayyorlang."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_shakar",
    "ing_tuxum",
    "ing_qulupnay",
    "ing_qaymoq"
  ]
},
  {
  "id": "rec_hd_045_camouflage_fudge_brownies",
  "nomi": "Shokoladli Kamuflyaj Fadj-Brauni",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Tvorojniy pishloq va qora shokoladli ikki rangli brauni.",
  "masalliqlar_matni": "200g Qora shokolad, 150g Saryog', 150g Shakar, 3 dona Tuxum, 100g Tvorojniy pishloq, 100g Un",
  "korsatmalari": [
    "1. Shokoladli xamir va tvorojli kremni patnisga qatlam qilib soling va 175°C pechda 25 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_shokolad_tomchilari",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum",
    "ing_tvorojniy_pishloq",
    "ing_un"
  ]
},
  {
  "id": "rec_hd_046_sourcream_onion_biscuits",
  "nomi": "Smetana va Ko'k Piyozli Qarsildoq Bulochkalar",
  "tayyorlash_vaqti_daq": 30,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Sho'r va ko'k piyozli saryog'li qarsildoq bulochka.",
  "masalliqlar_matni": "300g Un, 100g Saryog', 150ml Smetana, 1 bog' Ko'k piyoz, 1 choy qoshiq Razraxlitel",
  "korsatmalari": [
    "1. Quruq masalliqlarga sariyog' va ko'k piyoz aralashtirib bulochkalar pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_smetana",
    "ing_piyoz"
  ]
},
  {
  "id": "rec_hd_047_buckwheat_chocolate_cookies",
  "nomi": "Shokoladli va Grechka Unli Qarsildoq Pechenye",
  "tayyorlash_vaqti_daq": 30,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Grechka uni va qora shokolad bo'lakli to'yimli pechenye.",
  "masalliqlar_matni": "150g Bug'doy uni, 100g Grechka uni, 100g Saryog', 100g Shakar, 1 dona Tuxum, 100g Shokolad",
  "korsatmalari": [
    "1. Xamirdan sharchalar yasab 180°C pechda 12 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum",
    "ing_shokolad_tomchilari"
  ]
},
  {
  "id": "rec_hd_048_apple_bread_pudding",
  "nomi": "Olma va Dolchinli Non Pudingi",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Nondan pishiriladigan olma va dolchinli mazali puding.",
  "masalliqlar_matni": "200g Non bo'laklari, 2 dona Olma, 2 dona Tuxum, 200ml Sut, 50g Shakar, 1 choy qoshiq Dolchin",
  "korsatmalari": [
    "1. Non va olmalarni qolipga solib sut-tuxumli aralashmani quying va 180°C da 30 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_olma",
    "ing_tuxum",
    "ing_sut",
    "ing_shakar",
    "ing_dolchin"
  ]
},
  {
  "id": "rec_hd_049_lemon_raspberry_chewy_cookies",
  "nomi": "Limon va Malinali Chevik-Pechenye",
  "tayyorlash_vaqti_daq": 30,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Limon po'sti va yangi malinali yumshoq pechenye.",
  "masalliqlar_matni": "250g Un, 100g Saryog', 100g Shakar, 1 dona Limon po'sti, 100g Malina",
  "korsatmalari": [
    "1. Masalliqlarni aralashtirib 175°C pechda 12 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_shakar",
    "ing_limon",
    "ing_malina"
  ]
},
  {
  "id": "rec_hd_050_chocolate_almond_biscotti",
  "nomi": "Shokolad va Bodomli Qarsildoq Biscotti",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Italiya uslubidagi qarsildoq bodomli va shokoladli biskotti.",
  "masalliqlar_matni": "250g Un, 100g Bodom, 100g Shakar, 2 dona Tuxum, 50g Kakao",
  "korsatmalari": [
    "1. Xamirni batton qilib pishiring, so'ng ingichka kesib ikki tarafini qarsillatib pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_bodom",
    "ing_shakar",
    "ing_tuxum",
    "ing_kakao"
  ]
},
  {
  "id": "rec_hd_051_orange_caramel_cake",
  "nomi": "Apelsinli va Karamel Glazurli Keks",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Tsitrus xushbo'yligi va karamel shira quyilgan keks.",
  "masalliqlar_matni": "250g Un, 1 dona Apelsin sharbati, 150g Shakar, 100g Saryog', 3 dona Tuxum, Karamel sousi",
  "korsatmalari": [
    "1. Keks pishirib ustidan issiq karamel sousini quying."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_shakar",
    "ing_saryog",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_052_pistachio_raspberry_roll",
  "nomi": "Pista va Malinali Shohona Rulet",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "qiyin",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Maydalangan pista va malina djemli biskvit rulet.",
  "masalliqlar_matni": "4 dona Tuxum, 100g Shakar, 80g Un, 50g Pista kukun, 150g Malina djemi",
  "korsatmalari": [
    "1. Yupqa biskvit pishirib malina djemi va pista sepib o'rang."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_tuxum",
    "ing_shakar",
    "ing_un",
    "ing_malina"
  ]
},
  {
  "id": "rec_hd_053_chicken_pot_pie",
  "nomi": "Tovuqli va Sabzavotli Qarsildoq Pirog",
  "tayyorlash_vaqti_daq": 55,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Tovuq go'shti, sabzi va makkajo'xorili quyuq pirog.",
  "masalliqlar_matni": "300g Tovuq go'shti, 1 dona Sabzi, 100g Makkajo'xori, 1 varaq Katlama xamir, 100ml Qaymoq",
  "korsatmalari": [
    "1. Sabzavot va tovuqni qaymoqda dimlab qolipga soling va katlama xamir bilan yopib 190°C da 30 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_tovuq",
    "ing_sabzi",
    "ing_makkajoxori_un",
    "ing_qatlama_xamir",
    "ing_qaymoq"
  ]
},
  {
  "id": "rec_hd_054_creamy_butter_pasta",
  "nomi": "Sariyog'li va Pishloqli Uy Ugrasi",
  "tayyorlash_vaqti_daq": 20,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Bolalar uchun eng sevimli sariyog'li va pishloqli makaron.",
  "masalliqlar_matni": "250g Makaron / Ugra, 50g Saryog', 100g Rendalangan Pishloq, Tuz",
  "korsatmalari": [
    "1. Ugrani pishirib issiq holda sariyog' va pishloq bilan aralashtiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_pishloq",
    "ing_tuz"
  ]
},
  {
  "id": "rec_hd_055_baked_cheese_flatbread",
  "nomi": "Pishirilgan Lavashli va Pishloqli Somsa",
  "tayyorlash_vaqti_daq": 20,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Tezkor va qarsildoq pishloqli lavash sarmasi.",
  "masalliqlar_matni": "2 dona Lavash, 200g Pishloq, 1 dona Tuxum, Kunjut",
  "korsatmalari": [
    "1. Lavashga pishloq o'rab tuxum surting va 200°C pechda 12 daqiqa qizartiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_pishloq",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_056_cherry_almond_cake",
  "nomi": "Gilosli va Bodomli Shirmoy Pirog",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Yangi gilos va bodom uni bilan pishirilgan keks.",
  "masalliqlar_matni": "200g Un, 50g Bodom uni, 150g Shakar, 3 dona Tuxum, 200g Gilos",
  "korsatmalari": [
    "1. Xamir tayyorlab giloslarni soling va 180°C pechda 40 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_bodom",
    "ing_shakar",
    "ing_tuxum",
    "ing_gilos"
  ]
},
  {
  "id": "rec_hd_057_caramel_cocoa_crumble",
  "nomi": "Karamelli va Kakao Ushoqli Keks",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Shokoladli ushoq va karamel qiyomli pirog.",
  "masalliqlar_matni": "250g Un, 40g Kakao, 150g Shakar, 100g Saryog', Karamel sousi",
  "korsatmalari": [
    "1. Kakao xamiri ustiga ushoq seping va pishgach karamel quyib suzing."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_kakao",
    "ing_shakar",
    "ing_saryog"
  ]
},
  {
  "id": "rec_hd_058_almond_lime_tart",
  "nomi": "Bodom va Laymli Yengil Desert",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Laym nordonligi va bodomli qarsildoq tart korji.",
  "masalliqlar_matni": "1 dona Bodom korji, 1 banka Sgushchenka, 2 dona Laym sharbati, 2 dona Tuxum sarig'i",
  "korsatmalari": [
    "1. Laym va sgushchenka kremini korjga quyib 15 daqiqa pechda pishiring va 3 soat sovitib torting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_bodom",
    "ing_sgushchenka",
    "ing_laym",
    "ing_tuxum"
  ]
},
  {
  "id": "rec_hd_059_moroccan_chicken_stew",
  "nomi": "Tovuqli va Zaytunli Sharqona Qozon Taom",
  "tayyorlash_vaqti_daq": 55,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Tovuq go'shti, limon va zaytun bilan qozonda dimlangan taom.",
  "masalliqlar_matni": "600g Tovuq go'shti, 1 dona Limon, 100g Zaytun, 1 dona Piyoz, Sharq ziravorlari",
  "korsatmalari": [
    "1. Tovuq va piyozni qovurib limon va zaytun bilan 40 daqiqa past olovda dimlang."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_tovuq",
    "ing_limon",
    "ing_piyoz"
  ]
},
  {
  "id": "rec_hd_060_caramel_pear_pie",
  "nomi": "Nokli va Dolchinli Karamel Pirog",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Pechda karamellangan nok parraklari va dolchinli xushbo'y pirog.",
  "masalliqlar_matni": "3 dona Nok, 100g Shakar, 50g Saryog', 250g Un, 1 choy qoshiq Dolchin",
  "korsatmalari": [
    "1. Noklarni sariyog' va shakarda 5 daqiqa qovuring, xamir yoyib 180°C pechda 35 daqiqa pishiring."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_saryog",
    "ing_shakar",
    "ing_un",
    "ing_dolchin"
  ]
},
  {
    id: 'rec_01_toshkent_palov',
    nomi: "Toshkent To'y Palovi",
    tayyorlash_vaqti_daq: 90,
    qiyinlik: 'qiyin',
    rasm_url: '/assets/images/toshkent_palov_1785171559097.png',
    tarif_matni: "Toshkent shahrining eng mashhur to'y va marosim palovi. Lazer guruchi, no'xat, mayiz va qazi bilan boyitilgan haqiqiy milliy shohona taom.",
    masalliqlar_matni: "Guruch (1kg), Qo'y go'shti (800g), Mol go'shti (200g), Paxta yog'i (200ml), Sariq sabzi (1kg), Piyoz (200g), No'xat (100g), Sarimsoq, Zira, Mayiz, Qazi va Bedana tuxumlari.",
    korsatmalari: [
      "Guruchni 5-6 marta kraxmali ketguncha yuving va 35°C iliq sho'r suvda 1 soat ivitib qo'ying.",
      "Qozonda paxta yog'ini tutun chiqquncha qizdirib, katta go'sht bo'laklarini solib to'q qizil qobiq bo'lguncha qovuring.",
      "Piyoz va somoncha to'g'ralgan sariq sabzini solib yumshaguncha qovuring.",
      "Zirvak uchun tuz, zira, ivitilgan no'xat, mayiz va sarimsoq solib, suv quying va past olovda 45 daqiqa qaynating.",
      "Guruchni yotqizib baland olovda suvini torttiring, so'ng tayoqcha bilan teshiklar qilib, 25 daqiqa past olovda dimlang.",
      "Laganga suzib, ustini to'g'ralgan go'sht, qazi va bedana tuxumlari bilan bezating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_guruch', 'ing_qoy', 'ing_sabzi', 'ing_piyoz', 'ing_noxat']
  },
  {
    id: 'rec_02_samarqand_sofi',
    nomi: 'Samarqand Oshi Sofi',
    tayyorlash_vaqti_daq: 105,
    qiyinlik: 'qiyin',
    rasm_url: '/assets/images/samarqand_sofi_1785171573472.png',
    tarif_matni: "Masalliqlari strictly qatlamlarda pishiriladigan va aralashtirmasdan suziladigan afsonaviy Samarqand sofi palovi.",
    masalliqlar_matni: "Basmati/Alanga guruchi (800g), Mol go'shti (800g), Sariyog' (150ml), Piyoz (300g), Sabzi (800g), No'xat, Mayiz, Sarimsoq va Zira.",
    korsatmalari: [
      "Guruchni yuving va iliq sho'r suvda 2 soat iviting.",
      "Qozonda sariyog'da katta mol go'shti bo'laklarini va piyozni qovuring, ozgina suv qup 1 soat dimlang.",
      "Go'sht ustiga somoncha sabzi, zira, no'xat va mayizni qatlam qilib salang (aralashtirmang!).",
      "Ustidan ivigan guruchni yotqizib, sho'r suv quying va baland olovda qaynatib suvini torttiring.",
      "20 daqiqa dimlang. Laganga avval guruch, so'ng sabzi va eng tepasiga yumshoq go'shtlarni suzing."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_guruch', 'ing_mol', 'ing_sabzi', 'ing_piyoz']
  },
  {
    id: 'rec_03_fargona_devzira',
    nomi: "Farg'ona Devzira Palovi",
    tayyorlash_vaqti_daq: 110,
    qiyinlik: 'qiyin',
    rasm_url: '/assets/images/fargona_devzira_1785171601208.png',
    tarif_matni: "Farg'ona vodiysining qizil Devzira guruchidan tayyorlanadigan achchiq va to'q rangli o'ziga xos to'yimli palov.",
    masalliqlar_matni: "Devzira guruchi (900g), Qo'y go'shti va qovurg'asi (750g), Dumba yog'i va paxta yog'i (250ml), Qizil sabzi (900g), Piyoz (600g), Qizil achchiq qalampir va sarimsoq.",
    korsatmalari: [
      "Devzira guruchini 6-7 marta yaxshilab yuvib, sho'r suvda 1 soat iviting.",
      "Qozonda dumba yog'i va paxta yog'ida piyozni to'q tillarang bo'lguncha, so'ng go'shtni 20 daqiqa qovuring.",
      "Sabzini solib 10 daqiqa qovurib, suv, butun qalampir va sarimsoq solib zirvakni 1 soat sekin qaynating.",
      "Guruchni solib baland olovda jadal qaynatib suvini torttiring va 25 daqiqa past olovda dimlang."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_guruch', 'ing_qoy', 'ing_sabzi', 'ing_piyoz', 'ing_qalampir']
  },
  {
    id: 'rec_04_buxoro_baxsh',
    nomi: 'Buxoro Baxsh Palovi',
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'orta',
    rasm_url: '/assets/images/buxoro_baxsh_1785171615342.png',
    tarif_matni: "Buxoro shahrining afsonaviy 'yashil palovi'. Ko'p miqdordagi yangi kashnich va shivit bilan go'sht va jigar mayda to'g'ralib pishiriladi.",
    masalliqlar_matni: "Dumaloq guruch (400g), Mol jigari (250g), Mol go'shti (250g), Kashnich va shivit (4 dasta), Piyoz (2 dona), O'simlik yog'i (60ml), Tuz va murch.",
    korsatmalari: [
      "Jigar va go'shtni mayda (0.5cm) kubik qilib qo'lda to'g'rang. Kashnich va shivitni juda nozik to'g'rang.",
      "Yog'da piyozni, so'ng go'sht va jigarni 8 daqiqa qovuring.",
      "To'g'ralgan ko'katlarni solib aralashtiring va ustidan yuvilgan guruch bilan issiq suv quying.",
      "Baland olovda suvini torttirgach, qopqog'ini yopib 25-30 daqiqa sekin olovda dimlang va aralashtirib suzing."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_guruch', 'ing_mol', 'ing_jigar', 'ing_kokatlar', 'ing_shivit']
  },
  {
    id: 'rec_05_xiva_shivit_oshi',
    nomi: 'Xiva Shivit Oshi',
    tayyorlash_vaqti_daq: 90,
    qiyinlik: 'qiyin',
    rasm_url: '/assets/images/fargona_devzira_1785171601208.png',
    tarif_matni: "Xorazm va Xiva shahrining yorqin yashil shivitli ugrasi va go'shtli vaju qaylasi bilan suziladigan mashhur taomi.",
    masalliqlar_matni: "Un (300g), Yangi shivit (100g), Tuxum (1 dona), Mol go'shti (500g), Sabzi, Kartoshka, Bulg'or qalampiri, Sariyog' va Suzma / Qatiq.",
    korsatmalari: [
      "Shivitni blenderda pyure qilib, un va tuxum bilan qattiq yashil xamir qoring va 1 soat tindiring.",
      "Go'sht, piyoz, sabzi, bulg'or qalampiri va kartoshkadan quyuq 'Vaju' qaylasini tayyorlang.",
      "Yashil xamirni 1mm yupqalikda yoyib ugra kesing va qaynoq suvda 2-3 daqiqa qaynatib chaying.",
      "Sovuq yashil ugralar ustidan issiq vaju qaylasini quying va sarimsoqli suzma bilan torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_shivit', 'ing_mol', 'ing_kartoshka', 'ing_sabzi', 'ing_yogurt']
  },
  {
    id: 'rec_06_xorazm_tuxum_barak',
    nomi: 'Xorazm Tuxum Baraki',
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'qiyin',
    rasm_url: '/assets/images/manti_uzbek_1785171627698.png',
    tarif_matni: "Xorazmning betakror mahorat taomi. Yupqa xamir zarflari ichiga suyuq tuxum va sariyog' aralashmasi quyilib qaynatiladi.",
    masalliqlar_matni: "Un (250g), Tuxum (5 dona), Sariyog' (70g), Sut (75ml), Ko'k piyoz, Tuz va Qatiq.",
    korsatmalari: [
      "Un, suv va tuxumdan o'ta qattiq xamir qorib 30 daqiqa tindiring.",
      "Tuxumlarni sariyog', sut, ko'k piyoz va tuz bilan ko'pirtirib suyuq ichlik tayyorlang.",
      "Xamirni yupqa yoyib yumaloq kesing va yarim oy shaklida chetini yopishtirib, teshik qoldiring.",
      "Teshikdan suyuq tuxumni quying, tezda yopishtiring va zudlik bilan qaynoq sho'r suvga tashlab 3-4 daqiqa pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_tuxum', 'ing_saryog', 'ing_yogurt']
  },
  {
    id: 'rec_07_chuchvara',
    nomi: "O'zbek Chuchvarasi",
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'orta',
    rasm_url: '/assets/images/manti_uzbek_1785171627698.png',
    tarif_matni: "Boy, xushbo'y go'sht bulyonida qaynatib pishiriladigan mitti go'shtli pelmenilar (chuchvara).",
    masalliqlar_matni: "Un (400g), Qiyma (300g), Piyoz (300g), Tuxum (1 dona), Tomat pastasi, Sarimsoq, Qatiq va ko'katlar.",
    korsatmalari: [
      "Un, tuxum va suvdan qattiq xamir qorib 40 daqiqa tindiring.",
      "Qiymaga mayda to'g'ralgan piyoz, tuz va murch qo'shib aralashtiring.",
      "Xamirni 1.5mm yoyib 4x4 cm mitti kvadratlar kesing, qiyma solib mitti tugunlar tuging.",
      "Tomatli sho'r bulyonda chuchvaralarni 5-7 daqiqa qaynatib, bulyoni va qatiq bilan birga suzing."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_qiyma', 'ing_piyoz', 'ing_tuxum']
  },
  {
    id: 'rec_08_manti',
    nomi: "Go'shtli O'zbek Mantisi",
    tayyorlash_vaqti_daq: 80,
    qiyinlik: 'orta',
    rasm_url: '/assets/images/manti_uzbek_1785171627698.png',
    tarif_matni: "Mantiqozon bug'ida pishiriladigan, ichi sershira qo'lda to'g'ralgan go'sht va dumba yog'li klassik o'zbek mantisi.",
    masalliqlar_matni: "Un (500g), Go'sht (600g), Dumba yog'i (150g), Piyoz (600g), Zira, Tuxum, Qatiq yoki Smetana.",
    korsatmalari: [
      "Un, tuxum va suvdan qattiq xamir qorib 30 daqiqa tindiring.",
      "Go'sht, dumba yog'i va piyozni qo'lda mayda kubik qilib to'g'rang, zira va murch qo'shing.",
      "Xamirni 2mm yoyib 12x12 cm kvadratlar kesing va qiyma hamda dumba bo'lagi solib tuging.",
      "Mantiqozon laganlarini moylab, mantilarni 35-40 daqiqa jadal bug'da pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_mol', 'ing_dumba', 'ing_piyoz']
  },
  {
    id: 'rec_09_xonim',
    nomi: 'Kartoshkali Xonim (Orama)',
    tayyorlash_vaqti_daq: 70,
    qiyinlik: 'orta',
    rasm_url: '/assets/images/tandir_somsa_1785171674312.png',
    tarif_matni: "Yupqa yoyilgan xamir ichiga mayda somoncha kartoshka va piyoz solinib bug'da pishiriladigan to'yimli rulon taom.",
    masalliqlar_matni: "Un (400g), Kartoshka (500g), Piyoz (400g), O'simlik yog'i, Pomidor pastasi, Zira, Murch.",
    korsatmalari: [
      "Un va suvdan xamir qoring. Kartoshka va piyozni ingichka somoncha to'g'rab, zira soling.",
      "Xamirni juda yupqa yoyib yog'lang va kartoshkali aralashmani tekis soling.",
      "Xamirni uzun rulon shaklida o'rab, moylangan kaskanda 40 daqiqa bug'da pishiring.",
      "Bo'laklarga bo'lib, ustidan achchiq pomidorli sous quying."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_kartoshka', 'ing_piyoz', 'ing_yogi']
  },
  {
    id: 'rec_10_mastava',
    nomi: "O'zbek Mastavasi",
    tayyorlash_vaqti_daq: 65,
    qiyinlik: 'orta',
    rasm_url: '/assets/images/toshkent_palov_1785171559097.png',
    tarif_matni: "Xushbo'y sabzavotlar, qovurilgan go'sht, guruch va kartoshkadan tayyorlanadigan 'suyuq palov' hisoblangan to'yimli sho'rva.",
    masalliqlar_matni: "Go'sht (400g), Guruch (100g), Kartoshka (250g), Sabzi (200g), Piyoz (200g), Tomat pastasi, Zira, Qatiq va ko'katlar.",
    korsatmalari: [
      "Go'sht va piyozni qozonda qovurib, tomat va bulg'or qalampirini qo'shing.",
      "Kubik sabzi va kartoshkalarni solib, suv quying va 20 daqiqa qaynating.",
      "Ivitilgan guruchni solib guruch pishguncha 15 daqiqa qaynating.",
      "Kosalarga suzib, qatiq va ko'katlar sepib torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_mol', 'ing_guruch', 'ing_kartoshka', 'ing_sabzi', 'ing_piyoz']
  },
  {
    id: 'rec_11_qaynatma_shorva',
    nomi: "Qaynatma Sho'rva",
    tayyorlash_vaqti_daq: 135,
    qiyinlik: 'orta',
    rasm_url: '/assets/images/shashlik_uzbek_1785171692122.png',
    tarif_matni: "Suyakli qo'y go'shti, sabzi va butun kartoshkalardan past olovda uzoq vaqt qaynatib pishiriladigan shifobaxsh tiniq sho'rva.",
    masalliqlar_matni: "Suyakli qo'y go'shti (1kg), Piyoz (3 dona), Sabzi (3 dona), Kartoshka (4 dona), Pomidor, Bulg'or qalampiri, Zira.",
    korsatmalari: [
      "Go'shtni sovuq suvga solib qaynating va ko'pigini (kafini) to'liq tozalab oling.",
      "Piyoz, butun sabzi va pomidor solib eng past olovda 1 soat mildirating.",
      "Tuz va butun kartoshkalarni solib yana 30-40 daqiqa qaynatib pishiring.",
      "Go'sht va sabzavotlarni alohida suzib, bulyonni ko'katlar bilan kosalarda torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_qoy', 'ing_kartoshka', 'ing_sabzi', 'ing_piyoz']
  },
  {
    id: 'rec_12_dimlama_original',
    nomi: "An'anaviy Go'shtli Dimlama",
    tayyorlash_vaqti_daq: 120,
    qiyinlik: 'orta',
    rasm_url: '/assets/images/shashlik_uzbek_1785171692122.png',
    tarif_matni: "Go'sht, kartoshka, sabzi va karam barglari qozonga qatlam qilib terilib, o'z sharbatida sekin bug'lab pishiriladigan shohona taom.",
    masalliqlar_matni: "Qo'y/Mol qovurg'asi (800g), Karam (1 dona), Kartoshka (6 dona), Sabzi (3 dona), Piyoz (3 dona), Pomidor va Zira.",
    korsatmalari: [
      "Qozon tubiga yog' va qovurg'alarni tering, tuz va zira seping.",
      "Ustidan piyoz, pomidor, qalampir, sabzi va kartoshkani qatlam qilib zich tering.",
      "Eng tepasiga karam barglarini gumbaz qilib yoping va qozon qopqog'ini sochiq bilan mahkam yoping.",
      "Past olovda 1.5-2 soat sekin o'z sharbatida dimlang."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_qoy', 'ing_karram', 'ing_kartoshka', 'ing_sabzi', 'ing_piyoz']
  },
  {
    id: 'rec_13_qozon_kabob',
    nomi: 'Qozon Kabob',
    tayyorlash_vaqti_daq: 80,
    qiyinlik: 'orta',
    rasm_url: '/assets/images/shashlik_uzbek_1785171692122.png',
    tarif_matni: "Qarsildoq qilib qovurilgan butun kartoshka va yumshoq qo'y qovurg'alaridan tayyorlanadigan mashhur qozon taomi.",
    masalliqlar_matni: "Qo'y qovurg'asi (1kg), Butun kartoshka (800g), O'simlik yog'i (250ml), Zira, Koriandr, Sirkali piyoz.",
    korsatmalari: [
      "Qovurg'alarni zira, murch va tuz bilan 30 daqiqa marinadlang.",
      "Qozondagi qizigan yog'da kartoshkalarni qarsildoq qobiq bo'lguncha qovurib oling.",
      "Go'shtlarni qizigan yog'da har bir burchagini qizartirib qovuring.",
      "Qozon tubiga kartoshka va ustidan go'shtni terib, 100ml suv quying va past olovda 50 daqiqa dimlang."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_qoy', 'ing_kartoshka', 'ing_yogi', 'ing_zira']
  },
  {
    id: 'rec_14_shashlik',
    nomi: "Qo'y Go'shtidan Shashlik",
    tayyorlash_vaqti_daq: 45,
    qiyinlik: 'orta',
    rasm_url: '/assets/images/shashlik_uzbek_1785171692122.png',
    tarif_matni: "Mangal ko'mirida tutuntirib pishiriladigan sershira lahm go'sht va dumba yog'li o'zbek shashligi.",
    masalliqlar_matni: "Qo'y go'shti (800g), Dumba yog'i (200g), Piyoz (3 dona), Zira, Koriandr, Sirka va Mineral suv.",
    korsatmalari: [
      "Go'sht va dumbani 3cm kubik qilib to'g'rang.",
      "Piyoz suvi, zira, koriandr va mineral suv bilan 4 soat salqinda marinadlang.",
      "Sikhga 3 dona go'sht va 1 dona dumba yog'ini tering.",
      "Mangal ko'mirida tez-tez buraverib 10-12 daqiqa qizartirib pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_qoy', 'ing_dumba', 'ing_piyoz', 'ing_zira']
  },
  {
    id: 'rec_15_tandir_somsa',
    nomi: 'Tandir Somsa',
    tayyorlash_vaqti_daq: 85,
    qiyinlik: 'qiyin',
    rasm_url: '/assets/images/tandir_somsa_1785171674312.png',
    tarif_matni: "Qat-qat yumshoq xamir ichida sershira qo'lda to'g'ralgan go'sht va dumba yog'li mashhur o'zbek somsa.",
    masalliqlar_matni: "Un (500g), Sariyog' (150g), Go'sht (400g), Dumba yog'i (100g), Piyoz (500g), Zira va Susan.",
    korsatmalari: [
      "Un va iliq suvdan xamir qorib, yupqa yoyib sariyog' surtib qat-qat rulon qiling va sovuting.",
      "Go'sht, dumba va piyozni qo'lda mayda to'g'rab zira soling.",
      "Xamir bo'laklarini yoyib filling soling va uchburchak tuging.",
      "200°C pechda yoki tandirda 35-40 daqiqa qizarguncha pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_mol', 'ing_dumba', 'ing_piyoz', 'ing_saryog']
  },
  {
    id: 'rec_16_toshkent_salat',
    nomi: 'Toshkent Salati',
    tayyorlash_vaqti_daq: 40,
    qiyinlik: 'orta',
    rasm_url: '/assets/images/buxoro_baxsh_1785171615342.png',
    tarif_matni: "Qaynatilgan mol tili somonchasi, Marg'ilon yashil turpi va qarsildoq qovurilgan piyozli mashhur retro salat.",
    masalliqlar_matni: "Mol tili yoki go'shti (300g), Marg'ilon yashil turpi (300g), Piyoz (2 dona), Mayonez (100g), Qaynatilgan tuxum (3 dona).",
    korsatmalari: [
      "Turpni somoncha to'g'rab 15 daqiqa muzdek sho'r suvda achchig'ini chiqaring va quriting.",
      "Qaynatilgan mol tili va tuxumlarni uzunchoq somoncha to'g'rang.",
      "Piyoz halqalarini unga bulab yog'da qarsildoq bo'lguncha qovuring.",
      "Masalliqlarni mayonez bilan aralashtirib, ustini qarsildoq piyoz bilan bezating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_til', 'ing_turp', 'ing_piyoz']
  },
  {
    id: 'rec_17_achichuk',
    nomi: 'Achichuk Salati',
    tayyorlash_vaqti_daq: 10,
    qiyinlik: 'oson',
    rasm_url: '/assets/images/lh_atirgul_carving_1785171733978.png',
    tarif_matni: "Palov va shashliklarning ajralmas, nordon-shirin yangi pomidor va yupqa piyozli milliy salat.",
    masalliqlar_matni: "Qizil shirin pomidor (4 dona), Piyoz (1 dona), Tuz, Shivit yoki kashnich va Achchiq qalampir.",
    korsatmalari: [
      "Piyozni shaffof yupqalikda halqa qilib to'g'rab muzdek suvda chaying.",
      "Shirin pomidorlarni pichoqda yupqa parrak qilib kesing.",
      "Piyoz, pomidor va ko'katlarni birlashtirib, faqat tortishdan oldin tuz seping."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_pomidor', 'ing_piyoz']
  },
  {
    id: 'rec_18_medovik',
    nomi: 'Asalli "Medovik" Torti',
    tayyorlash_vaqti_daq: 105,
    qiyinlik: 'qiyin',
    rasm_url: '/assets/images/medovik_cake_1785171806365.png',
    tarif_matni: "8-10 qavatli yupqa asalli biskvit va smetanali mayin kremdan tayyorlanadigan og'izda eriydigan shirinlik.",
    masalliqlar_matni: "Un (450g), Tabiiy asal (140g), Shakar (100g), Sariyog' (85g), Tuxum (3 dona), Soda (6g), Smetana va Qaymoq (850g).",
    korsatmalari: [
      "Bug' hammomida sariyog', shakar va asalni eritib, soda solib 3 barobar ko'pirtiring.",
      "Tuxum va un qo'shib xamir qoring, 8 bo'lakka bo'lib yupqa yoying va pechda 5 daqiqadan pishiring.",
      "Smetana, qaymoq va shakar upasidan yengil krem tayyorlang.",
      "Qavatlarga krem surtib yig'ing va muzlatgichda 10 soatga tindiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_asal', 'ing_saryog', 'ing_tuxum', 'ing_smetana']
  },
  {
    id: 'rec_tr_001_baklava',
    nomi: 'Turkiya Baqlavasi (Baklava)',
    tayyorlash_vaqti_daq: 45,
    qiyinlik: 'orta',
    rasm_url: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Turkiyaning Gaziantep viloyatining mashhur milliy deserti. Yupqa filo xamiri, saryog' va yong'oq/pista qatlamlaridan sovuq qiyom bilan tayyorlanadi.",
    masalliqlar_matni: "Filo xamiri (yufka), Saryog', Yong'oq yoki pista, Shakar, Suv, Limon sharbati",
    korsatmalari: [
      "Qiyom (sirop) tayyorlash: Suv, shakar va limon sharbatini 10-15 daqiqa qaynatib, sovitishga qo'ying.",
      "Filo xamiri varaqlariga eritilgan saryog' surtib, ketma-ket qatlamlab taxlang.",
      "Har bir necha qatlam orasiga maydalangan yong'oq yoki pista seping.",
      "Pishirishdan oldin romb yoki kvadrat shaklida kesib, ustiga qolgan eritilgan saryog'ni tekis quying.",
      "180°C ga qizdirilgan pechda oltin-zarhal rangga kirguncha (35-45 daqiqa) pishiring.",
      "Pechdan chiqqan issiq baqlava ustiga sovuq qiyomni quying va 2-4 soat shimilishi uchun qoldiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_filo_xamiri', 'ing_saryog', 'ing_yongoq', 'ing_shakar', 'ing_limon']
  },
  {
    id: 'rec_tr_002_lokum',
    nomi: 'Turk Loqumi (Turkish Delight)',
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'orta',
    rasm_url: 'https://images.unsplash.com/photo-1582170083198-c06845056a9b?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Usmonli imperiyasidan yetib kelgan mashhur qandolat deserti. Shakar, kraxmal va xushbo'y sharbatlardan tayyorlanadi.",
    masalliqlar_matni: "Shakar, Suv, Makkajo'xori kraxmali, Limon sharbati, Gul suvi yoki limon essensiyasi, Shakar kukuni",
    korsatmalari: [
      "Shakar va suvdan quyuq shirin sirop tayyorlang.",
      "Kraxmalni alohida sovuq suvda tekis eritib oling.",
      "Kraxmalli aralashmani siropga qo'shib, past olovda to'xtovsiz aralashtirib quyuqlashtiring.",
      "Xushbo'ylik beruvchi gul suvi yoki limon essensiyasini me'yorida qo'shing.",
      "Aralashmani to'rtburchak qolipga quyib, to'liq qotguncha xona haroratida qoldiring.",
      "Qotgach, kub shaklida kesib, shakar kukuniga botirib oling."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_shakar', 'ing_kraxmal', 'ing_limon']
  },
  {
    id: 'rec_tr_003_sutlac',
    nomi: 'Turkcha Sütlaç (Sutli Desert)',
    tayyorlash_vaqti_daq: 40,
    qiyinlik: 'oson',
    rasm_url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Sut, guruch va vanillin qo'shib pishiriladigan va pechda usti qizartiriladigan turkcha sutli pudding deserti.",
    masalliqlar_matni: "Sut, Guruch, Shakar, Guruch uni yoki kraxmal, Vanillin, Dolchin",
    korsatmalari: [
      "Guruchni suvda yumshaguncha qaynatib oling.",
      "Sutni qo'shib, past olovda sekin qaynating.",
      "Shakar va ozgina suvda eritilgan quyuqlashtiruvchini (kraxmal/guruch uni) qo'shing.",
      "Aralashma quyuqlashgach, maxsus idishlarga quying.",
      "Xohishga ko'ra, ustini pechda 200°C da qizartirib oling (Fırın Sütlaç).",
      "Sovutib, ustiga dolchin sepgan holda xizmat qiling."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_sut', 'ing_guruch', 'ing_shakar', 'ing_vanilin']
  },
  {
    id: 'rec_tr_004_revani',
    nomi: 'Revani (Manna Yarma Keksa)',
    tayyorlash_vaqti_daq: 35,
    qiyinlik: 'oson',
    rasm_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Usmonli oshxonasidan manna yarmasidan pishirilib, ustidan sharbat (sirop) quyiladigan yumshoq keks.",
    masalliqlar_matni: "Manna yarmasi (manka), Bug'doy uni, Tuxum, Shakar, Qatiq yoki yogurt, O'simlik yog'i, Razrixlitel, Qiyom",
    korsatmalari: [
      "Tuxum va shakarni ko'pik bo'lguncha yaxshilab ko'pirtiring.",
      "Qatiq, o'simlik yog'i, un va manna yarmasini qo'shing.",
      "Qabartma kukunini qo'shib, bir xil massa holiga keltiring.",
      "Yog'langan qolipga quyib, pechda pishiring.",
      "Pechdan chiqqan issiq keks ustiga sovuq qiyomni quying.",
      "Qiyom to'liq shimilgach, bo'laklarga bo'ling."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_manniy', 'ing_un', 'ing_tuxum', 'ing_shakar', 'ing_qatiq']
  },
  {
    id: 'rec_tr_005_sekerpare',
    nomi: 'Şekerpare Pechenyesi',
    tayyorlash_vaqti_daq: 25,
    qiyinlik: 'oson',
    rasm_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Saryog', manna yarmasi va findiq/bodom bilan pechda pishirilib, shirin qiyomga botiriladigan mashhur turk pechenyesi.",
    masalliqlar_matni: "Saryog', Shakar kukuni (pudra), Tuxum, Bug'doy uni, Manna yarmasi, Razrixlitel, Qiyom, Findiq yoki bodom",
    korsatmalari: [
      "Xona haroratidagi saryog' va shakar kukunini aralashtiring.",
      "Tuxum, un, manna yarmasi va qabartma kukunini qo'shib yumshoq xamir qoring.",
      "Xamirdan kichik dumaloq bo'laklar yasang.",
      "Har birining o'rtasiga findiq yoki bodom donasini bosing.",
      "Pechda oltin rangga kirguncha pishiring.",
      "Pechdan chiqqan issiq pechenyelar ustiga sovuq qiyom quying."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_saryog', 'ing_shakar', 'ing_tuxum', 'ing_un', 'ing_manniy', 'ing_bodom']
  },
  {
    id: 'rec_tr_006_tulumba',
    nomi: 'Tulumba Tatlısı',
    tayyorlash_vaqti_daq: 30,
    qiyinlik: 'orta',
    rasm_url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Qaynatilgan xamirdan tishli shaklda yog'da qovurilib, sovuq qiyomda shimitiladigan qarsillama desert.",
    masalliqlar_matni: "Suv, Saryog', Bug'doy uni, Tuxum, Kraxmal, Qiyom (sirop), O'simlik yog'i",
    korsatmalari: [
      "Suv va saryog'ni qizdirib, un va kraxmal qo'shib qaynatilgan xamir tayyorlang.",
      "Xamir biroz sovigach, tuxumlarni birin-ketin qo'shib silliq massa bo'lguncha ko'pirtiring.",
      "Qandolat qopidan tishli nasadka orqali uzunchoq shakllar siqib chiqaring.",
      "O'rtacha issiqlikdagi yog'da oltin rang bo'lguncha qovuring.",
      "Qovurilgan tulumbalarni darhol sovuq qiyomga solib shimitib oling.",
      "Xizmat qilishdan oldin ortiqcha qiyomni to'kib tashlang."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_saryog', 'ing_tuxum', 'ing_kraxmal', 'ing_shakar']
  },
  {
    id: 'rec_tr_007_kunefe',
    nomi: 'Turk Künefe Deserti',
    tayyorlash_vaqti_daq: 30,
    qiyinlik: 'orta',
    rasm_url: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Xatay viloyatining tilsimon kadayif xamiri, eruvchan tuzsiz pishloq va saryog'dan pishiriladigan issiq qiyomli desert.",
    masalliqlar_matni: "Kadayif xamiri, Tuzsiz eruvchan pishloq (Mozzarella), Saryog', Shakar, Suv, Limon sharbati, Pista",
    korsatmalari: [
      "Qiyomni oldindan tayyorlab sovutib qo'ying.",
      "Kadayif xamirini eritilgan saryog' bilan yaxshilab aralashtiring.",
      "Kadayifning yarmisini maxsus tavaga yoyib, mahkam bosing.",
      "O'rtasiga tuzsiz pishloqni tekis qilib joylashtiring.",
      "Qolgan kadayifni ustiga yoyib, yana bir bor bosib chiqing.",
      "Past olovda tavada ikkala tarafini qizartiring (yoki pechda pishiring).",
      "Issiq künefe ustiga sovuq qiyom quying va pista seping."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_kadayif', 'ing_pishloq', 'ing_saryog', 'ing_shakar', 'ing_pista']
  },
  {
    id: 'rec_tr_008_lokma',
    nomi: 'Lokma (Qiyomli Sharchalar)',
    tayyorlash_vaqti_daq: 25,
    qiyinlik: 'orta',
    rasm_url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Egey dengizi qirg'oqlarining oshgan xamirdan yog'da qovurilib, shirin siropda shimitiladigan mashhur sharchalari.",
    masalliqlar_matni: "Bug'doy uni, Xamirturush (drojji), Suv, Shakar, Tuz, O'simlik yog'i, Qiyom",
    korsatmalari: [
      "Un, suv va xamirturushdan yumshoq xamir qoring va oshishi uchun dam bering.",
      "Oshgan xamirdan kichik dumaloq bo'laklar (sharchalar) oling.",
      "Qizdirilgan o'simlik yog'ida oltin rang bo'lguncha qovuring.",
      "Qovurilgan lokmalarni sovuq qiyomga soling.",
      "Bir necha daqiqa qiyomni shimgach, suzib oling.",
      "Issiq va yangi holida xizmat qiling."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_xamirturush', 'ing_shakar', 'ing_osimlik_yogi']
  },
  {
    id: 'rec_tr_009_kazandibi',
    nomi: 'Kazandibi (Karamellangan Sutli Desert)',
    tayyorlash_vaqti_daq: 40,
    qiyinlik: 'orta',
    rasm_url: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Usmonli saroy oshxonasining sutli deserti. Tova tubida qatlam hosil qilib, karamellashtirib pishiriladi.",
    masalliqlar_matni: "Sut, Shakar, Guruch uni, Makkajo'xori kraxmali, Sariyog', Vanillin",
    korsatmalari: [
      "Sut, shakar, guruch uni va kraxmalni aralashtirib past olovda quyuqlashguncha pishiring.",
      "Tova tubiga saryog' surtib, aralashmani qalin qatlam qilib yoying.",
      "Pastki qismi karamellashib (jigarrang tusga kirguncha) pishiring.",
      "Xona haroratida va muzlatgichda sovuting.",
      "Bo'laklab, karamellangan tarafini yuqoriga ag'darib idishga oling."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_sut', 'ing_shakar', 'ing_kraxmal', 'ing_saryog', 'ing_vanilin']
  },
  {
    id: 'rec_tr_010_muhallebi',
    nomi: 'Turkcha Muhallebi Krem Deserti',
    tayyorlash_vaqti_daq: 20,
    qiyinlik: 'oson',
    rasm_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Sut, shakar, kraxmal va vanillin qo'shib tayyorlanadigan yengil, ipakdek muloyim krem-desert.",
    masalliqlar_matni: "Sut, Shakar, Makkajo'xori kraxmali, Guruch uni, Vanillin, Sariyog'",
    korsatmalari: [
      "Quruq ingredientlarni idishda aralashtiring.",
      "Sutni asta-sekin qo'shib, silliq va bir xil massa hosil qiling.",
      "Past olovda to'xtovsiz aralashtirib, quyuqlashguncha pishiring.",
      "Idishlarga quyib sovuting.",
      "Ustiga dolchin yoki maydalangan pista sepib xizmat qiling."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_sut', 'ing_shakar', 'ing_kraxmal', 'ing_vanilin']
  },
  {
    id: 'rec_tr_011_irmik_helvasi',
    nomi: 'İrmik Helvası (Manna Halvosi)',
    tayyorlash_vaqti_daq: 30,
    qiyinlik: 'oson',
    rasm_url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Sariyog'da qovurilgan manna yarmasiga sutli yoki suvli shirin qiyom quyilib tayyorlanadigan turk halvosi.",
    masalliqlar_matni: "Manna yarmasi (manka) yoki kunjut pastasi, Sariyog', Shakar, Suv yoki sut, Yong'oq",
    korsatmalari: [
      "Tovada sariyog'ni eritib, manna yarmasini oltin rangga kirguncha qovuring.",
      "Alohida idishda shakar va suvni (yoki sutni) eritib iliq qiyom tayyorlang.",
      "Qiyomni qovurilgan mannaga asta-sekin, aralashtirgan holda quying.",
      "Aralashma quyuqlashib, suyuqlikni to'liq shimguncha pishiring.",
      "Olovni o'chirib, 15-20 daqiqa qopqog'i yopiq holda dam bering."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_manniy', 'ing_saryog', 'ing_shakar', 'ing_sut']
  },
  {
    id: 'rec_tr_012_asure',
    nomi: "Aşure (Nuh Payg'ambar Deserti)",
    tayyorlash_vaqti_daq: 90,
    qiyinlik: 'orta',
    rasm_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Bug'doy, no'xat, lobiya, quritilgan mevalar va yong'oqlardan tayyorlanadigan eng qadimiy marosim deserti.",
    masalliqlar_matni: "Bug'doy, No'xat, Lobiya, Quritilgan mevalar (o'rik, mayiz), Yong'oq, Shakar, Suv, Anor",
    korsatmalari: [
      "Bug'doy, loviya va no'xatni oldindan (bir kecha) ivitib, alohida pishirib oling.",
      "Barcha pishgan donli mahsulotlarni katta qozonga solib, suv bilan qaynating.",
      "Quritilgan mevalar va shakarni qo'shing.",
      "Past olovda aralashma quyuqlashguncha sekin pishiring.",
      "Idishlarga quyib, sovugach ustini yong'oq va anor donalari bilan bezang."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_noxat', 'ing_loviya', 'ing_mayiz', 'ing_yongoq', 'ing_shakar']
  },
  {
    id: 'rec_tr_013_pismaniye',
    nomi: 'Pişmaniye (Turk Paxtahalvosi)',
    tayyorlash_vaqti_daq: 90,
    qiyinlik: 'qiyin',
    rasm_url: 'https://images.unsplash.com/photo-1582170083198-c06845056a9b?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Izmit shahrining nozik, ip-ip bo'lib ajraladigan paxtahalvosiga o'xshash mashhur milliy qandolati.",
    masalliqlar_matni: "Bug'doy uni, Shakar, Suv, Sariyog', Limon sharbati",
    korsatmalari: [
      "Unni saryog'da past olovda hidsizlanguncha qovuring va sovitib qo'ying.",
      "Shakar, suv va limon kislotasidan quyuq karamel tayyorlang.",
      "Karamelli massani egiluvchan halqa holiga kelguncha sovuting.",
      "Karamel halqasini qovurilgan un ustiga qo'yib, cho'zib, bukab va qayta-qayta cho'zib ingichka ip shakliga keltiring.",
      "Yupqa ipga aylangan pishmaniyani to'plar shaklida taxlang."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_shakar', 'ing_saryog', 'ing_limon']
  }
];

export const initialTales: Tale[] = [
  {
    id: 'tale_quyoncha',
    sarlavha: 'Mehrli quyoncha',
    yosh_toifasi: '3-5',
    muqova_rasm_url: '/assets/images/tale_quyoncha_cover_1785171712747.png',
    holat: 'nashr',
    created_at: '2026-07-01',
    sahifalar: [
      {
        id: 'p1',
        ertak_id: 'tale_quyoncha',
        tartib_raqami: 1,
        rasm_url: '/assets/images/tale_quyoncha_cover_1785171712747.png',
        matn: "Bir bor ekan, bir yo'q ekan. Quyoshli o'rmonda kichkina xushfe'l Quyoncha yashagan ekan. U har kuni barcha do'stlariga shirin sabzilar ulashardi."
      },
      {
        id: 'p2',
        ertak_id: 'tale_quyoncha',
        tartib_raqami: 2,
        rasm_url: '/assets/images/tale_quyoncha_cover_1785171712747.png',
        matn: "Bir kuni kichkina quyoncha o'rmonda yo'lg'iz yig'layotgan bir kichkina qushchani ko'rdi. Qushcha inidan tushib ketgan edi."
      },
      {
        id: 'p3',
        ertak_id: 'tale_quyoncha',
        tartib_raqami: 3,
        rasm_url: '/assets/images/tale_quyoncha_cover_1785171712747.png',
        matn: "Quyoncha ayiq polvonni yordamga chaqirdi va birgalikda qushchani ozoda iniga joylashtirishdi. Barcha o'rmon hayvonlari quyonchaning mehridan xursand bo'lishdi."
      }
    ]
  },
  {
    id: 'tale_odat',
    sarlavha: 'Yomon odatning zarari',
    yosh_toifasi: '6-8',
    muqova_rasm_url: '/assets/images/tale_quyoncha_cover_1785171712747.png',
    holat: 'nashr',
    created_at: '2026-07-02',
    sahifalar: [
      {
        id: 'p1',
        ertak_id: 'tale_odat',
        tartib_raqami: 1,
        rasm_url: '/assets/images/tale_quyoncha_cover_1785171712747.png',
        matn: "Odil ismli bola har kuni maktabdan keliboq o'yinchoqlarini tarqoq holda qoldirib, qo'lini yuvmay shirinlik yeyishni yaxshi ko'rardi."
      },
      {
        id: 'p2',
        ertak_id: 'tale_odat',
        tartib_raqami: 2,
        rasm_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
        matn: "Kunlardan bir kuni uning sevimli o'yinchoq ayiqchasi yo'qolib qoldi. Chunki xonasi shunchalik tartibsiz ediki, hech narsa topilmasdi."
      },
      {
        id: 'p3',
        ertak_id: 'tale_odat',
        tartib_raqami: 3,
        rasm_url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
        matn: "Onasi unga xonasini tartiblashga yordam berdi. Odil shundan so'ng ozodalik va intizom insonning eng yaqin do'sti ekanligini tushunib yetdi."
      }
    ]
  },
  {
    id: 'tale_chumoli',
    sarlavha: 'Mehnatsevar chumoli',
    yosh_toifasi: '6-8',
    muqova_rasm_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    holat: 'nashr',
    created_at: '2026-07-03',
    sahifalar: [
      {
        id: 'p1',
        ertak_id: 'tale_chumoli',
        tartib_raqami: 1,
        rasm_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        matn: "Issiq yoz kunlarida barcha kapalaklar o'ynab yurganida, tirishqoq Chumoli qish uchun oziq-ovqat g'amlar edi."
      },
      {
        id: 'p2',
        ertak_id: 'tale_chumoli',
        tartib_raqami: 2,
        rasm_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
        matn: "Sovuq qish kelganda Chumolining uyi issiq va rizqga to'la edi. Mehnat qilgan hech qachon kam bo'lmaydi!"
      }
    ]
  },
  {
    id: 'tale_sehrli_bog',
    sarlavha: "Sehrli bog'",
    yosh_toifasi: '9-12',
    muqova_rasm_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
    holat: 'nashr',
    created_at: '2026-07-04',
    sahifalar: [
      {
        id: 'p1',
        ertak_id: 'tale_sehrli_bog',
        tartib_raqami: 1,
        rasm_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
        matn: "Qadimiy qishloq chetida sirlarga to'la bir bog' bor edi. U yerdagi har bir daraxt kishiga ezgulik va odob so'zlarini so'zlar edi."
      },
      {
        id: 'p2',
        ertak_id: 'tale_sehrli_bog',
        tartib_raqami: 2,
        rasm_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
        matn: "Zukko Jasur bog'ga kirib, bilim va sabr mevalarini terdi va qishloqdoshlariga ulashdi."
      }
    ]
  }
];

export const initialLifehacks: Lifehack[] = [
  {
    id: 'lh_atirgul',
    sarlavha: 'Sabzavotlardan atirgul qilish',
    tavsif_matni: "Sabzi va bodring bo'lakchalaridan bayramona dasturxon uchun go'zal atirgul shaklini yasash siri.",
    rasm_url: '/assets/images/lh_atirgul_carving_1785171733978.png',
    kategoriya: 'karving',
    bosqichlar: [
      "Bodring va sabzini pichoq bilan juda yupqa doiracha qilib to'g'rang.",
      "Birinchi bo'lakni mahkam o'rang.",
      "Keyingi bo'laklarni atrofidan barg ko'rinishida ketma-ket joylashtiring.",
      "Zubochistka bilan ostidan mahkamlab dasturxonga qo'ying."
    ],
    holat: 'nashr'
  },
  {
    id: 'lh_qayiq',
    sarlavha: "Qog'ozdan qayiq yasash",
    tavsif_matni: "Farzandingiz bilan birgalikda 3 daqiqada qiziqarli rangli qog'ozdan suzuvchi qayiqcha yasash.",
    rasm_url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
    kategoriya: 'oyinchoq_yasash',
    bosqichlar: [
      "A4 qog'ozni teng ikkiga taxlang.",
      "Yuqori burchaklarini markazga qarab buking.",
      "Paski chetlarini yuqoriga qayring va uchburchak hosil qiling.",
      "Markazidan ochib kvadrat shakliga keltiring va qayiqni yoying!"
    ],
    holat: 'nashr'
  },
  {
    id: 'lh_xona',
    sarlavha: 'Xonani tezda tartiblash usullari',
    tavsif_matni: "Bolalar o'yinchoqlarini 5 daqiqada o'yin ko'rinishida yig'ish usullari va qutilar tizimi.",
    rasm_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    kategoriya: 'uy_ishlari',
    bosqichlar: [
      "Rangli 3 ta savat tayyorlang: yumshoq o'yinchoqlar, konstruktorlar va kitoblar uchun.",
      "Taymerni 5 daqiqaga qo'ying va kim tez yig'ish o'yinini o'ynang.",
      "Bajarilgach farzandingizni maqtang va barmoqcha rasm bering."
    ],
    holat: 'nashr'
  },
  {
    id: 'lh_kitob',
    sarlavha: 'Kitobni muqovasini yasash',
    tavsif_matni: "Maktab darsliklari va ertak kitoblarini qiziqarli rangli muqova bilan asrash.",
    rasm_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    kategoriya: 'boshqa',
    bosqichlar: [
      "Qalin qog'ozni kitob hajmidan biroz kattaroq qilib kesing.",
      "Kitob chetlarini ichkariga buking va skotch bilan mahkamlang.",
      "Farzandingiz stikerlar va qalamlar bilan bezatishiga imkon bering."
    ],
    holat: 'nashr'
  }
];

export const initialRiddles: Riddle[] = [
  {
    id: 'rid_1',
    savol: "Ko'zi bor, boshi yo'q. Ko'zi bor, ko'rmaydi. Bu nima?",
    javob: 'Igna',
    variantlar: ['Igna', 'Tuxum', 'Tuz', 'Uy'],
    yosh_toifasi: '3-5',
    qiyinlik: 'oson',
    izoh: "Igna teshigiga 'ko'z' deyiladi, lekin u ko'rmaydi."
  },
  {
    id: 'rid_2',
    savol: "Uydan chiqadi, yo'ldan ketadi, lekin joyidan jilmaydi. Bu nima?",
    javob: "Yo'l",
    variantlar: ["Yo'l", 'Avtobus', 'Soy', 'Daraxt'],
    yosh_toifasi: '6-8',
    qiyinlik: 'oson',
    izoh: "Yo'l har tomonga eltadi, lekin o'zi joyida turadi."
  },
  {
    id: 'rid_3',
    savol: "Oq yer, qora urug', Qo'l bilan ekar, Ko'z bilan o'rar. Bu nima?",
    javob: 'Yozuv / Kitob',
    variantlar: ['Yozuv / Kitob', 'Dala', 'Qor', 'Tush'],
    yosh_toifasi: '6-8',
    qiyinlik: 'orta',
    izoh: "Oq qog'ozga qora siyoh bilan yoziladi va ko'z bilan o'qiladi."
  }
];

export const initialMathProblems: MathProblem[] = [
  {
    id: 'math_1',
    savol: "Aida 12 ta olma terdi. Ukasi undan 5 tasini oldi. Aidaning nechta olmasi qoldi?",
    togri_javob: '7',
    notogri_variantlar: ['5', '8', '17'],
    yosh_toifasi: '6-8',
    tushuntirish: "12 - 5 = 7 ta olma qoldi."
  },
  {
    id: 'math_2',
    savol: "Savatchada 4 ta qizil va 6 ta yashil shar bor. Jami nechta shar bor?",
    togri_javob: '10',
    notogri_variantlar: ['8', '12', '2'],
    yosh_toifasi: '3-5',
    tushuntirish: "4 + 6 = 10 ta shar."
  },
  {
    id: 'math_3',
    savol: "Bir kitobda 20 sahifa bor. Malika har kuni 5 sahifa o'qisa, kitobni necha kunda tugatadi?",
    togri_javob: '4',
    notogri_variantlar: ['5', '3', '10'],
    yosh_toifasi: '9-12',
    tushuntirish: "20 / 5 = 4 kunda."
  }
];
