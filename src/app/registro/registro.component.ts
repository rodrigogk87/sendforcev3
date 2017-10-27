import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {User} from '../models/user';
import {UserService} from '../services/user.service';

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
   
  constructor(private userService: UserService,private _router: Router) { 
	 this.user = new User('', '', ''); 
  }

  ngOnInit() {
  }
  
  onSubmit() {
		this.errors=[];
		this.arrayOfKeys=[];
		this.isloading=true;
        this.userService.addUser(this.user).subscribe(
            response => {
				this.isloading=false;
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
