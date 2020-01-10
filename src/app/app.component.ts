import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'angular-2-local-storage';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        private storage: LocalStorageService
    ) {
    }

    goToLoginPage() {

        const state = this.strRandom(40);
        const codeVerifier = this.strRandom(128);

        this.storage.set('state', state);
        this.storage.set('codeVerifier', codeVerifier);

        const codeVerifierHash = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64);

        const codeChallenge = codeVerifierHash
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');

        const params = [
            'response_type=code',
            'state=' + state,
            'client_id=' + environment.oauthClientId,
            'scope=read_user_data write_user_data',
            'code_challenge=' + codeChallenge,
            'code_challenge_method=S256',
            'redirect_uri=' + encodeURIComponent(environment.oauthCallbackUrl),
        ];

        window.location.href = environment.oauthLoginUrl + '?' + params.join('&');
    }

    private strRandom(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
