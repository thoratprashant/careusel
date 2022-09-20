import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  error = "";
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
 
  onSubmit() {
    this.submitted = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      this.authService
        .login(this.f.username.value, this.f.password.value)
        .subscribe(
          (res) => {
            if (res) {
              const role = this.authService.currentUserValue.role;
              if (role === Role.All || role === Role.Admin) {
                this.router.navigate(["/admin/dashboard/main"]);
              } else if (role === Role.Doctor) {
                this.router.navigate(["/doctor/dashboard"]);
              } else if (role === Role.Patient) {
                this.router.navigate(["/patient/dashboard"]);
              } else {
                this.router.navigate(["/authentication/signin"]);
              }
            } else {
              this.error = "Invalid Login";
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
          }
        );
    }
  }
}
