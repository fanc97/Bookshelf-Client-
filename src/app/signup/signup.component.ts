import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/service/user.service';
import { LoginAuthService } from '../shared/service/login-auth.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // public user:any = {};

  constructor(private fb:FormBuilder,private userService:UserService,private authService:LoginAuthService) { 
    this.authService.isLoggedIn();

    this.reactiveForm=this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[a-zA-z ]*'), Validators.minLength(3)])]),
      lastName: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[a-zA-z ]*'), Validators.minLength(2)])]),
      email: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')])]),
      username: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[a-zA-z ]*[0-9+ ]*'), Validators.minLength(3)])]),
      password: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[a-zA-z ]*[0-9+ ]*'), Validators.minLength(8)])]),
      phoneNumber: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[0-9+ ]*'), Validators.minLength(10),Validators.maxLength(14)])])
    });
  }

  saveForm(submitForm:FormGroup){
    if(submitForm.valid){
      const user=submitForm.value;
      const formData= new FormData();
      formData.append('user',JSON.stringify(user));
      formData.append('file',this.userFile);
      this.userService.saveUserProfile(formData).subscribe((response)=>{
        console.log(response);
      });
      console.log(submitForm.value);
      this.reactiveForm.reset();
    }else{
      this.validateFormFields(submitForm);
    }
  }
  
  validateFormFields(submitForm:FormGroup){
    Object.keys(submitForm.controls).forEach(field=>{
      const control=submitForm.get(field);
      if(control instanceof FormControl){
        control.markAsTouched({onlySelf: true});
      }else if(control instanceof FormGroup){
        this.validateFormFields(control);
      }
    })
  }

  onSelectFile(event){
    const file = event.target.files[0];
    console.log(file);
    this.userFile=file;
  }

  ngOnInit() {
  }
  
  // saveUser(user:any,userForm:any){
  //   user.enabled=true;
  //   user.roleName="ROLE_USER";
  //   user.photo=null;
  //   this.userService.saveUser(user).subscribe((response) =>{
  //     if(response){
  //       console.log(response);
  //       userForm.reset();
  //     }
  //   })
  // }

  reactiveForm: any = FormGroup;

  public userFile: any = File;
  

}
