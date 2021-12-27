import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { axios } from "../api/api";
import useAuth from "../auth/useAuth";
const useUpdateProfile = () => {
  const { mutate, isSuccess: isFileSuccess } = useMutation((data) => {
    const fileUpload = axios.post(`/profile/upload/${data}`);
    return fileUpload;
  });

  const { mutate: mutateFile, isLoading } = useMutation((data) => {
    const fileUpload = axios.post("/profile/upload", data);
    return fileUpload;
  });
  // Copy users account number to dashboard
  const [userAccountNumber, setUserAccountNumber] = useState("123456");
  // Copy users account number to dashboard
  const [updateUserProfile, setUserProfile] = useState({ image: null });
  const { data, isSuccess } = useAuth();
  const [userInfo, setUser] = useState();

  useEffect(() => {
    if (isSuccess) {
      setUser(data.authorizedData);
      setUserAccountNumber(data.authorizedData.account.account_number);
    }
  }, [isSuccess, data]);
  const { firstname, lastname, email, username, profileImg, account } =
    userInfo !== undefined && userInfo;

  const handleImageUpload = (e) => {
    const data = new FormData();
    if (e.target.files && e.target.files[0]) {
      const userProfileImage = e.target.files;
      //   Set temporary profile image while original sends to database
      setUserProfile({ image: userProfileImage[0] });
      //   Set temporary  profile image original sends to database

      /* Send users id */
      const userProfileId = userInfo._id;
      mutate(userProfileId);
      /* Send users id */
      /* After sending then send */

      if (isFileSuccess) {
          const usersProfileImage = userProfileImage[0];
          const usersImage = new FormData()
          usersImage.append("file", userProfileImage[0]);
          mutateFile(usersImage);
        console.log("file success", userProfileImage[0]);
        // image compression options
        // const options = {
        //   maxSizeMB: 0.7,
        //   maxWidthOrHeight: 1920,
        //   useWebWorker: true,
        // };
        // try {
        //   const compressedFile = imageCompression(usersProfileImage, options);
        //   console.log(
        //     "compressedFile instanceof Blob",
        //     compressedFile instanceof Blob
        //   );
        //   // true
        //   const blobFile =
        //     compressedFile && new File([compressedFile], compressedFile.name);
        //   console.log(blobFile, "blobFile");
        //   compressedFile && data.append("file", blobFile);
        //     compressedFile && mutateFile(data);
        //    // write your own logic
        // } catch (error) {
        //   console.log(error,"error here");
        //   return error;
        // }
      }
    }
  };
  const imageDisplayLink = `http://localhost:4000/user/display/${profileImg}`;
  console.log(imageDisplayLink);
  return {
    handleImageUpload,
    updateUserProfile,
    firstname,
    lastname,
    email,
    account,
    isSuccess,
    username,
    profileImg,
    imageDisplayLink,
    isLoading,
    userAccountNumber,
  };
};

export default useUpdateProfile;
