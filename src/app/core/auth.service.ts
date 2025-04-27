import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthRequestDto {
  username: string;
  password: string;
}

export interface JwtResponseDto {
  accessToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}

  login(dto: AuthRequestDto): Observable<JwtResponseDto> {
    return this.http.post<JwtResponseDto>(`${this.baseUrl}/login`, dto);
  }

  get token(): string | null {
    return localStorage.getItem('accessToken');
  }

  set token(value: string | null) {
    if (value) {
      localStorage.setItem('accessToken', value);
    } else {
      localStorage.removeItem('accessToken');
    }
  }

  logout(): void {
    this.token = null;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }
}
