import { Component, OnInit } from '@angular/core';
import {TutorialService} from "../../services/tutorial.service";

@Component({
  selector: 'app-candidate-test-status',
  templateUrl: './candidate-test-status.component.html',
  styleUrls: ['./candidate-test-status.component.css']
})
export class CandidateTestStatusComponent implements OnInit {

  accessKey: string;
  email: string;

  submitted = false;
  scheduleList=[];

  testStatusResponse:any = {};
  testStatusResponseList:any =[];

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.getScheduledAssessments();
  }


  getScheduledAssessments(): void {
    const offset =1;
    const limit =10;
    this.tutorialService.getSchedules(offset, limit)
        .subscribe(
            data => {
              this.scheduleList = data.schedules;
              console.log(this.scheduleList);
            },
            error => {
              console.log(error.message);
            });
  }


  getTestStatus(): void {
    this.tutorialService.getTestStatus(this.accessKey, this.email)
        .subscribe(
            response => {
              if (response.status === 'SUCCESS') {
                if(response.hasOwnProperty('candidate')) {
                  this.testStatusResponse = response.candidate;
                  this.testStatusResponseList.push(this.testStatusResponse);
                }else if(response.hasOwnProperty('candidateDetails')) {
                  this.testStatusResponseList = response.candidateDetails;
                }
              }
              console.log(response);
              this.submitted = true;
            },
            error => {
              console.log(error);
            });

  }
}
