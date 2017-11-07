import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Router, ActivatedRoute, Params} from "@angular/router";
import { Observable } from 'rxjs';
import {TimerObservable} from "rxjs/observable/TimerObservable";
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
	
    constructor(private http: Http,public authHttp: AuthHttp,private router: Router) {
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
					console.log(response);
                    //hay que ver como hacer si refresca cualquier pagina ya que ya no funciona el timeout
					this.checkRefreshToken();
					console.log('Debe activar el usuario');
                    return AuthenticationService.LOGIN_OK; 
                } else if(user){
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

	checkRefreshToken(){
		 let timer = TimerObservable.create(30000, 30000);
		 timer.subscribe(t => {
			console.log('tick');
			this.refreshToken().subscribe(
						result => { 
							if(!result)
							this.router.navigate(['login']);},
						err => {
							this.resetLocalStorage();
							this.router.navigate(['login']);
						}
					);
		});
	}
	
	refreshToken(): Observable<any>{
		return this.authHttp.get(GLOBAL.apiurl+'/refresh-token',"").map(
				(response) => {
						let token = response.json() && response.json().token;
						if (token){
							console.log('refresh token');
							localStorage.setItem('token', token);
							return true;
						}
						else{
							console.log('no token');
							this.resetLocalStorage();
							return false;
						}
					}
		);
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
	
	resetLocalStorage(){
		this.token = null;
		localStorage.removeItem('token');
		localStorage.removeItem('user');	
	}
		
	loggedIn() {
	  return tokenNotExpired();
	}
	
}