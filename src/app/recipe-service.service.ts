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

  copyRecipesToClipboard() {
    this._clipboardService.copyFromContent(JSON.stringify(recipes));
  }

  getRecipeList() {
    let listOutput = [];
    for (let i = 0; i < recipes.length; i++) {
      listOutput.push({name: recipes[i].name, id:  recipes[i].id});      
    }
    console.log(listOutput);
    return listOutput;
  }

  addRecipe(nam: string, tag : string[], serv: string, src:string, img: string, cook: number, prep:number, ingrList : string[], ingrTag : string[], direct: string){
    let jsonOutput : RecipeJSON = {
      id : recipes.length,
      name : nam,
      tags : tag,
      servings : serv,
      source: src,
      image: img,
      cooktime: cook,
      preptime: prep,
      ingredienttags : ingrTag,
      ingredientlist : ingrList,     
      directions : direct
    }
    recipes.push(jsonOutput);
    return JSON.stringify(recipes);
  }

  
}
