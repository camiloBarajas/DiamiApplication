import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  public static questions = [
    {
      type: 'BOT',
      field: 'name',
      question: '¿Hola, como te llamas?'
    },
    {
      type: 'BOT',
      field: 'age',
      question: '¿Cuantos años tienes?'
    },
    {
      type: 'BOT',
      field: 'nickName',
      question: '¿Como te gustaría que te llame?'
    },
    {
      type: 'BOT',
      field: 'city',
      question: '¿De qué ciudad eres?'
    },
    {
      type: 'BOT',
      field: 'email',
      question: '¿Cuál es tu correo?'
    },
    {
      type: 'BOT',
      field: 'password',
      question: '¿Por último, digita una clave de acceso a la aplicación?'
    }
  ];
}
