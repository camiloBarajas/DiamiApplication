import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public static TOKEN = 'token';
  public static USER = 'user';
  public static CHAT = 'chat';
  public static CHAT_LOGIN = 'chat-login';
  public static ROLES = {
    USER: 'USER',
    PROFESSIONAL: 'PROFESSIONAL'
  };
}
