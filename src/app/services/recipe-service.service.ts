import { Injectable } from '@angular/core';
import recipes from '../../assets/recipes.json';
import { RecipeJSON } from '../models/recipeJSON';
import { ClipboardService } from 'ngx-clipboard';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: RecipeJSON[];
  private recipeListPerTag = {};
  constructor(
    private _clipboardService: ClipboardService
  ) {
    //copy the recipelist from the json to allow special operations
    this.recipes = recipes;
    this.fillTagList();
  }

  getRecipe(recipeId: number): RecipeJSON {
    let recipeOutput = null;
    this.recipes.forEach(recipe => {
      if (recipe.id === recipeId) {
        recipeOutput = recipe;
      }
    });
    return recipeOutput;
  }

  getRecipeByname(recipeName: string): RecipeJSON {
    let recipeOutput = null;
    this.recipes.forEach(recipe => {
      if (recipe.name === recipeName) {
        recipeOutput = recipe;
      }
    });
    return recipeOutput;
  }

  copyRecipesToClipboard() {
    this._clipboardService.copyFromContent(JSON.stringify(this.recipes));
  }

  getRecipeList(): any[] {
    let listOutput = [];
    this.recipes.forEach(recipe => {
      listOutput.push({ name: recipe.name, id: recipe.id });

    });
    return listOutput;
  }

  getRecipeListbyTag(tagLookup: string): string[] {
    let outpuArray = [];
    this.recipeListPerTag[tagLookup].forEach(recipeId => {
      outpuArray.push({ name: this.getRecipe(recipeId).name, id: recipeId })
    });
    return outpuArray;
  }

  /**
     * returns taglist
     */
  get listOfTags(): string[] {
    let outputArray = [];
    for (const i in this.recipeListPerTag) {
      outputArray.push(i);
    }
    return outputArray;
  }


  private fillTagList() {
    //go through each recipes tags
    recipes.forEach(recipe => {
      recipe.tags.forEach(tag => {
        //if tag exists push it onto the tag's recipe list, else create a new tag with list
        if (this.recipeListPerTag[capitalizeFirstLetter(tag)] != undefined) {
          this.recipeListPerTag[capitalizeFirstLetter(tag)].push(recipe.id);
        } else {
          this.recipeListPerTag[capitalizeFirstLetter(tag)] = [recipe.id];
        }
      });
    });
  }

  addRecipe(recipeData, tag: string[], ingrList: string[], ingrTag: string[], id: number = null) {
    let newRecipe = true;
    //if new, add to the list
    console.log(this.recipes.length);
    if (id == null) {
      id = this.recipes.length;
      newRecipe = false;
    }
    console.log(this.recipes);
    //create an object that contains all the data
    let jsonOutput: RecipeJSON = {
      id: id,
      name: recipeData.name,
      tags: tag,
      servings: recipeData.servings,
      source: recipeData.source,
      image: recipeData.image,
      cooktime: recipeData.cooktime,
      preptime: recipeData.preptime,
      ingredienttags: ingrTag,
      ingredientlist: ingrList,
      directions: recipeData.directions.trim()
    }
    //push it onto the copy of the list
    if (newRecipe) {
      this.recipes.push()
    }
    this.recipes[id] = jsonOutput;

    tag.forEach(singleTag => {
      console.log(this.recipeListPerTag[singleTag]);
      if (this.recipeListPerTag[singleTag] != undefined) {
        if (!this.recipeListPerTag[singleTag].includes(id)) {
          
          this.recipeListPerTag[singleTag].push(id);
        }
      } else {
        this.recipeListPerTag[capitalizeFirstLetter(singleTag)] = [id];
      }
    });

    //this.updateTagList();
    return JSON.stringify(this.recipes);
    console.log(this.recipes);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}