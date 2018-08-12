var loggedIn = false;
var username = '';
var credentials = 'Public';

export function getLoggedIn(){
    return loggedIn;
}

export function setLoggedIn(current){
    loggedIn = current;
}

export function getUsername(){
    return username;
}

export function setUsername(name){
    username = name;
}

export function getCredentials(){
    return credentials;
}

export function setCredentials(name){
    credentials = name;
}