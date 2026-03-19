import { useState, type ReactNode } from "react";
import { sendToTelegram } from "./telegram";
import { useReveal } from "./useReveal";

/* ──────────────── REVEAL WRAPPER ──────────────── */
function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const [ref, isVisible] = useReveal<HTMLDivElement>({ threshold: 0.1 });

  const transforms: Record<string, string> = {
    up: "translateY(60px)",
    left: "translateX(-60px)",
    right: "translateX(60px)",
    scale: "scale(0.9)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ──────────────── NAV ──────────────── */
const NAV_LINKS = [
  { label: "Проблемы", href: "#problems" },
  { label: "Услуги", href: "#services" },
  { label: "Как работаем", href: "#how" },
  { label: "Кейсы", href: "#cases" },
  { label: "Цены", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/* ──────────────── DARK LOGO ──────────────── */
function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const textSize = size === "sm" ? "text-lg" : "text-xl";
  const ySize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${dim} rounded-xl bg-[#1a1a2e] border border-violet-500/30 flex items-center justify-center relative overflow-hidden shadow-lg shadow-violet-500/10`}
      >
        {/* Subtle gradient glow inside */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-blue-500/20" />
        <span
          className={`${ySize} font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-blue-400 relative z-10 transform -rotate-6`}
        >
          Y
        </span>
      </div>
      <span className={`text-white font-bold ${textSize}`}>
        Yaro<span className="text-violet-400">Biznes</span>
      </span>
    </div>
  );
}

/* ──────────────── HEADER ──────────────── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e0e1a]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#">
          <Logo size="sm" />
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Обсудить проект
        </a>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#0e0e1a] border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-300 hover:text-white text-base"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="bg-violet-600 text-white text-sm font-bold px-4 py-2 rounded-lg text-center mt-2"
          >
            Обсудить проект
          </a>
        </div>
      )}
    </header>
  );
}

/* ──────────────── HERO ──────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0e0e1a] overflow-hidden pt-16">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600/8 rounded-full blur-3xl" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            Разработка под ключ · Сроки от 3 дней
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Ваш бизнес — там,{" "}
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              где живут клиенты
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Создаём сайты, Telegram-боты и мини-приложения, которые{" "}
            <strong className="text-slate-200">автоматизируют продажи</strong>,{" "}
            принимают заявки 24/7 и{" "}
            <strong className="text-slate-200">не теряют клиентов</strong>.
          </p>
          <p className="text-slate-500 text-base mb-10">
            Пока вы читаете это — ваши конкуренты уже там.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#contact"
              className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105"
            >
              Получить бесплатную консультацию →
            </a>
            <a
              href="#cases"
              className="w-full sm:w-auto border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-base transition-all"
            >
              Смотреть кейсы
            </a>
          </div>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { val: "50+", label: "проектов запущено" },
            { val: "3 дня", label: "минимальный срок" },
            { val: "80%", label: "open rate в Telegram" },
            { val: "×3", label: "рост заявок у клиентов" },
          ].map((s, i) => (
            <Reveal key={s.val} delay={0.4 + i * 0.1}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">
                  {s.val}
                </div>
                <div className="text-slate-400 text-xs">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── PROBLEMS ──────────────── */
const PROBLEMS = [
  {
    icon: "😩",
    title: "Менеджер не успевает отвечать",
    body: "Клиент написал в 22:00 с вопросом о цене. Утром увидели — он уже купил у конкурента. Каждый пропущенный вопрос = потерянные деньги.",
    quote:
      "«Мы теряем по 5–10 заявок в неделю просто потому, что не можем быстро ответить»",
  },
  {
    icon: "📱",
    title: "Нет сайта или он устарел",
    body: "Клиент гуглит вашу нишу — находит конкурента с красивым сайтом. У вас — только номер телефона в Instagram Bio. Доверие = 0.",
    quote:
      "«Мне говорят: у вас нет сайта — значит, вы не серьёзная компания»",
  },
  {
    icon: "🤯",
    title: "Слишком сложно и дорого разобраться",
    body: "Вы слышали о Telegram-ботах, но не знаете с чего начать. Заходили к фрилансерам — получили смету на 300 000 ₽ и 3 месяца работы.",
    quote:
      "«Я не программист. Я не понимаю что мне нужно и сколько это должно стоить»",
  },
  {
    icon: "⏳",
    title: "Рутина съедает время",
    body: 'Одни и те же вопросы по 20 раз в день: «Сколько стоит?», «Как записаться?», «Есть ли в наличии?». Вместо продаж — вы в роли справочника.',
    quote:
      "«Я трачу 3 часа в день на ответы на одни и те же вопросы в WhatsApp и Telegram»",
  },
  {
    icon: "💸",
    title: "Реклама есть — заявок нет",
    body: "Запустили рекламу, получили переходы. Но конвертировать не могут: нет удобного способа связаться, нет доверия, нет чёткого оффера.",
    quote:
      "«Трафик идёт, а заявок нет. Не понимаю, где всё теряется»",
  },
  {
    icon: "🏆",
    title: "Конкуренты уже в Telegram",
    body: "Пока вы думаете — конкурент запустил бота, собрал базу и шлёт рассылки своим клиентам. Open rate 80% vs ваши 15% в email.",
    quote:
      "«У конкурента в Telegram 10 000 подписчиков. Он с ними говорит каждую неделю»",
  },
];

function Problems() {
  return (
    <section id="problems" className="bg-[#0e0e1a] py-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
              Знакомо?
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
              Почему бизнес теряет деньги
              <br />
              <span className="text-slate-400">каждый день</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Мы провели кастдев с десятками предпринимателей. Вот что они
              говорили.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all group h-full">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-violet-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {p.body}
                </p>
                <blockquote className="border-l-2 border-violet-500/50 pl-3 text-slate-500 text-xs italic">
                  {p.quote}
                </blockquote>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── SERVICES ──────────────── */
const SERVICES = [
  {
    icon: "🌐",
    tag: "Сайт",
    color: "from-blue-500 to-cyan-500",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    title: "Продающий сайт",
    desc: "Лендинг или многостраничный сайт, который превращает посетителей в клиентов. Быстрый, адаптивный, с формами обратной связи и интеграцией с мессенджерами.",
    features: [
      "Дизайн под ваш бренд",
      "Мобильная адаптация",
      "SEO-оптимизация",
      "Форма заявки / звонок",
      "Интеграция с Telegram",
      "Скорость загрузки < 2 сек",
    ],
    time: "от 5 дней",
    from: "от 25 000 ₽",
  },
  {
    icon: "🤖",
    tag: "Telegram-бот",
    color: "from-violet-500 to-purple-600",
    tagColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    title: "Telegram-бот",
    desc: "Умный бот, который отвечает на вопросы, принимает заявки, записывает клиентов и автоматизирует рутину. Работает 24/7 без вашего участия.",
    features: [
      "Приём заявок и заказов",
      "FAQ и авто-ответы",
      "Рассылки по базе",
      "Уведомления команде",
      "Интеграция с CRM",
      "Оплата внутри бота",
    ],
    time: "от 3 дней",
    from: "от 15 000 ₽",
    badge: "🔥 Хит",
  },
  {
    icon: "📲",
    tag: "Мини-приложение",
    color: "from-pink-500 to-rose-500",
    tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    title: "Telegram Mini App",
    desc: "Полноценное веб-приложение прямо внутри Telegram. Каталог товаров, онлайн-запись, личный кабинет, программа лояльности — без установки.",
    features: [
      "Каталог товаров / услуг",
      "Онлайн-оплата",
      "Личный кабинет",
      "Программа лояльности",
      "Аналитика и отчёты",
      "Push-уведомления",
    ],
    time: "от 14 дней",
    from: "от 60 000 ₽",
    badge: "⚡ Тренд 2025",
  },
];

function Services() {
  return (
    <section id="services" className="bg-[#0b0b16] py-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
              Что мы делаем
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
              Три инструмента,
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                которые дают результат
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Не знаете что выбрать? Расскажите о задаче — мы подберём
              оптимальный вариант бесплатно.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12} direction="up">
              <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 flex flex-col hover:border-white/15 transition-all hover:scale-[1.02] group h-full">
                {s.badge && (
                  <div className="absolute -top-3 right-5 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {s.badge}
                  </div>
                )}
                <div
                  className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} items-center justify-center text-2xl mb-4 shadow-lg`}
                >
                  {s.icon}
                </div>
                <span
                  className={`inline-block border text-xs font-semibold px-2.5 py-1 rounded-full mb-3 w-fit ${s.tagColor}`}
                >
                  {s.tag}
                </span>
                <h3 className="text-white font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {s.desc}
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-slate-300 text-sm"
                    >
                      <svg
                        className="w-4 h-4 text-violet-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-5 border-t border-white/10">
                  <div>
                    <div className="text-slate-400 text-xs">{s.time}</div>
                    <div className="text-white font-bold text-base">
                      {s.from}
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className={`bg-gradient-to-r ${s.color} text-white text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    Подробнее →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 bg-gradient-to-r from-violet-600/10 to-blue-600/10 border border-violet-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-white font-bold text-lg">
                Нужны все три? 🚀
              </div>
              <div className="text-slate-400 text-sm mt-1">
                Создаём экосистему: сайт + бот + мини-приложение. Скидка 20% на
                комплекс.
              </div>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              Обсудить комплекс →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────── HOW IT WORKS ──────────────── */
const STEPS = [
  {
    num: "01",
    icon: "💬",
    title: "Бесплатная консультация",
    desc: "Рассказываете о бизнесе и задаче. Мы задаём уточняющие вопросы, предлагаем оптимальное решение и честно говорим, что реально поможет.",
    sub: "30 минут · Без обязательств",
  },
  {
    num: "02",
    icon: "📋",
    title: "Техзадание и смета",
    desc: "Составляем подробное техзадание с функционалом, сроками и фиксированной стоимостью. Никаких скрытых платежей и расплывчатых оценок.",
    sub: "1–2 рабочих дня",
  },
  {
    num: "03",
    icon: "⚡",
    title: "Разработка",
    desc: "Приступаем к работе. Каждые 2 дня показываем прогресс. Вы видите промежуточный результат и можете вносить правки на ходу.",
    sub: "От 3 до 30 дней",
  },
  {
    num: "04",
    icon: "🚀",
    title: "Запуск и передача",
    desc: "Запускаем проект, тестируем, устраняем баги. Передаём все доступы, обучаем как пользоваться. Месяц поддержки включён в стоимость.",
    sub: "Поддержка 30 дней",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="bg-[#0e0e1a] py-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
              Как работаем
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
              От идеи до запуска —
              <br />
              <span className="text-slate-400">без стресса и задержек</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Прозрачный процесс. Фиксированные сроки. Результат, который вы
              можете потрогать.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1}>
              <div className="relative h-full">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-violet-500/40 to-transparent z-10" />
                )}
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 h-full hover:border-violet-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl font-black text-violet-500/20">
                      {s.num}
                    </div>
                    <div className="text-2xl">{s.icon}</div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {s.desc}
                  </p>
                  <div className="text-violet-400 text-xs font-semibold bg-violet-500/10 px-3 py-1 rounded-full w-fit">
                    {s.sub}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── CASES ──────────────── */
const CASES = [
  {
    emoji: "💅",
    category: "Бьюти / Салон красоты",
    title: "Бот для записи в салон красоты",
    problem:
      "Администратор тратил 4 часа в день на переписку. Много «думающих» клиентов терялись без ответа.",
    solution:
      "Telegram-бот принимает запись, показывает свободные слоты, напоминает за час до визита и собирает отзывы после.",
    results: [
      { val: "−80%", label: "времени администратора" },
      { val: "+35%", label: "записей в месяц" },
      { val: "2 дня", label: "срок разработки" },
    ],
    color: "from-pink-500/10 to-rose-500/5",
    border: "border-pink-500/20",
  },
  {
    emoji: "🍕",
    category: "Ресторан / Доставка",
    title: "Мини-приложение для доставки еды",
    problem:
      "Принимали заказы по телефону — теряли клиентов на ожидании, ошибались в заказах.",
    solution:
      "Telegram Mini App с меню, корзиной, оплатой и отслеживанием статуса заказа прямо в мессенджере.",
    results: [
      { val: "+60%", label: "онлайн-заказов" },
      { val: "0", label: "ошибок в заказах" },
      { val: "12 дней", label: "срок разработки" },
    ],
    color: "from-orange-500/10 to-yellow-500/5",
    border: "border-orange-500/20",
  },
  {
    emoji: "🏋️",
    category: "Фитнес / Тренер",
    title: "Сайт + бот для фитнес-тренера",
    problem:
      "Тренер был везде и нигде: Instagram, WhatsApp, ВКонтакте. Клиенты терялись, оплаты — вручную.",
    solution:
      "Лендинг с кейсами и отзывами + бот для продажи программ тренировок, сбора оплаты и выдачи материалов.",
    results: [
      { val: "×3", label: "заявок с сайта" },
      { val: "100%", label: "авто-приём оплат" },
      { val: "7 дней", label: "срок разработки" },
    ],
    color: "from-green-500/10 to-emerald-500/5",
    border: "border-green-500/20",
  },
  {
    emoji: "🛍️",
    category: "Интернет-магазин",
    title: "Telegram-магазин для одежды",
    problem:
      "Сайт на конструкторе тормозил, плохо открывался с телефона. 70% аудитории — в Telegram.",
    solution:
      "Mini App с каталогом, фильтрами, корзиной и интеграцией с ЮКассой. Рассылки новинок по базе подписчиков.",
    results: [
      { val: "+45%", label: "конверсия в заказ" },
      { val: "80%", label: "open rate рассылок" },
      { val: "18 дней", label: "срок разработки" },
    ],
    color: "from-violet-500/10 to-purple-500/5",
    border: "border-violet-500/20",
  },
];

function Cases() {
  return (
    <section id="cases" className="bg-[#0b0b16] py-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
              Кейсы
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
              Реальные результаты
              <br />
              <span className="text-slate-400">реальных бизнесов</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Не абстрактные цифры, а конкретные задачи и их решения.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
              <div
                className={`bg-gradient-to-br ${c.color} border ${c.border} rounded-2xl p-7 flex flex-col h-full`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="text-3xl">{c.emoji}</div>
                  <div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      {c.category}
                    </div>
                    <div className="text-white font-bold text-lg">{c.title}</div>
                  </div>
                </div>
                <div className="space-y-4 mb-6 flex-1">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                      <span className="w-3 h-px bg-red-400 inline-block" />{" "}
                      Проблема
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {c.problem}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                      <span className="w-3 h-px bg-green-400 inline-block" />{" "}
                      Решение
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {c.solution}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/10">
                  {c.results.map((r) => (
                    <div key={r.label} className="text-center">
                      <div className="text-white font-black text-xl">
                        {r.val}
                      </div>
                      <div className="text-slate-400 text-xs mt-0.5">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── WHY US ──────────────── */
const WHY = [
  {
    icon: "⚡",
    title: "Быстрый запуск",
    desc: "Первый результат за 3 дня. Мы не растягиваем проекты на месяцы.",
  },
  {
    icon: "💰",
    title: "Фиксированная цена",
    desc: "Называем стоимость до старта. Никаких «это дополнительно».",
  },
  {
    icon: "🎯",
    title: "Фокус на результат",
    desc: "Нам важно чтобы бот или сайт реально приносили заявки, а не просто существовали.",
  },
  {
    icon: "🤝",
    title: "Объясняем на языке бизнеса",
    desc: "Без технического жаргона. Простые объяснения — что и зачем мы делаем.",
  },
  {
    icon: "🛡️",
    title: "Месяц поддержки",
    desc: "После запуска не бросаем. Исправляем баги, отвечаем на вопросы.",
  },
  {
    icon: "📊",
    title: "Измеримые KPI",
    desc: "Ставим конкретные цели: рост заявок, скорость ответа, конверсия.",
  },
];

function WhyUs() {
  return (
    <section className="bg-[#0b0b16] py-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
              Почему мы
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
              Не просто разработчики —
              <br />
              <span className="text-slate-400">ваши digital-партнёры</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="flex gap-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-violet-500/30 transition-all h-full">
                <div className="text-2xl flex-shrink-0">{w.icon}</div>
                <div>
                  <div className="text-white font-bold mb-1">{w.title}</div>
                  <div className="text-slate-400 text-sm leading-relaxed">
                    {w.desc}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── PRICING ──────────────── */
const PLANS = [
  {
    name: "Старт",
    icon: "🌱",
    desc: "Для тех, кто только начинает",
    price: "от 15 000 ₽",
    period: "разовая оплата",
    features: [
      "Telegram-бот с FAQ",
      "Приём заявок/заказов",
      "Уведомления в ваш чат",
      "Базовая рассылка",
      "1 месяц поддержки",
      "Срок: от 3 дней",
    ],
    cta: "Начать",
    popular: false,
    color: "from-slate-600 to-slate-700",
  },
  {
    name: "Бизнес",
    icon: "🚀",
    desc: "Оптимальный выбор для роста",
    price: "от 45 000 ₽",
    period: "разовая оплата",
    features: [
      "Лендинг / многостраничный сайт",
      "Telegram-бот с интеграциями",
      "Приём онлайн-оплаты",
      "CRM-интеграция",
      "Аналитика и статистика",
      "3 месяца поддержки",
      "Срок: от 7 дней",
    ],
    cta: "Выбрать",
    popular: true,
    color: "from-violet-600 to-blue-600",
  },
  {
    name: "Экосистема",
    icon: "🏆",
    desc: "Полный digital-пакет",
    price: "от 90 000 ₽",
    period: "разовая оплата",
    features: [
      "Сайт + бот + Mini App",
      "Каталог товаров/услуг",
      "Корзина и оплата",
      "Личный кабинет клиента",
      "Программа лояльности",
      "Рассылки с сегментацией",
      "6 месяцев поддержки",
      "Срок: от 14 дней",
    ],
    cta: "Обсудить",
    popular: false,
    color: "from-pink-600 to-rose-600",
  },
];

function Pricing() {
  return (
    <section id="pricing" className="bg-[#0e0e1a] py-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
              Цены
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
              Честная стоимость,
              <br />
              <span className="text-slate-400">фиксированные сроки</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Нет скрытых платежей, нет «добавим потом». Смета — до старта работы.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.12} direction="up">
              <div
                className={`relative rounded-2xl flex flex-col h-full ${
                  p.popular
                    ? "bg-gradient-to-b from-violet-600/20 to-blue-600/10 border-2 border-violet-500/50 scale-[1.02]"
                    : "bg-white/[0.03] border border-white/[0.08]"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg">
                    ✨ Популярный выбор
                  </div>
                )}
                <div className="p-7 flex-1 flex flex-col">
                  <div className="text-3xl mb-3">{p.icon}</div>
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    {p.desc}
                  </div>
                  <div className="text-white font-black text-2xl mb-1">
                    {p.name}
                  </div>
                  <div className="text-3xl font-black text-white mt-3">
                    {p.price}
                  </div>
                  <div className="text-slate-500 text-xs mb-6">{p.period}</div>
                  <ul className="space-y-3 flex-1">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-slate-300 text-sm"
                      >
                        <svg
                          className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`mt-7 block text-center py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:scale-105 bg-gradient-to-r ${p.color}`}
                  >
                    {p.cta} →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p className="text-center text-slate-500 text-sm mt-8">
            Нет подходящего варианта? Мы делаем индивидуальные предложения —{" "}
            <a href="#contact" className="text-violet-400 underline">
              напишите нам
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────── FAQ ──────────────── */
const FAQS = [
  {
    q: "Я не разбираюсь в технологиях. Это проблема?",
    a: "Совсем нет. Мы работаем с предпринимателями, а не с программистами. Вы рассказываете о своём бизнесе и задаче — мы переводим это в готовый продукт. Всё объясняем на простом языке без жаргона.",
  },
  {
    q: "Сколько времени займёт разработка?",
    a: "Зависит от сложности. Простой Telegram-бот — от 3 дней. Лендинг — от 5 дней. Мини-приложение — от 14 дней. Мы всегда называем конкретный срок до начала работы и соблюдаем его.",
  },
  {
    q: "А вдруг мне это не понравится или не подойдёт?",
    a: "Именно поэтому мы начинаем с бесплатной консультации и составляем подробное техзадание с прототипом ещё до оплаты. Вы точно знаете, что получите. В процессе — 3 бесплатные итерации правок.",
  },
  {
    q: "Нужны ли специальные знания для управления ботом или сайтом?",
    a: "Нет. Мы обучаем вас или вашего сотрудника за 30–60 минут. Для бота — простая панель управления. Для сайта — визуальный редактор. Плюс в любое время можете написать нам.",
  },
  {
    q: "Что включает поддержка после запуска?",
    a: "В течение 30 дней: исправление любых багов, мелкие доработки до 2 часов работы, ответы на вопросы в течение 4 часов. После — расширенный пакет поддержки за дополнительную оплату.",
  },
  {
    q: "У меня уже есть сайт, нужен только бот. Подойдёт?",
    a: "Конечно. Мы интегрируем бот с вашим существующим сайтом, CRM или любой другой системой. Беремся за отдельные задачи без привязки к пакетам.",
  },
  {
    q: "Как происходит оплата?",
    a: "50% — при старте работ, 50% — при сдаче проекта. Для крупных проектов возможна поэтапная оплата. Работаем по договору. Принимаем карты, переводы, оплату от ИП/ООО.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="bg-[#0e0e1a] py-24">
      <div className="max-w-3xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
              Частые вопросы
            </h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div
                className={`border rounded-2xl overflow-hidden transition-all ${
                  open === i
                    ? "border-violet-500/40 bg-white/[0.05]"
                    : "border-white/[0.07] bg-white/[0.02]"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <span
                    className={`font-semibold text-sm md:text-base transition-colors ${
                      open === i
                        ? "text-white"
                        : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {f.q}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 ml-3 transition-transform duration-300 ${
                      open === i ? "rotate-180 text-violet-400" : "text-slate-500"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: open === i ? "300px" : "0px",
                    opacity: open === i ? 1 : 0,
                  }}
                >
                  <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/10 pt-4">
                    {f.a}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── URGENCY ──────────────── */
function Urgency() {
  return (
    <section className="bg-[#0b0b16] py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Reveal direction="scale">
          <div className="bg-gradient-to-br from-violet-600/20 via-blue-600/10 to-transparent border border-violet-500/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="text-4xl mb-4">⏰</div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                Каждый день без
                <br />
                инструментов — это потери
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
                Пока у вас нет бота — вы теряете заявки ночью и в выходные.
                <br />
                Пока нет сайта — клиенты уходят к тем, кому доверяют.
                <br />
                <strong className="text-white">
                  Конкуренты уже решили эти задачи.
                </strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
                {[
                  {
                    icon: "📉",
                    stat: "67%",
                    desc: "клиентов уходят если не получили ответ в течение часа",
                  },
                  {
                    icon: "📱",
                    stat: "80%",
                    desc: "open rate Telegram vs 15–20% у email-рассылок",
                  },
                  {
                    icon: "🏃",
                    stat: "3×",
                    desc: "быстрее растут бизнесы с автоматизированными продажами",
                  },
                ].map((item) => (
                  <div
                    key={item.stat}
                    className="bg-white/[0.05] rounded-xl p-4 border border-white/10"
                  >
                    <div className="text-xl mb-2">{item.icon}</div>
                    <div className="text-white font-black text-2xl mb-1">
                      {item.stat}
                    </div>
                    <div className="text-slate-400 text-xs leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-violet-500/30 hover:scale-105"
              >
                Запустить проект сейчас →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────── CONTACT ──────────────── */
function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    business: "",
    service: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const success = await sendToTelegram(form);
      if (success) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
    setSending(false);
  };

  return (
    <section id="contact" className="bg-[#0e0e1a] py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Reveal direction="left">
            <div>
              <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
                Начать работу
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-5">
                Обсудим ваш
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  проект?
                </span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Расскажите о вашем бизнесе и задаче. Мы ответим в течение 2
                часов, предложим решение и назовём стоимость — бесплатно и без
                обязательств.
              </p>
              <div className="space-y-5">
                {[
                  {
                    icon: "💬",
                    title: "Telegram",
                    sub: "@shturtb",
                    href: "https://t.me/shturtb",
                  },
                  {
                    icon: "📸",
                    title: "Instagram",
                    sub: "@yarobiznes",
                    href: "https://instagram.com/yarobiznes",
                  },
                  {
                    icon: "📧",
                    title: "Email",
                    sub: "yaroslav.paraonov@gmail.com",
                  },
                  {
                    icon: "⚡",
                    title: "Ответ за",
                    sub: "2 часа в рабочее время",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        {item.title}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
                        >
                          {item.sub}
                        </a>
                      ) : (
                        <div className="text-slate-400 text-sm">{item.sub}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7">
              {sent ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4 animate-bounce">🚀</div>
                  <h3 className="text-white font-black text-2xl mb-2">
                    Заявка отправлена!
                  </h3>
                  <p className="text-slate-400">
                    Мы свяжемся с вами в течение 2 часов. Ответ придёт в Telegram
                    или на указанный контакт.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                      Ваше имя *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Как вас зовут?"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                      Телефон / Telegram *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="+7 (999) 123-45-67 или @username"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                      Ваш бизнес / ниша
                    </label>
                    <input
                      type="text"
                      placeholder="Например: фитнес-клуб, доставка еды..."
                      value={form.business}
                      onChange={(e) =>
                        setForm({ ...form, business: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                      Что нужно?
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                    >
                      <option value="" className="bg-[#1a1a2e]">
                        Выберите услугу...
                      </option>
                      <option value="site" className="bg-[#1a1a2e]">
                        Сайт / лендинг
                      </option>
                      <option value="bot" className="bg-[#1a1a2e]">
                        Telegram-бот
                      </option>
                      <option value="mini" className="bg-[#1a1a2e]">
                        Mini App в Telegram
                      </option>
                      <option value="all" className="bg-[#1a1a2e]">
                        Комплекс (всё вместе)
                      </option>
                      <option value="idk" className="bg-[#1a1a2e]">
                        Не знаю — помогите разобраться
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                      Расскажите о задаче
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Что хотите автоматизировать? Какая главная боль сейчас?"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                    />
                  </div>
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm text-center">
                      ⚠️ Не удалось отправить заявку. Попробуйте ещё раз или
                      напишите нам в{" "}
                      <a
                        href="https://t.me/shturtb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-red-300"
                      >
                        Telegram
                      </a>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className={`w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl text-base transition-all shadow-lg shadow-violet-500/20 ${
                      sending
                        ? "opacity-70 cursor-wait"
                        : "hover:scale-[1.02]"
                    }`}
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Отправляем...
                      </span>
                    ) : (
                      "Отправить заявку →"
                    )}
                  </button>
                  <p className="text-slate-500 text-xs text-center">
                    Ответим в течение 2 часов · Никакого спама
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── FOOTER ──────────────── */
function Footer() {
  return (
    <footer className="bg-[#0b0b16] border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo size="sm" />
        <div className="flex items-center gap-6 text-slate-500 text-sm">
          <a
            href="https://t.me/shturtb"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition-colors"
          >
            Telegram
          </a>
          <a
            href="https://instagram.com/yarobiznes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors"
          >
            Instagram
          </a>
          <a
            href="mailto:yaroslav.paraonov@gmail.com"
            className="hover:text-blue-400 transition-colors"
          >
            Email
          </a>
        </div>
        <div className="text-slate-600 text-xs">
          © 2025 YaroBiznes. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

/* ──────────────── APP ──────────────── */
export default function App() {
  return (
    <div className="font-sans antialiased">
      <Header />
      <Hero />
      <Problems />
      <Services />
      <HowItWorks />
      <Cases />
      <WhyUs />
      <Pricing />
      <Urgency />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
