import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe-service.service';

@Component({
  selector: 'app-enter-recipe',
  templateUrl: './enter-recipe.component.html',
  styleUrls: ['./enter-recipe.component.css']
})
export class EnterRecipeComponent implements OnInit {
  recipes;

  constructor(private recipeService: RecipeService) { 
    this.recipes = recipeService.addRecipe();
  }

  ngOnInit(): void {
  }

}
