import { Injectable } from '@angular/core';
import recipes from '../../../recipes.json';
import { RecipeJSON } from './recipeJSON';
import { ClipboardService} from 'ngx-clipboard';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes
  constructor(
    private _clipboardService: ClipboardService
  ) {  
    //copy the recipelist from the json to allow special operations
    this.recipes = recipes;
   }

  getRecipe(recipeId) {
    return this.recipes[recipeId];
  }

  copyRecipesToClipboard() {
    this._clipboardService.copyFromContent(JSON.stringify(this.recipes));
  }

  getRecipeList() {
    let listOutput = [];
    for (let i = 0; i < this.recipes.length; i++) {
      listOutput.push({name: this.recipes[i].name, id:  this.recipes[i].id});      
    }
    return listOutput;
  }

  addRecipe(recipeData, tag : string[], ingrList : string[], ingrTag : string[], id:number = null){
    //if new, add to the list
    if (id == null)
      id = this.recipes.length;
    //else specifically delete every recipe with the id
    else
      this.recipes = this.recipes.splice(id,id);
    //create an object that contains all the data
    let jsonOutput : RecipeJSON = {
      id : id,
      name : recipeData.name,
      tags : tag,
      servings : recipeData.servings,
      source: recipeData.source,
      image: recipeData.image,
      cooktime: recipeData.cooktime,
      preptime: recipeData.preptime,
      ingredienttags : ingrTag,
      ingredientlist : ingrList,     
      directions : recipeData.directions.trim()
    }
    //push it onto the copy of the list
    this.recipes.push(jsonOutput);
    return JSON.stringify(this.recipes);
  }

  
}

