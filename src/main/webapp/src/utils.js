export function restartAnimation ( element ) {
    element.style.animationName = 'none';
    requestAnimationFrame(() => {
        setTimeout(() => {
            element.style.animationName = '';
        }, 0)
    })
}

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