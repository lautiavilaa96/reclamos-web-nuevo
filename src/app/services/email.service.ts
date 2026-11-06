import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  // Apunta a la subcarpeta api/ dentro de reclamos-web
  private baseUrl = 'aqui va la api que conecta c el envio de mail ';

  constructor(private http: HttpClient) {}

  sendEmailWithAttachment(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData, { responseType: 'text' });
  }
}
