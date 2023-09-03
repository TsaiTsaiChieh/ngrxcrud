// https://ngrx.io/guide/effects

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AssociateService } from 'src/app/service/associate.service';
import { loadassociate, loadassociatefail } from './Associate.Action';
import { exhaustMap, map, of, catchError } from 'rxjs';
import { loadassociatesuccess } from './Associate.Action';

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
  constructor(private actions$: Actions, private service: AssociateService) {}
}
