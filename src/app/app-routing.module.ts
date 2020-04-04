import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail/recipe-detail.component';
import { EnterRecipeComponent } from './enter-recipe/enter-recipe.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagRecipeListComponent } from './tag-recipe-list/tag-recipe-list.component';


const routes: Routes = [
  {path: 'recipe-list', component: RecipeListComponent},
  {path: 'recipe-detail/:recipeId', component: RecipeDetailComponent},
  {path: 'enter-recipe', component : EnterRecipeComponent},
  {path: 'enter-recipe/:recipeId', component: EnterRecipeComponent},
  {path: 'tag-list', component: TagListComponent},
  {path: 'tag-recipe-list/:tag', component:TagRecipeListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
