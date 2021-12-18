import create from "zustand";

// Zustand State Management for My Banking App
const useStore = create((set) => ({
  email: "",
  user: "",
  userToCreditDetails: {},
  userId: "",
  isUserAuthorized: "",
  transferToUserDetail: undefined,
  userAmountToFund: "",

  setData: (data) => set({ email: data }),
  setUser: (user) => set({ user: user }),
  setUserToCreditDetails: (userToCredit) => set({ userToCredit: userToCredit }),
  setUserAmountToFund: (user) => set({ userAmountToFund: user }),
  setUserId: (status) => set({ userId: status }),
  setUserAuthorized: (status) => set({ isUserAuthorized: status }),
  setTransferToUserDetails: (userDetails) =>
    set({ transferToUserDetail: userDetails }),
}));

export default useStore;
