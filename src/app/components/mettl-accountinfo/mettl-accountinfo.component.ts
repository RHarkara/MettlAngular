import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MettlApiService} from '../../services/mettl.api.service';
import {GlobalConstants} from '../../global-constants';
import CryptoJS from 'crypto-js';
import {MettlApiHelperService} from "../../services/mettl.api.helper.service";

@Component({
  selector: 'app-mettl-accountinfo',
  templateUrl: './mettl-accountinfo.component.html',
  styleUrls: ['./mettl-accountinfo.component.css']
})
export class MettlAccountinfoComponent implements OnInit {

  HTTPVerb = 'GET';
  currentTutorial = {
    firstName : '',
    lastName : '',
    email : '',
    accountType: ''
  };
  message = '';
  constructor(
      private mettlApiService: MettlApiService,
      private mettlApiHelperService: MettlApiHelperService,
      private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit(): void {
    this.getAccountInfo();
  }

  getAccountInfo(): void {
    const apiURL = GlobalConstants.apiURL.concat('/account');
    const parameters = this.mettlApiHelperService.getRequestParameters(this.HTTPVerb, apiURL, null);
    this.mettlApiService.getAccountInfo(parameters, apiURL)
        .subscribe(
            data => {
              console.log(data);
              if (data.status === 'SUCCESS') {
                this.currentTutorial = data.accountInfo;
              }
            },
            error => {
              console.log(error);
            });
  }

}
