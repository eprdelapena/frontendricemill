import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import Swal from "sweetalert2";

const useV1DeleteLending = (callbackFunction?: () => any) => {
    const deleteLending = async (transactionid: string) => {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this item? this action cannot be undone",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });
  
      if (!confirmation.isConfirmed) {
        return;
      }

        Swal.fire({
            title: "Processing...",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading(); // Start the loader animation
            },
          });
        const response = await Instance_ApiLocal.localDeleteLending({
            transactionid
        })
        Swal.close();
        if(response.status !== EAPIStatusCodes.success){
           Swal.fire({
                title: "Error",
                text: "Something went wrong please try again later",
                icon: "error",
                confirmButtonText: "Try again",
              });
        }

         Swal.fire({
            title: "Item successfully deleted",

            icon: "success",
            confirmButtonText: "Confirm",
          });

          if(callbackFunction){
            callbackFunction()
          }

          return;
      
    }

    return {
        deleteLending
    }
}

export default useV1DeleteLending;