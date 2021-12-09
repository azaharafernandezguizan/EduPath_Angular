import { SharedService } from './shared.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  constructor(
    private http: HttpClient,
    private commonsService: SharedService
  ) { }

  private formatErrors(error: any): any {
    console.log('Format errors:' + error);
    return throwError(error);
  }

  createHeader(): HttpHeaders {
    const headerDict = {
      Accept: '*/*'
    };

    return new HttpHeaders(headerDict);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.createHeader(), params: params })
    .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: any = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body), {  headers: this.createHeader() })
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: any = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), {  headers: this.createHeader() })
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, {  headers: this.createHeader() })
      .pipe(catchError(this.formatErrors));
  }
}


