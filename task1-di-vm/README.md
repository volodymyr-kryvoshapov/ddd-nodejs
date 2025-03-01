## Блок заданий №1

Берем пример сервера [`9-logger`](https://github.com/HowProgrammingWorks/DDD/tree/master/JavaScript/9-logger) и доработаем его:

1. Давайте вынесем в конфиг из примера [`9-logger`](https://github.com/HowProgrammingWorks/DDD/tree/master/JavaScript/9-logger)
все или часть параметров, которые могут меняться: номер порта, параметры подключения к базе данных,
настройки криптографии для хеширования паролей, таймайты и то, что вам покажется полезным перенести в конфиги.
Для конфигов мы можем использовать обычный модуль, например, файл `config.js`, рядом `main.js`,
из которого он подгружается через `require`.

2. В конфиге сделаем ключ `transport` с вариантами значений `http` и `ws`, т.е. мы можем в конфиге переключать, по какому транспорту мы отдаем API.
Нужно соответственно поменять код в `main.js` чтобы подгружался или `http.js` или `ws.js` в соответствии с конфигом.

3. Клиентская часть API у нас поддерживает `websocket`, но не умеет работать через обычный HTTP.
Вот код клиента: [`client.js`](https://github.com/HowProgrammingWorks/DDD/blob/master/JavaScript/9-logger/static/client.js)
Нужно разработать вариант функции `scaffold` (динамическое создание интерфейса для работы с серверным API в рантайме),
которая бы поддерживала HTTP, лучше всего при на базе `fetch`. Добавим в функцию параметр `url`, в результате,
ее сигнатура будет: `scaffold(url, structure)`. Если не знаете с чего начать, то может помочь пример функции
[`buildAPI`](https://github.com/HowProgrammingWorks/API/blob/master/JavaScript/1-HTTP/static/client.js),
а при необходимости посмотрите дополнительное видео про [пересаживание API с HTTP на Websocket](https://www.youtube.com/watch?v=-az912XBCu8),
это задача обратная нашей.

4. Теперь, на клиенте нужно организовать условное подключение к серверу по `http` или `websocket` в зависимости от `url`,
передаваемого в функцию `scaffold`, т.е. мы должны иметь или две реализации `scaffold` с одинаковой сигнатурой и с разными
транспортами или коллекцию транспортов, например `const transport = { http:..., ws:... };`. По желанию вы можете реализовать
то же для протоколов `https` и `http2` как на клиенте, так и на сервере. Но это не обязательно, принцип переключения уже понятен.

5. Можно реализовать подключение фреймворков по такому же принципу, как мы это сделали с транспортами, это тоже по желанию, не обязательно,
например `fastify` или любой другой фреймворк и добавить в конфиге параметр: `framework` со значениями `native`, `fastify` и т.д.

6. Давайте заменим нашу самодельную систему модульности для написания API на `commonjs` или на `esm`, на ваш выбор. И соответственно
отрефакторить все файлы в папке `./api`. При этом нужно будет реализовать внедрение зависимостей другим способом, на ваш выбор,
но без зависимостей.

7. Так же поступим и с логгером, делаем его пристегиваемым: выносим в конфиги его название, при старте подгружаем нужный и перенаправляем
`console` в него. Можете взять логгер [pino](https://github.com/pinojs/pino).



## Adminer

- System: PostgreSQL
- Server: postgres
- Username: see in docker-compose
- Password: see in docker-compose
- Database: example


## SSL

To generate a self-signed SSL certificate for testing purposes, you can use the openssl command-line tool. Here are the steps:

1. Open Terminal on your Mac.

2. Generate a Private Key:

`openssl genrsa -out localhost-key.pem 2048`

3. Generate a Certificate Signing Request (CSR):

`openssl req -new -key localhost-key.pem -out localhost.csr -subj "/CN=localhost"`

You will be prompted to enter information about your organization. For testing purposes, you can fill in the fields with dummy data.

4. Generate the Self-Signed Certificate:

`openssl x509 -req -days 365 -in localhost.csr -signkey localhost-key.pem -out localhost-cert.pem`

This command creates a certificate that is valid for 365 days.

5. Clean Up (optional): You can remove the CSR file as it is no longer needed:

`rm localhost.csr`

After running these commands, you will have two files: private-key.pem and certificate.pem. You can use these files in your Node.js application to set up an HTTPS server.