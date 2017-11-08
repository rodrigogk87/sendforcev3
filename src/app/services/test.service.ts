import {Injectable} from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import	{Observable}	from	'rxjs/Rx';
import {GLOBAL} from '../globals/global';

@Injectable()
export class TestService {
    constructor(
        public authHttp: AuthHttp
    )
    {}

    test():Observable<any> {
        return this.authHttp.get(GLOBAL.apiurl + '/test', '')
            .map(res => res.json());
    }

}
