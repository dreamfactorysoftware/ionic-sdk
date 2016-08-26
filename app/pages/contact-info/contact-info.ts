import { Component } from '@angular/core';
//import {RouteParams, Router} from '@angular/router';
import { FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup } from '@angular/common';

import { ContactGroup } from '../../models/contact-group';
import { Group } from '../../models/group';
import { ContactInfo } from '../../models/contact-info';
import { ContactInfoService } from '../../services/contact-info';
import { BaseHttpService } from '../../services/base-http';
import * as constants from '../../config/constants';
import { NotificationService } from '../../services/notification';
import { ContactGroupService } from '../../services/contact-group';
import { GroupService } from '../../services/group';
import { ContactService } from '../../services/contact';
import { ValidationService } from '../../services/validation';
import {ContactCmp} from '../contact/contact';


import { NavController, NavParams } from 'ionic-angular';

@Component({
    //selector: 'contact-info',
    templateUrl: './build/pages/contact-info/contact-info.html',
    //styleUrls: ['./build/pages/contact-info/contact-info.css'],
    providers: [ContactService, BaseHttpService, ContactGroupService, ContactInfoService, GroupService, NotificationService],
    directives: [FORM_DIRECTIVES]
})

export class ContactInfoCmp {

    form: ControlGroup;

    id = new Control('');
    address = new Control('', Validators.compose([Validators.minLength(2),Validators.maxLength(50), Validators.required]));
    infoType = new Control('', Validators.required);
    city = new Control('', Validators.compose([Validators.minLength(2),Validators.maxLength(50), Validators.required]));
    state = new Control('', Validators.compose([Validators.minLength(2),Validators.maxLength(20), Validators.required]));
    country = new Control('', Validators.compose([Validators.minLength(2),Validators.maxLength(20), Validators.required]));
    email = new Control('', Validators.compose([Validators.maxLength(50), ValidationService.emailValidator, Validators.required]));
    phone = new Control('', Validators.compose([Validators.maxLength(50),Validators.minLength(10), ValidationService.phoneNumberValidator, Validators.required]));
    zip = new Control('', Validators.compose([Validators.maxLength(50),Validators.minLength(5), ValidationService.zipCodeValidator, Validators.required]));

    infoTypes = ['home', 'work', 'mobile'];

    contactInfo: ContactInfo = new ContactInfo();
    contactGroups: Array < ContactGroup > = [];
    remainingGroups: Array < Group > = [];
    selectedGroupId: number = null;

    constructor(private nav: NavController, navParams: NavParams, private formBuilder: FormBuilder, private contactInfoService: ContactInfoService, private httpService: BaseHttpService, private notificationService: NotificationService, private contactService: ContactService, private groupService: GroupService, private contactGroupService: ContactGroupService) {

        var id: string = navParams.get('id');
        this.contactInfo.contactId = navParams.get('contactId');
        if (id) {
            let self = this;
            contactInfoService
                .get(id)
                .subscribe((contactInfo) => self.contactInfo = contactInfo);
        } else {
            console.log('else', navParams);
        }

        this.form = this.formBuilder.group({
            address: this.address,
            infoType: this.infoType,
            city: this.city,
            state: this.state,
            country: this.country,
            email: this.email,
            phone: this.phone,
            zip: this.zip
        });
    };
    save() {
        if (this.form.valid) {
            var self = this;
            if (this.contactInfo.id) {
                this.httpService.http.patch(constants.DSP_INSTANCE_URL + '/api/v2/db/_table/contact_info', this.contactInfo.toJson(true))
                    .subscribe((data) => {
                        this.nav.push(ContactCmp, {id: this.contactInfo.contactId, animate: false });
                    });
            } else {
                delete this.contactInfo.id;
                this.httpService.http.post(constants.DSP_INSTANCE_URL + '/api/v2/db/_table/contact_info/', this.contactInfo.toJson(true))
                    .subscribe((data) => {
                        this.nav.push(ContactCmp, {id: this.contactInfo.contactId, animate: false });                        
                    });
            }
        }

    };

    back() {
        this.nav.pop();
    };
}
