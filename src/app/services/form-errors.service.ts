import { Injectable } from '@angular/core';

@Injectable()
export class FormErrorsService {

  constructor() { }
  
	public readonly errorMessages = {
		'required':(control_name) => 'El campo '+control_name+' es obligatorio',
		'email':() => 'Escriba un Email correcto',
		'minlength': (control_name,control_error_object) => 'El minimo numero de caracteres para el campo '+ control_name +' es de ' + control_error_object.minlength.requiredLength,
		'maxlength': (control_name,control_error_object) => 'El maximo numero de caracteres para el campo '+ control_name +' es de ' + control_error_object.maxlength.requiredLength,
	}
}
