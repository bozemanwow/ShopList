import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.modal';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscripton: Subscription;
  constructor(private recipeService: RecipeService, private router: Router, private actroute: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.subscripton.unsubscribe();
  }

  ngOnInit(): void {
    this.subscripton = this.recipeService.recipesChanged.subscribe(
  (recipes: Recipe[]) => {
    this.recipes = recipes;
  }
);

    this.recipes = this.recipeService.getRecipes();

  }

  onNew(){
    this.router.navigate(['new'], {relativeTo: this.actroute});
  }
}
