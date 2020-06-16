import { Ingrediant } from './../shared/ingrediant.model';
export class Recipe {
  public name: string;
  public description: string;
  public imgpath: string;
  public ingrediant: Ingrediant[];

  constructor(name: string, desc: string, imagePath: string, ingres: Ingrediant[])
  {
    this.name = name;
    this.description = desc;
    this.imgpath = imagePath;
    this.ingrediant = ingres;
  }
}
