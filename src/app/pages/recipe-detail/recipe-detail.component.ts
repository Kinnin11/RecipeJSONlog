import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RecipeService } from '../../services/recipe-service.service'
import { RecipeJSON } from 'src/app/models/recipeJSON';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  // template: `
  // <ol>
  //     <li *ngFor="let line of recipe.directions.split('/\#|\n/g')" >
  //       <div *ngIf="line.includes('$');else not-link">
  //         <a [title]="line.split('$')[1]" [routerLink]="['/recipe-detail', line.split('$')[0]]">{{line.split('$')[1]}}</a>
  //       </div>
  //       <ng-template #not-link>{{line}}</template>
        
  //     </li>
  //   </ol>
  // `
})
export class RecipeDetailComponent implements OnInit {
  recipe: RecipeJSON;
  ingredientList = [];
  recipeIdSubscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
  ) { 
    this.recipeIdSubscription = this.router.events.subscribe((e:any) => {
      if(e instanceof NavigationEnd){
        this.ngOnInit();
      }
    });
  }

  get tags() {
    let returnString = "";
    this.recipe.tags.forEach(tag => {
      returnString += tag + ";";
    });
    return this.tags;
  }

  ngOnInit(): void {
    this.recipe = null;
    this.ingredientList = [];
    this.route.paramMap.subscribe(params => {
      let recipe = this.recipeService.getRecipe(+params.get('recipeId'));
      console.log(+params.get("recipeId"));
      this.recipe = recipe;
      for (let i = 0; i < this.recipe.ingredientlist.length; i++) {
        this.ingredientList.push(recipe.ingredientlist[i].replace(/;/g, ''));
      }
      let recipeLinks = this.recipe.directions.split('#');
      if (recipeLinks.length != 1) {
        let directions = recipeLinks[0];
        for (let i = 1; i < recipeLinks.length; i += 3) {
          directions = directions + "<a [title]=\"" + recipeLinks[i] + "\" [routerLink]=\"[\'/recipe-detail\'," + recipeLinks[i + 1] + "]\">" + recipeLinks[i] + "</a>" + recipeLinks[i + 2];

        }
        //this.recipe.directions = directions;
      }

    });
  }

  ngOnDestroy() {
    if(this.recipeIdSubscription) {
      this.recipeIdSubscription.unsubscribe();
    }
  }

}
