import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

import { URLSearchParams } from '@angular/http';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact';
import { BaseHttpService } from '../../services/base-http';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ContactInfoCmp } from '../contact-info/contact-info';
import { ContactCmp } from '../contact/contact';
import { LoginCmp } from '../login/login';


@Component({
    templateUrl: 'build/pages/contact-list/contact-list.html',
    providers: [ContactService, BaseHttpService],
    directives: []
})


export class ContactListCmp {
    public contacts: Contact[] = [];
    shadowImage: string = 'https://image.freepik.com/free-icon/male-user-shadow_318-34042.png';

    constructor(private contactService: ContactService, private nav: NavController, navParams: NavParams, private viewCtrl: ViewController) {
        this.getList();
    }

    ionViewWillEnter() {
        console.log('entered')
        this.viewCtrl.showBackButton(false);
    }

    getList() {
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        params.set('order', 'last_name+ASC');
        self.contactService.query(params)
            .subscribe((contacts: Contact[]) => {
                self.contacts = contacts
            });
    }

    show(event, contactId) {
        this.nav.push(ContactCmp, { id: contactId, animate: false });
    }
    createContact(event) {
        this.nav.push(ContactCmp, { animate: false });
    }
    logout() {
        localStorage.setItem('session_token', '');
        this.nav.push(LoginCmp);
    }
    remove(contactId) {
        var self = this;
        this.contactService.remove(contactId)
            .subscribe(() => {
                self.contacts = self.contacts.filter((item) => {
                    return item.id != contactId
                });
            });
    }
}
