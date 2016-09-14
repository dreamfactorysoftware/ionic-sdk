import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup } from '@angular/common';
import { URLSearchParams } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

import { BaseHttpService } from '../../services/base-http';
import * as constants from '../../config/constants';
import { NotificationService } from '../../services/notification';
import { ContactListCmp } from '../contact-list/contact-list';
import { ValidationService } from '../../services/validation';

@Component({
    //selector: 'df-register',
    templateUrl: 'build/pages/register/register.html',
    //styleUrls: ['./components/register/register.css'],
    providers: [BaseHttpService, NotificationService],
    directives: []
})

export class RegisterCmp {
    form: ControlGroup;

    constructor(private httpService: BaseHttpService, private formBuilder: FormBuilder, private nav: NavController, navParams: NavParams, private notificationService: NotificationService) {
        this.form = formBuilder.group({
            first_name: new Control('', Validators.compose([Validators.minLength(3), Validators.maxLength(50), Validators.required])),
            last_name: new Control(''),
            email: new Control('', Validators.compose([Validators.maxLength(50), ValidationService.emailValidator, Validators.required])),
            password: new Control('', Validators.compose([Validators.minLength(8), Validators.maxLength(50), Validators.required]))

        });
    }

    private storeToken(data) {
        //this.httpService.http._defaultOptions.headers.set('X-Dreamfactory-Session-Token', data && data.session_token);
        localStorage.setItem('session_token', data.session_token);
        this.nav.push(ContactListCmp);
    }

    register() {
        if (this.form.valid) {
            this.httpService.http
                .post(constants.DSP_INSTANCE_URL + '/api/v2/user/register?login=true', JSON.stringify(this.form.value))
                .subscribe((response) => {
                    this.storeToken(response.json());
                }, (error) => {
                    this.notificationService.show('error', 'Cannot register new user, try again!');
                });
        }
    }
    back() {
        this.nav.pop();
    };
}
