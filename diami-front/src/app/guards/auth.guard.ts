import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CanLoad } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthenticated();
  }
}
