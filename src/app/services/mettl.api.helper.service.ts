import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import {GlobalConstants} from "../global-constants";


@Injectable({
    providedIn: 'root'
})
export class MettlApiHelperService {

    constructor() { }

    publicKey = GlobalConstants.publicKey;
    privateKey = GlobalConstants.privateKey;

    public getRequestParameters(httpMethod, apiURL, apiQueryStringParameters: Map<string, string>): Map<string, string> {
        let paramsMap = new Map();
        paramsMap.set("ak", this.publicKey);
        paramsMap.set("ts", Math.floor(new Date().getTime() / 1000));

        if(apiQueryStringParameters != null) {
            apiQueryStringParameters.forEach((value: string, key: string) => {
                paramsMap.set(key, value);
            });
        }

        let concatenatedString = httpMethod.concat(apiURL);
        paramsMap.forEach((value: string, key: string) => {
            concatenatedString = concatenatedString.concat('\n').concat(value);
        });

        console.log('concatenatedString:' + concatenatedString);
        const signature = this.makeSignature(concatenatedString);
        paramsMap.set("asgn", signature);
        return paramsMap;
    }

    private makeSignature(concatenatedString): string {
        let encrypted = CryptoJS.HmacSHA1(concatenatedString, this.privateKey);
        return CryptoJS.enc.Base64.stringify(encrypted);
    }
}
