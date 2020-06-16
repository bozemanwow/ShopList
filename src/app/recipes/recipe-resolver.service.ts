import { RecipeService } from './services/recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Recipe } from './recipe.modal';

@Injectable({ providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
  constructor(private dataStore: DataStorageService, private recipe: RecipeService){

  }
  resolve(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): Recipe[] | import('rxjs').Observable<Recipe[]> | Promise<Recipe[]> {
   const recipes = this.recipe.getRecipes();
   if(recipes.length === 0)
   {
    return this.dataStore.fetchRecipes();
   }
   else
   {
    return recipes;
   }
  }

}
