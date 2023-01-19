class AuthToken {
 
  constructor(public _token: string) {
  }

  get Token() {
    return this._token;
  }

  set Token(newToken : string) {
    this._token = newToken;
  }
}

export const storedToken = new AuthToken(''); 