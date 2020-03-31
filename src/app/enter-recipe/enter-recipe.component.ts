import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe-service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-enter-recipe',
  templateUrl: './enter-recipe.component.html',
  styleUrls: ['./enter-recipe.component.css']
})
export class EnterRecipeComponent implements OnInit {
  recipes;
  recipeForm;

  constructor(
    private recipeService: RecipeService,
    private formBuilder : FormBuilder,
    ) { 
    this.recipeForm = this.formBuilder.group({
      name: '',
      directions: '',
      ingredientList: [],
      ingredientAmounts: []
        });
  }

  ngOnInit(): void {
  }

  onSubmit(recipeData) {
    let ingrList;
    let ingrTag;
    let tags;
    this.recipeService.addRecipe(recipeData.name, ingrList, ingrTag, tags, recipeData.directions)
    console.log(recipeData);
    this.recipeForm.reset();
  }

}
