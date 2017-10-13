import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroexitosoComponent } from './registroexitoso/registroexitoso.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';


const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent},
	{ path: 'registro', component: RegistroComponent},
	{ path: 'registroexitoso', component: RegistroexitosoComponent},
	{ path: 'resetpassword', component: PasswordresetComponent},
    { path: '**', redirectTo: 'login' }
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);