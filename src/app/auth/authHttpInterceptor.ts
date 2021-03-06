import {RequestOptions, Response, Request, RequestOptionsArgs, Headers, Http} from "@angular/http";
import {Observable} from "rxjs";
import {AuthHttp, AuthConfig} from "angular2-jwt";
import { AuthenticationService } from '../services/authentication.service';
import {Router, ActivatedRoute, Params} from "@angular/router";

export class AuthHttpInterceptor extends AuthHttp {
	

  constructor(http: Http, defaultOptions: RequestOptions,private authService: AuthenticationService,private router: Router) {
    super(new AuthConfig({
	  noClientCheck: true,
      tokenName: 'token',
      tokenGetter: (() => localStorage.getItem('token')),
      globalHeaders: [{'Content-Type': 'application/json'}],
    }), http, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, options));
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');
    return options;
  }

  private isUnauthorized(status: number): boolean {
    return status === 0 || status === 401 || status === 403;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
	
    return observable.catch((err, source) => {
		
      if (this.isUnauthorized(err.status)) {
        //logout the user or do what you want
        this.authService.resetLocalStorage();
		this.router.navigate(['login']);
      } else {
        return Observable.throw(err);
      }
    });

  }
}