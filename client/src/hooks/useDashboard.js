import { useEffect, useState } from "react";
import useStore from "../zustand";
import randomize from "randomatic";
import { usePaystackPayment } from "react-paystack";

const useDashboard = () => {
  const [userDetails, setUserDetails] = useState("***");

  //   Get users full details
  const { user } = useStore((state) => state);

  useEffect(() => {
    if (user) {
      setUserDetails(user);
    }
  }, []);

  const { balance } = userDetails.account !== undefined && userDetails.account;

  return { balance };
};

export default useDashboard;
