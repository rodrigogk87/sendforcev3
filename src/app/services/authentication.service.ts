import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';
import { GLOBAL } from '../globals/global'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http,public authHttp: AuthHttp) {
        // set token if saved in local storage
        var token = localStorage.getItem('token');
        this.token = token;
    }

    login(email: string, password: string): Observable<boolean> {
		
        return this.http.post(GLOBAL.apiurl+'/authenticate', JSON.stringify({ email: email, password: password }))
            .map(
				(response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
				let user =  response.json() && response.json().userdata;
                if (token && user) {
                    // set token property
                    this.token = token;
                    // store  jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', token);
					localStorage.setItem('user', JSON.stringify(user));
                    // return true to indicate successful login
                    return true; 
                } else {
                    // return false to indicate failed login
					this.token = null;
					localStorage.removeItem('token');
					localStorage.removeItem('user');
                    return false;
                }
            });
    }

		
	loggedIn() {
	  return tokenNotExpired();
	}
	
    logout(): Observable<any> {
        // clear token remove user from local storage to log user out
		return this.authHttp.get(GLOBAL.apiurl+'/logout').map(
				(response) => {
							this.token = null;
							localStorage.removeItem('token');
							localStorage.removeItem('user');
							return response.json().success;
						}
			);
    }
}