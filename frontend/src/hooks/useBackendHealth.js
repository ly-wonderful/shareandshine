import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useBackendHealth() {
  return useQuery({
    queryKey: ['backend-health'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/health');
      return response.data;
    },
    retry: 1,
    staleTime: 30000, // 30 seconds
  });
}
