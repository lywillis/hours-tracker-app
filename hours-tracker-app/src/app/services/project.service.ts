import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Project } from 'src/app/models/Project';
import { TimeLog } from 'src/app/models/TimeLog';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl = 'http://localhost:3001/api/project/';
  timeEdited: Subject<TimeLog> = new Subject<TimeLog>();
  projectedEdited: Subject<Project> = new Subject<Project>();
  constructor(private http: Http) { }

  getProjects(n = 100): Observable<Project[]> {
    const req = {n: n};
    return this.http.post(this.apiUrl + 'find/', req).pipe(map(res => {
        const body = this.handleData(res);
        return body.projects;
      }), catchError(this.handleError));
  }
  createProject(project: Project): Promise<Project> {
    return this.http.post(this.apiUrl + 'add/', project)
      .toPromise()
      .then(res => {
        const body = this.handleData(res);
        this.projectedEdited.next(project);
      })
      .catch(this.handleError);
  }

  addLog(project: Project, log: TimeLog): Promise<Project> {
    return this.http.put(this.apiUrl + project._id, log)
      .toPromise()
      .then( res => {const body = this.handleData(res);
      this.timeEdited.next(log);
    }
    )
      .catch(this.handleError);
  }

  deleteLog(project: Project, log: TimeLog ): Promise<Project>  {
    return this.http.delete(this.apiUrl + project._id + '/edit/' + log.id)
      .toPromise()
      .then(res => {
        const body = this.handleData(res);
        this.timeEdited.next(log);
      })
      .catch(this.handleError);
  }
  getProject(id: string): Promise<Project> {
    return this.http.get(this.apiUrl + id)
    .toPromise()
    .then(res => {
      const body = this.handleData(res);
      return body.project;
    }
    )
    .catch(this.handleError);
  }

  getTimeLogs(project: Project): Observable<TimeLog[]> {
    return this.http.get(this.apiUrl + project._id).pipe(map(res => {
        const body = this.handleData(res);
        return body.project.logs.map(log => {
          const start = new Date(log.start);
          const end = new Date(log.end);
          const timeLog: TimeLog = new TimeLog(start, end);
          timeLog.id = log._id;
            return timeLog;
        });
      }), catchError(this.handleError));
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

