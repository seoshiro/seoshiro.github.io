import type { Locale, ProjectCopy } from "./content.ts";

export const orbitCopy: Record<Locale, ProjectCopy> = {
  en: {
    category: "Educational tools",
    title: "One spacecraft.\nA different perspective.",
    summary: "A satellite mission studio: configure an original spacecraft, explore a circular orbit, reveal its construction, and compare locally saved studies.",
    alt: "Actual ORBIT studio with an original gold spacecraft, deployed solar wings and mission controls.",
    detailAlt: "ORBIT construction study with separated spacecraft components and an educational chapter annotation.",
    input: "Choose a study preset, altitude and inclination. Switch the conceptual payload and blanket, fold the wings, control model time, and save named missions. Review JSON imports before merging or replacing local data.",
    output: "An interactive spacecraft and orbital plane, calculated circular speed and period, reversible construction chapters, and a portable local library with two-mission comparison.",
    decisions: [
      "The spacecraft, schematic Earth and orbit are original parametric geometry. Earth and the path share one scale; the moving spacecraft marker is enlarged and labelled for visibility.",
      "A circular two-body model uses NASA/JPL constants and independently checked equations. Inclination rotates the plane, including polar and retrograde orbits. The interface states its assumptions and distinguishes elapsed model time from real tracking.",
      "Saved studies have strict validation, atomic import, explicit replacement and undo. Blocked storage, corrupt data and changes from another tab are handled visibly. Keyboard controls, reduced motion, SVG fallback and context recovery preserve the learning workflow.",
    ],
    limit: "An idealized educational model, with no drag, Earth rotation, telemetry, flight-readiness claim or power simulation. Desktop Chrome and emulated mobile contexts were tested; physical phones and Safari were not tested.",
    caption: "Actual ORBIT capture: the original spacecraft and its mission configuration.",
  },
  ru: {
    category: "Учебные инструменты",
    title: "Один спутник.\nНовый взгляд.",
    summary: "Студия спутниковых миссий: настройте авторский аппарат, изучите круговую орбиту, разберите конструкцию и сравните сохранённые проекты.",
    alt: "Реальный интерфейс ORBIT: золотистый спутник с раскрытыми солнечными панелями и настройками миссии.",
    detailAlt: "Исследование конструкции ORBIT: разнесённые компоненты спутника и пояснение к учебной главе.",
    input: "Выберите пример миссии, высоту и наклонение. Смените условную полезную нагрузку и покрытие, сложите панели, управляйте модельным временем и сохраняйте миссии с названиями. Проверьте импорт JSON перед объединением или заменой данных.",
    output: "Интерактивный спутник и плоскость орбиты, рассчитанные скорость и период, обратимые главы разборки и переносимая локальная библиотека со сравнением двух миссий.",
    decisions: [
      "Спутник, схематичная Земля и орбита созданы процедурно. Земля и траектория имеют общий масштаб; движущийся маркер спутника увеличен для наглядности и подписан.",
      "Круговая модель двух тел использует константы NASA/JPL и независимо проверенные уравнения. Наклонение поворачивает плоскость, включая полярные и ретроградные орбиты. Интерфейс объясняет допущения и отличает модельное время от реального слежения.",
      "Сохранённые проекты проходят строгую проверку; импорт атомарный, замена явная, действия можно отменить. Блокировка хранилища, повреждённые данные и изменения в другой вкладке показаны пользователю. Клавиатура, уменьшенное движение, SVG и восстановление WebGL сохраняют доступ к исследованию.",
    ],
    limit: "Идеализированная учебная модель: без сопротивления атмосферы, вращения Земли, телеметрии, оценки готовности к полёту и расчёта энергобаланса. Проверены Chrome на компьютере и эмуляция мобильных экранов; физические телефоны и Safari не проверялись.",
    caption: "Настоящий снимок ORBIT: авторский спутник и настройки миссии.",
  },
  kk: {
    category: "Оқу құралдары",
    title: "Бір жерсерік.\nЖаңа көзқарас.",
    summary: "Жерсерік миссияларының студиясы: авторлық аппаратты баптаңыз, шеңберлік орбитаны зерттеңіз, құрылысын ашып, сақталған жобаларды салыстырыңыз.",
    alt: "ORBIT студиясының нақты интерфейсі: күн панельдері ашылған алтын түсті жерсерік және миссия баптаулары.",
    detailAlt: "ORBIT құрылысын зерттеу: бөлек көрсетілген жерсерік бөлшектері және оқу тарауының түсіндірмесі.",
    input: "Миссия үлгісін, биіктік пен орбита көлбеулігін таңдаңыз. Шартты пайдалы жүктеме мен жабынды ауыстырып, панельдерді бүктеңіз, модель уақытын басқарыңыз және миссияларға атау беріп сақтаңыз. JSON деректерін біріктіру не ауыстыру алдында тексеріңіз.",
    output: "Интерактивті жерсерік пен орбита жазықтығы, есептелген жылдамдық пен кезең, қайтымды құрастыру тараулары және екі миссияны салыстыруға болатын жергілікті жинақ.",
    decisions: [
      "Жерсерік, сұлбалық Жер және орбита параметрлік геометриядан жасалған. Жер мен траекторияның масштабы ортақ; қозғалыстағы жерсерік белгісі көрінуі үшін үлкейтіліп, түсіндірілген.",
      "Екі дененің шеңберлік моделі NASA/JPL тұрақтыларына және тәуелсіз тексерілген теңдеулерге сүйенеді. Көлбеулік орбита жазықтығын бұрады, соның ішінде полярлық және ретроградты орбиталар бар. Интерфейс жорамалдарды түсіндіріп, модель уақытын нақты бақылаудан ажыратады.",
      "Сақталған жобалар қатаң тексеріледі; импорт тұтас орындалады, ауыстыру анық расталады, әрекеттерді қайтаруға болады. Бұғатталған сақтау, бүлінген деректер және басқа қойындыдағы өзгерістер көрсетіледі. Пернетақта, азайтылған қозғалыс, SVG және WebGL қалпына келуі зерттеуге қолжетімділікті сақтайды.",
    ],
    limit: "Оқу үшін жеңілдетілген модель: атмосфера кедергісі, Жердің айналуы, телеметрия, ұшуға дайындық бағасы және қуат есебі жоқ. Компьютердегі Chrome мен мобильді экран эмуляциясы тексерілді; нақты телефондар мен Safari тексерілмеді.",
    caption: "ORBIT-тің нақты скриншоты: авторлық жерсерік және миссия баптаулары.",
  },
};
