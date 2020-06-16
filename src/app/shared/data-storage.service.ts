import { RecipeService } from './../recipes/services/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.modal';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipe: RecipeService) {

   }
   storeRecipes()
   {
    const recipes = this.recipe.getRecipes();
    this.http.put('https://angularrecipestyle.firebaseio.com/recipes.json', recipes)
    .subscribe(response =>
      {
        console.log(response);
      });
   }
   fetchRecipes()
   {
    return this.http.get<Recipe[]>('https://angularrecipestyle.firebaseio.com/recipes.json')
    .pipe(map(recipes =>
      {return recipes.map(recipe => {
        return {...recipe, ingrediant: recipe.ingrediant ? recipe.ingrediant : []};
      }); }
      ),
      tap(recipes =>
        {
          this.recipe.setRecipes(recipes);
        })
      );


   }


}
