import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NgClass } from '@angular/common';
import { URLSearchParams } from '@angular/http';

import { ContactInfo } from '../../models/contact-info';
import { BaseHttpService } from '../../services/base-http';
import { ContactInfoService } from '../../services/contact-info';
import { ContactService } from '../../services/contact';
import { ContactInfoCmp } from '../contact-info/contact-info';
import { NavController, NavParams } from 'ionic-angular';


@Component({
    selector: 'contact-info-list',
    templateUrl: './build/pages/contact-info/contact-info-list.html',
    //styleUrls: ['./build/pages/contact-info/contact-info.css'],
    providers: [ContactInfoService, BaseHttpService,ContactService],
    directives: [NgClass]
})

export class ContactInfoListCmp {
    public contactInfo: ContactInfo[] = [];
    public contactInfoFields: any[] = [
        { label: 'Type', key: 'infoType', mobileShow: true },
        { label: 'Phone', key: 'phone' }       
    ];
    params: URLSearchParams = new URLSearchParams();

    constructor(private nav: NavController, navParams: NavParams, private contactService: ContactService,private contactInfoService: ContactInfoService) {
        this.params.set('filter', 'contact_id=' + navParams.get('id'));
        this.getList();
    };

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
        this.nav.push(ContactInfoCmp, { animate: false });
    }

    remove(id) {
        let self = this;
        this.contactInfoService.remove(id)
            .subscribe((id: any) => {
                self.contactInfo = self.contactInfo.filter((item) => item.id !== id);
            });
    };
}
