import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-test-status',
  templateUrl: './candidate-test-status.component.html',
  styleUrls: ['./candidate-test-status.component.css']
})
export class CandidateTestStatusComponent implements OnInit {

  accessKey: string;
  email: string;

  scheduleList=[];

  constructor() { }

  ngOnInit(): void {
  }


  getTestStatus(): void {

  }

}
