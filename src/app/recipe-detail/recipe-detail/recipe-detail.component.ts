import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RecipeService } from '../../recipe-service.service'
import { RecipeJSON } from 'src/app/recipeJSON';

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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      let recipe = this.recipeService.getRecipe(+params.get('recipeId'));
      this.recipe = recipe;
       for (let i = 0; i < this.recipe.ingredientlist.length; i++) {
         this.ingredientList.push(recipe.ingredientlist[i].replace(/;/g,''));         
       }
    })
  }

}
