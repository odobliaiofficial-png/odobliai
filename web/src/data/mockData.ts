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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Salatlar & Gazaklar',
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
    kategoriya: 'Milliy Quyuq Taomlar',
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
    kategoriya: 'Turk Oshxonasi',
    nomi: 'Turkiya Baqlavasi (Baklava)',
    tayyorlash_vaqti_daq: 45,
    qiyinlik: 'orta',
    rasm_url: '🍪',
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
    kategoriya: 'Turk Oshxonasi',
    nomi: 'Turk Loqumi (Turkish Delight)',
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'orta',
    rasm_url: '🍲',
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
    kategoriya: 'Turk Oshxonasi',
    nomi: 'Turkcha Sütlaç (Sutli Desert)',
    tayyorlash_vaqti_daq: 40,
    qiyinlik: 'oson',
    rasm_url: '🍲',
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
    kategoriya: 'Turk Oshxonasi',
    nomi: 'Revani (Manna Yarma Keksa)',
    tayyorlash_vaqti_daq: 35,
    qiyinlik: 'oson',
    rasm_url: '🍰',
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
    kategoriya: 'Turk Oshxonasi',
    nomi: 'Şekerpare Pechenyesi',
    tayyorlash_vaqti_daq: 25,
    qiyinlik: 'oson',
    rasm_url: '🍪',
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
    kategoriya: 'Turk Oshxonasi',
    nomi: 'Tulumba Tatlısı',
    tayyorlash_vaqti_daq: 30,
    qiyinlik: 'orta',
    rasm_url: '🍲',
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
    kategoriya: 'Turk Oshxonasi',
    nomi: 'Turk Künefe Deserti',
    tayyorlash_vaqti_daq: 30,
    qiyinlik: 'orta',
    rasm_url: '🍲',
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
    kategoriya: 'Turk Oshxonasi',
    nomi: 'Lokma (Qiyomli Sharchalar)',
    tayyorlash_vaqti_daq: 25,
    qiyinlik: 'orta',
    rasm_url: '🍲',
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
    kategoriya: 'Turk Oshxonasi',
    nomi: 'Kazandibi (Karamellangan Sutli Desert)',
    tayyorlash_vaqti_daq: 40,
    qiyinlik: 'orta',
    rasm_url: '🍲',
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
    kategoriya: 'Turk Oshxonasi',
    nomi: 'Turkcha Muhallebi Krem Deserti',
    tayyorlash_vaqti_daq: 20,
    qiyinlik: 'oson',
    rasm_url: '🍲',
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
    kategoriya: 'Turk Oshxonasi',
    nomi: 'İrmik Helvası (Manna Halvosi)',
    tayyorlash_vaqti_daq: 30,
    qiyinlik: 'oson',
    rasm_url: '🍲',
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
    kategoriya: 'Turk Oshxonasi',
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
    kategoriya: 'Turk Oshxonasi',
    nomi: 'Pişmaniye (Turk Paxtahalvosi)',
    tayyorlash_vaqti_daq: 90,
    qiyinlik: 'qiyin',
    rasm_url: '🍲',
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
  },
  {
    id: 'rec_hd_041_perfect_pie_crust',
    nomi: 'Mukammal Pirog Xamiri (Perfect Pie Crust)',
    tayyorlash_vaqti_daq: 20,
    qiyinlik: 'oson',
    kategoriya: 'Pishiriqlar & Xamirlar',
    rasm_url: '🍰',
    tarif_matni: "Muzday saryog' va un birlashmasidan tayyorlanadigan, har qanday shirin va sho'r piroglar uchun eng zo'r va qarsildoq korj xamiri.",
    masalliqlar_matni: "1 ¼ stakan un, ½ choy qoshiq tuz, 115 g sovuq saryog' (kubik kesilgan), 4–5 osh qoshiq muzday suv.",
    korsatmalari: [
      "Un va tuzni aralashtiring.",
      "Sovuq saryog'ni qo'shib, uvoq hosil bo'lguncha barmoqlar bilan uvalang.",
      "Muzday suvni oz-ozdan quyib, xamirni to'plang.",
      "Plyonkaga o'rab, muzlatgichda kamida 1 soat tindiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_tuz', 'ing_saryog']
  },
  {
    id: 'rec_hd_042_peanut_butter_cookies',
    nomi: "Yer-yong'oqli Pechenye (Peanut Butter Cookies)",
    tayyorlash_vaqti_daq: 30,
    qiyinlik: 'oson',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '/assets/images/shirinlik_baqlava_1785171638612.png',
    tarif_matni: "Yer-yong'oq pastasi va qovurilgan yer-yong'oq bo'laklari bilan pishiriladigan xushbo'y va og'izda eriydigan pechenye.",
    masalliqlar_matni: "1 stakan yer-yong'oq pastasi (peanut butter), 1 stakan shakar, 1 dona tuxum, 1 stakan qovurilgan tuzli yer-yong'oq (maydalangan).",
    korsatmalari: [
      "Pechni 175°C gacha qizdiring.",
      "Yer-yong'oq pastasi, shakar va tuxumni aralashtiring.",
      "Maydalangan yer-yong'oqni qo'shing.",
      "Xamirdan sharchalar yasab, sanchqi bilan katakcha naqsh qiling.",
      "175°C pechda 10–12 daqiqa tillarang bo'lguncha pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_yeryongoq', 'ing_shakar', 'ing_tuxum']
  },
  {
    id: 'rec_hd_043_chicken_potato_gratin',
    nomi: 'Tovuqli va Kartoshkali Gratin (Chicken and Potato Gratin)',
    tayyorlash_vaqti_daq: 75,
    qiyinlik: 'orta',
    kategoriya: 'Quyuq Taomlar',
    rasm_url: '🍚',
    tarif_matni: "Saryog'da qizartirilgan qaymoqli sous, kichik kartoshkalar va tovuq go'shtidan pechda pishiriladigan shirin gratin.",
    masalliqlar_matni: "1.3 kg tovuq go'shti (son va boldirlar), 450 g kichik kartoshka (ikkiga bo'lingan), 250 g sharlot piyoz, 75 g saryog', 180 ml qaymoq (heavy cream), 2 tish sarimsoq, Tuz, murch, muskat yong'og'i, mavrak va timyan, 100 g qotgan non uvoqlari.",
    korsatmalari: [
      "Tovuqni tuzlab 1 soat tindiring. Pechni 220°C ga qizdiring.",
      "Saryog'ni tovada qizartirib brown-butter qiling, qaymoq, sarimsoq va ziravorlar qo'shing.",
      "Tovuq go'shtini tovada qizartirib oling.",
      "Qolipga tovuq va kartoshkalarni tizib, ustidan qaymoqli sousni quying. 40 daqiqa pechda pishiring.",
      "Non uvoqlarini qovurib, pishgan gratin ustidan seping."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_tovuq', 'ing_kartoshka', 'ing_piyoz', 'ing_saryog', 'ing_qaymoq', 'ing_sarimsoq']
  },
  {
    id: 'rec_hd_044_chhena_poda',
    nomi: 'Chhena Poda — Ziravorli Chizkeyk (Chhena Poda)',
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍰',
    tarif_matni: "Tvorog, kardamon va manka yormasidan karamel qatlam ustida pishiriladigan afsonaviy hindistoncha tvorogli chizkeyk.",
    masalliqlar_matni: "225 g panir (yoki uydagidek tvorog), ¼ stakan shakar kukuni, ½ choy qoshiq hil (kardamon), 2 osh qoshiq manny yormasi (manka), 2 osh qoshiq eritilgan saryog', ¼ stakan sut, Kesh'yu va mayiz, 3 osh qoshiq shakar (karamel uchun).",
    korsatmalari: [
      "Pechni 175°C ga qizdiring. Qolip tubida shakarni eritib karamel holiga keltiring.",
      "Tvorog, shakar kukuni, hil, manka, saryog' va sutni silliq bo'lguncha aralashtiring.",
      "Kesh'yu va mayizni solib, karamelli qolipga quying.",
      "175°C pechda 40–45 daqiqa pishiring. Sovugach agdarib dasturxonga torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_tvorog', 'ing_shakar', 'ing_manka', 'ing_saryog', 'ing_sut', 'ing_keshyu', 'ing_mayiz']
  },
  {
    id: 'rec_hd_045_creamy_mashed_potatoes',
    nomi: 'Mayin Kartoshka Pyuresi (Our Favorite Creamy Mashed Potatoes)',
    tayyorlash_vaqti_daq: 35,
    qiyinlik: 'oson',
    kategoriya: 'Garnirlar & Yengil Taomlar',
    rasm_url: '🍚',
    tarif_matni: "Issiq sut, smetana, saryog' va sarimsoq aromati bilan ezilgan o'ta yumshoq va mayin klassik kartoshka pyuresi.",
    masalliqlar_matni: "1.8 kg kartoshka (tozalanib, bo'lingan), 6 tish sarimsoq, 300 ml sut, 200 g saryog', 100 g smetana, Tuz, qora murch va timyan.",
    korsatmalari: [
      "Kartoshka va sarimsoqni tuzli suvda 20 daqiqa yumshaguncha qaynatib oling.",
      "Sut, saryog' va timyanni isitib oling.",
      "Kartoshkani suvidan ajratib ezing.",
      "Issiq sutli aralashma va smetanani qo'shib silliq krem holatiga keltiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_kartoshka', 'ing_sarimsoq', 'ing_sut', 'ing_saryog', 'ing_smetana']
  },
  {
    id: 'rec_hd_046_creole_apple_cheesecake',
    nomi: 'Karamel-Olmali Kreol Chizkeyki (Creole Apple Cheesecake)',
    tayyorlash_vaqti_daq: 90,
    qiyinlik: 'qiyin',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍰',
    tarif_matni: "Krekerli korj, yumshoq pishloqli krem hamda ustiga dimlangan karamelli nordon olma qatlami bilan pishiriladigan dabdabali chizkeyk.",
    masalliqlar_matni: "Korj: 2 stakan grek krekeri uvoqlari, 100 g saryog', 3 osh qoshiq shakar. Krem: 900 g cream cheese, 1.3 stakan smetana, 1 stakan shakar, 2 dona tuxum, vanil. Ustiga: 7 dona nordon olma, 50 g saryog', ½ stakan jigarrang shakar, dolchin va kardamon.",
    korsatmalari: [
      "Korj masalliqlarini aralashtirib qolipga presslang va 190°C pechda 10 daqiqa pishiring.",
      "Cream cheese va shakarni ko'pirtiring, smetana va tuxumlarni qo'shing. Korjga quyib suvli hammomda (water bath) 175°C pechda 1 soat pishiring.",
      "Olmalarni saryog', shakar va ziravorlar bilan tovada yumshaguncha dimlang.",
      "Chizkeyk sovugach, olmali karamelni ustiga yoying."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_kreker', 'ing_saryog', 'ing_shakar', 'ing_cream_cheese', 'ing_smetana', 'ing_tuxum', 'ing_olma']
  },
  {
    id: 'rec_hd_047_coconut_creamed_corn',
    nomi: 'Kokosli Sutda Pishirilgan Makkajuxori va Yarma (Coconut Creamed Corn)',
    tayyorlash_vaqti_daq: 25,
    qiyinlik: 'oson',
    kategoriya: 'Garnirlar & Yengil Taomlar',
    rasm_url: '🍲',
    tarif_matni: "Zanjabil, zardachub va kokos sutida dimlangan shirin makkajuxori va kinoa donchalari.",
    masalliqlar_matni: "4 so'ta makkajuxori donchalari, 1 stakan pishirilgan yarma (kinoa yoki farro), 1 stakan kokos suti, 1 dona xalapeno murchi, Zanjabil, sarimsoq, zardachub, tuz va laym.",
    korsatmalari: [
      "Tovada yog'ni qizdirib zanjabil, sarimsoq va murch pishiring. Zardachub va makkajuxorini qo'shib 5 daqiqa qovuring.",
      "Pishgan yarma va kokos sutini qo'shing, 3 daqiqa dimlang.",
      "Ustiga qovurilgan piyoz seping va laym bo'lagi bilan torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_makkajuxori', 'ing_kokos_suti', 'ing_zanjabil', 'ing_sarimsoq', 'ing_piyoz']
  },
  {
    id: 'rec_hd_048_tomato_roasted_garlic_pie',
    nomi: 'Pomidor va Qovurilgan Sarimsoqli Pirog (Tomato & Roasted Garlic Pie)',
    tayyorlash_vaqti_daq: 90,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Tuzli Piroglar',
    rasm_url: '🍰',
    tarif_matni: "Pechda tob berilgan pomidorlar, erigan pishloq va sarimsoqli krem bilan pishiriladigan ajoyib tuzli fransuzcha pirog.",
    masalliqlar_matni: "1.1 kg pomidor bo'laklari, 6 tish sarimsoq, 115 g saryog', 250 g kreker uvoqlari, 2 dona tuxum, 300 g pishloq (Taleggio va Parmezan), ½ stakan mayonez, timyan va murch.",
    korsatmalari: [
      "Pomidorlarni 240°C pechda 25 daqiqa biroz quritib oling.",
      "Sarimsoqni saryog'da qovuring. Kreker uvoqlarini tuxum va sarimsoqli saryog' bilan aralashtirib qolipga presslang va 10 daqiqa pishiring.",
      "Pishloq, mayonez, ziravorlar va sarimsoqni aralashtiring.",
      "Qolipga pishloqli krem va pomidorlarni qatlam qilib tizib, 190°C pechda 1 soat pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_pomidor', 'ing_sarimsoq', 'ing_saryog', 'ing_tuxum', 'ing_pishloq', 'ing_mayonez']
  },
  {
    id: 'rec_hd_049_sour_cream_onion_potato_salad',
    nomi: 'Smetana va Piyozli Kartoshka Salati (Sour Cream Potato Salad)',
    tayyorlash_vaqti_daq: 35,
    qiyinlik: 'oson',
    kategoriya: 'Salatlar & Gazaklar',
    rasm_url: '🍚',
    tarif_matni: "Yumshoq kartoshka, smetana, dijon xardali va ustiga uvalangan qarsildoq kartoshka chipslari solingan xushbo'y salat.",
    masalliqlar_matni: "900 g kichik kartoshka, 1 stakan smetana, ¼ stakan mayonez, 1 osh qoshiq piyoz kukuni, 2 choy qoshiq dijon xardali, Yashil piyoz, qizil piyoz va sarimsoq, Kartoshka chipslari (ustiga uvatish uchun).",
    korsatmalari: [
      "Kartoshkani tuzli suvda yumshaguncha qaynatib oling va biroz ezing.",
      "Smetana, mayonez, piyoz kukuni, xardal, sarimsoq va yashil piyozni aralashtiring.",
      "Kartoshkalarni sousga solib aralashtiring va sovuting.",
      "Dasturxonga tortish oldidan ustiga uvalangan chipslarni seping."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_kartoshka', 'ing_smetana', 'ing_mayonez', 'ing_piyoz', 'ing_sarimsoq']
  },
  {
    id: 'rec_hd_050_frozen_avocado_cake',
    nomi: 'Muzlatilgan Avokadoli Pirog (Frozen Avocado Cake)',
    tayyorlash_vaqti_daq: 30,
    qiyinlik: 'oson',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍰',
    tarif_matni: "Yangi avokado, quyultirilgan sut (sgushchenka) va laym sharbatidan tayyorlanadigan tetiklashtiruvchi muzlatilgan pishiriq.",
    masalliqlar_matni: "Korj: 180 g kreker uvoqlari, ⅓ stakan quyultirilgan sut. Asos: 3 dona avokado, 450 g cream cheese, 1.5 banka quyultirilgan sut, limon va laym sharbati hamda rendasi.",
    korsatmalari: [
      "Kreker va ⅓ stakan quyultirilgan sutni aralashtirib qolipga yoying, 180°C pechda 12 daqiqa pishirib sovuting.",
      "Avokado, cream cheese, quyultirilgan sut va limon sharbatini kombaynda silliq ko'pirtiring.",
      "Kremni korj ustiga yoyib, kamida 6 soat muzlatgichda muzlating.",
      "Kesishdan 15 daqiqa oldin xonaga chiqaring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_avokado', 'ing_cream_cheese', 'ing_quyultirilgan_sut', 'ing_limon', 'ing_kreker']
  },
  {
    id: 'rec_hd_051_chocolate_zucchini_cake',
    nomi: 'Shokoladli va Qovoqchali Pirog (Chocolate Zucchini Cake)',
    tayyorlash_vaqti_daq: 70,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍰',
    tarif_matni: "Kakao, shokolad tomchilari va maydalangan qovoqcha (zucchini) qo'shilgan, jonsizlanmaydigan va sirli darajada shirin keks.",
    masalliqlar_matni: "2 stakan un, ½ stakan kakao kukuni, 1 choy qoshiq soda, tuz, 1.5 stakan shakar, 115 g saryog', ½ stakan o'simlik yog'i, 2 dona tuxum, ½ stakan qatiq/kefir, 2 stakan qirg'ichdan chiqarilgan qovoqcha (zucchini), 1 stakan shokolad tomchilari va yong'oq.",
    korsatmalari: [
      "Quruq va ho'l masalliqlarni alohida idishlarda aralashtiring.",
      "Xamirlarni birlashtirib, qirilgan qovoqchani qo'shing.",
      "Qolipga quyib, ustidan shokolad va yong'oq seping.",
      "165°C pechda 50 daqiqa pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_kakao', 'ing_shakar', 'ing_saryog', 'ing_tuxum', 'ing_qabachki', 'ing_shokolad']
  },
  {
    id: 'rec_hd_052_dakgangjeong',
    nomi: 'Dakgangjeong — Koreyscha Qarsildoq Tovuq (Dakgangjeong)',
    tayyorlash_vaqti_daq: 45,
    qiyinlik: 'orta',
    kategoriya: 'Koreys & Dunyo Oshxonasi',
    rasm_url: '🍗',
    tarif_matni: "Kraxmalda ikki marta qovurilgan qarsildoq tovuq bo'laklari va shirin-achchiq asalli asil koreyscha sous.",
    masalliqlar_matni: "1.1 kg tovuq qanotchalari yoki bo'laklari, ½ stakan kartoshka kraxmali, tuz va murch. Sous: ½ stakan asal, 3 osh qoshiq soyali sous, 2 osh qoshiq shakar, sarimsoq, zanjabil va qurutilgan achchiq qalampir. Qovurish uchun o'simlik yog'i, kunchut.",
    korsatmalari: [
      "Tovuq bo'laklarini tuz, murch va kraxmalga bulab oling.",
      "Yog'da ikki marta (qarsildoq bo'lguncha) qovurib oling.",
      "Tovada sous masalliqlarini 2–3 daqiqa qaynatib quyultiring.",
      "Qovurilgan tovuqlarni sousga solib aralashtiring va kunchut seping."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_tovuq', 'ing_kraxmal', 'ing_asal', 'ing_soya_sousi', 'ing_shakar', 'ing_sarimsoq', 'ing_zanjabil']
  },
  {
    id: 'rec_hd_053_fresh_fruit_tart',
    nomi: 'Bodomli Korjda Yangi Mevali Tart (Fresh Fruit Tart)',
    tayyorlash_vaqti_daq: 70,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍰',
    tarif_matni: "Bodom unli qarsildoq tart korji, ipakdek mayin zavarnoy krem va ustida yangi rezavor mevalar.",
    masalliqlar_matni: "Korj: 1 stakan un, ½ stakan bodom uni, 3 osh qoshiq shakar, 115 g sovuq saryog', 2 tuxum sarig'i. Krem: 2 stakan sut, 4 tuxum sarig'i, ⅓ stakan shakar, ¼ stakan kraxmal, vanil va saryog'. Ustiga: 350 g chernika va smorodina.",
    korsatmalari: [
      "Korj masalliqlaridan xamir qorib, qolipga yoying va 175°C pechda 35 daqiqa pishirib sovuting.",
      "Sut, tuxum sarig'i, shakar va kraxmalni qaynatib quyuq zavarnoy krem pishiring.",
      "Kremni korj ustiga surtib, yangi mevalar bilan bezating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_bodom', 'ing_shakar', 'ing_saryog', 'ing_tuxum', 'ing_sut', 'ing_chernika']
  },
  {
    id: 'rec_hd_054_pear_hazelnut_tart',
    nomi: 'Nok va Fundukli Franjipan Tarti (Pear & Hazelnut Tart)',
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍰',
    tarif_matni: "Funduk yong'og'i va saryog'dan pishirilgan franjipan kremi hamda ustiga tizilgan shirin nok parraklari bilan tayyorlanadigan fransuz tarti.",
    masalliqlar_matni: "1 dona tayyor tart korji, 1 stakan funduk (maydalangan yong'oq), ½ stakan shakar, 90 g saryog', 2 dona tuxum, vanil va bodom ekstrakti, 3 dona nok (ingichka parrak kesilgan), Qiyom (o'rik murabbosi suvi).",
    korsatmalari: [
      "Funduk, shakar, saryog', tuxum va ekstraktlarni ko'pirtirib franjipan kremi tayyorlang.",
      "Kremni korjga yoying va ustidan nok bo'laklarini chiroyli tizib chiqing.",
      "175°C pechda 35–40 daqiqa pishiring. Issiq holda ustiga o'rik qiyomini surting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_funduk', 'ing_shakar', 'ing_saryog', 'ing_tuxum', 'ing_nok']
  },
  {
    id: 'rec_hd_055_salted_pistachio_crumble',
    nomi: 'Tuzli Pistali Uvoq, Mevalar va Muzqaymoq (Salted Pistachio Crumbles With Berries and Ice Cream)',
    tayyorlash_vaqti_daq: 35,
    qiyinlik: 'oson',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍪',
    tarif_matni: "Pechda qovurilgan tuzli pista uvoqlari, qaynoq asalli qulupnaylar va muzday muzqaymoq uyg'unligi.",
    masalliqlar_matni: "Pistali uvoq (Krambl) uchun:\n60 g xom pista\n125 g un\n100 g shakar\n40 g makkajo'xori uni (cornmeal)\n1 choy qoshiq yirik tuz\n115 g eritilgan saryog'\nMeva va muzqaymoq uchun:\n700 g yangi qulupnay (bo'laklangan)\n1 osh qoshiq limon sharbati\nYarim choy qoshiq hil (kardamon)\n3 osh qoshiq asal\n1 litr xohlagan turdagi muzqaymoq",
    korsatmalari: [
      "Pechni 175°C gacha qizdiring. Pistalarni pishirish varag'iga yoyib, pechda 6–8 daqiqa qovurib oling. Sovigach, oshxona kombaynida kichik bo'lakchalar qoladigan qilib maydalang.",
      "Idishda maydalangan pista, un, shakar, makkajo'xori uni va 1 choy qoshiq tuzni aralashtiring. Ustidan eritilgan saryog'ni quyib, barmoqlar bilan uvalab kichik noxotdek uvoqlar hosil qiling.",
      "Krambl aralashmasini pergament qog'oz solingan listga yoyib, 175°C pechda tillarang bo'lguncha 20–25 daqiqa pishiring (o'rtasida bir marta aralashtirib qo'ying).",
      "Chuqur idishda qulupnay, limon sharbati, hil va bir chimdim tuzni aralashtiring.",
      "Kichik tovada asalni qizdiring — 4 daqiqa davomida pufakchalar chiqarib biroz to'qlashguncha qaynating va darhol qulupnaylar ustiga quying. Yaxshilab aralashtirib, 15 daqiqa tindiring.",
      "Idishlarga muzqaymoq shariklarini soling, ustidan suvi bilan birga qulupnayli aralashmani quyib, qarsildoq pistali uvoqlardan seping."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_pista', 'ing_un', 'ing_shakar', 'ing_saryog', 'ing_qulupnay', 'ing_asal']
  },
  {
    id: 'rec_hd_056_summer_tomato_ricotta_tart',
    nomi: 'Yozgi Pomidorli va Rikottali Tart (Summer Tomato and Ricotta Tart With Oat Pastry)',
    tayyorlash_vaqti_daq: 50,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Tuzli Piroglar',
    rasm_url: '🍰',
    tarif_matni: "Sullili korj (xamir), chia urug'lari, ipakdek rikotta pishlog'i va sersuv pomidor bo'laklari bilan pishiriladigan yozgi tart.",
    masalliqlar_matni: "Sullili korj (xamir) uchun:\n90 g suli yormasi (rolled oats)\n50 g chia urug'lari\nYarim choy qoshiq tuz\n140 g bug'doy uni (wholemeal/spelt flour)\n60 g bodom uni\n80 ml zaytun yog'i\n60 ml suv\nIchlik va ustiga:\n240 g rikotta pishlog'i (yoki yumshoq tvorog)\n2 choy qoshiq limon rendasi\n40 g parmezan pishlog'i (qirilgan)\n400 g sersuv pomidor bo'laklari\nYangi rayhon barglari, zaytun yog'i, tuz va qora murch",
    korsatmalari: [
      "Pechni 180°C gacha qizdiring. Kombaynda suli yormasi, chia urug'lari va tuzni mayda uvoq bo'lguncha elang. Bug'doy va bodom unini qo'shib aralashtiring.",
      "Zaytun yog'i va suvni birlashtirib, kombayn ishlab turganda unli aralashmaga quyib boring.",
      "Xamirni 24 cm diametrli tart qolipiga solib, tubi va chetlariga barmoqlar bilan mahkam presslab yoying. Sanchqi bilan teshikchalar qilib, 180°C pechda 20 daqiqa tillarang bo'lguncha pishiring va to'liq sovuting.",
      "Idishda rikotta, limon rendasi, parmezan, tuz va murch bilan yaxshilab ko'pirtiring.",
      "Sovigan korj ichiga rikotta kremini tekis yoying. Ustiga pomidor bo'laklari va rayhon barglarini tizib, zaytun yog'i tomizing va murch seping."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_suli', 'ing_chia', 'ing_un', 'ing_bodom', 'ing_rikotta', 'ing_pomidor', 'ing_parmezan']
  },
  {
    id: 'rec_hd_057_fruit_galette',
    nomi: 'Mevali Galetta (Fruit Galette)',
    tayyorlash_vaqti_daq: 45,
    qiyinlik: 'oson',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍰',
    tarif_matni: "Saryog'li fransuzcha uvalanuvchan xamir ustida shaftoli, o'rik va olxori mevalaridan tayyorlanadigan qarsildoq galetta.",
    masalliqlar_matni: "Xamir uchun:\n200 g un\n100 g sovuq saryog' (kubik kesilgan)\n1 osh qoshiq shakar\n1 chimdim tuz\n4 osh qoshiq muzday suv\nIchlik uchun:\n400 g yangi mevalar (shaftoli, o'rik, olxori yoki meva aralashmasi)\n3 osh qoshiq shakar\n1 osh qoshiq kraxmal\n1 osh qoshiq mevali djem/murabbo (xohishga ko'ra)",
    korsatmalari: [
      "Un, shakar va tuzga sovuq saryog'ni qo'shib, barmoqlar bilan uvalab qarsildoq uvoq holiga keltiring. Muzday suvni quyib tezda xamir to'plang va 30 daqiqa muzlatgichda tindiring.",
      "Mevalarni parrak qilib to'g'rang, shakar va kraxmal bilan aralashtiring.",
      "Tindirilgan xamirni pergament qog'oz ustida doira shaklida (3-4 mm qalinlikda) yoying.",
      "Xamir o'rtasiga djem surting, chetlaridan 4-5 cm joy qoldirib mevalarni tizib chiqing.",
      "Xamirning ochiq chetlarini mevalar ustiga bukib taxlang. Buklangan chetlariga shakar seping.",
      "190°C pechda 35–40 daqiqa mevalar yumshab, xamiri tillarang bo'lguncha pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_saryog', 'ing_shakar', 'ing_shaftoli', 'ing_orik', 'ing_kraxmal']
  },
  {
    id: 'rec_hd_058_red_date_cake',
    nomi: "Xitoy Xurmoli (Unab) Pirog (Win Son Bakery's Red Date Cake)",
    tayyorlash_vaqti_daq: 55,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '/assets/images/shirinlik_baqlava_1785171638612.png',
    tarif_matni: "Quritilgan qizil xurmo (unab) pyuresi va karamelli qaymoqli glazur bilan pishiriladigan xushbo'y keks.",
    masalliqlar_matni: "Xamir uchun:\n170 g quritilgan qizil xurmo (unab — red dates, urug'siz va to'g'ralgan)\nYarim choy qoshiq soda\n155 g un\n2 choy qoshiq qabartma kukun\n1 choy qoshiq tuz\n150 g shakar\n85 g yumshoq saryog'\n2 dona tuxum\nYarim choy qoshiq vanil ekstrakti\nGlazur uchun:\n4 dona qizil xurmo (tasmalarga bo'lingan)\n60 ml qaymoq\n60 g saryog'\n50 g jigarrang shakar\nYarim choy qoshiq tuz",
    korsatmalari: [
      "Pechni 175°C ga qizdiring. Qolipni saryog'lang. Idishda 170 g xurmo, soda va 180 ml suvni qaynatib, past olovda 3 daqiqa dimlang. Suvi tortilgach sovuting.",
      "Un, qabartma kukun va tuzni elang. Alohida idishda saryog', shakar va vanilni mikserda 3 daqiqa ko'pirtiring. Tuxumlarni bittalab qo'shing.",
      "Quruq masalliqlarning yarmini, so'ng sovigan xurmo pyuresini, keyin qolgan unni qo'shib past tezlikda aralashtiring. Qolipga quyib, 175°C pechda 25–30 daqiqa pishiring.",
      "Glazur: Idishda qaymoq, saryog', jigarrang shakar va tuzni eritib, 5 daqiqa quyulguncha qaynating. Sovigan xurmo tasmalari bilan pirog ustini bezang va iliq glazurni ustidan quyib chiqing."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_xurmo', 'ing_un', 'ing_shakar', 'ing_saryog', 'ing_tuxum', 'ing_qaymoq']
  },
  {
    id: 'rec_hd_059_kong_jaban',
    nomi: 'Koreyscha Shiringina Qora Lobiya (Kong Jaban / Korean Sweet Black Beans)',
    tayyorlash_vaqti_daq: 75,
    qiyinlik: 'oson',
    kategoriya: 'Koreys & Dunyo Oshxonasi',
    rasm_url: '🫘',
    tarif_matni: "Soya sousi, shakar va kunchut yog'ida uzoq dimlab pishiriladigan Koreyscha mashhur shirin-tuzli qora lobiya garniri.",
    masalliqlar_matni: "250 g quritilgan qora lobiya (loviya)\n2 litr dashi bulyoni yoki suv\n240 ml soya sousi\n150 g shakar\n2 osh qoshiq qovurilgan kunchut yog'i\n1 osh qoshiq qovurilgan kunchut urug'lari",
    korsatmalari: [
      "Lobiyani sovuq suvda kamida 8–12 soat ivitib oling va suvsizlantiring.",
      "Qozonga lobiyani solib, dashi bulyoni (yoki suv) va soya sousini quying. O'rta-yuqori olovda qaynatib oling, so'ng past olovda 1 soat davomida sekin dimlang.",
      "Lobiya yumshab, suyuqligi kamaygach, shakar, kunchut yog'i va kunchut urug'larini qo'shib yaxshilab aralashtiring. (Shakarni boshida solmang, aks holda lobiya qattiq bo'lib qoladi).",
      "Suyuqligi quyuq va yaltiroq holatga kelguncha yana 5-10 daqiqa pishiring. Sovutib, muzlatgichga qo'ying va garnir sifatida torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_lobiya', 'ing_soya_sousi', 'ing_shakar', 'ing_kunchut_yogi', 'ing_kunchut']
  },
  {
    id: 'rec_hd_060_lagrimas_de_la_virgen',
    nomi: 'Lavlagi va Mevali Salqin Ichimlik (Lágrimas de la Virgen / Beet Cooler With Fruits)',
    tayyorlash_vaqti_daq: 20,
    qiyinlik: 'oson',
    kategoriya: 'Ichimliklar & Kokteyllar',
    rasm_url: '🍹',
    tarif_matni: "Qizil lavlagi toza sharbati, olma, banan, apelsin va limon sharbati solingan vitaminlarga boy tetiklashtiruvchi salqin drink.",
    masalliqlar_matni: "4 dona qizil lavlagi\n2 litr suv\n200 g shakar\n1 dona kichik olma (kubik to'g'ralgan)\n1 dona banan (kubik to'g'ralgan)\n1 dona apelsin (tozalangan, to'g'ralgan)\n4 yaproq romen salat bargi (ingichka tasmasimon to'g'ralgan)\n1 dona limon sharbati",
    korsatmalari: [
      "Lavlagini tozalab, sharbat chiqargich orqali toza sharbatini chiqarib oling.",
      "Katta ko'zachada suv va shakarni shakar to'liq eriguncha aralashtiring. Ustidan lavlagi sharbatini quying.",
      "Ko'zachani muzlatgichda to'liq sovuting.",
      "Dasturxonga tortish oldidan to'g'ralgan olma, banan, apelsin, salat barglari hamda limon sharbatini qo'shib aralashtiring (limon mevalar qarayib ketishining oldini oladi). Muz kubiklari bilan uzating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_lavlagi', 'ing_shakar', 'ing_olma', 'ing_banan', 'ing_apelsin', 'ing_limon']
  },
  {
    id: 'rec_hd_061_guava_grapefruit_agua_fresca',
    nomi: 'Gvayava, Greypfrut va Rozmarinli Agua Freska (Guava, Grapefruit, and Rosemary Agua Fresca)',
    tayyorlash_vaqti_daq: 15,
    qiyinlik: 'oson',
    kategoriya: 'Ichimliklar & Kokteyllar',
    rasm_url: '🍹',
    tarif_matni: "Yangi greypfrut sharbati, gvayava pyuresi va rozmarin barglari bilan tayyorlanadigan tropik agua freska.",
    masalliqlar_matni: "700 ml suv\n3 dona greypfrut sharbati (yangi siqilgan)\n430 g gvayava pyuresi (guava puree)\n1 shoxcha yangi rozmarin barglari\n100 g shakar (ta'bga ko'ra)\nMuz kubiklari",
    korsatmalari: [
      "Blender idishida suv, greypfrut sharbati, gvayava pyuresi va rozmarin barglarini solib to'liq silliq bo'lguncha ko'pirtiring.",
      "Hosil bo'lgan aralashmani mayda elakdan ko'zachaga o'tkazib elang.",
      "Shakarni ta'bga ko'ra qo'shib, eriguncha aralashtiring.",
      "Stakanlarga muz to'ldirib, ustidan ichimlikni quying va rozmarin shoxchasi bilan bezating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_greypfrut', 'ing_gvayava', 'ing_rozmarin', 'ing_shakar']
  },
  {
    id: 'rec_hd_062_aguas_frescas',
    nomi: 'Meksikancha Mevali Salqin Ichimlik (Aguas Frescas / Mexican Fruit Coolers)',
    tayyorlash_vaqti_daq: 15,
    qiyinlik: 'oson',
    kategoriya: 'Ichimliklar & Kokteyllar',
    rasm_url: '🍹',
    tarif_matni: "Tarvuz, ananas, qovun, papaya, qulupnay yoki mango mevalari mag'zidan pishiriladigan meksikancha tetiklantiruvchi ichimlik.",
    masalliqlar_matni: "600 g to'g'ralgan mevalar (tarvuz, qovun, ananas, papaya, qulupnay yoki mango)\n1 litr suv\n100 g shakar\nMuz kubiklari\nLimon bo'laklari",
    korsatmalari: [
      "Katta ko'zachada shakar va suvni aralashtirib shakarni eriting. Ushbu aralashmadan 240 ml ajratib oling.",
      "Blenderga to'g'ralgan mevalar va ajratib olingan shakarli suvni solib silliq pyure bo'lguncha ko'pirtiring.",
      "Mevali pyureni ko'zachadagi shakarli suvga elak orqali o'tkazing, yog'och qoshiq bilan meva mag'zini ezib suvini ajrating.",
      "Yaxshilab aralashtirib, muz va limon bo'laklari bilan sovuq holda torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_tarvuz', 'ing_ananas', 'ing_qulupnay', 'ing_shakar', 'ing_limon']
  },
  {
    id: 'rec_hd_063_scallion_pancakes',
    nomi: 'Yashil Piyozli Qarsildoq Pirojkalar va Chili-Zanjabilli Sous (Scallion Pancakes With Chili-Ginger Dipping Sauce)',
    tayyorlash_vaqti_daq: 30,
    qiyinlik: 'orta',
    kategoriya: 'Salatlar & Gazaklar',
    rasm_url: '🍰',
    tarif_matni: "Muzday gazlangan suvda tayyorlangan xamir va yashil piyozli qarsildoq mini-pirojkalar hamda chili-zanjabilli sous.",
    masalliqlar_matni: "Sous uchun:\n1 bo'lak zanjabil (ingichka to'g'ralgan)\n2 osh qoshiq soya sousi, 2 osh qoshiq guruch sirkasi, 1 choy qoshiq chili yog'i, 1 choy qoshiq shakar\nXamir va ichlik uchun:\n125 g un, 30 g kraxmal, 1 choy qoshiq tuz, 1 choy qoshiq shakar\n240 ml muzday gazlangan suv (club soda), 2 choy qoshiq soya sousi, 1 choy qoshiq kunchut yog'i\n150 g ingichka to'g'ralgan yashil piyoz, 4 osh qoshiq o'simlik yog'i",
    korsatmalari: [
      "Sous: Idishda zanjabil, soya sousi, sirka, chili yog'i va shakarni shakar eriguncha ko'pirtiring va chetga suring.",
      "Xamir: Katta idishda un, kraxmal, tuz va shakarni aralashtiring. Alohida idishda gazlangan suv, soya sousi va kunchut yog'ini birlashtiring. Quyib, silliq bo'lguncha aralashtiring (ko'p aralashtirmang). Yashil piyozni xamirga qo'shib aralashtiring.",
      "Qovurish: Tovada 1 osh qoshiq o'simlik yog'ini qizdiring. Xamirning to'rtdan bir qismini quyib, past-o'rta olovda 2 daqiqa tillarang bo'lguncha pishiring. Agdarib, yassilab presslang va yana 1-2 daqiqa qarsildoq bo'lguncha pishiring.",
      "Qolgan xamir va yog' bilan yana 3 dona quymoq pishiring. Bo'laklarga bo'lib, zanjabilli sous bilan uzating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_kraxmal', 'ing_kok_piyoz', 'ing_zanjabil', 'ing_soya_sousi']
  },
  {
    id: 'rec_hd_064_camouflage_fudge_brownies',
    nomi: '"Kamuflyaj" Shokoladli va Chizkeykli Brauni (Camouflage Chocolate Fudge Brownies)',
    tayyorlash_vaqti_daq: 50,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍰',
    tarif_matni: "To'q shokoladli quyuq brauni va oq hamda kakao-pishloqli cream cheese qatlamlarining kamuflyaj naqshli pirogi.",
    masalliqlar_matni: "Tvorogli (Cream Cheese) qatlam:\n225 g cream cheese, 1 dona tuxum, 65 g shakar, yarim choy qoshiq vanil, yarim choy qoshiq tuz, 1.5 choy qoshiq kakao kukuni\nShokoladli Brauni qatlam:\n150 g saryog', 200 g shakar, 80 g kakao kukuni, yarim choy qoshiq tuz, 1 choy qoshiq espresso kukuni\n2 dona tuxum, yarim choy qoshiq vanil, 65 g un",
    korsatmalari: [
      "Pechni 165°C ga qizdiring. 20x20 cm qolipga pergament qog'oz soling.",
      "Cream cheese-ni issiqlikka chidamli idishda bug' hammomida 5 daqiqa yumshating. Olovdan olib silliq bo'lguncha ezib, 1 dona tuxum, 65 g shakar, yarim choy qoshiq vanil va yarim choy qoshiq tuzni ko'pirtiring. Yarmini ajratib, 1.5 choy qoshiq kakao qo'shing.",
      "Idishda saryog', espresso kukuni, 200 g shakar, 80 g kakao va yarim choy qoshiq tuzni bug' hammomida saryog' eriguncha eritib, 5 daqiqa sovuting. 2 dona tuxum va vanilni qo'shib ko'pirtiring. Unni solib yaxshilab aralashtiring.",
      "Brauni xamirining ko'p qismini qolipga tekis yoying. Ustiga oq va shokoladli tvorog massasini va qolgan brauni xamirini navbatma-navbat dog' sifat (\"kamuflyaj\") qilib tomizing.",
      "165°C pechda 22–25 daqiqa pishiring. Sovugach bo'laklarga bo'ling."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_cream_cheese', 'ing_tuxum', 'ing_shakar', 'ing_kakao', 'ing_saryog', 'ing_un']
  },
  {
    id: 'rec_hd_065_sour_cream_onion_biscuits',
    nomi: 'Smetana va Piyozli Yumshoq Biskvitlar (Sour Cream and Onion Biscuits)',
    tayyorlash_vaqti_daq: 40,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Xamirlar',
    rasm_url: '🍰',
    tarif_matni: "Kat-kat saryog'li xamir, smetana va yashil piyoz aromati bilan pechda tillarang pishiriladigan biskvit-bulochkalar.",
    masalliqlar_matni: "310 g un\n2 choy qoshiq qabartma kukun (baking powder)\nYarim choy qoshiq soda\n1.5 choy qoshiq tuz, 1 choy qoshiq qora murch\n1 choy qoshiq shakar\n150 g sovuq saryog' (kubik bo'lingan) + 30 g eritilgan saryog'\n80 g ingichka to'g'ralgan yashil piyoz\n300 g smetana\nYirik dengiz tuzi (flaky sea salt)",
    korsatmalari: [
      "Pechni 215°C gacha qizdiring. Idishda un, qabartma kukun, soda, tuz, murch va shakarni elang. Sovuq saryog'ni qo'shib, barmoqlar bilan uvalab noxotdek uvoqlar hosil qiling. Yashil piyozni qo'shing.",
      "O'rtasini ochib smetanani quying, sanchqi bilan xamir holiga keltiring. Stolda xamirni 20x10 cm to'rtburchak qilib yoying.",
      "Xamirni konvertga o'xshab uchga taxlang. Yana yoyib, yana uchga taxlang (bu kat-kat bo'lishini ta'minlaydi). 8 ta kvadrat bo'lakka bo'ling.",
      "Listga tizib, ustiga eritilgan saryog' surting va yirik tuz seping. 215°C pechda 18–22 daqiqa tillarang bo'lguncha pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_saryog', 'ing_kok_piyoz', 'ing_smetana', 'ing_tuz']
  },
  {
    id: 'rec_hd_066_salty_buckwheat_chocolate_cookies',
    nomi: 'Grechka Unli va Shokoladli Tuzli Pechenye (Salty Buckwheat Chocolate Chunk Cookies)',
    tayyorlash_vaqti_daq: 35,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍪',
    tarif_matni: "Grechka uni, jigarrang shakar va yirik shokolad bo'laklari solinib pishiriladigan og'izda eriydigan tuzli pechenye.",
    masalliqlar_matni: "125 g un\n65 g grechka uni (buckwheat flour)\nYarim choy qoshiq qabartma kukun, yarim choy qoshiq soda\n1 choy qoshiq tuz\n115 g saryog'\n130 g jigarrang shakar, 100 g shakar\n1 dona tuxum + 2 dona tuxum sarig'i, 1 choy qoshiq vanil\n170 g achchiq shokolad bo'laklari (chopped chocolate)",
    korsatmalari: [
      "Saryog'ni past olovda eritib oling. Ikki xil un, qabartma kukun, soda va tuzni elang.",
      "Eritilgan saryog' va ikkala shakarni mikserda 30 soniya ko'pirtiring. Tuxum va tuxum sariqlarini bittalab qo'shing, vanilni solib krem holatiga keltiring.",
      "Quruq masalliqlarni va shokolad bo'laklarini qo'shib yumshoq xamir qoring. Idishni yopib, 2 soat muzlatgichda sovuting.",
      "Pechni 190°C ga qizdiring. Xamirdan 2 osh qoshiqlik shariklar yasab, listga 5 cm masofada tizib chiqing.",
      "190°C pechda 8–10 daqiqa chetlari tillarang bo'lguncha pishiring. Pechdan olgach, listni stolga sekin urib yassilang va ustiga yirik tuz seping."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_grechka', 'ing_saryog', 'ing_shakar', 'ing_tuxum', 'ing_shokolad']
  },
  {
    id: 'rec_hd_067_mochi_cake',
    nomi: 'Kokosli va Guruch Unli Mochi Pirogi (Mochi Cake, Any Way You Want It)',
    tayyorlash_vaqti_daq: 70,
    qiyinlik: 'oson',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍚',
    tarif_matni: "Yapishqoq guruch uni (mochiko), kokos suti va saryog'dan pishiriladigan qarsildoq ustli va elastik ichli Osiyo pirogi.",
    masalliqlar_matni: "250 g yapishqoq guruch uni (glutinous sweet rice flour / mochiko)\n300 g shakar\n400 ml kokos suti (yoki qaymoq)\n90 g eritilgan saryog' (yoki kokos yog'i)\n2 dona tuxum\n2 choy qoshiq vanil\n1 choy qoshiq tuz, 1 choy qoshiq qabartma kukun\n30 g kokos qiyg'ichi yoki kunchut (ustiga)",
    korsatmalari: [
      "Pechni 175°C gacha qizdiring. Qolipni saryog'lab, shakar sepib tayyorlang.",
      "Idishda shakar, eritilgan saryog' va kokos sutini mikserda aralashtiring. Tuxum, vanil va tuzni qo'shing.",
      "Guruch uni va qabartma kukunni qo'shib silliq xamir bo'lguncha ko'pirtiring.",
      "Xamirni qolipga quyib, ustiga kokos qiyg'ichi yoki kunchut seping.",
      "175°C pechda 55–65 daqiqa usti qarsildoq va tillarang bo'lguncha pishiring. To'liq sovutib kosing."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_guruch_uni', 'ing_shakar', 'ing_kokos_suti', 'ing_saryog', 'ing_tuxum']
  },
  {
    id: 'rec_hd_068_orange_chocolate_loaf_cake',
    nomi: 'Apelsinli va Shokoladli Keks (Orange Chocolate Loaf Cake From Florida)',
    tayyorlash_vaqti_daq: 75,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍰',
    tarif_matni: "Kakao, qaymoq va apelsin rendasi xamiri hamda pishgach surtiladigan xushbo'y apelsinli shirin qiyom biskviti.",
    masalliqlar_matni: "Xamir uchun:\n150 g un, 50 g kakao kukuni, 2 choy qoshiq qabartma kukun, yarim choy qoshiq tuz\n200 g shakar, 240 ml suyuq qaymoq (heavy cream), 2 dona tuxum, 1 choy qoshiq vanil\n1 dona apelsin po'stining qirilgan rendasi\nApelsin qiyomi uchun:\n80 ml apelsin sharbati, 3 osh qoshiq shakar",
    korsatmalari: [
      "Pechni 175°C ga qizdiring. Loaf (keks) qolipini yog'lab, non uvoqlari seping. Un, kakao, qabartma kukun, tuz va shakarni birga elang.",
      "Qaymoq va vanilni mikserda biroz ko'pirtiring. Tuxumlarni bittalab qo'shib ko'pirtirishda davom eting.",
      "Elangan quruq masalliqlarni past tezlikda qo'shing va apelsin rendasini solib aralashtiring.",
      "Xamirni qolipga quyib, 175°C pechda 1 soat 5 daqiqa pishiring.",
      "Qiyom: Apelsin sharbati va shakarni aralashtirib qo'ying. Keks pishgach, issiq holda ustiga va yon atroflariga apelsinli qiyomni cho'tka bilan surtib chiqib sovuting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_kakao', 'ing_shakar', 'ing_qaymoq', 'ing_tuxum', 'ing_apelsin']
  },
  {
    id: 'rec_hd_069_whipped_cream_cake',
    nomi: 'Qaymoqli Mayin Keks (Whipped Cream Cake)',
    tayyorlash_vaqti_daq: 45,
    qiyinlik: 'oson',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍰',
    tarif_matni: "Ko'pirtirilgan sovuq qaymoq, tuxum va elangan un aralashmasidan tayyorlanadigan g'ovakli va momiq keks.",
    masalliqlar_matni: "280 g maxsus tort uni (cake flour) yoki elangan oddiy un\n2 choy qoshiq qabartma kukun (baking powder)\nYarim choy qoshiq tuz\n360 ml sovuq suyuq qaymoq (heavy cream)\n3 dona tuxum (xonaki haroratda)\n225 g shakar\n1 choy qoshiq vanil ekstrakti",
    korsatmalari: [
      "Pechni 175°C gacha qizdiring. Teshikli keks qolipini (tube pan) yog'lang va un sepib tayyorlang.",
      "Idishda un, qabartma kukun va tuzni elab aralashtiring.",
      "Suyuq qaymoqni mikserda quyuq va qattiq piklar hosil bo'lguncha yaxshilab ko'pirtiring.",
      "Alohida idishda tuxum va vanilni sanchqi bilan ko'pirtirib, ko'pirtirilgan qaymoqqa oz-ozdan qo'shing. Shakarni sekin-asta solib 30 soniya ko'pirtiring.",
      "Elangan unli aralashmani ikki bo'lakka bo'lib solib, lapatka bilan pastdan yuqoriga ehtiyotkorlik bilan buklab aralashtiring (qaymoq cho'kib qolmasin).",
      "Qolipga quyib, 175°C pechda 25–35 daqiqa pishiring. 10 daqiqa sovutib, agdarib oling va shakar kukuni bilan bezating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_qaymoq', 'ing_tuxum', 'ing_shakar']
  }

  ,
  {
    id: 'rec_hd_070_sourdough_key_lime_ricotta_cookies',
    nomi: 'Hamirturushli Laymli va Rikottali Pechenye (Sourdough Key Lime Ricotta Cookies)',
    tayyorlash_vaqti_daq: 45,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍪',
    tarif_matni: "O'ziga xos nordon-shirin laym va rikotta pishlog'i hamda achigan hamirturushli og'izda eriydigan pechenye.",
    masalliqlar_matni: "113 g saryog' (yumshatilgan)\n200 g shakar\n1 dona tuxum\n120 g achigan hamirturush (sourdough starter)\n125 g rikotta pishlog'i\n1 dona laym po'stining qirilgan rendasi\n1 choy qoshiq vanil ekstrakti\n360 g un\n15 g (1 osh qoshiq) qabartma kukun (Razrixlitel)\nYarim choy qoshiq dengiz tuzi\nGlazur va bezak uchun:\n90 g shakar kukuni (elangan)\n1-2 dona laym sharbati va rendasi",
    korsatmalari: [
      "Pechni 180°C gacha qizdiring. Ikki dona pishirish varag'iga pergament qog'oz solib tayyorlang.",
      "Idishda yumshoq saryog' va shakarni mikserda 3–4 daqiqa davomida mayin bo'lguncha ko'pirtiring. Tuxumni solib aralashtiring.",
      "Hamirturush, rikotta pishlog'i, laym rendasi va vanilni qo'shib mikserda aralashtiring (aralashma biroz donador bo'lishi normal holat).",
      "Alohida idishda un, qabartma kukun (Razrixlitel) va tuzni elang. Quruq masalliqlarni past tezlikda asta-sekin qo'shib xamir qoring. Idishni plyonka bilan yopib, 30 daqiqa muzlatgichda tindiring.",
      "Xamirdan osh qoshiq yordamida bo me'yorda sharikchalar ajratib listga tizib chiqing.",
      "180°C pechda 15–17 daqiqa pishiring. Pishgach sim panjarada to'liq sovuting.",
      "Glazur: Shakar kukuniga laym sharbatini oz-ozdan quyib, silliq va oquvchan massa bo'lguncha ko'pirtiring.",
      "Sovigan pechenyelar ustiga glazur quyib, qirilgan laym rendasi bilan bezating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_saryog', 'ing_shakar', 'ing_tuxum', 'ing_rikotta', 'ing_un', 'ing_limon']
  },
  {
    id: 'rec_hd_071_cinnamon_sugar_sourdough_waffles',
    nomi: 'Dolchin va Shakarli Hamirturushli Vafli (Cinnamon Sugar Sourdough Waffles)',
    tayyorlash_vaqti_daq: 30,
    qiyinlik: 'oson',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🧇',
    tarif_matni: "Qarsildoq vaflilar, dolchinli shakar va yangi mevalar va klyon siropi bilan uzatiladigan noshtabop shirinlik.",
    masalliqlar_matni: "Dolchinli shakar uchun:\n50 g shakar\n1 choy qoshiq dolchin kukuni\nXamir uchun:\n120 g achigan hamirturush (sourdough starter)\n240 ml sut\n42 g eritilgan saryog' (bo'lingan)\n1 dona tuxum\n120 g un\n12 g shakar\n10 g (2 choy qoshiq) qabartma kukun (Razrixlitel)\nYarim choy qoshiq dengiz tuzi\nTortish uchun:\n165 g kubik to'g'ralgan ananas\nBir siqim yangi mevalar (qulupnay, chernika)\n30 g kokos qiyg'ichi\nKlyon siropi (yoki asal)",
    korsatmalari: [
      "Chuqur idishda 50 g shakar va dolchinni aralashtirib qo'ying.",
      "Vafli pishirgichni yoqib qizdiring. Katta idishda achigan hamirturush, sut, 28 g eritilgan saryog' va tuxumni yaxshilab ko'pirtiring. Un, 12 g shakar, qabartma kukun (Razrixlitel) va tuzni qo'shib silliq bo'lguncha aralashtiring.",
      "Vafli qolipini yog'lang. Xamirdan quyib, tillarang va qarsildoq bo'lguncha 3–5 daqiqa pishiring.",
      "Pishgan vaflilarga qolgan eritilgan saryog'dan surting va dolchinli shakar aralashmasiga ikkala tarafini botirib oling.",
      "Tayyor vaflilarni ananas, mevalar hamda kokos qiyg'ichi bilan bezatib, klyon siropi bilan dasturxonga torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_shakar', 'ing_sut', 'ing_saryog', 'ing_tuxum', 'ing_un', 'ing_ananas', 'ing_qulupnay', 'ing_chernika']
  },
  {
    id: 'rec_hd_072_blueberry_lemon_corn_muffins',
    nomi: "Chernikali va Limonli Makkajo'xori Mafinlari (Blueberry Lemon Corn Muffins)",
    tayyorlash_vaqti_daq: 35,
    qiyinlik: 'oson',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🧁',
    tarif_matni: "Makkajo'xori uni, chernika rezavorlari va limon aromati bilan tayyorlanadigan mitti va yumshoq mafinlar.",
    masalliqlar_matni: "60 g saryog' (eritilgan va sovutilgan)\n95 g un\n1.5 choy qoshiq qabartma kukun (Razrixlitel)\n80 g makkajo'xori uni (cornmeal)\n110 g shakar\n1 osh qoshiq limon rendasi\n120 ml sut\n2 dona tuxum sarig'i\n75 g chernika (teng ikkiga bo'lingan)",
    korsatmalari: [
      "Pechni 190°C gacha qizdiring. 6 dona mafin qolipiga qog'oz korzinkachalar joylashtiring.",
      "Idishda un va qabartma kukun (Razrixlitel)ni elang. Makkajo'xori uni, 100 g shakar, limon rendasi va bir chimdim tuzni solib aralashtiring.",
      "Alohida idishda eritilgan saryog', sut va tuxum sariqlarini ko'pirtiring. Quruq masalliqlar va chernikaning yarmi bilan birga ohista aralashtiring.",
      "Xamirni qoliplarga teng bo'lib quying. Qolgan chernikalarni mafinlar ustiga botirib tizib chiqing va 10 g shakar seping.",
      "190°C pechda 15 daqiqa tillarang bo'lguncha pishiring. Sim panjarada sovutib uzating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_saryog', 'ing_un', 'ing_makkajuxori', 'ing_shakar', 'ing_limon', 'ing_sut', 'ing_tuxum', 'ing_chernika']
  },
  {
    id: 'rec_hd_073_swirl_spice_cake',
    nomi: 'Ziravorli Mermer Keks (Swirl Spice Cake)',
    tayyorlash_vaqti_daq: 90,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🥮',
    tarif_matni: "Pekan yong'og'i shtreyzeli, smetana xamiri hamda apelsinli shirin glazur bilan pishiriladigan mermer keks.",
    masalliqlar_matni: "Shtreyzel (uvoq) uchun:\n100 g maydalangan pekan yong'og'i\n45 g qahva va ziravorlar aralashmasi (Spice Mix)\n75 g jigarrang shakar\n24 g un\n1 choy qoshiq tuz\n60 g eritilgan saryog'\nXamir va glazur uchun:\n250 g un\nYarim choy qoshiq qabartma kukun (Razrixlitel)\nChorak choy qoshiq soda\nYarim choy qoshiq tuz\n250 g shakar\n170 g saryog' (xonaki haroratda)\n3 dona tuxum\n120 g smetana\n2 choy qoshiq vanil ekstrakti\n28 g shakar kukuni + 1 choy qoshiq apelsin sharbati",
    korsatmalari: [
      "Pechni 165°C gacha qizdiring. Keks qolipini yog'lab, pergament soling.",
      "Uvoq: Yong'oq, ziravorlar aralashmasi, jigarrang shakar, un va tuzni aralashtirib, saryog' quyib uvoq holiga keltiring.",
      "Idishda un, qabartma kukun (Razrixlitel), soda va tuzni elang. Mikserda saryog' va shakarni 6–8 daqiqa mayin ko'pirtiring. Tuxumlarni bittalab qo'shing. Unli aralashmaning yarmini, so'ng smetana va vanilni, keyin qolgan unni solib aralashtiring.",
      "Xamirning yarmini qolipga quyib, ustiga uvoq aralashmasini yoying. Qolgan xamirni quyib, pichoq bilan mermer naqsh hosil qilib aralashtiring.",
      "165°C pechda 80–90 daqiqa pishiring. Sovugach qolipdan oling.",
      "Shakar kukuni va apelsin sharbatini ko'pirtirib glazur tayyorlang va keks ustidan quying."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_shakar', 'ing_saryog', 'ing_tuxum', 'ing_smetana', 'ing_apelsin']
  },
  {
    id: 'rec_hd_074_coffee_spice_mix',
    nomi: 'Qahvali va Ziravorli Aralashma (Savory-to-Sweet Coffee Spice Mix)',
    tayyorlash_vaqti_daq: 5,
    qiyinlik: 'oson',
    kategoriya: 'Garnirlar & Yengil Taomlar',
    rasm_url: '☕',
    tarif_matni: "Qahva, apelsin rendasi, dolchin va hil urug'laridan tayyorlanadigan shirinliklar uchun xushbo'y ziravor.",
    masalliqlar_matni: "3 osh qoshiq asalari gulchangi kukuni (bee pollen)\n3 osh qoshiq mayda tortilgan qahva (instant emas)\n2 osh qoshiq quritilgan apelsin po'stlog'i rendasi\n2 osh qoshiq dolchin kukuni\n2 choy qoshiq kardamon (hil) kukuni\n2 choy qoshiq maydalangan fenxel urug'lari",
    korsatmalari: [
      "Barcha ziravor masalliqlarini toza va quruq shisha bankaga soling.",
      "Qopqog'ini mahkam yopib, bir xil massa bo'lguncha yaxshilab silkiting.",
      "Pishiriqlar, kekslar va shirinliklarga xushbo'y ta'm berish uchun foydalaning. (Xona haroratida 1 oy saqlash mumkin)."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_apelsin']
  },
  {
    id: 'rec_hd_075_cabbage_potato_pie',
    nomi: 'Karam va Kartoshkali Pirog (Cabbage Potato Pie)',
    tayyorlash_vaqti_daq: 70,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Tuzli Piroglar',
    rasm_url: '🥬',
    tarif_matni: "Kartoshka pyuresi, qovurilgan karam, dudlangan bekon va cheddar pishlog'i solib pechda pishiriladigan tuzli pirog.",
    masalliqlar_matni: "900 g kartoshka (tozalanib, bo'lingan)\n1 choy qoshiq tuz\n60 g saryog' (bo'lingan)\n1 dona savoy karami (Savoy cabbage)\n85 g dudlangan bekon bo'laklari (mayda to'g'ralgan)\nYarim dona qizil piyoz (ingichka to'g'ralgan)\n2 osh qoshiq olma sirkasi\n1 choy qoshiq timyan barglari, 1 choy qoshiq qora murch\n2 dona tuxum\n180 ml qaymoq (heavy cream)\n140 g qirilgan cheddar pishlog'i",
    korsatmalari: [
      "Pechni 200°C ga qizdiring. Kartoshkani tuzli suvda 20 daqiqa qaynatib oling va suvidan ajratib 30 g saryog' bilan ezib pyure qiling.",
      "Karamning 10 dona butun bargini ajratib, tuzli suvda 8 daqiqa qaynatib oling va sovuq suvda sovutib qurutib oling. Qolgan karamni ingichka to'g'rang.",
      "Tovada bekon, to'g'ralgan karam va piyozni 20 daqiqa qizartirib qovuring. Sirka, timyan, murch va tuz qo'shing.",
      "Kartoshka pyuresiga tuxum, qaymoq, qovurilgan karamli aralashma va pishloqni qo'shib yaxshilab aralashtiring.",
      "Qolip tubi va yonlariga qaynagan karam barglarini yoying. Kartoshkali massani solib tekislang va barglarning chetini ustiga yoping. Ustiga qolgan saryog'ni bo'lib soling.",
      "200°C pechda 30–35 daqiqa tillarang bo'lguncha pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_kartoshka', 'ing_saryog', 'ing_karram', 'ing_piyoz', 'ing_tuxum', 'ing_qaymoq', 'ing_pishloq']
  },
  {
    id: 'rec_hd_076_salmon_with_dates',
    nomi: 'Xurmoli Achchiq-Shirin Somon Baliq (Spicy Sweet-and-Sour Salmon With Dates / Qaliyeh-e Khorma)',
    tayyorlash_vaqti_daq: 40,
    qiyinlik: 'orta',
    kategoriya: 'Quyuq Taomlar',
    rasm_url: '🐟',
    tarif_matni: "Qizil somon balig'i filetosi, xurmo qiyomi va achchiq sous hamda bodringli yangi salat aralashmasi.",
    masalliqlar_matni: "Bodring va piyozli salat uchun:\n4 osh qoshiq kashnich urug'lari (qovurilgan)\n1 dona qizil piyoz, 12 dona kichik bodring (kubik to'g'ralgan)\n4 osh qoshiq olma sirkasi, 1.5 choy qoshiq tuz\nBaliq va sous uchun:\n4–6 bo'lak somon balig'i (losos) filetosi\n1 osh qoshiq un, 1 choy qoshiq kurkuma, yarim choy qoshiq murch, tuz\n60 ml zaytun yog'i\n5 tish sarimsoq (qirilgan)\n240 ml olma sirkasi, 2 osh qoshiq xurmo qiyomi (date molasses)\n1 choy qoshiq achchiq qizil murch, 1 osh qoshiq quritilgan shambalila (fenugreek) barglari\n5 dona medjool xurmosi (urug'siz, ikkiga bo'lingan)\nYangi ko'katlar (kashnich, rayhon, yashil piyoz)",
    korsatmalari: [
      "Salat: Idishda piyoz, bodring, kashnich urug'lari, tuz va sirkani aralashtirib chetga suring.",
      "Un, kurkuma, murch va tuzni aralashtirib, baliq filetosining ikkala tomoniga surting.",
      "Tovada 2 osh qoshiq zaytun yog'ida baliqlarni har bir tomonini 1 daqiqadan qizartirib oling va idishga chiqaring.",
      "Shu tovaga qolgan yog' va sarimsoqni solib 1-2 daqiqa qovuring. Sirka, xurmo qiyomi, achchiq murch va shambalilani solib aralashtiring.",
      "Baliqlarni tovaga qaytarib, past olovda 10–15 daqiqa sous quyulguncha dimlang. Oxirida xurmo bo'laklarini qo'shing.",
      "Dasturxonga yangi ko'katlar va bodringli salat bilan birga torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_piyoz', 'ing_bodring', 'ing_un', 'ing_sarimsoq', 'ing_xurmo', 'ing_kokatlar']
  },
  {
    id: 'rec_hd_077_chocolate_almond_fudge',
    nomi: 'Shokolad va Bodomli Fadj (Chocolate-Almond Fridge Fudge)',
    tayyorlash_vaqti_daq: 15,
    qiyinlik: 'oson',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍫',
    tarif_matni: "Achchiq shokolad, avokado va bodom pastasi bilan muzlatgichda tayyorlanadigan tetik va shirin fadj deseri.",
    masalliqlar_matni: "30 g bodom parraklari (tostlangan)\n115 g achchiq shokolad (kamida 60% kakao)\nYarim dona pishgan avokado\n80 ml klyon siropi (yoki asal)\n80 g bodom pastasi (almond butter)\n1 osh qoshiq kakao kukuni\nYarim choy qoshiq tuz va yirik dengiz tuzi",
    korsatmalari: [
      "Qolipga pergament qog'oz soling. Bodom parraklarini tovada qovurib maydalang.",
      "Achchiq shokoladni mikrotulqinli pechda yoki bug' hammomida eritib sovuting.",
      "Blenderda avokado, klyon siropi va bodom patasini silliq bo'lguncha ko'pirtiring. Kakao kukuni, tuz va 2 osh qoshiq sovuq suv qo'shib aralashtiring.",
      "Eritilgan shokoladni qo'shib, bir xil konsistensiyaga kelguncha urib oling.",
      "Massani qolipga tekis yoyib, ustiga bodom parraklari va yirik dengiz tuzi seping.",
      "Muzlatgichda kamida 1 soat qotirib, so'ng bo'laklarga bo'ling."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_bodom', 'ing_shokolad', 'ing_avokado', 'ing_asal', 'ing_kakao']
  },
  {
    id: 'rec_hd_078_english_muffin_breakfast_sandwich',
    nomi: 'Inglizcha Mafinda Noshtabop Sendvich (Breakfast Sandwich on an English Muffin)',
    tayyorlash_vaqti_daq: 35,
    qiyinlik: 'oson',
    kategoriya: 'Salatlar & Gazaklar',
    rasm_url: '🥪',
    tarif_matni: "Qizartirib qovurilgan piyoz, cheddar pishlog'i va tuxum bilan inglizcha muffinda pishiriladigan mazali sendvich.",
    masalliqlar_matni: "1 dona qizil piyoz (halqa qilib to'g'ralgan)\n1 choy qoshiq soya sousi, yarim choy qoshiq sarimsoq kukuni\n30 ml zaytun yog'i\n30 g to'g'ralgan ko'katlar (rayhon, kashnich, ukrop)\n2 osh qoshiq achchiq sous (hot sauce)\n15 g saryog'\n4 dona tuxum\n2 dona inglizcha muffin (non)\n60 g cheddar pishlog'i (bo'laklangan)",
    korsatmalari: [
      "Pechni 175°C ga qizdiring. Piyoz, soya sousi, sarimsoq kukuni va 1 osh qoshiq yog'ni aralashtirib listda 25–35 daqiqa qizartirib pishiring.",
      "Idishda ko'katlar, achchiq sous va 1 osh qoshiq zaytun yog'ini aralashtiring.",
      "Tovada saryog'ni eritib, ko'pirtirilgan tuxumlarni 1-2 daqiqa yumshoq qilib pishirib oling.",
      "Muffin nonlarini tostlangan holda ikkiga bo'ling. Ichki qismiga bo'me'yorda ko'katli sous surting.",
      "Bottom nonlar ustiga tuxum, pishloq qo'yib, pechda pishloq eriguncha 5 daqiqa isiting. Ustiga qovurilgan piyoz qo'yib, ikkinchi non bilan yoping."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_piyoz', 'ing_soya_sousi', 'ing_sarimsoq', 'ing_kokatlar', 'ing_saryog', 'ing_tuxum', 'ing_pishloq']
  },
  {
    id: 'rec_hd_079_double_chocolate_rye_cookies',
    nomi: "Javdar Unli Qo'sh Shokoladli Pechenye (Double Chocolate Rye Cookies)",
    tayyorlash_vaqti_daq: 30,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍪',
    tarif_matni: "Eritilgan achchiq shokolad, javdar uni va yong'oq bo'laklari solinib pishiriladigan qo'sh shokoladli pechenye.",
    masalliqlar_matni: "90 g gretskiy yong'og'i (qovurilgan va to'g'ralgan)\n255 g achchiq shokolad (bittersweet chocolate)\n170 g shirin bo'lmagan shokolad (unsweetened chocolate)\n115 g saryog'\nYarim choy qoshiq vanil ekstrakti\n300 g shakar\n4 dona tuxum\n60 g javdar uni (rye flour)\nYarim choy qoshiq qabartma kukun (Razrixlitel)\nYarim choy qoshiq tuz",
    korsatmalari: [
      "140 g achchiq shokolad va 110 g shirin bo'lmagan shokoladni saryog' bilan bug' hammomida eritib sovuting. Vanilni qo'shing.",
      "Mikserda shakar va tuxumlarni 5 daqiqa davomida quyuq va och rang bo'lguncha ko'pirtiring. Eritilgan shokoladli saryog'ni qo'shib aralashtiring.",
      "Qolgan shokoladlarni yirik va mayda bo'laklarga bo'me'yorda to'g'rang.",
      "Javdar uni, qabartma kukun (Razrixlitel), tuz, yong'oq va shokolad bo'laklarini aralashtirib, tuxumli massaga spatula bilan buklab aralashtiring.",
      "Xamirni idishga solib, kamida 3–4 soat muzlatgichda sovuting.",
      "Pechni 175°C ga qizdiring. Xamirdan 2 osh qoshiqlik shariklar ajratib, listga 5 cm masofada tizib chiqing.",
      "175°C pechda 10–12 daqiqa chetlari tillarang bo'lguncha pishiring. Sim panjarada sovutib dasturxonga torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_shokolad', 'ing_saryog', 'ing_shakar', 'ing_tuxum', 'ing_un']
  },
  {
    id: 'rec_hd_081_sourdough_rye_brownies',
    nomi: 'Javdar Unli va Hamirturushli Brauni (Sourdough Rye Brownies)',
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍫',
    tarif_matni: "O'ziga xos achigan javdar hamirturushi, to'q achchiq shokolad va saryog'dan pishiriladigan quyuq brauni.",
    masalliqlar_matni: "1-bosqich (Hamirturush uchun):\n72 g javdar uni\n57 ml suv\n36 g javdar hamirturushi (sourdough starter)\n2-bosqich:\n194 g javdar uni\n3-bosqich (Brauni uchun):\n5 dona tuxum\n100 g shakar\n195 g saryog'\n475 g achchiq shokolad (kamida 66% kakao)\n77 g shakar\n265 g jigarrang shakar\n70 g kakao kukuni\n5 ml vanil ekstrakti\n3 g soda\n2 g tuz",
    korsatmalari: [
      "1-bosqich masalliqlarini idishda aralashtirib, ustini yopib iliq joyda 4–6 soatga tindiring.",
      "1-bosqichdagi hamirturushdan 125 g ajratib oling va 194 g javdar uni bilan aralashtirib, 1–2 soat iliq joyda qoldiring.",
      "Saryog' va shokoladni issiq suvli qozoncha ustiga idish qo'yib (suv tegmaydigan qilib) eritib oling va 30 daqiqa sovuting. Pechni 160°C ga qizdiring. 25x25 cm qolipga pergament qog'oz soling.",
      "Tayyor xamirga eritilgan shokolad, saryog', tuxum, ikkala shakar, kakao, vanil, soda va tuzni solib mikserda yaxshilab ko'pirtiring.",
      "Massani qolipga quyib, 160°C pechda 30–40 daqiqa pishiring (usti quruq, o'rtasi biroz yumshoq bo'lishi kerak). Sovutib, bo'laklarga bo'ling."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_tuxum', 'ing_shakar', 'ing_saryog', 'ing_shokolad', 'ing_kakao']
  },
  {
    id: 'rec_hd_082_lemon_meringue_pie',
    nomi: 'Limonli va Meringali Pirog (Lemon Meringue Pie)',
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍋',
    tarif_matni: "Qarsildoq korj, nordon-shirin limonli zavarnoy kurd va momiq meringa kremi bilan pishiriladigan klassik pirog.",
    masalliqlar_matni: "Korj uchun:\n1 dona tayyor pirog korji\nKrem (Kurd) uchun:\n200 g shakar\n5 osh qoshiq kraxmal\nYarim choy qoshiq tuz\n240 ml suv\n120 ml sut\n4 dona tuxum sarig'i\n15 g saryog'\n120 ml limon sharbati\n2 choy qoshiq limon rendasi\nMeringa (Krem) uchun:\n4 dona tuxum oqi\nYarim choy qoshiq limon kislotasi\n100 g shakar",
    korsatmalari: [
      "Pechni 200°C ga qizdiring. Korj xamirini qolipga yoyib, 10 daqiqa yopilgan holda, so'ng 12 daqiqa ochiq holda tillarang bo'lguncha pishirib sovuting. Pech haroratini 175°C ga tushiring.",
      "Qozonchada shakar, kraxmal va tuzni aralashtiring. Suv va sutni quyib ko'pirtiring. Tuxum sariqlarini qo'shib, o'rta olovda quyulguncha qaynatib oling.",
      "Olovdan olib saryog', limon sharbati va rendani solib aralashtiring.",
      "Meringa: Tuxum oqlarini limon kislotasi bilan mikserda ko'pirtiring. Shakarni oz-ozdan quyib, qattiq piklar hosil bo'lguncha davom eting.",
      "Issiq kremni korjga quying, ustiga meringa kremini tekis yoyib, sanchqi bilan cho'qqilar hosil qiling. 175°C pechda 15 daqiqa meringa tillarang bo'lguncha pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_shakar', 'ing_kraxmal', 'ing_sut', 'ing_tuxum', 'ing_saryog', 'ing_limon']
  },
  {
    id: 'rec_hd_083_chocolate_pudding_pie',
    nomi: 'Shokoladli Pudding Pirogi (Chocolate Pudding Pie)',
    tayyorlash_vaqti_daq: 45,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍮',
    tarif_matni: "Uvalanuvchan xamir korji, ipakdek shokoladli pudding va ko'pirtirilgan qaymoqli pirog.",
    masalliqlar_matni: "Korj uchun:\n155 g un\n45 g sovuq saryog'\n30 g o'simlik margarini (shortening)\nYarim choy qoshiq tuz\n3-4 osh qoshiq muzday suv\nPudding uchun:\n30 g kraxmal\n90 g shakar\n3 osh qoshiq kakao kukuni\nYarim choy qoshiq tuz\n700 ml sut\n115 g achchiq shokolad (maydalangan)\n1 choy qoshiq vanil\nUstiga:\n240 ml sovuq qaymoq\n2 osh qoshiq shakar",
    korsatmalari: [
      "Un, saryog', margarin va tuzni barmoqlar bilan ezib, kichik bo'lakchalar holiga keltiring. Muzday suv qo'shib xamirni to'plang va 1 soat muzlatgichda tindiring.",
      "Xamirni yoyib qolipga soling. 190°C pechda 35–40 daqiqa tillarang bo'lguncha pishirib sovuting.",
      "Qozonda kraxmal, 90 g shakar, kakao va tuzni aralashtiring. Sutni quyib, o'rta olovda 2 daqiqa qaynatib quyultiring. Olovdan olib shokolad va vanilni solib eriting.",
      "Puddingni sovigan korjga quyib, 2 soat muzlatgichda qotiring.",
      "Dasturxonga tortish oldidan qaymoq va 2 osh qoshiq shakarni ko'pirtirib, pirog ustini bezating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_saryog', 'ing_kraxmal', 'ing_shakar', 'ing_kakao', 'ing_sut', 'ing_shokolad', 'ing_qaymoq']
  },
  {
    id: 'rec_hd_084_blind_baked_pie_crust',
    nomi: 'Mukammal Pishirilgan Pirog Xamiri (Blind-Baked Pie Crust)',
    tayyorlash_vaqti_daq: 50,
    qiyinlik: 'oson',
    kategoriya: 'Pishiriqlar & Xamirlar',
    rasm_url: '🥧',
    tarif_matni: "Shirin va tuzli piroglarning barchasi uchun mos keladigan uvalanuvchan va qarsildoq korj xamiri.",
    masalliqlar_matni: "2 osh qoshiq shakar\n2 choy qoshiq tuz\n330 g un\n340 g sovuq saryog' (kubik bo'lingan)\n160 ml muzday suv",
    korsatmalari: [
      "Katta idishda shakar, tuz va unni aralashtiring. Sovuq saryog'ni solib, barmoqlar bilan ezib yapaloq bo'lakchalar hosil qiling.",
      "Muzday suvni quyib, spatula bilan xamir holiga keltiring. Ikki bo'lakka bo'lib, har birini 1 soat muzlatgichda tindiring.",
      "Tindirilgan xamirni unlangan stolda yoyib, 23 cm diametrli pirog qolipiga joylashtiring va chetlariga shakl bering.",
      "Pechni 200°C ga qizdiring. Xamir ustiga pergament qog'oz solib, ustiga yuk (mosh yoki noxot) soling va 30–35 daqiqa pishiring.",
      "Yukni olib tashlab, pech haroratini 150°C ga tushiring va yana 10–15 daqiqa to'liq qarsildoq tillarang bo'lguncha pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_shakar', 'ing_un', 'ing_saryog']
  },
  {
    id: 'rec_hd_085_banana_cream_pie',
    nomi: 'Bananli va Qaymoqli Pirog (Banana Cream Pie)',
    tayyorlash_vaqti_daq: 40,
    qiyinlik: 'oson',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍌',
    tarif_matni: "Yangi banan parraklari, mayin zavarnoy krem va momiq qaymoq qatlami pishirig'i.",
    masalliqlar_matni: "1 dona pishirilgan tayyor pirog korji\n3 dona pishgan banan\n400 ml sut\n3 dona tuxum sarig'i\n80 g shakar\n3 osh qoshiq kraxmal\n1 choy qoshiq vanil\n200 ml ko'pirtirilgan qaymoq",
    korsatmalari: [
      "Qozonda sut, tuxum sarig'i, shakar va kraxmalni silliq bo'lguncha ko'pirtirib, past olovda quyuq zavarnoy krem bo'lguncha pishiring. Olovdan olib vanilni solib sovuting.",
      "Bananlarni parrak qilib to'g'rang.",
      "Pishirilgan korj tubiga banan bo'laklarini bir tekis tizib chiqing.",
      "Ustidan sovigan zavarnoy kremni quying.",
      "Muzlatgichda 2 soat sovutgach, ustini ko'pirtirilgan qaymoq va banan bo'laklari bilan bezating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_banan', 'ing_sut', 'ing_tuxum', 'ing_shakar', 'ing_kraxmal', 'ing_qaymoq']
  },
  {
    id: 'rec_hd_086_coconut_creamed_greens',
    nomi: "Kokos Sutida Dimlangan Ko'katlar (Coconut Creamed Greens)",
    tayyorlash_vaqti_daq: 30,
    qiyinlik: 'oson',
    kategoriya: 'Garnirlar & Yengil Taomlar',
    rasm_url: '🥬',
    tarif_matni: "Ismaloq, kale va zanjabil-sarimsoqli ko'katlarning kokos sutida dimlangan xushbo'y garniri.",
    masalliqlar_matni: "100 g kokos qiyg'ichi\n1.3 kg har xil ko'katlar (kale, mangold, ispanoq)\n60 ml kokos yog'i\n6 tish sarimsoq (ezilgan)\n1 dona piyoz (to'g'ralgan)\n1 dona achchiq qizil qalampir\n1 bo'lak (5 cm) zanjabil\n1 osh qoshiq xardal urug'lari (mustard seeds)\n2 choy qoshiq kashnich kukuni, yarim choy qoshiq kurkuma, tuz\n480 ml kokos suti\n50 g kashnich ko'kati",
    korsatmalari: [
      "Pechni 175°C ga qizdiring. Kokos qiyg'ichini listda 5–7 daqiqa qizartirib olib sovuting.",
      "Ko'katlarning qattiq tomirlarini olib tashlab, barglarini to'g'rang.",
      "Tovada kokos yog'ida sarimsoq, piyoz, qalampir va zanjabilni 5 daqiqa qovuring. Ziravorlarni solib 1 daqiqa qovurishda davom eting.",
      "Kokos sutini quyib qaynatib oling. Ko'katlarni oz-ozdan qo'shib, 15–18 daqiqa yumshaguncha dimlang.",
      "Ustiga qovurilgan kokos qiyg'ichlari va kashnich seping."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_kokos_suti', 'ing_sarimsoq', 'ing_piyoz', 'ing_zanjabil', 'ing_kokatlar']
  },
  {
    id: 'rec_hd_087_charred_sweet_potatoes',
    nomi: "Qovurilgan Shirin Kartoshka, Achchiq Asalli Saryog' va Laym (Charred Sweet Potatoes With Hot Honey Butter and Lime)",
    tayyorlash_vaqti_daq: 35,
    qiyinlik: 'oson',
    kategoriya: 'Garnirlar & Yengil Taomlar',
    rasm_url: '🍠',
    tarif_matni: "Pechda qizartirib pishirilgan batat kartoshkasi, asalli saryog' va qarsildoq qovoq urug'lari.",
    masalliqlar_matni: "1.3 kg kichik shirin kartoshka (batat, ikkiga bo'lingan)\n120 ml zaytun yog'i\nTuz\n85 g saryog' (xonaki haroratda)\n2 osh qoshiq asal\n3 osh qoshiq achchiq sous (hot sauce)\n30 g qovoq urug'lari (pepitas)\n1 osh qoshiq kashnich kukuni\nLaym bo'laklari",
    korsatmalari: [
      "Pechni 220°C ga qizdiring. Shirin kartoshkalarni 60 ml zaytun yog'i va tuz bilan aralashtirib, kesilgan tarafini pastga qilib 25–30 daqiqa pechda pishiring.",
      "Idishda saryog', asal va achchiq sousni sanchqi bilan ko'pirtirib achchiq-asalli saryog' tayyorlang.",
      "Tovada qolgan 60 ml yog'da qovoq urug'larini 4 daqiqa qovuring, kashnich kukuni va tuz soling.",
      "Pishgan kartoshkalarni laganga tizib, ustiga asalli saryog' surting. Ustidan qovoq urug'li yog'ni quyib, laym sharbati siqib torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_kartoshka', 'ing_saryog', 'ing_asal', 'ing_limon']
  },
  {
    id: 'rec_hd_088_pastel_butter_cookies',
    nomi: 'Bodomli Rangli Pechenye (Pastel Butter Cookies)',
    tayyorlash_vaqti_daq: 40,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍪',
    tarif_matni: "Maydalangan bodom, saryog' va tabiiy mevali shakar kukuniga botiriladigan rang-barang pechenyelar.",
    masalliqlar_matni: "140 g qovurilgan bodom\n250 g un\nYarim choy qoshiq tuz\nYarim choy qoshiq dolchin\n225 g saryog' (xonaki haroratda)\n120 g shakar kukuni (+ har bir rang uchun 60 g shakar kukuni)\n1 choy qoshiq vanil\nQuritilgan mevalar (qulupnay, chernika, mango - maydalangan)",
    korsatmalari: [
      "Pechni 175°C ga qizdiring. Kombaynda bodom, un, tuz va dolchinni maydalang.",
      "Idishda saryog' va 120 g shakar kukunini 4 daqiqa ko'pirtiring. Vanil va bodomli un aralashmasini qo'shib xamir qoring.",
      "Xamirdan 1 osh qoshiqlik shariklar yasab, listga tizing va 175°C pechda 14–16 daqiqa pishirib sovuting.",
      "Har bir quritilgan meva va shakar kukunini kombaynda ko'pirtirib rangli shakar kukuni tayyorlang.",
      "Sovigan pechenyelarni rangli shakar kukunlariga botirib oling."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_bodom', 'ing_un', 'ing_saryog', 'ing_shakar', 'ing_qulupnay', 'ing_chernika']
  },
  {
    id: 'rec_hd_089_iranian_rice_cookies',
    nomi: 'Eroncha Guruch Unli Pechenye (Iranian Rice Cookies)',
    tayyorlash_vaqti_daq: 40,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🌾',
    tarif_matni: "Guruch uni, gulob va hil aromati bilan pishiriladigan sharqona uvalanuvchan pechenye.",
    masalliqlar_matni: "170 g saryog' (tovada biroz qizartirib eritilgan)\n50 g shakar\nChorak choy qoshiq gulob (rose water)\n1 dona tuxum sarig'i\n60 g un\n100 g guruch uni\nYarim choy qoshiq kardamon (hil)\nYarim choy qoshiq tuz",
    korsatmalari: [
      "Saryog'ni tovada qizartirib eritib, elakdan o'tkazing va sovuting.",
      "Idishda shakar va 2 osh qoshiq issiq suvni eriting. Gulob va tuxum sarig'ini solib ko'pirtiring, eritilgan saryog'ni oz-ozdan quyib aralashtiring.",
      "Alohida idishda ikki xil un, hil va tuzni aralashtiring. Saryog'li massaga qo'shib xamir qoring.",
      "Xamirdan sharikchalar yasab, listga tizing va sanchqi bilan yassilang.",
      "175°C pechda 16–18 daqiqa pishirib sovuting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_saryog', 'ing_shakar', 'ing_tuxum', 'ing_un', 'ing_guruch_uni']
  },
  {
    id: 'rec_hd_090_sweet_potato_bowls',
    nomi: 'Shirin Kartoshka, Kale va Nohotli Bouli (Sweet Potato Bowls With Kale and Chickpeas)',
    tayyorlash_vaqti_daq: 25,
    qiyinlik: 'oson',
    kategoriya: 'Garnirlar & Yengil Taomlar',
    rasm_url: '🥗',
    tarif_matni: "Dimlangan shirin kartoshka, nohot, karri va kokos sutida pishirilgan kale ko'kati solingan to'quvchi bowl.",
    masalliqlar_matni: "450 g shirin kartoshka (batat, kubik to'g'ralgan)\n180 ml sabzavot bulyoni\n300 ml kokos suti\n1 osh qoshiq karri kukuni\n220 g kale ko'kati (to'g'ralgan)\n1 banka (400 g) konservalangan nohot\n2 osh qoshiq limon sharbati, tuz, murch\n300 g pishirilgan guruch",
    korsatmalari: [
      "Qozonda shirin kartoshka va bulyonni 5 daqiqa qaynatib dimlang.",
      "Idishda kokos suti va karri kukunini aralashtiring.",
      "Qozonga kale ko'kati, nohot va kokos sutli aralashmani solib, qopqog'ini yopgan holda 8 daqiqa sekin qaynatib pishiring.",
      "Limon sharbati, tuz va murch solib aralashtiring.",
      "Idishlarga pishgan guruchni solib, ustidan kartoshkali va nohotli taomni quying."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_kartoshka', 'ing_kokos_suti', 'ing_limon', 'ing_guruch']
  },
  {
    id: 'rec_hd_091_black_bottom_hazelnut_pie',
    nomi: 'Shokoladli va Fundukli Pirog (Black-Bottom Hazelnut Pie)',
    tayyorlash_vaqti_daq: 70,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🥧',
    tarif_matni: "Korj tubiga surtilgan erigan achchiq shokolad, qovurilgan funduk yong'og'i va qahvali pirog.",
    masalliqlar_matni: "Korj uchun:\n155 g un\n115 g sovuq saryog'\n1 choy qoshiq shakar\nYarim choy qoshiq tuz\n2-3 osh qoshiq muzday suv\nIchlik uchun:\n400 g funduk yong'og'i (hazelnuts)\n115 g achchiq shokolad (eritilgan)\n85 g saryog'\n200 g jigarrang shakar\n1 osh qoshiq qahva kukuni (espresso)\n1 osh qoshiq vanil\n300 ml makkajo'xori siropi (yoki asal)\n1 choy qoshiq tuz\n3 dona tuxum",
    korsatmalari: [
      "Korj masalliqlaridan xamir qorib, 1 soat muzlatgichda tindiring. Yoyib qolipga soling va sovuting.",
      "Funduklarni 175°C pechda 10 daqiqa qovurib oling. 1 stakan butun fundukni bezak uchun ajratib, qolganini maydalang.",
      "Eritilgan shokoladni korj tubiga tekis yoyib, 15 daqiqa muzlatgichda qotiring.",
      "Idishda eritilgan saryog', jigarrang shakar, qahva kukuni, vanil, asal, tuz va tuxumlarni ko'pirtiring. Maydalangan fundukni qo'shing.",
      "Aralashmani korjga quyib, ustini butun funduklar bilan bezating. 175°C pechda 40–45 daqiqa pishirib sovuting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_saryog', 'ing_shokolad', 'ing_shakar', 'ing_asal', 'ing_tuxum']
  },
  {
    id: 'rec_hd_092_olive_oil_apple_cake',
    nomi: "Zaytun Yog'li va Olmali Keks (Olive Oil Apple Cake with Spiced Sugar)",
    tayyorlash_vaqti_daq: 75,
    qiyinlik: 'orta',
    kategoriya: 'Pishiriqlar & Shirinliklar',
    rasm_url: '🍎',
    tarif_matni: "Zaytun yog'i, qirilgan shirin olmalar va xushbo'y dolchin-hil ziravorlari solib pishiriladigan keks.",
    masalliqlar_matni: "240 ml zaytun yog'i\n110 g shakar\n2 dona nordon-shirin olma (qirilgan va suvi siqilgan)\nZiravorlar: 1 choy qoshiq dolchin, yarim choy qoshiq murch, yarim choy qoshiq kardamon (hil), yarim choy qoshiq zanjabil\n185 g un\n2 choy qoshiq qabartma kukun (Razrixlitel)\n2 dona tuxum + 2 dona tuxum sarig'i\n100 g jigarrang shakar\n1 choy qoshiq vanil, yarim choy qoshiq tuz",
    korsatmalari: [
      "Pechni 175°C ga qizdiring. Qolipni zaytun yog'i va shakar bilan qoplang. Olmalarni qirib suvi qolmaguncha yaxshilab siqing.",
      "Barcha ziravorlarni aralashtiring. Chorak choy qoshig'ini ajratib, qolganiga un va qabartma kukun (Razrixlitel)ni qo'shib elang.",
      "Mikserda tuxumlar, jigarrang shakar, vanil, tuz va 100 g shakarni ko'pirtiring. Zaytun yog'ini quyib aralashtiring.",
      "Quruq masalliqlarni va qirilgan olmalarni qo'shib xamir holiga keltiring.",
      "Qolipga quyib, ustiga ajratilgan ziravor va 2 choy qoshiq shakar aralashmasini seping. 175°C pechda 60–70 daqiqa pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_shakar', 'ing_olma', 'ing_un', 'ing_tuxum']
  },

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
