import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MongoService {

  apiUrl = 'http://localhost:3001/api/';
  constructor(private http: Http) {
   }

   createTimeLog(timeLog: any): Promise<any> {
    return this.http.post(this.apiUrl, timeLog)
    .toPromise()
    .then(this.handleData)
    .catch(this.handleError);
   }

   handleData() {}

   handleError() {}
}
