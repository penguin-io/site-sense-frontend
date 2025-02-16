const fetchAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('No access token found');
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json'
    };

    const response = await fetch(url, { ...options, headers });
    return response;
};

export default fetchAuth;