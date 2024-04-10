import {is_offline, stacks} from "@/js/state";
import {f7} from "framework7-vue";
import {fetchStacks} from "@/js/api-client";

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

export async function updateOfflineStatus() {
    try {
        const online_check = await fetch("/api/online");
        if (online_check.ok) {
            is_offline.value = false;
            await loadStacks();
        }
    } catch (e) {
        is_offline.value = true;
        f7.dialog.alert("The server is offline. You are entering offline mode.")
        await loadStacks();
    }
}
async function pushClientStack(stack) {
    const response = await fetch("api/stack/", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stack)
    })
}
export async function loadStacks() {
    stacks.value = []
    if (is_offline.value) {
        let localStacks = []
        for (let key in localStorage) {
            if (key.startsWith("stack_")){
                localStacks.push(JSON.parse(localStorage.getItem(key)))
            }
        }
        stacks.value = localStacks
    } else {
        const response = await fetchStacks()
        if (response.status === 401) {
            f7.loginScreen.open("#my-login-screen")
        } else {
            response.json().then(async data => {
                for (const remoteStack of data) {
                    const clientStack = JSON.parse(localStorage.getItem("stack_" + remoteStack.id));
                    if (clientStack) {
                        const client_last_update = new Date(clientStack.last_update)
                        const remote_last_update = new Date(remoteStack.last_update)
                        if (remote_last_update > client_last_update) {
                            stacks.value.push(remoteStack)
                            localStorage.setItem('stack_' + remoteStack.id, JSON.stringify(remoteStack))
                        } else if (remote_last_update < client_last_update) {
                            stacks.value.push(clientStack)
                            await pushClientStack(clientStack)
                        } else {
                            stacks.value.push(clientStack)
                        }
                    } else {
                        stacks.value.push(remoteStack)
                        localStorage.setItem('stack_' + remoteStack.id, JSON.stringify(remoteStack))
                    }
                }
            })

        }
    }
    stacks.value.sort((a,b) => {
        return a.id - b.id
    })
}
