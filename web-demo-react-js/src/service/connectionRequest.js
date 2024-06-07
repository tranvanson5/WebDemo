export const postRequest = async (api, jwt, form) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (jwt) {
            headers['Authorization'] = `Bearer ${jwt}`;
        }

        const response = await fetch(api, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(form),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        let data;
        try {
            data = await response.json();
        } catch (error) {
            console.warn('Response data may not be JSON');
        }
        return data;
    } catch (error) {
        console.error('Error while making POST request:', error);
        throw error;
    }
};


export const getRequest = async (api, jwt) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (jwt) {
            headers['Authorization'] = `Bearer ${jwt}`;
        }
        const response = await fetch(api, {
            method: 'GET',
            headers: headers,
            credentials: 'include' // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        let data;
        try {
            data = await response.json(); // Attempt to parse as JSON first
        } catch (error) {
            console.warn('Response data may not be JSON');
        }

        return data;
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Network error occurred. Please check your internet connection and try again.');
        }
        console.error('Error while making GET request:', error);
        throw error;
    }
};


export const putRequest = async (api, jwt, form) => {
    try {
        const response = await fetch(api, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify(form)
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while making PUT request:', error);
        throw error;
    }
};

export const deleteRequest = async (api, jwt) => {
    try {
        const response = await fetch(api, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while making DELETE request:', error);
        throw error;
    }
};
