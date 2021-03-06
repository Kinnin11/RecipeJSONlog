import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { EnterRecipeComponent } from './pages/enter-recipe/enter-recipe.component';
import { TagListComponent } from './pages/tag-list/tag-list.component';
import { TagRecipeListComponent } from './pages/tag-list/tag-recipe-list/tag-recipe-list.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchResultsComponent } from './pages/search/search-results/search-results.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe-list', component: RecipeListComponent },
  { path: 'recipe-detail/:recipeId', component: RecipeDetailComponent , runGuardsAndResolvers: 'paramsChange'},
  { path: 'enter-recipe', component: EnterRecipeComponent },
  { path: 'enter-recipe/:recipeId', component: EnterRecipeComponent },
  { path: 'tag-list', component: TagListComponent },
  { path: 'tag-recipe-list/:tag', component: TagRecipeListComponent },
  { path: 'search-results/:searchTerms', component: SearchResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
