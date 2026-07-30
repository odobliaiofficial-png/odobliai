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
    "source": "MiniApp",
    "id": "rec_01_toshkent_palov",
    "nomi": "Toshkent To",
    "tayyorlash_vaqti_daq": 90,
    "qiyinlik": "qiyin",
    "tarif_matni": "Toshkent shahrining eng mashhur to",
    "masalliqlar_matni": "Guruch (1kg), Qo",
    "korsatmalari": [
      "Guruchni 5-6 marta kraxmali ketguncha yuving va 35°C iliq sho",
      "ying.",
      "Qozonda paxta yog",
      "sht bo",
      "q qizil qobiq bo",
      ",",
      "g",
      ",",
      "xat, mayiz va sarimsoq solib, suv quying va past olovda 45 daqiqa qaynating.",
      "Guruchni yotqizib baland olovda suvini torttiring, so",
      ",",
      "g",
      "sht, qazi va bedana tuxumlari bilan bezating."
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_02_samarqand_sofi",
    "nomi": "Samarqand Oshi Sofi",
    "tayyorlash_vaqti_daq": 105,
    "qiyinlik": "qiyin",
    "tarif_matni": "Masalliqlari strictly qatlamlarda pishiriladigan va aralashtirmasdan suziladigan afsonaviy Samarqand sofi palovi.",
    "masalliqlar_matni": "Basmati/Alanga guruchi (800g), Mol go",
    "korsatmalari": [
      "Guruchni yuving va iliq sho",
      ",",
      "da katta mol go",
      "laklarini va piyozni qovuring, ozgina suv qup 1 soat dimlang.",
      "Go",
      "xat va mayizni qatlam qilib salang (aralashtirmang!).",
      "Ustidan ivigan guruchni yotqizib, sho",
      ",",
      "ng sabzi va eng tepasiga yumshoq go"
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_03_fargona_devzira",
    "nomi": "Farg",
    "tayyorlash_vaqti_daq": 110,
    "qiyinlik": "qiyin",
    "tarif_matni": "Farg",
    "masalliqlar_matni": "Devzira guruchi (900g), Qo",
    "korsatmalari": [
      "Devzira guruchini 6-7 marta yaxshilab yuvib, sho",
      ",",
      "i va paxta yog",
      "q tillarang bo",
      "ng go",
      ",",
      ","
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_04_buxoro_baxsh",
    "nomi": "Buxoro Baxsh Palovi",
    "tayyorlash_vaqti_daq": 60,
    "qiyinlik": "orta",
    "tarif_matni": "Buxoro shahrining afsonaviy ",
    "masalliqlar_matni": "Dumaloq guruch (400g), Mol jigari (250g), Mol go",
    "korsatmalari": [
      "Jigar va go",
      "lda to",
      "rang. Kashnich va shivitni juda nozik to",
      "rang.",
      "Yog",
      "ng go",
      ",",
      "g",
      "katlarni solib aralashtiring va ustidan yuvilgan guruch bilan issiq suv quying.",
      "Baland olovda suvini torttirgach, qopqog"
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_05_xiva_shivit_oshi",
    "nomi": "Xiva Shivit Oshi",
    "tayyorlash_vaqti_daq": 90,
    "qiyinlik": "qiyin",
    "tarif_matni": "Xorazm va Xiva shahrining yorqin yashil shivitli ugrasi va go",
    "masalliqlar_matni": "Un (300g), Yangi shivit (100g), Tuxum (1 dona), Mol go",
    "korsatmalari": [
      "Shivitni blenderda pyure qilib, un va tuxum bilan qattiq yashil xamir qoring va 1 soat tindiring.",
      "Go",
      "or qalampiri va kartoshkadan quyuq",
      "qaylasini tayyorlang.",
      "Yashil xamirni 1mm yupqalikda yoyib ugra kesing va qaynoq suvda 2-3 daqiqa qaynatib chaying.",
      "Sovuq yashil ugralar ustidan issiq vaju qaylasini quying va sarimsoqli suzma bilan torting."
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_06_xorazm_tuxum_barak",
    "nomi": "Xorazm Tuxum Baraki",
    "tayyorlash_vaqti_daq": 60,
    "qiyinlik": "qiyin",
    "tarif_matni": "Xorazmning betakror mahorat taomi. Yupqa xamir zarflari ichiga suyuq tuxum va sariyog",
    "masalliqlar_matni": "Un (250g), Tuxum (5 dona), Sariyog",
    "korsatmalari": [
      "Un, suv va tuxumdan o",
      ",",
      ", sut, ko",
      "pirtirib suyuq ichlik tayyorlang.",
      "Xamirni yupqa yoyib yumaloq kesing va yarim oy shaklida chetini yopishtirib, teshik qoldiring.",
      "Teshikdan suyuq tuxumni quying, tezda yopishtiring va zudlik bilan qaynoq sho"
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_07_chuchvara",
    "nomi": "O",
    "tayyorlash_vaqti_daq": 60,
    "qiyinlik": "orta",
    "tarif_matni": "Boy, xushbo",
    "masalliqlar_matni": "Un (400g), Qiyma (300g), Piyoz (300g), Tuxum (1 dona), Tomat pastasi, Sarimsoq, Qatiq va ko",
    "korsatmalari": [
      "Un, tuxum va suvdan qattiq xamir qorib 40 daqiqa tindiring.",
      "Qiymaga mayda to",
      "ralgan piyoz, tuz va murch qo",
      ",",
      ",",
      "r bulyonda chuchvaralarni 5-7 daqiqa qaynatib, bulyoni va qatiq bilan birga suzing."
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_08_manti",
    "nomi": "Go",
    "tayyorlash_vaqti_daq": 80,
    "qiyinlik": "orta",
    "tarif_matni": "Mantiqozon bug",
    "masalliqlar_matni": "Un (500g), Go",
    "korsatmalari": [
      "Un, tuxum va suvdan qattiq xamir qorib 30 daqiqa tindiring.",
      "Go",
      "i va piyozni qo",
      "g",
      "shing.",
      "Xamirni 2mm yoyib 12x12 cm kvadratlar kesing va qiyma hamda dumba bo",
      ",",
      "da pishiring."
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_09_xonim",
    "nomi": "Kartoshkali Xonim (Orama)",
    "tayyorlash_vaqti_daq": 70,
    "qiyinlik": "orta",
    "tarif_matni": "Yupqa yoyilgan xamir ichiga mayda somoncha kartoshka va piyoz solinib bug",
    "masalliqlar_matni": "Un (400g), Kartoshka (500g), Piyoz (400g), O",
    "korsatmalari": [
      "Un va suvdan xamir qoring. Kartoshka va piyozni ingichka somoncha to",
      "rab, zira soling.",
      "Xamirni juda yupqa yoyib yog",
      ",",
      "rab, moylangan kaskanda 40 daqiqa bug",
      ",",
      "laklarga bo"
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_10_mastava",
    "nomi": "O",
    "tayyorlash_vaqti_daq": 65,
    "qiyinlik": "orta",
    "tarif_matni": "Xushbo",
    "masalliqlar_matni": "Go",
    "korsatmalari": [
      "Go",
      "or qalampirini qo",
      ",",
      ",",
      ",",
      "katlar sepib torting."
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_11_qaynatma_shorva",
    "nomi": "Qaynatma Sho",
    "tayyorlash_vaqti_daq": 135,
    "qiyinlik": "orta",
    "tarif_matni": "Suyakli qo",
    "masalliqlar_matni": "Suyakli qo",
    "korsatmalari": [
      "Go",
      "pigini (kafini) to",
      ",",
      ",",
      ",",
      "sht va sabzavotlarni alohida suzib, bulyonni ko"
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_12_dimlama_original",
    "nomi": "An",
    "tayyorlash_vaqti_daq": 120,
    "qiyinlik": "orta",
    "tarif_matni": "Go",
    "masalliqlar_matni": "Qo",
    "korsatmalari": [
      "Qozon tubiga yog",
      "alarni tering, tuz va zira seping.",
      "Ustidan piyoz, pomidor, qalampir, sabzi va kartoshkani qatlam qilib zich tering.",
      "Eng tepasiga karam barglarini gumbaz qilib yoping va qozon qopqog",
      ",",
      "z sharbatida dimlang."
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_13_qozon_kabob",
    "nomi": "Qozon Kabob",
    "tayyorlash_vaqti_daq": 80,
    "qiyinlik": "orta",
    "tarif_matni": "Qarsildoq qilib qovurilgan butun kartoshka va yumshoq qo",
    "masalliqlar_matni": "Qo",
    "korsatmalari": [
      "Qovurg",
      ",",
      "da kartoshkalarni qarsildoq qobiq bo",
      ",",
      "shtlarni qizigan yog",
      ",",
      "shtni terib, 100ml suv quying va past olovda 50 daqiqa dimlang."
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_14_shashlik",
    "nomi": "Qo",
    "tayyorlash_vaqti_daq": 45,
    "qiyinlik": "orta",
    "tarif_matni": "Mangal ko",
    "masalliqlar_matni": "Qo",
    "korsatmalari": [
      "Go",
      "g",
      ",",
      ",",
      "sht va 1 dona dumba yog",
      ",",
      "mirida tez-tez buraverib 10-12 daqiqa qizartirib pishiring."
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_15_tandir_somsa",
    "nomi": "Tandir Somsa",
    "tayyorlash_vaqti_daq": 85,
    "qiyinlik": "qiyin",
    "tarif_matni": "Qat-qat yumshoq xamir ichida sershira qo",
    "masalliqlar_matni": "Un (500g), Sariyog",
    "korsatmalari": [
      "Un va iliq suvdan xamir qorib, yupqa yoyib sariyog",
      ",",
      "sht, dumba va piyozni qo",
      "g",
      ",",
      "laklarini yoyib filling soling va uchburchak tuging.",
      "200°C pechda yoki tandirda 35-40 daqiqa qizarguncha pishiring."
    ],
    "kategoriya": "Milliy Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_16_toshkent_salat",
    "nomi": "Toshkent Salati",
    "tayyorlash_vaqti_daq": 40,
    "qiyinlik": "orta",
    "tarif_matni": "Qaynatilgan mol tili somonchasi, Marg",
    "masalliqlar_matni": "Mol tili yoki go",
    "korsatmalari": [
      "Turpni somoncha to",
      "rab 15 daqiqa muzdek sho",
      "ini chiqaring va quriting.",
      "Qaynatilgan mol tili va tuxumlarni uzunchoq somoncha to",
      "rang.",
      "Piyoz halqalarini unga bulab yog",
      "lguncha qovuring.",
      "Masalliqlarni mayonez bilan aralashtirib, ustini qarsildoq piyoz bilan bezating."
    ],
    "kategoriya": "Salatlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_17_achichuk",
    "nomi": "Achichuk Salati",
    "tayyorlash_vaqti_daq": 10,
    "qiyinlik": "oson",
    "tarif_matni": "Palov va shashliklarning ajralmas, nordon-shirin yangi pomidor va yupqa piyozli milliy salat.",
    "masalliqlar_matni": "Qizil shirin pomidor (4 dona), Piyoz (1 dona), Tuz, Shivit yoki kashnich va Achchiq qalampir.",
    "korsatmalari": [
      "Piyozni shaffof yupqalikda halqa qilib to",
      "rab muzdek suvda chaying.",
      "Shirin pomidorlarni pichoqda yupqa parrak qilib kesing.",
      "Piyoz, pomidor va ko"
    ],
    "kategoriya": "Salatlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_18_medovik",
    "nomi": "Asalli ",
    "tayyorlash_vaqti_daq": 105,
    "qiyinlik": "qiyin",
    "tarif_matni": "8-10 qavatli yupqa asalli biskvit va smetanali mayin kremdan tayyorlanadigan og",
    "masalliqlar_matni": "Un (450g), Tabiiy asal (140g), Shakar (100g), Sariyog",
    "korsatmalari": [
      "Bug",
      ", shakar va asalni eritib, soda solib 3 barobar ko",
      ",",
      "shib xamir qoring, 8 bo",
      "lib yupqa yoying va pechda 5 daqiqadan pishiring.",
      "Smetana, qaymoq va shakar upasidan yengil krem tayyorlang.",
      "Qavatlarga krem surtib yig"
    ],
    "kategoriya": "Tortlar va Chizkeyklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_001_baklava",
    "nomi": "Turkiya Baqlavasi (Baklava)",
    "tayyorlash_vaqti_daq": 45,
    "qiyinlik": "orta",
    "tarif_matni": "Turkiyaning Gaziantep viloyatining mashhur milliy deserti. Yupqa filo xamiri, saryog",
    "masalliqlar_matni": "Filo xamiri (yufka), Saryog",
    "korsatmalari": [
      "Qiyom (sirop) tayyorlash: Suv, shakar va limon sharbatini 10-15 daqiqa qaynatib, sovitishga qo",
      ",",
      "surtib, ketma-ket qatlamlab taxlang.",
      "Har bir necha qatlam orasiga maydalangan yong",
      ",",
      "ni tekis quying.",
      "180°C ga qizdirilgan pechda oltin-zarhal rangga kirguncha (35-45 daqiqa) pishiring.",
      "Pechdan chiqqan issiq baqlava ustiga sovuq qiyomni quying va 2-4 soat shimilishi uchun qoldiring."
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_002_lokum",
    "nomi": "Turk Loqumi (Turkish Delight)",
    "tayyorlash_vaqti_daq": 60,
    "qiyinlik": "orta",
    "tarif_matni": "Usmonli imperiyasidan yetib kelgan mashhur qandolat deserti. Shakar, kraxmal va xushbo",
    "masalliqlar_matni": "Shakar, Suv, Makkajo",
    "korsatmalari": [
      "Shakar va suvdan quyuq shirin sirop tayyorlang.",
      "Kraxmalni alohida sovuq suvda tekis eritib oling.",
      "Kraxmalli aralashmani siropga qo",
      "xtovsiz aralashtirib quyuqlashtiring.",
      "Xushbo",
      "yorida qo",
      ",",
      "rtburchak qolipga quyib, to",
      ","
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_003_sutlac",
    "nomi": "Turkcha Sütlaç (Sutli Desert)",
    "tayyorlash_vaqti_daq": 40,
    "qiyinlik": "oson",
    "tarif_matni": "Sut, guruch va vanillin qo",
    "masalliqlar_matni": "Sut, Guruch, Shakar, Guruch uni yoki kraxmal, Vanillin, Dolchin",
    "korsatmalari": [
      "Guruchni suvda yumshaguncha qaynatib oling.",
      "Sutni qo",
      ",",
      "shing.",
      "Aralashma quyuqlashgach, maxsus idishlarga quying.",
      "Xohishga ko",
      ","
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_004_revani",
    "nomi": "Revani (Manna Yarma Keksa)",
    "tayyorlash_vaqti_daq": 35,
    "qiyinlik": "oson",
    "tarif_matni": "Usmonli oshxonasidan manna yarmasidan pishirilib, ustidan sharbat (sirop) quyiladigan yumshoq keks.",
    "masalliqlar_matni": "Manna yarmasi (manka), Bug",
    "korsatmalari": [
      "Tuxum va shakarni ko",
      "lguncha yaxshilab ko",
      ",",
      "simlik yog",
      "shing.",
      "Qabartma kukunini qo",
      ",",
      "langan qolipga quyib, pechda pishiring.",
      "Pechdan chiqqan issiq keks ustiga sovuq qiyomni quying.",
      "Qiyom to",
      "laklarga bo"
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_005_sekerpare",
    "nomi": "Şekerpare Pechenyesi",
    "tayyorlash_vaqti_daq": 25,
    "qiyinlik": "oson",
    "tarif_matni": "Saryog",
    "masalliqlar_matni": "Saryog",
    "korsatmalari": [
      "Xona haroratidagi saryog",
      ",",
      "shib yumshoq xamir qoring.",
      "Xamirdan kichik dumaloq bo",
      ",",
      "rtasiga findiq yoki bodom donasini bosing.",
      "Pechda oltin rangga kirguncha pishiring.",
      "Pechdan chiqqan issiq pechenyelar ustiga sovuq qiyom quying."
    ],
    "kategoriya": "Pechenye va Biskvitlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_006_tulumba",
    "nomi": "Tulumba Tatlısı",
    "tayyorlash_vaqti_daq": 30,
    "qiyinlik": "orta",
    "tarif_matni": "Qaynatilgan xamirdan tishli shaklda yog",
    "masalliqlar_matni": "Suv, Saryog",
    "korsatmalari": [
      "Suv va saryog",
      "shib qaynatilgan xamir tayyorlang.",
      "Xamir biroz sovigach, tuxumlarni birin-ketin qo",
      "lguncha ko",
      ",",
      ",",
      "rtacha issiqlikdagi yog",
      "lguncha qovuring.",
      "Qovurilgan tulumbalarni darhol sovuq qiyomga solib shimitib oling.",
      "Xizmat qilishdan oldin ortiqcha qiyomni to"
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_007_kunefe",
    "nomi": "Turk Künefe Deserti",
    "tayyorlash_vaqti_daq": 30,
    "qiyinlik": "orta",
    "tarif_matni": "Xatay viloyatining tilsimon kadayif xamiri, eruvchan tuzsiz pishloq va saryog",
    "masalliqlar_matni": "Kadayif xamiri, Tuzsiz eruvchan pishloq (Mozzarella), Saryog",
    "korsatmalari": [
      "Qiyomni oldindan tayyorlab sovutib qo",
      ",",
      "bilan yaxshilab aralashtiring.",
      "Kadayifning yarmisini maxsus tavaga yoyib, mahkam bosing.",
      "O",
      ",",
      ",",
      ","
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_008_lokma",
    "nomi": "Lokma (Qiyomli Sharchalar)",
    "tayyorlash_vaqti_daq": 25,
    "qiyinlik": "orta",
    "tarif_matni": "Egey dengizi qirg",
    "masalliqlar_matni": "Bug",
    "korsatmalari": [
      "Un, suv va xamirturushdan yumshoq xamir qoring va oshishi uchun dam bering.",
      "Oshgan xamirdan kichik dumaloq bo",
      ",",
      "simlik yog",
      "lguncha qovuring.",
      "Qovurilgan lokmalarni sovuq qiyomga soling.",
      "Bir necha daqiqa qiyomni shimgach, suzib oling.",
      "Issiq va yangi holida xizmat qiling."
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_009_kazandibi",
    "nomi": "Kazandibi (Karamellangan Sutli Desert)",
    "tayyorlash_vaqti_daq": 40,
    "qiyinlik": "orta",
    "tarif_matni": "Usmonli saroy oshxonasining sutli deserti. Tova tubida qatlam hosil qilib, karamellashtirib pishiriladi.",
    "masalliqlar_matni": "Sut, Shakar, Guruch uni, Makkajo",
    "korsatmalari": [
      "Sut, shakar, guruch uni va kraxmalni aralashtirib past olovda quyuqlashguncha pishiring.",
      "Tova tubiga saryog",
      ",",
      ",",
      ",",
      "laklab, karamellangan tarafini yuqoriga ag"
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_010_muhallebi",
    "nomi": "Turkcha Muhallebi Krem Deserti",
    "tayyorlash_vaqti_daq": 20,
    "qiyinlik": "oson",
    "tarif_matni": "Sut, shakar, kraxmal va vanillin qo",
    "masalliqlar_matni": "Sut, Shakar, Makkajo",
    "korsatmalari": [
      "Quruq ingredientlarni idishda aralashtiring.",
      "Sutni asta-sekin qo",
      ",",
      "xtovsiz aralashtirib, quyuqlashguncha pishiring.",
      "Idishlarga quyib sovuting.",
      "Ustiga dolchin yoki maydalangan pista sepib xizmat qiling."
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_011_irmik_helvasi",
    "nomi": "İrmik Helvası (Manna Halvosi)",
    "tayyorlash_vaqti_daq": 30,
    "qiyinlik": "oson",
    "tarif_matni": "Sariyog",
    "masalliqlar_matni": "Manna yarmasi (manka) yoki kunjut pastasi, Sariyog",
    "korsatmalari": [
      "Tovada sariyog",
      ",",
      ",",
      ",",
      "liq shimguncha pishiring.",
      "Olovni o",
      "i yopiq holda dam bering."
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_012_asure",
    "nomi": "Aşure (Nuh Payg",
    "tayyorlash_vaqti_daq": 90,
    "qiyinlik": "orta",
    "tarif_matni": "Bug",
    "masalliqlar_matni": "Bug",
    "korsatmalari": [
      "Bug",
      "xatni oldindan (bir kecha) ivitib, alohida pishirib oling.",
      "Barcha pishgan donli mahsulotlarni katta qozonga solib, suv bilan qaynating.",
      "Quritilgan mevalar va shakarni qo",
      ",",
      ",",
      "oq va anor donalari bilan bezang."
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_tr_013_pismaniye",
    "nomi": "Pişmaniye (Turk Paxtahalvosi)",
    "tayyorlash_vaqti_daq": 90,
    "qiyinlik": "qiyin",
    "tarif_matni": "Izmit shahrining nozik, ip-ip bo",
    "masalliqlar_matni": "Bug",
    "korsatmalari": [
      "Unni saryog",
      "ying.",
      "Shakar, suv va limon kislotasidan quyuq karamel tayyorlang.",
      "Karamelli massani egiluvchan halqa holiga kelguncha sovuting.",
      "Karamel halqasini qovurilgan un ustiga qo",
      "zib, bukab va qayta-qayta cho",
      ",",
      "plar shaklida taxlang."
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_041_perfect_pie_crust",
    "nomi": "Mukammal Pirog Xamiri (Perfect Pie Crust)",
    "tayyorlash_vaqti_daq": 20,
    "qiyinlik": "oson",
    "tarif_matni": "Muzday saryog",
    "masalliqlar_matni": "1 ¼ stakan un, ½ choy qoshiq tuz, 115 g sovuq saryog",
    "korsatmalari": [
      "Un va tuzni aralashtiring.",
      "Sovuq saryog",
      "shib, uvoq hosil bo",
      ",",
      "plang.",
      "Plyonkaga o"
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_042_peanut_butter_cookies",
    "nomi": "Yer-yong",
    "tayyorlash_vaqti_daq": 30,
    "qiyinlik": "oson",
    "tarif_matni": "Yer-yong",
    "masalliqlar_matni": "1 stakan yer-yong",
    "korsatmalari": [
      "Pechni 175°C gacha qizdiring.",
      "Yer-yong",
      ",",
      "oqni qo",
      ",",
      ",",
      "lguncha pishiring."
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_043_chicken_potato_gratin",
    "nomi": "Tovuqli va Kartoshkali Gratin (Chicken and Potato Gratin)",
    "tayyorlash_vaqti_daq": 75,
    "qiyinlik": "orta",
    "tarif_matni": "Saryog",
    "masalliqlar_matni": "1.3 kg tovuq go",
    "korsatmalari": [
      "Tovuqni tuzlab 1 soat tindiring. Pechni 220°C ga qizdiring.",
      "Saryog",
      "shing.",
      "Tovuq go",
      ",",
      ","
    ],
    "kategoriya": "Go'sht va Parranda Taomlari"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_044_chhena_poda",
    "nomi": "Chhena Poda — Ziravorli Chizkeyk (Chhena Poda)",
    "tayyorlash_vaqti_daq": 60,
    "qiyinlik": "orta",
    "tarif_matni": "Tvorog, kardamon va manka yormasidan karamel qatlam ustida pishiriladigan afsonaviy hindistoncha tvorogli chizkeyk.",
    "masalliqlar_matni": "225 g panir (yoki uydagidek tvorog), ¼ stakan shakar kukuni, ½ choy qoshiq hil (kardamon), 2 osh qoshiq manny yormasi (manka), 2 osh qoshiq eritilgan saryog",
    "korsatmalari": [
      "Pechni 175°C ga qizdiring. Qolip tubida shakarni eritib karamel holiga keltiring.",
      "Tvorog, shakar kukuni, hil, manka, saryog",
      "lguncha aralashtiring.",
      "Kesh",
      ","
    ],
    "kategoriya": "Tortlar va Chizkeyklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_045_creamy_mashed_potatoes",
    "nomi": "Mayin Kartoshka Pyuresi (Our Favorite Creamy Mashed Potatoes)",
    "tayyorlash_vaqti_daq": 35,
    "qiyinlik": "oson",
    "tarif_matni": "Issiq sut, smetana, saryog",
    "masalliqlar_matni": "1.8 kg kartoshka (tozalanib, bo",
    "korsatmalari": [
      "Kartoshka va sarimsoqni tuzli suvda 20 daqiqa yumshaguncha qaynatib oling.",
      "Sut, saryog",
      ",",
      ",",
      "shib silliq krem holatiga keltiring."
    ],
    "kategoriya": "Garnirlar va Sabzavotli Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_046_creole_apple_cheesecake",
    "nomi": "Karamel-Olmali Kreol Chizkeyki (Creole Apple Cheesecake)",
    "tayyorlash_vaqti_daq": 90,
    "qiyinlik": "qiyin",
    "tarif_matni": "Krekerli korj, yumshoq pishloqli krem hamda ustiga dimlangan karamelli nordon olma qatlami bilan pishiriladigan dabdabali chizkeyk.",
    "masalliqlar_matni": "Korj: 2 stakan grek krekeri uvoqlari, 100 g saryog",
    "korsatmalari": [
      "Korj masalliqlarini aralashtirib qolipga presslang va 190°C pechda 10 daqiqa pishiring.",
      "Cream cheese va shakarni ko",
      "shing. Korjga quyib suvli hammomda (water bath) 175°C pechda 1 soat pishiring.",
      "Olmalarni saryog",
      ","
    ],
    "kategoriya": "Tortlar va Chizkeyklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_047_coconut_creamed_corn",
    "nomi": "Kokosli Sutda Pishirilgan Makkajuxori va Yarma (Coconut Creamed Corn)",
    "tayyorlash_vaqti_daq": 25,
    "qiyinlik": "oson",
    "tarif_matni": "Zanjabil, zardachub va kokos sutida dimlangan shirin makkajuxori va kinoa donchalari.",
    "masalliqlar_matni": "4 so",
    "korsatmalari": [
      "Tovada yog",
      "shib 5 daqiqa qovuring.",
      "Pishgan yarma va kokos sutini qo",
      ",",
      "lagi bilan torting."
    ],
    "kategoriya": "Garnirlar va Sabzavotli Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_048_tomato_roasted_garlic_pie",
    "nomi": "Pomidor va Qovurilgan Sarimsoqli Pirog (Tomato & Roasted Garlic Pie)",
    "tayyorlash_vaqti_daq": 90,
    "qiyinlik": "orta",
    "tarif_matni": "Pechda tob berilgan pomidorlar, erigan pishloq va sarimsoqli krem bilan pishiriladigan ajoyib tuzli fransuzcha pirog.",
    "masalliqlar_matni": "1.1 kg pomidor bo",
    "korsatmalari": [
      "Pomidorlarni 240°C pechda 25 daqiqa biroz quritib oling.",
      "Sarimsoqni saryog",
      "bilan aralashtirib qolipga presslang va 10 daqiqa pishiring.",
      "Pishloq, mayonez, ziravorlar va sarimsoqni aralashtiring.",
      "Qolipga pishloqli krem va pomidorlarni qatlam qilib tizib, 190°C pechda 1 soat pishiring."
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_049_sour_cream_onion_potato_salad",
    "nomi": "Smetana va Piyozli Kartoshka Salati (Sour Cream Potato Salad)",
    "tayyorlash_vaqti_daq": 35,
    "qiyinlik": "oson",
    "tarif_matni": "Yumshoq kartoshka, smetana, dijon xardali va ustiga uvalangan qarsildoq kartoshka chipslari solingan xushbo",
    "masalliqlar_matni": "900 g kichik kartoshka, 1 stakan smetana, ¼ stakan mayonez, 1 osh qoshiq piyoz kukuni, 2 choy qoshiq dijon xardali, Yashil piyoz, qizil piyoz va sarimsoq, Kartoshka chipslari (ustiga uvatish uchun).",
    "korsatmalari": [
      "Kartoshkani tuzli suvda yumshaguncha qaynatib oling va biroz ezing.",
      "Smetana, mayonez, piyoz kukuni, xardal, sarimsoq va yashil piyozni aralashtiring.",
      "Kartoshkalarni sousga solib aralashtiring va sovuting.",
      "Dasturxonga tortish oldidan ustiga uvalangan chipslarni seping."
    ],
    "kategoriya": "Salatlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_050_frozen_avocado_cake",
    "nomi": "Muzlatilgan Avokadoli Pirog (Frozen Avocado Cake)",
    "tayyorlash_vaqti_daq": 30,
    "qiyinlik": "oson",
    "tarif_matni": "Yangi avokado, quyultirilgan sut (sgushchenka) va laym sharbatidan tayyorlanadigan tetiklashtiruvchi muzlatilgan pishiriq.",
    "masalliqlar_matni": "Korj: 180 g kreker uvoqlari, ⅓ stakan quyultirilgan sut. Asos: 3 dona avokado, 450 g cream cheese, 1.5 banka quyultirilgan sut, limon va laym sharbati hamda rendasi.",
    "korsatmalari": [
      "Kreker va ⅓ stakan quyultirilgan sutni aralashtirib qolipga yoying, 180°C pechda 12 daqiqa pishirib sovuting.",
      "Avokado, cream cheese, quyultirilgan sut va limon sharbatini kombaynda silliq ko",
      ",",
      ","
    ],
    "kategoriya": "Tortlar va Chizkeyklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_051_chocolate_zucchini_cake",
    "nomi": "Shokoladli va Qovoqchali Pirog (Chocolate Zucchini Cake)",
    "tayyorlash_vaqti_daq": 70,
    "qiyinlik": "orta",
    "tarif_matni": "Kakao, shokolad tomchilari va maydalangan qovoqcha (zucchini) qo",
    "masalliqlar_matni": "2 stakan un, ½ stakan kakao kukuni, 1 choy qoshiq soda, tuz, 1.5 stakan shakar, 115 g saryog",
    "korsatmalari": [
      "Quruq va ho",
      ",",
      "shing.",
      "Qolipga quyib, ustidan shokolad va yong",
      ","
    ],
    "kategoriya": "Kekslar va Mafinlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_052_dakgangjeong",
    "nomi": "Dakgangjeong — Koreyscha Qarsildoq Tovuq (Dakgangjeong)",
    "tayyorlash_vaqti_daq": 45,
    "qiyinlik": "orta",
    "tarif_matni": "Kraxmalda ikki marta qovurilgan qarsildoq tovuq bo",
    "masalliqlar_matni": "1.1 kg tovuq qanotchalari yoki bo",
    "korsatmalari": [
      "Tovuq bo",
      ",",
      "da ikki marta (qarsildoq bo",
      ",",
      ","
    ],
    "kategoriya": "Go'sht va Parranda Taomlari"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_053_fresh_fruit_tart",
    "nomi": "Bodomli Korjda Yangi Mevali Tart (Fresh Fruit Tart)",
    "tayyorlash_vaqti_daq": 70,
    "qiyinlik": "orta",
    "tarif_matni": "Bodom unli qarsildoq tart korji, ipakdek mayin zavarnoy krem va ustida yangi rezavor mevalar.",
    "masalliqlar_matni": "Korj: 1 stakan un, ½ stakan bodom uni, 3 osh qoshiq shakar, 115 g sovuq saryog",
    "korsatmalari": [
      "Korj masalliqlaridan xamir qorib, qolipga yoying va 175°C pechda 35 daqiqa pishirib sovuting.",
      "Sut, tuxum sarig",
      ","
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_054_pear_hazelnut_tart",
    "nomi": "Nok va Fundukli Franjipan Tarti (Pear & Hazelnut Tart)",
    "tayyorlash_vaqti_daq": 60,
    "qiyinlik": "orta",
    "tarif_matni": "Funduk yong",
    "masalliqlar_matni": "1 dona tayyor tart korji, 1 stakan funduk (maydalangan yong",
    "korsatmalari": [
      "Funduk, shakar, saryog",
      "pirtirib franjipan kremi tayyorlang.",
      "Kremni korjga yoying va ustidan nok bo",
      ",",
      "rik qiyomini surting."
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_055_salted_pistachio_crumble",
    "nomi": "Tuzli Pistali Uvoq, Mevalar va Muzqaymoq (Salted Pistachio Crumbles With Berries and Ice Cream)",
    "tayyorlash_vaqti_daq": 35,
    "qiyinlik": "oson",
    "tarif_matni": "Pechda qovurilgan tuzli pista uvoqlari, qaynoq asalli qulupnaylar va muzday muzqaymoq uyg",
    "masalliqlar_matni": "Pistali uvoq (Krambl) uchun:\\n60 g xom pista\\n125 g un\\n100 g shakar\\n40 g makkajo",
    "korsatmalari": [
      "Pechni 175°C gacha qizdiring. Pistalarni pishirish varag",
      "lakchalar qoladigan qilib maydalang.",
      "Idishda maydalangan pista, un, shakar, makkajo",
      "ni quyib, barmoqlar bilan uvalab kichik noxotdek uvoqlar hosil qiling.",
      "Krambl aralashmasini pergament qog",
      "lguncha 20–25 daqiqa pishiring (o",
      "ying).",
      "Chuqur idishda qulupnay, limon sharbati, hil va bir chimdim tuzni aralashtiring.",
      "Kichik tovada asalni qizdiring — 4 daqiqa davomida pufakchalar chiqarib biroz to",
      ","
    ],
    "kategoriya": "Muzqaymoq va Sovuq Desertlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_056_summer_tomato_ricotta_tart",
    "nomi": "Yozgi Pomidorli va Rikottali Tart (Summer Tomato and Ricotta Tart With Oat Pastry)",
    "tayyorlash_vaqti_daq": 50,
    "qiyinlik": "orta",
    "tarif_matni": "Sullili korj (xamir), chia urug",
    "masalliqlar_matni": "Sullili korj (xamir) uchun:\\n90 g suli yormasi (rolled oats)\\n50 g chia urug",
    "korsatmalari": [
      "Pechni 180°C gacha qizdiring. Kombaynda suli yormasi, chia urug",
      "lguncha elang. Bug",
      "shib aralashtiring.",
      "Zaytun yog",
      ",",
      "lguncha pishiring va to",
      ",",
      "pirtiring.",
      "Sovigan korj ichiga rikotta kremini tekis yoying. Ustiga pomidor bo",
      "i tomizing va murch seping."
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_057_fruit_galette",
    "nomi": "Mevali Galetta (Fruit Galette)",
    "tayyorlash_vaqti_daq": 45,
    "qiyinlik": "oson",
    "tarif_matni": "Saryog",
    "masalliqlar_matni": "Xamir uchun:\\n200 g un\\n100 g sovuq saryog",
    "korsatmalari": [
      "Un, shakar va tuzga sovuq saryog",
      "shib, barmoqlar bilan uvalab qarsildoq uvoq holiga keltiring. Muzday suvni quyib tezda xamir to",
      ",",
      "g",
      ",",
      "oz ustida doira shaklida (3-4 mm qalinlikda) yoying.",
      "Xamir o",
      ",",
      ",",
      "lguncha pishiring."
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_058_red_date_cake",
    "nomi": "Xitoy Xurmoli (Unab) Pirog (Win Son Bakery",
    "tayyorlash_vaqti_daq": 55,
    "qiyinlik": "orta",
    "tarif_matni": "Quritilgan qizil xurmo (unab) pyuresi va karamelli qaymoqli glazur bilan pishiriladigan xushbo",
    "masalliqlar_matni": "Xamir uchun:\\n170 g quritilgan qizil xurmo (unab — red dates, urug",
    "korsatmalari": [
      "Pechni 175°C ga qizdiring. Qolipni saryog",
      ",",
      ", shakar va vanilni mikserda 3 daqiqa ko",
      "shing.",
      "Quruq masalliqlarning yarmini, so",
      "shib past tezlikda aralashtiring. Qolipga quyib, 175°C pechda 25–30 daqiqa pishiring.",
      "Glazur: Idishda qaymoq, saryog"
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_059_kong_jaban",
    "nomi": "Koreyscha Shiringina Qora Lobiya (Kong Jaban / Korean Sweet Black Beans)",
    "tayyorlash_vaqti_daq": 75,
    "qiyinlik": "oson",
    "tarif_matni": "Soya sousi, shakar va kunchut yog",
    "masalliqlar_matni": "250 g quritilgan qora lobiya (loviya)\\n2 litr dashi bulyoni yoki suv\\n240 ml soya sousi\\n150 g shakar\\n2 osh qoshiq qovurilgan kunchut yog",
    "korsatmalari": [
      "Lobiyani sovuq suvda kamida 8–12 soat ivitib oling va suvsizlantiring.",
      "Qozonga lobiyani solib, dashi bulyoni (yoki suv) va soya sousini quying. O",
      "ng past olovda 1 soat davomida sekin dimlang.",
      "Lobiya yumshab, suyuqligi kamaygach, shakar, kunchut yog",
      "larini qo",
      "lib qoladi).",
      "Suyuqligi quyuq va yaltiroq holatga kelguncha yana 5-10 daqiqa pishiring. Sovutib, muzlatgichga qo"
    ],
    "kategoriya": "Garnirlar va Sabzavotli Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_060_lagrimas_de_la_virgen",
    "nomi": "Lavlagi va Mevali Salqin Ichimlik (Lágrimas de la Virgen / Beet Cooler With Fruits)",
    "tayyorlash_vaqti_daq": 20,
    "qiyinlik": "oson",
    "tarif_matni": "Qizil lavlagi toza sharbati, olma, banan, apelsin va limon sharbati solingan vitaminlarga boy tetiklashtiruvchi salqin drink.",
    "masalliqlar_matni": "4 dona qizil lavlagi\\n2 litr suv\\n200 g shakar\\n1 dona kichik olma (kubik to",
    "korsatmalari": [
      "Lavlagini tozalab, sharbat chiqargich orqali toza sharbatini chiqarib oling.",
      "Katta ko",
      "liq eriguncha aralashtiring. Ustidan lavlagi sharbatini quying.",
      "Ko",
      "liq sovuting.",
      "Dasturxonga tortish oldidan to",
      "ralgan olma, banan, apelsin, salat barglari hamda limon sharbatini qo"
    ],
    "kategoriya": "Ichimliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_061_guava_grapefruit_agua_fresca",
    "nomi": "Gvayava, Greypfrut va Rozmarinli Agua Freska (Guava, Grapefruit, and Rosemary Agua Fresca)",
    "tayyorlash_vaqti_daq": 15,
    "qiyinlik": "oson",
    "tarif_matni": "Yangi greypfrut sharbati, gvayava pyuresi va rozmarin barglari bilan tayyorlanadigan tropik agua freska.",
    "masalliqlar_matni": "700 ml suv\\n3 dona greypfrut sharbati (yangi siqilgan)\\n430 g gvayava pyuresi (guava puree)\\n1 shoxcha yangi rozmarin barglari\\n100 g shakar (ta",
    "korsatmalari": [
      "Blender idishida suv, greypfrut sharbati, gvayava pyuresi va rozmarin barglarini solib to",
      "lguncha ko",
      ",",
      "lgan aralashmani mayda elakdan ko",
      "tkazib elang.",
      "Shakarni ta",
      "ra qo",
      ",",
      "ldirib, ustidan ichimlikni quying va rozmarin shoxchasi bilan bezating."
    ],
    "kategoriya": "Ichimliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_062_aguas_frescas",
    "nomi": "Meksikancha Mevali Salqin Ichimlik (Aguas Frescas / Mexican Fruit Coolers)",
    "tayyorlash_vaqti_daq": 15,
    "qiyinlik": "oson",
    "tarif_matni": "Tarvuz, ananas, qovun, papaya, qulupnay yoki mango mevalari mag",
    "masalliqlar_matni": "600 g to",
    "korsatmalari": [
      "Katta ko",
      ",",
      "g",
      "lguncha ko",
      ",",
      "zachadagi shakarli suvga elak orqali o",
      "och qoshiq bilan meva mag",
      ",",
      "laklari bilan sovuq holda torting."
    ],
    "kategoriya": "Ichimliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_063_scallion_pancakes",
    "nomi": "Yashil Piyozli Qarsildoq Pirojkalar va Chili-Zanjabilli Sous (Scallion Pancakes With Chili-Ginger Dipping Sauce)",
    "tayyorlash_vaqti_daq": 30,
    "qiyinlik": "orta",
    "tarif_matni": "Muzday gazlangan suvda tayyorlangan xamir va yashil piyozli qarsildoq mini-pirojkalar hamda chili-zanjabilli sous.",
    "masalliqlar_matni": "Sous uchun:\\n1 bo",
    "korsatmalari": [
      "Sous: Idishda zanjabil, soya sousi, sirka, chili yog",
      "pirtiring va chetga suring.",
      "Xamir: Katta idishda un, kraxmal, tuz va shakarni aralashtiring. Alohida idishda gazlangan suv, soya sousi va kunchut yog",
      "lguncha aralashtiring (ko",
      "shib aralashtiring.",
      "Qovurish: Tovada 1 osh qoshiq o",
      "ini qizdiring. Xamirning to",
      "rta olovda 2 daqiqa tillarang bo",
      "lguncha pishiring.",
      "Qolgan xamir va yog",
      "laklarga bo"
    ],
    "kategoriya": "Garnirlar va Sabzavotli Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_064_camouflage_fudge_brownies",
    "nomi": "rec_hd_064_camouflage_fudge_brownies",
    "tayyorlash_vaqti_daq": 50,
    "qiyinlik": "orta",
    "tarif_matni": "To",
    "masalliqlar_matni": "Tvorogli (Cream Cheese) qatlam:\\n225 g cream cheese, 1 dona tuxum, 65 g shakar, yarim choy qoshiq vanil, yarim choy qoshiq tuz, 1.5 choy qoshiq kakao kukuni\\nShokoladli Brauni qatlam:\\n150 g saryog",
    "korsatmalari": [
      "Pechni 165°C ga qizdiring. 20x20 cm qolipga pergament qog",
      ",",
      "hammomida 5 daqiqa yumshating. Olovdan olib silliq bo",
      "pirtiring. Yarmini ajratib, 1.5 choy qoshiq kakao qo",
      ",",
      ", espresso kukuni, 200 g shakar, 80 g kakao va yarim choy qoshiq tuzni bug",
      "eriguncha eritib, 5 daqiqa sovuting. 2 dona tuxum va vanilni qo",
      "pirtiring. Unni solib yaxshilab aralashtiring.",
      "Brauni xamirining ko",
      "sifat (\\",
      ") qilib tomizing.",
      "165°C pechda 22–25 daqiqa pishiring. Sovugach bo",
      "ling."
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_065_sour_cream_onion_biscuits",
    "nomi": "Smetana va Piyozli Yumshoq Biskvitlar (Sour Cream and Onion Biscuits)",
    "tayyorlash_vaqti_daq": 40,
    "qiyinlik": "orta",
    "tarif_matni": "Kat-kat saryog",
    "masalliqlar_matni": "310 g un\\n2 choy qoshiq qabartma kukun (baking powder)\\nYarim choy qoshiq soda\\n1.5 choy qoshiq tuz, 1 choy qoshiq qora murch\\n1 choy qoshiq shakar\\n150 g sovuq saryog",
    "korsatmalari": [
      "Pechni 215°C gacha qizdiring. Idishda un, qabartma kukun, soda, tuz, murch va shakarni elang. Sovuq saryog",
      "shib, barmoqlar bilan uvalab noxotdek uvoqlar hosil qiling. Yashil piyozni qo",
      ",",
      "rtasini ochib smetanani quying, sanchqi bilan xamir holiga keltiring. Stolda xamirni 20x10 cm to",
      ",",
      "xshab uchga taxlang. Yana yoyib, yana uchga taxlang (bu kat-kat bo",
      "minlaydi). 8 ta kvadrat bo",
      "ling.",
      "Listga tizib, ustiga eritilgan saryog",
      "lguncha pishiring."
    ],
    "kategoriya": "Pechenye va Biskvitlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_066_salty_buckwheat_chocolate_cookies",
    "nomi": "Grechka Unli va Shokoladli Tuzli Pechenye (Salty Buckwheat Chocolate Chunk Cookies)",
    "tayyorlash_vaqti_daq": 35,
    "qiyinlik": "orta",
    "tarif_matni": "Grechka uni, jigarrang shakar va yirik shokolad bo",
    "masalliqlar_matni": "125 g un\\n65 g grechka uni (buckwheat flour)\\nYarim choy qoshiq qabartma kukun, yarim choy qoshiq soda\\n1 choy qoshiq tuz\\n115 g saryog",
    "korsatmalari": [
      "Saryog",
      ",",
      "va ikkala shakarni mikserda 30 soniya ko",
      "shing, vanilni solib krem holatiga keltiring.",
      "Quruq masalliqlarni va shokolad bo",
      "shib yumshoq xamir qoring. Idishni yopib, 2 soat muzlatgichda sovuting.",
      "Pechni 190°C ga qizdiring. Xamirdan 2 osh qoshiqlik shariklar yasab, listga 5 cm masofada tizib chiqing.",
      "190°C pechda 8–10 daqiqa chetlari tillarang bo"
    ],
    "kategoriya": "Pechenye va Biskvitlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_067_mochi_cake",
    "nomi": "Kokosli va Guruch Unli Mochi Pirogi (Mochi Cake, Any Way You Want It)",
    "tayyorlash_vaqti_daq": 70,
    "qiyinlik": "oson",
    "tarif_matni": "Yapishqoq guruch uni (mochiko), kokos suti va saryog",
    "masalliqlar_matni": "250 g yapishqoq guruch uni (glutinous sweet rice flour / mochiko)\\n300 g shakar\\n400 ml kokos suti (yoki qaymoq)\\n90 g eritilgan saryog",
    "korsatmalari": [
      "Pechni 175°C gacha qizdiring. Qolipni saryog",
      ",",
      "va kokos sutini mikserda aralashtiring. Tuxum, vanil va tuzni qo",
      ",",
      "shib silliq xamir bo",
      "pirtiring.",
      "Xamirni qolipga quyib, ustiga kokos qiyg",
      ",",
      "lguncha pishiring. To"
    ],
    "kategoriya": "Nonushta va Pishiriqlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_068_orange_chocolate_loaf_cake",
    "nomi": "Apelsinli va Shokoladli Keks (Orange Chocolate Loaf Cake From Florida)",
    "tayyorlash_vaqti_daq": 75,
    "qiyinlik": "orta",
    "tarif_matni": "Kakao, qaymoq va apelsin rendasi xamiri hamda pishgach surtiladigan xushbo",
    "masalliqlar_matni": "Xamir uchun:\\n150 g un, 50 g kakao kukuni, 2 choy qoshiq qabartma kukun, yarim choy qoshiq tuz\\n200 g shakar, 240 ml suyuq qaymoq (heavy cream), 2 dona tuxum, 1 choy qoshiq vanil\\n1 dona apelsin po",
    "korsatmalari": [
      "Pechni 175°C ga qizdiring. Loaf (keks) qolipini yog",
      ",",
      "pirtiring. Tuxumlarni bittalab qo",
      "pirtirishda davom eting.",
      "Elangan quruq masalliqlarni past tezlikda qo",
      ",",
      ",",
      "ying. Keks pishgach, issiq holda ustiga va yon atroflariga apelsinli qiyomni cho"
    ],
    "kategoriya": "Kekslar va Mafinlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_069_whipped_cream_cake",
    "nomi": "Qaymoqli Mayin Keks (Whipped Cream Cake)",
    "tayyorlash_vaqti_daq": 45,
    "qiyinlik": "oson",
    "tarif_matni": "Ko",
    "masalliqlar_matni": "280 g maxsus tort uni (cake flour) yoki elangan oddiy un\\n2 choy qoshiq qabartma kukun (baking powder)\\nYarim choy qoshiq tuz\\n360 ml sovuq suyuq qaymoq (heavy cream)\\n3 dona tuxum (xonaki haroratda)\\n225 g shakar\\n1 choy qoshiq vanil ekstrakti",
    "korsatmalari": [
      "Pechni 175°C gacha qizdiring. Teshikli keks qolipini (tube pan) yog",
      ",",
      ",",
      "lguncha yaxshilab ko",
      ",",
      "pirtirib, ko",
      "shing. Shakarni sekin-asta solib 30 soniya ko",
      ",",
      "lakka bo",
      "kib qolmasin).",
      "Qolipga quyib, 175°C pechda 25–35 daqiqa pishiring. 10 daqiqa sovutib, agdarib oling va shakar kukuni bilan bezating."
    ],
    "kategoriya": "Kekslar va Mafinlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_070_sourdough_key_lime_ricotta_cookies",
    "nomi": "Hamirturushli Laymli va Rikottali Pechenye (Sourdough Key Lime Ricotta Cookies)",
    "tayyorlash_vaqti_daq": 45,
    "qiyinlik": "orta",
    "tarif_matni": "O",
    "masalliqlar_matni": "113 g saryog",
    "korsatmalari": [
      "Pechni 180°C gacha qizdiring. Ikki dona pishirish varag",
      "oz solib tayyorlang.",
      "Idishda yumshoq saryog",
      "lguncha ko",
      ",",
      "i, laym rendasi va vanilni qo",
      "lishi normal holat).",
      "Alohida idishda un, qabartma kukun (Razrixlitel) va tuzni elang. Quruq masalliqlarni past tezlikda asta-sekin qo",
      ",",
      "yorda sharikchalar ajratib listga tizib chiqing.",
      "180°C pechda 15–17 daqiqa pishiring. Pishgach sim panjarada to",
      ",",
      "lguncha ko",
      ","
    ],
    "kategoriya": "Pechenye va Biskvitlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_071_cinnamon_sugar_sourdough_waffles",
    "nomi": "Dolchin va Shakarli Hamirturushli Vafli (Cinnamon Sugar Sourdough Waffles)",
    "tayyorlash_vaqti_daq": 30,
    "qiyinlik": "oson",
    "tarif_matni": "Qarsildoq vaflilar, dolchinli shakar va yangi mevalar va klyon siropi bilan uzatiladigan noshtabop shirinlik.",
    "masalliqlar_matni": "Dolchinli shakar uchun:\\n50 g shakar\\n1 choy qoshiq dolchin kukuni\\nXamir uchun:\\n120 g achigan hamirturush (sourdough starter)\\n240 ml sut\\n42 g eritilgan saryog",
    "korsatmalari": [
      "Chuqur idishda 50 g shakar va dolchinni aralashtirib qo",
      ",",
      "va tuxumni yaxshilab ko",
      "shib silliq bo",
      ",",
      "lang. Xamirdan quyib, tillarang va qarsildoq bo",
      ",",
      "dan surting va dolchinli shakar aralashmasiga ikkala tarafini botirib oling.",
      "Tayyor vaflilarni ananas, mevalar hamda kokos qiyg"
    ],
    "kategoriya": "Nonushta va Pishiriqlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_072_blueberry_lemon_corn_muffins",
    "nomi": "Chernikali va Limonli Makkajo",
    "tayyorlash_vaqti_daq": 35,
    "qiyinlik": "oson",
    "tarif_matni": "Makkajo",
    "masalliqlar_matni": "60 g saryog",
    "korsatmalari": [
      "Pechni 190°C gacha qizdiring. 6 dona mafin qolipiga qog",
      ",",
      "xori uni, 100 g shakar, limon rendasi va bir chimdim tuzni solib aralashtiring.",
      "Alohida idishda eritilgan saryog",
      "pirtiring. Quruq masalliqlar va chernikaning yarmi bilan birga ohista aralashtiring.",
      "Xamirni qoliplarga teng bo",
      ",",
      "lguncha pishiring. Sim panjarada sovutib uzating."
    ],
    "kategoriya": "Kekslar va Mafinlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_073_swirl_spice_cake",
    "nomi": "Ziravorli Mermer Keks (Swirl Spice Cake)",
    "tayyorlash_vaqti_daq": 90,
    "qiyinlik": "orta",
    "tarif_matni": "Pekan yong",
    "masalliqlar_matni": "Shtreyzel (uvoq) uchun:\\n100 g maydalangan pekan yong",
    "korsatmalari": [
      "Pechni 165°C gacha qizdiring. Keks qolipini yog",
      ",",
      "oq, ziravorlar aralashmasi, jigarrang shakar, un va tuzni aralashtirib, saryog",
      ",",
      "va shakarni 6–8 daqiqa mayin ko",
      "shing. Unli aralashmaning yarmini, so",
      ",",
      ",",
      ",",
      "pirtirib glazur tayyorlang va keks ustidan quying."
    ],
    "kategoriya": "Kekslar va Mafinlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_074_coffee_spice_mix",
    "nomi": "Qahvali va Ziravorli Aralashma (Savory-to-Sweet Coffee Spice Mix)",
    "tayyorlash_vaqti_daq": 5,
    "qiyinlik": "oson",
    "tarif_matni": "Qahva, apelsin rendasi, dolchin va hil urug",
    "masalliqlar_matni": "3 osh qoshiq asalari gulchangi kukuni (bee pollen)\\n3 osh qoshiq mayda tortilgan qahva (instant emas)\\n2 osh qoshiq quritilgan apelsin po",
    "korsatmalari": [
      "Barcha ziravor masalliqlarini toza va quruq shisha bankaga soling.",
      "Qopqog",
      "lguncha yaxshilab silkiting.",
      "Pishiriqlar, kekslar va shirinliklarga xushbo",
      "m berish uchun foydalaning. (Xona haroratida 1 oy saqlash mumkin)."
    ],
    "kategoriya": "Kekslar va Mafinlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_075_cabbage_potato_pie",
    "nomi": "Karam va Kartoshkali Pirog (Cabbage Potato Pie)",
    "tayyorlash_vaqti_daq": 70,
    "qiyinlik": "orta",
    "tarif_matni": "Kartoshka pyuresi, qovurilgan karam, dudlangan bekon va cheddar pishlog",
    "masalliqlar_matni": "900 g kartoshka (tozalanib, bo",
    "korsatmalari": [
      "Pechni 200°C ga qizdiring. Kartoshkani tuzli suvda 20 daqiqa qaynatib oling va suvidan ajratib 30 g saryog",
      ",",
      "g",
      ",",
      "g",
      "shing.",
      "Kartoshka pyuresiga tuxum, qaymoq, qovurilgan karamli aralashma va pishloqni qo",
      ",",
      "ni bo",
      ",",
      "lguncha pishiring."
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_076_salmon_with_dates",
    "nomi": "Xurmoli Achchiq-Shirin Somon Baliq (Spicy Sweet-and-Sour Salmon With Dates / Qaliyeh-e Khorma)",
    "tayyorlash_vaqti_daq": 40,
    "qiyinlik": "orta",
    "tarif_matni": "Qizil somon balig",
    "masalliqlar_matni": "Bodring va piyozli salat uchun:\\n4 osh qoshiq kashnich urug",
    "korsatmalari": [
      "Salat: Idishda piyoz, bodring, kashnich urug",
      ",",
      ",",
      "ida baliqlarni har bir tomonini 1 daqiqadan qizartirib oling va idishga chiqaring.",
      "Shu tovaga qolgan yog",
      ",",
      "laklarini qo",
      ",",
      "katlar va bodringli salat bilan birga torting."
    ],
    "kategoriya": "Go'sht va Parranda Taomlari"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_077_chocolate_almond_fudge",
    "nomi": "Shokolad va Bodomli Fadj (Chocolate-Almond Fridge Fudge)",
    "tayyorlash_vaqti_daq": 15,
    "qiyinlik": "oson",
    "tarif_matni": "Achchiq shokolad, avokado va bodom pastasi bilan muzlatgichda tayyorlanadigan tetik va shirin fadj deseri.",
    "masalliqlar_matni": "30 g bodom parraklari (tostlangan)\\n115 g achchiq shokolad (kamida 60% kakao)\\nYarim dona pishgan avokado\\n80 ml klyon siropi (yoki asal)\\n80 g bodom pastasi (almond butter)\\n1 osh qoshiq kakao kukuni\\nYarim choy qoshiq tuz va yirik dengiz tuzi",
    "korsatmalari": [
      "Qolipga pergament qog",
      ",",
      "hammomida eritib sovuting.",
      "Blenderda avokado, klyon siropi va bodom patasini silliq bo",
      "pirtiring. Kakao kukuni, tuz va 2 osh qoshiq sovuq suv qo",
      ",",
      "shib, bir xil konsistensiyaga kelguncha urib oling.",
      "Massani qolipga tekis yoyib, ustiga bodom parraklari va yirik dengiz tuzi seping.",
      "Muzlatgichda kamida 1 soat qotirib, so",
      "laklarga bo"
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_078_english_muffin_breakfast_sandwich",
    "nomi": "Inglizcha Mafinda Noshtabop Sendvich (Breakfast Sandwich on an English Muffin)",
    "tayyorlash_vaqti_daq": 35,
    "qiyinlik": "oson",
    "tarif_matni": "Qizartirib qovurilgan piyoz, cheddar pishlog",
    "masalliqlar_matni": "1 dona qizil piyoz (halqa qilib to",
    "korsatmalari": [
      "Pechni 175°C ga qizdiring. Piyoz, soya sousi, sarimsoq kukuni va 1 osh qoshiq yog",
      ",",
      "katlar, achchiq sous va 1 osh qoshiq zaytun yog",
      ",",
      "ni eritib, ko",
      ",",
      "ling. Ichki qismiga bo",
      "yorda ko",
      ",",
      "yib, pechda pishloq eriguncha 5 daqiqa isiting. Ustiga qovurilgan piyoz qo"
    ],
    "kategoriya": "Kekslar va Mafinlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_079_double_chocolate_rye_cookies",
    "nomi": "Javdar Unli Qo",
    "tayyorlash_vaqti_daq": 30,
    "qiyinlik": "orta",
    "tarif_matni": "Eritilgan achchiq shokolad, javdar uni va yong",
    "masalliqlar_matni": "90 g gretskiy yong",
    "korsatmalari": [
      "140 g achchiq shokolad va 110 g shirin bo",
      "bilan bug",
      "shing.",
      "Mikserda shakar va tuxumlarni 5 daqiqa davomida quyuq va och rang bo",
      "pirtiring. Eritilgan shokoladli saryog",
      "shib aralashtiring.",
      "Qolgan shokoladlarni yirik va mayda bo",
      "me",
      "g",
      ",",
      "oq va shokolad bo",
      ",",
      ",",
      ",",
      "lguncha pishiring. Sim panjarada sovutib dasturxonga torting."
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_081_sourdough_rye_brownies",
    "nomi": "Javdar Unli va Hamirturushli Brauni (Sourdough Rye Brownies)",
    "tayyorlash_vaqti_daq": 60,
    "qiyinlik": "orta",
    "tarif_matni": "O",
    "masalliqlar_matni": "1-bosqich (Hamirturush uchun):\\n72 g javdar uni\\n57 ml suv\\n36 g javdar hamirturushi (sourdough starter)\\n2-bosqich:\\n194 g javdar uni\\n3-bosqich (Brauni uchun):\\n5 dona tuxum\\n100 g shakar\\n195 g saryog",
    "korsatmalari": [
      "1-bosqich masalliqlarini idishda aralashtirib, ustini yopib iliq joyda 4–6 soatga tindiring.",
      "1-bosqichdagi hamirturushdan 125 g ajratib oling va 194 g javdar uni bilan aralashtirib, 1–2 soat iliq joyda qoldiring.",
      "Saryog",
      "yib (suv tegmaydigan qilib) eritib oling va 30 daqiqa sovuting. Pechni 160°C ga qizdiring. 25x25 cm qolipga pergament qog",
      ",",
      ", tuxum, ikkala shakar, kakao, vanil, soda va tuzni solib mikserda yaxshilab ko",
      ",",
      "rtasi biroz yumshoq bo",
      "laklarga bo"
    ],
    "kategoriya": "Shirinliklar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_082_lemon_meringue_pie",
    "nomi": "Limonli va Meringali Pirog (Lemon Meringue Pie)",
    "tayyorlash_vaqti_daq": 60,
    "qiyinlik": "orta",
    "tarif_matni": "Qarsildoq korj, nordon-shirin limonli zavarnoy kurd va momiq meringa kremi bilan pishiriladigan klassik pirog.",
    "masalliqlar_matni": "Korj uchun:\\n1 dona tayyor pirog korji\\nKrem (Kurd) uchun:\\n200 g shakar\\n5 osh qoshiq kraxmal\\nYarim choy qoshiq tuz\\n240 ml suv\\n120 ml sut\\n4 dona tuxum sarig",
    "korsatmalari": [
      "Pechni 200°C ga qizdiring. Korj xamirini qolipga yoyib, 10 daqiqa yopilgan holda, so",
      "lguncha pishirib sovuting. Pech haroratini 175°C ga tushiring.",
      "Qozonchada shakar, kraxmal va tuzni aralashtiring. Suv va sutni quyib ko",
      "shib, o",
      ",",
      ", limon sharbati va rendani solib aralashtiring.",
      "Meringa: Tuxum oqlarini limon kislotasi bilan mikserda ko",
      "lguncha davom eting.",
      "Issiq kremni korjga quying, ustiga meringa kremini tekis yoyib, sanchqi bilan cho",
      "lguncha pishiring."
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_083_chocolate_pudding_pie",
    "nomi": "Shokoladli Pudding Pirogi (Chocolate Pudding Pie)",
    "tayyorlash_vaqti_daq": 45,
    "qiyinlik": "orta",
    "tarif_matni": "Uvalanuvchan xamir korji, ipakdek shokoladli pudding va ko",
    "masalliqlar_matni": "Korj uchun:\\n155 g un\\n45 g sovuq saryog",
    "korsatmalari": [
      "Un, saryog",
      "lakchalar holiga keltiring. Muzday suv qo",
      "plang va 1 soat muzlatgichda tindiring.",
      "Xamirni yoyib qolipga soling. 190°C pechda 35–40 daqiqa tillarang bo",
      ",",
      "rta olovda 2 daqiqa qaynatib quyultiring. Olovdan olib shokolad va vanilni solib eriting.",
      "Puddingni sovigan korjga quyib, 2 soat muzlatgichda qotiring.",
      "Dasturxonga tortish oldidan qaymoq va 2 osh qoshiq shakarni ko"
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_084_blind_baked_pie_crust",
    "nomi": "Mukammal Pishirilgan Pirog Xamiri (Blind-Baked Pie Crust)",
    "tayyorlash_vaqti_daq": 50,
    "qiyinlik": "oson",
    "tarif_matni": "Shirin va tuzli piroglarning barchasi uchun mos keladigan uvalanuvchan va qarsildoq korj xamiri.",
    "masalliqlar_matni": "2 osh qoshiq shakar\\n2 choy qoshiq tuz\\n330 g un\\n340 g sovuq saryog",
    "korsatmalari": [
      "Katta idishda shakar, tuz va unni aralashtiring. Sovuq saryog",
      "lakchalar hosil qiling.",
      "Muzday suvni quyib, spatula bilan xamir holiga keltiring. Ikki bo",
      "lib, har birini 1 soat muzlatgichda tindiring.",
      "Tindirilgan xamirni unlangan stolda yoyib, 23 cm diametrli pirog qolipiga joylashtiring va chetlariga shakl bering.",
      "Pechni 200°C ga qizdiring. Xamir ustiga pergament qog",
      ",",
      "liq qarsildoq tillarang bo"
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_085_banana_cream_pie",
    "nomi": "Bananli va Qaymoqli Pirog (Banana Cream Pie)",
    "tayyorlash_vaqti_daq": 40,
    "qiyinlik": "oson",
    "tarif_matni": "Yangi banan parraklari, mayin zavarnoy krem va momiq qaymoq qatlami pishirig",
    "masalliqlar_matni": "1 dona pishirilgan tayyor pirog korji\\n3 dona pishgan banan\\n400 ml sut\\n3 dona tuxum sarig",
    "korsatmalari": [
      "Qozonda sut, tuxum sarig",
      "lguncha ko",
      "lguncha pishiring. Olovdan olib vanilni solib sovuting.",
      "Bananlarni parrak qilib to",
      "rang.",
      "Pishirilgan korj tubiga banan bo",
      ",",
      ",",
      "pirtirilgan qaymoq va banan bo"
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_086_coconut_creamed_greens",
    "nomi": "Kokos Sutida Dimlangan Ko",
    "tayyorlash_vaqti_daq": 30,
    "qiyinlik": "oson",
    "tarif_matni": "Ismaloq, kale va zanjabil-sarimsoqli ko",
    "masalliqlar_matni": "100 g kokos qiyg",
    "korsatmalari": [
      "Pechni 175°C ga qizdiring. Kokos qiyg",
      ",",
      "katlarning qattiq tomirlarini olib tashlab, barglarini to",
      "rang.",
      "Tovada kokos yog",
      ",",
      "katlarni oz-ozdan qo",
      ",",
      "ichlari va kashnich seping."
    ],
    "kategoriya": "Garnirlar va Sabzavotli Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_087_charred_sweet_potatoes",
    "nomi": "Qovurilgan Shirin Kartoshka, Achchiq Asalli Saryog",
    "tayyorlash_vaqti_daq": 35,
    "qiyinlik": "oson",
    "tarif_matni": "Pechda qizartirib pishirilgan batat kartoshkasi, asalli saryog",
    "masalliqlar_matni": "1.3 kg kichik shirin kartoshka (batat, ikkiga bo",
    "korsatmalari": [
      "Pechni 220°C ga qizdiring. Shirin kartoshkalarni 60 ml zaytun yog",
      ",",
      ", asal va achchiq sousni sanchqi bilan ko",
      "tayyorlang.",
      "Tovada qolgan 60 ml yog",
      "larini 4 daqiqa qovuring, kashnich kukuni va tuz soling.",
      "Pishgan kartoshkalarni laganga tizib, ustiga asalli saryog",
      "li yog"
    ],
    "kategoriya": "Garnirlar va Sabzavotli Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_088_pastel_butter_cookies",
    "nomi": "Bodomli Rangli Pechenye (Pastel Butter Cookies)",
    "tayyorlash_vaqti_daq": 40,
    "qiyinlik": "orta",
    "tarif_matni": "Maydalangan bodom, saryog",
    "masalliqlar_matni": "140 g qovurilgan bodom\\n250 g un\\nYarim choy qoshiq tuz\\nYarim choy qoshiq dolchin\\n225 g saryog",
    "korsatmalari": [
      "Pechni 175°C ga qizdiring. Kombaynda bodom, un, tuz va dolchinni maydalang.",
      "Idishda saryog",
      "pirtiring. Vanil va bodomli un aralashmasini qo",
      ",",
      ",",
      "pirtirib rangli shakar kukuni tayyorlang.",
      "Sovigan pechenyelarni rangli shakar kukunlariga botirib oling."
    ],
    "kategoriya": "Pechenye va Biskvitlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_089_iranian_rice_cookies",
    "nomi": "Eroncha Guruch Unli Pechenye (Iranian Rice Cookies)",
    "tayyorlash_vaqti_daq": 40,
    "qiyinlik": "orta",
    "tarif_matni": "Guruch uni, gulob va hil aromati bilan pishiriladigan sharqona uvalanuvchan pechenye.",
    "masalliqlar_matni": "170 g saryog",
    "korsatmalari": [
      "Saryog",
      "tkazing va sovuting.",
      "Idishda shakar va 2 osh qoshiq issiq suvni eriting. Gulob va tuxum sarig",
      "pirtiring, eritilgan saryog",
      ",",
      "li massaga qo",
      ",",
      ","
    ],
    "kategoriya": "Pechenye va Biskvitlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_090_sweet_potato_bowls",
    "nomi": "Shirin Kartoshka, Kale va Nohotli Bouli (Sweet Potato Bowls With Kale and Chickpeas)",
    "tayyorlash_vaqti_daq": 25,
    "qiyinlik": "oson",
    "tarif_matni": "Dimlangan shirin kartoshka, nohot, karri va kokos sutida pishirilgan kale ko",
    "masalliqlar_matni": "450 g shirin kartoshka (batat, kubik to",
    "korsatmalari": [
      "Qozonda shirin kartoshka va bulyonni 5 daqiqa qaynatib dimlang.",
      "Idishda kokos suti va karri kukunini aralashtiring.",
      "Qozonga kale ko",
      "ini yopgan holda 8 daqiqa sekin qaynatib pishiring.",
      "Limon sharbati, tuz va murch solib aralashtiring.",
      "Idishlarga pishgan guruchni solib, ustidan kartoshkali va nohotli taomni quying."
    ],
    "kategoriya": "Garnirlar va Sabzavotli Taomlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_091_black_bottom_hazelnut_pie",
    "nomi": "Shokoladli va Fundukli Pirog (Black-Bottom Hazelnut Pie)",
    "tayyorlash_vaqti_daq": 70,
    "qiyinlik": "orta",
    "tarif_matni": "Korj tubiga surtilgan erigan achchiq shokolad, qovurilgan funduk yong",
    "masalliqlar_matni": "Korj uchun:\\n155 g un\\n115 g sovuq saryog",
    "korsatmalari": [
      "Korj masalliqlaridan xamir qorib, 1 soat muzlatgichda tindiring. Yoyib qolipga soling va sovuting.",
      "Funduklarni 175°C pechda 10 daqiqa qovurib oling. 1 stakan butun fundukni bezak uchun ajratib, qolganini maydalang.",
      "Eritilgan shokoladni korj tubiga tekis yoyib, 15 daqiqa muzlatgichda qotiring.",
      "Idishda eritilgan saryog",
      "pirtiring. Maydalangan fundukni qo",
      ","
    ],
    "kategoriya": "Piroglar va Tartlar"
  },
  {
    "source": "MiniApp",
    "id": "rec_hd_092_olive_oil_apple_cake",
    "nomi": "Zaytun Yog",
    "tayyorlash_vaqti_daq": 75,
    "qiyinlik": "orta",
    "tarif_matni": "Zaytun yog",
    "masalliqlar_matni": "240 ml zaytun yog",
    "korsatmalari": [
      "Pechni 175°C ga qizdiring. Qolipni zaytun yog",
      ",",
      "ini ajratib, qolganiga un va qabartma kukun (Razrixlitel)ni qo",
      ",",
      "pirtiring. Zaytun yog",
      ",",
      "shib xamir holiga keltiring.",
      "Qolipga quyib, ustiga ajratilgan ziravor va 2 choy qoshiq shakar aralashmasini seping. 175°C pechda 60–70 daqiqa pishiring."
    ],
    "kategoriya": "Kekslar va Mafinlar"
  }
];

export const initialTales: Tale[] = [
  {
    id: 'tale_quyoncha',
    kategoriya: 'Milliy Quyuq Taomlar',
    sarlavha: 'Mehrli quyoncha',
    yosh_toifasi: '3-5',
    muqova_rasm_url: '/assets/images/tale_quyoncha_cover_1785171712747.png',
    holat: 'nashr',
    created_at: '2026-07-01',
    sahifalar: [
      {
        id: 'p1',
        ertak_id: 'tale_quyoncha',
    kategoriya: 'Milliy Quyuq Taomlar',
        tartib_raqami: 1,
        rasm_url: '/assets/images/tale_quyoncha_cover_1785171712747.png',
        matn: "Bir bor ekan, bir yo'q ekan. Quyoshli o'rmonda kichkina xushfe'l Quyoncha yashagan ekan. U har kuni barcha do'stlariga shirin sabzilar ulashardi."
      },


      {
        id: 'p2',
    kategoriya: 'Milliy Quyuq Taomlar',
        ertak_id: 'tale_quyoncha',
        tartib_raqami: 2,
        rasm_url: '/assets/images/tale_quyoncha_cover_1785171712747.png',
        matn: "Bir kuni kichkina quyoncha o'rmonda yo'lg'iz yig'layotgan bir kichkina qushchani ko'rdi. Qushcha inidan tushib ketgan edi."
      },
      {
        id: 'p3',
    kategoriya: 'Milliy Quyuq Taomlar',
        ertak_id: 'tale_quyoncha',
        tartib_raqami: 3,
        rasm_url: '/assets/images/tale_quyoncha_cover_1785171712747.png',
        matn: "Quyoncha ayiq polvonni yordamga chaqirdi va birgalikda qushchani ozoda iniga joylashtirishdi. Barcha o'rmon hayvonlari quyonchaning mehridan xursand bo'lishdi."
      }
    ]
  },
  {
    id: 'tale_odat',
    kategoriya: 'Milliy Quyuq Taomlar',
    sarlavha: 'Yomon odatning zarari',
    yosh_toifasi: '6-8',
    muqova_rasm_url: '/assets/images/tale_quyoncha_cover_1785171712747.png',
    holat: 'nashr',
    created_at: '2026-07-02',
    sahifalar: [
      {
        id: 'p1',
        ertak_id: 'tale_odat',
    kategoriya: 'Milliy Quyuq Taomlar',
        tartib_raqami: 1,
        rasm_url: '/assets/images/tale_quyoncha_cover_1785171712747.png',
        matn: "Odil ismli bola har kuni maktabdan keliboq o'yinchoqlarini tarqoq holda qoldirib, qo'lini yuvmay shirinlik yeyishni yaxshi ko'rardi."
      },
      {
        id: 'p2',
    kategoriya: 'Milliy Quyuq Taomlar',
        ertak_id: 'tale_odat',
        tartib_raqami: 2,
        rasm_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
        matn: "Kunlardan bir kuni uning sevimli o'yinchoq ayiqchasi yo'qolib qoldi. Chunki xonasi shunchalik tartibsiz ediki, hech narsa topilmasdi."
      },
      {
        id: 'p3',
    kategoriya: 'Milliy Quyuq Taomlar',
        ertak_id: 'tale_odat',
        tartib_raqami: 3,
        rasm_url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
        matn: "Onasi unga xonasini tartiblashga yordam berdi. Odil shundan so'ng ozodalik va intizom insonning eng yaqin do'sti ekanligini tushunib yetdi."
      }
    ]
  },
  {
    id: 'tale_chumoli',
    kategoriya: 'Milliy Quyuq Taomlar',
    sarlavha: 'Mehnatsevar chumoli',
    yosh_toifasi: '6-8',
    muqova_rasm_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    holat: 'nashr',
    created_at: '2026-07-03',
    sahifalar: [
      {
        id: 'p1',
        ertak_id: 'tale_chumoli',
    kategoriya: 'Milliy Quyuq Taomlar',
        tartib_raqami: 1,
        rasm_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        matn: "Issiq yoz kunlarida barcha kapalaklar o'ynab yurganida, tirishqoq Chumoli qish uchun oziq-ovqat g'amlar edi."
      },
      {
        id: 'p2',
    kategoriya: 'Milliy Quyuq Taomlar',
        ertak_id: 'tale_chumoli',
        tartib_raqami: 2,
        rasm_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
        matn: "Sovuq qish kelganda Chumolining uyi issiq va rizqga to'la edi. Mehnat qilgan hech qachon kam bo'lmaydi!"
      }
    ]
  },
  {
    id: 'tale_sehrli_bog',
    kategoriya: 'Milliy Quyuq Taomlar',
    sarlavha: "Sehrli bog'",
    yosh_toifasi: '9-12',
    muqova_rasm_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
    holat: 'nashr',
    created_at: '2026-07-04',
    sahifalar: [
      {
        id: 'p1',
        ertak_id: 'tale_sehrli_bog',
    kategoriya: 'Milliy Quyuq Taomlar',
        tartib_raqami: 1,
        rasm_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
        matn: "Qadimiy qishloq chetida sirlarga to'la bir bog' bor edi. U yerdagi har bir daraxt kishiga ezgulik va odob so'zlarini so'zlar edi."
      },
      {
        id: 'p2',
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
    savol: "Ko'zi bor, boshi yo'q. Ko'zi bor, ko'rmaydi. Bu nima?",
    javob: 'Igna',
    variantlar: ['Igna', 'Tuxum', 'Tuz', 'Uy'],
    yosh_toifasi: '3-5',
    qiyinlik: 'oson',
    izoh: "Igna teshigiga 'ko'z' deyiladi, lekin u ko'rmaydi."
  },
  {
    id: 'rid_2',
    kategoriya: 'Milliy Quyuq Taomlar',
    savol: "Uydan chiqadi, yo'ldan ketadi, lekin joyidan jilmaydi. Bu nima?",
    javob: "Yo'l",
    variantlar: ["Yo'l", 'Avtobus', 'Soy', 'Daraxt'],
    yosh_toifasi: '6-8',
    qiyinlik: 'oson',
    izoh: "Yo'l har tomonga eltadi, lekin o'zi joyida turadi."
  },
  {
    id: 'rid_3',
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
    savol: "Aida 12 ta olma terdi. Ukasi undan 5 tasini oldi. Aidaning nechta olmasi qoldi?",
    togri_javob: '7',
    notogri_variantlar: ['5', '8', '17'],
    yosh_toifasi: '6-8',
    tushuntirish: "12 - 5 = 7 ta olma qoldi."
  },
  {
    id: 'math_2',
    kategoriya: 'Milliy Quyuq Taomlar',
    savol: "Savatchada 4 ta qizil va 6 ta yashil shar bor. Jami nechta shar bor?",
    togri_javob: '10',
    notogri_variantlar: ['8', '12', '2'],
    yosh_toifasi: '3-5',
    tushuntirish: "4 + 6 = 10 ta shar."
  },
  {
    id: 'math_3',
    kategoriya: 'Milliy Quyuq Taomlar',
    savol: "Bir kitobda 20 sahifa bor. Malika har kuni 5 sahifa o'qisa, kitobni necha kunda tugatadi?",
    togri_javob: '4',
    notogri_variantlar: ['5', '3', '10'],
    yosh_toifasi: '9-12',
    tushuntirish: "20 / 5 = 4 kunda."
  }
];
