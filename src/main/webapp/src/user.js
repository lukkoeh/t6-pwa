export async function sendLoginRequest ( urlFormData ) {
    const response = await fetch("/auth", {
        method: 'post',
        body  : urlFormData
    });
    return response.ok;
}