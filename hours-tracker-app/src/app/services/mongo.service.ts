import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TimeLog } from 'src/app/models/TimeLog';

@Injectable({
  providedIn: 'root'
})
export class MongoService {

  apiUrl = 'http://localhost:3001/api/';
  constructor(private http: Http) {
   }

  createTimeLog(timeLog: TimeLog): Promise<TimeLog> {
    return this.http.post(this.apiUrl, timeLog)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  getTimeLogs(): Promise<TimeLog[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(res => {
        const body = this.handleData(res);
        return body.logs;
      })
      .catch(this.handleError);
  }

   private handleData(res: any) {
    const body = res.json();
    console.log(body); // for development purposes only
    return body || {};
}

private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for development purposes only
  return Promise.reject(error.message || error);
}
}
