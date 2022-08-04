import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryRequest, ICategoryResponse } from '../../interfaces/categories/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private url = environment.BACKEND_URL;
  private api = { actions: `${this.url}/categories` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(this.api.actions);
  }

  create(action: ICategoryRequest): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>(this.api.actions, action);
  }

  update(id: number, action: ICategoryRequest): Observable<ICategoryResponse> {
    return this.http.patch<ICategoryResponse>(`${this.api.actions}/${id}`, action);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.actions}/${id}`);
  }
}
