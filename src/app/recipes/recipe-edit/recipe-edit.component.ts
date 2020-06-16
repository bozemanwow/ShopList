import { Ingrediant } from './../../shared/ingrediant.model';
import { RecipeService } from './../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id: number;
editMode = false;
recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(
    (params: Params) =>  {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
      console.log(this.editMode);
      }
    );
  }
 private initForm()
 {

   let recipeName = '';
   let recipeImagepath = '';
   let recipeDes = '';
   let recipeIngres = new FormArray([]);

   if (this.editMode)
   {
    const recipeItem = this.recipeService.getRecipe(this.id);
    recipeName = recipeItem.name;
    recipeImagepath = recipeItem.imgpath;
    recipeDes = recipeItem.description;
    if(recipeItem.ingrediant != null)
    {
      for(let ingre of recipeItem.ingrediant)
      {
        recipeIngres.push(
          new FormGroup({
              name : new FormControl(ingre.name,  Validators.required),
              amount : new FormControl(ingre.amount, [ Validators.required,  Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        );
      }
    }
   }
   this.recipeForm = new FormGroup({
    name : new FormControl(recipeName, Validators.required),
    imgpath : new FormControl(recipeImagepath,  Validators.required),
    description : new FormControl(recipeDes,  Validators.required),
    ingrediant : recipeIngres
  });
 }
 get controls() { // a getter!
  return (this.recipeForm.get('ingrediant') as FormArray).controls;
}
 onSubmit(){

  if (this.editMode)
  {
    this.recipeService.updateRecipe(this.id, this.recipeForm.value );
  }
  else {
  this.recipeService.addRecipe( this.recipeForm.value );
  }
  this.router.navigate(['../'], {relativeTo: this.route});
 }
 onAddIngredient()
 {
(this.recipeForm.get('ingrediant') as FormArray).push(
  new FormGroup(
    {
      name : new FormControl(null, Validators.required),
      amount : new FormControl(null, [ Validators.required,  Validators.pattern(/^[1-9]+[0-9]*$/)])
    }
  )
);
 }

 onCancel(){
 this.router.navigate(['../'], {relativeTo: this.route});
 }
 onDeleteIngre(ingre: number){
  ((this.recipeForm.get('ingrediant') as FormArray).removeAt(ingre));
 }
}
