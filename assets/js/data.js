// Контент сайта.
// Видео: лёгкие mp4 из assets/video (делает tools_encode.py) или embed-ссылка YouTube/VK/Rutube.

window.SITE = {
  author: "Дмитрий Рындин",
  role: "Фото · Видео · Дрон · AI",
  contacts: { email: "", telegram: "", phone: "" },

  // Главная — бесконечная лента фото: список в photos.js (делает tools_photos.py)
  photos: [],

  // Видео — шоурил первым, дальше плитка 16:9, затем вертикальные
  showreel: { title: "Шоурил 2026", src: "assets/video/showreel.mp4", poster: "assets/video/posters/showreel.jpg", loop: "assets/video/showreel_loop.mp4?2", en: { title: "Showreel 2026" } },
  videos: [
    {"title": "Экспедиция в Арктику", "sub": "Документальный фильм", "en": {"title": "Arctic Expedition", "sub": "Documentary"}, "src": "https://vkvideo.ru/video_ext.php?oid=-1388&id=456242091&hd=3&autoplay=1", "poster": "assets/video/covers/arctic.jpg", "vertical": false, "dur": 468},
    {"title": "Фитнес-инструктор", "sub": "«Есть такая профессия» для mos.ru", "en": {"title": "Fitness Instructor", "sub": "«There Is Such a Job» for mos.ru"}, "src": "https://vkvideo.ru/video_ext.php?oid=-243082878&id=456239025&hash=5aa038ed7f1f827f&hd=3&autoplay=1", "poster": "assets/video/covers/etp.jpg", "vertical": false, "dur": 159},
    {"title": "Архипелаг Кузова", "sub": "Документальный фильм", "en": {"title": "Kuzova Archipelago", "sub": "Documentary"}, "src": "https://vkvideo.ru/video_ext.php?oid=-224725824&id=456240055&hd=3&autoplay=1", "poster": "assets/video/covers/kuzova.jpg", "vertical": false, "dur": 397},
    {"title": "Альянс РТУ МИРЭА — ФК Торпедо", "sub": "Репортаж", "en": {"title": "RTU MIREA × FC Torpedo Alliance", "sub": "Reportage"}, "src": "https://vkvideo.ru/video_ext.php?oid=-243082878&id=456239022&hash=f56d034de0b5841b&hd=3&autoplay=1", "poster": "assets/video/covers/football.jpg", "vertical": false, "dur": 219},
    {"title": "Новые горизонты", "sub": "Отчётный фильм за год деятельности", "en": {"title": "New Horizons", "sub": "Annual report film"}, "src": "https://vkvideo.ru/video_ext.php?oid=-1388&id=456241430&hd=3&autoplay=1", "poster": "assets/video/covers/horizons.jpg", "vertical": false, "dur": 864},
    {"title": "Русский народный клип", "sub": "Клип · Медиахакатон", "en": {"title": "Russian Folk Music Video", "sub": "Music video · Media hackathon"}, "src": "https://vkvideo.ru/video_ext.php?oid=-243082878&id=456239031&hash=41ab42d0e5ceb011&hd=3&autoplay=1", "poster": "assets/video/covers/russian-clip.jpg", "vertical": false, "dur": 131},
    {"title": "Битва роботов", "sub": "Ролик для mos.ru", "en": {"title": "Robot Battle", "sub": "Video for mos.ru"}, "src": "https://vkvideo.ru/video_ext.php?oid=-243082878&id=456239019&hash=fdea1dd3532dd36c&hd=3&autoplay=1", "poster": "assets/video/covers/robots-mos-photo.jpg", "vertical": false, "dur": 32},
    {"title": "Фишт. Кавказ", "sub": "Экспедиционный фильм", "en": {"title": "Fisht. Caucasus", "sub": "Expedition film"}, "src": "https://vkvideo.ru/video_ext.php?oid=-224725824&id=456240273&hd=3&autoplay=1", "poster": "assets/video/covers/kavkaz.jpg", "vertical": false, "dur": 916},
    {"title": "Поколение вызовов", "sub": "Промо-ролик, медиахакатон", "en": {"title": "Generation of Challenges", "sub": "Promo, media hackathon"}, "src": "https://vkvideo.ru/video_ext.php?oid=-243082878&id=456239020&hash=a9f8b1e214ceb08f&hd=3&autoplay=1", "poster": "assets/video/covers/pokolenie.jpg", "vertical": false, "dur": 57},
    {"title": "Земля Леопарда", "sub": "Экспедиция", "en": {"title": "Land of the Leopard", "sub": "Expedition"}, "src": "https://vkvideo.ru/video_ext.php?oid=-243082878&id=456239017&hash=59e75ec6510629fa&hd=3&autoplay=1", "poster": "assets/video/covers/leopard.jpg", "vertical": false, "dur": 133},
    {"title": "Алтай", "sub": "Экспедиция", "en": {"title": "Altai", "sub": "Expedition"}, "src": "https://vkvideo.ru/video_ext.php?oid=-243082878&id=456239032&hash=ae682c931334d190&hd=3&autoplay=1", "poster": "assets/video/covers/altai.jpg", "vertical": false, "dur": 119},
    {"title": "Зимний Байкал", "sub": "Экспедиция", "en": {"title": "Winter Baikal", "sub": "Expedition"}, "src": "https://vkvideo.ru/video_ext.php?oid=-1388&id=456241793&hd=3&autoplay=1", "poster": "assets/video/covers/baikal.jpg", "vertical": false, "dur": 284},
    {"title": "Небо над землёй", "sub": "Клип из похода на Фишт", "en": {"title": "Sky Above the Earth", "sub": "Music video from the Fisht trek"}, "src": "https://vkvideo.ru/video_ext.php?oid=-243082878&id=456239018&hash=ee58c4288ece0fea&hd=3&autoplay=1", "poster": "assets/video/covers/fisht-clip.jpg", "vertical": false, "dur": 78},
    {"title": "«Общажный повар». Спецвыпуск", "sub": "Шоу · режиссёр, продюсер, 15+ выпусков", "en": {"title": "«Dorm Cook». Special Episode", "sub": "Show · director, producer, 15+ episodes"}, "src": "https://vkvideo.ru/video_ext.php?oid=-1388&id=456242558&hd=3&autoplay=1", "poster": "assets/video/covers/povar-tandoor.jpg", "vertical": false, "dur": 488},
  ],
  reels: [
    {"title": "Клип+@mirea_official", "sub": "Вертикальный контент", "en": {"title": "Clip + @mirea_official", "sub": "Vertical content"}, "src": "https://vkvideo.ru/video_ext.php?oid=-1388&id=456242873&hd=3&autoplay=1", "poster": "assets/video/posters/v13.jpg", "vertical": true, "dur": 6},
    {"title": "TikTok РТУ МИРЭА", "sub": "Вертикальный контент", "en": {"title": "RTU MIREA TikTok", "sub": "Vertical content"}, "src": "https://vkvideo.ru/video_ext.php?oid=-1388&id=456242703&hd=3&autoplay=1", "poster": "assets/video/posters/v19.jpg", "vertical": true, "dur": 6},
    {"title": "TikTok РТУ МИРЭА", "sub": "Вертикальный контент", "en": {"title": "RTU MIREA TikTok", "sub": "Vertical content"}, "src": "https://vkvideo.ru/video_ext.php?oid=-1388&id=456242714&hd=3&autoplay=1", "poster": "assets/video/posters/v22.jpg", "vertical": true, "dur": 7},
  ],

  // Проекты — список → детальная страница project.html?id=...
  projects: [
    { id: "arctic", title: "Арктика", subtitle: "Остров Колгуев", lead: "Экспедиция и документальный фильм",
      en: { title: "Arctic", subtitle: "Kolguev Island", lead: "Expedition and documentary film" }, cover: "assets/img/projects/arctic/card.jpg", photos: [], videos: [] },
    { id: "kuzova", title: "Кузова", subtitle: "Архипелаг, Белое море", lead: "Морская экспедиция и документальный фильм",
      en: { title: "Kuzova", subtitle: "Archipelago, White Sea", lead: "Sea expedition and documentary film" }, cover: "assets/img/projects/kuzova.jpg", photos: [], videos: [] },
    { id: "yanao", title: "ЯНАО", subtitle: "Снегоходная экспедиция по Ямалу", lead: "Зимняя экспедиция и документальный фильм",
      en: { title: "Yamal", subtitle: "Snowmobile expedition", lead: "Winter expedition and documentary film" }, cover: "assets/img/projects/yanao/card.jpg", photos: [], videos: [] },
    { id: "altai", title: "Южный Алтай", subtitle: "Путешествие в Джазатор", lead: "Фото- и видеоконтент для Russia Discovery",
      en: { title: "Southern Altai", subtitle: "Journey to Dzhazator", lead: "Photo and video content for Russia Discovery" }, cover: "assets/img/projects/altai/card.jpg", photos: [], videos: [] }
  ],

  // Об авторе (RU + en). Точки карты: lat/lon, home — дом (Москва).
  about: {
    photo: "assets/img/projects/arctic/author.jpg",
    photoPos: "85% 40%",
    role: "Фотограф и видеограф · Москва",
    lead: "Снимаю экспедиции по всей России — от Арктики до Дальнего Востока — и городские проекты: репортажи, портреты, промо и рекламу. Больше пяти лет в съёмке, в студии и в поле.",
    text: [
      "Больше трёх лет работал в отделе видеопроизводства РТУ МИРЭА: снимал первых лиц университета, медийных и государственных персон, делал документальные мини-фильмы, рекламу и репортажи, собирал фотобанк университета — от идеи и мудбордов до подбора героев, реквизита и контроля качества.",
      "Работаю полным циклом — от подготовки и съёмки до монтажа, цветокоррекции и обработки фото, активно работаю с нейросетями. Живу в Москве, легко срываюсь в командировки."
    ],
    facts: [["20+", "экспедиций"], ["5+", "лет в съёмке"], ["43° – 69°", "северной широты"]],
    services: ["Репортаж с мероприятий и конференций", "Портретная и постановочная съёмка", "Предметная и интерьерная съёмка", "Фотобанки и контент для брендов", "Тревел и экспедиции", "Репортажные ролики", "Промо и реклама", "Вертикальный контент для соцсетей", "Документальные и экспедиционные фильмы", "Аэросъёмка с дрона", "Монтаж и цветокоррекция", "AI-видео"],
    clients: [
      { name: "РТУ МИРЭА", logo: "assets/img/partners/mirea.png", ar: 1.43 },
      { name: "Команда Арктики", logo: "assets/img/partners/komanda-arktiki.png", ar: 0.82 },
      { name: "Russia Discovery", logo: "assets/img/partners/russia-discovery.svg", ar: 3.77 },
      { name: "Bask", logo: "assets/img/partners/bask.png", ar: 6.95, k: 0.85 },
      { name: "Russian Drift Series", logo: "assets/img/partners/rds.png", ar: 5.09 },
      { name: "mos.ru", logo: "assets/img/partners/mosru.svg", ar: 4.12 },
      { name: "Cosmos Hotel Group", logo: "assets/img/partners/cosmos.svg", ar: 2.57 },
      { name: "Губернаторский центр «Вместе мы сильнее»", logo: "assets/img/partners/gcao.png", ar: 7.14 },
      { name: "Чистый Север — чистая страна", logo: "assets/img/partners/chsch.png", ar: 4.55 }
    ],
    contacts: [["Telegram", "@Vtorn1k", "https://t.me/Vtorn1k"], ["Телефон", "+7 925 810-30-91", "tel:+79258103091"], ["Город", "Москва, готов к командировкам"]],
    places: [
      { name: "Москва", en: "Moscow", lat: 55.75, lon: 37.62, home: true },
      { name: "Арктика, остров Колгуев", en: "Arctic, Kolguev Island", link: "project.html?id=arctic", lat: 69.1, lon: 49.0 },
      { name: "Архипелаг Кузова", en: "Kuzova Archipelago", link: "project.html?id=kuzova", lat: 64.94, lon: 35.13 },
      { name: "Ямал, Полярный Урал", en: "Yamal, Polar Urals", link: "project.html?id=yanao", lat: 66.53, lon: 66.6 },
      { name: "Себежский укрепрайон", en: "Sebezh Fortified Area", lat: 56.29, lon: 28.48 },
      { name: "Селижарово", en: "Selizharovo", lat: 56.85, lon: 33.45 },
      { name: "Автопробег, Минск", en: "Road trip, Minsk", lat: 53.9, lon: 27.56 },
      { name: "Автопробег, Волгоград", en: "Road trip, Volgograd", lat: 48.71, lon: 44.51 },
      { name: "Крым", en: "Crimea", lat: 44.5, lon: 34.17 },
      { name: "Фишт, Кавказ", en: "Fisht, Caucasus", lat: 43.96, lon: 39.92 },
      { name: "Эльбрус", en: "Elbrus", lat: 43.35, lon: 42.44 },
      { name: "Висимский заповедник", en: "Visim Reserve", lat: 57.4, lon: 59.6 },
      { name: "Байконур", en: "Baikonur", lat: 45.62, lon: 63.31 },
      { name: "Алтай: Катунский заповедник", en: "Altai: Katun Reserve", lat: 49.9, lon: 86.4 },
      { name: "Южный Алтай, Джазатор", en: "Southern Altai, Dzhazator", link: "project.html?id=altai", lat: 49.71, lon: 87.43 },
      { name: "Хакасия, заимка Агафьи Лыковой", en: "Khakassia, Agafya Lykova's homestead", lat: 51.43, lon: 88.82 },
      { name: "Зимний Байкал", en: "Winter Baikal", lat: 53.15, lon: 107.35 },
      { name: "Забайкальский нацпарк", en: "Zabaikalsky National Park", lat: 53.55, lon: 108.9 },
      { name: "Баргузинский заповедник", en: "Barguzin Reserve", lat: 54.5, lon: 109.7 },
      { name: "Земля Леопарда", en: "Land of the Leopard", lat: 43.1, lon: 131.4 },
      { name: "Сахалин", en: "Sakhalin", lat: 46.96, lon: 142.73 },
      { name: "Камчатка", en: "Kamchatka", lat: 53.02, lon: 158.65 },
      { name: "Командорские острова", en: "Commander Islands", lat: 55.2, lon: 165.98 }
    ],
    en: {
      role: "Photographer and videographer · Moscow",
      lead: "I film expeditions across Russia — from the Arctic to the Far East — and city projects: reportage, portraits, promo and advertising. More than five years behind the camera, in the studio and in the field.",
      text: [
        "For over three years I worked in the video production department at RTU MIREA: filming university leadership, media and public figures, making short documentaries, ads and reportage, and putting together the university photo bank — from ideas and moodboards to casting, props and quality control.",
        "I work the full cycle — from preparation and shooting to editing, colour grading and photo retouching, and actively work with AI tools. Based in Moscow, always ready to travel."
      ],
      facts: [["20+", "expeditions"], ["5+", "years of shooting"], ["43° – 69°", "north latitude"]],
      services: ["Event and conference reportage", "Portrait and staged shoots", "Product and interior photography", "Photo banks and brand content", "Travel and expeditions", "Reportage videos", "Promo and advertising", "Vertical content for social media", "Documentary and expedition films", "Drone footage", "Editing and colour grading", "AI video"],
      contacts: [["Telegram", "@Vtorn1k", "https://t.me/Vtorn1k"], ["Phone", "+7 925 810-30-91", "tel:+79258103091"], ["City", "Moscow, ready to travel"]]
    }
  },
  // AI — отдельная плитка
  ai: [
  ]
};
