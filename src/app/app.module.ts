import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { routing, appRoutingProviders } from './app.routing';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { loginComponent } from './login/login.component';
import { registroComponent } from './registro/registro.component';
import { passwordresetComponent } from './passwordreset/passwordreset.component';
import { UserService } from './services/user.service';
import { confirmationComponent } from './confirmation/confirmation.component';
import { FormErrorsService } from './services/form-errors.service';
import { AuthenticationService } from './services/authentication.service';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    loginComponent,
    registroComponent,
    passwordresetComponent,
    confirmationComponent,
    HomeComponent
  ],
  imports: [
	routing,
    BrowserModule,
	HttpModule,
	FormsModule,
	AuthModule
  ],
  providers: [appRoutingProviders,UserService,FormErrorsService,AuthenticationService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
