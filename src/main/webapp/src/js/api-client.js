export async function fetchStacks() {
    return await fetch('api/stack', {
        headers: {
            'Accept': 'application/json'
        }
    })
}

export async function fetchCards(stackId) {
    return await fetch('api/card/' + stackId, {
        headers: {
            'Accept': 'application/json'
        }
    })
}
