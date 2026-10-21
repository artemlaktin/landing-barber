export type MasterRole = 'Senior Barber' | 'Manager' | 'Barber' | 'Junior Barber'

export type LocalizedBio = Partial<Record<'pl' | 'en' | 'uk' | 'ru', string>>

export interface Master {
  name: string
  role: MasterRole
  bio: string | LocalizedBio
  photo: string | null
  location: string
  instagram?: string | null
  facebook?: string | null
}

export const masters: Master[] = [
  {
    name: 'Anton Senior',
    role: 'Senior Barber',
    bio: {
      pl: 'Barbering to dla mnie nie tylko zawód, ale pasja, której poświęciłem już ponad 8 lat. To doświadczenie i chęć stworzenia miejsca z wyjątkowym charakterem doprowadziły mnie do założenia GRIZZLY BARBER SHOP. W pracy cenię precyzję, porządek i dbałość o szczegóły, bo właśnie z nich składa się wysoka jakość i najwyższy poziom obsługi. Bliska jest mi muzyka rockowa, rzeczy z charakterem oraz estetyka prawdziwego męskiego wypoczynku. Nieustannie doskonalę swoje umiejętności, szukam nowych pomysłów i rozwijam GRIZZLY, zachowując jego wyjątkową atmosferę.',
      en: "Barbering isn't just a profession to me — it's something I've devoted over 8 years to. That experience, along with a drive to create a place with real character, led me to found GRIZZLY BARBER SHOP. In my work I value precision, order and attention to detail, because that's what quality results and top-level service are built on. I'm drawn to rock music, things with character, and the aesthetic of genuine, unapologetic relaxation. I'm constantly refining my craft, looking for new ideas, and growing GRIZZLY while keeping its unique atmosphere alive.",
      uk: 'Барберинг для мене — це не просто професія, а справа, якій я присвятив уже понад 8 років. Цей досвід і прагнення створити місце з особливим характером привели мене до заснування GRIZZLY BARBER SHOP. У роботі я ціную точність, порядок і увагу до деталей, адже саме з них складається якісний результат і високий рівень сервісу. Мені близькі рок-музика, речі з характером та естетика справжнього чоловічого відпочинку. Я постійно вдосконалюю свою майстерність, шукаю нові ідеї та розвиваю GRIZZLY, зберігаючи його унікальну атмосферу.',
      ru: 'Барберинг для меня — это не просто профессия, а дело, которому я посвятил уже более 8 лет. Этот опыт и стремление создать место с особым характером привели меня к основанию GRIZZLY BARBER SHOP. В работе я ценю точность, порядок и внимание к деталям, ведь именно из них складываются качественный результат и высокий уровень сервиса. Мне близки рок-музыка, вещи с характером и эстетика настоящего мужского отдыха. Я постоянно совершенствую своё мастерство, ищу новые идеи и развиваю GRIZZLY, сохраняя его уникальную атмосферу.',
    },
    photo: '/img/masters/mickiewicza/anton-senior.webp',
    location: 'Mickiewicza',
  },
  {
    name: 'Admin Kateryna',
    role: 'Manager',
    bio: {
      pl: 'Od ponad dwóch lat jestem częścią zespołu Grizzly i dbam o to, aby każdy gość czuł się komfortowo od pierwszych minut. Lubię kontakt z ludźmi, cenię porządek, dbałość o szczegóły i pozytywną atmosferę. Stale się rozwijam, poznając sztukę tatuażu i doskonaląc swoje umiejętności zawodowe.',
      en: "I've been part of the Grizzly team for over two years, making sure every guest feels comfortable from the very first minute. I love talking to people and value order, attention to detail and a positive atmosphere. I'm always growing — learning the art of tattooing and refining my professional skills.",
      uk: 'Уже понад два роки є частиною команди Grizzly і дбаю про те, щоб кожен гість почувався комфортно з перших хвилин. Люблю спілкування з людьми, ціную порядок, увагу до деталей і позитивну атмосферу. Постійно розвиваюся, опановуючи мистецтво татуювання та вдосконалюючи свої професійні навички.',
      ru: 'Уже более двух лет являюсь частью команды Grizzly и забочусь о том, чтобы каждый гость чувствовал себя комфортно с первых минут. Люблю общение с людьми, ценю порядок, внимание к деталям и позитивную атмосферу. Постоянно развиваюсь, осваивая искусство татуировки и совершенствуя свои профессиональные навыки.',
    },
    photo: '/img/masters/piastow/admin-kateryna.webp',
    location: 'Piastów',
  },
  {
    name: 'Staś Senior',
    role: 'Senior Barber',
    bio: {
      pl: 'Barber z ponad 10-letnim doświadczeniem. Przez lata pracy wypracowałem indywidualne podejście do każdego klienta i głębokie zrozumienie męskiego stylu. W swojej pracy cenię precyzję, jakość i dbałość o szczegóły, tworząc wizerunki, które podkreślają charakter. Nieustannie doskonalę swoje umiejętności, aby każdy gość wychodził pewny siebie i z chęcią powrotu.',
      en: "A barber with over 10 years of experience. Over the years I've developed an individual approach to every client and a deep understanding of men's style. In my work I value precision, quality and attention to detail, creating looks that highlight character. I constantly refine my skills so that every guest leaves with confidence and the wish to come back.",
      uk: 'Барбер із досвідом понад 10 років. За роки роботи сформував індивідуальний підхід до кожного клієнта та глибоке розуміння чоловічого стилю. У своїй роботі ціную точність, якість та увагу до деталей, створюючи образи, які підкреслюють характер. Постійно вдосконалюю свої навички, щоб кожен гість ішов з упевненістю в собі та бажанням повернутися знову.',
      ru: 'Барбер с опытом более 10 лет. За годы работы сформировал индивидуальный подход к каждому клиенту и глубокое понимание мужского стиля. В своей работе ценю точность, качество и внимание к деталям, создавая образы, которые подчеркивают характер. Постоянно совершенствую свои навыки, чтобы каждый гость уходил с уверенностью в себе и желанием вернуться снова.',
    },
    photo: '/img/masters/piastow/stas-senior.webp',
    location: 'Piastów',
  },
  {
    name: 'Julia Senior',
    role: 'Senior Barber',
    bio: {
      pl: 'Barber z 4-letnim doświadczeniem, od ponad 3 lat w zespole Grizzly. Specjalizuję się w nowoczesnych fryzurach, pracy z długimi włosami i trwałej ondulacji, tworząc wizerunek, który podkreśla indywidualność klienta. Od ponad roku szkolę przyszłych barberów, przekazując swoje doświadczenie i nieustannie doskonaląc własne umiejętności. W pracy cenię precyzję, komfortową atmosferę i indywidualne podejście do każdego gościa.',
      en: "A barber with 4 years of experience and part of the Grizzly team for over 3 years. I specialise in modern cuts, working with long hair and perms, creating looks that highlight each client's individuality. For over a year I've been training future barbers, sharing my experience while constantly refining my own skills. In my work I value precision, a comfortable atmosphere and an individual approach to every guest.",
      uk: 'Барбер із 4-річним досвідом і вже понад 3 роки частина команди Grizzly. Спеціалізуюся на сучасних стрижках, роботі з довгим волоссям і біозавивці, створюючи образ, який підкреслює індивідуальність клієнта. Понад рік навчаю майбутніх барберів, передаючи свій досвід і постійно вдосконалюючи власні навички. У роботі ціную точність, комфортну атмосферу та індивідуальний підхід до кожного гостя.',
      ru: 'Барбер с 4-летним опытом и уже более 3 лет часть команды Grizzly. Специализируюсь на современных стрижках, работе с длинными волосами и биозавивке, создавая образ, который подчеркивает индивидуальность клиента. Более года обучаю будущих барберов, передавая свой опыт и постоянно совершенствуя собственные навыки. В работе ценю точность, комфортную атмосферу и индивидуальный подход к каждому гостю.',
    },
    photo: '/img/masters/piastow/julia-senior.webp',
    location: 'Piastów',
  },
  {
    name: 'Julia Blond',
    role: 'Senior Barber',
    bio: {
      pl: 'W branży beauty od ponad 9 lat, z czego 4 lata pracuję jako barber, a od 3 lat jestem częścią zespołu Grizzly. Specjalizuję się w nowoczesnych fryzurach, fade i pracy z długimi włosami, a także wykonuję koloryzację i rozjaśnianie. Cenię precyzję, wyczucie stylu i indywidualne podejście do każdego klienta. Moim celem jest podkreślenie charakteru i stworzenie wizerunku, w którym człowiek poczuje się pewnie.',
      en: "Over 9 years in the beauty industry, 4 of them as a barber, and I've been part of the Grizzly team for 3 years now. I specialise in modern cuts, fades and working with long hair, and I also do colouring and lightening. I value precision, a sense of style and an individual approach to every client. My goal is to bring out your character and create a look you'll feel confident in.",
      uk: 'В індустрії краси понад 9 років, з них 4 роки працюю барбером і вже 3 роки є частиною команди Grizzly. Спеціалізуюся на сучасних стрижках, fade і роботі з довгим волоссям, а також виконую фарбування та освітлення. Ціную точність, відчуття стилю та індивідуальний підхід до кожного клієнта. Моя мета — підкреслити характер і створити образ, у якому людина почуватиметься впевнено.',
      ru: 'В индустрии красоты более 9 лет, из них 4 года работаю барбером и уже 3 года являюсь частью команды Grizzly. Специализируюсь на современных стрижках, fade и работе с длинными волосами, а также выполняю окрашивание и осветление. Ценю точность, чувство стиля и индивидуальный подход к каждому клиенту. Моя цель — подчеркнуть характер и создать образ, в котором человек будет чувствовать себя уверенно.',
    },
    photo: '/img/masters/piastow/julia-blond.webp',
    location: 'Piastów',
  },
  {
    name: 'Danil',
    role: 'Barber',
    bio: {
      pl: 'Pomagam dobrać fryzurę z uwzględnieniem struktury włosów, kształtu twarzy i stylu życia, a także podpowiem, jak łatwo układać włosy w domu. Stale się rozwijam, szybko doskonalę swoje umiejętności i z dużym zaangażowaniem podchodzę do każdego klienta. Cenię dobry efekt, komfortową atmosferę i otwartą komunikację, bo właśnie z takich detali składa się świetna obsługa.',
      en: "I help choose a haircut that suits your hair type, face shape and lifestyle, and I'll show you how to style your hair easily at home. I'm always growing, quickly improving my skills, and I bring real enthusiasm to every client. I value quality results, a comfortable atmosphere and open communication, because great service is built from exactly these details.",
      uk: 'Допомагаю підібрати стрижку з урахуванням структури волосся, форми обличчя та способу життя, а також підкажу, як легко вкладати волосся вдома. Постійно розвиваюся, швидко вдосконалюю свої навички і з великим ентузіазмом ставлюся до кожного клієнта. Ціную якісний результат, комфортну атмосферу й відкрите спілкування, адже саме з таких деталей складається чудовий сервіс.',
      ru: 'Помогаю подобрать стрижку с учетом структуры волос, формы лица и образа жизни, а также подскажу, как легко укладывать волосы дома. Постоянно развиваюсь, быстро совершенствую свои навыки и с большим энтузиазмом отношусь к каждому клиенту. Ценю качественный результат, комфортную атмосферу и открытое общение, ведь именно из таких деталей складывается отличный сервис.',
    },
    photo: '/img/masters/niebuszewo/danil.webp',
    location: 'Niebuszewo',
  },
  {
    name: 'Matvij',
    role: 'Barber',
    bio: {
      pl: 'Od ponad dwóch lat pracuję w zespole Grizzly. Specjalizuję się w nowoczesnych fryzurach i wszystkich rodzajach fade, a także pomagam dobrać wizerunek z uwzględnieniem cech wyglądu każdego klienta. Ważne są dla mnie precyzja, dbałość o szczegóły i efekt, który łatwo powtórzyć w domu dzięki właściwej stylizacji i moim wskazówkom.',
      en: "I've been working with the Grizzly team for over two years. I specialise in modern cuts and every kind of fade, and I help you find a look that suits your features. Precision, attention to detail and a result you can easily recreate at home — thanks to the right styling and my recommendations — matter to me.",
      uk: 'Уже понад два роки працюю в команді Grizzly. Спеціалізуюся на сучасних стрижках і всіх видах fade, а також допомагаю підібрати образ з урахуванням особливостей зовнішності кожного клієнта. Для мене важливі точність, увага до деталей і результат, який легко повторити вдома завдяки правильному вкладанню та моїм рекомендаціям.',
      ru: 'Уже более двух лет работаю в команде Grizzly. Специализируюсь на современных стрижках и всех видах fade, а также помогаю подобрать образ с учетом особенностей внешности каждого клиента. Для меня важны точность, внимание к деталям и результат, который легко повторить дома благодаря правильной укладке и моим рекомендациям.',
    },
    photo: '/img/masters/piastow/matvij.webp',
    location: 'Piastów',
  },
  {
    name: 'Vlad',
    role: 'Barber',
    bio: {
      pl: 'Barber z dwuletnim doświadczeniem, pewnie pracujący zarówno z klasycznymi, jak i nowoczesnymi męskimi fryzurami. Specjalizuję się w fade, stylizacji brody i pracy z długimi włosami, gdzie szczególnie liczą się precyzja i wyczucie stylu. Cenię dbałość o szczegóły, komfortową atmosferę i otwartą komunikację. Głównym celem jest to, aby każdy klient wychodził z efektem, który w pełni spełnia oczekiwania.',
      en: "A barber with two years of experience, confident with both classic and modern men's cuts. I specialise in fades, beard shaping and working with long hair, where precision and a sense of style matter most. I value attention to detail, a comfortable atmosphere and open communication. My main goal is for every client to leave with a result that fully lives up to their expectations.",
      uk: 'Барбер із дворічним досвідом, який упевнено працює як із класичними, так і з сучасними чоловічими стрижками. Спеціалізуюся на fade, оформленні бороди та роботі з довгим волоссям, де особливо важливі точність і відчуття стилю. Ціную увагу до деталей, комфортну атмосферу та відкрите спілкування. Головна мета — щоб кожен клієнт ішов з результатом, який повністю виправдовує очікування.',
      ru: 'Барбер с двухлетним опытом, уверенно работающий как с классическими, так и с современными мужскими стрижками. Специализируюсь на fade, оформлении бороды и работе с длинными волосами, где особенно важны точность и чувство стиля. Ценю внимание к деталям, комфортную атмосферу и открытое общение. Главная цель — чтобы каждый клиент уходил с результатом, который полностью оправдывает ожидания.',
    },
    photo: '/img/masters/piastow/vlad.webp',
    location: 'Piastów',
  },
  {
    name: 'Dimas',
    role: 'Barber',
    bio: {
      pl: 'Od dziecka interesowałem się stylem i zawsze lubiłem eksperymentować z fryzurami. Z czasem zrozumiałem, że zainteresowanie barberingiem może stać się moją pasją zawodową. W pracy cenię dbałość o szczegóły, precyzję i żywy kontakt z ludźmi. To właśnie motywuje mnie do ciągłego rozwoju i wykonywania każdej fryzury na wysokim poziomie.',
      en: "I've been into style since childhood and always loved experimenting with hairstyles. Over time I realised that my interest in barbering could become the work I love. In my work I value attention to detail, precision and genuine conversation with people. That's exactly what inspires me to keep growing and to deliver every haircut at a high level.",
      uk: 'З дитинства захоплювався стилем і завжди любив експериментувати з зачісками. З часом зрозумів, що інтерес до барберингу може стати улюбленою справою. У роботі ціную увагу до деталей, акуратність і живе спілкування з людьми. Саме це надихає мене постійно розвиватися й робити кожну стрижку на високому рівні.',
      ru: 'С детства увлекался стилем и всегда любил экспериментировать с прическами. Со временем понял, что интерес к барберингу может стать любимым делом. В работе ценю внимание к деталям, аккуратность и живое общение с людьми. Именно это вдохновляет меня постоянно развиваться и делать каждую стрижку на высоком уровне.',
    },
    photo: '/img/masters/mickiewicza/dimas.webp',
    location: 'Mickiewicza',
  },
  {
    name: 'Juli',
    role: 'Barber',
    bio: {
      pl: 'Barber z ponad półtorarocznym doświadczeniem. W pracy cenię dokładność, dbałość o szczegóły i indywidualne podejście do każdego klienta. Nieustannie doskonalę swoje umiejętności, aby każda fryzura i stylizacja brody podkreślały styl i charakter. Głównym celem jest to, aby każdy gość wychodził zadowolony z efektu.',
      en: 'A barber with over a year and a half of experience. In my work I value precision, attention to detail and an individual approach to every client. I constantly improve my skills so that every haircut and beard trim highlights style and character. My main goal is for every guest to leave happy with the result.',
      uk: 'Барбер із досвідом понад півтора року. У роботі ціную акуратність, увагу до деталей та індивідуальний підхід до кожного клієнта. Постійно вдосконалюю свої навички, щоб кожна стрижка й оформлення бороди підкреслювали стиль і характер. Головна мета — щоб кожен гість ішов задоволеним результатом.',
      ru: 'Барбер с опытом более полутора лет. В работе ценю аккуратность, внимание к деталям и индивидуальный подход к каждому клиенту. Постоянно совершенствую свои навыки, чтобы каждая стрижка и оформление бороды подчеркивали стиль и характер. Главная цель — чтобы каждый гость уходил довольным результатом.',
    },
    photo: '/img/masters/mickiewicza/juli.webp',
    location: 'Mickiewicza',
  },
  {
    name: 'Michal',
    role: 'Barber',
    bio: {
      pl: 'Barber, dla którego każda fryzura to połączenie precyzji, stylu i indywidualnego podejścia. Pewnie pracuję zarówno z klasycznymi, jak i nowoczesnymi męskimi fryzurami, pomagając dobrać wizerunek odpowiedni właśnie dla Ciebie. Cenię komfortową atmosferę, otwartą komunikację i dbałość o szczegóły, aby każdy klient wychodził w świetnym nastroju i z idealnym efektem.',
      en: "A barber for whom every haircut is a blend of precision, style and an individual approach. I work confidently with both classic and modern men's cuts, helping you find the look that's right for you. I value a comfortable atmosphere, open communication and attention to detail, so that every client leaves in a great mood and with a perfect result.",
      uk: 'Барбер, для якого кожна стрижка — це поєднання точності, стилю та індивідуального підходу. Впевнено працюю як із класичними, так і з сучасними чоловічими стрижками, допомагаючи підібрати образ, який пасує саме вам. Ціную комфортну атмосферу, відкрите спілкування та увагу до деталей, щоб кожен клієнт ішов з чудовим настроєм та ідеальним результатом.',
      ru: 'Барбер, для которого каждая стрижка — это сочетание точности, стиля и индивидуального подхода. Уверенно работаю как с классическими, так и с современными мужскими стрижками, помогая подобрать образ, который подходит именно вам. Ценю комфортную атмосферу, открытое общение и внимание к деталям, чтобы каждый клиент уходил с отличным настроением и идеальным результатом.',
    },
    photo: '/img/masters/niebuszewo/michal.webp',
    location: 'Niebuszewo',
  },
  {
    name: 'Dima Junior',
    role: 'Junior Barber',
    bio: {
      pl: 'W zawodzie barbera od kwietnia 2026 roku. Cenię możliwość obserwowania efektów swojej pracy i tworzenia stylu, z którym klient wychodzi pewny siebie. Nieustannie rozwijam swoje umiejętności, dbając o jakość, detale i komfort każdego gościa.',
      en: 'A barber since April 2026. I value being able to see the results of my work and to create a style that lets the client walk out feeling confident. I keep developing my skills, focusing on quality, detail and the comfort of every guest.',
      uk: 'У професії барбера з квітня 2026 року. Ціную можливість бачити результат своєї роботи та створювати стиль, з яким клієнт іде впевненим у собі. Постійно розвиваю свої навички, приділяючи увагу якості, деталям і комфорту кожного гостя.',
      ru: 'С апреля 2026 года в профессии барбера. Ценю возможность видеть результат своей работы и создавать стиль, с которым клиент уходит уверенным в себе. Постоянно развиваю свои навыки, уделяя внимание качеству, деталям и комфорту каждого гостя.',
    },
    photo: '/img/masters/mickiewicza/dima-junior.webp',
    location: 'Mickiewicza',
  },
  {
    name: 'Ira Junior',
    role: 'Junior Barber',
    bio: {
      pl: 'Kocham swój zawód i nieustannie doskonalę umiejętności, poznając nowe techniki. Ważne jest dla mnie, aby każdy klient wychodził nie tylko z dobrą fryzurą, ale i z pewnością siebie. Najlepszym potwierdzeniem mojej pracy jest zadowolony uśmiech i chęć powrotu.',
      en: 'I love my profession and constantly refine my skills, learning new techniques. It matters to me that every client leaves not only with a quality haircut but also with confidence. The best proof of my work is a happy smile and the wish to come back again.',
      uk: 'Люблю свою професію і постійно вдосконалюю навички, опановуючи нові техніки. Для мене важливо, щоб кожен клієнт ішов не лише з якісною стрижкою, а й із упевненістю в собі. Найкраще підтвердження моєї роботи — задоволена усмішка й бажання повернутися знову.',
      ru: 'Люблю свою профессию и постоянно совершенствую навыки, осваивая новые техники. Для меня важно, чтобы каждый клиент уходил не только с качественной стрижкой, но и с уверенностью в себе. Лучшее подтверждение моей работы — довольная улыбка и желание вернуться снова.',
    },
    photo: '/img/masters/mickiewicza/ira-junior.webp',
    location: 'Mickiewicza',
  },
  {
    name: 'Olka Junior',
    role: 'Junior Barber',
    bio: {
      pl: 'Barber, który nieustannie się rozwija i doskonali swoje umiejętności. W pracy cenię uważność, indywidualne podejście i możliwość podkreślenia stylu każdego klienta. Lubię poznawać nowe techniki i przywiązuję dużą wagę do szczegółów, aby każda fryzura spełniała oczekiwania. Ważne jest dla mnie, aby każdy gość czuł się komfortowo i chętnie wracał.',
      en: "A barber who is always growing and refining their skills. In my work I value attentiveness, an individual approach and the chance to highlight each client's style. I love learning new techniques and pay close attention to detail so that every haircut lives up to expectations. It matters to me that every guest feels comfortable and is glad to come back.",
      uk: 'Барбер, який постійно розвивається й удосконалює свої навички. У роботі ціную уважність, індивідуальний підхід і можливість підкреслити стиль кожного клієнта. Люблю опановувати нові техніки й приділяю велику увагу деталям, щоб кожна стрижка відповідала очікуванням. Для мене важливо, щоб кожен гість почувався комфортно й із задоволенням повертався знову.',
      ru: 'Барбер, который постоянно развивается и совершенствует свои навыки. В работе ценю внимательность, индивидуальный подход и возможность подчеркнуть стиль каждого клиента. Люблю осваивать новые техники и уделяю большое внимание деталям, чтобы каждая стрижка соответствовала ожиданиям. Для меня важно, чтобы каждый гость чувствовал себя комфортно и с удовольствием возвращался снова.',
    },
    photo: '/img/masters/piastow/olka-junior.webp',
    location: 'Piastów',
  },
]
