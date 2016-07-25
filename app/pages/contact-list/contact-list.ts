import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
//import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {URLSearchParams} from '@angular/http';
import {Contact} from '../../models/contact';
import {ContactService} from '../../services/contact';
import {BaseHttpService} from '../../services/base-http';
import {NavController, NavParams} from 'ionic-angular';
import {ContactInfoCmp} from '../contact-info/contact-info';


@Component({
  selector: 'contact-list',
  templateUrl: 'build/pages/contact-list/contact-list.html',
  //styleUrls: ['./pages/contact-list/contact-list.css'],
  providers: [ContactService, BaseHttpService],
  directives: []
})


export class ContactListCmp {
	public contacts: Contact[] = [];
	shadowImage: string = 'https://image.freepik.com/free-icon/male-user-shadow_318-34042.png';

	constructor (private contactService: ContactService, private nav: NavController, navParams: NavParams) {
		//this.nav = nav;
		this.getList();
	}

	getList () {
		let self = this;
		let params: URLSearchParams = new URLSearchParams();
		params.set('order', 'last_name+ASC');
		console.log('service', this.contactService)
		self.contactService.query(params)
			.subscribe((contacts: Contact[]) => {
				self.contacts = contacts
			});
	}

	show (event, contactId) {
		this.nav.push(ContactInfoCmp, { id: contactId, animate: false });
		//this.nav.setRoot(ContactInfoCmp);
	}

	remove (contactId) {
		var self = this;
		this.contactService.remove(contactId)
			.subscribe(() => {
				self.contacts = self.contacts.filter((item) => {
					return item.id != contactId
				});
			});
	}
}

