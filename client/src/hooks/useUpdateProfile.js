import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useClipboard } from "@chakra-ui/react";
import { axios } from "../api/api";
import imageCompression from "browser-image-compression";
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
  const { hasCopied, onCopy } = useClipboard(userAccountNumber);

  const { firstname, lastname, email, username, profileImg, account } =
    userInfo !== undefined && userInfo;

  const handleImageUpload = (e) => {
    const data = new FormData();
    if (e.target.files && e.target.files[0]) {
      const userProfileImage = e.target.files;
      setUserProfile({ image: userProfileImage[0] });

      /* Send users id */
      const userSongId = userInfo._id;
      mutate(userSongId);
      /* Send users id */
      /* After sending then send */
      if (isFileSuccess) {
        console.log(handleImageUpload(userProfileImage));
        async function handleImageUpload(userProfileImage) {
          const imageFile = userProfileImage[0];
          console.log(
            "originalFile instanceof Blob",
            imageFile instanceof Blob
          ); // true
          console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log(
              "compressedFile instanceof Blob",
              compressedFile instanceof Blob
            ); // true
            const blobFile = new File([compressedFile], compressedFile.name);
            data.append("file", blobFile);

            await mutateFile(data); // write your own logic
          } catch (error) {
            console.log(error);
            return error;
          }
        }
      }
    }
  };
  const imageDisplayLink = `http://localhost:4000/user/display/${profileImg}`;
  //   copies acccount to clipboard

    const CopyAccountToClipboard = () => {
      
  };
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
     hasCopied
  };
};

export default useUpdateProfile;
