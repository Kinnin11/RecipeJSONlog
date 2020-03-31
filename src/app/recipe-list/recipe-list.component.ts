import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe-service.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {


  constructor(
    private recipeService: RecipeService
  ) {
    this.recipeService.addRecipe();
   }

   get myArray() {
     return this.recipeService.getRecipeList();
     
   }

  ngOnInit(): void {
  }

}
