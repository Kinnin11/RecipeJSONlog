import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RecipeService } from '../../recipe-service.service'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.recipe = this.recipeService.getRecipe(+params.get('recipeId'));
    })
  }

}
