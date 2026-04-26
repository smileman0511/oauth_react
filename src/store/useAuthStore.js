import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        combine(
            // state
            {
                member: null,
                isAuthenticated: false
            },
            // setter
            (set) => ({
                setMember: (member) => set({member}),
                setIsAuthenticated: (status) => set({ isAuthenticated: status })
            })
        ),
        {
            name : "auth-store",
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                member: state.member
            })
        }
    )
)

export default useAuthStore;