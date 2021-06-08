import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import {Candidate} from "../../app.module";

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  scheduleDetails = {
    assessmentId: '',
    name: '',
    recipients: [],
    sourceApp : 'Ojas-Java-Test',
    sendEmail: false,
    accessType: '',
    candidates: []
  };
  recipientsList: string;
  assessmentList: [];
  submitted = false;

  accessTypes = ["OpenForAll", "ByInvitation"];

  createdSchedule: object;

  constructor(private tutorialService: TutorialService) { }

    candidateArray: Array<Candidate> = [];
    candidate: any = {};


  ngOnInit(): void {
    this.candidate = {name: '', email: ''};
    console.log(this.candidateArray);
    this.tutorialService.getAllAssessments()
      .subscribe(
        data => {
          this.assessmentList = data.assessments;
          console.log(this.assessmentList);
        },
        error => {
          console.log(error.message);
        });
  }

  createSchedule(): void {
    this.scheduleDetails.candidates = this.candidateArray;
    this.scheduleDetails.recipients = this.recipientsList.split(',');
    console.log('createSchedule request data' + JSON.stringify(this.scheduleDetails));
    this.tutorialService.createSchedule(this.scheduleDetails)
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

    addRow(index) {
        this.candidateArray.push(this.candidate);
        console.log(this.candidateArray);
        this.candidate = {name: '', email: ''};
        return true;
    }

    deleteRow(index) {
        if(this.candidateArray.length ==1) {
            alert("At least one record should be present.")
            return false;
        } else {
            this.candidateArray.splice(index, 1);
            return true;
        }
    }

}
