export class User {

    constructor(private _nom?: String,
        private _prenom?: String,
        private _email?: String,
        private _password?: String, private _type?: String) { }

    get nom() { return this._nom; }
    set nom(nom: String) { this._nom = nom }

    get prenom() { return this._prenom; }
    set prenom(prenom: String) { this._prenom = prenom }

    get email() { return this._email; }
    set email(email: String) { this._email = email }

    get password() { return this._password; }
    set password(password: String) { this._password = password }

    get type() { return this._type }
    set type(status: String) { this.type = status }

}