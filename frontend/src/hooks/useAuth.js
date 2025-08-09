import { useState, useCallback } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async ({ username, password, userType }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful login
      localStorage.setItem('user', JSON.stringify({
        username,
        userType,
        token: 'mock-token-123'
      }));
      
      return { success: true };
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async ({ username, password, email, phone, fullName, userType }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      return { success: true };
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  return { login, register, logout, isLoading };
};