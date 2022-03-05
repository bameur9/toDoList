import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TodoService } from "../services/todo.service";

@Component( {
  selector: 'my-todo',
  templateUrl:'./todo.component.html',
  styleUrls:['./todo.component.css']
})

export class TodoComponent implements OnInit, OnDestroy{
  today!: Date;
  todos!: { todoName: string; todoStatus: boolean; image: string; isModif: boolean; todoDescription: string; }[];
  todosSub!: Subscription;

  constructor(private todoService: TodoService, private router : Router){  }

  ngOnInit(): void {
    this.today = this.todoService.today;
    this.todosSub = this.todoService.todoSubject.subscribe(
        (value : any[])=> {
          this.todos = value;
        },
        (error) => {
          console.log("Erreur: "+ error);
        },
        () => {
          console.log("Observable completée: ");
        }
    );
    //Emettre les données.
    this.todoService.emitTodos();
  }

  ngOnDestroy(){
    this.todosSub.unsubscribe();
  }

  onChangeStatus(i: number){
    this.todoService.onChangeStatus(i);
  };

  onChangeIfModif(i: number){
    this.todoService.onChangeIfModif(i);
  }

  onView(id: number){
    this.router.navigate(["single-todo", id]);
  }
}

