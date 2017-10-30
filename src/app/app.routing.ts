import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { loginComponent } from './login/login.component';
import { registroComponent } from './registro/registro.component';
import { passwordresetComponent } from './passwordreset/passwordreset.component';
import { confirmationComponent } from './confirmation/confirmation.component';

const appRoutes: Routes = [
	{ path: 'login', component: loginComponent},
	{ path: 'register', component: registroComponent},
	{ path: 'reset-password', component: passwordresetComponent},
	{ path: 'confirmation', component: confirmationComponent},
    { path: '**', redirectTo: 'login' }
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);