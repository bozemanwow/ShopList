import { ShoppingListService } from './services/shopping-list.service';
import { Ingrediant } from './../shared/ingrediant.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
ingre: Ingrediant[];
private igChangedSub: Subscription;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingre = this.slService.getIngre();
    this.igChangedSub =  this.slService
    .ingreChanged
    .subscribe(
       (newArr: Ingrediant[]) =>
    {
      this.ingre = newArr;
    });
  }
  ngOnDestroy(): void {
    this.igChangedSub.unsubscribe();
  }
  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }
}
