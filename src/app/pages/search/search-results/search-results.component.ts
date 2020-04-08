import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/recipe-service.service';
import { FilterPipe } from '../../../pipes/filter/filter.pipe';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchTerms;

  constructor(
    private route: ActivatedRoute,
    public recipeService : RecipeService,
    private filterPipe: FilterPipe
  ) {
  }

  get taglist() {
    return this.recipeService.listOfTags;
  }

  get recipes () {
    let outputArray = [];
    this.recipeService.getRecipeList().forEach(recipe => {
      outputArray[recipe.id] = recipe.name;
    });
    return outputArray
  }

  get searchResults() {
    let outputArray = [];
    let filteredRecipelist = this.filterPipe.transform(this.recipes, this.searchTerms);
    console.log(filteredRecipelist);
    let filteredTaglist =  this.filterPipe.transform(this.taglist, this.searchTerms);
    filteredTaglist.forEach(tag => {
      this.recipeService.getRecipeListbyTag(tag).forEach(recipe => {
        outputArray.push(recipe);        
      });
    });

    
    filteredRecipelist.forEach(recipe => {
      let r = this.recipeService.getRecipeByname(recipe);
      if(!outputArray.includes(r.name)){        
        outputArray.push({name: r.name, id: r.id});
      }
    });
    console.log(outputArray);

    return outputArray;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.searchTerms = params.get("searchTerms");
    });
  }

}
