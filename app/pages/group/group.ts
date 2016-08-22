import { Component } from '@angular/core';
//import {RouteParams, Router} from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup } from '@angular/common';

import { Group } from '../../models/group';
import { ContactGroup } from '../../models/contact-group';
import { Contact } from '../../models/contact';
import { GroupService } from '../../services/group';
import { ContactService } from '../../services/contact';
import { NotificationService } from '../../services/notification';
import { ContactGroupService } from '../../services/contact-group';
import { BaseHttpService } from '../../services/base-http';
import { NavController, NavParams } from 'ionic-angular';

import * as constants from '../../config/constants';



@Component({
    templateUrl: 'build/pages/group/group.html',
    //styleUrls: ['./components/group/group.css'],
    providers: [GroupService, ContactGroupService, ContactService, BaseHttpService, NotificationService],
    directives: [FORM_DIRECTIVES]
})

export class GroupCmp {
    form: ControlGroup;

    id = new Control('');
    name = new Control('', Validators.required);

    selectedContactId: number = null;

    group: Group = new Group();
    contactGroups: Array < ContactGroup > = [];
    remainingContacts: Array < Contact > = [];


    constructor(private notificationService: NotificationService, private groupService: GroupService, private contactService: ContactService, private contactGroupService: ContactGroupService, private formBuilder: FormBuilder, private nav: NavController, navParams: NavParams) {

        var groupId: string = navParams.get('id');

        if (groupId) {
            let self = this;
            var contactGroupParams = new URLSearchParams();
            contactGroupParams.set('filter', 'contact_group_id=' + groupId);

            groupService
                .get(groupId)
                .subscribe((group) => self.group = group);

            contactGroupService
                .query(contactGroupParams, true)
                .subscribe((contactGroups) => {
                    self.contactGroups = contactGroups;
                    self.getRemainingContacts();
                });
        }

        this.form = this.formBuilder.group({
            name: this.name
        });
    }

    back() {
        this.nav.pop();
    }

    getRemainingContacts() {
        var self = this;
        this.contactService
            .query()
            .subscribe((contacts) => {
                self.remainingContacts = contacts.filter((item) => {
                    return !self.contactGroups.some((a) => {
                        return a.group.id == item.id;
                    });
                });
            })
    }

    addSelectedContact() {
        if (!this.selectedContactId) return;
        var self = this;
        var contact = this.remainingContacts.filter((item) => {
            return item.id == self.selectedContactId;
        })[0];

        this.contactGroupService.addGroup(this.group.id, contact.id)
            .subscribe((response) => {
                var newContactGroup = new ContactGroup(response.id);
                newContactGroup.contact = contact;

                self.remainingContacts = self.remainingContacts.filter((item) => {
                    return item.id !== contact.id;
                });

                self.contactGroups.unshift(newContactGroup);
                self.selectedContactId = null;
            });
    }

    removeContact(id) {
        var self = this;
        this.contactGroupService
            .remove(id)
            .subscribe(() => {
                self.contactGroups = self.contactGroups.filter((item) => {
                    return item.id !== id;
                });
            });
    };

    save() {
        var self = this;
        this.groupService.save(this.group)
            .subscribe((response) => {
                this.notificationService.show('Success', ' Group Updated!');
            });
    }
}
