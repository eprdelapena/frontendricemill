import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import {
  TDataGetInstallment,
  TParamsInstallmentGet,
} from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";

const useV1GetInstallment = () => {
  const [installmentList, setInstallmentList] = useState<TDataGetInstallment[]>(
    [],
  );

  const getInstallment = async (params: TParamsInstallmentGet) => {
    const response = await Instance_ApiLocal.localGetInstallment(params);

    // if (response.status !== EAPIStatusCodes.success) {
    //   await signOut();
    //   return;
    // }

    setInstallmentList(response.data!);
    return;
  };

  return {
    getInstallment,
    installmentList,
    setInstallmentList,
  };
};

export default useV1GetInstallment;
