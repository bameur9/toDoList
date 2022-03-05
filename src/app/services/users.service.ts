import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users : User[] =[];

  usersSub = new Subject<User[]> ();

  constructor(private httpClient: HttpClient) {
    this.getUsersFromServer();
   }

  emitUsers():void{
    this.usersSub.next(this.users);
  }

  addUser(user : User):void{
    this.users.push(user);
    this.emitUsers();
    this.saveUserFromServer();
  }



  saveUserFromServer():void{
    this.httpClient.put("https://users-list-app-6fdb6-default-rtdb.europe-west1.firebasedatabase.app/users.json", this.users).subscribe(
      ()=>{ console.log("données enrigistré avec succes");},
      (error) => {
        console.log("Erreur de sauvegade : "+ error);
      }
    );
  }

  getUsersFromServer():void{
    this.httpClient.get<User[]>("https://users-list-app-6fdb6-default-rtdb.europe-west1.firebasedatabase.app/users.json").subscribe(
      (userRecup: User[]) => {
        this.users = userRecup;
        this.emitUsers();
      },
      (error) => {
        console.log("Erreur de recupération des données : "+ error);
      }
    );

  }
}
