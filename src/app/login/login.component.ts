import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import { FormErrorsService } from '../services/form-errors.service';
import { AuthenticationService } from '../services/authentication.service';
import { FormInterface } from '../interfaces/FormInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit,FormInterface {
  public user: User;
  public errors = new Map();
  public isloading:boolean=false;
  public getTraslatedFormName = {
	  'name':'Nombre',
	  'email':'Email',
	  'password':'Password',
  }  
  
  constructor(private userService: UserService,
			  private router: Router, 
			  private formErrorsService: FormErrorsService,
			  private authenticationService: AuthenticationService) 
  { 
 	this.user = new User('', '', ''); 
  }

  ngOnInit() {
  }

  onSubmit(formLogInUser) {
		this.errors= new Map();
		
		/* Validacion Angular */
		Object.keys(formLogInUser.controls).forEach( (control_name) => {
			 if(formLogInUser.controls[control_name].errors!=null){
				Object.keys(formLogInUser.controls[control_name].errors).forEach( (control_error) => {
					let errormessage = this.formErrorsService.errorMessages[control_error]( 
																				this.getTraslatedFormName[control_name],
																				formLogInUser.controls[control_name].errors
																				);
					if(!this.errors.has(control_name))
					this.errors.set(control_name,errormessage);
				});
			 }
		});
		
		/* Si formulario valida hace llamada ajax */
		if(formLogInUser.valid){
			//console.log(this.user);
			this.isloading=true;
			this.authenticationService.login(this.user.email, this.user.password)
            .subscribe(result => {
				console.log(result);
					this.isloading=false;
					if (result === true) {
						console.log('LoggedIn');
						this.router.navigate(['home']);
					} else {
						console.log('Not logued in - failed');
					}
				},
				err => {
					this.isloading=false;
					console.log(JSON.parse(err.text()).error);
				}
			);
		}
    }
}
