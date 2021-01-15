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
    console.log("this.pswObligatoire", this.pswObligatoire)
    console.log("this.usernameObligatoire", this.usernameObligatoire)
    if(this.pswObligatoire || this.usernameObligatoire){
      this.invalidForm = true;
    } else {
      this.invalidForm = false;
      console.log("yes")
      this.login();
    }
  }

  async login() {

    try {
      // TODO vérifier le résultat de l'authentification. Rediriger sur "/" en cas de succès ou afficher une erreur en cas d'échec
      let response = await this.authService.authenticate(this.model.username, this.model.password);
      if(response.success){
        console.log("resp", response);
        await this.router.navigate(["/"]);
      }
    } catch (e) {
      this.nzMessageService.error("Une erreur est survenue. Veuillez réessayer plus tard");
    }
  }

  focusOutInputUsername(e: any){
    this.usernameObligatoire = !this.model.username;
  }

  focusOutInputPassword(e: any){
    this.pswObligatoire = !this.model.password;
  }
}
