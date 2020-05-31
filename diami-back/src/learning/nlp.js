const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: '83I4lb2KbmrQuHxnvjV84CgsOewh5SiYvu7pr5lCzS2h'
  }),
  url:
    'https://api.us-south.assistant.watson.cloud.ibm.com/instances/2e0e91f9-d156-45de-93a4-fe77e6a4af6c'
});

const assistantId = 'c9fc6893-4a2c-4e0c-a284-d8f08e9ab7c1';

var newUserTemp = {
    session_id: '',
    name: '',
    email: '',
    password: '',
    img: '',
    role: '',
    messageTemp: ''
  },
  registroFlag = false,
  sesionFlag = false;

class Nlp {
  constructor() {}

  // Funciones de NLP

  initChatNlpLogin(client) {


    newUserTemp = {
        session_id: '',
        name: '',
        email: '',
        password: '',
        img: '',
        role: '',
        messageTemp: ''
      };
      registroFlag = false;
      sesionFlag = false;


    assistant
      .createSession({
        assistantId: assistantId
      })
      .then((res) => {
        newUserTemp['session_id'] = res.result.session_id;
        assistant
          .message({
            assistantId: assistantId,
            sessionId: newUserTemp['session_id'],
            input: {
              message_type: 'text',
              text: ''
            }
          })
          .then((res) => {
            //console.log(JSON.stringify(res.result, null, 2));

            client.emit('message-login', {
              user: '',
              type: 'BOT',
              message: res.result.output.generic[0].text,
              createdAt: new Date()
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  initChatNlpLoginMessage(client, msj) {


    if (newUserTemp['email'] != '' && sesionFlag == true) {

        
        client.emit('message-login', {
            user: '',
            type: 'BOT',
            message: "Comprobando la sesión....",
            createdAt: new Date()
          });
    
          setTimeout(() => {
            client.emit('login-success', {              
              email: newUserTemp['email'],
              password: msj,
              isLogin: true
            });
          }, 1000);

          setTimeout(() => {

            newUserTemp = {
                session_id: '',
                name: '',
                email: '',
                password: '',
                img: '',
                role: '',
                messageTemp: ''
              };
              registroFlag = false;
              sesionFlag = false;

            
          }, 2000);


    }else{
        if (newUserTemp['email'] != '' && newUserTemp['name'] != '') {
      
            newUserTemp['password']=msj
            client.emit('message-login', {
              user: '',
              type: 'BOT',
              message: newUserTemp['messageTemp'],
              createdAt: new Date()
            });
      
            console.log(newUserTemp);
            setTimeout(() => {
              client.emit('login-success', {
                name: newUserTemp['name'],
                email: newUserTemp['email'],
                password: msj,
                isLogin: false
              });
            }, 2000);

            setTimeout(() => {

                newUserTemp = {
                    session_id: '',
                    name: '',
                    email: '',
                    password: '',
                    img: '',
                    role: '',
                    messageTemp: ''
                  };
                  registroFlag = false;
                  sesionFlag = false;
    
                
              }, 3000);



          } else {
            assistant
              .message({
                assistantId: assistantId,
                sessionId: newUserTemp['session_id'],
                input: {
                  message_type: 'text',
                  text: msj
                }
              })
              .then((res) => {
                //console.log(JSON.stringify(res.result, null, 2));
                if (res.result.output.entities.length >= 1) {
                  for (let i = 0; i < res.result.output.entities.length; i++) {
                    const entityDetected = res.result.output.entities[i];
      
                    switch (entityDetected.entity) {
                      case 'nombre':
                        newUserTemp['name'] = entityDetected.value;
                        break;
      
                      case 'correo':
                        newUserTemp['email'] = msj.substring(
                          entityDetected.location[0],
                          entityDetected.location[1]
                        );
                        break;
      
                      default:
                        console.log('Entidad desconocida');
                        break;
                    }
                  }
                }
      
                if (res.result.output.intents[0]!=undefined && res.result.output.intents[0].intent == 'iniciarSesion')
                  sesionFlag = true;
                else {
                  if (res.result.output.intents[0]!=undefined && res.result.output.intents[0].intent == 'registroAPP')
                    registroFlag = true;
                }
      
                if (newUserTemp['email'] != '' && newUserTemp['name'] != '') {
                  newUserTemp['messageTemp'] = res.result.output.generic[0].text;
                  res.result.output.generic[0].text =
                    'Pude anotar casi todo, finalmente cuál será tu contraseña?. Debe ser mayor a 6 caracteres. Digíta solo la contraseña porfavor';
                }
      
                client.emit('message-login', {
                  user: '',
                  type: 'BOT',
                  message: res.result.output.generic[0].text,
                  createdAt: new Date()
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }

    }


   


  }
}

module.exports = Nlp;
