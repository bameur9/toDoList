import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
   secondeSub! : Subscription;
   secondes! : any;

  constructor() { }

  ngOnDestroy(): void {
    this.secondeSub.unsubscribe();
  }

  ngOnInit(): void {
    //Prend en argument un delai
    const secondesObs = interval(1000);

    this.secondeSub = secondesObs.subscribe(
      (value)=>{
        this.secondes = value;
      }
    );
  }

}
