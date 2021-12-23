import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { axios, postRequestToServer } from "../api/api";
import useStore from "../zustand";

const useNotification = () => {
  const { userId } = useStore((state) => state);
  const [allNotification, setAllNotification] = useState([]);

  const { mutate, isLoading, isError, isSuccess, data } = useMutation(
    (notification) => {
      return postRequestToServer("/notification", notification);
    }
  );

  //   Get all notification on load
  useEffect(() => {
    if (userId) {
      mutate({ _id: userId });
    }
  }, [userId]);

  useEffect(() => {
    if (!isLoading) {
      isSuccess && setAllNotification(data.data.message.notifications);
    }
    console.log(isLoading, isError, isSuccess, data, userId);
  }, [isLoading, isError, isSuccess, data]);

  return { isLoading, isError, isSuccess, allNotification };
};

export default useNotification;
