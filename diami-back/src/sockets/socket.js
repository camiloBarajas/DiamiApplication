const { io } = require('../index');
const nlp = require('../learning/nlp');

const _nlp = new nlp();

io.on('connection', (client) => {

    client.on('init-chat-login', (user, callback) => {
        console.log('init-chat-login', user);

        client.emit('message-login', _nlp.test());
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

    client.on('send-message-login', (msj, callback) => {
        let { text } = msj;
        if (text.toLowerCase() === 'nuevo' || text.toLowerCase() === 'nueva') {
            text = '¿Como te llamas?';
        } else if (text.toLowerCase().includes('cuenta')) {
            text = 'Súper, por favor dime tú correo';
        }
        setTimeout(() => {
            client.emit('message-login', {
                user: client.id,
                type: 'BOT',
                message: text,
                createdAt: new Date()
            });
        }, 2000);
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

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});