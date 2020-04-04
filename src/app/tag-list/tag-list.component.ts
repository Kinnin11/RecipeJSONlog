import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe-service.service';

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
    let outputArray = [];
    for (const i in this.recipeService.getTagList()) {
      outputArray.push(i);
    }
    return outputArray;
  }

  ngOnInit(): void {
  }

}
