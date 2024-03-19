export const postRequest = async (api, jwt, form) => {
    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include', // include cookies in the request
            body: JSON.stringify(form)
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while making POST request:', error);
        throw error;
    }
};

export const getRequest = async (api, jwt) => {
    try {
        const response = await fetch(api, {
            method: 'GET',
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
