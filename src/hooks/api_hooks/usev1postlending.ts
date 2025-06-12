import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TParamsPostLending } from "@/schema/main_schema";
import { useState } from "react";
import Swal from "sweetalert2";
import { z } from "zod";

const useV1PostLending = (
  callbackFunction?: () => any,
  setPostModal?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [payload, setPayload] = useState<Partial<TParamsPostLending>>({
    fullname: "",
    address: "",
    mobile: "",
    email: "",
    balance: "0.00",
    transactiondate: new Date(),
  });

  const postLending = async () => {
    const parseResult = payloadSchema.safeParse(payload);

    if (!parseResult.success) {
      const errorMessage =
        Object.values(parseResult.error.formErrors?.fieldErrors || {})
          .flat()
          .filter(Boolean)[0] || "Validation error";

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (payload.fullname?.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Full name field must not be empty",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (
      isNaN(Number(payload.balance)) ||
      !/^\d+(\.\d{1,2})?$/.test(payload.balance as string)
    ) {
      Swal.fire({
        title: "Error",
        text: "Balance must be of type number and must be limited to two (2) decimal places only",
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
    const response = await Instance_ApiLocal.localPostLending({
      ...payload,
      fullname: payload.fullname as string,
    });
    Swal.close();
    if (response.status !== EAPIStatusCodes.success) {
      Swal.fire({
        title: "Error",
        text: "Error processing your request please try again later",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (callbackFunction) {
      callbackFunction();
    }

    if (setPostModal) {
      setPostModal(false);
    }

    Swal.fire({
      title: "Success",
      text: "Lending information submitted successfully!",
      icon: "success",
      confirmButtonText: "Confirm",
    });
  };

  return {
    payload,
    setPayload,
    postLending,
  };
};

export default useV1PostLending;

const payloadSchema = z.object({
  fullname: z.string().min(1, "Full name field must not be empty"),
  address: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),
  balance: z
    .string()
    .refine((value) => !isNaN(Number(value)), {
      message: "Balance value must be a number",
    })
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
      message: "Balance must not exceed two decimal places",
    }),
  transactiondate: z.date(),
});
