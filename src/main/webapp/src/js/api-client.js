export async function fetchStacks() {
    return await fetch('api/stack', {
        headers: {
            'Accept': 'application/json'
        }
    })
}
