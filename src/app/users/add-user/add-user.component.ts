import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Adress } from 'src/app/models/address.model';
import { User } from 'src/app/models/user.models';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService : UsersService, private router: Router) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = this.formBuilder.group({
      firstname: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
      lastname: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control("", [Validators.required, Validators.minLength(5), Validators.email]),
      description: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
      dateBirth: this.formBuilder.control("", Validators.required),
      adress: this.formBuilder.group({
        street: this.formBuilder.control("", Validators.required),
        state: this.formBuilder.control("", Validators.required),
        zip: this.formBuilder.control("", Validators.required),
        city: this.formBuilder.control("", Validators.required),
      }),
      aliases: this.formBuilder.array([]),
    });
  }

  getAliases():FormArray{
    //Récuperer la valeur des controls
    return this.userForm.get("aliases") as FormArray
  }
  addAliases(): void{
    this.getAliases().push(this.formBuilder.control("", Validators.required));
  }

  onSubmit(): void{
    const dataUser = this.userForm.value;
    const adress  = new Adress(dataUser.street, dataUser.city, dataUser.state, dataUser.zip );
    const alias = dataUser.aliases? dataUser.aliases : []
    const user = new User(dataUser.firstname,
                      dataUser.lastname,
                      adress,
                      dataUser.email,
                      dataUser.description,
                      dataUser.dateBirth, alias);

    //console.log(this.userForm.value);
    this.userService.addUser(dataUser);
    console.log(this.userForm.value);
    this.router.navigate(["users"]);
  }
}
