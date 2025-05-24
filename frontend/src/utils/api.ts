// utils/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
}

export const apiRequest = async (
  endpoint: string, 
  options: RequestOptions = {}
): Promise<Response> => {
  const { requireAuth = true, ...requestOptions } = options;
  
  const config: RequestInit = {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      ...requestOptions.headers,
    },
  };

  // Add authorization header if auth is required
  if (requireAuth) {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (response.status === 401 && requireAuth) {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  }

  return response;
};

// Convenience methods
export const get = (endpoint: string, requireAuth = true) => 
  apiRequest(endpoint, { method: 'GET', requireAuth });

export const post = (endpoint: string, data: any, requireAuth = true) => 
  apiRequest(endpoint, { 
    method: 'POST', 
    body: JSON.stringify(data), 
    requireAuth 
  });

export const put = (endpoint: string, data: any, requireAuth = true) => 
  apiRequest(endpoint, { 
    method: 'PUT', 
    body: JSON.stringify(data), 
    requireAuth 
  });

export const del = (endpoint: string, requireAuth = true) => 
  apiRequest(endpoint, { method: 'DELETE', requireAuth });