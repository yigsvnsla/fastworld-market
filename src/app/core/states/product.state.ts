import { HttpErrorResponse } from '@angular/common/http';
import { Product } from "../models/product.interface"

export type StateProduct = Readonly<{
  loading:boolean,
  product:Product,
  httpErrorResponse:HttpErrorResponse | null
}>
