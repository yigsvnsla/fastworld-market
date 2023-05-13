import { HttpErrorResponse } from '@angular/common/http';
import { Product } from "../models/product.interface"

export type StateCart = Readonly<{
  loading:boolean,
  list:Product[]
  httpErrorResponse:HttpErrorResponse | null
}>
