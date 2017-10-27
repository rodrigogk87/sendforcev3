import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import	{Observable}	from	'rxjs/Rx';
import {GLOBAL} from '../globals/global';
import {User} from '../models/user';

@Injectable()
export class UserService {
    constructor(
        public _http: Http
    )
    {}

    addUser(user: User):Observable<any> {
        return this._http.post(GLOBAL.apiurl + '/user', user)
            .map(res => res.json());
    }
	confirmEmail(token_email: string):Observable<any> {
        return this._http.post(GLOBAL.apiurl + '/email-confirmation',  {token_email: token_email})
            .map(res => res.json());
    }
}
