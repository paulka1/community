import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthenticationService } from '../../services/authentication.service';

class LoginFormModel {
  username = "";
  password = "";
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  @ViewChild(NgForm, { static: false })
  ngForm: NgForm;

  model = new LoginFormModel();
  pswObligatoire: boolean;
  usernameObligatoire: boolean;
  invalidForm: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  goToRegistration() {
    this.router.navigate(["/splash/register"]);
  }

  submit() {
    /** Check si mot de passe et username sont renseignés avant login**/
    if(this.pswObligatoire || this.usernameObligatoire){
      this.invalidForm = true;
    } else {
      this.invalidForm = false;
      this.login();
    }
  }

  async login() {

    try {
      let response = await this.authService.authenticate(this.model.username, this.model.password);
      if(response.success){
        await this.router.navigate(["/"]);
      }
    } catch (e) {
      this.nzMessageService.error("Une erreur est survenue. Veuillez réessayer plus tard");
    }
  }

  /** test de validité des inputs du formulaire. Ne dois pas être null**/
  focusOutInputUsername(e: any){
    this.usernameObligatoire = !this.model.username;
  }

  focusOutInputPassword(e: any){
    this.pswObligatoire = !this.model.password;
  }
}
