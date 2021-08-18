import create from 'zustand'

// Zustand State Management for My Banking App
const useStore = create(set => ({
 email: '',
 user: '',
 userId: '',
 isUserAuthorized: '',
 transferToUserDetail: undefined,
 searchUsersResult: '',

 setData: data => set({ email: data }),
 setUser: user => set({ user: user }),
 setSearchUsersResult: user => set({ searchUsersResult: user }),
 setUserId: status => set({ userId: status }),
 setUserAuthorized: status => set({ isUserAuthorized: status }),
 setTransferToUserDetails: userDetails =>
  set({ transferToUserDetail: userDetails }),
}))

export default useStore
