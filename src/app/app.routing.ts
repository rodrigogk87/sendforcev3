import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './services/auth-guard.service';
import { LoggedInGuard } from './services/loggued-in-guard.service';
import { loginComponent } from './login/login.component';
import { registroComponent } from './registro/registro.component';
import { passwordresetComponent } from './passwordreset/passwordreset.component';
import { confirmationComponent } from './confirmation/confirmation.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
	{ path: 'login', component: loginComponent, canActivate: [LoggedInGuard]},
	{ path: 'register', component: registroComponent, canActivate: [LoggedInGuard]},
	{ path: 'reset-password', component: passwordresetComponent, canActivate: [LoggedInGuard]},
	{ path: 'confirmation', component: confirmationComponent, canActivate: [LoggedInGuard]},
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'login' }
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);