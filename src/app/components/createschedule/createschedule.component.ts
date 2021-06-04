import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from '../../global-constants';
import {MettlApiService} from '../../services/mettl.api.service';
import {MettlApiHelperService} from "../../services/mettl.api.helper.service";

@Component({
  selector: 'app-createschedule',
  templateUrl: './createschedule.component.html',
  styleUrls: ['./createschedule.component.css']
})
export class CreatescheduleComponent implements OnInit {

  HTTPVerb = 'POST';
  title = '';
  assessmentId: string
  scheduleDetailsMttl = {
    name: "",
    imageProctoring: false,
    webProctoring: {
      enabled: false
    },
    scheduleType: "AlwaysOn",
    scheduleWindow: null,
    access: {
      type: "OpenForAll",
      candidates: null,
      sendEmail: false,
      sendReminders: null,
      candidateCrfPrefilled: false
    },
    ipAccessRestriction: {
      enabled: false
    },
    sourceApp: "Ojas-Java-Test",
    testStartNotificationUrl: "http://mettlintegration-env.eba-ff247mbm.us-east-1.elasticbeanstalk.com/mettl-api-intg/testStartNotificationUrl",
    testFinishNotificationUrl: "http://mettlintegration-env.eba-ff247mbm.us-east-1.elasticbeanstalk.com/mettl-api-intg/testFinishNotificationUrl",
    testGradedNotificationUrl: "http://mettlintegration-env.eba-ff247mbm.us-east-1.elasticbeanstalk.com/mettl-api-intg/testGradedNotificationUrl",
    testResumeEnabledForExpiredTestURL: "http://mettlintegration-env.eba-ff247mbm.us-east-1.elasticbeanstalk.com/mettl-api-intg/testResumeEnabledForExpiredTestURL",
    visualProctoring: null,
    gradeNotificationSettings: null,
    testGradeNotification: {
      enabled: true,
      recipients: []
    },
    allowTestResume: null,
    secureBrowser: null,
    candidateAuthProctored: false
  }

  recipientsList: string;
  submitted = false;
  assessmentList: any;

  createdSchedule: object;
  constructor(private mettlApiService: MettlApiService,
              private mettlApiHelperService: MettlApiHelperService) { }

  ngOnInit(): void {
    this.getAllAssessments();
  }
  createSchedule(): void {
    const apiURL = GlobalConstants.apiURL.concat('/assessments/').concat(this.assessmentId).concat('/schedules');
    let paramMap = new Map();
    this.scheduleDetailsMttl.testGradeNotification.recipients = this.recipientsList.split(',');
    paramMap.set("sc", JSON.stringify(this.scheduleDetailsMttl));
    const parameters = this.mettlApiHelperService.getRequestParameters(this.HTTPVerb, apiURL, paramMap);
    this.mettlApiService.createSchedule(parameters, apiURL)
        .subscribe(
            response => {
              console.log(response);
              if (response.status === 'SUCCESS') {
                this.createdSchedule = response.createdSchedule;
              }
              this.submitted = true;
            },
            error => {
              console.log(error);
            });
  }

  getAllAssessments(): void {
    let HTTPVerb = 'GET';
    const apiURL = GlobalConstants.apiURL.concat('/assessments');
    const parameters = this.mettlApiHelperService.getRequestParameters(HTTPVerb, apiURL, null);
    this.mettlApiService.getAllAssessments(parameters, apiURL)
        .subscribe(
            data => {
              this.assessmentList = data.assessments;
              console.log(this.assessmentList);
            },
            error => {
              console.log(error);
            });
  }
}
