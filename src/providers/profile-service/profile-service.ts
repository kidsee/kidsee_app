import { Injectable } from '@angular/core';
import {Datastore} from "../datastore/datastore";
import {Headers} from "@angular/http";
import {User} from "../../app/models/user";
import {AuthServiceProvider} from "../auth-service/auth-service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class ProfileServiceProvider {

    constructor(private datastore: Datastore, private auth: AuthServiceProvider) {  }

    public updateUserProperty(userProperty, value)
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        headers.append('Authorization', 'Bearer '+this.auth.currentToken);
        this.datastore.findRecord(User, String(this.auth.currentUserId), null, headers).subscribe(
            (user: User) => {
                user[userProperty] = value;
                user.save(null, headers).subscribe();
            }
        );
    }

    public changePassword(password)
    {
        let self = this;
        let headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        headers.append('Authorization', 'Bearer '+this.auth.getToken());
        bcrypt.genSalt(10, function(err, salt)
        {
            bcrypt.hash(password, salt, (err, hash) => {

                self.datastore.findRecord(User, String(self.auth.getUserId()), null, headers).subscribe(
                    (user: User) => {
                        user.password = hash;
                        user.save(null, headers).subscribe();
                    }
                );
            });
        });
    }
}
