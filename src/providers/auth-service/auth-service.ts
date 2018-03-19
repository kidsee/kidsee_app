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
            return Observable.throw("Vul je gegevens in!");
        } else {
            let headers = new Headers();
            headers.append('Content-Type', 'application/vnd.api+json');
            return Observable.create(observer => {

                this.http.post('http://174.138.7.193/api/tokens', {
                    identification: credentials.identification,
                    password: credentials.password,
                }, {headers: headers}).map(res => res.json())
                    .subscribe(
                        (data) => {
                            this.currentUserId = data.meta.id;
                            this.currentToken = data.meta.token;

                            let access = (this.currentUserId != null && this.currentToken != null);

                            observer.next(access);
                            observer.complete();
                        },
                        (err) => {
                            observer.error("De combinatie van gebruikersnaam/email en wachtwoord is fout");
                        });
            });
        }
    }

    public register(credentials) {
        let self = this;
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Alstublieft, vul je gegevens in!");
        } else if (credentials.password.length < 8) {
            console.log(credentials.password.count);
            return Observable.throw("Het wachtwoord moet minimaal 8 karakters lang zijn.");
        }
        else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(credentials.password, salt, (err, hash) => {
                    let user = self.datastore.createRecord(User, {
                        username: credentials.username,
                        email: credentials.email,
                        password: hash,
                        birthdate: credentials.birthdate,
                        avatar: 'https://www.w3schools.com/howto/img_avatar.png'
                    });

                    user.save().subscribe(
                        (user: User) => { }
                    );
                });
            });
            return Observable.create(observer => {
                observer.next(true);
                observer.complete();
            });
        }
    }

    public changePassword(password)
    {
        let self = this;
        let headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        headers.append('Authorization', 'Bearer '+this.getToken());
        bcrypt.genSalt(10, function(err, salt)
        {
            bcrypt.hash(password, salt, (err, hash) => {

                self.datastore.findRecord(User, String(self.currentUserId), null, headers).subscribe(
                    (user: User) => {
                        user.password = hash;
                        user.save(null, headers).subscribe();
                    }
                );
            });
        });
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
