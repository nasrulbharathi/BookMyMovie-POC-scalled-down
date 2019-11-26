import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldConfig } from '../form-config.interface';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  public field:  FormFieldConfig;
  public group:  FormGroup;

  constructor() { }

  ngOnInit() {
    console.log('Insinde ng on init of text..');
  }

}
