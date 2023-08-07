// AuthContext.tsx
// src/context

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://fix-api.fly.dev';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            // console.log("Stored Token:", token);
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    token,
                    authenticated: true,
                });

            }
        }
        loadToken();
    }, []);


    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/auth/user/register`, { email, password });
        } catch (e) {
            return { error: true, msg: (e as any).response.data.message };
        }
    };

    const login = async (email: string, password: string) => {
        try {
          const result = await axios.post(`${API_URL}/auth/user/login`, { email, password });
          
        //   console.log(result);
      
          if (result && result.data) {
            setAuthState({
              token: result.data.accessToken,
              authenticated: true,
            });
      
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;
      
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken);
      
            console.log("Login successful");
            return result;
          } else {
            return { error: true, msg: 'No se pudo iniciar sesión' };
          }
        } catch (e) {
          return { error: true, msg: (e as any).response.data.message };
        }
      };

    const logout = async () => {
            await SecureStore.deleteItemAsync(TOKEN_KEY);

            //update https headers
            axios.defaults.headers.common['Authorization'] = '';

            setAuthState({
                token: null,
                authenticated: false,
            });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};