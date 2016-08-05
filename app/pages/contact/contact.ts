import { Component } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup, AbstractControl } from '@angular/common';

import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact';
import { BaseHttpService } from '../../services/base-http';
import * as constants from '../../config/constants';
import { NotificationService } from '../../services/notification';
import { NavController, NavParams } from 'ionic-angular';
import { ContactGroup } from '../../models/contact-group';
import { Group } from '../../models/group';
import { ContactInfo } from '../../models/contact-info';
import { ContactInfoService } from '../../services/contact-info';
import { ContactGroupService } from '../../services/contact-group';
import { GroupService } from '../../services/group';
import { ContactInfoListCmp } from '../contact-info/contact-info-list';
import {URLSearchParams} from '@angular/http';

@Component({
    selector: 'contact',
    templateUrl: './build/pages/contact/contact.html',
    providers: [ContactService, BaseHttpService, ContactInfoService, ContactGroupService, GroupService, NotificationService, FormBuilder],
    directives: [FORM_DIRECTIVES, ContactInfoListCmp]
})

export class ContactCmp {
    contactForm: ControlGroup;

    firstName: AbstractControl;
    lastName: AbstractControl;
    imageUrl: AbstractControl;
    skype: AbstractControl;
    twitter: AbstractControl;
    notes: AbstractControl;

    contact: Contact = new Contact();
    contactGroups: Array < ContactGroup > = [];
    remainingGroups: Array < Group > = [];
    selectedGroupId: number = null;

    constructor(private groupService: GroupService, private contactGroupService: ContactGroupService, private contactService: ContactService, private nav: NavController, navParams: NavParams, private contactInfoService: ContactInfoService, private formBuilder: FormBuilder, private httpService: BaseHttpService, private notificationService: NotificationService) {
        var contactId: string = navParams.get('id');

		if (contactId) {
			let self = this;
			var contactGroupParams = new URLSearchParams();
			contactGroupParams.set('filter', 'contact_id=' + contactId);

			contactService
				.get(contactId)
				.subscribe((contact) => self.contact = contact);

			contactGroupService
				.query(contactGroupParams, false, true)
				.subscribe((contactGroups) => {
					self.contactGroups = contactGroups;
					console.log(self.contactGroups,contactGroups)
					self.getRemainingGroups();
				});

		}
        this.contactForm = formBuilder.group({
            'firstName': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'lastName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'imageUrl': this.imageUrl,
            'skype': this.skype,
            'twitter': this.twitter,
            'notes': this.notes
        });
        this.firstName = this.contactForm.controls['firstName'];
        this.lastName = this.contactForm.controls['lastName'];
        this.imageUrl = this.contactForm.controls['imageUrl'];
        this.skype = this.contactForm.controls['skype'];
        this.twitter = this.contactForm.controls['twitter'];
        this.notes = this.contactForm.controls['notes'];


    };    
    getRemainingGroups() {
        var self = this;
        this.groupService
            .query()
            .subscribe((groups) => {
                self.remainingGroups = groups.filter((item) => {
                    return !self.contactGroups.some((a) => {
                        return a.group.id == item.id;
                    });
                });
            })
    }
    addSelectedGroup() {
        if (!this.selectedGroupId) return;

        var self = this;
        var group = this.remainingGroups.filter((item) => {
            return item.id == self.selectedGroupId;
        })[0];

        this.contactGroupService.addGroup(group.id, this.contact.id)
            .subscribe((response) => {
                var newContactGroup = new ContactGroup(response.id);
                newContactGroup.group = group;

                self.remainingGroups = self.remainingGroups.filter((item) => {
                    return item.id !== group.id;
                });

                self.contactGroups.push(newContactGroup);
                self.selectedGroupId = null;
            });
    };

    removeGroup(contactGroup: ContactGroup) {
        var self = this;
        this.contactGroupService
            .remove(contactGroup.id)
            .subscribe((item) => {
                self.contactGroups = self.contactGroups.filter((item) => {
                    return item.id !== contactGroup.id;
                });

                self.remainingGroups.push(contactGroup.group);
            });
    }
    createContact(event){
        this.nav.push(ContactCmp, { animate: false });
    }
    save() {
        if (this.contactForm.valid) {
            var self = this;
            delete this.contact.id;
            this.contactService.save(this.contact)
                .subscribe((response) => {
                    this.notificationService.show('Success', 'Contact Updated!');
                })
        }
    }

    back() {
        this.nav.pop();
    };

}
