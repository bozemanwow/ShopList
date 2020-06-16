import { RecipeService } from './../services/recipe.service';
import { Recipe } from './../recipe.modal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipe: Recipe;
 id: number;
  constructor( private recipeSer: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>
      {
        this.id = +params.id;
        this.recipe = this.recipeSer.getRecipe(this.id);
      }
    );

  }

  addToShopList(){
    this.recipeSer.addIngreToShopList(this.recipe.ingrediant);
  }

  onEdit(){
      this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDelete()
  {
    this.recipeSer.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }
}
