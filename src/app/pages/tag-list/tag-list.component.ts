import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe-service.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {


  constructor(
    private recipeService: RecipeService
  ) { }

  get taglist() {
    return this.recipeService.listOfTags;
  }

  ngOnInit(): void {
  }

}
