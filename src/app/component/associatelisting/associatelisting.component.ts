import { Component, OnInit, ViewChild } from '@angular/core';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { MatDialog } from '@angular/material/dialog';
import { Associates } from 'src/app/Store/Model/Associate.model';
import { Store } from '@ngrx/store';
import { getassociatelist } from 'src/app/Store/Associate/Associate.Selectors';
import { loadassociate } from 'src/app/Store/Associate/Associate.Action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.css'],
})
export class AssociatelistingComponent implements OnInit {
  Associatelist!: Associates[];
  datasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'address',
    'associategroup',
    'status',
    'action',
  ];

  constructor(private dialog: MatDialog, private store: Store) {}
  ngOnInit(): void {
    // effects -> call loadassociatesuccess step -> reducer -> selector
    this.store.dispatch(loadassociate());
    this.store.select(getassociatelist).subscribe((item) => {
      this.Associatelist = item;
      this.datasource = new MatTableDataSource<Associates>(this.Associatelist);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

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
