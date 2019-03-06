import { Injectable } from '@angular/core';
import { AppSetting } from '../config/appSetting';
import { ConfigType } from '../config/configType';
import { ConfigArifDubai } from "../config/configArifDubai";
import { ConfigArif } from "../config/configArif";

@Injectable({
    providedIn: 'root'
  })
  export class PublicService {
    clientName: string = AppSetting.clientName;
    configType: ConfigType;

    getConfigType(): ConfigType {
        switch (this.clientName) {
            case 'ArifDubai':
            this.configType = ConfigArifDubai;
                break;
            case 'Arif':
            this.configType = ConfigArif;
                break;
            default:
                break;
        }
        return this.configType;
      }
  }