import create from 'zustand'

// Zustand State Management for My Banking App
const useStore = create(set => ({
 email: '',
 user: '',
 userId: '',
 isUserAuthorized: '',

 setData: data => set({ email: data }),

 setUser: user => set({ user }),
 setUserId: status => set({ userId: status }),
 setUserAuthorized: status => set({ isUserAuthorized: status }),
}))

export default useStore
