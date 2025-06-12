import { TDataGetLending} from "@/schema/main_schema";
import React, { useState } from "react";

import useV1DeleteLending from "@/hooks/api_hooks/usev1deletelending";

import CLendingEditModal from "./clending_editlendingmodal";
import CPostInstallmentModal from "./clending_postinstallmentmodal";
import CViewInstallmentModal from "./clending_installmenthistorymodal";

const CLendingTableBody = (props: {
  lending: TDataGetLending;
  index: number;
  getLending(): Promise<void>;
}) => {
  const { lending, index, getLending } = props;
  const [lendingModal, setLendingModal] = useState<boolean>(false);
  const [postInstallmentModal, setPostInstallmentModal] = useState<boolean>(false);
  const [viewHistoryModal, setViewHistoryModal] = useState<boolean>(false);
  const { deleteLending } = useV1DeleteLending(getLending);

  return (
    <tr key={index} className="border-t">

      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
        {new Date(lending?.transactiondate).toDateString() || ""}
      </td>
      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
        {lending?.transactionid || ""}
      </td>
      <td
        className={`py-2 px-4 text-center font-semibold ${Number(lending.balance) - Number(lending.payment) > 0 ? "text-red-500" : "text-green-500"} `}
      >
        {Number(lending.balance) - Number(lending.payment) > 0 ? (
          <>
            {(
              Number(lending.balance) - Number(lending.payment)
            ).toLocaleString()}{" "}
            ₱
          </>
        ) : (
          <>PAID</>
        )}
      </td>

      <td
        className={`py-2 px-4  text-center text-green-500 font-semibold text-black uppercase`}
      >
        {lending?.payment || "0.00"} ₱
      </td>
      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
        {lending?.fullname || ""}
      </td>
      <td className="py-2 px-4 flex gap-x-4 font-semibold text-red-500 whitespace-nowrap">
        <p
          className="cursor-pointer"
          onClick={() => {
            deleteLending(lending.transactionid);
          }}
        >
          Delete
        </p>
        <p
          className="cursor-pointer text-blue-500 font-semibold"
          onClick={() => {
            setLendingModal(true);
          }}
        >
          Edit
        </p>
        <p
          className="cursor-pointer text-green-500 font-semibold"
          onClick={() => {
            setPostInstallmentModal(true);
          }}
        >
          Add payment
        </p>
        <p
          className="cursor-pointer text-purple-500 font-semibold"
          onClick={() => {
            setViewHistoryModal(true);
          }}
        >
          View payment history
        </p>
      </td>
      <td className={`py-2 px-4  text-center text-black text-black uppercase`}>
        {lending?.mobile || ""}
      </td>
      <td className={`py-2 px-4  text-center text-black text-black`}>
        {lending?.email || ""}
      </td>
      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
        {lending?.address || ""}
      </td>
      {lendingModal && (
        <CLendingEditModal
          setEditLendingModal={setLendingModal}
          getLending={getLending}
          lendingData={lending}
        />
      )}
      {
        postInstallmentModal &&
        <CPostInstallmentModal 
        getLending={getLending}
          setPostInstallmentModal={setPostInstallmentModal}
          lendingData={lending}
        />
      }
      {
        viewHistoryModal &&
        <CViewInstallmentModal 
          lendingData={lending}
          getLending={getLending}
          setViewInstallmentModal={setViewHistoryModal}
        />
      }
      {/* 

      {editStatusModal && (
        <COrdersModalEditStatus
          setEditStatusModal={setEditStatusModal}
          getLending={getV1GetOrderUser}
          order={order}
        />
      )} */}
    </tr>
  );
};

export default CLendingTableBody;
