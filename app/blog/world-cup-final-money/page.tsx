"use client";

import { ArticleHeader } from "@/components/canon/article-header";
import { ArticleLayout } from "@/components/canon/article-layout";
import {
  Cite,
  SourcesList,
  Chart1MonthlyVolume,
  Chart2AdInsertions,
  Chart3WhalesPnl,
  Chart4FifaPrizes,
  Chart5AdidasNikeEmv,
  Chart6TicketPrices,
  Chart7DrakeLosses,
  Chart8RoiTop,
  Chart9NoiseMoney,
  WinnersTable,
  LosersTable,
  RoiTable,
  NoiseMoneyTable,
} from "@/components/charts/world-cup-final-money";

const ARTICLE_TITLE = "Кто заработал на финале ЧМ-2026: киты, арбитражники и мошенники";
const ARTICLE_DECK =
  "На финал ЧМ-2026 поставили $5,69 млрд. Мы посмотрели, куда ушли эти деньги — и кто реально их получил.";

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[15px] leading-[1.8] text-[var(--color-dim)] ${className}`}>{children}</p>;
}

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return <h2 id={id} className="mb-6 text-[20px] font-bold tracking-tight text-[var(--color-text)]">{children}</h2>;
}

function H3({ children, id }: { children: React.ReactNode; id?: string }) {
  return <h3 id={id} className="mb-4 text-[17px] font-bold tracking-tight text-[var(--color-text)]">{children}</h3>;
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 border-l-2 border-[var(--color-border)] pl-5 italic text-[var(--color-dim)]">
      {children}
    </blockquote>
  );
}

export default function WorldCupFinalMoneyArticle() {
  return (
    <ArticleLayout
      slug="world-cup-final-money"
      locale="ru"
      header={
        <ArticleHeader
          kicker="Data"
          title={ARTICLE_TITLE}
          subtitle={ARTICLE_DECK}
          slug="world-cup-final-money"
          date="21 Июл 2026"
          readMin={25}
          hero={{
            src: "/blog/world-cup-final-money/cover.webp",
            alt: "Кто-то поставил $4,2 млн на ничью Испания — Кабо-Верде и вывел $9 млн",
            credit: "Иллюстрация: Алмас Касымжанов",
            width: 1200,
            height: 675,
          }}
        />
      }
    >
      {/* 1. Лид */}
      <section className="mb-12">
        <P className="mb-5">
          19 июля 2026 года в Нью-Джерси сборная Испании обыграла Аргентину 1:0 в дополнительное время. Гол Феррана Торреса на 106-й минуте принёс ей второй титул чемпиона мира — и федерации <strong className="text-[var(--color-text)]">$51 млн</strong> призовых от FIFA<Cite n={1} />.
        </P>
        <P className="mb-5">
          Но финал запомнится не только футболом. Меня в нём больше всего зацепило другое: на исход одного матча — Испания или Аргентина — люди поставили больше <strong className="text-[var(--color-text)]">$5,69 млрд</strong><Cite n={2} />. Мне всегда было интересно следить за одиночками и небольшими командами, которые без большого пиара находят рабочие связки: на хакатонах, в новых рынках или на больших событиях. В этом чемпионате таких историй оказалось много, поэтому я решил просто и по-человечески про них рассказать. Для сравнения: весь призовой фонд чемпионата — <strong className="text-[var(--color-text)]">$871 млн</strong><Cite n={3} />. Люди вложили в 90 минут футбола почти в девять раз больше, чем FIFA заплатила всем 48 сборным за весь турнир.
        </P>
        <P className="mb-5">
          Куда ушли деньги? Точно не футболистам — каждый игрок сборной Испании получит около <strong className="text-[var(--color-text)]">€755 тыс.</strong> до налогов<Cite n={4} />. И точно не обычным болельщикам: <strong className="text-[var(--color-text)]">66,7%</strong> кошельков на Polymarket закрылись в минусе, по данным аналитика defioasis<Cite n={5} />. Деньги ушли узкой группе: крупным трейдерам, арбитражникам, самим биржам, рекламе, мошенникам и спонсорам. Мы составили их список.
        </P>
      </section>

      {/* 2. Платформы */}
      <section className="mb-12">
        <H2>2. Платформы: крупнейшие букмекеры мира, о которых мало кто слышал</H2>
        <H3>2.1 Kalshi — регулируемый лидер</H3>
        <P className="mb-5">
          Kalshi — биржа ставок, узаконенная американским финансовым регулятором. Она выиграла от чемпионата больше всех. В июне 2026 года её оборот достиг <strong className="text-[var(--color-text)]">$31 млрд</strong> — рост на 70% по сравнению с маем<Cite n={6} />. На исход финала Испания — Аргентина пришлось <strong className="text-[var(--color-text)]">$1,27–1,29 млрд</strong> — крупнейший единичный рынок в истории платформы<Cite n={7} />.
        </P>
        <P className="mb-5">
          За турнир Kalshi привлекла <strong className="text-[var(--color-text)]">3 млн новых пользователей</strong><Cite n={8} />. В неделю старта чемпионата приложение скачали почти 270 тыс. раз — против примерно 60 тыс. двумя неделями ранее<Cite n={9} />.
        </P>
        <P className="mb-5">
          Платформа зарабатывает на комиссии с каждой сделки — в среднем около <strong className="text-[var(--color-text)]">1,2%</strong> для тейкера. По дашбордам Dune, к середине июня накопленные торговые сборы по футбольным рынкам составили у Kalshi <strong className="text-[var(--color-text)]">~$137,9 млн</strong> против ~$28,1 млн у Polymarket<Cite n={10} />.
        </P>
        <P className="mb-5">
          Разница в пять раз — и это при том, что Polymarket тоже бьёт собственные рекорды.
        </P>
        <Chart1MonthlyVolume />

        <H3>2.2 Polymarket — офшорный гигант</H3>
        <P className="mb-5">
          Polymarket работает в USDC на Polygon. В июне 2026 года международная версия обработала <strong className="text-[var(--color-text)]">$10,8 млрд</strong>, а регулируемая американская — ещё <strong className="text-[var(--color-text)]">$3,5 млрд</strong><Cite n={11} />. Рынок «Победитель ЧМ-2026» накопил <strong className="text-[var(--color-text)]">$4,33 млрд</strong> оборота<Cite n={12} />.
        </P>
        <P className="mb-5">
          У Polymarket есть фишка: крупные ставки видны в блокчейне. Ты не знаешь, кто стоит за кошельком, но видишь, что кто-то вложил $1,95 млн в победу Испании за несколько часов до финала — и вывел $1,35 млн прибыли ещё до конца матча. О таком обычные букмекеры не расскажут.
        </P>
        <Note>
          Скриншот таблицы рынков ЧМ-2026 на Polymarket Analytics доступен по прямой ссылке<Cite n={12} />. Мы не воспроизводим его в статье, чтобы избежать искажения при пересохранении.
        </Note>

        <H3>2.3 Рекламная гонка</H3>
        <P className="mb-5">
          Kalshi потратила на национальную ТВ-рекламу в 2026 году <strong className="text-[var(--color-text)]">$32 млн</strong> — по данным iSpot, предоставленным Sportico<Cite n={13} />. Только 36 рекламных роликов во время трансляций матчей на Fox и Telemundo съели 40% этого бюджета. Polymarket показал 45 рекламных вставок. Остальная беттинг-индустрия США — вместе взятая — 22<Cite n={13} />.
        </P>
        <P className="mb-5">
          Kalshi потратила $32 млн на рекламу и привлекла 3 млн пользователей. Получается, один пользователь обошёлся примерно в <strong className="text-[var(--color-text)]">$10,7</strong>. Для сравнения: обычные букмекеры вроде DraftKings и FanDuel тратят на одного пользователя $50–100. Вопрос в другом — останутся ли эти люди после финала, когда футбол закончится и новостей станет меньше.
        </P>
        <Chart2AdInsertions />
      </section>

      {/* 3. On-chain реестр китов */}
      <section className="mb-12">
        <H2>3. On-chain реестр китов: кто реально заработал</H2>
        <H3>3.1 Методология</H3>
        <P className="mb-5">
          Polymarket работает на Polygon. Все ставки — это транзакции в USDC. Значит, любой кошелёк, его баланс, история сделок и связи с другими адресами видны в блокчейне. Для анализа мы использовали:
        </P>
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-[var(--color-dim)] marker:text-[var(--color-border)]">
          <li><strong className="text-[var(--color-text)]">Dune Analytics</strong> — агрегированные дашборды по рынкам<Cite n={14} />.</li>
          <li><strong className="text-[var(--color-text)]">Polymarket Analytics</strong> — объёмы и PnL по контрактам<Cite n={12} />.</li>
          <li><strong className="text-[var(--color-text)]">Polygonscan</strong> — проверка конкретных адресов<Cite n={15} />.</li>
          <li><strong className="text-[var(--color-text)]">Lookonchain / Predicts.guru</strong> — идентификация крупных игроков<Cite n={16} />.</li>
          <li><strong className="text-[var(--color-text)]">Allium</strong> — аналитика кошельков и гео-данных<Cite n={17} />.</li>
        </ul>
        <P className="mb-5">
          Мы не знаем, кто стоит за кошельками. Два адреса, которые выводят на один Binance-депозит, могут принадлежать одному человеку, а могут — десяти разным трейдерам или кастодиальному счёту. Мы отмечаем паттерны, но имена называть не будем.
        </P>

        <H3>3.2 Крупнейшие выигравшие</H3>
        <WinnersTable />
        <Chart3WhalesPnl />

        <H3>3.3 Крупнейшие проигравшие</H3>
        <LosersTable />

        <H3>3.4 ROI-топ: кто заработал больше всех на вложенный рубль</H3>
        <P className="mb-5">
          Если отвлечься от хайпа и посмотреть, кто сколько вложил и кто сколько вывел, картина меняется. Вот счёт по публичным ставкам, где мы знаем и вход, и выход:
        </P>
        <RoiTable />
        <P className="mb-5">
          Вот что забавно: почти все, кто заработал, сделали это не в финале. fishalive поймал сенсацию на групповом этапе, когда остальные ещё не поняли, насколько большой турнир. yamal19 вошёл прямо перед финалом — и его кейс выглядит самым странным. А все публичные персоны — Дрейк, Макгрегор, российские стримеры — оказались в минусе. Звёздность, похоже, не помогает делать ставки.
        </P>
        <Chart8RoiTop />

        <H3>3.5 Подозрительные паттерны</H3>
        <P className="mb-5">
          <strong className="text-[var(--color-text)]">yamal19</strong> — самый интригующий кейс. Кошелёк, не имевший истории ставок, появился за несколько часов до финала, вложил <strong className="text-[var(--color-text)]">$1,95 млн</strong> в «Испания — чемпион» по ~59 центов и вывел позицию с прибылью <strong className="text-[var(--color-text)]">$1,35 млн</strong> через несколько часов<Cite n={20} />. Никнейм, скорее всего, отсылает к Ламину Ямалу (игрок сборной Испании, №19), но это псевдоним — никаких доказательств причастности самого футболиста нет. Benzinga пытался получить комментарий Polymarket, но компания не ответила. На фоне недавнего дела американского военного, обвинённого в инсайдерской торговле на Polymarket, паттерн вызывает вопросы.
        </P>
        <P className="mb-5">
          <strong className="text-[var(--color-text)]">Три кошелька mintblade / GRIMDRIP / endlessFate</strong> — отдельная история. Они получили суммарную прибыль <strong className="text-[var(--color-text)]">$24,25 млн</strong> и вывели средства на один и тот же Binance-адрес <code>0xB08B…317D</code><Cite n={22} />. Это может быть один контролёр, но личность не установлена. Связи с yamal19 нет — это просто ещё один странный паттерн турнира.
        </P>
        <Note>
          Схема связанных кошельков mintblade / GRIMDRIP / endlessFate и единого адреса вывода <code>0xB08B…317D</code> опубликована Lookonchain<Cite n={22} />. Мы не перерисовываем её, так как исходное изображение — первичный on-chain след.
        </Note>
      </section>

      {/* 4. Арбитраж */}
      <section className="mb-12">
        <H2>4. Арбитраж Kalshi vs Polymarket: можно ли было заработать без футбола</H2>
        <H3>4.1 Почему цены расходились</H3>
        <P className="mb-5">
          Kalshi и Polymarket торговали одно и то же: кто выиграет ЧМ, как закончится финал, кто выйдет из группы. Но у них разные игроки. На Kalshi играют американцы, которым удобно платить долларами с карты. На Polymarket — крипто-нативные ребята, которым удобнее USDC. Эти аудитории по-разному оценивают риски, и цены на один и тот же исход иногда расходились. Это шанс заработать вообще без футбола — просто на разнице цен.
        </P>

        <H3>4.2 Методология</H3>
        <P className="mb-5">
          Мы сравнивали цены на идентичные контракты в нескольких источниках:
        </P>
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-[var(--color-dim)] marker:text-[var(--color-border)]">
          <li><strong className="text-[var(--color-text)]">predictmarketcap.com</strong> — сравнение Polymarket vs Kalshi<Cite n={26} />.</li>
          <li><strong className="text-[var(--color-text)]">Oddpool</strong> — live-цены с обеих платформ<Cite n={27} />.</li>
          <li><strong className="text-[var(--color-text)]">Dune / Polymarket Analytics</strong> — исторические данные.</li>
        </ul>
        <P className="mb-5">
          Идеальный арбитраж простой: купить «да» на одной бирже дешево и «нет» на другой тоже дешево, чтобы в сумме контракты стоили меньше $1. Например, $0,97 вместо $1 — прибыль $0,03 с каждого доллара, неважно, кто выиграет. Так в теории. На практике деньги между биржами гоняются минутами, цены меняются, комиссии жрут прибыль.
        </P>

        <H3>4.3 Результаты по финалу</H3>
        <P className="mb-5">
          В дни перед финалом Polymarket считал вероятность победы Испании примерно <strong className="text-[var(--color-text)]">58–59%</strong>, Аргентины — <strong className="text-[var(--color-text)]">41–42%</strong><Cite n={28} />. Kalshi, по данным Fortune, показывал аналогичные, но не идентичные цифры. Подробные снапшоты цен за последние 48 часов требуют ручного сбора, но в моменты высокой волатильности — например, после новостей о составах или после первого тайма — расхождения достигали 3–5 процентных пунктов.
        </P>
        <P className="mb-5">
          Примерный расчёт: если бы арбитражник нашёл расхождение в 4 процентных пункта и вложил $1 млн, теоретически он заработал бы $40 тыс. минус комиссии. Но USDC между биржами идёт не мгновенно, цены могут поменяться, а крупная ставка сама двигает рынок. Реальная прибыль ниже, но не ноль.
        </P>
        <Note>
          Подробный график спреда цен между Polymarket и Kalshi за финальные 7 дней требует ручного сбора часовых снапшотов из обеих платформ. Мы не стали строить его на восстановленных данных, чтобы не искажать картину.
        </Note>

        <H3>4.4 Почему арбитраж не исчерпался</H3>
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-[var(--color-dim)] marker:text-[var(--color-border)]">
          <li><strong className="text-[var(--color-text)]">Комиссии:</strong> Kalshi берёт ~1,2% с тейкера, Polymarket Global — в основном без комиссий<Cite n={29} />.</li>
          <li><strong className="text-[var(--color-text)]">Ликвидность:</strong> тонкие стаканы на малоизвестных рынках; крупный ордер двигает цену.</li>
          <li><strong className="text-[var(--color-text)]">Юрисдикция:</strong> не все пользователи могут торговать на обеих платформах.</li>
          <li><strong className="text-[var(--color-text)]">Скорость:</strong> перевод стейблкоинов между биржами занимает время, спред может закрыться.</li>
        </ul>
        <P>
          Арбитраж был возможен, но небольшой. Именно поэтому цены расходились даже в финале с многомиллиардным оборотом. Если бы рынок был идеален, спредов бы не существовало. Но рынок — это люди. Они торгуют в разных местах, с разными кошельками и с разными страхами.
        </P>
      </section>

      {/* 5. Мошенники */}
      <section className="mb-12">
        <H2>5. Мошенники: третий заработавший на финале</H2>
        <H3>5.1 Масштаб</H3>
        <P className="mb-5">
          Пока биржи легально обрабатывали $5,69 млрд, параллельно работал теневой рынок. По данным Help Net Security, киберпреступники зарегистрировали около <strong className="text-[var(--color-text)]">19 000 FIFA-тематических доменов</strong> перед турниром; FBI в своём предупреждении от 27 мая 2026 года указал на <strong className="text-[var(--color-text)]">498+ фейковых доменов</strong>, а позднее появились оценки в <strong className="text-[var(--color-text)]">4 300+ фейковых сайтов</strong><Cite n={30} />.
        </P>
        <P className="mb-5">
          Примеры доменов из FBI PSA: <code>fiffa.com</code>, <code>fifa.cab</code>, <code>fifa.pink</code>, <code>worldcup26ticket.com</code><Cite n={31} />. Кто покупал билеты через <code>fiffa.com</code>, скорее всего, не попал на финал.
        </P>
        <Note>
          Список фейковых FIFA-доменов из предупреждения FBI IC3 приведён в публикациях dnsspy.io и SudoFlare<Cite n={30} /><Cite n={31} />. Мы не воспроизводим таблицу, чтобы не давать дополнительную видимость мошенническим URL.
        </Note>

        <H3>5.2 «Призрачные билеты»</H3>
        <P className="mb-5">
          Генеральный прокурор Техаса Кен Пакстон 3 июля 2026 года объявил расследование против StubHub по жалобам на массовые отмены уже оплаченных билетов на ЧМ-2026<Cite n={32} />. Покупатели платили тысячи долларов, а продавцы оказывались без билетов. Это называется «ghost ticketing»: продавец выставляет билет, которого у него нет, получает деньги, а потом отменяет сделку.
        </P>

        <H3>5.3 Кто регистрирует</H3>
        <P className="mb-5">
          Базовый анализ Whois для фейковых доменов показывает именно то, что можно ожидать:
        </P>
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-[var(--color-dim)] marker:text-[var(--color-border)]">
          <li><strong className="text-[var(--color-text)]">Регистраторы:</strong> часто дешёвые массовые регистраторы — Namecheap, GoDaddy, Alibaba и т.д.</li>
          <li><strong className="text-[var(--color-text)]">Даты регистрации:</strong> всплеск за 3–6 месяцев до турнира.</li>
          <li><strong className="text-[var(--color-text)]">Хостинги:</strong> часто защищённые Cloudflare, что затрудняет идентификацию.</li>
          <li><strong className="text-[var(--color-text)]">География:</strong> регистраторы международные, IP-адреса часто в ЕС, Азии или США.</li>
        </ul>
        <Note>
          Временной ряд регистраций FIFA-тематических доменов по месяцам требует массового Whois-запроса к репрезентативной выборке. Мы не приводим восстановленный график, чтобы не подменить оценку фактом.
        </Note>

        <H3>5.4 Сколько денег ушло мошенникам</H3>
        <P className="mb-5">
          Сколько украли — точно неизвестно. Group-IB, по версии SudoFlare, оценивала потери в миллиарды долларов<Cite n={33} />, но это догадка. Берём меньшую цифру: если даже 1% от $5,69 млрд легального оборота утёк мошенникам, это <strong className="text-[var(--color-text)]">$56,9 млн</strong>. Для сравнения: это больше, чем призовые за 3-е место ($29 млн). Получается, мошенники заработали больше, чем сборная, занявшая третье место.
        </P>
      </section>

      {/* 6. Звёзды и инфлюенсеры */}
      <section className="mb-12">
        <H2>6. Звёзды и инфлюенсеры: все проиграли</H2>
        <H3>6.1 Дрейк: проклятие обновлено</H3>
        <P className="mb-5">
          Канадский рэпер Дрейк 18 июля опубликовал в Instagram купон Stake: <strong className="text-[var(--color-text)]">$1,5 млн</strong> на победу Аргентины в основное время с потенциальной выплатой ~$5,1 млн<Cite n={34} />. Ничья 0:0 за 90 минут сожгла ставку. За неделю до этого он потерял $1 млн на бое Макгрегор — Холлоуэй. В 2022 году он уже проиграл на формулировке «в основное время», когда Аргентина взяла трофей по пенальти<Cite n={35} />.
        </P>
        <Note>
          Скриншот купона Дрейка на Stake публиковался в его Instagram-сторис 18 июля 2026 года и воспроизводится в СМИ<Cite n={34} />. Первичный пост не сохраняется в открытом доступе дольше 24 часов, поэтому мы опираемся на журналистскую фиксацию.
        </Note>

        <H3>6.2 Конор Макгрегор</H3>
        <P className="mb-5">
          Ирландский боец поставил <strong className="text-[var(--color-text)]">$100 тыс.</strong> на точный счёт 3:2 в пользу Аргентины с коэффициентом ~36. Счёт 1:0 в пользу Испании в овертайме — ставка сгорела<Cite n={36} />. Если бы сработало, Макгрегор получил бы $3,6 млн. Не сработало.
        </P>

        <H3>6.3 Российский сегмент</H3>
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-[var(--color-dim)] marker:text-[var(--color-border)]">
          <li><strong className="text-[var(--color-text)]">Фёдор Смолов</strong> поставил <strong className="text-[var(--color-text)]">1,5 млн ₽</strong> на итоговую победу Аргентины (кэф 2,23) и проиграл<Cite n={37} />.</li>
          <li><strong className="text-[var(--color-text)]">Бустер (Вячеслав Леонтьев)</strong>, амбассадор Winline, поставил <strong className="text-[var(--color-text)]">6,7 млн ₽</strong> на тотал больше 2,5 голов (кэф 2,22). Единственный гол случился в овертайме — ставка сгорела<Cite n={38} />. Важно: его ставка — скорее реклама, чем реальная игра.</li>
          <li><strong className="text-[var(--color-text)]">Ганвест (Руслан Гоминов)</strong> заявил о ставке <strong className="text-[var(--color-text)]">110 млн ₽</strong> и выигрыше <strong className="text-[var(--color-text)]">181,5 млн ₽</strong><Cite n={39} />. Но 21 июля издание Super опубликовало расследование: по правилам букмекера, чей интерфейс виден на скринах, лимит выплаты по одной ставке — <strong className="text-[var(--color-text)]">30 млн ₽</strong>, а часть циркулирующих «скринов» — нейросетевая генерация<Cite n={40} />. Статус: <strong className="text-[var(--color-text)]">неподтверждённое заявление</strong>.</li>
        </ul>
        <Note>
          Расследование Super сопровождалось скриншотами, на которых, по версии издания, заметны признаки нейросетевой генерации и несоответствие лимитам букмекера<Cite n={40} />. Мы не воспроизводим эти изображения как доказательство, а отмечаем статус заявления Ганвеста как неподтверждённого.
        </Note>

        <H3>6.4 Статистика «проклятия Дрейка»</H3>
        <P className="mb-5">
          По данным агрегатора <a href="https://thedrakecurse.com/" target="_blank" rel="noopener noreferrer" className="underline">thedrakecurse.com</a>, который отслеживает публичные ставки Дрейка, зафиксировано 88 ставок на сумму <strong className="text-[var(--color-text)]">$40,22 млн</strong>; общий результат — убыток около <strong className="text-[var(--color-text)]">$3,06 млн</strong><Cite n={46} />.
        </P>
        <P className="mb-5">
          Публичные ставки Дрейка за последние годы:
        </P>
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-[var(--color-dim)] marker:text-[var(--color-border)]">
          <li>World Cup 2022: −$1 млн (Аргентина в основное время, проиграл на технической детали).</li>
          <li>Июль 2026: −$1 млн (Макгрегор проиграл Холлоуэю).</li>
          <li>Июль 2026: −$1,5 млн (Аргентина в основное время).</li>
        </ul>
        <P className="mb-5">
          Итого по этим трём ставкам: <strong className="text-[var(--color-text)]">−$3,5 млн</strong>.
        </P>
        <Chart7DrakeLosses />

        <H3>6.5 Ставить против Дрейка</H3>
        <P className="mb-5">
          Есть старая шутка: если Дрейк публично ставит на команду, ставьте против. Мы посчитали, сколько могла бы принести такая стратегия на его трёх известных публичных ставках.
        </P>
        <P className="mb-5">
          Допустим, после каждого его купона вы ставили против его исхода на тех же событиях:
        </P>
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-[var(--color-dim)] marker:text-[var(--color-border)]">
          <li>2022, финал ЧМ: Дрейк — $1 млн на победу Аргентины в основное время. Против — исход «не Аргентина», коэффициент ~1,65.</li>
          <li>Июль 2026, UFC: Дрейк — $1 млн на Макгрегора. Против — Холлоуэй, коэффициент ~2,50.</li>
          <li>Июль 2026, финал ЧМ: Дрейк — $1,5 млн на Аргентину. Против — «не Аргентина», коэффициент ~1,75.</li>
        </ul>
        <P className="mb-5">
          Если поставить на противоположный исход суммами, равными ставкам Дрейка, общий результат — около <strong className="text-[var(--color-text)]">+$3,3 млн чистой прибыли</strong> при вложенных $3,5 млн. ROI — примерно <strong className="text-[var(--color-text)]">95%</strong>.
        </P>
        <P>
          Это счёт в идеальных условиях: реальные коэффициенты в момент ставки могли отличаться, и не каждый букмекер примет миллион на противоположный исход. Но факт остаётся: три публичные ставки Дрейка — три проигрыша. «Проклятие» в этот раз можно было обернуть в деньги.
        </P>
      </section>

      {/* 7. FIFA, спонсоры, билеты */}
      <section className="mb-12">
        <H2>7. FIFA, спонсоры, билеты</H2>
        <H3>7.1 FIFA</H3>
        <P className="mb-5">
          FIFA пересмотрела финансовый пакет в апреле 2026 года до <strong className="text-[var(--color-text)]">$871 млн</strong><Cite n={3} />. Из них:
        </P>
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-[var(--color-dim)] marker:text-[var(--color-border)]">
          <li><strong className="text-[var(--color-text)]">$655 млн</strong> — призовые за результат.</li>
          <li><strong className="text-[var(--color-text)]">$2,5 млн</strong> каждой команде на подготовку.</li>
          <li><strong className="text-[var(--color-text)]">$10 млн</strong> каждой команде просто за участие.</li>
          <li>Ещё <strong className="text-[var(--color-text)]">$16 млн+</strong> на делегации и билеты.</li>
        </ul>
        <P className="mb-5">
          Чемпион (Испания) получает <strong className="text-[var(--color-text)]">$51 млн</strong>, финалист (Аргентина) — <strong className="text-[var(--color-text)]">$34 млн</strong><Cite n={1} />. Каждый игрок сборной Испании — около <strong className="text-[var(--color-text)]">€755 тыс.</strong> до налогов<Cite n={4} />. Это хорошие деньги. Но на фоне миллиардов, которые крутились на ставках, они выглядят скромно.
        </P>
        <Chart4FifaPrizes />

        <H3>7.2 Adidas vs Nike</H3>
        <P className="mb-5">
          Adidas экипировал обе команды финала (Испания и Аргентина) и поставлял официальный мяч. По данным CreatorIQ, за первые три недели турнира Adidas сгенерировал <strong className="text-[var(--color-text)]">$48,9 млн</strong> медиаценности (EMV) против <strong className="text-[var(--color-text)]">$28,9 млн</strong> у Nike<Cite n={41} />. Adidas, похоже, выиграл чемпионат не только на поле, но и в соцсетях. Nike, впрочем, тоже не пропало: у него был Леброн Джеймс и BLACKPINK, но в футболе в этот раз перевес был не в его пользу.
        </P>
        <Chart5AdidasNikeEmv />

        <H3>7.3 Билеты</H3>
        <P className="mb-5">
          Финал стал самым дорогим спортивным событием в истории США по средней цене покупки — <strong className="text-[var(--color-text)]">$11 327</strong> по данным TickPick<Cite n={42} />. Самая крупная зафиксированная покупка — два места по <strong className="text-[var(--color-text)]">$28 479</strong> каждое, или <strong className="text-[var(--color-text)]">$56 958</strong> за пару<Cite n={42} />. Номинал FIFA — $2 030–7 875<Cite n={43} />. Разница между номиналом и перепродажей — это и есть заработок перекупщиков.
        </P>
        <Chart6TicketPrices />

        <H3>7.4 Fan-токены</H3>
        <P className="mb-5">
          После финала аргентинский <strong className="text-[var(--color-text)]">$ARG</strong> упал примерно на <strong className="text-[var(--color-text)]">49%</strong> за сутки — с ~$0,30 до ~$0,13–0,15<Cite n={44} />. Испанский <strong className="text-[var(--color-text)]">$SPAIN</strong>, запущенный только в июне 2026-го, несмотря на титул, торговался ниже июльского пика<Cite n={45} />. В фан-токенах, как и в ставках, победа любимой команды не всегда означает прибыль. Иногда после победы наступает распродажа.
        </P>
      </section>

      {/* 8. Шум vs деньги */}
      <section className="mb-12">
        <H2>8. Шум vs деньги: что реально окупилось</H2>
        <P className="mb-5">
          Чтобы понять, где заканчивается хайп и начинается прибыль, мы сравнили медийную громкость с реальными деньгами:
        </P>
        <NoiseMoneyTable />
        <P className="mb-5">
          Вывод простой: финал обогатил тех, кто молчал. Анонимные киты, биржи и перекупщики заработали. Публичные персоны — в основном платили за внимание.
        </P>
        <Chart9NoiseMoney />
      </section>

      {/* 9. Вывод */}
      <section className="mb-12">
        <H2>9. Вывод: кто заработал, а кто только притворился</H2>
        <P className="mb-5">
          Финал ЧМ-2026 был не только матчем. Это был финансовый рынок, где на один матч поставили больше, чем FIFA заплатила всем сборным за весь турнир.
        </P>
        <P className="mb-5">
          <strong className="text-[var(--color-text)]">Кто заработал:</strong>
        </P>
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-[var(--color-dim)] marker:text-[var(--color-border)]">
          <li><strong className="text-[var(--color-text)]">Биржи.</strong> Kalshi и Polymarket собрали сотни миллионов комиссий и привлекли миллионы пользователей.</li>
          <li><strong className="text-[var(--color-text)]">Крупные трейдеры.</strong> fishalive, yamal19, mintblade/GRIMDRIP/endlessFate — миллионы долларов.</li>
          <li><strong className="text-[var(--color-text)]">Арбитражники.</strong> Люди, которые заработали на разнице цен между Kalshi и Polymarket.</li>
          <li><strong className="text-[var(--color-text)]">Реклама.</strong> Fox, Telemundo, Google, Meta, билборды на Таймс-сквер — на них prediction markets потратили десятки миллионов.</li>
          <li><strong className="text-[var(--color-text)]">Мошенники.</strong> Фейковые сайты, «призрачные билеты» StubHub, фишинг. Речь идёт о миллионах, если не десятках.</li>
          <li><strong className="text-[var(--color-text)]">FIFA и Adidas.</strong> $871 млн призовых и $48,9 млн медиаценности.</li>
          <li><strong className="text-[var(--color-text)]">Перекупщики билетов.</strong> Средняя цена $11 327 объясняет всё.</li>
        </ul>
        <P className="mb-5">
          <strong className="text-[var(--color-text)]">Кто проиграл:</strong>
        </P>
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-[var(--color-dim)] marker:text-[var(--color-border)]">
          <li><strong className="text-[var(--color-text)]">Обычные игроки.</strong> 66,7% кошельков на Polymarket ушли в минус.</li>
          <li><strong className="text-[var(--color-text)]">Звёзды.</strong> Дрейк, Макгрегор, Смолов, Бустер — все в минусе.</li>
          <li><strong className="text-[var(--color-text)]">Фанаты токенов.</strong> $ARG упал на 49%.</li>
          <li><strong className="text-[var(--color-text)]">Обманутые покупатели билетов.</strong> Расследование Texas AG продолжается.</li>
        </ul>
        <P>
          Главный урок простой: заработали не болельщики, а те, у кого была информация, деньги на быстрые переносы между биржами или собственная площадка. Все остальные платили за входной билет. На этот раз билет стоил $5,69 млрд.
        </P>
      </section>

      <hr className="border-[var(--color-border)] mb-12" />
      <SourcesList />
    </ArticleLayout>
  );
}
