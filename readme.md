## GoIT Node.js Course Template Homework

Виконайте форк цього репозиторію для виконання домашніх завдань (2-6)
Форк створить репозиторій на вашому http://github.com

Додайте ментора до колаборації

Для кожної домашньої роботи створюйте свою гілку.

- hw02
- hw03
- hw04
- hw05
- hw06

Кожна нова гілка для др повинна робитися з master

Після того, як ви закінчили виконувати домашнє завдання у своїй гілці, необхідно зробити пулл-реквест (PR). Потім додати ментора для рев'ю коду. Тільки після того, як ментор заапрувить PR, ви можете виконати мердж гілки з домашнім завданням у майстер.

Уважно читайте коментарі ментора. Виправте зауваження та зробіть коміт у гілці з домашнім завданням. Зміни підтягнуться у PR автоматично після того, як ви відправите коміт з виправленнями на github
Після виправлення знову додайте ментора на рев'ю коду.

- При здачі домашньої роботи є посилання на PR
- JS-код чистий та зрозумілий, для форматування використовується Prettier

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

// Визначення маршруту має такий вигляд

app.METHOD(PATH, HANDLER);

// try {
// const errToken =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjIxNTlkNGM2OTlmNjY4MjNiNDU4YyIsImlhdCI6MTcwMDkyOTkwMCwiZXhwIjoxNzAxMDAxOTAwfQ.lw-PwufjlSxbqn00TpS_SoXlusr42ohHvcj3It37zfM";

// //* Перевіряє чи дійсно токен був зашифрований JWT_SECRET_KEY цим рядком(Якщо НІ,то повертає Invalid signature)
// //*Якщо 1 ОК, то далі перевіряє чи час життя не сплинув (Якщо минув -> JWT EXPIRES)
// //\*Якщо все ОК -> payload

// const { id } = jsonwebtoken.verify(token, JWT_SECRET_KEY);

// console.log({ id });
// } catch (error) {
// console.log(error.message);
// }

//\* authentication.js
1 Варіант
const { JWT_SECRET_KEY } = process.env;

const authentication = (req, res, next) => {
const { authorization } = req.headers; //\*в Node.js heades з малої
const [bearer, token] = authorization.split(" ");

if (bearer !== "Bearer") {
return next(HttpError(401)); //\*return, бо next не перериває виконання ф-Ї
}

console.log(authentication);
};
