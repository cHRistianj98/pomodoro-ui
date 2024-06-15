import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegisterRequestDto } from "../data/register-request.dto";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private registerUrl = 'http://localhost:8080/api/v1/register';

  constructor(private httpClient: HttpClient) {
  }

  register(registerRequestDto: RegisterRequestDto): Observable<any> {
    return this.httpClient.post<any>(this.registerUrl, registerRequestDto);
  }
}
