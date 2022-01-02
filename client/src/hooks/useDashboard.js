import { useEffect, useState } from "react";
import useStore from "../zustand";

const useDashboard = () => {
  const [userDetails, setUserDetails] = useState("***");

  //   Get users full details
  const { user } = useStore((state) => state);

  useEffect(() => {
    if (user) {
      setUserDetails(user);
    }
  }, [user]);

  const { balance } = userDetails.account !== undefined && userDetails.account;
  console.log(balance);

  return { balance };
};

export default useDashboard;
