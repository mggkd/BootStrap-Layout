import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {
  private apiUrl = 'https://task-5-sw-default-rtdb.firebaseio.com/user-data.json';
  private firebaseApiKey = 'AIzaSyDs6Ghx3Qi6GEabaWAKTwKn669L8Cx9aC8';

  constructor(private http: HttpClient) { }

  postUser(userObj: any): Observable<any> {
    return this.http.post(this.apiUrl, userObj).pipe(
      catchError((error: any) => {
        return throwError(error.message || 'Something went wrong');
      })
    );
  }

  getUsers(): Observable<any[]> {
    return this.http.get(this.apiUrl).pipe(
      map((rawData: any) => {
        const arr: any[] = [];
        for (const user in rawData) {
          if (Object.prototype.hasOwnProperty.call(rawData, user)) {
            arr.push({ ...rawData[user], id: user });
          }
        }
        return arr;
      }),
      catchError((error: any) => {
        return throwError(error.message || 'Something went wrong');
      })
    );
  }
  // getUsers(): Observable<any> {
  //   return this.http.get(this.apiUrl).pipe(
  //     catchError((error: any) => {
  //       return throwError(error.message || 'Something went wrong');
  //     })
  //   );
  // }
  

  registerNewUser(credentials: any): Observable<any> {
    const payload = {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      contact: credentials.contact,
      department: credentials.department,
      userName: credentials.userName,
      password: credentials.password,
      returnSecureToken: true
    };
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseApiKey}`;
    return this.http.post(url, payload).pipe(
      catchError((error: any) => {
        return throwError(error.message || 'Something went wrong');
      })
    );
  }

  registerNewHodUser(credentials: any): Observable<any> {
    const payload = {
      position: credentials.position,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      contact: credentials.contact,
      department: credentials.department,
      userName: credentials.userName,
      password: credentials.password,
      returnSecureToken: true
    };
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseApiKey}`;
    return this.http.post(url, payload).pipe(
      catchError((error: any) => {
        return throwError(error.message || 'Something went wrong');
      })
    );
  }

  loginUser(credentials: any): Observable<any> {
    const payload = {
      email: credentials.userName,
      password: credentials.password,
      returnSecureToken: true
    };
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseApiKey}`;
    return this.http.post(url, payload).pipe(
      catchError((error: any) => {
        return throwError(error.message || 'Something went wrong');
      })
    );
  }
}
