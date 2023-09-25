import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {Observable, map} from 'rxjs';
import {UserInterface} from 'src/app/shared/types/user.interface';
import {AuthResponseInterface} from '../types/authResponse.interface';
import {productionEnviroment} from 'src/enviroments/enviroment.production';

// This is the recommended approach from Angular
// to register service directly inside the
// root of our project.
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<UserInterface> {
    const url = productionEnviroment.apiUrl + '/users';

    // We need to convert the AuthReponseInterface to
    // an Observable<UserInterface>.
    // This is why we use pipe.
    // return this.http.post<AuthResponseInterface>(url, data);

    return this.http.post<AuthResponseInterface>(url, data).pipe(
      // We use map() to transform the data in the stream
      map((response) => response.user)
    );
  }
}
