import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { SimpleStyleDirective } from 'src/simple-style/simple-style.directive';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail/recipe-detail.component';
import { EnterRecipeComponent } from './enter-recipe/enter-recipe.component';


const routes: Routes = [
  {path: 'recipe-list', component: RecipeListComponent},
  {path: 'recipe-detail/:recipeId', component: RecipeDetailComponent},
  {path: 'enter-recipe', component : EnterRecipeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    SimpleStyleDirective,
    RecipeDetailComponent,
    EnterRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
