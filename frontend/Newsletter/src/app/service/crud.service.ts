import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Contact } from './Contact';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  rest_api: string ='http://localhost:27017/api'

  //Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private httpClient:HttpClient) { }


  //Serviço de adicionar contato
  AddContact(data: Contact): Observable<any>{
    let api_url = '${this.rest_api}/add-contact'
    return this.httpClient.post(api_url,data).pipe(
      catchError(this.handleError)
      )
  }
  // Obter todos os contatos
  GetContacts(){
    return this.httpClient.get('${this.rest_api}');
  }

  //Obter contato especifico
  GetContact(id:any): Observable<any>{
  let api_url =  '${this.res_api}/read-contact/${id}';
  return this.httpClient.get(api_url,{headers: this.httpHeaders}).pipe(
    map((res:any)=>{return res || {}}),
    catchError(this.handleError)
    )
  }

  //Alterar contato

  updateContact(id:any, data:any): Observable<any>{
    let api_url = '${this.rest_api}/read-contact/${id}';
    return this.httpClient.put(api_url,data,{headers:this.httpHeaders}).pipe(catchError(this.handleError))
  }

  //Deletar contato

  deleteContact(id:any):Observable<any>{
    let api_url = '$this.rest_api}delete-contact/${id}'
    return this.httpClient.delete(api_url,{headers:this.httpHeaders}).pipe(catchError(this.handleError))

  }


  handleError(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = 'Error Code: ${error.status}\nMessage ${error.message}'
    }
    console.log(errorMessage);
    return throwError(errorMessage);

  }
}

