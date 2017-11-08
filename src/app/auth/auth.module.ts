import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {AuthHttpInterceptor} from "./authHttpInterceptor";
import { AuthenticationService } from '../services/authentication.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions, authService: AuthenticationService) {
  return new AuthHttpInterceptor(http, options,authService);
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, AuthenticationService]
    }
  ]
})
export class AuthModule {}