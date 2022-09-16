import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IActionResponse } from '../../interfaces/action/action';
import { ActionService } from '../../services/action/action.service';

@Injectable({ providedIn: 'root' })

export class ActionResolver implements Resolve<IActionResponse> {

  constructor(private actionService: ActionService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IActionResponse> {
    return this.actionService.getOne(Number(route.paramMap.get('id')));
  }

}
