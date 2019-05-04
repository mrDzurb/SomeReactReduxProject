// split config on development and production
if (process.env.NODE_ENV === 'development') {
  module.exports = {
    database : {
      url: 'mongodb://localhost:27017/mongodb'
    },
    port: 8083,
    session: { session: false },
    cookieSign : 'e183a9977145882e928fc8deabd185a3',
    cookieKey : '08e447b6d0fe9ebb',
    needSendMails: false,
    mailSettings : {
      email:'example@gmail.com',
      from: 'example@gmail.com',
      host: 'smtp.gmail.com',
      port: 587,
      auth: false,
      secure: false,
      user:'example@gmail.com',
      password:'somepassword',
      tls: true,
      fio: 'Test user'
    },
    factoriesMails: {
      kaluga: { email: 'example@gmail.com', name: 'Kaluga' },
      moscow: { email: 'example@gmail.com', name: 'Moscow' },
      penza: { email: 'example@gmail.com', name: 'Penza' }
    },
    noAccessPage: '/no-access',
    intV1Url: 'http://example.org'
  };
} else {
  module.exports = {
    database : {
      url: process.env.MONGOHQ_URL
    },
    port: process.env.PORT,
    session: { session: false },
    cookieSign : 'e183a9977145882e928fc8deabd15542',
    cookieKey : '08e447b6d0fesdfsdf',
    needSendMails: false,
    mailSettings : {
      email:process.env.SMTP_EMAIL,
      from: process.env.SMTP_FROM,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 0,
      auth: process.env.SMTP_AUTH === 'True',
      secure: process.env.SMTP_SECURE === 'True',
      user:process.env.SMTP_USER,
      password:process.env.SMTP_PASSWORD,
      tls: process.env.SMTP_TLS === 'True',
      fio: 'Manager'
    },
    factoriesMails: {
      ctoriesMails: {
      kaluga: { email: 'example@gmail.com', name: 'Kaluga' },
      moscow: { email: 'example@gmail.com', name: 'Moscow' },
      penza: { email: 'example@gmail.com', name: 'Penza' }
    },
    noAccessPage: '/no-access',
    intV1Url: 'http://example.org'
  };
}
