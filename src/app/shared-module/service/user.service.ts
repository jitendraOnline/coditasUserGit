import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private repoUrl="https://api.github.com/users/"
  constructor(private http: HttpClient) { }


  //method to get all the github users
  searchUsers(search:string,pagenumber:number){
    return this.http.get("https://api.github.com/search/users?q="+search+"&page="+pagenumber).pipe(
      catchError(this.handleError)
    );
  }

  //to to get user repositoy
  getUserRepo(username:string){
    return this.http.get(this.repoUrl+username+"/repos").pipe(
      catchError(this.handleError)
    );

  }

//error handler method
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      error.error);
  };

}
