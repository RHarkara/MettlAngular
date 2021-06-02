import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

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
    sourceApp : 'Ojas-Java-Test'
  };
  recipientsList: string;
  assessmentList: [];
  submitted = false;

  createdSchedule: object;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
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
    this.scheduleDetails.recipients = this.recipientsList.split(',');
    console.log('createSchedule reuqest data' + JSON.stringify(this.scheduleDetails));
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

}
