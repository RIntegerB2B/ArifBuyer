import { CardDetailModel } from './../card-details/cardDetails.model';
import { AddressModel } from './../address/address.model';
import { ProfileModel } from './../profile/profile.model';
export class RegModel {
    emailId: string;
    mobileNumber: number;
    password: string;
    addressDetail: AddressModel;
    cardDetail: CardDetailModel;
    ProfileModel: ProfileModel;
}
