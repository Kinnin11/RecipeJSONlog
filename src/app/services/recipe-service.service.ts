import { Injectable } from '@angular/core';
import recipes from '../../assets/recipes.json';
import { RecipeJSON } from '../models/recipeJSON';
import { ClipboardService } from 'ngx-clipboard';
import  {Utils}  from '../utils';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes;
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

  get listOfIngredients(): string[] {
    let outpuArray = [];
    this.recipes.forEach(recipe => {
      recipe.ingredienttags.forEach(ingredient => {
        if(!outpuArray.includes(ingredient)){
          outpuArray.push(ingredient);
        }
      });      
    });
    return outpuArray;
  }

  searchRecipesByIngredients(ingredients : string[]) : any {
    let outpuArray = [];
    for (let i = 0; i < ingredients.length; i++) {
      ingredients[i] = ingredients[i].toLowerCase();
      
    }   
    console.log(ingredients);

    this.recipes.forEach(recipe => {
      let match1 = false;
      const intersection = recipe.ingredienttags.filter(element => ingredients.includes(element.toLowerCase()));
      if(intersection.length != 0 && intersection.length > (ingredients.length / 3)) {
        outpuArray.push({id: recipe.id, matches: intersection.length, name: recipe.name})
        match1 = true;
      }
      const intersection2 = recipe.tags.filter(element => ingredients.includes(element.toLowerCase()));
      if(intersection2.length != 0 && intersection2.length > (ingredients.length / 3)) {
        if(match1){
          console.log(recipe);
          outpuArray.forEach(element => {
            if(element.id == recipe.id){
              element.matches += intersection2.length;
            }
          });
        } else {
        outpuArray.push({id: recipe.id, matches: intersection2.length, name: recipe.name})
        }
      }
    
    });
    outpuArray.sort(Utils.compareValues("matches", "desc"));
    return outpuArray;
  }


  private fillTagList() {
    //go through each recipes tags
    recipes.forEach(recipe => {
      recipe.tags.forEach(tag => {
        //if tag exists push it onto the tag's recipe list, else create a new tag with list
        if (this.recipeListPerTag[Utils.capitalizeFirstLetter(tag)] != undefined) {
          this.recipeListPerTag[Utils.capitalizeFirstLetter(tag)].push(recipe.id);
        } else {
          this.recipeListPerTag[Utils.capitalizeFirstLetter(tag)] = [recipe.id];
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
        this.recipeListPerTag[Utils.capitalizeFirstLetter(singleTag)] = [id];
      }
    });

    //this.updateTagList();
    return JSON.stringify(this.recipes);
    console.log(this.recipes);
  }
}


