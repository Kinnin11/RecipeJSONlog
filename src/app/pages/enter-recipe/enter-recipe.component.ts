import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RecipeService } from '../../services/recipe-service.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { RecipeJSON } from '../../models/recipeJSON';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enter-recipe',
  templateUrl: './enter-recipe.component.html',
  styleUrls: ['./enter-recipe.component.css']
})
export class EnterRecipeComponent implements OnInit {
  recipeDetail : RecipeJSON;
  recipeForm;
  recipeId = -1;

  constructor(
    public recipeService: RecipeService,
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    ) {  
    }

    get tagList() {
      return this.recipeService.listOfTags.sort();
    }


  ngOnInit(): void {
    this.recipeDetail = null;
    //grab the recipe if ID has been given
    this.route.paramMap.subscribe(params=>{
      console.log(+params.get('recipeId'));
      if(+params.get('recipeId')!= -1){
        
        this.recipeDetail = this.recipeService.getRecipe(+params.get('recipeId'));
        this.recipeId = this.recipeDetail.id;
        //if recipe has been found, initialize form with data from the recipe
    
      //unpack the taglist and make new input values for each in the data
      let tagList = this.formBuilder.array([]);
      this.recipeDetail.tags.forEach(tagItem => {
        tagList.push(this.formBuilder.group({tag:tagItem}));
      });

      //Put the ingredient list and concatinate to a single string
      let ingredientString = '';
      this.recipeDetail.ingredientlist.forEach(ingr => {
        console.log(ingr);
        ingredientString += ingr + '\n';
      });
     
      this.recipeForm = this.formBuilder.group({
        name: this.recipeDetail.name,
        directions: this.recipeDetail.directions,
        tagList: tagList,
        ingredients: ingredientString,
        cooktime: this.recipeDetail.cooktime,
        preptime: this.recipeDetail.preptime,
        servings: this.recipeDetail.servings,
        source: this.recipeDetail.source,
        image: this.recipeDetail.image,
          });
    } else {
      //if no recipe has been passed, initialize empty
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
    let ingrList = recipeData.ingredients.trim().split('\n');
    //splitting out the ingredients themselves for tags
    let ingrTagSplit = recipeData.ingredients.trim().split(';');
    let ingrTag = [];
    let tagList = [];
    let id = null;

    //taking the tags out of [tag:""] form and into ["",""]
    recipeData.tagList.forEach(function (value) {
      if(value["tag"] != '' && value["tag"] != null)
        tagList.push(value['tag']);
    });

    //narrowing out the list by only saving the ingredients themselves
    for(let i = 1 ; i < ingrTagSplit.length ; i += 2) {
      ingrTag.push(ingrTagSplit[i]);
    }
    if(this.recipeId != -1)
      id = this.recipeDetail.id;    

    this.recipeService.addRecipe(recipeData, tagList, ingrList, ingrTag, id);
    this.recipeForm.reset();
    this.recipeId = -1;
  }

}
