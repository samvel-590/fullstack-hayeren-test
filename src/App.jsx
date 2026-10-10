import { useState } from 'react';

const questions = [
  {
    topic: 'Node.js',
    question: 'Ո՞ր մոդուլն է օգտագործվում ֆայլերի հետ աշխատելու համար։',
    options: ['path', 'fs', 'http', 'url'],
    answer: 1,
    explanation: 'fs մոդուլը թույլ է տալիս կարդալ, գրել և փոփոխել ֆայլերը։'
  },
  {
    topic: 'File System',
    question: 'Ի՞նչ է անում appendFile()-ը։',
    options: [
      'Ֆայլի պարունակությունը փոխարինում է նոր տվյալներով',
      'Ավելացնում է տվյալները ֆայլի վերջում',
      'Կարդում է ֆայլի պարունակությունը',
      'Ստեղծում է նոր պանակ'
    ],
    answer: 1,
    explanation: 'appendFile()-ը նոր տվյալներ է ավելացնում ֆայլի վերջում։'
  },
  {
    topic: 'Async',
    question: 'Ինչի՞ համար է օգտագործվում async/await-ը։',
    options: [
      'Ֆունկցիաները միայն հերթով գործարկելու համար',
      'Promise-ների հետ ասինխրոն աշխատանքը հեշտացնելու համար',
      'Սերվերի աշխատանքը դադարեցնելու համար',
      'Սինխրոն ֆունկցիաները ավտոմատ async դարձնելու համար'
    ],
    answer: 1,
    explanation: 'async/await-ը հեշտացնում է Promise-ների հետ աշխատանքը։'
  },
  {
    topic: 'npm',
    question: 'Ի՞նչ տեղեկություն է պահվում package.json-ում։',
    options: [
      'Միայն տեղադրված փաթեթների կոդը',
      'Նախագծի տվյալները, scripts-ը և dependencies-ը',
      'Միայն սերվերի կարգավորումները',
      'Նախագծի բոլոր ֆայլերի ամբողջական պարունակությունը'
    ],
    answer: 1,
    explanation: 'package.json-ը պահում է նախագծի տվյալները, հրամանները և dependencies-ը։'
  },
  {
    topic: 'npm',
    question: 'Ինչպե՞ս գործարկել package.json-ի dev script-ը։',
    options: [
      'npm dev',
      'node dev',
      'npm run dev',
      'node run dev'
    ],
    answer: 2,
    explanation: 'Օգտագործում ենք npm run dev հրամանը։'
  },
  {
    topic: 'npm',
    question: 'Ո՞ր հրամանն է տեղադրում package.json-ում նշված մոդուլները։',
    options: [
      'npm update',
      'npm install',
      'npm uninstall',
      'npm init'
    ],
    answer: 1,
    explanation: 'npm install հրամանը տեղադրում է package.json-ում նշված մոդուլները։'
  },
  {
    topic: 'Express',
    question: 'Ի՞նչ է Express.js-ը։',
    options: [
      'Node.js-ի համար վեբ ֆրեյմվորք',
      'JavaScript-ի առանձին ծրագրավորման լեզու',
      'Տվյալների բազայի կառավարման համակարգ',
      'Node.js-ի ներկառուցված fs մոդուլի այլ անուն'
    ],
    answer: 0,
    explanation: 'Express.js-ն օգնում է ստեղծել սերվերներ և API-ներ Node.js-ով։'
  },
  {
    topic: 'HTTP',
    question: 'Ի՞նչ է սովորաբար անում GET /books հարցումը։',
    options: [
      'Ստեղծում է նոր գիրք',
      'Ստանում է գրքերի ցանկը',
      'Փոփոխում է բոլոր գրքերը',
      'Ջնջում է ընտրված գիրքը'
    ],
    answer: 1,
    explanation: 'GET մեթոդը սովորաբար օգտագործվում է տվյալներ ստանալու համար։'
  },
  {
    topic: 'HTTP',
    question: 'Ո՞ր մեթոդն է սովորաբար օգտագործվում նոր գիրք ավելացնելու համար։',
    options: ['PUT', 'GET', 'POST', 'DELETE'],
    answer: 2,
    explanation: 'POST հարցումը հաճախ օգտագործվում է նոր տվյալ ստեղծելու համար։'
  },
  {
    topic: 'Request',
    question: 'Որտե՞ղ է հասանելի /books/:id երթուղու id պարամետրը։',
    options: [
      'req.query.id',
      'req.body.id',
      'req.params.id',
      'res.params.id'
    ],
    answer: 2,
    explanation: 'Երթուղու պարամետրերը հասանելի են req.params օբյեկտում։'
  },
  {
    topic: 'Request',
    question: 'Որտե՞ղ են գտնվում URL-ի query պարամետրերը։',
    options: [
      'req.params',
      'req.query',
      'req.body',
      'res.query'
    ],
    answer: 1,
    explanation: 'Օրինակ՝ /books?search=node հարցման search արժեքը կլինի req.query.search։'
  },
  {
    topic: 'Request',
    question: 'Ի՞նչ է սովորաբար պահվում req.body-ում POST հարցման դեպքում։',
    options: [
      'Երթուղու պարամետրերը',
      'Հարցման մարմնում ուղարկված տվյալները',
      'Սերվերի պատասխանի տվյալները',
      'URL-ի query պարամետրերը'
    ],
    answer: 1,
    explanation: 'req.body-ում կարող են լինել հաճախորդի ուղարկած տվյալները։'
  },
  {
    topic: 'Express',
    question: 'Ինչի՞ համար է app.use(express.json())-ը։',
    options: [
      'JSON հարցման մարմինը վերլուծելու համար',
      'JSON պատասխանը բրաուզերում ցուցադրելու համար',
      'JSON ֆայլը ավտոմատ ստեղծելու համար',
      'Հարցման բոլոր պարամետրերը ջնջելու համար'
    ],
    answer: 0,
    explanation: 'express.json() middleware-ը վերլուծում է JSON ձևաչափով հարցման մարմինը։'
  },
  {
    topic: 'Response',
    question: 'Ի՞նչ է անում res.json(data)-ը։',
    options: [
      'Ընդունում է հաճախորդից եկած JSON տվյալները',
      'Ուղարկում է JSON ձևաչափով պատասխան',
      'Կարդում է JSON ֆայլը համակարգչից',
      'Փոխակերպում է պատասխանը HTML-ի'
    ],
    answer: 1,
    explanation: 'res.json()-ը ուղարկում է պատասխանը JSON ձևաչափով։'
  },
  {
    topic: 'HTTP',
    question: 'Ի՞նչ է նշանակում HTTP 201 կարգավիճակը։',
    options: [
      'Հարցումը հաջողությամբ կատարվել է, և նոր ռեսուրս է ստեղծվել',
      'Հարցումը ճիշտ է, բայց ռեսուրսը չի գտնվել',
      'Հաճախորդի ուղարկած տվյալները անվավեր են',
      'Սերվերում ներքին սխալ է առաջացել'
    ],
    answer: 0,
    explanation: '201 Created-ը ցույց է տալիս, որ նոր ռեսուրս է ստեղծվել։'
  },
  {
    topic: 'HTTP',
    question: 'Ի՞նչ է նշանակում 404 կարգավիճակը։',
    options: [
      'Սերվերը չի կարող մշակել հարցումը ներքին սխալի պատճառով',
      'Հարցումը հաջողությամբ ստեղծել է նոր ռեսուրս',
      'Պահանջված ռեսուրսը չի գտնվել',
      'Հաճախորդի հարցման տվյալները անվավեր են'
    ],
    answer: 2,
    explanation: '404 Not Found նշանակում է, որ պահանջված ռեսուրսը չի գտնվել։'
  },
  {
    topic: 'HTTP',
    question: 'Ե՞րբ է հաճախ օգտագործվում 400 կարգավիճակը։',
    options: [
      'Երբ սերվերում ներքին սխալ է տեղի ունենում',
      'Երբ հաճախորդի հարցումը սխալ կամ անվավեր է',
      'Երբ պահանջված ռեսուրսը չի գտնվել',
      'Երբ նոր ռեսուրսը հաջողությամբ ստեղծվել է'
    ],
    answer: 1,
    explanation: '400 Bad Request-ը կիրառվում է, երբ հարցման տվյալները սխալ են կամ անվավեր։'
  },
  {
    topic: 'HTTP',
    question: 'Ի՞նչ է նշանակում 500 կարգավիճակը։',
    options: [
      'Հաճախորդը սխալ տվյալներ է ուղարկել',
      'Պահանջված ռեսուրսը չի գտնվել',
      'Սերվերում ներքին սխալ է առաջացել',
      'Նոր ռեսուրսը հաջողությամբ ստեղծվել է'
    ],
    answer: 2,
    explanation: '500 Internal Server Error-ը ցույց է տալիս սերվերի ներքին սխալ։'
  },
  {
    topic: 'Middleware',
    question: 'Ի՞նչ է middleware-ը Express-ում։',
    options: [
      'Ֆունկցիա, որը կարող է մշակել հարցումը, ուղարկել պատասխան կամ փոխանցել կառավարումը',
      'Ֆունկցիա, որը միայն HTML էջ է վերադարձնում',
      'Օբյեկտ, որը պահում է բոլոր API տվյալները',
      'Երթուղի, որը պարտադիր պետք է օգտագործի POST մեթոդը'
    ],
    answer: 0,
    explanation: 'Middleware-ը կարող է մշակել հարցումը, փոխել req-ը, ուղարկել պատասխան կամ կանչել next()։'
  },
  {
    topic: 'Middleware',
    question: 'Ի՞նչ է անում next()-ը middleware-ում։',
    options: [
      'Ավարտում է պատասխանը՝ առանց հաջորդ փուլ անցնելու',
      'Փոխանցում է կառավարումը հաջորդ middleware-ին կամ մշակիչին',
      'Կրկին ուղարկում է հարցումը հաճախորդին',
      'Ջնջում է req.body-ն'
    ],
    answer: 1,
    explanation: 'next()-ը փոխանցում է կառավարումը հաջորդ middleware-ին կամ մշակիչին։'
  },
  {
    topic: 'Express',
    question: 'Ի՞նչ է route-ը Express-ում։',
    options: [
      'Միայն URL-ի հասցեն',
      'HTTP մեթոդը, ուղին և հարցումը մշակող ֆունկցիան',
      'Միայն middleware-ը',
      'Տվյալների բազայի աղյուսակը'
    ],
    answer: 1,
    explanation: 'Route-ը սահմանում է՝ ինչ անել կոնկրետ HTTP մեթոդի և ուղու դեպքում։'
  },
  {
    topic: 'JavaScript',
    question: 'Ի՞նչ է անում Array.filter()-ը։',
    options: [
      'Փոփոխում է բոլոր տարրերը',
      'Վերադարձնում է պայմանին համապատասխանող տարրերի նոր զանգված',
      'Միացնում է բոլոր տարրերը մեկ տողի մեջ',
      'Ջնջում է սկզբնական զանգվածը'
    ],
    answer: 1,
    explanation: 'filter()-ը վերադարձնում է նոր զանգված՝ միայն պայմանին համապատասխանող տարրերով։'
  },
  {
    topic: 'JavaScript',
    question: 'Ի՞նչ է անում toLowerCase()-ը։',
    options: [
      'Տեքստը դարձնում է մեծատառ',
      'Տեքստը դարձնում է փոքրատառ',
      'Հեռացնում է տեքստի բոլոր բացատները',
      'Տեքստը դարձնում է թիվ'
    ],
    answer: 1,
    explanation: 'toLowerCase()-ը տեքստի տառերը դարձնում է փոքրատառ։'
  },
  {
    topic: 'JavaScript',
    question: 'Ի՞նչ է անում includes()-ը։',
    options: [
      'Ստուգում է՝ արդյոք արժեքը պարունակվում է տողի կամ զանգվածի մեջ',
      'Ջնջում է արժեքը',
      'Փոխում է արժեքի տեսակը',
      'Ավելացնում է նոր հատկություն օբյեկտին'
    ],
    answer: 0,
    explanation: 'includes()-ը վերադարձնում է true կամ false՝ կախված նրանից, թե արժեքը կա, թե ոչ։'
  },
  {
    topic: 'JavaScript',
    question: 'Ի՞նչ է վերադարձնում find()-ը։',
    options: [
      'Միշտ նոր զանգված',
      'Առաջին տարրը, որը համապատասխանում է պայմանին',
      'Զանգվածի երկարությունը',
      'Միայն true կամ false'
    ],
    answer: 1,
    explanation: 'find()-ը վերադարձնում է առաջին համապատասխանող տարրը կամ undefined։'
  },
  {
    topic: 'JavaScript',
    question: 'Ի՞նչ է անում Number("12")-ը։',
    options: [
      'Վերադարձնում է "12" տողը',
      'Վերադարձնում է 12 թիվը',
      'Վերադարձնում է null',
      'Ստեղծում է զանգված'
    ],
    answer: 1,
    explanation: 'Number()-ը փորձում է արժեքը փոխակերպել թվի։'
  },
  {
    topic: 'React',
    question: 'Ինչի՞ համար է օգտագործվում useState-ը։',
    options: [
      'Կոմպոնենտի վիճակը պահելու և թարմացնելու համար',
      'Միայն HTML տարրեր ստեղծելու համար',
      'Սերվեր գործարկելու համար',
      'CSS ֆայլեր ներմուծելու համար'
    ],
    answer: 0,
    explanation: 'useState-ը թույլ է տալիս React կոմպոնենտում պահել վիճակ և թարմացնել այն։'
  },
  {
    topic: 'React',
    question: 'Ի՞նչ է անում onClick-ը։',
    options: [
      'Գործարկում է ֆունկցիա, երբ տարրի վրա սեղմում են',
      'Փոխում է էջի URL-ը պարտադիր կերպով',
      'Ստեղծում է նոր կոմպոնենտ',
      'Միացնում է սերվերը'
    ],
    answer: 0,
    explanation: 'onClick-ը իրադարձության մշակիչ է, որը գործարկվում է սեղմելիս։'
  },
  {
    topic: 'React',
    question: 'Ինչի՞ համար է օգտագործվում map()-ը React-ում։',
    options: [
      'Զանգվածի տարրերից JSX տարրեր ստանալու համար',
      'Բոլոր տարրերը ջնջելու համար',
      'Սերվերին հարցում ուղարկելու համար',
      'CSS ֆայլերը միացնելու համար'
    ],
    answer: 0,
    explanation: 'map()-ը հաճախ օգտագործվում է զանգվածի տարրերը ցուցակով ցուցադրելու համար։'
  },
  {
    topic: 'React',
    question: 'Ինչի՞ համար է պետք key-ը ցուցակի տարրերի դեպքում։',
    options: [
      'Տարրերի միջև տարբերությունը React-ին ցույց տալու համար',
      'Կոճակները գունավորելու համար',
      'Սերվերի գաղտնաբառը պահելու համար',
      'Էջը ավտոմատ թարմացնելու համար'
    ],
    answer: 0,
    explanation: 'key-ը React-ին օգնում է հասկանալ, թե ցուցակի որ տարրն է փոխվել։'
  },
  {
    topic: 'React',
    question: 'Ի՞նչ է անում useEffect()-ը։',
    options: [
      'Կառավարում է կողմնակի գործողությունները կոմպոնենտում',
      'Փոխարինում է բոլոր CSS կանոնները',
      'Ստեղծում է Express սերվեր',
      'Միայն հաշվարկում է զանգվածի երկարությունը'
    ],
    answer: 0,
    explanation: 'useEffect()-ը կիրառվում է կողմնակի գործողությունների համար, օրինակ՝ API հարցումների։'
  }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setAnswers((previousAnswers) => [
      ...previousAnswers,
      {
        questionIndex: currentQuestion,
        selected: index,
        correct: index === question.answer
      }
    ]);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setFinished(false);
  };

  const correctAnswers = answers.filter((item) => item.correct).length;
  const wrongAnswers = answers.length - correctAnswers;
  const progress = finished
    ? 100
    : ((currentQuestion + 1) / questions.length) * 100;

  if (finished) {
    return (
      <main className="app">
        <div className="quiz-card result-card">
          <h1>Թեստն ավարտված է 🎉</h1>

          <h2>
            Արդյունք՝ {correctAnswers} / {questions.length}
          </h2>

          <p>Ճիշտ պատասխաններ՝ {correctAnswers}</p>
          <p>Սխալ պատասխաններ՝ {wrongAnswers}</p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button className="next-button" onClick={restartQuiz}>
            Կրկին սկսել
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="app">
      <div className="quiz-card">
        <div className="quiz-header">
          <span className="topic">
            {question.topic || 'npm'}
          </span>

          <span className="question-count">
            Հարց {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h1>{question.question}</h1>

        <div className="options">
          {question.options.map((option, index) => {
            const isCorrect = index === question.answer;
            const isSelected = index === selectedAnswer;

            let optionClass = 'option-button';

            if (selectedAnswer !== null && isCorrect) {
              optionClass += ' correct';
            } else if (isSelected && !isCorrect) {
              optionClass += ' incorrect';
            }

            return (
              <button
                key={option}
                className={optionClass}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="explanation">
            <strong>
              {selectedAnswer === question.answer
                ? 'Ճիշտ պատասխան է։'
                : 'Սխալ պատասխան է։'}
            </strong>

            <p>{question.explanation}</p>

            <button className="next-button" onClick={nextQuestion}>
              {currentQuestion === questions.length - 1
                ? 'Տեսնել արդյունքը'
                : 'Հաջորդ հարցը'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}