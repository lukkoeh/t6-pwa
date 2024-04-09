export function cookieExists ( name ) {
    const cookieArray = document.cookie.split(';');

    for ( let i = 0; i < cookieArray.length; i++ ) {
        let cookie = cookieArray[i].trim()
        if ( cookie.indexOf(name + '=') === 0 ) {
            return true;
        }
    }

    return false;
}
export function deleteCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}
