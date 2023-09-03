import { Component, OnInit } from '@angular/core';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.css'],
})
export class AssociatelistingComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  FunctionAdd() {
    this.OpenPopup(0, 'Create Associate');
  }

  OpenPopup(code: number, title: string) {
    // https://material.angular.io/components/dialog/examples
    this.dialog.open(AddassociateComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        code,
        title,
      },
    });
  }
}
