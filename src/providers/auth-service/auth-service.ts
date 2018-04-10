import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Datastore } from '../datastore/datastore';
import { User } from '../../app/models/user';
import * as bcrypt from 'bcryptjs';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Headers } from '@angular/http';

@Injectable()
export class AuthServiceProvider {
  private currentUser: User;

  constructor(
    private datastore: Datastore,
    private httpClient: HttpClient,
    private storage: Storage,
  ) { this.isAuthenticated(); }

  login(credentials) {
    return Observable.create(observer => {
      this.httpClient.post(this.datastore.getBaseUrl() + '/tokens', credentials,
        { headers: new HttpHeaders({ 'Content-Type': 'application/vnd.api+json' }) })
        .subscribe(
          (data) => {
            this.storage.set('token', data['meta']['token']).then(token => {
              this.setHeader(token);
              this.storage.set('user_id', data['meta']['id']).then(_ => {
                this.fetchCurrentUser().then(_ => {
                  observer.next(true);
                  observer.complete();
                });
              });
            });
          },
          (err) => {
            observer.error();
            observer.complete();
          });
    });
  }

  setHeader(token) {
    this.datastore.headers = new Headers({ 'Authorization': 'Bearer ' + token});
  }

  fetchCurrentUser() {
    return new Promise<any>((resolve) => {
      if(this.currentUser) {
        resolve(this.currentUser);
      }
      return this.storage.get('user_id').then(id => {
        return this.datastore.findRecord(User, id).subscribe(
          (user) => {
            this.currentUser = user;
            resolve(user);
          },
          (err) =>{
            resolve(null);
          }
        )
      });
    });
  }

  logout() {
    this.currentUser = null;
    this.datastore.headers = null;
    this.storage.remove('token');
    this.storage.remove('user_id');
  }

  isAuthenticated() {
    return this.storage.get('token').then(token => {
      if(token) {
        this.setHeader(token);
        return this.fetchCurrentUser().then(user => {
          return user != null;
        });
      }
      else {
        return false;
      }
    });
  }


  register(userParams) {
    return Observable.create(observer => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userParams.password, salt, (err, hash) => {
          userParams.avatar = 'https://www.w3schools.com/howto/img_avatar.png';
          let user = {...userParams, ...{password: hash}};
          this.datastore.createRecord(User, user).save().subscribe(
            success => {
              observer.next(true);
              observer.complete();
            },
            error => {
              observer.error();
              observer.complete();
            }
          );
        });
      });
    });
  }

  changePassword(password) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        this.currentUser.password = hash;
        this.currentUser.save().subscribe();
      });
    });
  }
}
