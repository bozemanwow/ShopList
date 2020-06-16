import { Subscription } from 'rxjs';
import { ShoppingListService } from './../services/shopping-list.service';
import { Ingrediant } from './../../shared/ingrediant.model';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
// @ViewChild('nameInput')  nameInputRef: ElementRef;
// @ViewChild('amountInput')  amountInputRef: ElementRef;
 @ViewChild('f')  slFrom: NgForm;
subscription: Subscription;
editedIndex: number;
editedItem: Ingrediant;

editMode = false;
constructor(private slShoppingList: ShoppingListService) { }
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.slShoppingList.startedEditing.subscribe(
      (index: number) => {
        this.editedIndex = index;
        this.editMode = true;
        this.editedItem = this.slShoppingList.getSingleIn(index);
        this.slFrom.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }
  onSubmitItem(form: NgForm)
  {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIng = new Ingrediant(value.name, value.amount);
    if (this.editMode)
    {
        this.slShoppingList.updateIngredient(this.editedIndex, newIng);
        console.log('Update');
    }
    else{
    this.slShoppingList.addIngrediant(newIng);
    console.log('added');
    }
    this.editMode = false;
    form.reset();
  }
  onClear()
  {
    this.slFrom.reset();
    this.editMode = false;
  }
  onDelete()
  {
    this.slShoppingList.deleteIngredient(this.editedIndex);
    this.onClear();

  }

}
