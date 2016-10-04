import {Injectable} from'@angular/core';
import {Http, Headers, URLSearchParams,RequestOptions} from '@angular/http';
import {Contact} from '../models/contact';
import * as constants from '../config/constants';
import {BaseHttpService} from './base-http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

class ServerObj {
	constructor (public resource: any) {
	}
};

@Injectable()
export class ContactService {
	baseResourceUrl: string = constants.DSP_INSTANCE_URL + '/api/v2/db/_table/contact';
	constructor(private httpService: BaseHttpService) {

	};


	query (params?:URLSearchParams): Observable<Contact[]> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DSP_API_KEY);    	
		return this.httpService.http
			.get(this.baseResourceUrl, { search: params, headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let contacts: Array<Contact> = [];
				result.resource.forEach((contact) => {
					contacts.push(Contact.fromJson(contact));
				});
				return contacts;
			});
	};

	get (id: string, params?: URLSearchParams): Observable<Contact> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DSP_API_KEY);
		return this.httpService.http
			.get(this.baseResourceUrl + '/' + id, { search: params ,headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let contact: Contact = Contact.fromJson(result);
				return contact;
			});
	};

	remove (id: string) {
		return this.httpService.http
			.delete(this.baseResourceUrl + '/' + id)
			.map((response) => {
				var result: any = response.json();
				return result.id;
			});
	}

	save (contact: Contact) {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DSP_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });

		if (contact.id) {
			return this.httpService.http.patch(constants.DSP_INSTANCE_URL + '/api/v2/db/_table/contact', contact.toJson(true),options)
			.map((data) => {
				return data;
			});
		} else {
			delete contact.id;
			return this.httpService.http.post(constants.DSP_INSTANCE_URL + '/api/v2/db/_table/contact', contact.toJson(true),options)
			.map((data) => {
				return data;
			});
		}
	}
}
