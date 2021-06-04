import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class MettlApiService {
    constructor(private http: HttpClient) { }

    getAccountInfo(parameters: Map<string, string>, apiURL): Observable<any> {
        let params = this.prepareQueryString(parameters, apiURL);
        return this.http.get(apiURL + '?' +params);
    }

    private prepareQueryString(parameters: Map<string, string>, apiURL) {
        let paramsList: Array<string> = [];
        parameters.forEach((value: string, key: string) => {
            paramsList.push(key + '=' + value);
        });
        let params = paramsList.join('&');
        console.log(apiURL, params);
        return params;
    }

    getAllAssessments(parameters: Map<string, string>, apiURL): Observable<any> {
        let params = this.prepareQueryString(parameters, apiURL);
        return this.http.get(apiURL + '?' + params);
    }

    createSchedule(parameters: Map<string, string>, apiURL): Observable<any> {
        let paramsList: Array<string> = [];
        parameters.forEach((value: string, key: string) => {
            paramsList.push(key + '=' + value);
        });
        let params = paramsList.join('&');
        console.log(apiURL, params);
        return this.http.post(apiURL, params);
    }
}
