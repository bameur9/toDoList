import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todo } from "../models/todo.model";
//Décorateur
@Injectable({
  providedIn:'root'
})

//Class typeScript
export class TodoService {
  today = new Date();
  todos : Todo[] = [];

  todoSubject = new Subject<Todo[]>();


  constructor(private httpClient: HttpClient){
    this.getTodosFromServer();
  }

  emitTodos():void {
    //On ajoute notre tableau
    this.todoSubject.next(this.todos);
  }

  onChangeStatus(i: number):void{
    this.todos[i].todoStatus = !this.todos[i].todoStatus;
    this.emitTodos();
   this.saveTodosFromServer();
  };

  onChangeIfModif(i: number):void{
    this.todos[i].isModif = !this.todos[i].isModif;
    this.emitTodos();
    this.saveTodosFromServer();
  }

  getTodo(index: number){
    if(this.todos[index]){
      return this.todos[index];
    }
    return false;
  }

  addTodo(todo: Todo): void{
   this.todos.unshift(todo);
   this.emitTodos();
   this.saveTodosFromServer();
  }

  saveTodosFromServer():void{
    this.httpClient.put("https://todo-list-app-ff9cc-default-rtdb.europe-west1.firebasedatabase.app/todos.json", this.todos).subscribe(
      () => {
        console.log("données enrigistré avec succes");
      },
      (error) => {
        console.log("Erreur de sauvegade : "+ error);
      }
    );
  }

  getTodosFromServer(): void{
    //Renvoyer les données en Array
    this.httpClient.get<Todo[]>("https://todo-list-app-ff9cc-default-rtdb.europe-west1.firebasedatabase.app/todos.json")
    .subscribe(
      //Récuperer les todos depuis un serveur
      (todoRecup : Todo[])=> {
        this.todos = todoRecup;
        this.emitTodos();
      },
      (error) => {
        console.log("Erreur de recupération des données : "+ error);
      },
      () => {
        console.log("Récupérations des données terminée");
      }
    )
  }

}
