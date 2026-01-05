import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../shared/models/User';
import { IUserLogin } from '../../shared/interfaces/IUserLogin';
import { IUserRegister } from '../../shared/interfaces/IUserRegister';
import { delay, tap } from 'rxjs/operators';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;

  constructor() {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    // Mock login logic
    if (
      userLogin.email === 'admin@admin.com' &&
      userLogin.password === 'admin'
    ) {
      const user: User = {
        id: 1,
        email: 'admin@admin.com',
        name: 'Admin User',
        address: '123 Main St',
        token: '123456789',
        isAdmin: true,
      };
      return of(user).pipe(
        delay(1000),
        tap((user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
        })
      );
    }
    return of({} as User).pipe(delay(1000)); // Fail
  }

  register(userRegister: IUserRegister): Observable<User> {
    const user: User = {
      id: 1,
      email: userRegister.email,
      name: userRegister.name,
      address: userRegister.address,
      token: '123456789',
      isAdmin: false,
    };
    return of(user).pipe(
      delay(1000),
      tap((user) => {
        this.setUserToLocalStorage(user);
        this.userSubject.next(user);
      })
    );
  }

  updateProfile(user: User): Observable<User> {
    return of(user).pipe(
      delay(500),
      tap((updatedUser) => {
        this.setUserToLocalStorage(updatedUser);
        this.userSubject.next(updatedUser);
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
