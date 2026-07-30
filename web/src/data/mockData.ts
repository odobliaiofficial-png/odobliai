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
    id: "rec_hd_011_pistachio_plum_tart",
    nomi: "Pista va Qizil Olxo'rili Zavarnoy Tort",
    tayyorlash_vaqti_daq: 60,
    qiyinlik: "qiyin",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Pista va Qizil Olxo'rili Zavarnoy Tort (Stone Fruit Custard Tart) \u2014 8 kishilik. Yong'oqsimon hid va shirin olxo'rili shohona pishiriq.",
    masalliqlar_matni: "115 g qizdirilgan saryog' (Brown Butter), 65 g maydalangan pista, 1 dona tuxum, 50 g jigarrang shakar, 250 g un, 3 dona qizil olxo'ri",
    korsatmalari: [
      "1. Saryog'ni qalin taglikli tovada past olovda eritib, yong'oqsimon hid chiqib, oltin-jigarrang tusga kirguncha qizdiring. So'ng sovuting.",
      "2. Idishda un, maydalangan pista va jigarrang shakarni aralashtiring.",
      "3. Sovigan saryog' va tuxumni qo'shib, yumshoq xamir qorib oling.",
      "4. Xamirni yog'langan tort qolipiga bir tekis bosib joylashtiring.",
      "5. Olxo'rilarni yuvib, danagini ajrating va ingichka bo'laklarga kesing. Mevalarni xamir ustiga yelpig'ich shaklida tering.",
      "6. Oldindan 190°C gacha qizdirilgan pechda 35–40 daqiqa pishiring.",
      "7. Sovigach, xohishga ko'ra ustiga shakar kukuni sepib dasturxonga torting."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_un", "ing_saryog", "ing_pista", "ing_tuxum", "ing_olxori"]
  },
{
    id: "rec_hd_012_ice_cream_cake",
    nomi: "Ikki Qatlamli Mevali Muzqaymoqli Tort",
    tayyorlash_vaqti_daq: 40,
    qiyinlik: "orta",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Ikki Qatlamli Mevali Muzqaymoqli Tort (Double Ripple Ice Cream Cake) \u2014 10 kishilik. Salqinlantiruvchi va marmarsimon naqshli desert.",
    masalliqlar_matni: "250 g olxo'ri yoki qulupnay, 50 g jigarrang shakar, 100 g maydalangan yong'oq mag'zi, 1 litr vanilli muzqaymoq, 200 g maydalangan pechenye",
    korsatmalari: [
      "1. Mevalarni maydalab, shakar bilan 8–10 daqiqa qaynatib quyuq mevali sous tayyorlang.",
      "2. Pechenyeni maydalab qolip tagiga bosib joylashtiring.",
      "3. Ustiga yumshagan muzqaymoqning yarmini surting.",
      "4. Mevali sousdan bir necha qoshiq tomizib, pichoq yordamida marmarsimon naqsh hosil qiling.",
      "5. Qolgan muzqaymoqni surtib, yana sous va maydalangan yong'oq bilan bezang.",
      "6. Tortni kamida 5 soat muzlatkichning muzlatish bo'limida qotiring.",
      "7. Kesishdan oldin 5–10 daqiqa xona haroratida turing."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_qulupnay", "ing_shakar", "ing_yongoq", "ing_olxori"]
  },
{
    id: "rec_hd_013_almond_raspberry_icecream",
    nomi: "Bodomli va Malinali Uy Muzqaymog'i",
    tayyorlash_vaqti_daq: 20,
    qiyinlik: "oson",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Bodomli va Malinali Uy Muzqaymog'i (No-Churn Almond & Raspberry Ice Cream) \u2014 6\u20138 kishilik. Muzqaymoq apparatisiz tayyorlanadigan tabiiy desert.",
    masalliqlar_matni: "600 g malina, 2 osh qoshiq shakar, 1 banka quyultirilgan sut (sgushyonka), 1 choy qoshiq bodom ekstrakti, 500 ml 33% yog'li qaymoq",
    korsatmalari: [
      "1. Malina va shakarni 5–7 daqiqa qaynatib, quyuq pyure tayyorlang va sovuting.",
      "2. Qaymoqni mikser yordamida yumshoq cho'qqilar hosil bo'lguncha ko'pirtiring.",
      "3. Quyultirilgan sut va bodom ekstraktini qo'shib ehtiyotkorlik bilan aralashtiring.",
      "4. Aralashmani qolipga quyib, orasiga malina pyuresidan qatlam-qatlam qo'ying.",
      "5. Yog'och tayoqcha bilan yengil aylantirib marmarsimon naqsh hosil qiling va kamida 6 soat muzlating."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_malina", "ing_sgushchenka", "ing_qaymoq", "ing_shakar"]
  },
{
    id: "rec_hd_014_mint_chocolate_icecream",
    nomi: "Yangi Yalpizli va Shokoladli Muzqaymoq",
    tayyorlash_vaqti_daq: 25,
    qiyinlik: "oson",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Yangi Yalpizli va Shokoladli Muzqaymoq (No-Churn Fresh Mint & Chocolate Ice Cream) \u2014 6\u20138 kishilik. Tabiiy yalpiz barglari va shokolad uyg'unligi.",
    masalliqlar_matni: "1 bog' yangi yalpiz, 500 ml qaymoq, 100 g maydalangan qora shokolad, 1 banka quyultirilgan sut (sgushyonka), 40 g kakao kukuni",
    korsatmalari: [
      "1. Qaymoqni biroz isitib, ichiga yalpiz barglarini soling va 20 daqiqa damlab qo'ying.",
      "2. So'ng yalpiz barglarini suzib oling va qaymoqni to'liq sovuting.",
      "3. Sovigan qaymoqni mikser bilan ko'pirtiring.",
      "4. Quyultirilgan sut va kakao qo'shib aralashtiring.",
      "5. Oxirida maydalangan shokoladni solib aralashtiring hamda qolipga quyib 6 soat muzlating."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_yalpiz", "ing_qaymoq", "ing_sgushchenka"]
  },
{
    id: "rec_hd_015_cassava_cake",
    nomi: "Kassava va Kokosli Sharq Keksi",
    tayyorlash_vaqti_daq: 50,
    qiyinlik: "orta",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Kassava va Kokosli Sharq Keksi (Cassava & Coconut Cake) \u2014 8 kishilik. Kokos suti va qirindisining mayin sharqona ta'mi.",
    masalliqlar_matni: "4 dona tuxum, 500 g maydalangan kassava (yoki kartoshka kraxmali), 250 g kokos qirindisi, 375 ml kokos suti, \u00bd stakan quyultirilgan sut (sgushyonka)",
    korsatmalari: [
      "1. Tuxum sarig'i va oqini alohida ajrating.",
      "2. Sarig'iga kokos suti, quyultirilgan sut, kassava va kokos qirindisini qo'shib aralashtiring.",
      "3. Tuxum oqini alohida idishda qattiq ko'pik holiga kelguncha ko'pirtiring.",
      "4. Uni asosiy massaga asta-sekin qo'shib aralashtiring.",
      "5. Xamirni qolipga quying va 175°C pechda 40 daqiqa pishiring."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_tuxum", "ing_kokos_suti", "ing_kokos_qirindisi", "ing_sgushchenka"]
  },
{
    id: "rec_hd_016_labneh_lime_icecream",
    nomi: "Suzmali va Laymli Muzqaymoq",
    tayyorlash_vaqti_daq: 15,
    qiyinlik: "oson",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Suzmali va Laymli Muzqaymoq (Labneh & Lime Ice Cream) \u2014 6 kishilik. Nordon suzma va xushbo'y laym bilan granola uyg'unligi.",
    masalliqlar_matni: "200 g quyuq suzma (yoki grek yogurti), 1 banka quyultirilgan sut (sgushyonka), 2 dona laym sharbati, 350 ml qaymoq, Granola",
    korsatmalari: [
      "1. Suzma, laym sharbati va quyultirilgan sutni bir xil massa bo'lguncha aralashtiring.",
      "2. Qaymoqni alohida ko'pirtirib oling va ikki aralashmani ehtiyotkorlik bilan birlashtiring.",
      "3. Qolipga quyib 5 soat muzlating.",
      "4. Dasturxonga tortishdan oldin ustiga granola sepib bezang."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_suzma", "ing_laym", "ing_sgushchenka", "ing_qaymoq", "ing_granola"]
  },
{
    id: "rec_hd_017_mango_coconut_mousse",
    nomi: "Tropik Mango va Kokosli Mus Deserti",
    tayyorlash_vaqti_daq: 20,
    qiyinlik: "oson",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Tropik Mango va Kokosli Mus Deserti (Mango & Coconut Cream Mousse) \u2014 4\u20136 kishilik. Mangoning yengil va nordon-shirin mus deserti.",
    masalliqlar_matni: "2 dona pishgan mango, 200 ml kokos qaymog'i, 3 osh qoshiq shakar kukuni, 1 osh qoshiq limon sharbati",
    korsatmalari: [
      "1. Mangoni tozalab pyure holiga keltiring va limon sharbatini qo'shib aralashtiring.",
      "2. Kokos qaymog'ini shakar kukuni bilan ko'pirtiring.",
      "3. Stakanlarga navbat bilan mango pyuresi va kokos qaymog'ini qatlamlab quying.",
      "4. Kamida 2 soat sovutib, salqin holda torting."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_mango", "ing_kokos_qaymogi", "ing_shakar", "ing_limon"]
  },
{
    id: "rec_hd_018_lemon_meringue_pie",
    nomi: "Limonli va Meringali Salqin Pirog",
    tayyorlash_vaqti_daq: 45,
    qiyinlik: "orta",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Limonli va Meringali Salqin Pirog (Icebox Lemon Pie with Meringue) \u2014 8 kishilik. Nordon limon va oppoq Meringa ko'pikli salqin pirog.",
    masalliqlar_matni: "Tayyor pechenye korji, 3 dona tuxum, 100 ml limon sharbati, 1 banka quyultirilgan sut (sgushyonka), 50 g shakar kukuni",
    korsatmalari: [
      "1. Tuxum sarig'ini oqidan ajrating.",
      "2. Sarig'iga quyultirilgan sut va limon sharbatini qo'shib krem tayyorlang hamda korj ustiga yoying.",
      "3. Tuxum oqini shakar kukuni bilan qattiq ko'pik holiga kelguncha ko'pirtiring.",
      "4. Meringani pirog ustiga chiroyli qilib surting.",
      "5. 180°C pechda 10–15 daqiqa, usti yengil qizarguncha pishiring. Sovitib xizmat qiling."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_tuxum", "ing_limon", "ing_sgushchenka", "ing_shakar"]
  },
{
    id: "rec_hd_019_red_velvet_cake",
    nomi: "Klassik Qizil Barxat Torti",
    tayyorlash_vaqti_daq: 65,
    qiyinlik: "qiyin",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Klassik Qizil Barxat Torti (Classic Red Velvet Cake) \u2014 10\u201312 kishilik. Dunyoning eng mashhur va jozibali restoron torti.",
    masalliqlar_matni: "Korji uchun: 300 g un, 300 g shakar, 2 dona tuxum, 300 ml o'simlik yog'i, 240 ml qatiq, 2 osh qoshiq kakao, Qizil oziq-ovqat bo'yog'i. Krem uchun: 400 g qaymoqli pishloq (cream cheese), 150 g saryog', Shakar kukuni",
    korsatmalari: [
      "1. Korj uchun barcha masalliqlarni bir xil massa hosil bo'lguncha aralashtiring.",
      "2. Xamirni qoliplarga bo'lib, 175°C pechda 30–35 daqiqa pishiring va to'liq sovuting.",
      "3. Krem uchun saryog' va qaymoqli pishloqni shakar kukuni bilan ko'pirtiring.",
      "4. Korjlarni bir-birining ustiga qo'yib, orasiga va ustiga krem surting.",
      "5. Tortni muzlatkichda 1–2 soat tindirib, so'ng dasturxonga torting."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_un", "ing_shakar", "ing_tuxum", "ing_qatiq", "ing_tvorojniy_pishloq", "ing_saryog"]
  },
{
    id: "rec_hd_020_strawberry_shortcake",
    nomi: "Qulupnayli va Qaymoqli Mayin Keks",
    tayyorlash_vaqti_daq: 40,
    qiyinlik: "orta",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Qulupnayli va Qaymoqli Mayin Keks (Strawberry Shortcake) \u2014 6 kishilik. Sharbatli qulupnay va ko'pirtirilgan qaymoqli mayin keks.",
    masalliqlar_matni: "400 g yangi qulupnay, 360 g un, 115 g saryog', 180 ml sut, 250 ml quyuq qaymoq (ko'pirtirish uchun)",
    korsatmalari: [
      "1. Qulupnayni yuvib, bo'laklarga bo'ling va ozgina shakar bilan aralashtirib 20 daqiqa qoldiring.",
      "2. Un, saryog' va sutdan yumshoq keks xamiri tayyorlang.",
      "3. Xamirni qolipga quyib, 180°C pechda 25–30 daqiqa pishiring.",
      "4. Sovigan keksni gorizontal ravishda ikkiga bo'ling.",
      "5. Pastki qismiga ko'pirtirilgan qaymoq va sharbat chiqargan qulupnayni yoying. Ustini ikkinchi qavat bilan yoping hamda qaymoq va qulupnay bilan bezang."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_qulupnay", "ing_un", "ing_saryog", "ing_sut", "ing_qaymoq"]
  },
{
  "id": "rec_hd_021_cinnamon_scones",
  "nomi": "Dolchinli va Saryog'li Shirin Skonlar",
  "tayyorlash_vaqti_daq": 35,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Dolchinli va Saryog'li Shirin Skonlar (Sweet Cinnamon Scones) — 8-10 dona. Qarsildoq va saryog'li mayin shotland pishirig'i.",
  "masalliqlar_matni": "300 g un, 100 g muzday saryog', 70 g shakar, 1 dona tuxum, 120 ml sut, 1 osh qoshiq dolchin (koritsa), 1 choy qoshiq razraxlitel",
  "korsatmalari": [
    "1. Pechni 200°C gacha qizdiring va patnisga pergament qog'oz yozing.",
    "2. Chuqur idishda un, shakar, dolchin va razraxlitelni elab aralashtiring.",
    "3. Muzday saryog'ni mayda kubik qilib to'g'rab, quruq masalliqlarga qo'shing. Barmoqlar yordamida maydalab, qumsimon massa hosil qiling.",
    "4. Tuxum va sutni alohida idishda ko'pirtirib, xamirga qo'shing va yumshoq xamir qoring.",
    "5. Xamirni taxminan 2 sm qalinlikda yoyib, 8 ta uchburchak bo'lakka kesing.",
    "6. Patnisga terib, ustiga ozgina shakar va dolchin seping.",
    "7. 15–18 daqiqa yoki usti tillarang tusga kirguncha pishiring.",
    "8. Iliq holda choy bilan dasturxonga torting."
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
  "tarif_matni": "Vanilli Kapkeyklar Krem-Chizli Krem Bilan (Vanilla Cupcakes) — 12 dona. Mayin va shirali mini-kekslar.",
  "masalliqlar_matni": "Keks uchun: 250 g un, 200 g shakar, 115 g yumshoq saryog', 2 dona tuxum, 180 ml qatiq yoki sut, 1 choy qoshiq vanil, 1 choy qoshiq razraxlitel. Krem uchun: 200 g tvorojniy pishloq, 100 g yumshoq saryog', 150 g shakar kukuni",
  "korsatmalari": [
    "1. Pechni 180°C gacha qizdiring va kapkeyk qoliplariga qog'oz qolipchalar joylashtiring.",
    "2. Yumshoq saryog' va shakarni oqarib, hajmi oshguncha mikserda ko'pirtiring.",
    "3. Tuxumlarni bittadan qo'shib aralashtiring.",
    "4. Un va razraxlitelni elab, sut bilan navbatma-navbat qo'shib silliq xamir tayyorlang.",
    "5. Xamirni qoliplarning 2/3 qismigacha to'ldiring.",
    "6. 18–20 daqiqa pishirib, to'liq sovuting.",
    "7. Tvorojniy pishloq, yumshoq sariyog' va shakar kukunini mikserda ko'pirtirib krem tayyorlang.",
    "8. Sovigan kapkeyklar ustiga qandolat qopchasi yordamida chiroyli qilib surting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_shakar",
    "ing_saryog",
    "ing_tuxum",
    "ing_sut",
    "ing_vanilin",
    "ing_razraxlitel",
    "ing_tvorojniy_pishloq",
    "ing_shakar_kukuni"
  ]
},
{
  "id": "rec_hd_023_pumpkin_pancakes",
  "nomi": "Oshqovoqli va Asalli Mayin Pankeyklar",
  "tayyorlash_vaqti_daq": 25,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Oshqovoqli va Asalli Mayin Pankeyklar (Silver Dollar Pumpkin Pancakes) — 4 kishilik. Kuzgi boy vitaminli va xushbo'y nonushta.",
  "masalliqlar_matni": "200 g pishirilgan oshqovoq pyuresi, 250 g un, 2 dona tuxum, 250 ml sut, 3 osh qoshiq asal yoki shakar, 50 g eritilgan saryog', 1 choy qoshiq dolchin, 1 choy qoshiq razraxlitel",
  "korsatmalari": [
    "1. Oshqovoqni pishirib, blender yordamida pyure holiga keltiring.",
    "2. Tuxum, asal (yoki shakar), sut va eritilgan sariyog'ni aralashtiring.",
    "3. Oshqovoq pyuresini qo'shib yana aralashtiring.",
    "4. Un, dolchin va razraxlitelni elab qo'shib, quyuqroq pankeyk xamiri tayyorlang.",
    "5. Yog'langan va qizdirilgan tovaga kichik porsiyalarda quying.",
    "6. Har ikki tomonini 2–3 daqiqadan tillarang bo'lguncha pishiring.",
    "7. Asal va sariyog' bilan dasturxonga torting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_qovoq",
    "ing_un",
    "ing_tuxum",
    "ing_sut",
    "ing_asal",
    "ing_saryog",
    "ing_dolchin",
    "ing_razraxlitel"
  ]
},
{
  "id": "rec_hd_024_blueberry_pie",
  "nomi": "Chernikali Xushbo'y Pirog",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Chernikali Xushbo'y Pirog (Blueberry Pie) — 8 kishilik. Sharbatli rezavor mevali qarsildoq pirog.",
  "masalliqlar_matni": "Xamir: 300 g un, 150 g muzday saryog', 1 dona tuxum, 3 osh qoshiq muzday suv. Ichiga: 400 g chernika, 100 g shakar, 2 osh qoshiq kraxmal, 1 osh qoshiq limon sharbati",
  "korsatmalari": [
    "1. Un va muzday saryog'ni uvalab maydalang.",
    "2. Tuxum va muzday suv qo'shib tezda xamir qoring.",
    "3. Xamirni ikkiga bo'lib, 30 daqiqa muzlatgichda tindiring.",
    "4. Chernika, shakar, kraxmal va limon sharbatini aralashtiring.",
    "5. Xamirning bir qismini yoyib qolipga joylashtiring.",
    "6. Ichlikni tekis qilib soling.",
    "7. Ikkinchi xamirni panjara shaklida yoki butun holda yopib, ustiga bir nechta kesiklar qiling.",
    "8. 190°C pechda 35–40 daqiqa tillarang bo'lguncha pishiring.",
    "9. To'liq sovigach kesib dasturxonga torting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_tuxum",
    "ing_suv",
    "ing_chernika",
    "ing_shakar",
    "ing_kraxmal",
    "ing_limon"
  ]
},
{
  "id": "rec_hd_025_blackberry_cheesecake",
  "nomi": "Maymunjonli Chizkeyk",
  "tayyorlash_vaqti_daq": 70,
  "qiyinlik": "qiyin",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Maymunjonli Chizkeyk (Blackberry Cheesecake) — 10 kishilik (+ 4 soat sovitish).",
  "masalliqlar_matni": "Asosi: 200 g maydalangan pechenye, 80 g eritilgan saryog'. Krem: 500 g tvorojniy pishloq, 150 g shakar, 200 g smetana, 3 dona tuxum. Sous: 250 g maymunjon (yejevika), 50 g shakar",
  "korsatmalari": [
    "1. Pechenye ushoqlarini eritilgan sariyog' bilan aralashtirib, qolip tagiga mahkam bosib joylashtiring.",
    "2. Tvorojniy pishloq, shakar va smetanani mikserning past tezligida aralashtiring.",
    "3. Tuxumlarni bittadan qo'shib, ko'pirtirmasdan aralashtiring.",
    "4. Massani qolipga quying.",
    "5. 160°C pechda suv hammomida 50–60 daqiqa pishiring.",
    "6. Pechni o'chirib, eshigini biroz ochiq qoldirib chizkeykni ichida sovuting.",
    "7. So'ng 4 soat muzlatgichda tindiring.",
    "8. Maymunjon va shakarni 5 daqiqa qaynatib sous tayyorlang va sovigan chizkeyk ustiga quying."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_pechenye",
    "ing_saryog",
    "ing_tvorojniy_pishloq",
    "ing_shakar",
    "ing_smetana",
    "ing_tuxum",
    "ing_maymunjon"
  ]
},
{
  "id": "rec_hd_026_raspberry_cream_pie",
  "nomi": "Malinali va Qaymoqli Pirog",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Malinali va Qaymoqli Pirog (Raspberry Cream Pie) — 8 kishilik. Yangi malina va ko'pirtirilgan krem bilan boyitilgan nozik pishiriq.",
  "masalliqlar_matni": "1 dona tayyor pirog korji, 300 g yangi malina, 400 ml sut, 3 dona tuxum sarig'i, 80 g shakar, 30 g kraxmal, 200 ml ko'pirtirilgan qaymoq",
  "korsatmalari": [
    "1. Pechni 180°C gacha qizdiring. Tayyor korjni pechda 15 daqiqa pishirib, to'liq sovuting.",
    "2. Sutni qaynash darajasigacha qizdiring.",
    "3. Alohida idishda tuxum sarig'i, shakar va kraxmalni bir xil massa bo'lguncha aralashtiring.",
    "4. Issiq sutni oz-ozdan tuxumli aralashmaga quyib, doimiy aralashtiring.",
    "5. Aralashmani yana qozonga qaytarib, past olovda quyuq zavarnoy krem hosil bo'lguncha pishiring. So'ng to'liq sovuting.",
    "6. Sovigan kremga ko'pirtirilgan qaymoqning yarmini ehtiyotkorlik bilan aralashtiring.",
    "7. Yangi malinaning bir qismini kremga qo'shing.",
    "8. Tayyor kremni korj ustiga tekis qilib yoying.",
    "9. Ustini qolgan qaymoq va yangi malinalar bilan bezang.",
    "10. Muzlatgichda kamida 2 soat sovutib, so'ng dasturxonga torting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_pirog_korji",
    "ing_malina",
    "ing_sut",
    "ing_tuxum",
    "ing_shakar",
    "ing_kraxmal",
    "ing_qaymoq"
  ]
},
{
  "id": "rec_hd_027_chocolate_roll_cookies",
  "nomi": "Shokoladli Rulet Bulochkalar",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Shokoladli Rulet Bulochkalar (Chocolate Chip Sweet Rolls) — 12 dona (+ 1 soat xamirni oshirish).",
  "masalliqlar_matni": "Xamir: 350 g un, 1 choy qoshiq drojji, 150 ml iliq sut, 50 g saryog', 50 g shakar, 1 dona tuxum. Ichiga: 80 g yumshoq saryog', 100 g jigarrang shakar, 150 g shokolad tomchilari",
  "korsatmalari": [
    "1. Iliq sutga drojji va 1 choy qoshiq shakar solib, 10 daqiqa ko'pchishini kuting.",
    "2. Un, eritilgan sariyog', tuxum va qolgan shakarni qo'shib, drojjili aralashma bilan yumshoq xamir qoring.",
    "3. Xamirni ustini yopib, iliq joyda 1 soat oshiring.",
    "4. Oshgan xamirni to'rtburchak shaklda yoying.",
    "5. Ustiga yumshoq saryog' surting, jigarrang shakar va shokolad tomchilarini bir tekis seping.",
    "6. Xamirni rulet qilib o'rang va 12 ta teng bo'lakka bo'ling.",
    "7. Bo'laklarni qolipga joylashtirib, yana 20 daqiqa tindiring.",
    "8. 180°C pechda 20–25 daqiqa yoki usti tillarang bo'lguncha pishiring.",
    "9. Iliq holda choy yoki qahva bilan dasturxonga torting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_xamirturush",
    "ing_sut",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum",
    "ing_jigarrang_shakar",
    "ing_shokolad_tomchilari"
  ]
},
{
  "id": "rec_hd_028_apple_pie",
  "nomi": "Amerikancha Qarsildoq Olmali Pirog",
  "tayyorlash_vaqti_daq": 60,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Amerikancha Qarsildoq Olmali Pirog (Dreamy Apple Pie) — 8 kishilik. Dolchinli va shirali olma to'ldirmali afsonaviy pirog.",
  "masalliqlar_matni": "Xamir: 320 g un, 180 g muzday saryog', ½ choy qoshiq tuz, 5–6 osh qoshiq muzday suv. Ichiga: 5 dona nordon olma, 100 g shakar, 1 osh qoshiq dolchin, 1 osh qoshiq kraxmal, 1 osh qoshiq limon sharbati",
  "korsatmalari": [
    "1. Un, tuz va muzday saryog'ni qo'lda uvalab maydalang.",
    "2. Muzday suvni oz-ozdan qo'shib, xamirni tezda qorib oling.",
    "3. Xamirni oziq-ovqat plyonkasiga o'rab, 30 daqiqa muzlatgichda tindiring.",
    "4. Olmalarni tozalab, ingichka bo'laklarga kesing.",
    "5. Olmalarni shakar, dolchin, kraxmal va limon sharbati bilan aralashtiring.",
    "6. Xamirning yarmini yoyib, pirog qolipiga joylashtiring.",
    "7. Olmali ichlikni tekis qilib yoying.",
    "8. Ikkinchi xamir bilan yoping, chetlarini mahkam bosing va ustiga bug' chiqishi uchun bir nechta kesiklar qiling.",
    "9. Xohishga ko'ra ustiga ko'pirtirilgan tuxum surting.",
    "10. 190°C pechda 45 daqiqa yoki usti chiroyli tillarang bo'lguncha pishiring.",
    "11. Kesishdan oldin 20–30 daqiqa sovuting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_saryog",
    "ing_tuz",
    "ing_suv",
    "ing_olma",
    "ing_shakar",
    "ing_dolchin",
    "ing_kraxmal",
    "ing_limon"
  ]
},
{
  "id": "rec_hd_029_cranberry_pie",
  "nomi": "Nantaketcha Klyukvali va Yong'oqli Pirog",
  "tayyorlash_vaqti_daq": 50,
  "qiyinlik": "oson",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Nantaketcha Klyukvali va Yong'oqli Pirog (Nantucket Cranberry Pie) — 8 kishilik. Yong'oqli va nordong'och klyukvali tez va mazali pishiriq.",
  "masalliqlar_matni": "2 stakan klyukva (yoki qizil smorodina), ½ stakan maydalangan yong'oq mag'zi, 1 stakan shakar, 1 stakan un, 115 g eritilgan saryog', 2 dona tuxum, 1 choy qoshiq vanil yoki bodom ekstrakti",
  "korsatmalari": [
    "1. Pechni 175°C gacha qizdiring va pirog qolipini sariyog' bilan yog'lang.",
    "2. Qolip tubiga yuvilgan klyukva va maydalangan yong'oqlarni tekis qilib yoying.",
    "3. Ustidan shakarning yarmini seping.",
    "4. Alohida idishda eritilgan sariyog', tuxum, qolgan shakar, un va vanilni silliq massa bo'lguncha aralashtiring.",
    "5. Tayyor xamirni mevalar ustiga bir tekis quying.",
    "6. 175°C pechda 40–45 daqiqa yoki usti tillarang bo'lguncha pishiring.",
    "7. Pirogni biroz sovutib, iliq yoki sovuq holda dasturxonga torting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_klyukva",
    "ing_yongoq",
    "ing_shakar",
    "ing_un",
    "ing_saryog",
    "ing_tuxum",
    "ing_vanilin"
  ]
},
{
  "id": "rec_hd_030_blueberry_lemon_rolls",
  "nomi": "Chernikali va Limonli Shirin Ruletlar",
  "tayyorlash_vaqti_daq": 45,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Chernikali va Limonli Shirin Ruletlar (Blueberry Lemon Sweet Rolls) — 12 dona (+ 1 soat xamirni oshirish).",
  "masalliqlar_matni": "Xamir: 380 g un, 1 stakan iliq sut, 1 osh qoshiq drojji, 60 g saryog', 60 g shakar, 1 dona tuxum. Ichiga: 200 g chernika, 80 g shakar, 1 dona limon po'stining maydalangan rendasi. Glazur: 100 g shakar kukuni, 2 osh qoshiq limon sharbati",
  "korsatmalari": [
    "1. Iliq sutga drojji va ozgina shakar qo'shib, 10 daqiqa ko'pchishini kuting.",
    "2. Un, eritilgan sariyog', tuxum va qolgan shakarni qo'shib yumshoq xamir qoring.",
    "3. Xamirni iliq joyda 1 soat oshiring.",
    "4. Oshgan xamirni to'rtburchak shaklda yoying.",
    "5. Shakarni limon po'sti rendasi bilan aralashtirib, xamir ustiga bir tekis seping.",
    "6. Ustidan chernikalarni yoying.",
    "7. Xamirni rulet qilib o'rang va 12 ta bo'lakka bo'ling.",
    "8. Bo'laklarni qolipga joylashtirib, 20 daqiqa tindiring.",
    "9. 180°C pechda 25 daqiqa yoki usti tillarang bo'lguncha pishiring.",
    "10. Glazur uchun shakar kukuni va limon sharbatini aralashtiring.",
    "11. Ruletlar biroz sovigach, ustidan glazurni quyib dasturxonga torting."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_un",
    "ing_sut",
    "ing_xamirturush",
    "ing_saryog",
    "ing_shakar",
    "ing_tuxum",
    "ing_chernika",
    "ing_limon",
    "ing_shakar_kukuni"
  ]
},
{
    id: "rec_hd_001_strawberry_cheesecake",
    nomi: "Pishirilmaydigan Qulupnayli Chizkeyk",
    tayyorlash_vaqti_daq: 25,
    qiyinlik: "oson",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Pishirilmaydigan Qulupnayli Chizkeyk (No-Bake Strawberry Cheesecake) \u2014 6-8 kishilik. Halol va xushbo'y pishiriq.",
    masalliqlar_matni: "225g Tvorojniy pishloq (Cream Cheese) \u2014 xona haroratida yumshatilgan, 70g Shakar yoki shakar kukuni, 240g Qatiq / Smetana (20%li) yoki yog'li qaymoq, 2 choy qoshiq Tabiiy vanil ekstrakti, 225g Pishirilgan ko'pirtirilgan qaymoq (Whipped topping), 170g Qumli pechenye kukunidan tayyorlangan asos (Koj), 450g Yangi qulupnay (yuvilgan, bandi olingan va o'rtasidan teng bo'lingan)",
    korsatmalari: [
      "1. Asosiy kremni tayyorlash: Chuqur idishda yumshatilgan tvorojniy pishloqni mikser yordamida bir xil silliq massa bo'lguncha 2 daqiqa ko'pirtiring.",
      "2. Shakar va aromatizator qo'shish: Shakarni sekin-asta solib ko'pirtirishda davom eting. Smetana (yoki qaymoq) hamda vanil ekstraktini solib aralashtiring.",
      "3. Qaymoqni qo'shish: Ko'pirtirilgan quyuq qaymoqni spatulada sekin ehtiyotkorlik bilan kremga aralashtiring (massa ko'pchiq bo'lib qolishi kerak).",
      "4. Qolipga solish va sovitish: Tayyor krem simmetrik ravishda pechenyeli asos ustiga quyiladi va tekislanadi. Kamida 4 soat (yaxshisi kechasi bilan) muzlatgichda sovitiladi.",
      "5. Bezatish: Dasturxonga tortishdan oldin ustiga to'g'ralgan yangi qulupnay bo'laklari chiroyli tartibda terib chiqiladi."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_un", "ing_saryog", "ing_shakar", "ing_tuxum"]
  },
{
    id: "rec_hd_002_pistachio_cake",
    nomi: "Pista va Hil (Kardamon)li Xushbo'y Keks",
    tayyorlash_vaqti_daq: 45,
    qiyinlik: "orta",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Pista va Hil (Kardamon)li Xushbo'y Keks (Pistachio & Cardamom Cake) \u2014 8 kishilik. Halol va xushbo'y pishiriq.",
    masalliqlar_matni: "115g Tozalangan tabiiy pista (maydalash uchun), 130g Oliy nav un, 2 choy qoshiq Qabartma kukun (Baking powder), 1 choy qoshiq Maydalangan kardamon (hil), 1/4 choy qoshiq Tuz, 120ml Sut, 1/4 choy qoshiq Vanil ekstrakti, 170g Saryog' (xona haroratida yumshatilgan), 200g Shakar, 3 dona Katta tuxum",
    korsatmalari: [
      "1. Tayyorgarlik: Pechni 175°C ga qizdiring. Qolipni sariyog' bilan surtib, tagiga pergament qog'ozi to'shang.",
      "2. Quruq masalliqlar: Pistalarni blenderda kukunsimon maydalang. Idishda kukun pistani un, qabartma kukun, kardamon va tuz bilan aralashtiring.",
      "3. Xamir qorish: Alohida idishda yumshoq sariyog' va shakarni mikserda 3-4 daqiqa oppoq bo'lguncha ko'pirtiring. Tuxumlarni bir donadan qo'shib ko me'yorda ko'pirtiring.",
      "4. Birlashtirish: Sariyog'li massaga ketma-ketlikda quruq masalliqlar aralashmasi va sutni oz-ozdan solib aralashtiring.",
      "5. Pishirish: Xamirni qolipga quyib, 175°C pechda 35-40 daqiqa (gugurt cho'pi quruq chiqquncha) pishiring. Sovigach ustiga pista ushoqlari seping."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_un", "ing_saryog", "ing_shakar", "ing_tuxum"]
  },
{
    id: "rec_hd_003_shortbread_cookies",
    nomi: "Shotlandcha Saryog'li Ushoqli Pechenye",
    tayyorlash_vaqti_daq: 30,
    qiyinlik: "oson",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Shotlandcha Saryog'li Ushoqli Pechenye (Classic Shortbread Cookies) \u2014 12-15 dona. Halol va xushbo'y pishiriq.",
    masalliqlar_matni: "130g Un, 50g Shakar (yoki shakar kukuni), 1/4 choy qoshiq Tuz, 115g Muzday saryog' (kubik qilib to'g'ralgan)",
    korsatmalari: [
      "1. Pechni 150°C ga qizdirib qo'ying.",
      "2. Idishda un, shakar va tuzni aralashtiring. Muzday sariyog' bo'laklarini qo'shib, barmoq uchlari bilan qumsimon ushoq bo me'yorga kelguncha ishlang.",
      "3. Xamirni bir mushtga jamlab, 1 sm qalinlikda yoyib, to'rtburchak yoki yumaloq shakllar kasing va vilkalar bilan ustiga teshikchalar bosing.",
      "4. 150°C pechda 25-30 daqiqa davomida rangi och-tillarang bo'lguncha sekin pishiring."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_un", "ing_saryog", "ing_shakar", "ing_tuxum"]
  },
{
    id: "rec_hd_004_chocolate_candycane_cookies",
    nomi: "Shokoladli va Yalpizli Bayram Pechenyesi",
    tayyorlash_vaqti_daq: 35,
    qiyinlik: "orta",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Shokoladli va Yalpizli Bayram Pechenyesi (Chocolate Candy Cane Cookies) \u2014 20 dona. Halol va xushbo'y pishiriq.",
    masalliqlar_matni: "225g Un, 50g Sifatli kakao kukuni, 1/4 choy qoshiq Tuz, 200g Shakar, 170g Saryog' (xona haroratida), 1 dona Tuxum, 1 choy qoshiq Yalpiz (Peppermint) ekstrakti, Bezash uchun: Shakar kukuni va maydalangan yalpizli karamel bo'lakchalari",
    korsatmalari: [
      "1. Idishda un, kakao va tuzni elakdan o'tkazing.",
      "2. Alohida idishda sariyog' va shakarni mikserda ko'pirtiring. Tuxum va yalpiz ekstraktini soling.",
      "3. Quruq masalliqlarni qo'shib quyuq shokoladli xamir hosil qiling va 30 daqiqa muzlatgichda tindiring.",
      "4. Xamirdan sharchalar yasab, karamel ushoqlariga botiring va 175°C pechda 10-12 daqiqa pishiring."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_un", "ing_saryog", "ing_shakar", "ing_tuxum"]
  },
{
    id: "rec_hd_005_chhena_poda",
    nomi: "Chhena Poda (Hindiston Karamel-Pishloqli Pirogi)",
    tayyorlash_vaqti_daq: 60,
    qiyinlik: "orta",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Chhena Poda (Hindiston Karamel-Pishloqli Pirogi) (Chhena Poda (Spiced Baked Cheesecake)) \u2014 6-8 kishilik. Halol va xushbo'y pishiriq.",
    masalliqlar_matni: "250g Yangi uy pishlog'i (Paneer yoki yog'li tvorog), 50g Shakar kukuni, 1/2 choy qoshiq Maydalangan kardamon, 2 osh qoshiq Manna yarmasi (Semolina), 1.5 osh qoshiq Eritilgan saryog' / Ghee, 60ml Sut, 2 osh qoshiq Qovurilgan keshik va mayiz, 3 osh qoshiq Qora shakar (karamelizatsiya uchun)",
    korsatmalari: [
      "1. Pechni 175°C ga yoqing. Qolip tubiga sariyog' surtib, qora shakarni seping (pishganda karamel hosil qiladi).",
      "2. Idishda tvorog, shakar kukuni, manna yarmasi, kardamon, eritilgan sariyog' va sutni qo'lda yaxshilab ezing.",
      "3. Qovurilgan keshik va mayizlarni aralashtiring.",
      "4. Massani qolipga solib, 175°C da 45 daqiqa pishiring. Teparangi to'q qizg'ish karamel tusga kirgach sovitib qolipdan ag'daring."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_un", "ing_saryog", "ing_shakar", "ing_tuxum"]
  },
{
    id: "rec_hd_006_creole_cheesecake",
    nomi: "Karamel va Olma Sousli Kreol Chizkeyki",
    tayyorlash_vaqti_daq: 75,
    qiyinlik: "qiyin",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Karamel va Olma Sousli Kreol Chizkeyki (Creole Cream Cheesecake With Caramel-Apple) \u2014 10 kishilik. Halol va xushbo'y pishiriq.",
    masalliqlar_matni: "200g Qumli pechenye uvoqlari, 50g Saryog' (eritilgan), 900g Tvorojniy pishloq (Cream cheese), 200g Shakar, 300g Qatiq / Smetana, 1 choy qoshiq Vanil paste, 2 dona Katta tuxum, Sous uchun: 4 dona nordon olma (Granny Smith), 50g sariyog', 100g jigarrang shakar, 1 choy qoshiq dolchin (koritsa)",
    korsatmalari: [
      "1. Pechenye kukunini sariyog' bilan aralashtirib qolip tubiga mahkam bosib chiqiladi va 10 daqiqa duxovkada pishiriladi.",
      "2. Tvorojniy pishloq, shakar, smetana va vanil birgalikda ko'pirtiriladi. Tuxumlar birma-bir solinadi.",
      "3. Qolipga quyib, suv hammomida (Bain-marie) 160°C da 55 daqiqa pishiriladi va muzlatgichda 6 soat sovitiladi.",
      "4. Olma sousi: Tavada sariyog'da to'g'ralgan olmalar, jigarrang shakar va dolchin yumshaguncha 8 daqiqa qovuriladi va sovitilib chizkeyk ustidan quyiladi."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_un", "ing_saryog", "ing_shakar", "ing_tuxum"]
  },
{
    id: "rec_hd_007_frozen_avocado_cake",
    nomi: "Muzlatilgan Avokado va Laymli Yengil Desert",
    tayyorlash_vaqti_daq: 20,
    qiyinlik: "oson",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Muzlatilgan Avokado va Laymli Yengil Desert (Frozen Avocado & Lime Ice-Cake) \u2014 8 kishilik. Halol va xushbo'y pishiriq.",
    masalliqlar_matni: "180g Ushoqli pechenye, 60g Eritilgan saryog', 2 banka (800g) Quyultirilgan sut (Sgushchenka), 3 dona Pishgan yumshoq Avokado, 450g Tvorojniy pishloq, 2 dona Limon sharbati, 2 dona Laym sharbati va rendalangan po'sti",
    korsatmalari: [
      "1. Pechenyelarni eza shaklida maydalab sariyog' bilan aralashtiring va qolip tagiga tekislang.",
      "2. Blender idishida tozalangan avokado mag'zi, sgushchenka, tvorojniy pishloq, limon va laym sharbatini mikserda pashshaday silliq krem bo'lguncha 3 daqiqa ezing.",
      "3. Tayyor yashil silliq kremni qolipga quyib, kamida 6 soat muzlatgich kameraga (Freezer) qo'ying.",
      "4. Tortishdan oldin laym po'stlog'i rendasi bilan bezating."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_un", "ing_saryog", "ing_shakar", "ing_tuxum"]
  },
{
    id: "rec_hd_008_chocolate_zucchini_cake",
    nomi: "Shokoladli va Zukkinili Nam Keks",
    tayyorlash_vaqti_daq: 55,
    qiyinlik: "orta",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Shokoladli va Zukkinili Nam Keks (Moist Chocolate Zucchini Cake) \u2014 10 kishilik. Halol va xushbo'y pishiriq.",
    masalliqlar_matni: "280g Un, 50g Kakao kukun, 1 choy qoshiq Soda va 1 choy qoshiq Tuz, 300g Shakar, 115g Saryog', 120ml O'simlik yog'i, 2 dona Tuxum, 120ml Kefir / Qatiq, 2 stakan Rendalangan qovoqcha (Zukkini), 150g Shokolad tomchilari (Chocolate chips)",
    korsatmalari: [
      "1. Pechni 165°C ga yoqing. Qolipni yog'lang.",
      "2. Idishda un, kakao, soda va tuz elanadi.",
      "3. Alohida idishda sariyog', o'simlik yog'i va shakar ko'pirtiriladi. Tuxum va qatiq qo'shiladi.",
      "4. Quruq masalliqlar va rendalangan zukkinini (suvi siqilmaydi) xamirga solib aralashtiriladi. Shokolad tomchilari seping.",
      "5. 45 daqiqa pishiring. Zukkining ta'mi sezilmaydi, lekin keksni o'ta nam va mazzali qiladi."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_un", "ing_saryog", "ing_shakar", "ing_tuxum"]
  },
{
    id: "rec_hd_009_fresh_fruit_tart",
    nomi: "Bodomli Tart va Yangi Mevalar Pirogi",
    tayyorlash_vaqti_daq: 60,
    qiyinlik: "qiyin",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Bodomli Tart va Yangi Mevalar Pirogi (Fresh Fruit Tart With Almond Crust) \u2014 8 kishilik. Halol va xushbo'y pishiriq.",
    masalliqlar_matni: "130g Un + 60g Bodom uni, 40g Shakar va 1/2 choy qoshiq Tuz, 115g Muzday saryog', Krem uchun: 500ml Sut, 4 dona Tuxum sarig'i, 70g Shakar, 30g Kraxmal, 45g Saryog', Ustiga: Yangi chernika, malina, qulupnay bo'laklari",
    korsatmalari: [
      "1. Korj: Un, bodom uni, shakar, tuz va sariyog'dan xamir tayyorlab qolipga bosiladi va 175°C da 20 daqiqa tillarang bo'lguncha pishiriladi.",
      "2. Zavarnoy Krem: Idishda tuxum sarig'i, shakar va kraxmal ko'pirtiriladi. Qaynoq sut quyilib sekin olovda quyulguncha pishiriladi. Sariyog' qo'shib sovitiladi.",
      "3. Yig'ish: Sovigan tart korjiga krem surtiladi va ustidan rang-barang mevalar chiroyli tartibda teriladi."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_un", "ing_saryog", "ing_shakar", "ing_tuxum"]
  },
{
    id: "rec_hd_010_pear_hazelnut_tart",
    nomi: "Nokli va Funtukli Bodomli Tart",
    tayyorlash_vaqti_daq: 65,
    qiyinlik: "qiyin",
    rasm_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tarif_matni: "Nokli va Funtukli Bodomli Tart (Pear & Hazelnut Frangipane Tart) \u2014 8 kishilik. Halol va xushbo'y pishiriq.",
    masalliqlar_matni: "100g Qovurilgan funtuk yong'og'i, 100g Shakar, 35g Un, 90g Yumshoq saryog', 2 dona Katta tuxum, 1/2 choy qoshiq Bodom ekstrakti, 3 dona Pishgan yumshoq Nok (shirin), 1 ta Tayyor tart xamiri korji, 2 osh qoshiq O'rik djem (glazur uchun)",
    korsatmalari: [
      "1. Funtuk yong'og'ini blenderda shakar bilan kukun qilib ezing, un bilan aralashtiring.",
      "2. Sariyog' va qolgan shakarni ko'pirtiring. Tuxumlar va bodom ekstraktini qo'shing. Yong'oqli kukunni solib Franjipan kremini tayyorlang.",
      "3. Tart korjiga kremni surting. Noklarni yupqa parrak qilib kesib krem ustiga yelpig'ich shaklida tering.",
      "4. 175°C pechda 45 daqiqa pishiring. Pishgach ustiga eritilgan o'rik djemini cho'tka bilan surtib yaltirating."
],
    holat: "nashr",
    required_ingredient_ids: ["ing_un", "ing_saryog", "ing_shakar", "ing_tuxum"]
  },
{
  "id": "rec_hd_031_884e65de-980",
  "nomi": "Chicken and Potato Gratin With Brown Butter Cream",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Chicken and Potato Gratin With Brown Butter Cream — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "3 lb. skin-on, bone-in chicken thighs and drumsticks, 7½ tsp. kosher salt, divided, 1 lb. small potatoes (such as fingerling or baby Yukon Gold), halved lengthwise, 8 oz. small or medium shallots, halved through root ends, 5 Tbsp. unsalted butter, divided, ¾ cup heavy cream",
  "korsatmalari": [
    "1. Season chicken all over with 4 tsp. salt. Place in an airtight container and cover. Chill at least 1 hour and up to 1 day.",
    "2. Place a rack in middle of oven; preheat to 425°F. Toss potatoes, shallots, and 2 tsp. salt in a large bowl.",
    "3. Melt 4 Tbsp. butter in a small saucepan over medium heat and cook, stirring often, until butter foams, then browns, 5–8 minutes. Immediately remove from heat (it will continue to darken) and stir in cream, garlic, pepper, nutmeg, and remaining 1½ tsp. salt. Set saucepan over medium-low heat and cook, stirring, until salt is dissolved and mixture is warm to the touch. Stir in thyme and sage; remove from heat.",
    "4. Heat remaining 1 Tbsp. butter in a large stainless-steel skillet over medium-high until melted and bubbling. Working in 2 batches, cook chicken, skin side down, until golden underneath, about 5 minutes. Transfer chicken to a 13x9\" or 3-qt. baking dish and arrange skin side up. Set skillet with pan drippings aside. Nestle potatoes and shallots around chicken (don’t place on top). Pour brown butter cream over chicken and vegetables, making sure herbs and spices are evenly dispersed and tucking herbs into vegetables so they don’t get too crispy when they bake.",
    "5. Bake gratin until cream is mostly reduced and chicken and vegetables are dark golden brown, about 40 minutes. Let gratin cool 5–10 minutes.",
    "6. Meanwhile, pulse bread in a food processor until pieces are about oat-size (you should have about 1¼ cups). Toss breadcrumbs in pan drippings in reserved skillet to coat. Cook over medium heat, scraping up browned bits with a spatula, until deep golden brown, 5–7 minutes. Let cool.",
    "7. To serve, top gratin with breadcrumbs. Serve lemon wedges alongside for squeezing over if desired."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_limon",
    "ing_kartoshka",
    "ing_tovuq",
    "ing_tuz",
    "ing_qaymoq",
    "ing_saryog",
    "ing_sarimsoq"
  ]
},
{
  "id": "rec_hd_032_6d59483a-852",
  "nomi": "Chhena Poda (Spiced Cheesecake)",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Chhena Poda (Spiced Cheesecake) — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "Ghee, for the cake pan, 8 ounces paneer, preferably homemade, ¼ cup confectioners’ sugar, ½ teaspoon ground cardamom, 2 tablespoons semolina, 1½ tablespoons ghee, store-bought or homemade",
  "korsatmalari": [
    "1. Preheat the oven to 350°F. Butter a 9-inch nonstick metal cake pan with some ghee.",
    "2. In a large bowl, stir together the paneer, confectioners’ sugar, and cardamom until incorporated but still slightly chunky. Add the semolina, ghee, and milk and whisk until smooth. Stir in the cashews and raisins and set aside.",
    "3. Sprinkle the granulated sugar over the bottom of the prepared cake pan. Set the pan on the stove over medium heat and once the sugar just begins to bubble and turn pale golden brown (the sugar will continue to caramelize in the oven, so don’t let it get any darker right now), after 8 to 10 minutes, remove the pan from the heat using tongs. (This step is a bit tricky and you might be tempted to move the sugar around with a spoon while it is bubbling, but don’t touch it—just let it caramelize on its own.) You will know it’s ready for the cake batter when it’s bubbling but is still slightly grainy and just turning a pale golden color. Pour the batter into the pan, using a rubber spatula to scrape the bowl clean. It should settle into an even layer on its own, but if it doesn’t, use the spatula to create a smooth surface.",
    "4. Wearing oven mitts, carefully transfer the pan to the oven and bake until a toothpick inserted into the center of the cake comes out clean, 40 to 45 minutes. Transfer to a wire rack and cool in the pan to room temperature. Run a paring knife around the cake’s edges and then place a serving platter larger than the diameter of the cake over the cake and gently flip the cake over—it should slide out, with caramel coming out with it like you would see in a flan (though some caramel will be left in the pan—this is fine).",
    "5. Slice and serve with freshly whipped cream or sliced almonds, if desired. The cake will keep in a covered container in the refrigerator for up to 3 days.",
    "6. Note: To clean the pan, add some boiling water to the pan and let it sit for at least 30 minutes to loosen up the browned sugar sticking to the surface of the pan before cleaning it."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_shakar",
    "ing_sut",
    "ing_qaymoq",
    "ing_bodom"
  ]
},
{
  "id": "rec_hd_033_924b4d12-0cc",
  "nomi": "Our Favorite Creamy Mashed Potatoes",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Our Favorite Creamy Mashed Potatoes — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "4 pounds Yukon Gold potatoes, peeled, cut into 2\" pieces, 6 large garlic cloves, peeled, 1 tablespoon plus 2 teaspoons kosher salt, divided, plus more, 1 1/4 cups whole milk, 4 thyme sprigs, 3/4 cup (1 1/2 sticks) plus 2 tablespoons unsalted butter, divided",
  "korsatmalari": [
    "1. Cover potatoes, garlic, and 1 Tbsp. salt with cold water in a large pot. Bring to a low boil, then reduce heat and simmer (do not boil) until potatoes are very tender when pierced with the tip of a paring knife but not falling apart, 20–25 minutes.",
    "2. Meanwhile, heat milk, thyme, and 3/4 cup butter in a small pot over medium, stirring, until butter is melted. Remove from heat; set aside.",
    "3. Drain potatoes and garlic; return to pot. Toss over low heat until moisture evaporates, 1–2 minutes. Using potato ricer or food mill, immediately press potatoes and garlic into a large bowl (do not let cool).",
    "4. Discard thyme from milk mixture and gradually stir into potatoes, reserving about 1/2 cup if you plan to make in advance (see Do Ahead). Season with 2 tsp. salt and 3/4 tsp. pepper. Fold in sour cream and stir with a spoon until incorporated and very smooth (do not overmix or potatoes will become gummy). Taste and adjust seasonings. Serve topped with remaining 2 Tbsp. butter and more pepper.",
    "5. Mashed potatoes can be made 2 hours ahead; cover and store at room temperature. Or chill, covered, up to 8 hours; reheat over medium with reserved 1/2 cup milk mixture."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_smetana",
    "ing_kartoshka",
    "ing_tuz",
    "ing_sut",
    "ing_qaymoq",
    "ing_saryog",
    "ing_sarimsoq"
  ]
},
{
  "id": "rec_hd_034_a598b219-7a9",
  "nomi": "Creole Cream Cheesecake With Caramel-Apple Topping",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Creole Cream Cheesecake With Caramel-Apple Topping — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "2 cups graham cracker crumbs (about 16 whole crackers), 3 tablespoons granulated sugar, 3 tablespoons firmly packed light brown sugar, 1⁄4 teaspoon kosher salt, 1⁄2 cup unsalted butter, melted, 2 pounds cream cheese, at room temperature",
  "korsatmalari": [
    "1. Make the crust. Preheat the oven to 375°F. In a medium bowl, stir together the graham cracker crumbs, granulated sugar, brown sugar, salt, and butter to combine. Pat the mixture into a 10-inch springform pan, pressing the crumbs firmly in an even layer on the bottom and making sure they come at least halfway up the side of the pan. Bake for 7 to 10 minutes, until the crust is fragrant, dry, and toasty. Let cool, then wrap the entire outside of the pan tightly in two layers of foil, all the way to the top.",
    "2. In the bowl of a stand mixer fitted with the paddle attachment or in a large bowl using a handheld mixer, cream the plain cream cheese and sugar on medium-high speed for about 4 minutes, until incredibly smooth and light. Stop the mixer and scrape down the bottom and sides of the bowl with a rubber spatula. Add the Creole Cream Cheese and vanilla paste and beat on medium-high speed for about 2 minutes, scraping down the bowl once more. Decrease the speed to medium and beat in the eggs, one at a time, incorporating each one before adding the next. Mix just until the batter is smooth and uniform. Continuing to mix past that point, even though the batter won’t look different, only incorporates extra air, which will cause the cheesecake to bubble excessively and the surface to crack as that air tries to escape during the baking process.",
    "3. Decrease the oven temperature to 350°F. Pour the batter into the prepared crust and tap the pan gently on the counter a few times to remove any large air bubbles. Place the springform pan in a large baking or roasting pan (just big enough for the springform pan to fit in) and set the pan on the middle rack in the oven. Fill the pan with enough hot water to reach the rim of the springform pan. Bake for about 1 hour, or until the sides of the custard are set and the middle is still just slightly wobbly. Generally, if the entirety of the custard is fully set, your cheesecake is overbaked. Don’t panic—it’ll still be delicious, and you’ll do better next time!",
    "4. Let the cheesecake cool in the water until it is about room temperature. (You don’t want to have to try to grab the pan out of hot water if you can help it.) However, if you’re worried that your cheesecake might be slightly overbaked, you’ll want to pull it out rather quickly, and let it cool at room temperature. Refrigerate for at least 3 hours before slicing. The cake can be refrigerated, covered, for up to 4 days.",
    "5. In a large heavy-bottomed sauté pan, heat the butter until melted. Stir in the granulated sugar, brown sugar, and honey and let cook until bubbling. Add the apples and toss to coat. Stir in the lemon zest, lemon juice, salt, cinnamon, cardamom, and ginger; stir to combine. Cook for about 4 minutes, or until the apples just start to soften. Remove from the heat, stir in the vanilla, and transfer to a bowl to cool completely before use. The filling can be made up to 3 days ahead of time and stored in an airtight container in the refrigerator."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_vanilin",
    "ing_smetana",
    "ing_limon",
    "ing_pishloq",
    "ing_shakar",
    "ing_tuxum",
    "ing_tuz",
    "ing_sut",
    "ing_qaymoq",
    "ing_dolchin",
    "ing_saryog"
  ]
},
{
  "id": "rec_hd_035_bd9657fa-7e8",
  "nomi": "Coconut-Creamed Corn and Grains",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Coconut-Creamed Corn and Grains — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "2 Tbsp. extra-virgin olive oil, 1 serrano chile or jalapeño, thinly sliced, 1 (3\") piece fresh ginger, peeled, cut into matchsticks, 4 garlic cloves, thinly sliced, 2 scallions, thinly sliced, plus more for serving, ½ tsp. ground turmeric",
  "korsatmalari": [
    "1. Heat oil in a large nonstick skillet over medium. Cook chile, ginger, garlic, and 2 sliced scallions, tossing, until softened and fragrant, about 3 minutes. Add turmeric and cook, stirring frequently, just until darkened and fragrant, about 30 seconds. Add corn and increase heat to medium-high. Cook, tossing occasionally, until corn is beginning to lightly brown, about 5 minutes.",
    "2. Add grains to skillet and cook, tossing often, until heated through and beginning to crisp around the edges, about 2 minutes. Add ½ cup coconut milk; season with salt. Bring to a simmer and cook, adding 1–2 Tbsp. water if needed to loosen, until flavors have come together, about 3 minutes.",
    "3. Divide corn mixture between plates or shallow bowls and drizzle with more coconut milk. Top with crispy onions and more scallion. Serve with lime wedges for squeezing over."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_piyoz",
    "ing_tuz",
    "ing_osimlik_yogi",
    "ing_sut",
    "ing_makkajoxori_un",
    "ing_laym",
    "ing_sarimsoq"
  ]
},
{
  "id": "rec_hd_036_135c6a81-7d1",
  "nomi": "Tomato and Roasted Garlic Pie",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Tomato and Roasted Garlic Pie — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "2½ pounds mixed heirloom tomatoes, cored, sliced (¼\") thick, 3 tablespoons extra-virgin olive oil, ¾ teaspoon kosher salt, divided, plus more, ¼ teaspoon freshly ground black pepper, plus more, 6 garlic cloves, peeled, ½ cup (1 stick) unsalted butter",
  "korsatmalari": [
    "1. Place a rack in middle of oven; preheat to 475°F. Arrange tomatoes on a rimmed baking sheet, covering entire surface (it’s okay if they overlap). Drizzle with oil; season with salt and pepper. Roast until tomatoes begin to look dry on top, 25–30 minutes. Let cool.",
    "2. Meanwhile, cook garlic and butter in a small saucepan over medium-low heat, swirling often, until butter foams and milk solids turn golden, 5–7 minutes. Strain garlic butter through a fine-mesh sieve into a heatproof measuring cup; transfer garlic and toasty bits to a cutting board. Finely chop and set aside.",
    "3. Reduce oven temperature to 375°F. Pulse crackers and ¼ tsp. salt in a food processor until fine crumbs form (you should have about 2 cups). Add eggs and 6 Tbsp. garlic butter and pulse until mixture is the consistency of wet sand; set remaining garlic butter aside. Transfer to springform pan. Using a flat-bottomed measuring cup, press crumbs firmly onto bottom and 1½\" up sides of pan. Bake crust until edge is just starting to take on color, 8–10 minutes. Transfer pan to a wire rack and let crust cool.",
    "4. Mix Taleggio, Parmesan, mayonnaise, chopped thyme, remaining ½ tsp. salt, remaining ¼ tsp. pepper, and reserved chopped garlic in a medium bowl. Gently dollop half of cheese mixture over bottom of crust, then spread into an even layer with an offset spatula (don’t press too hard or you will break the crust). Layer half of tomato slices over and press down to even out layers. Repeat with remaining cheese mixture and tomatoes. Brush remaining garlic butter over tomatoes. Top with shallot and thyme leaves.",
    "5. Set pan on a rimmed baking sheet and bake pie until filling is bubbling vigorously and crust is browned, 60–75 minutes. Transfer to rack and let cool 1 hour before serving.",
    "6. Do Ahead: Pie can be made 1 day ahead. Cover loosely and chill."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_pishloq",
    "ing_tuxum",
    "ing_tuz",
    "ing_osimlik_yogi",
    "ing_pomidor",
    "ing_saryog",
    "ing_sarimsoq"
  ]
},
{
  "id": "rec_hd_037_bd7611e5-df2",
  "nomi": "Sour Cream and Onion Potato Salad",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Sour Cream and Onion Potato Salad — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "2 lb. baby Yukon Gold potatoes, 1 cup kosher salt, plus more, ¾ cup sour cream, ¼ cup mayonnaise, 1 Tbsp. onion powder, 2 tsp. Dijon mustard",
  "korsatmalari": [
    "1. Place potatoes in a large pot and pour in 3 qt. water to cover. Add 1 cup salt and bring water to a boil over medium-high heat. (Yes, this is a lot of salt, but it’s the right amount to ensure potatoes are seasoned through and through.) Reduce heat and simmer, adjusting heat as needed, until potatoes until fork-tender, 15–20 minutes. Scoop out ½ cup potato cooking liquid and set aside. Drain potatoes in a colander and let sit until cool enough to handle, about 10 minutes.",
    "2. Meanwhile, combine sour cream, mayonnaise, onion powder, mustard, and pepper in a large bowl and mix well to combine. Add garlic and half of chives and mix just to incorporate.",
    "3. Place red onion in a fine-mesh sieve and rinse for several seconds to take away some of its raw bite. Pat dry with paper towels. Mix half of onion into dressing; set aside remaining onion for serving.",
    "4. Working one at a time, set potatoes on a flat surface and crush slightly with the palm of your hand. Add to bowl with dressing along with ¼ cup potato cooking liquid. Do this while the potatoes are still warm so that they can absorb all of the seasoning. Don't worry if the dressing looks a little loose and watery at the beginning—it will all get absorbed and become creamier as it sits. Taste and season with more salt or, if your dressing looks too thick, a splash of potato cooking liquid.",
    "5. Top potatoes with remaining chives and reserved onion and crumble potato chips over."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_smetana",
    "ing_kartoshka",
    "ing_piyoz",
    "ing_tuz",
    "ing_qaymoq",
    "ing_sarimsoq"
  ]
},
{
  "id": "rec_hd_038_3dae3dc7-873",
  "nomi": "Frozen Avocado Cake",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Frozen Avocado Cake — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "Softened butter (for the pan), 8 whole graham crackers (120 g), 11 digestive biscuits or 4 additional graham crackers (60 g), 2 (14 oz/397 g) cans sweetened condensed milk, 3 Hass avocados, 1 pound (455 g) cream cheese, at room temperature",
  "korsatmalari": [
    "1. Preheat the oven to 350°F (180°C). Lightly butter the inside of a 9-inch (23-cm) springform pan.",
    "2. Make the crust: Crumble the crackers and cookies into a medium bowl. Use a pestle or the bottom of a heavy bottle to crush them into fine crumbs. Add ⅓ cup (75 ml) of the condensed milk and stir until very well combined. (You can grind the crumbled graham crackers and mix them with the condensed milk in a food processor if you prefer.) Press the crumb mixture firmly and evenly into the bottom of the pan. Bake until the crust looks a little darker and smells sweet and toasty, 12 to 15 minutes. Cool the crust in the pan on a wire rack.",
    "3. One at a time, cut an avocado in half lengthwise. Twist the halves to separate them. Hold the half with the pit in one hand. Holding the knife in your other hand, rap the knife blade into the pit to lodge it there. Twist the knife to loosen and remove the pit. Use a large spoon to scoop the avocado flesh onto a chopping board, discarding the skins. Coarsely chop the avocados.",
    "4. Add the chopped avocados, cream cheese, remaining condensed milk, and salt to a food processor. (You can combine the filling in a blender instead but you may need to work in batches.) Grate the zest of 1 lemon and set aside. Squeeze the zested lemon and the limes (you should have about ⅓ cup/75 ml lemon), reserving the remaining lemon for garnish. Add the juice to the avocados and process the mixture until smooth, scraping down the sides of the bowl as needed.",
    "5. Spread the filling in the cooled crust and sprinkle with the grated lemon zest. Cover the pan and freeze until the filling is firm, at least 6 hours or preferably overnight.",
    "6. Let the frozen cake stand at room temperature for 15 to 30 minutes before slicing. Dipping a thin knife into hot water between each cut, slice the cake into wedges and serve, topping each serving with freshly grated lemon zest."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_limon",
    "ing_pishloq",
    "ing_sut",
    "ing_tuz",
    "ing_qaymoq",
    "ing_avokado",
    "ing_laym",
    "ing_saryog"
  ]
},
{
  "id": "rec_hd_039_616babcd-ff6",
  "nomi": "Chocolate Zucchini Cake",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Chocolate Zucchini Cake — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "2 1/4 cups sifted all purpose flour, 1/2 cup unsweetened cocoa powder, 1 teaspoon baking soda, 1 teaspoon salt, 1 3/4 cups sugar, 1/2 cup (1 stick) unsalted butter, room temperature",
  "korsatmalari": [
    "1. Preheat oven to 325°F. Butter and flour 13 x 9 x 2-inch baking pan. Sift flour, cocoa powder, baking soda and salt into medium bowl. Beat sugar, butter and oil in large bowl until well blended. Add eggs 1 at a time, beating well after each addition. Beat in vanilla extract. Mix in dry ingredients alternately with buttermilk in 3 additions each. Mix in grated zucchini. Pour batter into prepared pan. Sprinkle chocolate chips and nuts over.",
    "2. Bake cake until tester inserted into center comes out clean, about 50 minutes. Cool cake completely in pan."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_vanilin",
    "ing_shokolad_tomchilari",
    "ing_shakar",
    "ing_tuxum",
    "ing_tuz",
    "ing_kakao",
    "ing_osimlik_yogi",
    "ing_sut",
    "ing_yongoq",
    "ing_saryog",
    "ing_un"
  ]
},
{
  "id": "rec_hd_040_56b1ae13-f70",
  "nomi": "Dakgangjeong (닭강정 / Korean Sweet, Crunchy Fried Chicken)",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Dakgangjeong (닭강정 / Korean Sweet, Crunchy Fried Chicken) — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "2 ½ pounds chicken wingettes or dumettes or small pieces of chicken (see headnote), ¼ teaspoon kosher salt, ¼ teaspoon ground black pepper, ½ cup potato starch, Vegetable oil, ⅓ cup toasted peanuts (optional)",
  "korsatmalari": [
    "1. Mix the chicken pieces, salt, and black pepper in a large bowl. Transfer to a large zipper-lock bag, add the potato starch, close the bag, and mix well by flipping the bag over and back again until the chicken is well coated.",
    "2. Place a large mesh strainer over a bowl.",
    "3. Heat 2 inches vegetable oil in a large, deep pan or wok over medium-high heat until it reaches about 340°F, 8 to 10 minutes. If you don’t have a thermometer, test it by dipping a tip of a chicken piece into the oil. If it bubbles, it’s ready. Carefully add the chicken to the oil one piece at a time, working in batches to avoid overcrowding.",
    "4. Deep-fry, turning the chicken with tongs, until all sides are light golden brown and crunchy, 10 to 12 minutes. As each piece is done, transfer it to the strainer. Once the chicken has drained, transfer it to a large bowl. Repeat with the rest of the chicken, making sure to bring the oil back up to 340°F between batches.",
    "5. Return the oil to 340°F over high heat and carefully add all the chicken—there’s no need to work in batches this time. The chicken will look a little soggy at first. Deep-fry, turning occasionally, until all the chicken pieces are dark golden brown and very crunchy, another 10 to 13 minutes. Transfer the chicken pieces to the strainer or a rack to drain, then place in a large bowl.",
    "6. If using the peanuts, place them in a slotted spoon or a small mesh strainer, carefully dip them into the hot oil, and fry for 15 to 30 seconds, just until light golden brown. Transfer to a small bowl.",
    "7. Mix the rice syrup, soy sauce, sugar, vinegar, and mustard in a small bowl.",
    "8. Heat a large pan or wok over medium-high heat. Add the oil, garlic, ginger, and chili peppers and stir for 30 seconds to 1 minute, until the garlic is a little crispy and fragrant. Add the soy sauce mixture and stir. Let it bubble for 2 to 3 minutes, until the mixture is shiny and a little sticky. Remove from the heat if not using right away and reheat until bubbling when ready to finish the chicken.",
    "9. Add the chicken and peanuts (if using) to the bubbling sauce and toss with a wooden spoon to coat nicely. Sprinkle with the toasted sesame seeds and a few teaspoons crushed red pepper flakes (if using). Transfer to a large plate or platter and serve. The chicken will remain crunchy for several hours if left at room temperature, or you can cover and refrigerate it for up to 3 days."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_kartoshka",
    "ing_tovuq",
    "ing_shakar",
    "ing_tuz",
    "ing_osimlik_yogi",
    "ing_sarimsoq"
  ]
},
{
  "id": "rec_hd_041_1a7db95c-af3",
  "nomi": "Fresh Fruit Tart With Almond Press-In Crust",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Fresh Fruit Tart With Almond Press-In Crust — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "2 large egg yolks, 1 cup all-purpose flour, ½ cup almond flour (such as Bob’s Red Mill Super-Fine Natural Almond Flour) or ½ cup all-purpose flour, 3 Tbsp. sugar, 1 tsp. kosher salt, ½ cup (1 stick) chilled unsalted butter, cut into pieces",
  "korsatmalari": [
    "1. Place a rack in the middle of oven; preheat to 350°F. Whisk egg yolks and 1 Tbsp. cold water in a small bowl to combine.",
    "2. Whisk all-purpose flour, almond flour, sugar, and salt in a medium bowl. Add butter and rub and smash into dry ingredients with your fingers to create large, shaggy pieces (you want some pieces that are flat and thin and some that are large and irregular).",
    "3. Drizzle egg yolk mixture over flour and, using a fork or your fingers, toss into dough to incorporate. Knead dough in bowl until it starts to come together (it will still look a little dry; although, if it looks too dry and doesn't come together, add 1–2 Tbsp. more water, but only if needed).",
    "4. Turn dough out onto a clean work surface and knead 1 or 2 more times. Divide dough in half, stack pieces, and press down firmly to smash together. Repeat process until dough is well combined and becomes slightly sticky, 2—3 more times. Press dough into bottom and 1\" up sides of pan and prick all over with a fork. Freeze until very firm, 20–30 minutes.",
    "5. Bake crust until deep golden brown all over, 35–40 minutes. Let cool.",
    "6. Do Ahead: Crust can be baked 2 days ahead. Store tightly wrapped at room temperature.",
    "7. Bring milk and vanilla paste to a simmer in a medium saucepan over medium-high heat. Remove from heat.",
    "8. Meanwhile, whisk egg yolks, sugar, cornstarch, and salt in a medium bowl, starting slowly—it won’t want to combine easily at first—then vigorously whisk until mixture is very pale yellow and very thick, about 1 minute (the sugar should be nearly dissolved at this point). Whisking constantly, gradually add hot milk mixture. Return custard base to saucepan and bring to a simmer over medium heat, whisking constantly. Simmer, still whisking constantly, until custard is thickened and has no cornstarch taste, about 3 minutes.",
    "9. Remove custard from heat and add butter a couple of pieces at a time, whisking until fully melted before adding more, until all of the butter is incorporated. Transfer to a medium bowl and cover with plastic wrap, pressing directly against surface. Let cool.",
    "10. Vigorously whisk custard until smooth and slightly loosened. Scrape into crust and smooth surface. Top with berries.",
    "11. Do Ahead: Custard can be made 4 days ahead. Keep chilled."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_vanilin",
    "ing_bodom",
    "ing_shakar",
    "ing_tuxum",
    "ing_tuz",
    "ing_sut",
    "ing_makkajoxori_un",
    "ing_saryog",
    "ing_un"
  ]
},
{
  "id": "rec_hd_042_e9cf2622-916",
  "nomi": "Pear and Hazelnut Frangipane Tart",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Pear and Hazelnut Frangipane Tart — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "1 cup hazelnuts, toasted, loose skins rubbed off in a kitchen towel, and cooled, 1/2 cup sugar, 1/4 cup all-purpose flour, 3/4 stick (6 tablespoons) cold unsalted butter, softened, 2 large eggs, 1 teaspoon vanilla extract",
  "korsatmalari": [
    "1. Preheat oven to 350°F.",
    "2. Pulse hazelnuts with 1/4 cup sugar in a food processor until finely ground, then add flour and pulse to combine.",
    "3. Beat together butter and remaining 1/4 cup sugar with an electric mixer at moderately high speed until pale and fluffy. Add eggs 1 at a time, beating well after each addition, then beat in extracts. Reduce speed to low and mix in nut mixture until just combined.",
    "4. Spread frangipane filling evenly in tart shell. Peel, halve, and core pears, then cut lengthwise into 1/4-inch-thick slices, holding slices together to keep pear shape intact. Arrange pears decoratively on filling, fanning slices slightly. Bake until pears are golden and frangipane is puffed and golden brown, 30 to 40 minutes. Brush pears (not filling) with preserves and cool tart completely in pan on rack, then remove side of pan."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_vanilin",
    "ing_bodom",
    "ing_shakar",
    "ing_tuxum",
    "ing_tuz",
    "ing_saryog",
    "ing_un"
  ]
},
{
  "id": "rec_hd_043_48656d0f-3e9",
  "nomi": "Salted PB&J; Ice Cream Pie",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Salted PB&J; Ice Cream Pie — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "1 sleeve (110 g) Ritz crackers or other cracker of your choice, ⅓ cup (45 g) raw peanuts or other nut or seed, finely chopped, ⅓ cup (67 g; packed) light or dark brown sugar, ½ tsp. Diamond Crystal or ¼ tsp. Morton kosher salt, 6 Tbsp. unsalted butter, melted, 3 large eggs",
  "korsatmalari": [
    "1. Preheat oven to 275°F. Place crackers in a deep pie dish (a shallower one will work but you may have some filling left over) and gently crush with your hands until you have a mix of dime-size pieces, small crumbs, and everything in between. Add peanuts, brown sugar, and salt and toss to combine. Drizzle in butter and toss to evenly coat. Using your hands and the bottom of a measuring cup, press firmly and evenly into bottom and up sides of dish. (Mixture will look and feel crumbly, but it will hold together when baked.) Bake crust until a shade darker, 20–25 minutes. Let cool.",
    "2. Do Ahead: Crust can be baked 3 days ahead. Store tightly wrapped at room temperature, or freeze up to 1 month.",
    "3. Pour water into a medium saucepan to come 1½\" up the sides and bring to a bare simmer over medium-low heat. Whisk eggs, brown sugar, and salt in a large heatproof bowl just to combine (or use the bowl of a stand mixer if you’ve got one). Set over saucepan (bowl should not touch water) and heat egg mixture, stirring constantly with a heatproof rubber spatula, until sugar dissolves, about 4 minutes (mixture will no longer feel gritty when rubbed between your fingers). If you are concerned about undercooked eggs, heat mixture longer, still stirring constantly, until an instant-read thermometer registers 165°F, about 3 minutes more. Remove bowl from heat and add vanilla to egg mixture. Using an electric mixer, beat on high speed until thick and pale and doubled in volume, about 10 minutes. (Or, if using a stand mixer, beat with the whisk attachment, 6–8 minutes.)",
    "4. Using spatula, mix peanut butter in another large bowl to loosen up and smooth out. Stir one third of egg mixture into peanut butter to lighten, then gently fold in half of remaining egg mixture, running spatula down sides and along bottom of bowl, then lifting up through center and over top while rotating bowl, until just combined. Repeat with remaining egg mixture (it will lose a lot of volume, and that’s okay).",
    "5. Starting on low speed and gradually increasing to medium-high, beat cream in the same bowl you used for egg mixture (no need to wash) until soft peaks form, about 2 minutes. Gently fold into peanut butter mixture and scrape into crust. Dollop jelly all over; swirl with a butter knife. (For more defined swirls, freeze pie 30 minutes before adding jelly.) Freeze at least 8 hours before serving.",
    "6. To slice, run a chef’s knife under hot water to warm up the blade, then wipe to clean and dry between slices. Use an offset spatula or fork to loosen slices from dish. If pie is frozen very hard, you may need to let it temper in the fridge 30 minutes before serving.",
    "7. Do Ahead: Pie can be made 2 weeks ahead. Wrap tightly and freeze."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_vanilin",
    "ing_shakar",
    "ing_tuxum",
    "ing_tuz",
    "ing_qaymoq",
    "ing_saryog"
  ]
},
{
  "id": "rec_hd_044_c09fc64b-b49",
  "nomi": "Stone Fruit Custard Tart",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Stone Fruit Custard Tart — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "½ cup (1 stick) unsalted butter, ½ cup (65 g) raw pistachios, divided, 1 large egg, ¼ cup (packed; 50 g) light brown sugar, 2 cups (250 g) all-purpose flour, 1 tsp. kosher salt",
  "korsatmalari": [
    "1. Preheat an oven to 375°F. Cook butter in a small saucepan over medium heat, stirring often, until it foams, then browns, 5–8 minutes. Set aside.",
    "2. Pulse pistachios in a food processor until finely ground. Transfer 4 Tbsp. to a small bowl; set aside.",
    "3. Scrape reserved browned butter over pistachios in food processor; add egg, brown sugar, flour, salt, and baking powder. Pulse until incorporated, then process, scraping down sides as needed, until mixture looks like wet sand and holds together when squeezed in your hand, about 2 minutes.",
    "4. Press dough evenly into bottom and about 2\" up sides of pan with a straight-sided glass or measuring cup. Chill while you make the filling.",
    "5. Process eggs and brown sugar in clean food processor until eggs are well combined, about 1 minute. Scrape down sides; add sour cream, vanilla bean paste, cardamom, ginger, orange zest, and salt. Sprinkle flour and 2 Tbsp. reserved pistachios over; process until smooth, about 1 minute.",
    "6. Starting at the edges of the chilled tart shell and working inward, arrange stone fruit in snug concentric circles, standing each wedge up so one tip is raised and rounded skin side is pressed against crust. Carefully pour custard around fruit (fruit should not be completely covered). Sprinkle coarse sugar over.",
    "7. Bake pie until crust is golden brown and filling is puffed and set in the center (it shouldn’t wobble when gently shaken), 70–75 minutes. Transfer pan to a wire rack and scatter remaining reserved 2 Tbsp. pistachios over. Let cool, then chill, uncovered, until fully set.",
    "8. Unmold tart. Dust with powdered sugar and/or top with dollops of whipped cream or crème fraîche if desired. Serve chilled or room temperature."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_smetana",
    "ing_vanilin",
    "ing_shakar",
    "ing_tuxum",
    "ing_tuz",
    "ing_qaymoq",
    "ing_saryog",
    "ing_un"
  ]
},
{
  "id": "rec_hd_045_ffbcd85e-78f",
  "nomi": "Tamale Pie with Fresh Tomato and Corn",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Tamale Pie with Fresh Tomato and Corn — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "1/2 pound fresh chorizo, casings removed (about 2 links), or vegetarian substitute such as Lightlife Plant-Based Italian Sausage, 1/2 pound ground beef, or vegetarian substitute such as Lightlife Plant-Based Ground, 1 tablespoon tomato paste, 2 1/2 teaspoons cumin, 1 large onion, grated on a box grater, divided, 1–2 medium jalapeños, thinly sliced, seeded if desired, divided",
  "korsatmalari": [
    "1. Preheat oven to 450°F. Heat an 8\" cast-iron skillet over high. Pat chorizo and beef dry with paper towels, then press into an even layer in bottom of hot skillet with a spatula. Cook, undisturbed, until a brown crust begins to form on the bottom, about 6 minutes. Turn, break into pieces, and continue to cook until cooked through, about 4 minutes. Add tomato paste, cumin, half of grated onion, half of jalapeño, and 1 1/4 tsp. salt and cook, stirring constantly, until fragrant and well combined, about 1 minute. Remove from heat and stir in tomatoes, 1 1/2 cups corn, and 1 1/2 cups cheese.",
    "2. Whisk eggs, butter, 1/3 cup sour cream, and remaining onion in a medium bowl. Whisk cornmeal, baking powder, and remaining 1/2 tsp. salt in a small bowl. Add dry ingredients to butter mixture and stir to combine, then stir in 1/4 cup cheese and remaining 1/2 cup corn.",
    "3. Dollop cornbread batter over meat mixture, then smooth into an even layer. Top with remaining jalapeños and 1/4 cup cheese.",
    "4. Bake cornbread until golden brown, 15–18 minutes. Serve with sour cream alongside."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_smetana",
    "ing_pishloq",
    "ing_tuxum",
    "ing_piyoz",
    "ing_tuz",
    "ing_pomidor",
    "ing_makkajoxori_un",
    "ing_qaymoq",
    "ing_saryog"
  ]
},
{
  "id": "rec_hd_046_ff00e40d-a02",
  "nomi": "Double Ripple Ice Cream Cake",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Double Ripple Ice Cream Cake — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "8 oz. red or black plums (2��3), pitted, chopped, 3 Tbsp. light brown sugar, ¼ tsp. kosher salt, ¾ cup (96 g) walnuts, ¼ cup (35 g) black and/or white sesame seeds, 1 cup pure maple syrup, preferably grade B",
  "korsatmalari": [
    "1. Bring plums, brown sugar, and salt to a boil in a medium heavy saucepan over medium heat, stirring constantly. Reduce heat and simmer, stirring occasionally, until fruit is softened and juices deepen in color, about 8 minutes. Strain through a fine-mesh sieve set over a medium bowl, pushing plum flesh through; discard skins. Return sauce to pan and bring to a simmer, stirring occasionally. Cook, still stirring, until reduced to about ⅔ cup, about 3 minutes. Pour ripple into a jar and let cool, then cover and chill 1 hour before using.",
    "2. Place a rack in middle of oven; preheat to 350°F. Place walnuts on 1 side of a rimmed baking sheet; season with salt. Toast, tossing halfway through, 8 minutes (nuts should not be quiet golden brown yet). Remove from oven and add sesame seeds on empty side of baking sheet. Toast until nuts and seeds are golden brown, about 2 minutes. Let cool; chop nuts. Combine nuts, sesame seeds, maple syrup, and salt in a small jar or bowl and stir well. Cover and set aside.",
    "3. Lightly butter pan and line with a parchment paper round. Heat brown sugar, tahini, and remaining ½ cup (1 stick) unsalted butter until bubbling in a medium heavy saucepan over medium heat, stirring until butter is melted and sugar is dissolved. Cook, without stirring, 1 minute. Let cool slightly.",
    "4. Stir vanilla bean paste and salt followed by egg into brown sugar mixture. Sift flour and baking powder through a fine-mesh sieve into mixture and fold to barely combine. Scrape batter into the prepared pan. Bake until golden around the edges, evenly tan across the top, and puffed in the center, about 20 minutes.",
    "5. Transfer pan to a wire rack and let blondie base cool. Run a knife around the sides to help base release but keep springform pan intact, then cover and chill in freezer at least 15 minutes or until ready to use.",
    "6. Cut 3 pints of ice cream out of their containers and place in the bowl of a stand mixer fitted with the paddle attachment. (Alternatively, you can beat in a large bowl with a wooden spoon or stiff rubber spatula until the consistency of cake batter.) Mix on low speed 2 minutes, then working up to medium speed, beat until barely pliable. It will soften further as it sits, but you want it to be sticky and slightly challenging to spread when you assemble cake. Chill in the freezer at any point if it becomes too soft and melted.",
    "7. Remove blondie base and remaining 2 still-frozen pints of ice cream from freezer. Using an offset spatula, spread a third of softened ice cream over base. Using a spring-loaded ice cream scoop, scoop out and place mounds of 1-pint still-frozen ice cream on top in a random manner. Dollop one third of maple ripple over ice cream, avoiding edges of pan. Next, drizzle one third of plum ripple over ice cream, creating stripes. Repeat layering process, using half of remaining softened ice cream, all of remaining frozen ice cream, half of remaining maple ripple, and half of remaining plum ripple. Top with a final layer of remaining softened ice cream, smooth surface, then drizzle with remaining maple ripple and plum ripple. (If at any point the ice cream gets so soft that you can’t achieve distinct layers, chill in freezer for a few minutes.) Freeze, uncovered, 2 hours, then cover and freeze at least 8 hours before serving.",
    "8. To serve, run a knife or offset spatula around edge of pan to release. Unmold and remove parchment paper; discard. Transfer cake to a platter, smooth sides with an offset spatula, and freeze 10 minutes. Slice with a warm knife, wiping off between cuts."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_vanilin",
    "ing_shakar",
    "ing_tuxum",
    "ing_tuz",
    "ing_qaymoq",
    "ing_yongoq",
    "ing_saryog",
    "ing_un"
  ]
},
{
  "id": "rec_hd_047_b2b60032-cd1",
  "nomi": "Tiger Fruit Salad",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Tiger Fruit Salad — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "1 lb. underripe stone fruit (such as plums, nectarines, or peaches), pears, or mangoes, thinly sliced, 1 serrano chile, seeds removed if desired, thinly sliced, 2 Tbsp. unseasoned rice vinegar, 1 Tbsp. sugar, ½ tsp. kosher salt, plus more, 1 bunch cilantro",
  "korsatmalari": [
    "1. Gently toss fruit, chile, vinegar, sugar, and ½ tsp. salt in a medium bowl to combine. Let sit until fruit is spicy and flavorful, about 10 minutes.",
    "2. Meanwhile, gather cilantro into a bundle and cut into 2\"-long pieces. Transfer to a medium bowl, add scallions and celery, and toss to combine.",
    "3. Drain fruit in a fine-mesh sieve set over a small bowl; set fruit aside. Add oil, soy sauce, and lime zest to marinating liquid in bowl and whisk to combine. Pour dressing over cilantro mixture and toss to coat. Add reserved fruit and sesame seeds and toss gently to combine. Taste and season with more salt if needed.",
    "4. Transfer salad to a platter and serve with lime wedges."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_shakar",
    "ing_tuz",
    "ing_osimlik_yogi",
    "ing_laym"
  ]
},
{
  "id": "rec_hd_048_db33d3b1-da3",
  "nomi": "No-Churn Almond and Raspberry Swirl Ice Cream",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "No-Churn Almond and Raspberry Swirl Ice Cream — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "3 cups (600 g) fresh raspberries, 2 Tbsp. sugar, 1 tsp. kosher salt, divided, 1 (14-oz.) can sweetened condensed milk, 1 tsp. almond extract, 2 cups heavy cream",
  "korsatmalari": [
    "1. Bring raspberries, sugar, and ¼ tsp. salt to a simmer in a medium saucepan over medium heat and cook, stirring often, until raspberries begin to burst and lose their shape, about 4 minutes. Strain through a fine-mesh sieve into a large measuring glass, pressing on solids; discard solids. Pour back into saucepan and return to medium heat. Cook, stirring occasionally, until sauce is thick enough to coat a spoon, 10–15 minutes. (You should have about 6 Tbsp.) Transfer back to measuring glass and chill until cold, about 30 minutes.",
    "2. Mix condensed milk, almond extract, and remaining ¾ tsp. salt in a medium bowl to combine.",
    "3. Using an electric mixer, beat cream in a medium bowl, starting on low speed and gradually increasing to medium-high as it thickens, until billowy and stiff peaks form, about 4 minutes.",
    "4. Add a dollop of whipped cream to condensed milk mixture and mix in with a rubber spatula (this is just to lighten it so that the next stage—folding—is easier). Add remaining whipped cream; fold in, running spatula down sides and along bottom of bowl, then lifting up through center and over top while rotating bowl to integrate without deflating, until very few streaks of condensed milk mixture remain.",
    "5. Scrape about one third of ice cream base into a loaf pan that’s at least 8½x4½\". Drizzle over one third of raspberry syrup. Repeat layers 2 more times, ending with raspberry syrup (no need to be precise). Using a small offset spatula or butter knife, make figure-eight motions through ice cream base to swirl raspberry syrup throughout. Cover with plastic wrap or an airtight silicone lid and freeze until solid, at least 8 hours.",
    "6. To serve, transfer loaf pan to refrigerator and let ice cream soften 10 minutes before scooping into bowls.",
    "7. Do Ahead: Ice cream can be made 1 week ahead. Keep frozen."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_bodom",
    "ing_shakar",
    "ing_tuz",
    "ing_sut",
    "ing_qaymoq"
  ]
},
{
  "id": "rec_hd_049_becd3f60-24e",
  "nomi": "No-Churn Fresh Mint and Chocolate Ice Cream",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "No-Churn Fresh Mint and Chocolate Ice Cream — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "¾ cup (15 g) coarsely chopped mint, 2 cups (or more) heavy cream, divided, 4 oz. bittersweet chocolate (65%–75% cacao), coarsely chopped, 1 (14-oz.) can sweetened condensed milk, 1 tsp. kosher salt, ½ cup (40 g) Dutch-process cocoa powder",
  "korsatmalari": [
    "1. Bring mint and 1 cup cream to a bare simmer in a small saucepan over medium heat. Remove from heat, cover, and let sit 30 minutes. Strain through a fine-mesh sieve into a measuring glass, pressing on solids; discard solids. Chill cream until very cold, about 30 minutes.",
    "2. Just before cream is ready, heat chocolate in a heatproof bowl set over a saucepan of simmering water (do not let bowl touch water), stirring occasionally, until melted and smooth. (Alternatively, heat in 20-second increments in a microwave, stirring between bursts.) Mix together sweetened condensed milk and salt in a medium bowl.",
    "3. Pour remaining 1 cup cream into infused cream in measuring glass. (You should have 2 cups; add more if needed.) Transfer to a medium bowl. Using an electric mixer, beat cream, starting on low speed and gradually increasing to medium-high as it thickens, until billowy and stiff peaks form, about 4 minutes.",
    "4. Add a dollop of whipped cream to condensed milk mixture and mix in with a rubber spatula (this is just to lighten it so that the next stage—folding—is easier). Add remaining whipped cream, then sift in cocoa powder. Fold in, running spatula down sides and along bottom of bowl, then lifting up through center and over top while rotating bowl to integrate without deflating, until very few streaks of condensed milk mixture remain and cocoa powder is combined.",
    "5. Scrape about one quarter of ice cream base into a loaf pan that’s at least 8½x4½\". Using a fork, drizzle about one third of melted chocolate over. Repeat layering process, finishing with a layer of ice cream base, to create 4 layers of ice cream base total and 3 layers of drizzled chocolate. Cover with plastic wrap or an airtight silicone lid and freeze until solid, at least 8 hours.",
    "6. To serve, transfer loaf pan to refrigerator and let ice cream soften 10 minutes before scooping into bowls.",
    "7. Do Ahead: Ice cream can be made 1 week ahead. Keep frozen."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_shokolad_tomchilari",
    "ing_tuz",
    "ing_kakao",
    "ing_sut",
    "ing_qaymoq"
  ]
},
{
  "id": "rec_hd_050_7fa63552-fd7",
  "nomi": "Bibingkang Cassava (Cassava Cake)",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Bibingkang Cassava (Cassava Cake) — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "4 egg yolks, beaten, One 1-lb (500 g) package frozen grated cassava, thawed, 1 cup (250 g) jarred macapuno coconut strings, or sweetened shredded coconut, 1½ cups (375 ml) canned unsweetened coconut milk, ½ cup (125 ml) sweetened condensed milk, 4 egg whites",
  "korsatmalari": [
    "1. Preheat the oven to 350°F.",
    "2. To make the cake, combine the egg yolks, cassava, macapuno (or shredded coconut, if using), coconut milk and the ½ cup sweetened condensed milk in a large bowl and mix well.",
    "3. Pour the cake batter into a greased 8 x 8-in (20 x 20-cm) cake pan. The cake batter will appear to be very loose and wet at this point, but don’t worry, the cassava will absorb most of the liquid during baking. Place the cake pan into the oven and bake until the top of the cake appears dry and no liquid is floating on the surface, 45–60 minutes.",
    "4. Meanwhile, to make the topping, whisk together the egg whites and the ¼ cup (65 ml) sweetened condensed milk in a medium bowl until very well incorporated. Although you are using egg whites, don’t be concerned with making a foam or a meringue, just mix until combined.",
    "5. Remove the cake from the oven and evenly pour the topping onto the cake. Return the cake to the oven and bake until the topping sets, about 10 minutes more.",
    "6. Remove the cake from the oven and rest the cake in its pan on a cooling rack. Cool the cake completely before cutting it into squares. The cassava cake can be served at room temperature, or cold out of the refrigerator."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_tuxum",
    "ing_sut"
  ]
},
{
  "id": "rec_hd_051_8d51b849-08e",
  "nomi": "No-Churn Labneh and Lime Ice Cream With Granola",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "No-Churn Labneh and Lime Ice Cream With Granola — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "½ cup labneh (Lebanese strained yogurt) or 1 cup plain whole-milk Greek yogurt, ¾ cup (75 g) granola, 1 (14-oz.) can sweetened condensed milk, Zest and juice of 2 limes, ¾ tsp. kosher salt, 1½ cups heavy cream",
  "korsatmalari": [
    "1. If using Greek yogurt, set a fine-mesh sieve over a bowl; line with cheesecloth. Place yogurt in sieve and let drain in refrigerator 4 hours (you should have ½ cup); discard drained liquid in bowl.",
    "2. Pulse granola in a food processor to break up a bit. (Or roll up in a kitchen towel and gently crush with a rolling pin.)",
    "3. Whisk labneh (or strained yogurt), condensed milk, lime zest and juice, and salt in a medium bowl until smooth.",
    "4. Using an electric mixer, beat cream in a medium bowl, starting on low speed and gradually increasing to medium-high as it thickens, until billowy and stiff peaks form, about 4 minutes.",
    "5. Add a dollop of whipped cream to labneh mixture and mix in with a rubber spatula (this is just to lighten it so that the next stage—folding—is easier). Add remaining whipped cream and fold in, running spatula down sides and along bottom of bowl, then lifting up through center and over top while rotating bowl to integrate without deflating, until very few streaks of labneh mixture remain. Fold in granola; scrape ice cream base into a loaf pan that’s at least 8½x4½\". Cover with plastic wrap or an airtight silicone lid and freeze until solid, at least 8 hours.",
    "6. To serve, transfer loaf pan to refrigerator and let ice cream soften 10 minutes before scooping into bowls.",
    "7. Do Ahead: Ice cream can be made 1 week ahead. Keep frozen."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_pishloq",
    "ing_tuz",
    "ing_sut",
    "ing_qaymoq",
    "ing_laym"
  ]
},
{
  "id": "rec_hd_052_d336d7b5-a97",
  "nomi": "Black-Eyed Pea Burgers With Creamy Barbecue Sauce and Chowchow",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Black-Eyed Pea Burgers With Creamy Barbecue Sauce and Chowchow — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "1 cup amaranth, 2 scallions, coarsely chopped, 2 large crimini or button mushrooms, sliced, 1 small Scotch bonnet or habanero chile, seeds removed, finely chopped, 2 (15-oz.) cans black-eyed peas (not seasoned), rinsed, ½ cup parsley leaves with tender stems",
  "korsatmalari": [
    "1. Cook amaranth, according to package directions. Spread out on a rimmed baking sheet and let cool.",
    "2. Combine scallions, mushrooms, chile, black-eyed peas, parsley, tamari, flaxseed meal, miso, and ½ tsp. salt in a food processor. Sprinkle 1–2 Tbsp. cooled amaranth over mixture and pulse until just combined. Repeat process until all of amaranth has been incorporated. Taste and season purée with pepper and more salt if needed. Scoop onto a parchment-lined baking sheet to make 6 portions (a cookie scoop works great if you’ve got one) and form into patties that match the size of your buns. Freeze 30 minutes.",
    "3. While the patties are chilling, make the sauce. Whisk barbecue sauce, mayonnaise, chili-garlic sauce, mustard, lemon juice, and vinegar in a small bowl to combine. Sauce should taste spicy, tart, and sweet.",
    "4. Heat a large skillet, preferably cast-iron, over medium-low. Pour in oil just to thinly coat bottom of pan. Working in 3 batches to avoid crowding, cook patties, adjusting heat and adding more oil as needed, until browned (a crisp crust should form), about 5 minutes per side. (You can keep patties warm on a fresh parchment-lined baking sheet in a 250° oven if needed.)",
    "5. Build burgers with patties, buns, sauce, and chowchow.",
    "6. Do ahead: Sauce can be made 1 month ahead. Cover and chill. Bring to room temperature before serving."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_tuz",
    "ing_osimlik_yogi",
    "ing_limon",
    "ing_sarimsoq"
  ]
},
{
  "id": "rec_hd_053_f404232a-05c",
  "nomi": "Fried Plantain Chips With Lime Sour Cream and Mango Hot Sauce",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Fried Plantain Chips With Lime Sour Cream and Mango Hot Sauce — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "2 tablespoons sunflower oil or other neutral oil, 4 medium shallots, finely chopped, 3 Scotch Bonnet chiles, or to taste, cored, seeded, and finely chopped (see Note), 3 garlic cloves, chopped, 1 (¼-inch) piece fresh turmeric, peeled and finely chopped, or 1 teaspoon ground turmeric, ¼ cup chopped fresh mango",
  "korsatmalari": [
    "1. Make the mango hot sauce: Heat the oil in a medium pan over low heat. Add the shallots, chiles, garlic, turmeric, and mango and sauté for 5 to 7 minutes, until the aromatics start to soften. Add the salt, vinegar, and ½ cup water. Stir to combine, then cover and simmer until the aromatics are completely softened and the liquid thickens slightly, about 10 minutes.",
    "2. Transfer the mixture to a blender and blend until smooth. Stir in the orange juice and season with more salt to taste. Transfer the hot sauce to a resealable glass jar and refrigerate until ready to use. (The hot sauce will keep for up to 2 weeks.)",
    "3. Make the lime sour cream: In a medium bowl, stir together the sour cream, lime zest and juice, and salt. Refrigerate until ready to serve.",
    "4. Make the plantains: Fill a large Dutch oven or heavy-bottomed pot about two-thirds of the way with vegetable oil. Heat over medium heat until the oil reaches 375°F.",
    "5. With a very sharp knife, peel the plantains, then slice lengthwise about ⅛ inch thick. Working in batches, fry the plantains in the hot oil, flipping occasionally, until golden brown on both sides, 4 to 6 minutes. Using a slotted spoon, transfer to a paper towel–lined plate to drain. Season with salt and pepper.",
    "6. Serve the fried plantains with the mango hot sauce and lime sour cream for dipping."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_smetana",
    "ing_shakar",
    "ing_tuz",
    "ing_osimlik_yogi",
    "ing_qaymoq",
    "ing_laym",
    "ing_sarimsoq"
  ]
},
{
  "id": "rec_hd_054_2a48b078-81a",
  "nomi": "Mississippi Corn Pudding",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Mississippi Corn Pudding — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "5 tablespoons unsalted butter, melted and cooled slightly, plus more for greasing, 2 large eggs, beaten, ⅓ cup sugar, ½ cup whole milk, ¼ cup heavy cream, ¾ cup sour cream",
  "korsatmalari": [
    "1. Set a rack in the lower third of the oven. Preheat the oven to 350°F. Grease a 9 by 13-inch casserole dish with butter, making sure to get in all the corners and sides of the dish.",
    "2. In a medium bowl, whisk together the eggs and sugar until well combined. Add the melted butter, milk, heavy cream, and sour cream and whisk to incorporate.",
    "3. In a large bowl, whisk together the flour, cornmeal, salt, pepper, paprika, and baking soda.",
    "4. Using a spatula, fold the wet ingredients, 1 cup at a time, into the dry ingredients until well combined.",
    "5. Fold in the onion, celery, corn, and cheese.",
    "6. Pour the batter into the prepared baking dish and sprinkle the cracker crumbs on top. Bake the pudding for 30 to 40 minutes, rotating halfway through, until lightly browned on top and the tip of a knife inserted in the center comes out clean."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_smetana",
    "ing_pishloq",
    "ing_shakar",
    "ing_tuxum",
    "ing_piyoz",
    "ing_tuz",
    "ing_sut",
    "ing_qaymoq",
    "ing_makkajoxori_un",
    "ing_saryog",
    "ing_un"
  ]
},
{
  "id": "rec_hd_055_e52eb256-17e",
  "nomi": "Icebox Lemon Pie With Meringue",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Icebox Lemon Pie With Meringue — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "2½ cups graham cracker crumbs, 12 tablespoons (1½ sticks) unsalted butter, melted, ¼ cup sugar, 3 large eggs, separated, Juice of 3 lemons, 1 (14-ounce) can sweetened condensed milk",
  "korsatmalari": [
    "1. Preheat the oven to 300°F. In a medium bowl, combine the graham cracker crumbs, melted butter, and sugar until the crumbs are evenly moistened. Press the mixture into the bottom and sides of a 9-inch pie tin.",
    "2. Cover and chill the egg whites. In a medium bowl, combine the egg yolks, lemon juice, and condensed milk. Mix well and pour over the graham cracker crust.",
    "3. Bake until stiff, about 30 minutes. Let cool to room temperature, then chill for at least 3 hours or up to overnight.",
    "4. When ready to assemble the pie, preheat the oven to 350°F.",
    "5. In the bowl of a stand mixer fitted with the whisk attachment, beat the egg whites and cream of tartar on high speed. With the mixer running, gradually add the sugar and beat until stiff peaks form.",
    "6. Spread the meringue over the pie filling.",
    "7. Bake until the meringue is golden brown, about 12 minutes. Let cool for 30 minutes, then chill for 30 minutes before serving."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_limon",
    "ing_shakar",
    "ing_tuxum",
    "ing_tuz",
    "ing_sut",
    "ing_qaymoq",
    "ing_saryog"
  ]
},
{
  "id": "rec_hd_056_0bef9bf6-326",
  "nomi": "Very Red Velvet Cake With Cream Cheese Icing and Pecans",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Very Red Velvet Cake With Cream Cheese Icing and Pecans — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "2½ cups cake flour, ½ teaspoon baking soda, 2 large eggs, at room temperature, 1½ cups sugar, 1½ cups vegetable oil, 2 tablespoons distilled white vinegar",
  "korsatmalari": [
    "1. To make the cake: Set the oven to 350°F and adjust the rack positions to the middle and top third. Spray three 8-inch round cake pans well with baking spray.",
    "2. Sift the flour with the baking soda.",
    "3. In a large bowl, with an electric mixer on medium speed, beat the eggs well, then beat in the sugar, oil, and vinegar. On low speed, slowly add the flour and beat in well. Add the buttermilk slowly, then the vanilla, and then the food coloring.",
    "4. Pour the batter evenly into the pans and rap them on the countertop several times to eliminate any air bubbles. Bake for 12 minutes, then rotate the pans from shelf to shelf so they bake evenly and bake until the tops spring back when lightly touched, about 25 minutes altogether. Let the cakes cool in the pans on racks for 15 minutes.",
    "5. Run a knife around the sides of the pans and invert the cakes onto the racks to cool completely. Once they’re cool, refrigerate the cakes for 20 to 30 minutes to make icing them easier.",
    "6. To make the icing: Combine everything in a medium bowl and mix well until very smooth. It’s best to use the icing right away, when it’s soft and spreadable.",
    "7. Put one cake layer upside down on a cake plate or cake stand and cover the top evenly with frosting. Add a second layer, right side up, and spread with more frosting. Top with the third layer, right side up, and spread the frosting evenly around the sides of the cake and on top; check for any places where you can see through to the cake. Finally, sprinkle the pecans evenly all over the top of the cake.",
    "8. Once the frosting sets, cut into slices to serve. This cake keeps for up to 2 weeks in a cake keeper, but once it’s ready, people want to dive right in."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_vanilin",
    "ing_pishloq",
    "ing_shakar",
    "ing_tuxum",
    "ing_pekan",
    "ing_osimlik_yogi",
    "ing_sut",
    "ing_qaymoq",
    "ing_saryog",
    "ing_un"
  ]
},
{
  "id": "rec_hd_057_ffa58806-fed",
  "nomi": "Strawberry Balsamic Shortcakes",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Strawberry Balsamic Shortcakes — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "2 cups (400 g) hulled and coined strawberries, 2 tbsp (24 g) pure cane sugar, 3 cups (360 g) whole wheat pastry flour, plus more for dusting, 4 tsp (10 g) baking powder, 3 tbsp (36 g) granulated sugar, 1/2 tsp salt",
  "korsatmalari": [
    "1. To make the strawberries, toss the coined berries and cane sugar together in a bowl. Let them sit for about 20 minutes, or until they start to break down and liquefy.",
    "2. Preheat the oven to 450°F (230°C or gas mark 8) and have a sheet pan lined with parchment nearby.",
    "3. To make the biscuits, in a bowl, stir together the flour, baking powder, granulated sugar and salt. Drizzle over the olive oil, and gently toss with your hands until droplets of oil are dispersed evenly throughout the flour. Add the buttermilk, stirring gently and compressing with your hands until a shaggy dough is formed. Dump out onto a floured work surface and knead until it comes together into a solid mass. Roll it out into a 1¼-inch (3-cm)-thick disk. Using a 3-inch (7.5-cm) biscuit cutter, punch out 6 biscuits, folding and re-rolling the dough if needed. Place the biscuits on the lined sheet tray, brush with more buttermilk, sprinkle with raw sugar if using, and bake for 8 to 10 minutes, or until slightly puffed and golden brown. Remove the biscuits and transfer to a wire rack to cool.",
    "4. To make the balsamic glaze, combine the balsamic vinegar and honey in a saucepan and bring it to a simmer. Cook over medium-low heat for 10 to 15 minutes, or until the liquid reduces by half. Set aside to cool and thicken.",
    "5. To make the whipped cream topping, when you’re ready to serve, beat together the cream and honey in a stand mixer with a whisk attachment, or in a bowl with an electric mixer, until stiff peaks form, about 3 minutes. Split the cooled biscuits in half and spoon on some of the strawberries along with some of their juices so it soaks into the bottom biscuit. Top with a dollop of whipped cream, followed by a drizzle of the balsamic glaze. Top with the other half of the biscuit, and repeat with more strawberries, more cream, and another drizzle of glaze. Repeat with the rest of the biscuits, and serve immediately."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_shakar",
    "ing_tuz",
    "ing_osimlik_yogi",
    "ing_sut",
    "ing_qaymoq",
    "ing_saryog",
    "ing_un"
  ]
},
{
  "id": "rec_hd_058_63c23d47-da9",
  "nomi": "Strawberry Coconut Cake",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Strawberry Coconut Cake — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "2 cups granulated sugar, ¾ cup (1½ sticks) unsalted butter, room temperature, 2 cups fresh strawberries, hulled, 3 large eggs, room temperature, 3 cups sifted all-purpose flour, 3 teaspoons baking powder",
  "korsatmalari": [
    "1. Preheat your oven to 350°F. Liberally prepare 3 9-inch round pans with the nonstick method of your choice.",
    "2. In the bowl of your stand mixer fitted with the whisk attachment, cream together the granulated sugar and butter on medium-high speed until nice and fluffy, about 6 minutes.",
    "3. Meanwhile, place the strawberries in your food processor and purée until smooth. Set aside.",
    "4. With your stand mixer running, add the eggs 1 at a time, combining well after each addition and scraping down the sides and bottom of the bowl as needed.",
    "5. Change your mixer speed to medium-low and add the strawberry purée slowly into the batter. Continue mixing while you tend to the dry ingredients.",
    "6. In a separate medium bowl, whisk together the flour, baking powder, and salt. Slowly add ½ of the flour mixture to your stand mixer bowl. Continue to mix on low speed to combine.",
    "7. Meanwhile, in a small bowl, whisk together the sour cream and oil and add to your stand mixer bowl.",
    "8. Pour in the remaining flour mixture and continue to mix on low until well incorporated. Add the vanilla extract, strawberry extract, and food coloring, if using. Scrape down the sides and bottom of the bowl and mix the batter until just combined. Be careful not to overmix.",
    "9. Evenly pour the batter into the prepared pans and bake for 23 to 28 minutes, or until a toothpick inserted into the center of a layer comes out clean.",
    "10. Let the layers cool in the pans for 10 minutes, then invert onto wire racks. Let cool to room temperature. Lightly cover the layers with foil or plastic wrap so they do not dry out.",
    "11. Clean your stand mixer bowl and whisk attachment. Beat the cream cheese on high speed until it begins to thicken and become fluffy.",
    "12. Turn your mixer down to low speed and carefully add the confectioners’ sugar. Once the sugar is fully incorporated, turn your mixer speed back to high and continue whipping.",
    "13. Add the heavy cream; vanilla extract; coconut extract, if using; and salt and continue to mix until a smooth, light, and fluffy frosting is achieved.",
    "14. Once the layers are completely cooled, place 1 layer on a serving plate. Spread just the top of the layer with ⅓ of the frosting. Add the second layer and spread with another ⅓ of the frosting. Add the final layer, bottom-side up, and spread with the remaining frosting. Frost the top and the side of the cake. Gently pat the side and the top of the cake with coconut flakes. Serve at room temperature."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_smetana",
    "ing_vanilin",
    "ing_qulupnay",
    "ing_pishloq",
    "ing_shakar",
    "ing_tuxum",
    "ing_tuz",
    "ing_osimlik_yogi",
    "ing_qaymoq",
    "ing_saryog",
    "ing_un"
  ]
},
{
  "id": "rec_hd_059_7267a83d-e1f",
  "nomi": "Tea Cakes",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Tea Cakes — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "3 cups all-purpose flour, plus more for the work surface, 1 teaspoon baking powder, ¼ teaspoon baking soda, ½ teaspoon salt, ¼ teaspoon ground or freshly grated nutmeg, 1 stick (4 ounces) butter, at room temperature",
  "korsatmalari": [
    "1. In a bowl, whisk together the flour,baking powder, baking soda, salt, and nutmeg.",
    "2. In a stand mixer fitted with the paddle attachment, cream together the butter and sugar on medium speed until light and fluffy, 2 to 3 minutes. Scrape down the sides of the bowl. Add the eggs, one at a time, beating well after each addition. Scrape down the sides of the bowl again, then beat in the buttermilk and vanilla.",
    "3. Gradually add the flour mixture, beating just until smooth and well blended. Divide the dough in half. Flatten each half into a disc. Wrap in plastic and refrigerate until chilled and slightly stiff, at least 1 hour, but overnight ideally.",
    "4. Preheat the oven to 375°F. Line baking sheets with parchment paper.",
    "5. On a lightly floured surface, working with one portion at a time, roll the dough to a ¼-inch thickness. Cut with a floured 1½-inch round biscuit cutter. Gather the scraps, reroll, and cut again. Sprinkle lightly with demerara sugar. Transfer the tea cakes to the baking sheets and space them about 1 inch apart.",
    "6. Bake until the tea cakes are lightly browned, 8 to 10 minutes. Cool on the pan for 1 minute, then transfer to a wire rack to cool completely. The tea cakes will keep for about 2 weeks in an airtight container."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_vanilin",
    "ing_shakar",
    "ing_tuxum",
    "ing_tuz",
    "ing_sut",
    "ing_saryog",
    "ing_un"
  ]
},
{
  "id": "rec_hd_060_9f679cee-ff1",
  "nomi": "Roasted Strawberry Layer Cake",
  "tayyorlash_vaqti_daq": 40,
  "qiyinlik": "orta",
  "rasm_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "tarif_matni": "Roasted Strawberry Layer Cake — Pazanda AI halal to'plamidan olingan retsept va tayyorlanish bosqichlari.",
  "masalliqlar_matni": "Scant 2 cups (230 g) all-purpose flour, 2½ tsp (11 g) baking powder, 3 tbsp (45 ml) milk, 2 tbsp (30 ml) elderflower cordial, 1 cup (225 g) unsalted butter, 1 cup plus 2 tbsp (230 g) superfine/caster sugar",
  "korsatmalari": [
    "1. Preheat the oven to 350°F (180°C). Grease the base and sides of three deep, round 6-inch (15-cm) cake pans and line the bottoms with parchment paper.",
    "2. To make the cake, sift together the flour and baking powder in a large bowl, and set aside. Mix the milk and elderflower cordial in a small bowl and set aside. Using a stand mixer or electric whisk, beat the butter, sugar and lemon zest for 5 minutes, or until pale and fluffy. Add the eggs one at a time, beating well after each addition. If the mixture looks like it’s starting to curdle, add 1 tablespoon (8 g) of the flour mixture. Turn the mixer speed to low and add half of the flour mixture followed by the milk and elderflower. Stir in the remaining flour and divide the batter equally into the prepared cake pans. Bake the cakes for 35 to 37 minutes, or until a toothpick inserted in the center comes out clean. Let the cakes cool in their pans for 10 minutes before turning them out onto a wire rack to cool completely. Once cool, wrap them tightly in plastic wrap and place in the fridge to firm up.",
    "3. To make the purée, preheat the oven to 375°F (190°C). Slice the stems off the strawberries, cut them in half and put them into a baking dish. Toss the fruit with the sugar and vanilla. Roast the strawberries in the oven for 30 to 40 minutes, stirring once halfway. The strawberries are done once they are soft and fragrant and the juices have turned into a syrup. Leave the strawberries to cool completely before transferring them to a food processor or blender and pulsing until smooth. Store in an airtight container in the fridge until you’re ready to use it.",
    "4. To make the buttercream, add the egg whites and sugar to the bowl of a stand mixer or a heatproof bowl. Make sure there are no traces of grease in the bowl as this will stop the meringue from whipping up. Place the bowl over a saucepan of simmering water, making sure that the base doesn’t touch the water. Whisk the eggs and sugar constantly until the mixture reaches a temperature of about 150°F (65°C). If you don’t have a thermometer, rub a little of the mixture in between your fingers. The eggs should be hot to the touch with all the sugar dissolved.",
    "5. Remove the bowl from the heat and start whisking the egg whites on high speed in a stand mixer fitted with the whisk attachment or with an electric whisk. Beat until the whites are thick and have doubled in volume. Once the bowl is cool to the touch and with the mixer still running, add the butter a piece at a time. The meringue will deflate and will start to look a little runny or curdled. Don’t panic—this is normal. Continue beating until you have added in all of the butter and the mixture is smooth and glossy. If after 10 minutes, your meringue buttercream is still soupy, chill it in the fridge for 20 minutes and then beat again. Add about 1/2 cup (125 g) of the strawberry puree and beat the buttercream for 2 minutes, or until smooth. Leave the buttercream at room temperature until you are ready to assemble.",
    "6. Unwrap the cakes from the fridge and if any of them are domed, level them with a serrated knife or a cake leveler. All the layers need to be completely flat to ensure you don’t end up with a wonky cake. Brush each cake layer with 2 tablespoons (30 ml) of elderflower cordial. Place one layer of cake on a cake board and put this board on a turntable, if using. If your buttercream has firmed up, whip it up again in the mixer until smooth. Add a scoop of buttercream and spread it out evenly with an offset spatula, pushing the buttercream right to the edge (it’s fine if it spills over). Place the next layer on top of the first, but this time add about 1 tablespoon (8 g) of strawberry purée on top of the buttercream layer, leaving about 1 inch (2.5 cm) clear around the edge. Place the last layer topside down to give you a perfectly flat top.",
    "7. Frost the top and sides of the cake with a thin layer of buttercream. Smooth the edges as much as you can with a bench scraper or palette knife. This is the crumb coat layer that will trap any stray crumbs and act as a base for the next layer. Place the cake in the fridge for 20 minutes to firm up before adding another layer of buttercream on the top and sides. Fill a piping bag fitted with an open star nozzle (I’ve used Wilton 8B) with any remaining buttercream and pipe swirls across the edge to make a wreath. Top the cake with fresh strawberries, a drizzle of any leftover puree and fresh elderflower (if in season)."
  ],
  "holat": "nashr",
  "required_ingredient_ids": [
    "ing_vanilin",
    "ing_limon",
    "ing_shakar",
    "ing_tuxum",
    "ing_tuz",
    "ing_sut",
    "ing_saryog",
    "ing_un"
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
