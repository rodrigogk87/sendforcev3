import { routing, appRoutingProviders } from './app.routing';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { loginComponent } from './login/login.component';
import { registroComponent } from './registro/registro.component';
import { passwordresetComponent } from './passwordreset/passwordreset.component';
import { UserService } from './services/user.service';
import { FormErrorsService } from './services/form-errors.service';
import { confirmationComponent } from './confirmation/confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    loginComponent,
    registroComponent,
    passwordresetComponent,
    confirmationComponent
  ],
  imports: [
	routing,
    BrowserModule,
	HttpModule,
	FormsModule
  ],
  providers: [appRoutingProviders,UserService,FormErrorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
