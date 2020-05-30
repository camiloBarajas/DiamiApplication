const { io } = require('../index');
const nlp = require('../learning/nlp');

const _nlp = new nlp();

io.on('connection', (client) => {

    client.on('init-chat-login', (user, callback) => {
        console.log('init-chat-login', user);

        client.emit('message', _nlp.test());
    });

    client.on('init-chat', (user, callback) => {
        console.log('init-chat', user);

        client.emit('message', {
            user: client.id,
            type: 'BOT',
            message: 'Hola de nuevo',
            createdAt: new Date()
        });
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('send-message', (msj, callback) => {
        setTimeout(() => {
            client.emit('message', {
                user: client.id,
                type: 'BOT',
                message: msj.text,
                createdAt: new Date()
            });
        }, 2000);
    });
});