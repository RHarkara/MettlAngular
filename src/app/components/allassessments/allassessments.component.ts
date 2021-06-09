import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from '../../global-constants';
import {MettlApiService} from '../../services/mettl.api.service';
import CryptoJS from 'crypto-js';
import {MettlApiHelperService} from "../../services/mettl.api.helper.service";
import LocalBase from 'localbase';

@Component({
  selector: 'app-allassessments',
  templateUrl: './allassessments.component.html',
  styleUrls: ['./allassessments.component.css']
})
export class AllAssessmentsComponent implements OnInit {
  HTTPVerb = 'GET';
  assessmentList: any;
  title = '';
  constructor(private mettlApiService: MettlApiService,
              private mettlApiHelperService: MettlApiHelperService) {
  }

  ngOnInit(): void {
    this.getAllAssessments();
  }

  getAllAssessments(): void {
    const apiURL = GlobalConstants.apiURL.concat('/assessments');
    const parameters = this.mettlApiHelperService.getRequestParameters(this.HTTPVerb, apiURL, null);
    this.mettlApiService.getAllAssessments(parameters, apiURL)
        .subscribe(
            data => {
              this.assessmentList = data.assessments;
             for(let data of this.assessmentList){
               data['timeStamp'] = new Date()
               let db = new LocalBase('Mettl_Integration');
               db.collection('assessmentList').add(data);
             }
            },
            error => {
              console.log(error);
            });
  }
}
