import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RecipeService } from '../recipe-service.service';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-enter-recipe',
  templateUrl: './enter-recipe.component.html',
  styleUrls: ['./enter-recipe.component.css']
})
export class EnterRecipeComponent implements OnInit {

  recipeForm;

  constructor(
    public recipeService: RecipeService,
    private formBuilder : FormBuilder,
    ) {  }

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      name: '',
      directions: '',
      tagList: this.formBuilder.array([this.formBuilder.group({tag:''}), this.formBuilder.group({tag:''}), this.formBuilder.group({tag:''}), this.formBuilder.group({tag:''}),this.formBuilder.group({tag:''}),this.formBuilder.group({tag:''})]),
      ingredients: '',
      cooktime: null,
      preptime: null,
      servings: null,
      source: '',
      image: '',
        });

  }

  //To easily grab the taglist array for tags in the form
  get tagLines() {
    return this.recipeForm.get('tagList') as FormArray;
  }

  //adding a line in the formarray
  addTagLine() {
    this.tagLines.push(this.formBuilder.group({tag:''}));
  }
  
  //removing a line in the formarray
  deleteTagLine(i) {
    this.tagLines.removeAt(i);
  }

  //Adds form data to internal JSON, DOES NOT SAVE TO EXTERNAL OR COPY TO CLIPBOARD
  onSubmit(recipeData) {
    //making the ingredients a comprehensive list
    let ingrList = recipeData.ingredients.trim().replace(/;/g, '').split('\n');
    //splitting out the ingredients themselves for tags
    let ingrTagSplit = recipeData.ingredients.trim().split(';');
    let ingrTag = [];
    let tagList = [];

    //taking the tags out of [tag:""] form and into ["",""]
    recipeData.tagList.forEach(function (value) {
      if(value["tag"] != '')
        tagList.push(value['tag']);
    });

    //narrowing out the list by only saving the ingredients themselves
    for(let i = 1 ; i < ingrTagSplit.length ; i += 2) {
      ingrTag.push(ingrTagSplit[i]);
    }
    this.recipeService.addRecipe(recipeData.name, ingrTag, recipeData.servings, recipeData.source, recipeData.image, recipeData.cooktime, recipeData.preptime, ingrList, ingrTag, recipeData.directions.trim());
    this.recipeForm.reset();

  }

}
