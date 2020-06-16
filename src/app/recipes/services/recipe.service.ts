import { Recipe } from './../recipe.modal';
import { Subject } from 'rxjs';
import { ShoppingListService } from './../../shopping-list/services/shopping-list.service';
import { Injectable } from '@angular/core';


import { Ingrediant } from 'src/app/shared/ingrediant.model';

@Injectable()
export class RecipeService{

recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  //   new Recipe(
  //     'Pie', 'Its Yummy', 'https://www.cookingclassy.com/wp-content/uploads/2019/07/birthday-cake-4.jpg', [
  //       new Ingrediant('butter', 1),
  //       new Ingrediant('eggs', 1),
  //       new Ingrediant('flour', 1),
  //       new Ingrediant('cherry', 1)
  //     ]),
  //   new Recipe(
  //     'Cake', 'My Fav'
  //     , 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxch_HyQoF37O0bFnlVmEwcO7zLqkekU6VXxe5XV6KnIxEkVdB&usqp=CAU',
  //      [ new Ingrediant('butter', 1),
  //      new Ingrediant('eggs', 1),
  //      new Ingrediant('flour', 1),
  //      new Ingrediant('sugar', 1)] )
  // ];

constructor(private slSer: ShoppingListService){ }

  getRecipes(){
    // slice returns a copy
    return this.recipes.slice();
  }
  getRecipe(index: number)
  {
    return this.recipes[index];
  }
addRecipe(recipe: Recipe)
{
this.recipes.push(recipe);
this.recipesChanged.next(this.recipes.slice());
}
updateRecipe(index: number, nrecipe: Recipe)
{
this.recipes[index] = nrecipe;
this.recipesChanged.next(this.recipes.slice());
}
addIngreToShopList(ingre: Ingrediant[])
{
this.slSer.addListofIngres(ingre);
}
deleteRecipe(index: number)
{
  this.recipes.splice(index, 1);
  this.recipesChanged.next(this.recipes.slice());
}
deleteIngre(index: number, ingre: number)
{
  this.recipes[index].ingrediant.splice(ingre, 1);
  this.recipesChanged.next(this.recipes.slice());
}
setRecipes(r: Recipe[])
{
  this.recipes = r;
  this.recipesChanged.next(this.recipes.slice());
}
}
