import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag-recipe-list',
  templateUrl: './tag-recipe-list.component.html',
  styleUrls: ['./tag-recipe-list.component.css']
})
export class TagRecipeListComponent implements OnInit {
  tag;
  
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.tag = params.get("tagName");
      console.log(+params.keys);
    });
    console.log(this.tag);
  }

  get recipeList() {
    return this.recipeService.getRecipeListbyTag(this.tag);
  }


}
