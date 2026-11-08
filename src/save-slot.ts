import type { Locale, ProjectCopy } from './content.ts';

export const saveSlotCopy = {
  "en": {
    "category": "INTERACTIVE WEB EXPERIENCE",
    "title": "Six worlds.\nOne playable shelf.",
    "summary": "A retro game shelf that opens into six playable worlds. Browse 3D boxes, insert a cartridge into the console, then play a complete Canvas2D mini-game.",
    "alt": "Actual SAVE SLOT shelf with six game boxes and the selected MOSS SIGNAL cartridge",
    "detailAlt": "Actual SAVE SLOT console running MOSS SIGNAL with movement, activation and pause controls",
    "input": "Choose a world by dragging, with the arrows or the six selection buttons. Open its box, insert the cartridge and play with keyboard or touch controls. The interface supports English and Russian.",
    "output": "Six distinct mini-games with objectives, hazards and a finish, a reversible shelf-to-console sequence, an enlarged game view, pause and confirmed restart.",
    "decisions": [
      "One persistent Three.js scene keeps the shelf, opening boxes and cartridge insertion connected. GSAP drives the reversible sequence. The procedural box geometry uses supplied artwork; the console is an AI-generated asset cleaned in Blender.",
      "Canvas2D powers all six games and feeds the console screen. A larger flat view and a playable light fallback keep gameplay available without WebGL.",
      "Each cartridge keeps independent progress in the current tab/session. A same-tab reload can restore it; blocked storage falls back to page memory. It is not a permanent or cloud save."
    ],
    "limit": "Independent AI-assisted portfolio concept, not a commercial release or client project. Six complete small games, not a full game platform. Progress belongs to the current browser tab/session and is not guaranteed after closing it. The app supports RU/EN; this case also has a Kazakh translation. Checks use Chrome and emulated touch; physical phones, Safari and Firefox remain untested.",
    "caption": "Actual public SAVE SLOT capture: the six-box shelf with MOSS SIGNAL selected."
  },
  "ru": {
    "category": "ИНТЕРАКТИВНЫЙ ВЕБ-ОПЫТ",
    "title": "Шесть миров.\nОдна игровая полка.",
    "summary": "Ретро-полка, из которой открываются шесть игровых миров. Выберите коробку в 3D, вставьте картридж в консоль и пройдите полноценную мини-игру на Canvas2D.",
    "alt": "Настоящая полка SAVE SLOT: шесть игровых коробок и выбранный картридж MOSS SIGNAL",
    "detailAlt": "Настоящая консоль SAVE SLOT с игрой MOSS SIGNAL, управлением, активацией и паузой",
    "input": "Выберите мир перетаскиванием, стрелками или одной из шести кнопок. Откройте коробку, вставьте картридж и играйте с клавиатуры или сенсорными кнопками. Интерфейс доступен на русском и английском.",
    "output": "Шесть разных мини-игр с задачами, препятствиями и финалом, обратимый переход от полки к консоли, увеличенный экран игры, пауза и перезапуск с подтверждением.",
    "decisions": [
      "Одна постоянная сцена Three.js связывает полку, открытие коробок и вставку картриджа. GSAP управляет обратимой последовательностью. Процедурная геометрия коробок использует подготовленные иллюстрации; модель консоли создана с ИИ и доработана в Blender.",
      "Все шесть игр работают на Canvas2D, который также передаёт изображение экрану консоли. Увеличенный плоский экран и лёгкий режим сохраняют возможность играть без WebGL.",
      "Каждый картридж хранит независимый прогресс в текущей вкладке/сессии. Перезагрузка той же вкладки может его восстановить; при недоступном хранилище остаётся память страницы. Это не постоянное и не облачное сохранение."
    ],
    "limit": "Самостоятельный концепт для портфолио, созданный с ИИ, а не коммерческий релиз или клиентский заказ. Шесть завершённых небольших игр, не игровая платформа. Прогресс привязан к текущей вкладке/сессии и не гарантируется после её закрытия. Приложение поддерживает RU/EN; кейс также переведён на казахский. Проверены Chrome и эмуляция касаний; физические телефоны, Safari и Firefox не проверялись.",
    "caption": "Реальный снимок опубликованного SAVE SLOT: полка из шести коробок, выбран MOSS SIGNAL."
  },
  "kk": {
    "category": "ИНТЕРАКТИВТІ ВЕБ-ТӘЖІРИБЕ",
    "title": "Алты әлем.\nБір ойын сөресі.",
    "summary": "Алты ойын әлемін ашатын ретро сөре. 3D қорапты таңдап, картриджді консольге салыңыз да, Canvas2D шағын ойынын соңына дейін ойнаңыз.",
    "alt": "SAVE SLOT қолданбасындағы алты ойын қорабы және таңдалған MOSS SIGNAL картриджі бар нақты сөре",
    "detailAlt": "MOSS SIGNAL ойыны, қозғалу, белсендіру және кідірту батырмалары бар нақты SAVE SLOT консолі",
    "input": "Әлемді сүйреу, бағыттауыштар немесе алты батырма арқылы таңдаңыз. Қорапты ашып, картриджді салыңыз және пернетақтамен не сенсорлық батырмалармен ойнаңыз. Қолданба орыс және ағылшын тілдерінде жұмыс істейді.",
    "output": "Мақсаттары, кедергілері және аяқталуы бар алты бөлек шағын ойын, сөреден консольге қайтымды ауысу, үлкейтілген ойын экраны, кідірту және растаумен қайта бастау.",
    "decisions": [
      "Бір тұрақты Three.js сахнасы сөрені, қораптардың ашылуын және картридждің салынуын байланыстырады. GSAP қайтымды қозғалысты басқарады. Қораптардың процедуралық геометриясы дайын суреттерді қолданады; консоль моделі ЖИ көмегімен жасалып, Blender-де өңделген.",
      "Алты ойын Canvas2D арқылы жұмыс істейді, ол консоль экранына да кескін береді. Үлкен жазық экран және жеңіл режим WebGL болмаса да ойнауға мүмкіндік береді.",
      "Әр картридж ағымдағы қойынды/сессияда өз прогресін бөлек сақтайды. Сол қойындыны қайта жүктегенде оны қалпына келтіруге болады; сақтау қолжетімсіз болса, бет жады қолданылады. Бұл тұрақты не бұлттық сақтау емес."
    ],
    "limit": "ЖИ көмегімен жасалған дербес портфолио концепті, коммерциялық релиз не клиенттік тапсырыс емес. Алты аяқталған шағын ойын, толық ойын платформасы емес. Прогресс ағымдағы қойынды/сессияға тиесілі және ол жабылғаннан кейін сақталуына кепілдік жоқ. Қолданба RU/EN тілдерін қолдайды; кейс қазақ тіліне де аударылған. Chrome мен сенсорлық басқару эмуляциясы тексерілген; нақты телефондар, Safari және Firefox тексерілмеген.",
    "caption": "Жарияланған SAVE SLOT қолданбасының нақты скриншоты: алты қорапты сөре, MOSS SIGNAL таңдалған."
  }
} satisfies Record<Locale, ProjectCopy>;

export const saveSlotNotes = {
  "en": {
    "problem": "For someone who wants to explore a small interactive world, rather than stop at a product animation. The physical box-to-console ritual leads to a game that can actually be completed.",
    "role": "I define the concept, visual direction and interaction brief, guide AI-assisted implementation and review the result. The code and automated checks were prepared with AI. The console began as an AI-generated model and was cleaned in Blender; I do not claim hand-modeling or unaided coding.",
    "choices": [
      "One persistent Three.js scene keeps the shelf, opening boxes and cartridge insertion connected. GSAP drives the reversible sequence. The procedural box geometry uses supplied artwork; the console is an AI-generated asset cleaned in Blender.",
      "Canvas2D powers all six games and feeds the console screen. A larger flat view and a playable light fallback keep gameplay available without WebGL.",
      "Each cartridge keeps independent progress in the current tab/session. A same-tab reload can restore it; blocked storage falls back to page memory. It is not a permanent or cloud save."
    ],
    "fix": "The six-game audit found that blocked storage lost cartridge progress on switching, long-running reverse traffic left the DUSK route, and a second touch did not reliably activate MOSS. Page-scoped snapshots, positive cyclic traffic wrapping and pointer-press actions were added and checked separately. The repository records full playthroughs and the limits of emulated touch.",
    "scenario": "Choose MOSS SIGNAL → open the box → insert the cartridge → restore three beacons → reach the portal → return to the shelf. Try the enlarged screen, pause or a same-tab reload along the way."
  },
  "ru": {
    "problem": "Для того, кто хочет исследовать небольшой интерактивный мир, а не остановиться на продуктовой анимации. Путь от коробки к консоли заканчивается игрой, которую действительно можно пройти.",
    "role": "Моя роль: концепция, визуальное направление и постановка интерактивного сценария, направление AI-assisted реализации и оценка результата. Код и автоматизированные проверки подготовлены с ИИ. Модель консоли создана с ИИ и доработана в Blender; я не приписываю себе ручное моделирование или код без помощи ИИ.",
    "choices": [
      "Одна постоянная сцена Three.js связывает полку, открытие коробок и вставку картриджа. GSAP управляет обратимой последовательностью. Процедурная геометрия коробок использует подготовленные иллюстрации; модель консоли создана с ИИ и доработана в Blender.",
      "Все шесть игр работают на Canvas2D, который также передаёт изображение экрану консоли. Увеличенный плоский экран и лёгкий режим сохраняют возможность играть без WebGL.",
      "Каждый картридж хранит независимый прогресс в текущей вкладке/сессии. Перезагрузка той же вкладки может его восстановить; при недоступном хранилище остаётся память страницы. Это не постоянное и не облачное сохранение."
    ],
    "fix": "Проверка шести игр выявила потерю прогресса при смене картриджа с заблокированным хранилищем, уход встречного транспорта с маршрута DUSK после долгой игры и ненадёжную активацию MOSS вторым касанием. Добавлены независимые снимки в памяти страницы, корректное циклическое движение и действие при нажатии указателя. Полные прохождения и ограничения эмуляции касаний описаны в репозитории.",
    "scenario": "Выберите MOSS SIGNAL → откройте коробку → вставьте картридж → восстановите три маяка → дойдите до портала → вернитесь на полку. По пути попробуйте увеличенный экран, паузу или перезагрузку той же вкладки."
  },
  "kk": {
    "problem": "Өнім анимациясын көрумен шектелмей, шағын интерактивті әлемді зерттегісі келетін адамға арналған. Қораптан консольге дейінгі әрекеттер шынымен аяқтауға болатын ойынға алып келеді.",
    "role": "Мен концепцияны, визуалды бағытты және интерактивті сценарийді анықтап, ЖИ көмегімен іске асыруды бағыттаймын және нәтижені бағалаймын. Код пен автоматты тексерулер ЖИ көмегімен дайындалды. Консоль моделі ЖИ көмегімен жасалып, Blender-де өңделген; қолмен модельдеу немесе ЖИ көмегінсіз код жазу туралы мәлімдеме жасамаймын.",
    "choices": [
      "Бір тұрақты Three.js сахнасы сөрені, қораптардың ашылуын және картридждің салынуын байланыстырады. GSAP қайтымды қозғалысты басқарады. Қораптардың процедуралық геометриясы дайын суреттерді қолданады; консоль моделі ЖИ көмегімен жасалып, Blender-де өңделген.",
      "Алты ойын Canvas2D арқылы жұмыс істейді, ол консоль экранына да кескін береді. Үлкен жазық экран және жеңіл режим WebGL болмаса да ойнауға мүмкіндік береді.",
      "Әр картридж ағымдағы қойынды/сессияда өз прогресін бөлек сақтайды. Сол қойындыны қайта жүктегенде оны қалпына келтіруге болады; сақтау қолжетімсіз болса, бет жады қолданылады. Бұл тұрақты не бұлттық сақтау емес."
    ],
    "fix": "Алты ойынды тексеру сақтау бұғатталғанда картридж ауысуымен прогрестің жоғалуын, ұзақ ойнағаннан кейін DUSK көлігінің жолдан шығуын және MOSS-та екінші саусақпен белсендірудің тұрақсыздығын анықтады. Бет жадындағы бөлек күйлер, дұрыс циклдік қозғалыс және басқан сәтте орындалатын әрекет қосылды. Толық өту нәтижелері мен сенсорлық эмуляция шектері репозиторийде жазылған.",
    "scenario": "MOSS SIGNAL таңдаңыз → қорапты ашыңыз → картриджді салыңыз → үш маякты қалпына келтіріңіз → порталға жетіңіз → сөреге оралыңыз. Үлкен экранды, кідіртуді немесе сол қойындыны қайта жүктеуді байқап көріңіз."
  }
};
