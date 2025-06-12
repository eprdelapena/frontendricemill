import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TDataGetLending, TParamsEditLending } from "@/schema/main_schema";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1EditLending = (
  lendingData: TDataGetLending,
  callbackFunction?: () => any,
  setEditModal?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [payload, setPayload] = useState<TParamsEditLending>(lendingData);
  const editLending = async () => {
    Swal.fire({
      title: "Processing...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Start the loader animation
      },
    });
    const response = await Instance_ApiLocal.localEditLending({
      ...payload,
    });
    Swal.close();
    if (response.status !== EAPIStatusCodes.success) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong please try again later",
        icon: "error",
        confirmButtonText: "Try again",
      });
    }

    Swal.fire({
      title: "Item successfully edited",

      icon: "success",
      confirmButtonText: "Confirm",
    });

    if (callbackFunction) {
      callbackFunction();
    }

    return;
  };

  return {
    payload,
    setPayload,
    editLending,
  };
};

export default useV1EditLending;
