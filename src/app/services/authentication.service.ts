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
	public static LOGIN_OK=1;
	public static LOGIN_NOT_ACTIVE=2;
	public static LOGIN_FAILED=3;
	
    constructor(private http: Http,public authHttp: AuthHttp) {
        // set token if saved in local storage
        var token = localStorage.getItem('token');
        this.token = token;
    }

    login(email: string, password: string): Observable<any> {
		
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
					console.log(user);
                    // return true to indicate successful login
                    return AuthenticationService.LOGIN_OK; 
                } else if(user){
					console.log('Debe activar el usuario');
					this.resetLocalStorage();
                    return AuthenticationService.LOGIN_NOT_ACTIVE; 
				}
				else{
					console.log('Credenciales invalidas');
					this.resetLocalStorage();
                    return AuthenticationService.LOGIN_FAILED;
                }
            });
    }

	resetLocalStorage(){
		this.token = null;
		localStorage.removeItem('token');
		localStorage.removeItem('user');	
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