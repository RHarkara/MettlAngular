import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MettlApiService} from '../../services/mettl.api.service';
import {GlobalConstants} from '../../global-constants';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-mettl-accountinfo',
  templateUrl: './mettl-accountinfo.component.html',
  styleUrls: ['./mettl-accountinfo.component.css']
})
export class MettlAccountinfoComponent implements OnInit {
  apiURL = GlobalConstants.apiURL.concat('/account');
  publicKey = GlobalConstants.publicKey;
  privateKey = GlobalConstants.privateKey;
  HTTPVerb = 'GET';
  timestamp = Math.floor(new Date().getTime() / 1000);
  currentTutorial = {
    firstName : '',
    lastName : '',
    email : '',
    accountType: ''
  };
  message = '';
  constructor(
      private mettlApiService: MettlApiService,
      private route: ActivatedRoute,
      private router: Router) { }
  ngOnInit(): void {
    this.message = '';
    const parameters = this.makeSignature();
    this.getAccountInfo(parameters);
  }

  private makeSignature(): string {
    const concatenatedString = this.HTTPVerb + this.apiURL + '\n' + this.publicKey + '\n' + this.timestamp;
    console.log('concatinatedString:' + concatenatedString);
    const encrypted = CryptoJS.HmacSHA1(concatenatedString, this.privateKey);
    const asgn = CryptoJS.enc.Base64.stringify(encrypted);
    return 'ak=' + this.publicKey + '&asgn=' + asgn + '&ts=' + this.timestamp;
  }

  getAccountInfo(parameters: string): void {
    this.mettlApiService.getAccountInfo(parameters)
        .subscribe(
            data => {
              this.currentTutorial = data.accountInfo;
              console.log(data);
            },
            error => {
              console.log(error);
            });
  }

}
