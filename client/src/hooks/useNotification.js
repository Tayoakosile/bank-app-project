import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { axios, postRequestToServer } from "../api/api";
import useStore from "../zustand";

const useNotification = () => {
  const { userId } = useParams();
  const [allNotification, setAllNotification] = useState([]);

  const { isLoading, isError, isSuccess, data } = useQuery(
    "notifications",
    () => {
      return postRequestToServer("/notification", { _id: userId });
    }
  );

  //   Get all notification on load

  useEffect(() => {
    if (!isLoading) {
      isSuccess && setAllNotification(data.data.message.notifications);
    }
  }, [isLoading, isError, isSuccess, data]);

  return { isLoading, isError, isSuccess, allNotification };
};

export default useNotification;
