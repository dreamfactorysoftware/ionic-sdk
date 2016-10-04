import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NgClass } from '@angular/common';
import { URLSearchParams } from '@angular/http';

import { ContactInfo } from '../../models/contact-info';
import { BaseHttpService } from '../../services/base-http';
import { ContactInfoService } from '../../services/contact-info';
import { ContactService } from '../../services/contact';
import { NavController, NavParams } from 'ionic-angular';
import { ContactInfoCmp } from '../contact-info/contact-info';
import { LoginCmp } from '../login/login';


@Component({
    selector: 'contact-info-list',
    templateUrl: './build/pages/contact-info/contact-info-list.html',
    //styleUrls: ['./build/pages/contact-info/contact-info.css'],
    providers: [ContactInfoService, BaseHttpService,ContactService,ContactInfoService],
    directives: [NgClass]
})

export class ContactInfoListCmp {
    public contactInfo: ContactInfo[] = [];
    public contactInfoFields: any[] = [
        { label: 'Type', key: 'infoType', mobileShow: true },
        { label: 'Phone', key: 'phone' },
        { label: 'Email', key: 'email' }
    ];
    params: URLSearchParams = new URLSearchParams();

    constructor(private nav: NavController,private navParams: NavParams, private contactService: ContactService,private contactInfoService: ContactInfoService) {
        var token = localStorage.getItem('session_token');
        if (token =='') {
            this.logout(); 
        }
        this.params.set('filter', 'contact_id=' + navParams.get('id'));
        this.getList();
    };
    logout() {
        this.nav.setRoot(LoginCmp);
    }
    getList() {
        let self = this;
        this.contactInfoService.query(this.params)
            .subscribe((contactInfo: ContactInfo[]) => {
                self.contactInfo = contactInfo;
            });
    };

    edit(id, contactId) {        
        this.nav.push(ContactInfoCmp, { id: id, contactId: contactId, animate: false });
    };

    add() {
        this.nav.push(ContactInfoCmp, {contactId: this.navParams.get('id'), animate: false });
    }

    remove(id) {
        let self = this;
        this.contactInfoService.remove(id)
            .subscribe((id: any) => {
                self.contactInfo = self.contactInfo.filter((item) => item.id !== id);
            });
    };
}
