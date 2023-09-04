// AuthContext.tsx
// src/context

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


interface User{
    id: number;
    email: string;
    password: string;
    comuna: string;
}

interface AuthProps {
    authState?: {
        token: string | null;
        authenticated: boolean | null;
        user: User | null;
    };
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
    updateUser?: (user: User) => void;
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
        user: User | null;
    }>({
        token: null,
        authenticated: null,
        user: null, 
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
                    user: null,
                });
            }
        }
        loadToken();
    }, []);


    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/auth/vecino/register`, { email, password });
        } catch (e) {
            return { error: true, msg: (e as any).response.data.message };
        }
    };

    const login = async (email: string, password: string) => {
        try {
          const result = await axios.post(`${API_URL}/auth/vecino/login`, { email, password });
      
          if (result && result.data) {
            setAuthState({
              token: result.data.accessToken,
              authenticated: true,
              user: result.config.data,
            });
      
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;
      
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken);
      
            console.log("Login successful");
            console.log(result.config.data);
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
                user: null,
            });
    };

    const updateUser = (user: User) => {
        setAuthState({
            ...authState,
            user: user,
        });
    };


    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        updateUser: updateUser,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};