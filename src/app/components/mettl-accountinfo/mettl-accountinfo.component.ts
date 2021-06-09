import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MettlApiService} from '../../services/mettl.api.service';
import {GlobalConstants} from '../../global-constants';
import CryptoJS from 'crypto-js';
import {MettlApiHelperService} from "../../services/mettl.api.helper.service";
import LocalBase from 'localbase';

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
              console.log(data,'HEllo');
              const responseData = data;
              //console.log(data.firstName,'Name');
              //if (data.status === 'SUCCESS') {
                this.currentTutorial = data;     
                console.log(this.currentTutorial,'data rec');
                console.log(this.currentTutorial['accountInfo'].firstName,'name');                
                this.currentTutorial['accountInfo']['TimeStamp']=new Date();              
                let db = new LocalBase('Mettl_Integration');
                db.collection('Account_Info').add(this.currentTutorial);          
            },
            error => {
              console.log(error);
            });
  }

}
