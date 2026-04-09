"use client";

const C = {
  bg: "#0a0a0f", surface: "#111119", border: "#1e1e30",
  accent: "#6c5ce7", green: "#00d2a0", text: "#e8e8f0",
  dim: "#999", red: "#f87171", amber: "#f59e0b",
  blue: "#60a5fa", pink: "#f472b6", cyan: "#22d3ee",
  tiktok: "#fe2c55", fb: "#1877f2", kaspi: "#f14635",
};

const sP: React.CSSProperties = { fontSize: 14, lineHeight: 1.75, color: "#ccc", margin: "0 0 12px" };
const sCard: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", marginBottom: 16 };
const sBadge = (color: string): React.CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: `${color}18`, color, fontSize: 11, fontWeight: 600, letterSpacing: "0.03em" });

function DataTable({ headers, rows, highlight }: { headers: string[]; rows: (string | number)[][]; highlight?: number }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 16 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>{headers.map((h, i) => (
            <th key={i} style={{ padding: "10px 12px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: highlight !== undefined && ri === highlight ? `${C.accent}12` : "transparent" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "10px 12px", textAlign: "left", color: ci === 0 ? C.text : "#ccc", borderBottom: `1px solid ${C.border}20`, fontWeight: ci === 0 ? 500 : 400 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Step({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ ...sCard, borderLeft: `4px solid ${C.accent}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{num}</div>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: C.text, margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function CreativeHuntingGuidePage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={sBadge(C.tiktok)}>TikTok</span>
            <span style={sBadge(C.fb)}>Facebook Ads</span>
            <span style={sBadge(C.green)}>Minea</span>
            <span style={sBadge(C.amber)}>ShopHunter</span>
            <span style={sBadge(C.kaspi)}>Kaspi Deeplink</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Гайд: поиск залетевших креативов и запуск внешнего трафика на Kaspi
          </h1>
          <p style={{ fontSize: 15, color: C.dim, margin: 0, lineHeight: 1.6 }}>
            Пошаговая инструкция: как находить видео, которые уже доказали спрос → адаптировать под свой бренд → повесить на deeplink → получить продажи на Kaspi через внешний трафик.
          </p>
        </div>

        {/* ═══ OVERVIEW ═══ */}
        <div style={{ ...sCard, borderLeft: `4px solid ${C.green}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.green, margin: "0 0 16px" }}>Общая схема: от тренда к продаже</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", margin: "16px 0" }}>
            {[
              { step: "1", label: "Найти залетевший креатив", sub: "Minea / TikTok / FB Ads", color: C.accent },
              { step: "→", label: "", sub: "", color: C.dim },
              { step: "2", label: "Скачать и адаптировать", sub: "Перемонтаж под A-LIQE", color: C.pink },
              { step: "→", label: "", sub: "", color: C.dim },
              { step: "3", label: "Создать deeplink", sub: "Mobs.io → Kaspi карточка", color: C.kaspi },
              { step: "→", label: "", sub: "", color: C.dim },
              { step: "4", label: "Запустить трафик", sub: "TikTok / Reels / Shorts", color: C.green },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", minWidth: s.label ? 100 : 20 }}>
                <div style={{ width: s.label ? 36 : 20, height: 36, borderRadius: "50%", background: s.label ? `${s.color}20` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px", fontSize: s.label ? 14 : 16, fontWeight: 700, color: s.color }}>{s.step}</div>
                {s.label && <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{s.label}</div>}
                {s.sub && <div style={{ fontSize: 10, color: C.dim }}>{s.sub}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* ═══ YOUR PRODUCTS ═══ */}
        <div style={{ ...sCard }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 16px" }}>Товары A-LIQE на Kaspi — по каким категориям искать креативы</h3>
          <DataTable headers={["Товар", "Артикул", "Себест.", "Категория для поиска креативов"]} rows={[
            ["Блендер-пароварка QAMQOR", "150807944", "14 200 ₸", "blender, food processor, baby food maker"],
            ["Тестомес GrandMix Pro 1500", "160355158", "17 100 ₸", "stand mixer, dough mixer, kitchen mixer"],
            ["GrandMix Digital 1500", "160136809", "29 940 ₸", "stand mixer digital, planetary mixer"],
            ["Air Power стайлер 1600 Вт", "139955231", "4 900 ₸", "hair styler, airwrap dupe, hair dryer brush"],
            ["S9 Ionic фен-стайлер 4в1", "140371157", "12 500 ₸", "hair dryer, ionic hair styler, 4 in 1 styler"],
            ["MG-Titanium Pro мясорубка", "143159393", "18 000 ₸", "meat grinder, electric grinder"],
            ["Шашлычница TF-8007", "152056651", "12 500 ₸", "electric grill, kebab maker, indoor grill"],
            ["Блендер Elit X12", "142931942", "12 500 ₸", "blender, smoothie maker, portable blender"],
            ["GrandChef X6 белый", "160271714", "27 400 ₸", "food processor, kitchen machine"],
            ["Массажёр X9", "139955212", "4 200 ₸", "massage gun, muscle massager, percussion"],
            ["Наушники TWS чёрные", "139883364", "4 500 ₸", "TWS earbuds, wireless earphones"],
            ["AI-очки", "149294355", "14 000 ₸", "smart glasses, AI glasses, camera glasses"],
            ["Шашлычница электрическая", "149333810", "12 500 ₸", "electric kebab grill, rotisserie"],
          ]} />
          <div style={{ borderLeft: `3px solid ${C.amber}`, paddingLeft: 14, margin: "12px 0", fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>
            <strong style={{ color: C.amber }}>Важно: </strong>в столбце «Категория для поиска» — <strong style={{ color: C.text }}>ключевые слова на английском</strong>, которые нужно вбивать в поиск Minea, TikTok Creative Center и Facebook Ads Library. Именно на английском — потому что 90% залетевших креативов в мире на английском, и мы ищем глобальные тренды для адаптации.
          </div>
        </div>

        {/* ═══ STEP 1: MINEA ═══ */}
        <Step num={1} title="Minea — главный инструмент поиска залетевших товарных креативов">
          <div style={{ ...sCard, background: `${C.green}06`, border: `1px solid ${C.green}25` }}>
            <div style={{ fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Доступ</div>
            <p style={sP}>
              Заходим через <strong style={{ color: C.text }}>Group Buy SEO</strong> (групповая подписка). Minea — это шпионский инструмент, который мониторит рекламу на TikTok, Facebook, Instagram, Pinterest и показывает товары, которые сейчас рекламируются активнее всего.
            </p>
          </div>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Как искать</h4>

          <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.0 }}>
            <div style={{ marginBottom: 16 }}>
              <strong style={{ color: C.accent }}>1. Открываем Minea → раздел «Ads»</strong>
              <br/>Выбираем платформу: <strong style={{ color: C.text }}>TikTok Ads</strong> (самый высокий engagement для товарных видео) или <strong style={{ color: C.text }}>Facebook Ads</strong>.
            </div>

            <div style={{ marginBottom: 16 }}>
              <strong style={{ color: C.accent }}>2. Вводим ключевое слово</strong>
              <br/>Берём из таблицы выше. Например, для стайлера: <code style={{ background: "#1e1e30", padding: "2px 8px", borderRadius: 4, color: C.green }}>hair styler</code> или <code style={{ background: "#1e1e30", padding: "2px 8px", borderRadius: 4, color: C.green }}>airwrap dupe</code>
            </div>

            <div style={{ marginBottom: 16 }}>
              <strong style={{ color: C.accent }}>3. Фильтры — самое важное</strong>
            </div>
          </div>

          <DataTable headers={["Фильтр", "Что ставить", "Почему"]} rows={[
            ["Platform", "TikTok Ads", "Лучший engagement для товарных видео"],
            ["Sort by", "Likes / Engagement", "Показывает реально залетевшие, а не просто «крутящиеся»"],
            ["Period", "Last 30 days", "Свежие тренды, не устаревшие"],
            ["Country", "US, UK, AE (ОАЭ)", "Основные рынки товарных видео. ОАЭ = ближе к КЗ по аудитории"],
            ["Language", "English (или All)", "Больше охват. Потом адаптируем на русский"],
            ["Likes", "> 1 000", "Отсекаем мёртвые креативы. Залетевшие = 1K+ лайков"],
            ["Ad type", "Video", "Нам нужны именно видео, не картинки"],
          ]} />

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>На какие метрики смотреть</h4>

          <DataTable headers={["Метрика", "Хорошее значение", "Что значит"]} rows={[
            ["Likes", "> 5 000", "Видео зацепило аудиторию — есть реальный интерес"],
            ["Comments", "> 100", "Люди обсуждают = высокая вовлечённость"],
            ["Shares", "> 500", "Люди пересылают друзьям = виральный потенциал"],
            ["Ad duration (как долго крутится)", "> 7 дней", "Если рекламодатель крутит >7 дней — креатив прибыльный, он не отключает"],
            ["Countries", "US / UK / AE", "Если крутится в нескольких странах = масштабируемый"],
            ["Landing page", "Shopify / Amazon", "Если ведёт на магазин = товарная реклама, не бренд-имиджевая"],
          ]} />

          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "#ccc", lineHeight: 1.7 }}>
            <strong style={{ color: C.green }}>Правило: </strong>
            если креатив крутится <strong style={{ color: C.text }}>&gt; 7 дней и имеет &gt; 5K лайков</strong> — это доказанный спрос. Рекламодатель не будет тратить деньги на то, что не продаёт. <strong style={{ color: C.text }}>Скачиваем это видео.</strong>
          </div>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Конкретные поисковые запросы под товары A-LIQE</h4>

          <DataTable headers={["Товар A-LIQE", "Поисковые запросы в Minea (вводить по очереди)"]} rows={[
            ["Стайлер / Фен-стайлер", "airwrap dupe, hair styler, 5 in 1 hair dryer, blow dryer brush, hot air brush"],
            ["Блендер-пароварка", "baby food maker, food steamer blender, baby blender, food processor baby"],
            ["Тестомес", "stand mixer, dough mixer, planetary mixer, kitchen mixer, bread maker"],
            ["Мясорубка", "meat grinder, electric grinder, sausage maker, meat mincer"],
            ["Шашлычница", "electric grill, indoor grill, kebab maker, smokeless grill, rotisserie"],
            ["Массажёр", "massage gun, percussion massager, muscle gun, deep tissue massager"],
            ["TWS наушники", "wireless earbuds, TWS earphones, noise cancelling earbuds, earbuds review"],
            ["AI-очки", "smart glasses, AI glasses, camera glasses, ray-ban meta dupe, smart sunglasses"],
            ["Блендер (обычный)", "portable blender, smoothie blender, personal blender, blender review"],
          ]} />
        </Step>

        {/* ═══ STEP 2: TIKTOK CREATIVE CENTER ═══ */}
        <Step num={2} title="TikTok Creative Center — бесплатный поиск топовых рекламных видео">
          <div style={{ ...sCard, background: `${C.tiktok}06`, border: `1px solid ${C.tiktok}25` }}>
            <div style={{ fontSize: 12, color: C.tiktok, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Доступ</div>
            <p style={sP}>
              <strong style={{ color: C.text }}>ads.tiktok.com/business/creativecenter/inspiration/topads</strong> — бесплатно, без подписки. Авторизация через TikTok аккаунт.
            </p>
          </div>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Пошаговый алгоритм</h4>

          <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.2 }}>
            {[
              { step: "1", text: "Заходим на ads.tiktok.com → Creative Center → Top Ads" },
              { step: "2", text: "Region: выбираем United States (самый большой рынок рекламы)" },
              { step: "3", text: "Industry: выбираем Appliances & Electronics (бытовая техника) или Beauty & Personal Care (стайлеры)" },
              { step: "4", text: "Objective: Conversions (нам нужны конверсионные, а не брендовые)" },
              { step: "5", text: "Period: Last 30 days (свежие тренды)" },
              { step: "6", text: "Sort by: CTR (Click-Through Rate) — видео с высоким CTR = люди кликают = интерес к товару" },
              { step: "7", text: "Ищем видео с CTR > 3% и длительностью 15–30 секунд — идеальный формат для адаптации" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${C.tiktok}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.tiktok, flexShrink: 0 }}>{s.step}</div>
                <div>{s.text}</div>
              </div>
            ))}
          </div>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Фильтры для каждой категории</h4>

          <DataTable headers={["Товар", "Industry в TikTok CC", "Доп. фильтр"]} rows={[
            ["Стайлер / Фен", "Beauty & Personal Care", "Objective: Conversions"],
            ["Блендер / Тестомес / Мясорубка", "Appliances & Electronics", "Objective: Conversions"],
            ["Шашлычница / Гриль", "Food & Drink или Appliances", "Objective: Conversions"],
            ["Массажёр", "Health & Fitness", "Objective: Conversions"],
            ["Наушники / AI-очки", "Tech & Electronics", "Objective: Conversions"],
          ]} />

          <div style={{ borderLeft: `3px solid ${C.tiktok}`, paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "#ccc", lineHeight: 1.7 }}>
            <strong style={{ color: C.tiktok }}>Лайфхак: </strong>
            В TikTok CC есть кнопка <strong style={{ color: C.text }}>«See Analytics»</strong> у каждого креатива. Она показывает: CTR, engagement rate, reach. Если CTR &gt; 3% и reach &gt; 1M — <strong style={{ color: C.text }}>это доказанный креатив, который конвертит.</strong> Скачиваем.
          </div>
        </Step>

        {/* ═══ STEP 3: FACEBOOK ADS LIBRARY ═══ */}
        <Step num={3} title="Facebook Ads Library — бесплатный архив всех рекламных объявлений">
          <div style={{ ...sCard, background: `${C.fb}06`, border: `1px solid ${C.fb}25` }}>
            <div style={{ fontSize: 12, color: C.fb, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Доступ</div>
            <p style={sP}>
              <strong style={{ color: C.text }}>facebook.com/ads/library</strong> — полностью бесплатно, без подписки. Показывает ВСЮ активную рекламу на Facebook и Instagram.
            </p>
          </div>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Алгоритм поиска</h4>

          <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.2 }}>
            {[
              { step: "1", text: "Country: United States (или All)" },
              { step: "2", text: "Ad category: All ads" },
              { step: "3", text: "Вводим ключевое слово: например «hair styler» или «airwrap dupe» или название конкурентного бренда" },
              { step: "4", text: "Filters → Media type: Video (только видео)" },
              { step: "5", text: "Sort by: Oldest first (чем дольше крутится — тем прибыльнее)" },
              { step: "6", text: "Ищем объявления, которые активны > 14 дней — это значит, что они приносят деньги" },
              { step: "7", text: "Кликаем на рекламодателя → смотрим все его объявления → находим самое старое (= самое прибыльное)" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${C.fb}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.fb, flexShrink: 0 }}>{s.step}</div>
                <div>{s.text}</div>
              </div>
            ))}
          </div>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Что искать конкретно</h4>

          <DataTable headers={["Товар A-LIQE", "Запрос в FB Ads Library", "На что смотреть"]} rows={[
            ["Стайлер", "airwrap dupe, hair styler, dyson dupe", "Видео с демонстрацией завивки — хуки «дешевле Dyson в 10 раз»"],
            ["Блендер", "portable blender, smoothie maker", "Видео с рецептами, «3 smoothie за 1 минуту»"],
            ["Тестомес", "stand mixer, bread maker", "Видео замеса теста — «пицца за 5 минут»"],
            ["Шашлычница", "indoor grill, smokeless grill", "Видео готовки мяса дома — запах, аппетитность"],
            ["Массажёр", "massage gun review, percussion massager", "Видео до/после — снятие боли в мышцах"],
            ["AI-очки", "smart glasses, ray-ban meta", "Хуки «очки с камерой», фото и видео с очков"],
          ]} />

          <div style={{ borderLeft: `3px solid ${C.fb}`, paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "#ccc", lineHeight: 1.7 }}>
            <strong style={{ color: C.fb }}>Ключевое правило FB Ads Library: </strong>
            <strong style={{ color: C.text }}>Если объявление активно больше 14 дней — оно приносит деньги.</strong> Рекламодатель не будет тратить бюджет впустую. Чем старше объявление и чем больше вариаций у него есть (A/B тесты) — тем прибыльнее креатив. Именно эти видео нужно адаптировать.
          </div>
        </Step>

        {/* ═══ STEP 4: SHOPHUNTER ═══ */}
        <Step num={4} title="ShopHunter — проверка: продаётся ли товар реально">
          <div style={{ ...sCard, background: `${C.amber}06`, border: `1px solid ${C.amber}25` }}>
            <div style={{ fontSize: 12, color: C.amber, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Доступ</div>
            <p style={sP}>
              <strong style={{ color: C.text }}>shophunter.io</strong> — через Group Buy SEO. Показывает реальную выручку Shopify-магазинов по дням.
            </p>
          </div>

          <p style={sP}>ShopHunter — это <strong style={{ color: C.text }}>валидация</strong>. Нашли залетевший креатив в Minea/TikTok/FB → вбиваем в ShopHunter URL магазина (или название товара) → видим реальные продажи по дням.</p>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>На какие метрики смотреть в ShopHunter</h4>

          <DataTable headers={["Метрика", "Хорошее значение", "Что значит"]} rows={[
            ["Revenue/day", "> $1 000/день", "Товар реально продаётся, не просто крутит рекламу"],
            ["Revenue trend", "Растущий или стабильный", "Если падает — тренд уходит, не стоит заходить"],
            ["Days active", "> 30 дней", "Не хайп одного дня, а устойчивый спрос"],
            ["Price", "$30–100 (15–50K ₸)", "Наша ценовая зона на Kaspi — ищем товары в этом диапазоне"],
          ]} />

          <div style={{ borderLeft: `3px solid ${C.amber}`, paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "#ccc", lineHeight: 1.7 }}>
            <strong style={{ color: C.amber }}>Алгоритм валидации: </strong>
            Нашли креатив в Minea (5K+ лайков, 7+ дней) → нашли магазин-рекламодателя → вбили в ShopHunter → видим $1K+/день → <strong style={{ color: C.text }}>креатив подтверждён, скачиваем и адаптируем.</strong>
          </div>
        </Step>

        {/* ═══ STEP 5: ADAPTATION ═══ */}
        <Step num={5} title="Адаптация креатива под A-LIQE">
          <p style={sP}>Нашли видео — теперь нужно его переделать. <strong style={{ color: C.text }}>Не копируем 1 в 1</strong> — адаптируем под свой бренд и казахстанскую аудиторию.</p>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Что брать из оригинала, что менять</h4>

          <DataTable headers={["Элемент", "Берём из оригинала", "Меняем на своё"]} rows={[
            ["Хук (первые 3 сек)", "Структуру хука — как зацепить внимание", "Текст на русском/казахском, свой продукт в кадре"],
            ["Формат видео", "Длительность, ритм, монтаж, переходы", "Свой продукт, свой интерьер, свой фон"],
            ["Демонстрация", "Какие фишки показывают, в каком порядке", "Показываем свой A-LIQE товар с теми же фишками"],
            ["CTA (призыв к действию)", "Где появляется, как оформлен", "«Ссылка в описании» → deeplink на Kaspi"],
            ["Музыка", "Темп и настроение", "Трендовый звук из TikTok (или оригинальный)"],
            ["Субтитры", "Наличие и стиль", "Русский/казахский текст. Крупный шрифт, контрастный"],
          ]} />

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Типы хуков, которые работают для бытовой техники</h4>

          <div style={sCard}>
            {[
              { type: "Сравнение с дорогим", ex: "«Dyson Airwrap за 150 000 тенге? Вот аналог за 15 000, и он делает то же самое»" },
              { type: "До/После", ex: "«Мои волосы ДО и ПОСЛЕ этого стайлера» (split screen)" },
              { type: "Процесс", ex: "«Как я делаю шашлык дома за 15 минут» (таймлапс)" },
              { type: "Реакция", ex: "«Муж не поверил, что я это сделала блендером» (реакция человека)" },
              { type: "Списочный", ex: "«3 вещи с Kaspi, которые изменили мою кухню» (каждый = отдельный клип)" },
              { type: "Unboxing", ex: "«Распаковка заказа с Kaspi» (ASMR + показ комплектации)" },
              { type: "Лайфхак", ex: "«Лайфхак: массажёр за 4 000 тенге снимает боль после тренировки лучше, чем массаж за 10 000»" },
            ].map((h, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${C.accent}40`, paddingLeft: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>{h.type}</div>
                <div style={{ fontSize: 12, color: "#ccc", fontStyle: "italic" }}>{h.ex}</div>
              </div>
            ))}
          </div>
        </Step>

        {/* ═══ STEP 6: MOBS.IO DEEPLINK ═══ */}
        <Step num={6} title="Mobs.io — создание deeplink на Kaspi">
          <div style={{ ...sCard, background: `${C.kaspi}06`, border: `1px solid ${C.kaspi}25` }}>
            <div style={{ fontSize: 12, color: C.kaspi, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Зачем deeplink</div>
            <p style={sP}>
              Обычная ссылка на Kaspi открывает браузер. <strong style={{ color: C.text }}>Deeplink через Mobs.io открывает сразу приложение Kaspi</strong> на карточке товара — покупатель в одном клике от «В корзину». Конверсия в 3–5 раз выше, чем через браузер.
            </p>
          </div>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Пошаговая инструкция</h4>

          <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.4 }}>
            {[
              "Заходим на mobs.io и регистрируемся (email + пароль)",
              "В личном кабинете выбираем «Создать ссылку» → раздел Kaspi (есть готовый шаблон для Kaspi deeplinks)",
              "Вставляем URL товара на Kaspi — например: kaspi.kz/shop/p/blender-parovarka-a-liqe-qamqor-2708-belyi-150807944",
              "Mobs.io автоматически сгенерирует короткую ссылку (mobs.io/xxxxx), которая:\n   • На телефоне → откроет приложение Kaspi на карточке товара\n   • На десктопе → откроет веб-версию Kaspi",
              "Копируем ссылку → вставляем в описание TikTok / Instagram Reels / YouTube Shorts",
              "Для каждого товара создаём свою ссылку — так можно отслеживать, какой креатив приводит продажи",
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${C.kaspi}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.kaspi, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ whiteSpace: "pre-line" }}>{s}</div>
              </div>
            ))}
          </div>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Deeplinks для товаров A-LIQE (готовые URL для Mobs.io)</h4>

          <DataTable headers={["Товар", "Kaspi URL (вставить в Mobs.io)"]} rows={[
            ["Блендер-пароварка QAMQOR", "kaspi.kz/shop/p/-150807944"],
            ["Тестомес GrandMix Pro 1500", "kaspi.kz/shop/p/-160355158"],
            ["GrandMix Digital 1500", "kaspi.kz/shop/p/-160136809"],
            ["Air Power стайлер", "kaspi.kz/shop/p/a-liqe-air-power-stailer-seryi-fioletovyi-139955231"],
            ["S9 Ionic фен-стайлер", "kaspi.kz/shop/p/a-liqe-s9-ionic-fen-seryi-140371157"],
            ["MG-Titanium мясорубка", "kaspi.kz/shop/p/mjasorubka-a-liqe-mg-titanium-pro-chernyi-serebristyi-143159393"],
            ["Шашлычница TF-8007", "kaspi.kz/shop/p/shashlychnitsa-a-liqe-tf-8007-chernyi-serebristyi-152056651"],
            ["Блендер Elit X12", "kaspi.kz/shop/p/blender-statsionarnyj-a-liqe-elit-x12-serebristyi-142931942"],
            ["Массажёр X9", "kaspi.kz/shop/p/-139955212"],
            ["Наушники TWS", "kaspi.kz/shop/p/naushniki-a-liqe-tws-chernyi-139883364"],
            ["AI-очки", "kaspi.kz/shop/p/-149294355"],
            ["Шашлычница электрическая", "kaspi.kz/shop/p/shashlychnitsa-a-liqe-tf-8007-chernyi-149333810"],
          ]} />

          <div style={{ borderLeft: `3px solid ${C.kaspi}`, paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "#ccc", lineHeight: 1.7 }}>
            <strong style={{ color: C.kaspi }}>Важно: </strong>
            Каждый товар = отдельный deeplink. Это даёт аналитику: видно, какой креатив (видео) привёл больше продаж. В Mobs.io есть статистика по кликам — можно отслеживать, какие видео «залетают».
          </div>
        </Step>

        {/* ═══ STEP 7: LAUNCH ═══ */}
        <Step num={7} title="Запуск: где и как публиковать">
          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>Платформы для органического трафика</h4>

          <DataTable headers={["Платформа", "Формат", "Ссылка", "Примечание"]} rows={[
            ["TikTok", "Видео 15–60 сек, вертикальное 9:16", "Deeplink в описании профиля (linktree или напрямую)", "Основной канал. Хештеги: #kaspi #алматы #лайфхак #кухня"],
            ["Instagram Reels", "Видео 15–90 сек, 9:16", "Deeplink в stories (свайп вверх) или в описании профиля", "Сторис + рилс = 2 точки входа"],
            ["YouTube Shorts", "Видео до 60 сек, 9:16", "Deeplink в описании видео (кликабельная ссылка!)", "Единственная платформа с кликабельной ссылкой в описании видео"],
          ]} />

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Стратегия публикаций</h4>

          <div style={sCard}>
            {[
              { rule: "1 товар = минимум 3 видео", why: "Разные хуки, разные форматы. Одно из трёх залетит" },
              { rule: "Публикуем каждый день", why: "Алгоритм TikTok/Reels отдаёт предпочтение активным аккаунтам" },
              { rule: "Первые 3 секунды = решают всё", why: "Если не зацепил за 3 секунды — свайп. Хук должен быть провокационным" },
              { rule: "Субтитры обязательны", why: "80% смотрят без звука. Текст = ваш голос" },
              { rule: "CTA в конце: «Ссылка в описании»", why: "Прямой призыв к действию. Без CTA = 0 переходов" },
              { rule: "Отслеживать в Mobs.io", why: "Через 7 дней — смотрим, какие видео дали клики. Масштабируем лучшие" },
            ].map((r, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${C.green}40`, paddingLeft: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{r.rule}</div>
                <div style={{ fontSize: 12, color: C.dim }}>{r.why}</div>
              </div>
            ))}
          </div>
        </Step>

        {/* ═══ CHECKLIST ═══ */}
        <div style={{ ...sCard, borderLeft: `4px solid ${C.green}`, marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: C.green, margin: "0 0 20px" }}>Чеклист: от идеи до продажи</h3>
          {[
            "Выбрать товар из таблицы A-LIQE",
            "Вбить ключевые слова в Minea → отфильтровать: TikTok Ads, > 1K лайков, > 7 дней",
            "Параллельно проверить TikTok Creative Center → Top Ads → по своей категории",
            "Параллельно проверить Facebook Ads Library → видео, активные > 14 дней",
            "Если есть Shopify-магазин рекламодателя → валидировать через ShopHunter ($1K+/день)",
            "Скачать 3–5 лучших креативов-референсов",
            "Снять 3 видео по мотивам: разные хуки, свой товар A-LIQE, субтитры на русском",
            "Создать deeplink в Mobs.io для каждого товара",
            "Опубликовать видео на TikTok + Reels + Shorts с deeplink в описании",
            "Через 7 дней: проверить Mobs.io — какие видео дали клики → масштабировать лучшие",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, fontSize: 13, color: "#ccc" }}>
              <div style={{ width: 22, height: 22, borderRadius: 4, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.dim, flexShrink: 0 }}>{i + 1}</div>
              <div>{item}</div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ padding: "20px 24px", background: `${C.accent}08`, borderRadius: 12, border: `1px solid ${C.accent}30`, marginTop: 32 }}>
          <p style={{ ...sP, margin: 0, fontSize: 13, color: C.dim }}>
            Гайд составлен под бренд A-LIQE. Сервисы: Minea и ShopHunter — через Group Buy SEO. TikTok Creative Center и Facebook Ads Library — бесплатно. Deeplinks — через Mobs.io.
          </p>
        </div>

      </div>
    </div>
  );
}
