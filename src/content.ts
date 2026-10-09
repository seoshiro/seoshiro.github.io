import {orbitCopy} from "./orbit.ts";
import {recentCopy} from "./recent.ts";
export const locales = ["en", "ru", "kk"] as const;
export type Locale = (typeof locales)[number];
export function validLocale(value: string | null): Locale | null {
  return locales.includes(value as Locale) ? (value as Locale) : null;
}
export const projects = [
  {id:"orbit",name:"ORBIT",category:"EDUCATIONAL TOOLS",stack:["TypeScript","Three.js","Orbital mechanics","LocalStorage"],live:"https://seoshiro.github.io/orbit-studio/",source:"https://github.com/seoshiro/orbit-studio",evidence:"https://github.com/seoshiro/orbit-studio/blob/main/docs/VERIFICATION.md",color:"#c1afff",width:1440,height:1000},
  {id:"reson",name:"RESON",category:"01 / PRODUCT DESIGN TOOLS",stack:["TypeScript","Three.js","WebGL","LocalStorage"],live:"https://seoshiro.github.io/reson-studio/",source:"https://github.com/seoshiro/reson-studio",evidence:"https://github.com/seoshiro/reson-studio/blob/main/docs/AUDITS.md",color:"#b68962",width:1440,height:1000},
  {id:"lumen",name:"LUMEN",category:"02 / INTERACTIVE PRODUCT STUDIES",stack:["TypeScript","Three.js","WebGL","Scroll choreography"],live:"https://seoshiro.github.io/lumen-lens/",source:"https://github.com/seoshiro/lumen-lens",evidence:"https://github.com/seoshiro/lumen-lens/blob/main/README.md",color:"#bdb5a3",width:1440,height:1000},
  {
    id: "perch",
    name: "PERCH",
    category: "01 / SPATIAL TOOLS",
    stack: ["React", "TypeScript", "Three.js", "SVG"],
    live: "https://seoshiro.github.io/perch-studio/",
    source: "https://github.com/seoshiro/perch-studio",
    evidence: "https://github.com/seoshiro/perch-studio/blob/main/docs/AUDITS.md",
    color: "#b9c18f",
    width: 1440,
    height: 1000,
  },
  {
    id: "forme",
    name: "FORME",
    category: "02 / VISUAL DIRECTION",
    stack: ["React", "TypeScript", "Web Workers", "IndexedDB"],
    live: "https://forme-studio-coral.vercel.app/",
    source: "https://github.com/seoshiro/forme-studio",
    evidence:
      "https://github.com/seoshiro/forme-studio/blob/main/docs/ENGINEERING.md",
    color: "#b49c82",
    width: 1440,
    height: 1000,
  },
  {
    id: "selvedge",
    name: "SELVEDGE",
    category: "03 / CREATIVE TOOLS",
    stack: ["React", "TypeScript", "Canvas", "IndexedDB"],
    live: "https://seoshiro.github.io/selvedge-studio/",
    source: "https://github.com/seoshiro/selvedge-studio",
    evidence:
      "https://github.com/seoshiro/selvedge-studio/blob/main/docs/VERIFICATION.md",
    color: "#aec2b3",
    width: 1440,
    height: 1000,
  },
  {
    id: "guidecheck",
    name: "GuideCheck",
    category: "04 / REVIEW SYSTEMS",
    stack: ["TypeScript", "IndexedDB", "SQLite", "Playwright"],
    live: "https://seoshiro.github.io/guidecheck/",
    source: "https://github.com/seoshiro/guidecheck",
    evidence: "https://github.com/seoshiro/guidecheck/blob/main/VALIDATION.md",
    color: "#a3b9cf",
    width: 1440,
    height: 1000,
  },
  {
    id: "archiveguard",
    name: "ArchiveGuard",
    category: "05 / FILE INTEGRITY",
    stack: ["TypeScript", "Web Workers", "Web Crypto", "EXIF"],
    live: "https://seoshiro.github.io/archiveguard/",
    source: "https://github.com/seoshiro/archiveguard",
    evidence:
      "https://github.com/seoshiro/archiveguard/blob/main/docs/VALIDATION.md",
    color: "#bdaccc",
    width: 1440,
    height: 1000,
  },
] as const;
export type ProjectId = (typeof projects)[number]["id"];
export const dimensions: Record<
  ProjectId,
  {
    main: [number, number];
    preview: [number, number];
    detail: [number, number];
  }
> = {
  orbit: {main:[1440,1000],preview:[1440,1000],detail:[1440,1000]},
  reson: {main:[1440,1000],preview:[1440,1000],detail:[1440,1000]},
  lumen: {main:[1440,1000],preview:[1440,1000],detail:[1440,1000]},
  perch: { main: [1440, 1000], preview: [1440, 1000], detail: [980, 620] },
  forme: { main: [1366, 820], preview: [1366, 820], detail: [1366, 1518] },
  selvedge: { main: [1440, 1000], preview: [1440, 1000], detail: [850, 822] },
  guidecheck: { main: [1440, 1866], preview: [1440, 1050], detail: [390, 870] },
  archiveguard: {
    main: [1280, 2209],
    preview: [1220, 820],
    detail: [1280, 1475],
  },
};
export interface ProjectCopy {
  category: string;
  title: string;
  summary: string;
  alt: string;
  detailAlt: string;
  input: string;
  output: string;
  decisions: [string, string, string];
  limit: string;
  caption: string;
}
export interface Copy {
  title: string;
  description: string;
  skip: string;
  work: string;
  about: string;
  contact: string;
  language: string;
  motion: string;
  motionOff: string;
  motionOn: string;
  eyebrow: string;
  name: string;
  heroLine: string;
  intro: string;
  viewWork: string;
  heroFoot: string;
  selected: string;
  selectedNote: string;
  caseStudy: string;
  live: string;
  source: string;
  role: string;
  roleText: string;
  input: string;
  output: string;
  engineering: string;
  boundaries: string;
  evidence: string;
  back: string;
  next: string;
  aboutLabel: string;
  aboutTitle: string;
  aboutText: string;
  principles: [
    { title: string; text: string },
    { title: string; text: string },
    { title: string; text: string },
  ];
  contactTitle: string;
  contactText: string;
  github: string;
  footer: string;
  imageFailed: string;
  project: Record<ProjectId, ProjectCopy>;
}
export const copy: Record<Locale, Copy> = {
  en: {
    title: "Beibars Ileskhan — developer & interface maker",
    description:
      "Selected web projects by Beibars Ileskhan (seoshiro): creative tools, careful data handling, and interfaces with a point of view.",
    skip: "Skip to content",
    work: "Work",
    about: "About",
    contact: "Contact",
    language: "Language",
    motion: "Animation",
    motionOff: "Pause animation",
    motionOn: "Play animation",
    eyebrow: "DEVELOPER / INTERFACE MAKER",
    name: "Beibars Ileskhan",
    heroLine: "Useful by design.",
    intro:
      "I build web interfaces and browser tools. My recent projects help organize creative work, review changes, and handle files with care.",
    viewWork: "Explore the work",
    heroFoot: "Independent projects. Open source. Built for the browser.",
    selected: "Selected work",
    selectedNote: "Eight projects. Different problems. The same attention to detail.",
    caseStudy: "Inside the project",
    live: "Live project",
    source: "Source code",
    role: "PROJECT CONTEXT",
    roleText:
      "Independent portfolio project. Implementation, design decisions, and verification are documented in the source repository.",
    input: "Starting point",
    output: "What you leave with",
    engineering: "Under the surface",
    boundaries: "Practical boundaries",
    evidence: "Read the verification notes",
    back: "All projects",
    next: "Next project",
    aboutLabel: "A BIT ABOUT MY APPROACH",
    aboutTitle: "The details are\nthe work.",
    aboutText:
      "I’m Beibars, also known as seoshiro. My projects sit between expressive interfaces and practical browser tools. I like taking something scattered—references, revisions, files—and giving it a clear shape.",
    principles: [
      {
        title: "Make the next step clear.",
        text: "A good interface helps you understand what you have, what changed, and what to do next.",
      },
      {
        title: "Treat data with care.",
        text: "Visible saves, bounded imports, and portable backups make a small tool easier to trust.",
      },
      {
        title: "Make it feel considered.",
        text: "Typography, motion, and keyboard behavior belong in the same conversation as the code.",
      },
    ],
    contactTitle: "Let’s make\nsomething useful.",
    contactText: "Find my projects and start a conversation on GitHub.",
    github: "Find me on GitHub",
    footer: "Built with attention. Shared with the source.",
    imageFailed:
      "Project screenshot unavailable. The case study and live project are still accessible.",
    project: {
      ...recentCopy.en,
      orbit: orbitCopy.en,
      perch: {
        category: "SPATIAL TOOLS",
        title: "A room.\nA few possibilities.",
        summary:
          "A local-first furniture planner with linked 2D and 3D views. Shape the room, arrange 12 parametric furniture types, and compare layouts before moving anything.",
        alt: "Actual PERCH studio showing a furnished living room in 3D beside its dimensioned 2D plan",
        detailAlt: "Actual PERCH comparison of two independently editable living-room layouts",
        input:
          "A rectangular room, its measurements and openings, and furniture you want to make space for.",
        output:
          "Editable layout alternatives, fit notes, a portable JSON project, a dimensioned SVG plan, a 3D PNG, and a printable room report.",
        decisions: [
          "One room model drives the SVG plan and original Three.js furniture. Numeric edits, plan dragging, and 3D selection stay in sync.",
          "Rotated footprints, room bounds, ceiling height, and inward door swings produce fit warnings. Copies remain independent; undo and redo preserve the editing history.",
          "Browser-local saves include a recovery backup. Rendering runs on demand; the plan and forms remain usable without WebGL. The whole workspace supports English, Russian, and Kazakh.",
        ],
        limit:
          "A furnishing study for rectangular rooms, not a construction or safety document. Materials and light are illustrative; fit notes do not certify walking clearance. No cloud sync or collaboration. Export JSON to move work between devices.",
        caption:
          "Fresh captures of the live studio and two layout alternatives, using its furnished demo room.",
      },
      forme: {
        category: "VISUAL DIRECTION",
        title: "From references\nto a direction.",
        summary:
          "Collect images, compose a moodboard, and carry its colors and typography into a reusable design kit.",
        alt: "Real FORME moodboard editor with architectural references, notes and color swatches",
        detailAlt:
          "FORME design kit with semantic color roles and a typography preview",
        input:
          "A collection of images, notes, links, and an idea that hasn’t quite come together.",
        output:
          "An editable moodboard, a PNG composition, design tokens, CSS variables, and a portable .forme project.",
        decisions: [
          "One document model connects the reference library, composition editor, and design kit.",
          "IndexedDB commits before showing “Saved”; Web Locks and revision checks protect edits across tabs.",
          "Images are processed in a worker. Archive imports validate paths, sizes, CRC, schema, and image ownership.",
        ],
        limit:
          "A fixed 1400 × 1000 board and a single-browser workspace. No cloud collaboration or infinite canvas. The live interface is in Russian.",
        caption:
          "The actual editor and design kit, using the repository’s demo collection.",
      },
      selvedge: {
        category: "CREATIVE TOOLS",
        title: "One graphic.\nA whole collection.",
        summary:
          "An apparel workroom for artwork placement, colorways, revision comparison, and a clear visual handoff.",
        alt: "Real SELVEDGE workroom with an illustrated tee and artwork placement controls",
        detailAlt:
          "SELVEDGE named revision comparison using the original After Hours graphic",
        input:
          "One piece of artwork and several choices about garment color, placement, and scale.",
        output:
          "A coordinated collection, named revisions, a PNG overview, a PDF visual proof, and an editable project file.",
        decisions: [
          "Artwork placement supports both dragging and numeric controls; touch movement is deliberately opt-in.",
          "Transactional local saves and revision checks prevent another tab from silently replacing work.",
          "Canvas exports use the same project geometry as the workroom. The complete interface supports English, Russian, and Kazakh.",
        ],
        limit:
          "A visual proof, not a manufacturing specification or certified print-ready file. Confirm physical dimensions, color, and print method with a printer.",
        caption:
          "Actual workroom and revision screens with original synthetic artwork.",
      },
      guidecheck: {
        category: "REVIEW SYSTEMS",
        title: "What changed.\nWhat was checked.",
        summary:
          "Compare guide revisions and keep human review evidence attached to the exact steps it belongs to.",
        alt: "Real GuideCheck desktop workspace showing instruction revisions and review states",
        detailAlt: "GuideCheck mobile workspace with review controls",
        input:
          "An instruction guide, its next revision, and the need to distinguish a change from a verified result.",
        output:
          "A deterministic comparison, append-only review history, corrections, and portable workspace backups.",
        decisions: [
          "Stable step IDs match revisions. Changed instructions, links, screenshots, and order are explicit.",
          "Review evidence carries forward only when the step and guide context remain exactly unchanged.",
          "The browser edition uses atomic IndexedDB transactions. An optional loopback edition stores the workspace in SQLite.",
        ],
        limit:
          "Reviews are human statements, not automatic verification or independently authenticated proof. The workspace is single-device; it has no collaborative sync.",
        caption: "Repository screenshots of the real browser workspace.",
      },
      archiveguard: {
        category: "FILE INTEGRITY",
        title: "Keep the photo.\nQuestion the metadata.",
        summary:
          "Compare JPEG capture dates with Google Photos sidecars, resolve exceptions, and export verified new copies.",
        alt: "Real ArchiveGuard conflict review comparing JPEG metadata and sidecar capture dates",
        detailAlt: "ArchiveGuard verified export package and audit summary",
        input:
          "Selected JPEGs and JSON sidecars from an unpacked Google Photos export, with dates that may disagree.",
        output:
          "New JPEG copies, a manifest, and CSV/HTML audit reports recording each input and decision.",
        decisions: [
          "Uncertain matches and date conflicts require explicit decisions. Upload dates never stand in for capture dates.",
          "A worker validates bounded JPEG/EXIF structures and prepares the export without re-encoding image pixels.",
          "Independent metadata readback and non-EXIF byte hashes verify copies before a download becomes available.",
        ],
        limit:
          "JPEG sample preflight, not universal archive repair. Originals remain untouched. No ZIP input, HEIC, RAW, timezone inference, or cloud processing.",
        caption:
          "Actual conflict review and export screens using synthetic sample files.",
      },
    },
  },
  ru: {
    title: "Бейбарс Илесхан — разработчик интерфейсов",
    description:
      "Веб-проекты Бейбарса Илесхана (seoshiro): инструменты для творчества, аккуратная работа с данными и продуманные интерфейсы.",
    skip: "К содержимому",
    work: "Проекты",
    about: "Обо мне",
    contact: "Контакт",
    language: "Язык",
    motion: "Анимация",
    motionOff: "Остановить анимацию",
    motionOn: "Включить анимацию",
    eyebrow: "РАЗРАБОТЧИК / АВТОР ИНТЕРФЕЙСОВ",
    name: "Бейбарс Илесхан",
    heroLine: "С пользой.\nСо смыслом.",
    intro:
      "Я создаю веб-интерфейсы и браузерные инструменты. Мои последние проекты помогают организовать творческую работу, разобраться в изменениях и бережно работать с файлами.",
    viewWork: "Смотреть проекты",
    heroFoot: "Личные проекты. Открытый код. Работа в браузере.",
    selected: "Избранные проекты",
    selectedNote: "Восемь проектов. Разные задачи. Одинаковое внимание к деталям.",
    caseStudy: "О проекте",
    live: "Открыть проект",
    source: "Исходный код",
    role: "КОНТЕКСТ ПРОЕКТА",
    roleText:
      "Личный проект для портфолио. Реализация, дизайн и результаты проверок описаны в репозитории.",
    input: "С чего начинается",
    output: "Что получается",
    engineering: "Как устроено",
    boundaries: "Практические ограничения",
    evidence: "Читать результаты проверок",
    back: "Все проекты",
    next: "Следующий проект",
    aboutLabel: "О МОЁМ ПОДХОДЕ",
    aboutTitle: "Работа состоит\nиз деталей.",
    aboutText:
      "Я Бейбарс, в сети — seoshiro. Мои проекты соединяют выразительные интерфейсы с практичными браузерными инструментами. Мне нравится придавать ясную форму тому, что пока разрозненно: референсам, версиям, файлам.",
    principles: [
      {
        title: "Показывать следующий шаг.",
        text: "Интерфейс помогает понять, что у вас есть, что изменилось и что делать дальше.",
      },
      {
        title: "Бережно работать с данными.",
        text: "Понятное сохранение, ограниченный импорт и переносимые резервные копии помогают доверять инструменту.",
      },
      {
        title: "Продумывать всё вместе.",
        text: "Типографика, движение и работа с клавиатуры заслуживают такого же внимания, как код.",
      },
    ],
    contactTitle: "Давайте создадим\nчто-то полезное.",
    contactText: "Мои проекты и возможность связаться со мной — на GitHub.",
    github: "Найти меня на GitHub",
    footer: "С вниманием к деталям. С открытым кодом.",
    imageFailed:
      "Снимок проекта недоступен. Описание и ссылка на проект остаются доступны.",
    project: {
      ...recentCopy.ru,
      orbit: orbitCopy.ru,
      perch: {
        category: "ПРОСТРАНСТВЕННЫЕ ИНСТРУМЕНТЫ",
        title: "Одна комната.\nНесколько вариантов.",
        summary:
          "Локальный планировщик мебели с общими 2D- и 3D-видами. Задайте комнату, расставьте 12 параметрических типов мебели и сравните варианты до перестановки.",
        alt: "Настоящая студия PERCH: меблированная гостиная в 3D рядом с её 2D-планом и размерами",
        detailAlt: "Настоящее сравнение двух независимых вариантов расстановки гостиной в PERCH",
        input:
          "Прямоугольная комната, её размеры и проёмы, а также мебель, для которой нужно найти место.",
        output:
          "Редактируемые варианты расстановки, замечания о размещении, JSON-проект, SVG-план с размерами, PNG из 3D-вида и отчёт для печати.",
        decisions: [
          "Единая модель комнаты управляет SVG-планом и оригинальной мебелью Three.js. Числовые правки, перетаскивание на плане и выбор в 3D синхронизированы.",
          "Поворот мебели, границы комнаты, высота потолка и открывание дверей внутрь учитываются в предупреждениях. Копии независимы; изменения можно отменять и повторять.",
          "Локальное сохранение в браузере включает резервную копию. Сцена рисуется по запросу; план и формы работают без WebGL. Весь интерфейс доступен на английском, русском и казахском.",
        ],
        limit:
          "Эскиз расстановки для прямоугольных комнат, а не строительный документ или оценка безопасности. Материалы и свет условны; замечания не подтверждают нормы проходов. Облачной синхронизации и совместной работы нет. Для переноса на другое устройство экспортируйте JSON.",
        caption:
          "Свежие снимки работающей студии и двух вариантов расстановки на примере её демонстрационной комнаты.",
      },
      forme: {
        category: "ВИЗУАЛЬНОЕ НАПРАВЛЕНИЕ",
        title: "От референсов\nк направлению.",
        summary:
          "Собрать изображения, составить мудборд и перенести его цвета и типографику в дизайн-набор.",
        alt: "Редактор FORME с архитектурными референсами, заметками и цветами",
        detailAlt: "Дизайн-набор FORME с ролями цветов и типографикой",
        input:
          "Изображения, заметки, ссылки и идея, которая ещё не сложилась в целое.",
        output:
          "Редактируемый мудборд, PNG-композиция, дизайн-токены, CSS-переменные и переносимый проект .forme.",
        decisions: [
          "Единая модель документа связывает библиотеку референсов, редактор и дизайн-набор.",
          "Надпись «Сохранено» появляется после транзакции IndexedDB. Web Locks и проверка ревизий защищают изменения между вкладками.",
          "Изображения обрабатываются в worker. Импорт архива проверяет пути, размеры, CRC, схему и принадлежность изображений.",
        ],
        limit:
          "Холст 1400 × 1000 и работа в одном браузере. Нет совместного облачного редактирования или бесконечного холста. Интерфейс проекта на русском.",
        caption:
          "Реальные редактор и дизайн-набор с демонстрационной коллекцией из репозитория.",
      },
      selvedge: {
        category: "ИНСТРУМЕНТЫ ДЛЯ ТВОРЧЕСТВА",
        title: "Одна графика.\nЦелая коллекция.",
        summary:
          "Рабочая среда для размещения графики на одежде, подбора цветов, сравнения версий и визуального согласования.",
        alt: "SELVEDGE с иллюстрацией футболки и настройками размещения графики",
        detailAlt:
          "Сравнение сохранённых версий SELVEDGE с авторской графикой After Hours",
        input:
          "Графика и решения о цвете изделия, размещении и масштабе принта.",
        output:
          "Согласованная коллекция, именованные версии, PNG-обзор, PDF-макет и редактируемый файл проекта.",
        decisions: [
          "Размещение поддерживает перетаскивание и числовые поля. На сенсорном экране перемещение включается отдельно.",
          "Локальные транзакции и проверка ревизий защищают работу от перезаписи другой вкладкой.",
          "Canvas-экспорт использует геометрию проекта. Весь интерфейс доступен на английском, русском и казахском.",
        ],
        limit:
          "Визуальный макет, не производственная спецификация и не сертифицированный печатный файл. Размеры, цвет и способ печати нужно подтвердить с типографией.",
        caption:
          "Реальные экраны рабочей среды и версий с оригинальной демонстрационной графикой.",
      },
      guidecheck: {
        category: "СИСТЕМЫ ПРОВЕРКИ",
        title: "Что изменилось.\nЧто проверили.",
        summary:
          "Сравнение версий инструкций и история ручных проверок, привязанная к конкретным шагам.",
        alt: "GuideCheck на компьютере: версии инструкций и статусы ручной проверки",
        detailAlt: "Мобильный GuideCheck с элементами ручной проверки",
        input:
          "Инструкция, её новая версия и необходимость отличить изменение от проверенного результата.",
        output:
          "Детерминированное сравнение, неизменяемая история проверок, исправления и переносимые резервные копии.",
        decisions: [
          "Постоянные ID связывают шаги между версиями. Изменения текста, ссылок, скриншотов и порядка видны явно.",
          "Результат проверки переносится, только если шаг и контекст инструкции полностью совпадают.",
          "Браузерная версия использует атомарные транзакции IndexedDB. Необязательная локальная версия хранит данные в SQLite.",
        ],
        limit:
          "Проверки — заявления человека, а не автоматическая верификация или независимое подтверждение личности. Нет совместной синхронизации.",
        caption: "Скриншоты настоящей браузерной рабочей среды из репозитория.",
      },
      archiveguard: {
        category: "ЦЕЛОСТНОСТЬ ФАЙЛОВ",
        title: "Сохранить фото.\nПроверить даты.",
        summary:
          "Сравнение дат JPEG с JSON из Google Photos, явное разрешение конфликтов и экспорт проверенных копий.",
        alt: "ArchiveGuard сравнивает метаданные JPEG и даты из JSON",
        detailAlt: "Проверенный пакет экспорта ArchiveGuard и сводка",
        input:
          "Выбранные JPEG и JSON из распакованного экспорта Google Photos с возможными расхождениями дат.",
        output:
          "Новые копии JPEG, манифест и отчёты CSV/HTML с каждым входным файлом и решением.",
        decisions: [
          "Неоднозначные совпадения и конфликты требуют явного решения. Дата загрузки не подменяет дату съёмки.",
          "Worker проверяет ограниченные структуры JPEG/EXIF и готовит экспорт без повторного кодирования пикселей.",
          "Независимое чтение метаданных и хеши байтов вне EXIF проверяют копии до появления скачивания.",
        ],
        limit:
          "Проверка выборки JPEG, не универсальное восстановление архива. Оригиналы не меняются. Нет ZIP-входа, HEIC, RAW, определения часового пояса или облачной обработки.",
        caption:
          "Реальные экраны конфликтов и экспорта с синтетическими файлами.",
      },
    },
  },
  kk: {
    title: "Бейбарыс Ілесхан — интерфейс әзірлеушісі",
    description:
      "Бейбарыс Ілесханның (seoshiro) веб-жобалары: шығармашылық құралдар, деректерге ұқыпты қарау және ойластырылған интерфейстер.",
    skip: "Мазмұнға өту",
    work: "Жобалар",
    about: "Өзім туралы",
    contact: "Байланыс",
    language: "Тіл",
    motion: "Анимация",
    motionOff: "Анимацияны тоқтату",
    motionOn: "Анимацияны қосу",
    eyebrow: "ӘЗІРЛЕУШІ / ИНТЕРФЕЙС АВТОРЫ",
    name: "Бейбарыс Ілесхан",
    heroLine: "Пайдасы бар.\nМәні бар.",
    intro:
      "Мен веб-интерфейстер мен браузер құралдарын жасаймын. Соңғы жобаларым шығармашылық жұмысты реттеуге, өзгерістерді қарауға және файлдармен ұқыпты жұмыс істеуге көмектеседі.",
    viewWork: "Жобаларды көру",
    heroFoot: "Жеке жобалар. Ашық код. Браузерде жұмыс істейді.",
    selected: "Таңдаулы жобалар",
    selectedNote: "Сегіз жоба. Әртүрлі міндет. Детальдарға бірдей көңіл.",
    caseStudy: "Жоба туралы",
    live: "Жобаны ашу",
    source: "Бастапқы код",
    role: "ЖОБА КОНТЕКСТІ",
    roleText:
      "Портфолиоға арналған жеке жоба. Іске асыру, дизайн шешімдері мен тексерулер репозиторийде сипатталған.",
    input: "Бастапқы нүкте",
    output: "Нәтижесінде",
    engineering: "Ішкі құрылымы",
    boundaries: "Практикалық шектеулер",
    evidence: "Тексеру жазбаларын оқу",
    back: "Барлық жобалар",
    next: "Келесі жоба",
    aboutLabel: "МЕНІҢ ТӘСІЛІМ ТУРАЛЫ",
    aboutTitle: "Жұмыс —\nдетальдардан тұрады.",
    aboutText:
      "Мен Бейбарыспын, желіде — seoshiro. Жобаларым мәнерлі интерфейстер мен пайдалы браузер құралдарын біріктіреді. Референстерге, нұсқаларға және файлдарға түсінікті құрылым бергенді ұнатамын.",
    principles: [
      {
        title: "Келесі қадамды айқын ету.",
        text: "Интерфейс не бар екенін, не өзгергенін және әрі қарай не істеу керегін түсінуге көмектеседі.",
      },
      {
        title: "Деректерге ұқыпты қарау.",
        text: "Түсінікті сақтау, шектелген импорт және тасымалданатын сақтық көшірмелер құралға сенуге көмектеседі.",
      },
      {
        title: "Бәрін бірге ойластыру.",
        text: "Типографика, қозғалыс және пернетақтамен басқару код сияқты мұқият назарды қажет етеді.",
      },
    ],
    contactTitle: "Пайдалы дүние\nжасайық.",
    contactText: "Жобаларымды GitHub-та көріп, сол жерден хабарласа аласыз.",
    github: "GitHub-та табу",
    footer: "Детальдарға көңіл бөлінген. Коды ашық.",
    imageFailed:
      "Жоба суреті қолжетімсіз. Сипаттама мен жоба сілтемесі қолжетімді.",
    project: {
      ...recentCopy.kk,
      orbit: orbitCopy.kk,
      perch: {
        category: "КЕҢІСТІК ҚҰРАЛДАРЫ",
        title: "Бір бөлме.\nБірнеше мүмкіндік.",
        summary:
          "2D және 3D көріністері байланысқан жергілікті жиһаз жоспарлаушысы. Бөлмені баптап, 12 параметрлік жиһаз түрін орналастырыңыз және жылжытпас бұрын нұсқаларды салыстырыңыз.",
        alt: "Нақты PERCH студиясы: жиһаздалған қонақ бөлменің 3D көрінісі және өлшемдері бар 2D жоспары",
        detailAlt: "PERCH ішіндегі қонақ бөлменің екі тәуелсіз орналасу нұсқасын нақты салыстыру",
        input:
          "Тікбұрышты бөлме, оның өлшемдері мен есік-терезелері және орналастырғыңыз келетін жиһаз.",
        output:
          "Өңделетін орналасу нұсқалары, сыйымдылық ескертулері, JSON жобасы, өлшемдері бар SVG жоспар, 3D PNG және басып шығаруға арналған бөлме есебі.",
        decisions: [
          "Бір бөлме моделі SVG жоспар мен түпнұсқа Three.js жиһазын басқарады. Сандық өңдеу, жоспарда сүйреу және 3D таңдау өзара синхрондалады.",
          "Жиһаздың бұрылуы, бөлме шекарасы, төбе биіктігі және ішке ашылатын есіктер ескертулерде ескеріледі. Көшірмелер тәуелсіз; өзгерістерді болдырмауға және қайталауға болады.",
          "Браузердегі жергілікті сақтау қалпына келтіру көшірмесін қамтиды. Сахна қажет кезде салынады; жоспар мен өрістер WebGL болмаса да жұмыс істейді. Толық интерфейс ағылшын, орыс және қазақ тілдерінде қолжетімді.",
        ],
        limit:
          "Тікбұрышты бөлмені жиһаздау нобайы, құрылыс немесе қауіпсіздік құжаты емес. Материалдар мен жарық шартты; ескертулер өту жолдарының талаптарға сай екенін растамайды. Бұлттық синхрондау және бірлескен жұмыс жоқ. Басқа құрылғыға көшу үшін JSON экспорттаңыз.",
        caption:
          "Жұмыс істейтін студия мен екі орналасу нұсқасының жаңа скриншоттары; жиһаздалған демо бөлме қолданылды.",
      },
      forme: {
        category: "ВИЗУАЛДЫ БАҒЫТ",
        title: "Референстерден\nнақты бағытқа.",
        summary:
          "Суреттерді жинау, мудборд құрастыру және оның түстері мен қаріптерін дизайн жинағына айналдыру.",
        alt: "Сәулет референстері, жазбалар және түстер бар FORME редакторы",
        detailAlt: "Түс рөлдері мен қаріп үлгісі бар FORME дизайн жинағы",
        input:
          "Суреттер, жазбалар, сілтемелер және әлі біртұтас болмаған идея.",
        output:
          "Өңделетін мудборд, PNG композициясы, дизайн токендері, CSS айнымалылары және .forme жобасы.",
        decisions: [
          "Бір құжат моделі референс кітапханасын, редакторды және дизайн жинағын байланыстырады.",
          "«Сақталды» жазуы IndexedDB транзакциясынан кейін шығады. Web Locks пен нұсқа тексеруі қойындылардағы өзгерістерді қорғайды.",
          "Суреттер worker-де өңделеді. Архив импорты жолдарды, өлшемдерді, CRC, схеманы және суреттердің тиесілігін тексереді.",
        ],
        limit:
          "1400 × 1000 кенебі және бір браузердегі жұмыс. Бұлттағы бірлескен өңдеу мен шексіз кенеп жоқ. Жоба интерфейсі орыс тілінде.",
        caption:
          "Репозиторийдегі демо жинақпен көрсетілген нақты редактор мен дизайн жинағы.",
      },
      selvedge: {
        category: "ШЫҒАРМАШЫЛЫҚ ҚҰРАЛДАР",
        title: "Бір графика.\nТұтас коллекция.",
        summary:
          "Киімге графика орналастыру, түстер таңдау, нұсқаларды салыстыру және көрнекі келісу ортасы.",
        alt: "Футболка иллюстрациясы мен графика баптаулары бар SELVEDGE ортасы",
        detailAlt:
          "After Hours авторлық графикасымен SELVEDGE нұсқаларын салыстыру",
        input:
          "Графика және киім түсі, принт орны мен масштабы туралы шешімдер.",
        output:
          "Үйлесімді коллекция, атаулы нұсқалар, PNG шолуы, PDF макеті және өңделетін жоба файлы.",
        decisions: [
          "Орналастыру сүйреуді де, сандық өрістерді де қолдайды. Сенсорлық экранда жылжыту бөлек қосылады.",
          "Жергілікті транзакциялар мен нұсқа тексеруі басқа қойындының жұмысты қайта жазуына жол бермейді.",
          "Canvas экспорты жоба геометриясын қолданады. Интерфейс ағылшын, орыс және қазақ тілдерінде толық қолжетімді.",
        ],
        limit:
          "Бұл — көрнекі макет, өндірістік спецификация немесе сертификатталған баспа файлы емес. Өлшемдерді, түсті және баспа тәсілін баспаханамен нақтылау керек.",
        caption:
          "Түпнұсқа демо графикасы бар нақты жұмыс және нұсқа экрандары.",
      },
      guidecheck: {
        category: "ТЕКСЕРУ ЖҮЙЕЛЕРІ",
        title: "Не өзгерді.\nНе тексерілді.",
        summary:
          "Нұсқаулық нұсқаларын салыстыру және адамның тексеру нәтижесін тиісті қадаммен байланыстыру.",
        alt: "GuideCheck жұмыс ортасында нұсқаулық нұсқалары мен тексеру күйлері",
        detailAlt: "Тексеру басқаруы бар мобильді GuideCheck",
        input:
          "Нұсқаулық, оның жаңа нұсқасы және өзгерісті тексерілген нәтижеден ажырату қажеттілігі.",
        output:
          "Детерминдік салыстыру, тексерулер тарихы, түзетулер және тасымалданатын сақтық көшірмелер.",
        decisions: [
          "Тұрақты қадам ID-лері нұсқаларды байланыстырады. Мәтін, сілтеме, сурет және рет өзгерістері анық көрсетіледі.",
          "Тексеру нәтижесі қадам мен нұсқаулық контексті толық өзгеріссіз қалғанда ғана көшіріледі.",
          "Браузер нұсқасы атомарлық IndexedDB транзакцияларын қолданады. Қосымша жергілікті нұсқа деректерді SQLite-та сақтайды.",
        ],
        limit:
          "Тексерулер — адамның мәлімдемелері, автоматты верификация немесе тәуелсіз расталған дәлел емес. Бірлескен синхрондау жоқ.",
        caption: "Репозиторийдегі нақты браузер жұмыс ортасының суреттері.",
      },
      archiveguard: {
        category: "ФАЙЛ ТҰТАСТЫҒЫ",
        title: "Фотоны сақтау.\nДатаны тексеру.",
        summary:
          "JPEG түсірілім даталарын Google Photos JSON деректерімен салыстыру, қайшылықтарды шешу және тексерілген көшірмелерді экспорттау.",
        alt: "ArchiveGuard JPEG метадеректері мен JSON даталарын салыстырады",
        detailAlt: "ArchiveGuard тексерілген экспорт пакеті мен есебі",
        input:
          "Google Photos экспортынан алынған, даталары сәйкес келмеуі мүмкін JPEG және JSON файлдары.",
        output:
          "Жаңа JPEG көшірмелері, манифест және әр файл мен шешім жазылған CSV/HTML есептері.",
        decisions: [
          "Күмәнді сәйкестіктер мен дата қайшылықтары нақты шешімді талап етеді. Жүктеу датасы түсірілім датасын алмастырмайды.",
          "Worker шектелген JPEG/EXIF құрылымдарын тексеріп, пиксельдерді қайта кодтамай экспорт дайындайды.",
          "Метадеректерді тәуелсіз қайта оқу және EXIF-тен тыс байт хештері көшірмелерді жүктеуге дейін тексереді.",
        ],
        limit:
          "JPEG үлгісін тексеру құралы, бүкіл архивті қалпына келтіру жүйесі емес. Түпнұсқалар өзгермейді. ZIP кірісі, HEIC, RAW, уақыт белдеуін болжау және бұлт өңдеуі жоқ.",
        caption:
          "Синтетикалық файлдармен көрсетілген нақты қайшылық және экспорт экрандары.",
      },
    },
  },
};
export function projectById(id: string) {
  return projects.find((p) => p.id === id);
}
export function pageHref(
  id: ProjectId | null,
  locale: Locale,
  nested: boolean,
) {
  const base = id
    ? `${nested ? "" : "projects/"}${id}.html`
    : `${nested ? "../" : ""}index.html`;
  return `${base}${locale === "en" ? "" : `?lang=${locale}`}`;
}
