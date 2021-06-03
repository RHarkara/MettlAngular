import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from '../../global-constants';
import {MettlApiService} from '../../services/mettl.api.service';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-allassessments',
  templateUrl: './allassessments.component.html',
  styleUrls: ['./allassessments.component.css']
})
export class AllassessmentsComponent implements OnInit {
  apiURL = GlobalConstants.apiURL.concat('/assessments');
  publicKey = GlobalConstants.publicKey;
  privateKey = GlobalConstants.privateKey;
  HTTPVerb = 'GET';
  timestamp = Math.floor(new Date().getTime() / 1000);
  assessmentList: any;
  currentIndex = -1;
  title = '';
  constructor(
      private mettlApiService: MettlApiService
  ) { }

  ngOnInit(): void {
    const parameters = this.makeSignature();
    this.getAllAssessments(parameters);
  }
  private makeSignature(): string {
    const concatenatedString = this.HTTPVerb + this.apiURL + '\n' + this.publicKey + '\n' + this.timestamp;
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
