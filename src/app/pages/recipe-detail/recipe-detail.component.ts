import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RecipeService } from '../../services/recipe-service.service'
import { RecipeJSON } from 'src/app/models/recipeJSON';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: RecipeJSON;
  ingredientList = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  get tags() {
    let returnString = "";
    this.recipe.tags.forEach(tag => {
      returnString += tag + ";";
    });
    return this.tags;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      let recipe = this.recipeService.getRecipe(+params.get('recipeId'));
      console.log(+params.get("recipeId"));
      this.recipe = recipe;
       for (let i = 0; i < this.recipe.ingredientlist.length; i++) {
         this.ingredientList.push(recipe.ingredientlist[i].replace(/;/g,''));         
       }
    });
  }

}
