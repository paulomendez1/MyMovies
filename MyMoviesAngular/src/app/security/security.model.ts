export interface userCredentials {
    email: string;
    password: string;
}

export interface authenticationResponse {
    token: string;
    expiration: Date;
}

export interface resetPwCredentials{
    email: string;
}

export interface newPwCredentials{
    email: string;
    password: string;
    token: string;
}