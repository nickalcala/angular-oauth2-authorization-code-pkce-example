import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from 'src/environments/environment';


@Component({
    templateUrl: './auth.component.html',
    styles: []
})
export class AuthComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private storage: LocalStorageService
    ) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params.code) {
                this.getAccessToken(params.code, params.state);
            }
        });
    }

    getAccessToken(code: string, state: string) {

        if (state !== this.storage.get('state')) {
            alert('Invalid state');
            return;
        }

        const payload = new HttpParams()
            .append('grant_type', 'authorization_code')
            .append('code', code)
            .append('code_verifier', this.storage.get('codeVerifier'))
            .append('redirect_uri', environment.oauthCallbackUrl)
            .append('client_id', environment.oauthClientId);

        this.http.post(environment.oauthTokenUrl, payload, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).subscribe(response => {
            console.log(response);
        });
    }
}
