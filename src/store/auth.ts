import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    abha_id?: string;
    license_id?: string;
    hospital?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    role: 'citizen' | 'doctor' | null;
    login: (user: User, token: string, role: 'citizen' | 'doctor') => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            role: null,
            login: (user, token, role) => set({ user, token, role }),
            logout: () => set({ user: null, token: null, role: null }),
        }),
        {
            name: 'health-auth-storage',
        }
    )
);
