import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Datastore } from '../datastore/datastore';
import { User } from '../../app/models/user';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthServiceProvider {
  currentUserId: number;
  currentToken: string;
  currentUser: User;

  constructor(private datastore: Datastore, private http: Http) { }

  public login(credentials) {
    if (credentials.identification === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      let headers = new Headers();
      headers.append('Content-Type', 'application/vnd.api+json');
      return Observable.create(observer => {
        
            this.http.post('http://174.138.7.193/api/tokens', {
              username: credentials.identification,
              password: credentials.password,
            }, {headers: headers}).map(res => res.json())
            .subscribe(data => {
              this.currentUserId = data.meta.id;
              this.currentToken = data.meta.token;

              let access = (this.currentUserId != null && this.currentToken != null);
              
              observer.next(access);
              observer.complete();
            });
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(credentials.password, salt, (err, hash) => {
          let user = this.datastore.createRecord(User, {
            username: credentials.username,
            email: credentials.email,
            password: hash,
            birthdate: credentials.birthdate
          });

          user.save().subscribe(
            (user: User) => {
              console.log(user);
            }
          );
        });
      });
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserId() {
    return this.currentUserId;
  }

  public getUser() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    headers.append('Authorization', 'Bearer '+this.currentToken);

    return new Promise((resolve,reject) => { 
      this.datastore.findRecord(User, String(this.currentUserId), null, headers).subscribe(
        (user: User) => {
          resolve(user);
        }
      );
    });
    
  }

  public getToken() {
    return this.currentToken;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUserId = null;
      this.currentToken = null;
      observer.next(true);
      observer.complete();
    });
  }

}
