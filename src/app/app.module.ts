import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';
import { MDBBootstrapModule } from 'angular-bootstrap-md';;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { SimpleStyleDirective } from 'src/simple-style/simple-style.directive';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { EnterRecipeComponent } from './pages/enter-recipe/enter-recipe.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagListComponent } from './pages/tag-list/tag-list.component';
import { TagRecipeListComponent } from './pages/tag-list/tag-recipe-list/tag-recipe-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './template/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ReversePipe } from './pipes/reverse/reverse.pipe';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { SearchResultsComponent } from './pages/search/search-results/search-results.component';


//test
@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    SimpleStyleDirective,
    RecipeDetailComponent,
    EnterRecipeComponent,
    TagListComponent,
    TagRecipeListComponent,
    SearchResultsComponent,
    NavbarComponent,
    HomeComponent,
    ReversePipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
  ],
  providers: [FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
