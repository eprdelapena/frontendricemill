import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TDataGetLending } from "@/schema/main_schema"
import { useState } from "react"
import Swal from "sweetalert2";

const useV1PostInstallment = (lendingData: TDataGetLending, callbackFunction?: ()  => any, setPostInstallmentModal?: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [payload, setPayload] = useState<TDataGetLending>({
    ...lendingData,
    payment: "0.00"
  });

  const postInstallment = async () => {
    try{
      if(isNaN(Number(payload.payment)) || Number(payload.payment) === 0 ||  !/^\d+(\.\d{1,2})?$/.test(payload.payment)){
        Swal.fire({
          title: "Error",
          text: "Payment must be a number greater than 0 and must not exceed two decimal places",
          icon: "error",
          confirmButtonText: "Try again",
        });
        return;
      }
      Swal.fire({
        title: "Processing...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await Instance_ApiLocal.localPostInstallment({
        transactionid: payload.transactionid,
        payment: payload.payment
      });
      Swal.close();

      if(response.status !== EAPIStatusCodes.success){
        Swal.fire({
          title: "Error",
          text: "Error processing your request please try again later",
          icon: "error",
          confirmButtonText: "Try again",
        });
        return;
      }

      if(callbackFunction){
        callbackFunction();
      }
      if (setPostInstallmentModal) {
        setPostInstallmentModal(false);
      }

    Swal.fire({
      title: "Success",
      text: "Installment successfully posted",
      icon: "success",
      confirmButtonText: "Confirm",
    });

    }
    catch(error){
      console.error(error);
      return error;
    }
  }

  return {
    postInstallment,
    payload,
    setPayload
  }
}

export default useV1PostInstallment;