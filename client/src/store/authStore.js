// src/store/authStore.js
import axios from 'axios';
import { create } from 'zustand';

const useAuthStore = create((set) => ({
    // Initial state
    name: '',
    email: '',
    password: '',

    // Actions to update state
    setName: (name) => set({ name }),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),

    // Login function
    login: async (email, password) => {
        try {
            // Simulate an API call for login (replace with your actual API call)
            const response = await axios.post("http://localhost:5000/auth/login", {
                email,
                password
            });

            console.log(response)
        } catch (error) {
            return { success: false, message: 'Login failed: ' + error.message };
        }
    },

    // Optional: Clear user data (e.g., for logout)
    clearUser: () => set({ name: '', email: '', password: '' }),
}));


export default useAuthStore;