// https://ngrx.io/guide/effects

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AssociateService } from 'src/app/service/associate.service';
import {
  addassociate,
  addassociatesuccess,
  loadassociate,
  loadassociatefail,
} from './Associate.Action';
import { exhaustMap, map, of, catchError, switchMap } from 'rxjs';
import { loadassociatesuccess } from './Associate.Action';
import { showalert } from '../Common/App.Action';

@Injectable()
export class AssociateEffects {
  constructor(private actions$: Actions, private service: AssociateService) {}

  _loadasscoiate = createEffect(() =>
    this.actions$.pipe(
      ofType(loadassociate),
      exhaustMap(() =>
        this.service.GetAll().pipe(
          map((data) => {
            return loadassociatesuccess({ list: data });
          }),
          catchError((_error) =>
            of(loadassociatefail({ errormessage: _error.message }))
          )
        )
      )
    )
  );

  _addassociate = createEffect(() =>
    this.actions$.pipe(
      ofType(addassociate),
      switchMap((action) => {
        return this.service.Create(action.inputdata).pipe(
          switchMap((data) => {
            return of(
              addassociatesuccess({ inputdata: action.inputdata }),
              showalert({
                message: 'Created successfully.',
                resulttype: 'pass',
              })
            );
          }),
          catchError((_error) => {
            console.log(_error);
            return of(
              showalert({
                message: 'Failed to create associate',
                resulttype: 'fail',
              })
            );
          })
        );
      })
    )
  );
}
