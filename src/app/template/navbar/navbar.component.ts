import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  myForm;
  constructor(
    private formBuilder : FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      search: ''
    })
  }

  get searchTerms() {
    return this.myForm.get('search') as string;
  }


  onEnter() {
    this.search(this.searchTerms);
  }

  search(searchTerms) {
    this.router.navigate(['/search-results/' + searchTerms.value]);
  }

}
