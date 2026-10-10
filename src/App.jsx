
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
      'Ասինխրոն գործողությունները միշտ զուգահեռ սկսելու համար',
      'Ասինխրոն գործողությունների հետ հարմար աշխատելու համար',
      'Բոլոր Promise-ները ավտոմատ resolve անելու համար',
      'Callback պարունակող ցանկացած ֆունկցիա Promise դարձնելու համար'
    ],
    answer: 1,
    explanation: 'async/await-ը հեշտացնում է Promise-ների հետ աշխատանքը և կոդը դարձնում ավելի ընթեռնելի։'
  },
  {
    topic: 'npm',
    question: 'Ի՞նչ տեղեկություն է պահվում package.json-ում։',
    options: [
      'Տեղադրված փաթեթների ճշգրիտ dependency tree-ն',
      'Միայն environment variable-ների արժեքները',
      'Նախագծի տվյալները, scripts-ը և կախվածությունները',
      'Տեղադրված փաթեթների ամբողջ source code-ը'
    ],
    answer: 2,
    explanation: 'package.json-ը պահում է նախագծի նկարագրությունը, հրամանները և dependencies-ը։'
  },
  {
    topic: 'npm',
    question: 'Ինչպե՞ս գործարկել package.json-ի dev script-ը։',
    options: [
      'npm dev',
      'npm start dev',
      'npm run dev',
      'npx run dev'
    ],
    answer: 2,
    explanation: 'Օգտագործում ենք npm run dev հրամանը։'
  },
  {
    topic: 'npm',
    question: 'Ո՞ր հրամանն է տեղադրում package.json-ում նշված մոդուլները։',
    options: [
      'npm run install',
      'npm update --only',
      'npm start --install',
      'npm install'
    ],
    answer: 3,
    explanation: 'npm install հրամանը տեղադրում է package.json-ում նշված մոդուլները։'
  },
  {
    topic: 'Express',
    question: 'Ի՞նչ է Express.js-ը։',
    options: [
      'JavaScript-ը browser-ից դուրս աշխատեցնող runtime',
      'Տվյալների բազայի հետ աշխատող ORM',
      'Node.js-ի համար վեբ ֆրեյմվորք',
      'Միայն HTTP հարցումներ ուղարկող client library'
    ],
    answer: 2,
    explanation: 'Express.js-ն օգնում է ստեղծել սերվերներ և API-ներ Node.js-ով։'
  },
  {
    topic: 'HTTP',
    question: 'Ի՞նչ է սովորաբար անում GET /books հարցումը։',
    options: [
      'Ստեղծում է նոր գիրք',
      'Փոփոխում է գոյություն ունեցող գիրքը',
      'Ջնջում է գրքերի ցանկը',
      'Ստանում է գրքերի ցանկը'
    ],
    answer: 3,
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
      'Հարցման headers-ի ամբողջ հավաքածուն'
    ],
    answer: 1,
    explanation: 'req.body-ում կարող են լինել հաճախորդի ուղարկած տվյալները, եթե համապատասխան middleware-ը մշակել է դրանք։'
  },
  {
    topic: 'Express',
    question: 'Ինչի՞ համար է app.use(express.json())-ը։',
    options: [
      'JavaScript object-ը JSON response դարձնելու համար',
      'Request body-ի պարտադիր field-ները ստուգելու համար',
      'Բոլոր հարցումների Content-Type-ը JSON դարձնելու համար',
      'JSON ձևաչափով հարցման մարմինը վերլուծելու համար'
    ],
    answer: 3,
    explanation: 'express.json() middleware-ը վերլուծում է JSON ձևաչափով հարցման մարմինը։'
  },
  {
    topic: 'Response',
    question: 'Ի՞նչ է անում res.json(data)-ը։',
    options: [
      'Վերլուծում է ստացված JSON request body-ն',
      'Սահմանում է միայն response-ի status code-ը',
      'Ուղարկում է data-ն որպես սովորական text՝ առանց JSON-ի',
      'Ուղարկում է JSON պատասխան'
    ],
    answer: 3,
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
      'Երբ սերվերում ներքին սխալ է տեղի ունեցել',
      'Երբ նոր ռեսուրս է ստեղծվել',
      'Երբ պահանջված ռեսուրսը չի գտնվել',
      'Երբ հաճախորդի հարցումը սխալ է'
    ],
    answer: 3,
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
      'Միայն route-ի վերջնական պատասխանը վերադարձնող handler',
      'Express application-ի բոլոր routes-ը պահող object',
      'Client-ի և database-ի միջև ուղիղ կապ ստեղծող driver',
      'Ֆունկցիա, որն աշխատում է հարցման և պատասխանի ընթացքի մեջ'
    ],
    answer: 3,
    explanation: 'Middleware-ը կարող է մշակել հարցումը, փոխել req-ը, ուղարկել պատասխան կամ կանչել next()։'
  },
  {
    topic: 'Middleware',
    question: 'Ի՞նչ է անում next()-ը middleware-ում։',
    options: [
      'Անցնում է հաջորդ URL route-ին՝ փոխելով req.path-ը',
      'Փոխանցում է կառավարումը հաջորդ փուլին',
      'Ավարտում է response-ը և վերադարձնում 204 status',
      'Նույն middleware-ը նորից է գործարկում'
    ],
    answer: 1,
    explanation: 'next()-ը փոխանցում է կառավարումը հաջորդ middleware-ին կամ համապատասխան մշակիչին։'
  },
  {
    topic: 'Middleware',
    question: 'Ինչո՞ւ է middleware-ների հերթականությունը կարևոր։',
    options: [
      'Որովհետև դրանք կատարվում են գրանցման հերթականությամբ',
      'Որովհետև Express-ը նախ աշխատեցնում է միայն route middleware-ները',
      'Որովհետև ամեն middleware փոխում է հարցման HTTP մեթոդը',
      'Որովհետև async middleware-ները միշտ տեղափոխվում են վերջ'
    ],
    answer: 0,
    explanation: 'Express-ը middleware-ները գործարկում է գրանցման հերթականությամբ։'
  },
  {
    topic: 'API',
    question: 'Ի՞նչ է API endpoint-ը։',
    options: [
      'API-ի բոլոր routes-ի ընդհանուր base URL-ը',
      'Request body-ի տվյալների կառուցվածքը նկարագրող schema-ն',
      'Server-ը գործարկող հիմնական JavaScript ֆայլը',
      'Սերվերի կոնկրետ հասցե կամ երթուղի, որով հասանելի է գործողությունը կամ տվյալը'
    ],
    answer: 3,
    explanation: 'Endpoint-ը API-ի կոնկրետ ուղին է, օրինակ՝ GET /books։'
  },
  {
    topic: 'API',
    question: 'Ի՞նչ է անում Array-ի find() մեթոդը։',
    options: [
      'Վերադարձնում է բոլոր համապատասխան տարրերի նոր զանգվածը',
      'Փոփոխում է զանգվածի բոլոր տարրերը',
      'Ջնջում է պայմանին համապատասխանող տարրերը',
      'Վերադարձնում է առաջին համապատասխան տարրը'
    ],
    answer: 3,
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
      'Կոմպոնենտի side effect-ները գործարկելու համար',
      'Parent-ից ստացված props-ը մշտապես փոխելու համար',
      'Կոմպոնենտը DOM-ում մեկ անգամ render անելու համար',
      'Կոմպոնենտում փոփոխվող վիճակ պահելու համար'
    ],
    answer: 3,
    explanation: 'useState-ը React-ում պահում է state, իսկ setter ֆունկցիան թարմացնում է այն։'
  },
  {
    topic: 'React',
    question: 'Ի՞նչ է անում React-ի map()-ը հաճախ ցուցակների դեպքում։',
    options: [
      'Յուրաքանչյուր տարրի համար ստեղծում է JSX տարր',
      'Ցուցակից պահում է միայն պայմանին համապատասխանող տարրերը',
      'Ավտոմատ փոխում է կոմպոնենտի state-ը յուրաքանչյուր տարրի համար',
      'Գտնում է ցուցակի առաջին համապատասխան տարրը և դադարեցնում iteration-ը'
    ],
    answer: 0,
    explanation: 'map()-ով հաճախ զանգվածի տարրերը վերածում ենք JSX տարրերի ցուցակի։'
  },
  {
    topic: 'Error handling',
    question: 'Ինչի՞ համար է օգտագործվում try/catch-ը։',
    options: [
      'Սխալները բռնելու և մշակելու համար',
      'try բլոկի ցանկացած սխալը ավտոմատ ուղղելու համար',
      'Ասինխրոն գործողությունը միշտ հաջող ավարտելու համար',
      'Սխալի դեպքում function-ը սկզբից ավտոմատ կրկնելու համար'
    ],
    answer: 0,
    explanation: 'try/catch-ը թույլ է տալիս բռնել try բլոկում առաջացած սխալները և մշակել դրանք catch-ում։'
  },
  {
    topic: 'Error handling',
    question: 'Քանի՞ parameter պետք է ունենա Express-ի Error Handling Middleware-ը։',
    options: [
      'Երկու՝ err և res',
      'Երեք՝ err, req և res',
      'Չորս՝ err, req, res և next',
      'Չորս՝ req, res, next և statusCode'
    ],
    answer: 2,
    explanation: 'Express-ը Error Handling Middleware-ը ճանաչում է չորս parameter-ով՝ (err, req, res, next)։'
  },
  {
    topic: 'Error handling',
    question: 'Ի՞նչ է անում next(error)-ը Express-ում։',
    options: [
      'Error-ը նետում է JavaScript-ի արտաքին try/catch-ին',
      'Error-ը փոխանցում է Express-ի error handling flow-ին',
      'Աշխատեցնում է հաջորդ սովորական middleware-ը՝ անտեսելով error-ը',
      'Անմիջապես ուղարկում է 500 response՝ առանց Error Middleware-ի'
    ],
    answer: 1,
    explanation: 'next(error)-ը սովորական request flow-ի փոխարեն error-ը փոխանցում է հաջորդ Error Handling Middleware-ին։'
  },
  {
    topic: 'Error handling',
    question: 'Ինչո՞ւ է կարևոր գրել return՝ error response ուղարկելիս։',
    options: [
      'Որպեսզի function-ը ավարտվի և երկրորդ response չուղարկվի',
      'Որպեսզի Express-ը response-ը JSON ձևաչափի փոխարկի',
      'Որպեսզի status code-ը պահպանվի հաջորդ middleware-ի համար',
      'Որպեսզի next(error)-ը կանչվի response-ից հետո'
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
      'new Error()-ը նետում է սխալը, իսկ throw-ը միայն ստեղծում է այն',
      'new Error()-ը ստեղծում է 500 response, իսկ throw-ը՝ 400 response',
      'new Error()-ը միայն ստեղծում է Error object, իսկ throw-ը նետում է այն և կանգնեցնում սովորական execution-ը',
      'new Error()-ը միայն synchronous code-ի, իսկ throw-ը միայն async code-ի համար է'
    ],
    answer: 2,
    explanation: 'new Error()-ը ստեղծում է object, իսկ throw new Error()-ը նետում է սխալը և ընթացիկ սովորական execution-ը դադարեցնում։'
  },
  {
    topic: 'Node.js',
    question: 'Ի՞նչ է անում nodemon-ը։',
    options: [
      'Ֆայլերի փոփոխությունից հետո վերագործարկում է Node սերվերը',
      'Յուրաքանչյուր փոփոխությունից հետո նորից տեղադրում է dependencies-ը',
      'Ֆայլերի փոփոխությունից հետո production build է ստեղծում',
      'Ֆայլերի փոփոխությունից հետո ավտոմատ աշխատեցնում է բոլոր tests-ը'
    ],
    answer: 0,
    explanation: 'nodemon-ը հետևում է ֆայլերի փոփոխություններին և անհրաժեշտության դեպքում վերագործարկում է սերվերը։'
  },
  {
    topic: 'HTTP',
    question: 'Ի՞նչ է localhost-ը։',
    options: [
      'Տեղական համակարգիչը կամ նույն սարքի սերվերը',
      'Նույն local network-ի բոլոր սարքերի ընդհանուր հասցեն',
      'Internet-ում հրապարակված server-ի մշտական domain-ը',
      'Միայն Node.js application-ների համար նախատեսված port-ը'
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
