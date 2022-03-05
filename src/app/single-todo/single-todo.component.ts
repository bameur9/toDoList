import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.css']
})
export class SingleTodoComponent implements OnInit {
  //Injecter la route qui est activé
  constructor(private route : ActivatedRoute, private todoService : TodoService) { }

  todo;

  err!: string;
  ngOnInit(): void {
    //On recupere dans notre todo
    //le parametre de la route activé
    const id = this.route.snapshot.params['id'];

    this.todo = this.todoService.getTodo(id);

    //Quand todo n'existe pas, afficher le msge
    if(!this.todo){
      this.err ="Id Incorrect!";
    }
  }
}
