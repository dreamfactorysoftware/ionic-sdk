import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptionsArgs, Response, Headers } from '@angular/http';

import * as constants from './constants';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class DfRequest {
    constructor(private http: Http) {}

    _request(url: string | Request, options ? : RequestOptionsArgs): Observable < Response > {
        let request: any;

        if (typeof url === 'string') {
            options = options || { headers: new Headers({ 'Content-Type': 'application/json' }) };
        } else {
            let req: Request = < Request > url;
            req.headers = req.headers || new Headers({ 'Content-Type': 'application/json' });
            req.headers.set('X-DreamFactory-API-Key', constants.DREAMFACTORY_API_KEY);
            req.headers.set('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));

            request = this.http.request(req);
        }

        return request;
    }
}
