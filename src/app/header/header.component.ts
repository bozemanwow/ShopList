import { DataStorageService } from './../shared/data-storage.service';
import { Component , EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{
  collapsed = true;

  constructor(private dataStore: DataStorageService){

  }
//  @Output() featureSelected = new EventEmitter<string>();
//   onSelect(feature: string){
//     this.featureSelected.emit(feature);
//   }

onSaveData(){
  this.dataStore.storeRecipes();
}
onFetchData(){
  this.dataStore.fetchRecipes().subscribe();
}
}
