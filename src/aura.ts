import type {Locale,ProjectCopy} from './content.ts';
export const auraCopy:Record<Locale,ProjectCopy>={
  en:{
    category:'INTERACTIVE PRODUCT STUDIES',title:'Hard lines.\nSoft contact.',
    summary:'A dark headphone design study with original procedural 3D geometry, a natural camera tour and a working visual-card configurator.',
    alt:'Actual AURA A–01 website with graphite metal headphones, editorial typography and glass finish controls',
    detailAlt:'Actual AURA metal-shell detail with polished edges, surface droplets and accessible view controls',
    input:'Explore the object in English or Russian. Choose Graphite, Titanium or Oxide, follow the camera tour or pin a detail view.',
    output:'A responsive product concept and a PNG card with the selected headphone render, finish, background and localized notes, without ordering or payment.',
    decisions:[
      'One original procedural assembly creates all five views: metal frame, visible adjustment and pivots, oval cushions, stitched seams and surface-anchored droplets. No third-party headphone mesh or product photography is used.',
      'Real WebGL geometry and its optimized still renders share the same materials and lighting. Desktop scroll and subtle pointer parallax reveal the object; manual views remain pinned until the user resumes following scroll.',
      'English and Russian keep a stable product stage. Bounded loading, persisted motion-off, reduced motion, keyboard dialogs and color-aware stills preserve access without WebGL. The configurator exports a real visual PNG card.'
    ],
    limit:'A fictional design and material study. No manufactured product, acoustic measurement, tested comfort or water-resistance claim. Chrome desktop and emulated mobile were checked; physical Safari devices were not.',
    caption:'Actual AURA capture. Original procedural headphone geometry and studio renders, created for this concept.'
  },
  ru:{
    category:'ИНТЕРАКТИВНЫЕ ПРОДУКТОВЫЕ ИССЛЕДОВАНИЯ',title:'Чёткие линии.\nМягкий контакт.',
    summary:'Тёмный концепт наушников с оригинальной процедурной 3D-конструкцией, плавной сменой ракурсов и конфигуратором визуальных карточек.',
    alt:'Реальный сайт AURA A–01: графитовые металлические наушники, редакционная типографика и стеклянные контролы отделки',
    detailAlt:'Реальный этюд металлического корпуса AURA: полированные кромки, капли на поверхности и доступные контролы ракурса',
    input:'Изучайте объект на русском или английском. Выберите Графит, Титан или Оксид; следуйте за камерой или закрепите нужный ракурс.',
    output:'Адаптивный концепт и PNG-карточка с выбранным рендером наушников, отделкой, фоном и локализованными заметками. Без заказов и оплаты.',
    decisions:[
      'Одна оригинальная процедурная конструкция создаёт все пять ракурсов: металлическая рама, регуляторы и шарниры, овальные подушки, швы и закреплённые на поверхности капли. Чужих моделей наушников и фотографий продукта нет.',
      'Настоящая WebGL-геометрия и оптимизированные рендеры используют одинаковые материалы и свет. Прокрутка и небольшой параллакс раскрывают объект; ручной ракурс сохраняется до явного возврата к прокрутке.',
      'Русский и английский сохраняют размеры продукта. Ограниченная загрузка, сохранение motion-off, reduced motion, клавиатурные диалоги и рендеры выбранной отделки поддерживают доступ без WebGL. Конфигуратор сохраняет настоящую PNG-карточку.'
    ],
    limit:'Вымышленный дизайн и этюд материалов. Готового продукта, измерений звука, проверенного комфорта и защиты от воды нет. Проверены Chrome и эмуляция мобильных экранов; физические устройства Safari не проверялись.',
    caption:'Реальный снимок AURA. Оригинальная процедурная конструкция наушников и студийные рендеры, созданные для этого концепта.'
  },
  kk:{
    category:'ИНТЕРАКТИВТІ ӨНІМ ЗЕРТТЕУЛЕРІ',title:'Айқын сызықтар.\nЖұмсақ жанасу.',
    summary:'Түпнұсқа процедуралық 3D конструкциясы, камера ракурстары және визуалды карточка конфигураторы бар қара түсті құлаққап концепті.',
    alt:'AURA A–01 сайтының нақты көрінісі: графит түсті металл құлаққап, редакциялық типографика және шыны әрлеу басқармалары',
    detailAlt:'AURA металл корпусының нақты көрінісі: жылтыр жиектер, беттегі тамшылар және қолжетімді ракурс басқармалары',
    input:'Нысанды ағылшын немесе орыс тілінде зерттеңіз. Графит, Титан не Оксид әрлеуін таңдаңыз; камераға ілесіңіз немесе ракурсты бекітіңіз.',
    output:'Таңдалған құлаққап рендері, әрлеуі, фоны және жергілікті тілдегі ескертпелері бар PNG карточка мен бейімделетін концепт. Тапсырыс пен төлем жоқ.',
    decisions:[
      'Бір түпнұсқа процедуралық конструкция бес ракурсты жасайды: металл доға, көрінетін реттегіштер мен топсалар, сопақ жастықтар, тігістер және бетке бекітілген тамшылар. Бөтен құлаққап моделі не өнім фотосы қолданылмайды.',
      'Нақты WebGL геометриясы мен оңтайланған рендерлердің материалы және жарығы бірдей. Компьютердегі айналдыру мен шағын параллакс нысанды ашады; қолмен таңдалған ракурс қайта ілесу қосылғанша сақталады.',
      'Ағылшын және орыс тілдері өнім өлшемін сақтайды. Шектеулі жүктеу, сақталатын motion-off, reduced motion, пернетақта диалогтары мен әрлеу рендерлері WebGL жоқ кезде де қолжетімді. Конфигуратор нақты PNG карточка сақтайды.'
    ],
    limit:'Ойдан шығарылған дизайн және материал зерттеуі. Өндірілген өнім, дыбыс өлшемі, тексерілген жайлылық не судан қорғаныс мәлімдемесі жоқ. Chrome және мобильді экран эмуляциясы тексерілді; нақты Safari құрылғылары тексерілмеді.',
    caption:'AURA сайтының нақты түсірілімі. Осы концептке жасалған түпнұсқа процедуралық құлаққап конструкциясы мен студиялық рендерлер.'
  }
};
