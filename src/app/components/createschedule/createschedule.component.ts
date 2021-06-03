import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from '../../global-constants';
import {MettlApiService} from '../../services/mettl.api.service';
import CryptoJS from 'crypto-js';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-createschedule',
  templateUrl: './createschedule.component.html',
  styleUrls: ['./createschedule.component.css']
})
export class CreatescheduleComponent implements OnInit {
  apiURL = GlobalConstants.apiURL.concat('/assessments');
  apiURLCre = GlobalConstants.apiURL.concat('/assessments');
  publicKey = GlobalConstants.publicKey;
  privateKey = GlobalConstants.privateKey;
  HTTPVerb = 'GET';
  HTTPVerbCre = 'POST';
  timestamp = Math.floor(new Date().getTime() / 1000);
  assessmentList: any;
  currentIndex = -1;
  title = '';
  assessmentId: string;
  scheduleDetailsMttl = {
    assessmentId: '',
  name: '',
  scheduleType: 'AlwaysOn',
  scheduleWindow: null,
  webProctoring: {
    enabled: false
  },
  visualProctoring: {
    mode: 'OFF',
    options: {
      candidateScreenCapture: false,
      candidateAuthorization: false
    }
  },
  access: {
    type: 'OpenForAll',
    candidates: null,
    sendEmail: false
  },
  ipAccessRestriction: {
    enabled: false
  },
  testGradeNotification: {
    enabled: true,
    recipients: []
  },
  sourceApp: 'Ojas-Java-Test',
  testStartNotificationUrl: 'http://mettlintegration-env.eba-ff247mbm.us-east-1.elasticbeanstalk.com/mettl-api-intg/testStartNotificationUrl',
  testFinishNotificationUrl: 'http://mettlintegration-env.eba-ff247mbm.us-east-1.elasticbeanstalk.com/mettl-api-intg/testFinishNotificationUrl',
  testGradedNotificationUrl: 'http://mettlintegration-env.eba-ff247mbm.us-east-1.elasticbeanstalk.com/mettl-api-intg/testGradedNotificationUrl',
  testResumeEnabledForExpiredTestURL: 'http://mettlintegration-env.eba-ff247mbm.us-east-1.elasticbeanstalk.com/mettl-api-intg/testResumeEnabledForExpiredTestURL'
  };
  recipientsList: string;
  // assessmentList: [];
  submitted = false;

  createdSchedule: object;
  constructor(private mettlApiService: MettlApiService) { }

  ngOnInit(): void {
    const parameters = this.makeSignature();
    // const parametersCre = this.makeSignatureCre();
    this.getAllAssessments(parameters);
  }
  createSchedule(): void {
    const parametersCre = this.makeSignatureCre();
    const headers = new HttpHeaders()
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*');
    this.scheduleDetailsMttl.testGradeNotification.recipients = this.recipientsList.split(',');
    console.log('createSchedule reuqest data' + JSON.stringify(this.scheduleDetailsMttl));
    this.mettlApiService.createSchedule(this.scheduleDetailsMttl, parametersCre, headers)
        .subscribe(
            response => {
              if (response.status === 'SUCCESS') {
                this.createdSchedule = response.createdSchedule;
              }
              console.log(response);
              this.submitted = true;
            },
            error => {
              console.log(error);
            });
  }
  private makeSignature(): string {
    const concatenatedString = this.HTTPVerb + this.apiURL + '\n' + this.publicKey + '\n' + this.timestamp;
    console.log('concatinatedString:' + concatenatedString);
    const encrypted = CryptoJS.HmacSHA1(concatenatedString, this.privateKey);
    const asgn = CryptoJS.enc.Base64.stringify(encrypted);
    return 'ak=' + this.publicKey + '&asgn=' + asgn + '&ts=' + this.timestamp;
  }
  private makeSignatureCre(): string {
    const concatenatedString = this.HTTPVerbCre + this.apiURLCre + '\n' + this.publicKey + '\n' + this.timestamp;
    console.log('concatinatedString:' + concatenatedString);
    const encrypted = CryptoJS.HmacSHA1(concatenatedString, this.privateKey);
    const asgn = CryptoJS.enc.Base64.stringify(encrypted);
    return 'ak=' + this.publicKey + '&asgn=' + asgn + '&ts=' + this.timestamp;
  }
  getAllAssessments(parameters: string): void {
    this.mettlApiService.getAllAssessments(parameters)
        .subscribe(
            data => {
              this.assessmentList = data.assessments;
              console.log(data);
            },
            error => {
              console.log(error);
            });
  }
}
