import { Injectable } from '@angular/core';
import recipes from '../../../recipes.json';
import { RecipeJSON } from './recipeJSON';
import { ClipboardService} from 'ngx-clipboard';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes : RecipeJSON[];
  private taglist = [];
  constructor(
    private _clipboardService: ClipboardService
  ) {  
    //copy the recipelist from the json to allow special operations
    this.recipes = recipes;
    console.log(this.recipes);
   }

  getRecipe(recipeId : number) : RecipeJSON {
    let recipeOutput = null;
    this.recipes.forEach(recipe => {
      if(recipe.id === recipeId){
        recipeOutput = recipe;  
      }
    });
    return recipeOutput;
  }

  copyRecipesToClipboard() {
    this._clipboardService.copyFromContent(JSON.stringify(this.recipes));
  }

  getRecipeList() : string[] {
    let listOutput = [];
    this.recipes.forEach(recipe => {
      listOutput.push({name: recipe.name, id: recipe.id});
      
    });
    return listOutput;
  }

  getRecipeListbyTag(tagLookup : string) : string[] {
    let outpuArray = [];
    tagLookup = tagLookup.toLowerCase();
    this.recipes.forEach(recipe => {
      recipe.tags.forEach(tag => {
        if(tag.toLowerCase() == tagLookup) {
          outpuArray.push({name: recipe.name, id: recipe.id});  
          console.log(recipe.name); 
          console.log(tag.toLowerCase() == tagLookup)  ;     
        }
      });
      /*recipe.ingredienttags.forEach(tag => {
        if(tag.toLowerCase() == tagLookup){
          outpuArray.push({name: recipe.name, id: recipe.id});  
        }        
      });*/
    });
    
    return outpuArray;
  }

  getTagList() : string[] {
    this.updateTagList();
    return this.taglist;    
  }

  private updateTagList() {
    recipes.forEach(recipe => {
      recipe.tags.forEach(tag => {
        let exists = false;
        this.taglist.forEach(t => {
          if (t.toLowerCase() == tag.toLowerCase()){
            exists = true;
          }
        });
        if(!exists){
          this.taglist.push(tag);
        }
      });
    });
  }

  addRecipe(recipeData, tag : string[], ingrList : string[], ingrTag : string[], id:number = null){
    let newRecipe = true;
    //if new, add to the list
    console.log(this.recipes.length);
    if (id == null) {
      id = this.recipes.length;
      newRecipe = false;
    }
    console.log(this.recipes);
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
    if(newRecipe) {
      this.recipes.push()
    }
    this.recipes[id] = jsonOutput;
    
    this.updateTagList();
    return JSON.stringify(this.recipes);
  }  
}

