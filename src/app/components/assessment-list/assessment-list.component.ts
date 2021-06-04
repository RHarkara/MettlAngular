import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.css']
})
export class AssessmentListComponent implements OnInit {

  assessmentList: any;
  title = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.getAllAssessments();
  }

  getAllAssessments(): void {
    this.tutorialService.getAllAssessments()
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
