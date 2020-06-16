import { Ingrediant } from 'src/app/shared/ingrediant.model';
import { Subject } from 'rxjs';

export class ShoppingListService{

  ingreChanged = new Subject<Ingrediant[]>();
  startedEditing = new Subject<number>();

  ingre: Ingrediant[] = [
    new Ingrediant('Salt', 4),
     new Ingrediant('Pepper', 3)
  ];

  addIngrediant(ing: Ingrediant)
  {
   this.ingre.push(ing);
   this.ingreChanged.next(this.ingre.slice());
  }
  addListofIngres(ings: Ingrediant[])
    {

      this.ingre.push(...ings);
      this.ingreChanged.next(this.ingre.slice());

    }
  getIngre()
  {
    return this.ingre.slice();
  }
  getSingleIn(index: number)
  {
    return this.ingre[index];
  }

  updateIngredient(index: number, newIngre: Ingrediant)
  {
    this.ingre[index] = newIngre;
    this.ingreChanged.next(this.ingre.slice());
  }
  deleteIngredient(index: number)
  {
    this.ingre.splice(index, 1);
    this.ingreChanged.next(this.ingre.slice());
  }
}
