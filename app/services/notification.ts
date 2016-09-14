import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Alert, NavController } from 'ionic-angular';


@Injectable()
export class NotificationService {
    constructor(@Inject(DOCUMENT) private document, public nav: NavController) {}

    show(type, content) {
        let alert = Alert.create({
            title: type,
            subTitle: content,
            buttons: [{
                text: 'Ok',
                handler: () => {                    
                    let navTransition = alert.dismiss();
                    //if(!flag){return false;}
                    // navTransition.then(() => {
                    //     this.nav.pop();
                    // });
                    return false;
                }
            }]
        });
        this.nav.present(alert);
    }
}
