import { of, Observable, delay, throwError, concatMap } from 'rxjs';
import { Product } from './../models/product.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private httpClient: HttpClient) { }


  public find(): Observable<Product> {
    return of<Product>({ name: '', value: 5 })
      .pipe(
        delay(3000),
        concatMap((product) => {
          // return of(product)
          return throwError(()=>new HttpErrorResponse({ status: 404 }))
        })
      )
  }
}
