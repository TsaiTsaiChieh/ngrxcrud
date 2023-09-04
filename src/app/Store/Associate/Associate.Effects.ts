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
import { exhaustMap, map, of, catchError } from 'rxjs';
import { loadassociatesuccess } from './Associate.Action';
import { showalert } from '../Common/App.Action';

@Injectable()
export class AssociateEffects {
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

  _addasscoiate = createEffect(() =>
    this.actions$.pipe(
      ofType(addassociate),
      exhaustMap((action) =>
        this.service.Create(action.inputdata).pipe(
          map((data) => {
            return addassociatesuccess({ inputdata: action.inputdata });
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Failed to create associate',
                resulttype: 'fail',
              })
            )
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private service: AssociateService) {}
}
