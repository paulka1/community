import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  invalidForm: boolean;
  pswdNoSimilaire: boolean;
  pswObligatoire: boolean;
  confirmPswObligatoire: boolean;
  usernameObligatoire: boolean;
  usernameDisponible: boolean;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  async submit() {

    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.form.form.invalid ||
      this.confirmPswObligatoire ||
      this.pswdNoSimilaire ||
      this.pswObligatoire ||
      this.usernameObligatoire) {
      this.invalidForm = true;
    } else {
      // TODO Enregistrer l'utilisateur via le UserService
      let response = await this.userService.register(this.model.username,this.model.password);
      console.log("response", response);
      this.goToLogin();
    }
  }

  goToLogin() {
    this.userService.register(this.model.username,this.model.password);
    this.router.navigate(["/splash/login"]);
  }

  focusOutInputUsername(e: any){
    this.usernameObligatoire = !this.model.username;
  }

  focusOutInputPassword(e: any){
    this.pswObligatoire = !this.model.password;
    this.pswdNoSimilaire = this.model.password != this.model.confirmPassword;
  }

  focusOutInputConfirmPwd(e: any){
    this.confirmPswObligatoire = !this.model.confirmPassword;
    this.pswdNoSimilaire = this.model.password != this.model.confirmPassword;
  }
}
