import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class confirmationComponent implements OnInit {

  public RESPONSE_HASH_NOT_PROVIDED=1;
  public RESPONSE_HASH_DOESNOT_EXIST=2;
  public RESPONSE_EMAIL_ALREADY_CONFIRMED=3;
  public RESPONSE_EMAIL_CONFIRMED=4;
  
  public confirmation_token: string;
  public confirmation_response=null;
  
  constructor( private route: ActivatedRoute,private userService: UserService) { }

  ngOnInit() {
	   this.route.queryParams.subscribe(params => {
		   if (params.confirmation_token != null) {
			    this.confirmation_token=params.confirmation_token;
				this.userService.confirmEmail(this.confirmation_token).subscribe(
					response => {
						this.confirmation_response=response.code;
					},
					error => {
						this.confirmation_response=this.RESPONSE_HASH_NOT_PROVIDED;
					}
				);   
		   }
		});
	  /**/
  }

}
