import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import { FormErrorsService } from '../services/form-errors.service';
import { FormInterface } from '../interfaces/FormInterface';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class registroComponent implements OnInit,FormInterface {

  public user: User;
  public errors = new Map();
  public isloading:boolean=false;
  public registroexitoso:boolean=false;
  public getTraslatedFormName = {
	  'name':'Nombre',
	  'email':'Email',
	  'password':'Password',
  }   
  constructor(private userService: UserService,private _router: Router, private formErrorsService: FormErrorsService) { 
	 this.user = new User('', '', ''); 
  }

  ngOnInit() {
  }
  
  onSubmit(formRegisterUser) {
		this.errors= new Map();
		
		/* Validacion Angular */
		Object.keys(formRegisterUser.controls).forEach( (control_name) => {
			 if(formRegisterUser.controls[control_name].errors!=null){
				Object.keys(formRegisterUser.controls[control_name].errors).forEach( (control_error) => {
					let errormessage = this.formErrorsService.errorMessages[control_error]( 
																				this.getTraslatedFormName[control_name],
																				formRegisterUser.controls[control_name].errors
																				);
					if(!this.errors.has(control_name))
					this.errors.set(control_name,errormessage);
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
								this.errors.set(key,response.error[key][0]);
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
