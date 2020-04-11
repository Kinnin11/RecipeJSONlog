import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe-service.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myForm : FormGroup;
  recipesList;

  constructor(
    private formBuilder : FormBuilder,
    private _recipeService : RecipeService
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      ingrList: this.formBuilder.array([this.formBuilder.group({ingr:''})])
    });
  }

   //To easily grab the taglist array for tags in the form
   get ingrLines() {
    return this.myForm.get('ingrList') as FormArray;
  }

  //adding a line in the formarray
  addIngrLine() {
    this.ingrLines.push(this.formBuilder.group({ingr:''}));
  }
  
  //removing a line in the formarray
  deleteTagLine(i) {
    this.ingrLines.removeAt(i);
  }

  onEnter() {
    this.onSubmit(this.myForm.value);
  }

  onSubmit(formData) {
    let ingrList = []; 
    console.log(formData);
    formData.ingrList.forEach(function (value) {
      if(value["ingr"] != '' && value["ingr"] != null)
        ingrList.push(value['ingr']);
    });

    this.recipesList = this._recipeService.searchRecipesByIngredients(ingrList);  
    console.log(this.recipesList);  
  }

  get recipesByIngredients() {
    return this.recipesList;
  }

}
