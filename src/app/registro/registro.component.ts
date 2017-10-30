import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import { FormErrorsService } from '../services/form-errors.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class registroComponent implements OnInit {

  public user: User;
  public errors: Array<any>;
  public arrayOfKeys: Array<any>=[];
  public isloading:boolean=false;
  public registroexitoso:boolean=false;
   
  constructor(private userService: UserService,private _router: Router, private formErrorsService: FormErrorsService) { 
	 this.user = new User('', '', ''); 
  }

  ngOnInit() {
  }
  
  //Hay que ver como hacemos para que esto lo extienda o lo implemente de alguna clase generica
  private static readonly getTraslatedFormName = {
	  'name':'Nombre',
	  'email':'Email',
	  'password':'Password',
  }
  
  onSubmit(formRegisterUser) {
		this.errors=[];
		this.arrayOfKeys=[];
		
		/* Validacion Angular */
		Object.keys(formRegisterUser.controls).forEach( (control_name) => {
			 if(formRegisterUser.controls[control_name].errors!=null){
				Object.keys(formRegisterUser.controls[control_name].errors).forEach( (control_error) => {
					let errormessage = this.formErrorsService.errorMessages[control_error]( 
																				registroComponent.getTraslatedFormName[control_name],
																				formRegisterUser.controls[control_name].errors
																				);
					this.errors.push(errormessage);
					this.arrayOfKeys.push(control_name);
				});
			 }
		});
		
		/* Si formulario valida hace llamada ajax */
		if(formRegisterUser.valid){
			this.isloading=true;
			this.userService.addUser(this.user).subscribe(
				response => {
					this.isloading=false;
					//Validacion Laravel
					if(response.error){
							for (let key in response.error) {
								this.errors.push(response.error[key][0]);
								this.arrayOfKeys.push(key);
							}
					}
					else
					this.registroexitoso=true;
				},
				error => {
					this.isloading=false;
				}
			);
		}
    }

}
