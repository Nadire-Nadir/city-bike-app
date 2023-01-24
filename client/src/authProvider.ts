import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

export default (type: any, params: any) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request('https://helsinki-city-bike-281t.onrender.com/signin', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({
                'content-type': 'application/json',
            })           
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json()
            })
            .then(({ token }) => {
                localStorage.setItem('token', token);
            });
        
    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        return Promise.resolve();

    }

    if (type === AUTH_ERROR) {
        const status = params.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }

    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject({ redirectTo: '/login' });
    }


    return Promise.reject('Unknown method');
}