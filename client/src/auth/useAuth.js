import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { reactLocalStorage } from "reactjs-localstorage";
import { axios } from "../api/api";
import useStore from "../zustand/index";

const useAuth = () => {
  // const toast = useToast();
  // const history = useHistory();
  // const location = useLocation().pathname;
  const [isUserInActive, setisUserInActive] = useState(false);

  /* Detect if the user has been inactive for the past 3 minutes */
  // const activityDetector = createActivityDetector({
  //   timeToIdle: 10000,
  // });

  /* 
 useEffect(() => {
  activityDetector.on('idle', () => {
   reactLocalStorage.clear('userToken')
   const newToken = reactLocalStorage.get('userToken')
   if (!newToken) {
    setisUserInActive(true)
    history.push('/login')
    toast({
     render: () => (
      <Box color="white" p={3} bg="blue.500">
       You were logged out due to inactivity on your account for a long while
      </Box>
     ),
     duration: 4000,
     position: 'top-right',
     variant: 'left-accent',
     status: 'warning',
     isClosable: true,
    })
   }
  })
  return () => {
   activityDetector.stop()
  }
 }, [activityDetector, history, location,toast])
 */
  /* Detect if the user has been inactive for the past 3 minutes */

  const { setUserId, userId, setData, email, setUser } = useStore(
    (state) => state
  );
  const token = reactLocalStorage.get("userToken");

  const { error, isLoading, isSuccess, data, isError } = useQuery(
    "authorize",
    async () => {
      const { data } = await axios.get("/authorize", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
    {
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (!isError) {
      if (isSuccess) {
        if (data) {
          setUserId(data.authorizedData._id);
          setData(data.authorizedData.email);
          setUser(data.authorizedData);
          console.log(data);
        }
      }
    }
  }, [isSuccess, data, isError]);

  return {
    error,
    isLoading,
    isSuccess,
    data,
    isError,
    userId,
    email,
    isUserInActive,
    setisUserInActive,
  };
};

export default useAuth;
