import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';  

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
 
}) 
 
export class SignupComponent implements OnInit {

  title = 'otp';
  form: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  // authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true; 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
  ) {
    this.form = this.toFormGroup(this.formInput);
  }
  
  toFormGroup(elements) {
    const group: any = {};

    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }
  keyUpEvent(event, index) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1 ;
    } else {
      pos = index + 1 ;
    }
    if (pos > -1 && pos < this.formInput.length ) {
      this.rows._results[pos].nativeElement.focus();
    } 
  }
  onSubmit() {
    console.log(this.form.value);
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    }); 
  } 

  // onSubmit() {
  //   this.submitted = true; 
  //   if (this.authForm.invalid) {
  //     return;
  //   } else {
  //     this.router.navigate(['/admin/dashboard/main']);
  //   }
  // }
}
