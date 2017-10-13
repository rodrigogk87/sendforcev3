import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public user: User;
  public errors: Array<any>;
   
  constructor(private userService: UserService,private _router: Router) { 
	 this.user = new User('', '', ''); 
  }

  ngOnInit() {
  }
  
  onSubmit() {
        console.log(this.user);
		this.errors=[];
        this.userService.addUser(this.user).subscribe(
            response => {
				console.log(response);
				if(response.error){
						//console.log(response.error);
						for (let key in response.error) {
							//console.log(response.error[key][0]);
							this.errors.push(response.error[key][0]);
						}
				}
				else
				this._router.navigate(['/registroexitoso']);
                //console.log(response);
            },
            error => {
                console.log(<any> error);
            }
        );
    }

}
