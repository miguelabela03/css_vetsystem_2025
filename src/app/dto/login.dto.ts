export class Login {
    private _password: string;
    private _username: string;

    constructor(username: string, password: string) {
        this._password = password;
        this._username = username;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }

    public get username(): string {
        return this._username;
    }

    public set username(username: string) {
        this._username = username;
    }
}
