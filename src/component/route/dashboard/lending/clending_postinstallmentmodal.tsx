
import useV1PostLending from "@/hooks/api_hooks/usev1postlending";
import type React from "react";
import ReactDOM from "react-dom";
import {
  X,
  User,
  DollarSign,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Plus,
} from "lucide-react";
import useV1PostInstallment from "@/hooks/api_hooks/usev1postinstallment";
import { TDataGetInstallment, TDataGetLending } from "@/schema/main_schema";

const CPostInstallmentModal = (props: {
  setPostInstallmentModal: (value: React.SetStateAction<boolean>) => void;
  lendingData: TDataGetLending,
  getLending: () => any
}) => {
  const { setPostInstallmentModal, lendingData, getLending} = props;
  const {payload, setPayload, postInstallment} = useV1PostInstallment(lendingData, getLending, setPostInstallmentModal)

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative border-4 border-black animate-slide-up flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-2xl">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Record payment
                </h3>
                <p className="text-orange-100">
                  Register payment to the system
                </p>
              </div>
            </div>
            <button
              onClick={() => setPostInstallmentModal(false)}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-all duration-200 transform hover:scale-110"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
          <form className="space-y-6">

            {/* Lending Amount */}
            <div className="space-y-3 animate-fade-in-delay-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                <DollarSign className="h-4 w-4 text-orange-500" />
                Payment
              </label>
              <div className="relative">
                <input
                  className="w-full p-4 pl-12 rounded-2xl text-black border-3 border-black bg-gray-50 focus:bg-white focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 hover:shadow-lg font-medium placeholder:text-gray-400 text-lg"
                  value={payload?.payment || ""}
                  placeholder="Enter lending amount..."
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPayload((prev) => ({
                      ...prev,
                      payment: e.target.value,
                    }));
                  }}
                />
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>


          </form>
        </div>

        {/* Footer Actions - Always Visible */}
        <div className="bg-white px-8 py-6 border-t-4 border-black flex justify-end space-x-4 flex-shrink-0 rounded-b-2xl">
          <button
            type="button"
            className="px-8 py-4 bg-white text-gray-700 rounded-2xl hover:bg-gray-100 transition-all duration-200 font-bold border-4 border-gray-400 hover:border-gray-600 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
            onClick={() => {
              setPostInstallmentModal(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-bold shadow-xl hover:shadow-2xl border-4 border-black transform hover:scale-105 flex items-center gap-3 text-lg"
            onClick={() => {
                postInstallment();
            }}
          >
            <Plus className="h-6 w-6" />
            Register payment
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
  );
};

export default CPostInstallmentModal;
