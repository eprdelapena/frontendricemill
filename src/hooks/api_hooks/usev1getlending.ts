import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes, EParamsDefault } from "@/enum/main_enum";
import { TDataGetLending, TParamsGetLending } from "@/schema/main_schema";
import { useState } from "react";

const useV1GetLending = () => {
  const [lendingData, setLendingData] = useState<TDataGetLending[]>([]);
  const [payload, setPayload] = useState<Partial<TParamsGetLending>>({
    skip: 1,
    searchCategory: EParamsDefault.all,
    searchText: "",
    searchStatus: EParamsDefault.all,
    begin: undefined,
    end: undefined,
  });

  const getLending = async () => {
    const response = await Instance_ApiLocal.localGetLending({
      ...payload,
    });

    if (response.status !== EAPIStatusCodes.success) {
      return;
    }

    setLendingData(response.data as TDataGetLending[]);
  };

  return {
    getLending,
    payload,
    lendingData,
    setPayload,
  };
};

export default useV1GetLending;
