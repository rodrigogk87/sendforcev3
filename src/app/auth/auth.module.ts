import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {AuthHttpInterceptor} from "./authHttpInterceptor";
import { AuthenticationService } from '../services/authentication.service';
import {Router, ActivatedRoute, Params} from "@angular/router";

export function authHttpServiceFactory(http: Http, options: RequestOptions, authService: AuthenticationService,router: Router) {
  return new AuthHttpInterceptor(http, options,authService,router);
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, AuthenticationService, Router]
    }
  ]
})
export class AuthModule {}