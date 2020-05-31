const { io } = require('../index');
const nlp = require('../learning/nlp');
const saludosInitChat = [
  'Hola de nuevo',
  'Siempre me gusta empezar con un gran Hola!!',
  'Estaba tomando una siesta, Hola!'
];
const _nlp = new nlp();

io.on('connection', (client) => {
  client.on('init-chat-login', (userId, callback) => {
    _nlp.initChatNlpLogin(client);
  });

  client.on('init-chat', (userId, callback) => {
    console.log(userId);

    // _nlp.initChatNlpLogin(client);

    client.emit('message', {
      user: client.id,
      type: 'BOT',
      message: saludosInitChat[_nlp.getRandomArbitrary(0,saludosInitChat.length)],
      createdAt: new Date()
    });
  });

  client.on('disconnect', () => {
    console.log('Usuario desconectado');
  });

  client.on('send-message-login', (msj, callback) => {
    _nlp.initChatNlpLoginMessage(client, msj.text.trim());

    /*setTimeout(() => {
            client.emit('message-login', {
                user: client.id,
                type: 'BOT',
                message: msj.text,
                createdAt: new Date()
            });
        }, 2000);*/
  });

  client.on('send-message', (msj, callback) => {
    _nlp.initChat(client, msj.text.trim(),msj.user);

    
  });
});
