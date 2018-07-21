import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Project } from 'src/app/models/Project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl = 'http://localhost:3001/api/project/';
  constructor(private http: Http) { }

  getProjects(n = 100): Observable<Project[]> {
    const req = {n: n};
    return this.http.post(this.apiUrl + 'find/', req).pipe(map(res => {
        const body = this.handleData(res);
        return body.projects.map(project => {
          return new Project(project.name, project._id);
        });
      }), catchError(this.handleData));
  }
  createProject(project: Project): Promise<Project> {
    return this.http.post(this.apiUrl + 'add/', project)
      .toPromise()
      .then(this.handleData)
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

