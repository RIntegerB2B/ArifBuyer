import {addressFields} from './addressFields.model';
export class addressModel {
    name: string;
    mobileNumber: number;
    pincode: number;
    city: string;
    state: [string];
    address: [addressFields];
}
