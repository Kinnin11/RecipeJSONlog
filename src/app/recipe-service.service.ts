import { Injectable } from '@angular/core';
import recipes from '../../../recipes.json';
import { RecipeJSON } from './recipeJSON';
import { ClipboardService} from 'ngx-clipboard';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(
    private _clipboardService: ClipboardService
  ) {  
   }

  getRecipe(recipeId) {
    return recipes[recipeId];
  }

  getRecipeList() {
    let listOutput = [];
    for (let i = 0; i < recipes.length; i++) {
      listOutput.push({name: recipes[i].name, id:  recipes[i].id});      
    }
    console.log(listOutput);
    return listOutput;
  }

  addRecipe(){
    let jsonOutput : RecipeJSON = {
      id : recipes.length,
      name : "test",
      ingredientlist : ["test1", "test2"],
      ingredienttags : ["test1", "test2"],
      tags : ["test1", "test2"],
      directions : "clipboard test"
    }
    recipes.push(jsonOutput);
    this._clipboardService.copyFromContent(JSON.stringify(recipes));
    return JSON.stringify(recipes);
  }

  
}
