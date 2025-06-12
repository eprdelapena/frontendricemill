
import type React from "react"
import ReactDOM from "react-dom"
import { X, Calendar, Receipt, PencilIcon, Trash2 } from "lucide-react"
import useV1GetInstallment from "@/hooks/api_hooks/usev1getinstallment"
import type { TDataGetLending } from "@/schema/main_schema"
import { useEffect } from "react"
import useV1DeleteInstallment from "@/hooks/api_hooks/usev1deleteinstallment"

export type TDataGetInstallment = {
  id: number
  orderid: string
  username: string
  installment: string
  installmentdate: string
  description: string
}

const CViewInstallmentModal = (props: {
  setViewInstallmentModal: (value: React.SetStateAction<boolean>) => void;
  getLending: () => any
  lendingData: TDataGetLending
}) => {
  const { setViewInstallmentModal, lendingData, getLending } = props
  const { getInstallment, installmentList, setInstallmentList } = useV1GetInstallment()
  const {getV1DeleteInstallment} = useV1DeleteInstallment();

  const callbackHandler = async () => {
    await Promise.all([
        getInstallment({
            transactionid: lendingData.transactionid,
        }),
        getLending()
    ])
  }
  useEffect(() => {
    getInstallment({
      transactionid: lendingData.transactionid,
    })
  }, [])

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative border-[1px] border-black animate-slide-up flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-2xl">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Installment Details</h3>
                <p className="text-orange-100">View all installments for this lending transaction</p>
              </div>
            </div>
            <button
              onClick={() => setViewInstallmentModal(false)}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-all duration-200 transform hover:scale-110"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Table Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="rounded-2xl border-[1px] border-black overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">



                    <th className="py-4 px-6 text-left font-bold">
                      <div className="inline-flex items-center gap-2 whitespace-nowrap">
                        <Calendar className="h-4 w-4" />
                        <span>Date</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left font-bold">
                      <div className="inline-flex items-center gap-2 whitespace-nowrap">
                        <Receipt className="h-4 w-4" />
                        <span>Amount</span>
                      </div>
                    </th>

                    <th className="py-4 px-6 text-left font-bold">
                      <div className="inline-flex items-center gap-2 whitespace-nowrap">
                        <Trash2 className="h-4 w-4" />
                        <span
 
                        >Delete</span>
                      </div>
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {installmentList && installmentList.length > 0 ? (
                    installmentList.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`${
                          index % 2 === 0 ? "bg-orange-50" : "bg-white"
                        } hover:bg-orange-100 transition-colors duration-150 animate-fade-in-delay-${(index % 6) + 1}`}
                      >
                        <td className="py-4 px-6 border-t text-black border-gray-200">{new Date(item.regdate).toLocaleString()}</td>
                        <td className="py-4 px-6 border-t text-black border-gray-200"> ₱ {Number(item.payment).toLocaleString()}</td>

                        <td className="py-4 px-6 border-t text-red-500 border-gray-200">
                            <p 
                                className="cursor-pointer"
                                onClick={() => {
                                    getV1DeleteInstallment({
                                        paymentid: item.paymentid,
                                        transactionid: item.transactionid
                                    }, callbackHandler)
                                }}    
                            >
                                Delete
                            </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500 italic">
                        No installment records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          {installmentList && installmentList.length > 0 && (
            <div className="mt-6 bg-orange-50 rounded-2xl border-[1px] border-black p-6 shadow-lg animate-fade-in-delay-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold">Total Installments</h4>
                  <p className="text-gray-600">{installmentList.length} payments</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Total Amount</h4>
                  <p className="text-2xl font-bold text-orange-600">
                  ₱
                    {installmentList
                      .reduce((sum, item) => sum + Number.parseFloat(item.payment), 0)
                      .toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions - Always Visible */}
        <div className="bg-white px-8 py-6 border-t-4 border-black flex justify-end space-x-4 flex-shrink-0 rounded-b-2xl">
          <button
            type="button"
            className="px-8 py-4 bg-white text-gray-700 rounded-2xl hover:bg-gray-100 transition-all duration-200 font-bold border-[1px] border-gray-400 hover:border-gray-600 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
            onClick={() => {
              setViewInstallmentModal(false)
            }}
          >
            Close
          </button>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(50px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes fade-in-delay-1 {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fade-in-delay-2 {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fade-in-delay-3 {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fade-in-delay-4 {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fade-in-delay-5 {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fade-in-delay-6 {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }

          .animate-slide-up {
            animation: slide-up 0.4s ease-out;
          }

          .animate-fade-in-delay-1 {
            animation: fade-in-delay-1 0.6s ease-out 0.1s both;
          }

          .animate-fade-in-delay-2 {
            animation: fade-in-delay-2 0.6s ease-out 0.2s both;
          }

          .animate-fade-in-delay-3 {
            animation: fade-in-delay-3 0.6s ease-out 0.3s both;
          }

          .animate-fade-in-delay-4 {
            animation: fade-in-delay-4 0.6s ease-out 0.4s both;
          }

          .animate-fade-in-delay-5 {
            animation: fade-in-delay-5 0.6s ease-out 0.5s both;
          }

          .animate-fade-in-delay-6 {
            animation: fade-in-delay-6 0.6s ease-out 0.6s both;
          }
        `}</style>
      </div>
    </div>,
    document.body,
  )
}

export default CViewInstallmentModal
