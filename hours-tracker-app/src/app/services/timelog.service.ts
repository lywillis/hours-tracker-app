import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TimeLog } from 'src/app/models/TimeLog';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeLogService {

  apiUrl = 'http://localhost:3001/api/log/';
  constructor(private http: Http) {
  }

  createTimeLog(timeLog: TimeLog): Promise<TimeLog> {
    return this.http.post(this.apiUrl, timeLog)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  deleteTimeLog(timeLog: TimeLog): Promise<TimeLog> {
    return this.http.delete(this.apiUrl + timeLog.id).toPromise()
    .then(this.handleData)
    .catch(this.handleError);
  }
  getTimeLog(id: string): Promise<TimeLog> {
    return this.http.get(this.apiUrl + id)
    .toPromise()
    .then(this.handleData)
    .catch(this.handleError);
  }

  getTimeLogs(): Observable<TimeLog[]> {
    return this.http.get(this.apiUrl).pipe(map(res => {
        const body = this.handleData(res);
        return body.logs.map(log => {
          const start = new Date(log.start);
          const end = new Date(log.end);
          const timeLog = new TimeLog(start, end, log._id);
            return timeLog;
        });
      }), catchError(this.handleData));
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
