import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0


  opciones: Object = {
    allowedConnections: ["Username-Password-Authentication","google-oauth2","facebook","twitter"],
    rememberLastLogin: false,
    socialButtonStyle: "big",
    languageDictionary: {"title":"Auth0"},
    language: "es",
    theme: {"logo":"https://cdn.auth0.com/website/playground/schneider.svg","primaryColor":"#40DF7D"},
      additionalSignUpFields: [{
        name: "Direccion",
        placeholder: "Ingresa tu direccion ",
        // The following properties are optional
        //icon: "https://example.com/assests/address_icon.png",
        //prefill: "street 123",
        validator: function(address) {
          return {
            valid: address.length >= 10,
            hint: "La direccion debe contener al menos 10 caracteres" // optional
          };
        }
      },
        {
          name: "nombre completo",
          placeholder: "Ingrese su nombre"
        }]

  }


lock = new Auth0Lock('HTzTC2Oh6Xq98WPfre5sLsSIX0HF6dz2', 'neoa.auth0.com', this.opciones);
  userProfile: Object;

  constructor(private router:Router) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });

    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    this.router.navigate(['/home']);
  }



  public getProfile(){
    if (this.authenticated()){
      return JSON.parse(localStorage.getItem('profile'));
    }else{
      return;
    }
  }
}
