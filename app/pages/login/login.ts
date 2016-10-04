import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup } from '@angular/common';
import { URLSearchParams,Headers,RequestOptions } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

import { BaseHttpService } from '../../services/base-http';
import * as constants from '../../config/constants';
import { NotificationService } from '../../services/notification';
import { ContactListCmp } from '../contact-list/contact-list';
import { RegisterCmp } from '../register/register';
import { ValidationService } from '../../services/validation';

@Component({
    // selector: 'df-login',
    templateUrl: 'build/pages/login/login.html',
    //styleUrls: ['./components/login/login.css'],
    directives: [FORM_DIRECTIVES],
    providers: [BaseHttpService, NotificationService]
})

export class LoginCmp {

    form: ControlGroup;
    email: Control = new Control('', Validators.compose([Validators.maxLength(50), ValidationService.emailValidator, Validators.required]));
    password: Control = new Control('', Validators.compose([Validators.minLength(6), Validators.maxLength(50), Validators.required]));

    constructor(formBuilder: FormBuilder, private httpService: BaseHttpService, private nav: NavController, navParams: NavParams, private notificationService: NotificationService) {
        this.form = formBuilder.group({
            email: this.email,
            password: this.password
        });
    }

    private storeToken(data) {
        //this.httpService.http._defaultOptions.headers.set('X-Dreamfactory-Session-Token', data && data.session_token);
        localStorage.setItem('session_token', data.session_token);
        //this._router.navigate(['ContactList']);
        this.nav.setRoot(ContactListCmp,{}, { animate: true, direction: 'forward' });
    }

    formSubmit() {
        if (this.form.valid) {
            var queryHeaders = new Headers();
                queryHeaders.append('Content-Type', 'application/json');
                let options = new RequestOptions({ headers: queryHeaders });
            this.httpService.http.post(constants.DSP_INSTANCE_URL + '/api/v2/user/session', JSON.stringify(this.form.value),options)
                .subscribe((data) => {
                    this.storeToken(data.json());
                }, (error) => {
                    this.notificationService.show('error', 'Cannot login, try again!');
                });
        }
    }

    register() {
        this.nav.push(RegisterCmp);
    }
}
