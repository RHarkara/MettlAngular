import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {GlobalConstants} from '../global-constants';


@Injectable({
    providedIn: 'root'
})
export class MettlApiService {
    apiURL = GlobalConstants.apiURL;
    constructor(private http: HttpClient) { }

    getAccountInfo(parameter): Observable<any> {
        console.log(this.apiURL + '/account?' + parameter);
        return this.http.get(this.apiURL + '/account?' + parameter);
    }

    getAllAssessments(): Observable<any> {
        return this.http.get(this.apiURL + '/getAllAssessments');
    }

    createSchedule(data): Observable<any> {
        return this.http.post(this.apiURL + '/assessments/schedules', data);
    }
}
