// authToken service - the auth provider functions will send the token here to be able to be used by axios when sending the token on protected backend routes. Only because axios can't use the react hook automatically or directly read the token which is set in state. it's a bridge

// define token variable to reassign
let authToken: string | null = null;

// To use in Auth Provider - this is called in the login() provider function to update authToken for axios to retrieve
export function storeToken(token: string) {
    authToken = token;
}

// To use in axios.ts - called to get the auth token for the axios configuration
export function getAuthToken() {
    return authToken;
}

