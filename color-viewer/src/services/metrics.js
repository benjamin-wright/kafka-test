const metricsApi = {
    getColors
}

export default metricsApi;

async function getColors() {
    return fetch(
        'https://metrics-api.ponglehub.co.uk',
        {
            method: 'GET',
            mode: 'cors'
        }
    ).then(response => response.json())
}