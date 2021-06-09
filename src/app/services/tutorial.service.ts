import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
const baseUrl = 'http://localhost:8090/mettl-api-intg/v1';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl + '/getAccountInfo');
  }

  getAllAssessments(): Observable<any> {
    return this.http.get(baseUrl + '/getAllAssessments');
  }

  createSchedule(data): Observable<any> {
    return this.http.post(baseUrl + '/assessments/schedules', data);
  }

  getSchedules(offset, limit): Observable<any> {
    return this.http.get(baseUrl+'/schedules?offset='+offset+'&limit='+limit);
  }

  getTestStatus(accessKey, email): Observable<any> {
    let testStatusURL;
    if (email != null) {
      testStatusURL = baseUrl + '/schedules/' + accessKey + '/candidates/' + email;
    }else {
      testStatusURL = baseUrl+'/schedules/'+accessKey+'/candidates';
    }
    return this.http.get(testStatusURL);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}
