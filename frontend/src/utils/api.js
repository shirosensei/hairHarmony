class API {
    constructor() {
        this.baseURL = import.meta.env.VITE_API_URL;
        this.token = null;
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    getToken() {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = this.getToken();

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...API(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers,
            }
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    get(endpoint) {
        return this.request(endpoint);
    }

    post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    patch(endpoint, body) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body),
        });
    }

    delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE',
        });
    }
}

export const api = new API();