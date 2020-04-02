import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { SimpleStyleDirective } from 'src/simple-style/simple-style.directive';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail/recipe-detail.component';
import { EnterRecipeComponent } from './enter-recipe/enter-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagRecipeListComponent } from './tag-recipe-list/tag-recipe-list.component';



@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    SimpleStyleDirective,
    RecipeDetailComponent,
    EnterRecipeComponent,
    TagListComponent,
    TagRecipeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //RouterModule.forRoot(routes),
    ClipboardModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
