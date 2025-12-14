import axios from 'axios';
import { appParams } from '@/lib/app-params';

const { appId, serverUrl, token } = appParams;

// Create a custom axios instance connected to backend
const apiClient = axios.create({
  baseURL: serverUrl || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout for larger payloads
});

// Add request interceptor to include token if available
apiClient.interceptors.request.use((config) => {
  const currentToken = token || localStorage.getItem('app_access_token');
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorData = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    };
    return Promise.reject(errorData);
  }
);

// Custom client object to replace base44 SDK
export const api = {
  entities: {
    Event: {
      filter: async (filters = {}, sortBy = 'date') => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          params.append(key, value);
        });
        if (sortBy) {
          params.append('sort', sortBy);
        }
        return apiClient.get(`/api/events?${params.toString()}`);
      },
      findById: async (id) => {
        return apiClient.get(`/api/events/${id}`);
      },
      create: async (data) => {
        return apiClient.post('/api/events', data);
      },
      update: async (id, data) => {
        return apiClient.put(`/api/events/${id}`, data);
      },
      delete: async (id) => {
        return apiClient.delete(`/api/events/${id}`);
      },
    },
    EventRegistration: {
      create: async (data) => {
        return apiClient.post('/api/event-registrations', data);
      },
      filter: async (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          params.append(key, value);
        });
        return apiClient.get(`/api/event-registrations?${params.toString()}`);
      },
      findById: async (id) => {
        return apiClient.get(`/api/event-registrations/${id}`);
      },
      update: async (id, data) => {
        return apiClient.put(`/api/event-registrations/${id}`, data);
      },
      delete: async (id) => {
        return apiClient.delete(`/api/event-registrations/${id}`);
      },
    },
    Member: {
      create: async (data) => {
        return apiClient.post('/api/members', data);
      },
      filter: async (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          params.append(key, value);
        });
        return apiClient.get(`/api/members?${params.toString()}`);
      },
      findById: async (id) => {
        return apiClient.get(`/api/members/${id}`);
      },
      update: async (id, data) => {
        return apiClient.put(`/api/members/${id}`, data);
      },
      delete: async (id) => {
        return apiClient.delete(`/api/members/${id}`);
      },
    },
    Partner: {
      create: async (data) => {
        return apiClient.post('/api/partners', data);
      },
      filter: async (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          params.append(key, value);
        });
        return apiClient.get(`/api/partners?${params.toString()}`);
      },
      findById: async (id) => {
        return apiClient.get(`/api/partners/${id}`);
      },
      update: async (id, data) => {
        return apiClient.put(`/api/partners/${id}`, data);
      },
      delete: async (id) => {
        return apiClient.delete(`/api/partners/${id}`);
      },
    },
    Query: {
      execute: async (query) => {
        return apiClient.post('/api/query', { query });
      },
    },
  },
  auth: {
    // No authentication required for this app
    me: async () => {
      return { data: null };
    },
    login: () => {
      // No-op
    },
    logout: () => {
      // No-op
    },
    redirectToLogin: () => {
      // No-op
    },
  },
  integrations: {
    Core: {
      InvokeLLM: async (params) => {
        return apiClient.post('/api/integrations/llm', params);
      },
      SendEmail: async (params) => {
        return apiClient.post('/api/integrations/email', params);
      },
      SendSMS: async (params) => {
        return apiClient.post('/api/integrations/sms', params);
      },
      UploadFile: async (params) => {
        return apiClient.post('/api/integrations/upload', params);
      },
      GenerateImage: async (params) => {
        return apiClient.post('/api/integrations/image', params);
      },
      ExtractDataFromUploadedFile: async (params) => {
        return apiClient.post('/api/integrations/extract', params);
      },
    },
  },
};

// Export the axios client for direct use if needed
export const httpClient = apiClient;
