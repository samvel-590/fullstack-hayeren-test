
import { useMemo, useState } from 'react';

const questions = [
  {
    topic: 'Node.js',
    question: 'Ո՞ր մոդուլն է օգտագործվում ֆայլերի հետ աշխատելու համար։',
    options: ['http', 'fs', 'express', 'path'],
    answer: 1,
    explanation: 'fs մոդուլը թույլ է տալիս կարդալ, գրել և փոփոխել ֆայլերը։'
  },
  {
    topic: 'File System',
    question: 'Ի՞նչ է անում appendFile()-ը։',
    options: [
      'Կարդում է ֆայլի պարունակությունը',
      'Ավելացնում է տվյալները ֆայլի վերջում',
      'Փոխարինում է ֆայլի ամբողջ պարունակությունը',
      'Ջնջում է ֆայլը'
    ],
    answer: 1,
    explanation: 'appendFile()-ը նոր տվյալներ է ավելացնում ֆայլի վերջում։'
  },
  {
    topic: 'Async',
    question: 'Ինչի՞ համար է օգտագործվում async/await-ը։',
    options: [
      'Ասինխրոն կոդը համաժամանակյա դարձնելու համար',
      'Ասինխրոն գործողությունների հետ հարմար աշխատելու համար',
      'Սերվերի պորտը փոխելու համար',
      'Promise-ները զանգվածների վերածելու համար'
    ],
    answer: 1,
    explanation: 'async/await-ը հեշտացնում է Promise-ների հետ աշխատանքը և կոդը դարձնում ավելի ընթեռնելի։'
  },
  {
    topic: 'npm',
    question: 'Ի՞նչ տեղեկություն է պահվում package.json-ում։',
    options: [
      'Նախագծի միայն ֆայլերի անունները',
      'Նախագծի տվյալները, scripts-ը և կախվածությունները',
      'Միայն տեղադրված փաթեթների կոդը',
      'Միայն սերվերի կարգավորումները'
    ],
    answer: 1,
    explanation: 'package.json-ը պահում է նախագծի նկարագրությունը, հրամանները և dependencies-ը։'
  },
  {
    topic: 'npm',
    question: 'Ինչպե՞ս գործարկել package.json-ի dev script-ը։',
    options: [
      'npm dev',
      'node run dev',
      'npm run dev',
      'node dev'
    ],
    answer: 2,
    explanation: 'Օգտագործում ենք npm run dev հրամանը։'
  },
  {
    topic: 'npm',
    question: 'Ո՞ր հրամանն է տեղադրում package.json-ում նշված մոդուլները։',
    options: [
      'npm install',
      'npm start',
      'npm run dev',
      'npm update'
    ],
    answer: 0,
    explanation: 'npm install հրամանը տեղադրում է package.json-ում նշված մոդուլները։'
  },
  {
    topic: 'Express',
    question: 'Ի՞նչ է Express.js-ը։',
    options: [
      'Node.js-ի ներկառուցված մոդուլ',
      'Node.js-ի համար վեբ ֆրեյմվորք',
      'JavaScript-ի փոխարինող լեզու',
      'Տվյալների բազայի կառավարման համակարգ'
    ],
    answer: 1,
    explanation: 'Express.js-ն օգնում է ստեղծել սերվերներ և API-ներ Node.js-ով։'
  },
  {
    topic: 'HTTP',
    question: 'Ի՞նչ է սովորաբար անում GET /books հարցումը։',
    options: [
      'Ստանում է գրքերի ցանկը',
      'Ստեղծում է նոր գիրք',
      'Փոփոխում է գոյություն ունեցող գիրքը',
      'Ջնջում է գրքերի ցանկը'
    ],
    answer: 0,
    explanation: 'GET մեթոդը սովորաբար օգտագործվում է տվյալներ ստանալու համար։'
  },
  {
    topic: 'HTTP',
    question: 'Ո՞ր մեթոդն է սովորաբար օգտագործվում նոր գիրք ավելացնելու համար։',
    options: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
    ],
    answer: 1,
    explanation: 'POST հարցումը հաճախ օգտագործվում է նոր տվյալ ստեղծելու համար։'
  },
  {
    topic: 'Request',
    question: 'Որտե՞ղ է հասանելի /books/:id երթուղու id պարամետրը։',
    options: [
      'req.query.id',
      'req.body.id',
      'req.params.id',
      'req.headers.id'
    ],
    answer: 2,
    explanation: 'Երթուղու պարամետրերը հասանելի են req.params օբյեկտում։'
  },
  {
    topic: 'Request',
    question: 'Որտե՞ղ են գտնվում URL-ի query պարամետրերը։',
    options: [
      'req.query',
      'req.params',
      'req.body',
      'req.headers'
    ],
    answer: 0,
    explanation: 'Օրինակ՝ /books?search=node հարցման search արժեքը կլինի req.query.search։'
  },
  {
    topic: 'Request',
    question: 'Ի՞նչ է սովորաբար պահվում req.body-ում POST հարցման դեպքում։',
    options: [
      'URL-ի query պարամետրերը',
      'Հարցման մարմնում ուղարկված տվյալները',
      'Երթուղու պարամետրերը',
      'Սերվերի ուղարկած պատասխանը'
    ],
    answer: 1,
    explanation: 'req.body-ում կարող են լինել հաճախորդի ուղարկած տվյալները, եթե համապատասխան middleware-ը մշակել է դրանք։'
  },
  {
    topic: 'Express',
    question: 'Ինչի՞ համար է app.use(express.json())-ը։',
    options: [
      'JSON ձևաչափով հարցման մարմինը վերլուծելու համար',
      'JSON պատասխանը բրաուզերում ցուցադրելու համար',
      'Նոր երթուղիներ գրանցելու համար',
      'Սերվերի սխալները ավտոմատ ուղղելու համար'
    ],
    answer: 0,
    explanation: 'express.json() middleware-ը վերլուծում է JSON ձևաչափով հարցման մարմինը։'
  },
  {
    topic: 'Response',
    question: 'Ի՞նչ է անում res.json(data)-ը։',
    options: [
      'Ուղարկում է JSON պատասխան',
      'Կարդում է JSON ֆայլը համակարգչից',
      'Ստանում է տվյալները req.body-ից',
      'Վերագործարկում է սերվերը'
    ],
    answer: 0,
    explanation: 'res.json()-ը ուղարկում է պատասխանը JSON ձևաչափով։'
  },
  {
    topic: 'HTTP',
    question: 'Ի՞նչ է նշանակում HTTP 201 կարգավիճակը։',
    options: [
      'Հարցումը հաջողությամբ կատարվել է, բայց նոր ռեսուրս չի ստեղծվել',
      'Պահանջված ռեսուրսը չի գտնվել',
      'Նոր ռեսուրսը հաջողությամբ ստեղծվել է',
      'Սերվերում ներքին սխալ է տեղի ունեցել'
    ],
    answer: 2,
    explanation: '201 Created-ը ցույց է տալիս, որ նոր ռեսուրս է ստեղծվել։'
  },
  {
    topic: 'HTTP',
    question: 'Ի՞նչ է նշանակում 404 կարգավիճակը։',
    options: [
      'Հարցումը հաջողությամբ կատարվել է',
      'Ռեսուրսը չի գտնվել',
      'Նոր ռեսուրս է ստեղծվել',
      'Հարցման տվյալները անվավեր են'
    ],
    answer: 1,
    explanation: '404 Not Found նշանակում է, որ պահանջված ռեսուրսը չի գտնվել։'
  },
  {
    topic: 'HTTP',
    question: 'Ե՞րբ է հաճախ օգտագործվում 400 կարգավիճակը։',
    options: [
      'Երբ հաճախորդի հարցումը սխալ է',
      'Երբ սերվերում ներքին սխալ է տեղի ունեցել',
      'Երբ նոր ռեսուրս է ստեղծվել',
      'Երբ պահանջված ռեսուրսը չի գտնվել'
    ],
    answer: 0,
    explanation: '400 Bad Request-ը կիրառվում է, երբ հարցման տվյալները սխալ են կամ անվավեր։'
  },
  {
    topic: 'HTTP',
    question: 'Ի՞նչ է նշանակում 500 կարգավիճակը։',
    options: [
      'Հարցման տվյալները անվավեր են',
      'Ներքին սերվերային սխալ',
      'Նոր ռեսուրս է ստեղծվել',
      'Պահանջված ռեսուրսը չի գտնվել'
    ],
    answer: 1,
    explanation: '500 Internal Server Error-ը ցույց է տալիս սերվերի ներքին սխալ։'
  },
  {
    topic: 'Middleware',
    question: 'Ի՞նչ է middleware-ը Express-ում։',
    options: [
      'Ֆունկցիա, որն աշխատում է հարցման և պատասխանի ընթացքի մեջ',
      'Ֆունկցիա, որը միայն ստեղծում է նոր երթուղիներ',
      'Օբյեկտ, որը պահում է բոլոր հարցումների արդյունքները',
      'Մեթոդ, որը միայն ուղարկում է JSON պատասխան'
    ],
    answer: 0,
    explanation: 'Middleware-ը կարող է մշակել հարցումը, փոխել req-ը, ուղարկել պատասխան կամ կանչել next()։'
  },
  {
    topic: 'Middleware',
    question: 'Ի՞նչ է անում next()-ը middleware-ում։',
    options: [
      'Ավարտում է հարցումը՝ առանց պատասխանի',
      'Փոխանցում է կառավարումը հաջորդ փուլին',
      'Ուղարկում է JSON պատասխան',
      'Վերագործարկում է սերվերը'
    ],
    answer: 1,
    explanation: 'next()-ը փոխանցում է կառավարումը հաջորդ middleware-ին կամ համապատասխան մշակիչին։'
  },
  {
    topic: 'Middleware',
    question: 'Ինչո՞ւ է middleware-ների հերթականությունը կարևոր։',
    options: [
      'Որովհետև դրանք կատարվում են գրանցման հերթականությամբ',
      'Որովհետև դրանք միշտ աշխատում են հակառակ հերթականությամբ',
      'Որովհետև հերթականությունը որոշում է հարցման HTTP մեթոդը',
      'Որովհետև middleware-ները կատարվում են պատահական հերթականությամբ'
    ],
    answer: 0,
    explanation: 'Express-ը middleware-ները գործարկում է գրանցման հերթականությամբ։'
  },
  {
    topic: 'API',
    question: 'Ի՞նչ է API endpoint-ը։',
    options: [
      'Սերվերի կոնկրետ հասցե կամ երթուղի, որով հասանելի է գործողությունը կամ տվյալը',
      'Հարցման մարմնում ուղարկվող տվյալների ձևաչափ',
      'Ֆունկցիա, որը միայն ստուգում է սխալները',
      'Պանակ, որտեղ պահվում են API-ի ֆայլերը'
    ],
    answer: 0,
    explanation: 'Endpoint-ը API-ի կոնկրետ ուղին է, օրինակ՝ GET /books։'
  },
  {
    topic: 'API',
    question: 'Ի՞նչ է անում Array-ի find() մեթոդը։',
    options: [
      'Վերադարձնում է առաջին համապատասխան տարրը',
      'Վերադարձնում է բոլոր համապատասխան տարրերի նոր զանգվածը',
      'Փոփոխում է զանգվածի բոլոր տարրերը',
      'Ջնջում է պայմանին համապատասխանող տարրերը'
    ],
    answer: 0,
    explanation: 'find()-ը վերադարձնում է առաջին տարրը, որը բավարարում է տրված պայմանին, կամ undefined։'
  },
  {
    topic: 'API',
    question: 'Ի՞նչ է անում filter()-ը։',
    options: [
      'Վերադարձնում է պայմանին համապատասխանող տարրերի նոր զանգված',
      'Վերադարձնում է միայն առաջին համապատասխան տարրը',
      'Փոփոխում է զանգվածի բոլոր տարրերը',
      'Դասավորում է զանգվածի տարրերն ըստ այբուբենի'
    ],
    answer: 0,
    explanation: 'filter()-ը ստեղծում է նոր զանգված՝ ներառելով այն տարրերը, որոնք անցնում են ստուգումը։'
  },
  {
    topic: 'React',
    question: 'Ինչի՞ համար է օգտագործվում useState-ը։',
    options: [
      'Կոմպոնենտում փոփոխվող վիճակ պահելու համար',
      'React-ի կոմպոնենտները սերվերում գրանցելու համար',
      'Ֆայլերի հետ աշխատելու համար',
      'HTTP հարցումների երթուղիներ ստեղծելու համար'
    ],
    answer: 0,
    explanation: 'useState-ը React-ում պահում է state, իսկ setter ֆունկցիան թարմացնում է այն։'
  },
  {
    topic: 'React',
    question: 'Ի՞նչ է անում React-ի map()-ը հաճախ ցուցակների դեպքում։',
    options: [
      'Յուրաքանչյուր տարրի համար ստեղծում է JSX տարր',
      'Զանգվածից հեռացնում է ընտրված տարրերը',
      'Փոխում է կոմպոնենտի state-ը',
      'Ստուգում է՝ արդյոք բոլոր տարրերը նույնն են'
    ],
    answer: 0,
    explanation: 'map()-ով հաճախ զանգվածի տարրերը վերածում ենք JSX տարրերի ցուցակի։'
  },
  {
    topic: 'Error handling',
    question: 'Ինչի՞ համար է օգտագործվում try/catch-ը։',
    options: [
      'Սխալները բռնելու և մշակելու համար',
      'Promise-ները զանգվածի վերածելու համար',
      'Ֆունկցիաները ավտոմատ կրկնելու համար',
      'Սերվերի երթուղիները գրանցելու համար'
    ],
    answer: 0,
    explanation: 'try/catch-ը թույլ է տալիս բռնել try բլոկում առաջացած սխալները և մշակել դրանք catch-ում։'
  },
  {
    topic: 'Error handling',
    question: 'Քանի՞ parameter պետք է ունենա Express-ի Error Handling Middleware-ը։',
    options: [
      'Երկու՝ req և res',
      'Երեք՝ req, res և next',
      'Չորս՝ err, req, res և next',
      'Մեկ՝ միայն err'
    ],
    answer: 2,
    explanation: 'Express-ը Error Handling Middleware-ը ճանաչում է չորս parameter-ով՝ (err, req, res, next)։'
  },
  {
    topic: 'Error handling',
    question: 'Ի՞նչ է անում next(error)-ը Express-ում։',
    options: [
      'Ուղարկում է հաջող response',
      'Error-ը փոխանցում է Express-ի error handling flow-ին',
      'Վերագործարկում է server-ը',
      'Փոխում է request-ի HTTP method-ը'
    ],
    answer: 1,
    explanation: 'next(error)-ը սովորական request flow-ի փոխարեն error-ը փոխանցում է հաջորդ Error Handling Middleware-ին։'
  },
  {
    topic: 'Error handling',
    question: 'Ինչո՞ւ է կարևոր գրել return՝ error response ուղարկելիս։',
    options: [
      'Որպեսզի function-ը ավարտվի և երկրորդ response չուղարկվի',
      'Որպեսզի status code-ը միշտ դառնա 200',
      'Որպեսզի request body-ն ավտոմատ parse արվի',
      'Որպեսզի route-ը երկու անգամ աշխատի'
    ],
    answer: 0,
    explanation: 'Early return-ը կանգնեցնում է handler-ի աշխատանքը և կանխում «Cannot set headers after they are sent» սխալը։'
  },
  {
    topic: 'Error handling',
    question: 'Ի՞նչ status code կընտրվի err.statusCode || 500 արտահայտությամբ, եթե statusCode-ը սահմանված չէ։',
    options: ['400', '404', '500', '201'],
    answer: 2,
    explanation: 'Եթե err.statusCode-ը չկա, || օպերատորը կօգտագործի fallback արժեքը՝ 500 Internal Server Error։'
  },
  {
    topic: 'Error handling',
    question: 'Ո՞ր հերթականությունն է ճիշտ Express application-ում։',
    options: [
      'Global Error Handler → Routes → express.json()',
      'Routes → Global Error Handler → 404 fallback',
      'express.json() → Routes → 404 fallback → Global Error Handler',
      '404 fallback → express.json() → Routes'
    ],
    answer: 2,
    explanation: 'Նախ աշխատում են ընդհանուր middleware-ներն ու routes-ը, հետո՝ չգտնված route-ի fallback-ը, իսկ վերջում՝ Global Error Handler-ը։'
  },
  {
    topic: 'Error handling',
    question: 'Ո՞րն է new Error() և throw new Error() տարբերությունը։',
    options: [
      'Տարբերություն չկա',
      'new Error()-ը response է ուղարկում, իսկ throw-ը՝ ոչ',
      'new Error()-ը միայն ստեղծում է Error object, իսկ throw-ը նետում է այն և կանգնեցնում սովորական execution-ը',
      'throw-ը միայն Express-ում է աշխատում'
    ],
    answer: 2,
    explanation: 'new Error()-ը ստեղծում է object, իսկ throw new Error()-ը նետում է սխալը և ընթացիկ սովորական execution-ը դադարեցնում։'
  },
  {
    topic: 'Node.js',
    question: 'Ի՞նչ է անում nodemon-ը։',
    options: [
      'Ֆայլերի փոփոխությունից հետո վերագործարկում է Node սերվերը',
      'Փոխարինում է JavaScript-ին',
      'Ստեղծում է դիզայն',
      'Ջնջում է package.json-ը'
    ],
    answer: 0,
    explanation: 'nodemon-ը հետևում է ֆայլերի փոփոխություններին և անհրաժեշտության դեպքում վերագործարկում է սերվերը։'
  },
  {
    topic: 'HTTP',
    question: 'Ի՞նչ է localhost-ը։',
    options: [
      'Տեղական համակարգիչը կամ նույն սարքի սերվերը',
      'Հեռավոր սերվերի պարտադիր հասցեն',
      'HTTP հարցման հատուկ մեթոդ',
      'Node.js-ի ներկառուցված մոդուլ'
    ],
    answer: 0,
    explanation: 'localhost-ը ցույց է տալիս ընթացիկ սարքը։'
  },
  {
    topic: 'Node.js',
    question: 'Ի՞նչ է անում JSON.stringify()-ը։',
    options: [
      'JavaScript արժեքը վերածում է JSON տողի',
      'JSON տողը վերածում է JavaScript օբյեկտի',
      'Ստուգում է JSON տվյալների վավերությունը',
      'Ուղարկում է JSON պատասխան սերվերից'
    ],
    answer: 0,
    explanation: 'JSON.stringify()-ը JavaScript արժեքը սերիալացնում է JSON տողի։'
  }
];

const letters = ['a', 'b', 'c', 'd'];
const topics = ['Բոլոր թեմաները', ...new Set(questions.map((item) => item.topic))];

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState('Բոլոր թեմաները');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showUnanswered, setShowUnanswered] = useState(false);

  const visibleQuestions = useMemo(
    () =>
      questions
        .map((question, index) => ({ ...question, originalIndex: index }))
        .filter(
          (question) =>
            selectedTopic === 'Բոլոր թեմաները' ||
            question.topic === selectedTopic
        ),
    [selectedTopic]
  );

  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce(
    (sum, question, index) =>
      sum + (answers[index] === question.answer ? 1 : 0),
    0
  );
  const wrongOrMissing = questions.length - score;
  const scorePercentage = (score / questions.length) * 100;
  const estimatedMinutes = Math.ceil(questions.length / 3);

  function chooseAnswer(questionIndex, optionIndex) {
    if (submitted) return;

    setAnswers((current) => ({
      ...current,
      [questionIndex]: optionIndex
    }));
    setShowUnanswered(false);
  }

  function submitQuiz() {
    if (answeredCount < questions.length) {
      setShowUnanswered(true);
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function restartQuiz() {
    setAnswers({});
    setSubmitted(false);
    setShowUnanswered(false);
    setSelectedTopic('Բոլոր թեմաները');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function copyAnswers() {
    const text = questions
      .map((question, index) => `${index + 1}${letters[answers[index] ?? 0]}`)
      .join(' ');

    navigator.clipboard?.writeText(text);
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="CodeQuest գլխավոր էջ">
          <span className="brand-mark">{'</>'}</span>
          <span>
            CODE<span className="brand-light">QUEST</span>
          </span>
        </a>

        <div className="topbar-right">
          <span className="live-dot" /> ԾՐԱԳՐԱՎՈՐՄԱՆ ԳԻՏԵԼԻՔՆԵՐ
        </div>
      </header>

      <main id="top" className="main-content">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> ՔՈ ՈՒՍՈՒՑՄԱՆ ՀԵՏԱԳԻԾԸ
            </div>

            <h1>
              Ստուգի՛ր գիտելիքներդ։
              <br />
              <span>Աճի՛ր ամեն օր։</span>
            </h1>

            <p className="hero-description">
              Քո անցած Full-Stack դասերի թեստը։ Պատասխանիր հարցերին, ստուգիր
              արդյունքդ և պարզիր՝ որ թեմաներն են դեռ կրկնելու կարիք ունենում։
            </p>

            <div className="hero-tags">
              <span>NODE.JS</span>
              <span>EXPRESS</span>
              <span>HTTP & API</span>
              <span>JAVASCRIPT</span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="code-window">
              <div className="window-dots">
                <i />
                <i />
                <i />
                <span>knowledge.js</span>
              </div>

              <div className="code-lines">
                <p>
                  <b>01</b> <span className="code-purple">const</span>{' '}
                  <span className="code-green">knowledge</span> = {'{'}
                </p>
                <p>
                  <b>02</b> &nbsp;practice:{' '}
                  <span className="code-orange">true</span>,
                </p>
                <p>
                  <b>03</b> &nbsp;progress:{' '}
                  <span className="code-orange">'daily'</span>,
                </p>
                <p>
                  <b>04</b> &nbsp;future:{' '}
                  <span className="code-green">'full-stack'</span>
                </p>
                <p>
                  <b>05</b> {'}'}
                </p>
                <p>
                  <b>06</b> <span className="code-purple">return</span>{' '}
                  <span className="code-green">success</span>;
                </p>
              </div>

              <div className="visual-badge">
                <span>✦</span> ՍՈՎՈՐԻ՛Ր ԳՈՐԾՆԱԿԱՆՈՐԵՆ
              </div>
            </div>
          </div>
        </section>

        <section className="stats-row" aria-label="Թեստի տվյալներ">
          <div className="stat-card">
            <span className="stat-icon">◎</span>
            <div>
              <strong>{questions.length}</strong>
              <span>ՀԱՐՑ</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">▦</span>
            <div>
              <strong>{topics.length - 1}</strong>
              <span>ԹԵՄԱ</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">◷</span>
            <div>
              <strong>
                ~{estimatedMinutes} <small>րոպե</small>
              </strong>
              <span>ՄԻՋԻՆ ՏԵՎՈՂՈՒԹՅՈՒՆ</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">✧</span>
            <div>
              <strong>100%</strong>
              <span>ԱՆՎՃԱՐ ՓՈՐՁ</span>
            </div>
          </div>
        </section>

        {submitted ? (
          <section className="results-panel">
            <div className="section-kicker">ԹԵՍՏՆ ԱՎԱՐՏՎԱԾ Է</div>

            <div className="result-score">
              {score}
              <span> / {questions.length}</span>
            </div>

            <h2>
              {scorePercentage >= 83
                ? 'Գերազանց արդյունք։ Շարունակի՛ր նույն կերպ։'
                : scorePercentage >= 67
                  ? 'Շատ լավ է։ Դու լավ ես յուրացրել նյութը։'
                  : scorePercentage >= 50
                    ? 'Լավ սկիզբ է։ Կրկնիր բաց թողած թեմաները։'
                    : 'Մի՛ հանձնվիր։ Սովորիր սխալներից ու փորձիր նորից։'}
            </h2>

            <p className="result-summary">
              Ճիշտ պատասխաններ՝ <strong>{score}</strong> · Սխալ կամ բաց
              թողնված՝ <strong>{wrongOrMissing}</strong>
            </p>

            <div className="result-meter">
              <div
                style={{
                  width: `${(score / questions.length) * 100}%`
                }}
              />
            </div>

            <div className="result-actions">
              <button className="primary-button" onClick={restartQuiz}>
                ↻ Կրկին անցնել թեստը
              </button>
              <button className="secondary-button" onClick={copyAnswers}>
                Պատճենել պատասխանների ձևաչափը
              </button>
            </div>

            <div className="review-heading">
              <h3>Պատասխանների բացատրություն</h3>
              <span>ՍԽԱԼՆԵՐԻ ՎԵՐԱՆԱՅՈՒՄ</span>
            </div>

            <div className="review-list">
              {questions.map((question, index) => {
                const correct = answers[index] === question.answer;

                return (
                  <article
                    className={`review-card ${correct ? 'review-correct' : 'review-wrong'
                      }`}
                    key={index}
                  >
                    <div className="review-status">
                      {correct ? '✓ ՃԻՇՏ' : '× ՍԽԱԼ'}
                    </div>

                    <h4>
                      {index + 1}. {question.question}
                    </h4>

                    {!correct && (
                      <p className="your-answer">
                        Քո պատասխանը՝ {question.options[answers[index]]}
                      </p>
                    )}

                    <p className="right-answer">
                      Ճիշտ պատասխան՝{' '}
                      <strong>
                        {letters[question.answer]}.{' '}
                        {question.options[question.answer]}
                      </strong>
                    </p>

                    <p className="explanation">{question.explanation}</p>
                  </article>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="quiz-section" id="quiz">
            <div className="quiz-heading">
              <div>
                <div className="section-kicker">ԳԻՏԵԼԻՔՆԵՐԻ ՍՏՈՒԳՈՒՄ</div>
                <h2>Անցի՛ր թեստը</h2>
                <p>Ընտրիր մեկ ճիշտ պատասխան յուրաքանչյուր հարցի համար։</p>
              </div>

              <div className="completion">
                <div className="completion-number">
                  {answeredCount}
                  <span>/{questions.length}</span>
                </div>
                <div className="completion-label">ՊԱՏԱՍԽԱՆՎԱԾ</div>
              </div>
            </div>

            <div className="progress-track">
              <div
                style={{
                  width: `${(answeredCount / questions.length) * 100}%`
                }}
              />
            </div>

            <div className="filter-row">
              <label htmlFor="topic-filter">ԹԵՄԱՅՈՎ ՖԻԼՏՐ</label>

              <select
                id="topic-filter"
                value={selectedTopic}
                onChange={(event) => setSelectedTopic(event.target.value)}
              >
                {topics.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>

              <span className="filter-count">
                ՑՈՒՑԱԴՐՎՈՒՄ Է {visibleQuestions.length} ՀԱՐՑ
              </span>
            </div>

            <div className="questions-list">
              {visibleQuestions.map((question) => {
                const index = question.originalIndex;

                return (
                  <article className="question-card" key={index}>
                    <div className="question-topline">
                      <span className="question-number">
                        ՀԱՐՑ {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="question-topic">{question.topic}</span>
                    </div>

                    <h3>{question.question}</h3>

                    <div className="answer-grid">
                      {question.options.map((option, optionIndex) => {
                        const chosen = answers[index] === optionIndex;

                        return (
                          <button
                            type="button"
                            key={option}
                            className={`answer-option ${chosen ? 'answer-selected' : ''
                              }`}
                            onClick={() =>
                              chooseAnswer(index, optionIndex)
                            }
                            aria-pressed={chosen}
                          >
                            <span className="answer-letter">
                              {letters[optionIndex]}
                            </span>
                            <span>{option}</span>
                            <span className="answer-check">
                              {chosen ? '✓' : ''}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>

            {showUnanswered && (
              <p className="warning-message">
                Դեռ պատասխանված չեն բոլոր հարցերը։ Պատասխանիր մնացած{' '}
                {questions.length - answeredCount} հարցին՝ արդյունքը ստանալու
                համար։
              </p>
            )}

            <div className="submit-area">
              <div>
                <strong>
                  {answeredCount === questions.length
                    ? 'Պատրաստ ես ստուգել արդյունքդ։'
                    : `Մնացել է ${questions.length - answeredCount} հարց։`}
                </strong>
                <p>Արդյունքը կտեսնես թեստն ավարտելուց հետո։</p>
              </div>

              <button className="primary-button" onClick={submitQuiz}>
                Ստուգել պատասխանները <span>→</span>
              </button>
            </div>
          </section>
        )}

        <section className="format-tip">
          <div className="tip-icon">⌘</div>
          <div>
            <h3>Ինչպե՞ս նշել պատասխանները</h3>
            <p>
              Յուրաքանչյուր հարցի համար ընտրիր <strong>a, b, c կամ d</strong>{' '}
              տարբերակներից մեկը։ Օրինակ՝ <code>1c 2a 3d</code>։ Կայքը կհաշվի
              արդյունքդ ինքնուրույն։
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#top">
          <span className="brand-mark">{'</>'}</span>
          <span>
            CODE<span className="brand-light">QUEST</span>
          </span>
        </a>

        <p>ՍՏԵՂԾՎԱԾ Է ՍՈՎՈՐԵԼՈՒ ԵՎ ԱՌԱՋԱԴԻՄԵԼՈՒ ՀԱՄԱՐ</p>

        <a href="#top" className="back-top">
          ՎԵՐԵՎ ↑
        </a>
      </footer>
    </div>
  );
}
