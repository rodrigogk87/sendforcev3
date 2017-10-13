import { routing, appRoutingProviders } from './app.routing';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import {UserService} from './services/user.service';
import { RegistroexitosoComponent } from './registroexitoso/registroexitoso.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PasswordresetComponent,
    RegistroexitosoComponent
  ],
  imports: [
	routing,
    BrowserModule,
	HttpModule,
	FormsModule
  ],
  providers: [appRoutingProviders,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
