import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  myForm;
  constructor(
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      search: ''
    })
  }

  update() {

  }

}
