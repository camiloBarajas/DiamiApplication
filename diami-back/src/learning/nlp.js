const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const axios = require('axios');
const fs = require('fs');
const Message = require('../models/message.model');
var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
  Layer = synaptic.Layer,
  Network = synaptic.Network,
  Trainer = synaptic.Trainer,
  Architect = synaptic.Architect;

var redImported = '';

fs.readFile('./modelNeuralNetwork.json', 'utf8', function readFileCallback(
  err,
  data
) {
  if (err) {
    console.log(err);
  } else {
    obj = JSON.parse(data); //now it an object
    redImported = Network.fromJSON(obj);
  }
});

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
    date: '',
    name: '',
    email: '',
    password: '',
    img: '',
    role: '',
    messageTemp: ''
  },
  registroFlag = false,
  sesionFlag = false;

var factoresUsuario = {
  autoestima: { entornoFamiliar: 0, espejo: 0, satisfacion: 0 },
  culpa: { meHablan: 0, exitos: 0, errores: 0 },
  social: { frecuencia: 0, salir: 0, reuniones: 0 }
};

class Nlp {
  constructor() {}

  // Funciones de NLP

  initChatNlpLogin(client) {
    newUserTemp = {
      session_id: '',
      date: '',
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
        message: 'Comprobando la sesión....',
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
          date: '',
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
    } else {
      if (
        newUserTemp['email'] != '' &&
        newUserTemp['name'] != '' &&
        newUserTemp['date'] != ''
      ) {
        newUserTemp['password'] = msj;
        client.emit('message-login', {
          user: '',
          type: 'BOT',
          message: newUserTemp['messageTemp'],
          createdAt: new Date()
        });

        console.log(newUserTemp);
        var age =
          new Date().getFullYear() - parseInt(newUserTemp.date.split('-')[0]);
        getGender(newUserTemp.name.split(' ')[0])
          .then((response) => {
            if (response.data.gender == 'female')
              var genderDetected = 'femenino';
            else {
              if (response.data.gender == 'male')
                var genderDetected = 'masculino';
              else {
                var genderDetected = 'noDetectado';
                console.log('genero no detectado');
              }
            }

            setTimeout(() => {
              client.emit('login-success', {
                name: newUserTemp['name'],
                email: newUserTemp['email'],
                password: msj,
                gender: genderDetected,
                age: age,
                isLogin: false
              });
            }, 3000);

            setTimeout(() => {
              newUserTemp = {
                session_id: '',
                date: '',
                name: '',
                email: '',
                password: '',
                img: '',
                role: '',
                messageTemp: ''
              };
              registroFlag = false;
              sesionFlag = false;
            }, 4000);
          })
          .catch((error) => {
            console.log(error);
          });
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

                  case 'sys-date':
                    newUserTemp['date'] = entityDetected.value;
                    break;

                  default:
                    console.log('Entidad desconocida');
                    break;
                }
              }
            }

            if (
              res.result.output.intents[0] != undefined &&
              res.result.output.intents[0].intent == 'iniciarSesion' &&
              registroFlag == false
            )
              sesionFlag = true;
            else {
              if (
                res.result.output.intents[0] != undefined &&
                res.result.output.intents[0].intent == 'registroAPP' &&
                sesionFlag == false
              )
                registroFlag = true;
            }

            if (
              newUserTemp['email'] != '' &&
              newUserTemp['name'] != '' &&
              newUserTemp['date'] != ''
            ) {
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

  initChat(client, msj, user) {
    createSessionInitChat()
      .then((res) => {
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

            for (let i = 0; i < res.result.output.generic.length; i++) {
              const genericText = res.result.output.generic[i].text;
              client.emit('message', {
                user: '',
                type: 'BOT',
                message: res.result.output.generic[i].text,
                createdAt: new Date()
              });
            }

            if (res.result.output.generic.length == 2) {
              if (res.result.output.generic[0].text.includes('familia')) {
                if (
                  res.result.output.entities[0].entity == 'no' ||
                  res.result.output.entities[0].entity == 'poco'
                ) {
                  factoresUsuario['autoestima']['entornoFamiliar'] = 1;
                }

                if (
                  res.result.output.entities[0].entity != 'no' &&
                  (res.result.output.entities[0].entity == 'mucho' ||
                    res.result.output.entities[0].entity == 'si')
                ) {
                  factoresUsuario['autoestima']['entornoFamiliar'] = 0;
                }

                if (
                  res.result.output.entities[0].entity == 'medio' ||
                  res.result.output.intents[0].intent == 'duda'
                ) {
                  factoresUsuario['autoestima']['entornoFamiliar'] = 0.5;
                }
              }

              if (res.result.output.generic[0].text.includes('espejo')) {
                if (
                  res.result.output.entities[0].entity == 'no' ||
                  res.result.output.entities[0].entity == 'poco'
                ) {
                  factoresUsuario['autoestima']['espejo'] = 1;
                }

                if (
                  res.result.output.entities[0].entity != 'no' &&
                  (res.result.output.entities[0].entity == 'mucho' ||
                    res.result.output.entities[0].entity == 'si')
                ) {
                  factoresUsuario['autoestima']['espejo'] = 0;
                }

                if (
                  res.result.output.entities[0].entity == 'medio' ||
                  res.result.output.intents[0].intent == 'duda'
                ) {
                  factoresUsuario['autoestima']['espejo'] = 0.5;
                }
              }

              if (
                res.result.output.generic[0].text.includes('taller') ||
                res.result.output.generic[0].text.includes('satisfecho')
              ) {
                if (
                  res.result.output.entities[0].entity == 'no' ||
                  res.result.output.entities[0].entity == 'poco'
                ) {
                  factoresUsuario['autoestima']['satisfacion'] = 1;
                }
                if (
                  res.result.output.entities[0].entity != 'no' &&
                  (res.result.output.entities[0].entity == 'mucho' ||
                    res.result.output.entities[0].entity == 'si')
                ) {
                  factoresUsuario['autoestima']['satisfacion'] = 0;
                }

                if (
                  res.result.output.entities[0].entity == 'medio' ||
                  res.result.output.intents[0].intent == 'duda'
                ) {
                  factoresUsuario['autoestima']['satisfacion'] = 0.5;
                }
              }
            }

            if (user.gender=='masculino') user.gender=1
            else user.gender=0

            
              
            

            var prediccionRedNeuronal = redImported.activate([
              user.age/90,
              user.gender,
              factoresUsuario['autoestima']['entornoFamiliar'],
              factoresUsuario['autoestima']['espejo'],
              factoresUsuario['autoestima']['satisfacion']
            ]);

            if (((1 - prediccionRedNeuronal[0]) * 10) | (0 == 5)) {
              situation = 'Riesgo Medio';
            } else {
              if (((1 - prediccionRedNeuronal[0]) * 10) | (0 < 5)) {
                situation = 'Riesgo Bajo';
              } else situation = 'Riesgo Alto';
            }

            if (situation != 'Riesgo Bajo') {



              Message.create({
                idUser: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                age: user.age,
                img: user.img,
                tokenFirebase:user.tokenFirebase,
                situation: situation
              })

              sendPushNotification(user.tokenFirebase, { title: user.name, text: situation });


              /*client.emit('notification', {
                id: user._id,
                name: user.name,
                email: user.email,
                img: '',
                phone: '',
                edad: '',
                situation: situation,
                factoresUsuario: factoresUsuario['autoestima']
              });*/



            }
          })
          .catch((err) => {
            assistant
              .createSession({
                assistantId: assistantId
              })
              .then((res) => {
                newUserTemp['session_id'] = res.result.session_id;
                client.emit('message', {
                  user: '',
                  type: 'BOT',
                  message: 'Perdón, me distraje un poco, podrías repetirme?',
                  createdAt: new Date()
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
      })
      .catch((err) => {
        console.log('error creando sessión');
      });
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

function createSessionInitChat() {
  return new Promise((resolve, reject) => {
    if (newUserTemp['session_id'] == '') {
      assistant
        .createSession({
          assistantId: assistantId
        })
        .then((res) => {
          newUserTemp['session_id'] = res.result.session_id;
          resolve([]);
        })
        .catch((err) => {
          console.log(err);
          reject([]);
        });
    } else resolve([]);
  });
}

const getGender = (name) => {
  try {
    return axios.get(
      'https://api.genderize.io/?name=' + name + '&country_id=CO'
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = Nlp;
