"use client"

import { EParamsDefault } from "@/enum/main_enum"
import useV1GetLending from "@/hooks/api_hooks/usev1getlending"
import { useEffect, useState } from "react"
import CLendingTableBody from "./clending_tablebody"
import {
  Search,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Database,
  FileText,
  CreditCard,
  User,
  Phone,
  Mail,
  MapPin,
  Pencil,
} from "lucide-react"
import CLendingAddLendingModal from "./clending_addlendingmodal"

const totalPages = 9999
const pageSize = 5

const CLendingTable = () => {
  const { getLending, payload, setPayload, lendingData } = useV1GetLending()
  const [addLendingModal, setAddLendingModal] = useState<boolean>(false)
  const [editLendingModal, setEditLendingModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [debouncedSearchText, setDebouncedSearchText] = useState(payload.searchText)

  // Fetch lending data when searchStatus, pagination, or debounced search changes
  useEffect(() => {
    setIsLoading(true)
    getLending().finally(() => {
      setIsLoading(false)
    })
  }, [payload.searchStatus, payload.skip, payload.searchText])

  // Debounce effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPayload((prev) => ({
        ...prev,
        searchText: debouncedSearchText,
        skip: 1,
      }))
    }, 500) // 500ms debounce

    return () => clearTimeout(delayDebounce)
  }, [debouncedSearchText])

  const handleNext = () => {
    setPayload((prev) => ({
      ...prev,
      skip: (prev.skip ?? 1) < totalPages ? (prev.skip ?? 1) + 1 : (prev.skip ?? 1),
    }))
  }

  const handlePrevious = () => {
    setPayload((prev) => ({
      ...prev,
      skip: (prev.skip ?? 1) > 1 ? (prev.skip ?? 1) - 1 : (prev.skip ?? 1),
    }))
  }

  const paginationNumbers = Array.from(
    { length: Math.min(pageSize, totalPages - Math.floor((payload?.skip || 1 - 1) / pageSize) * pageSize) },
    (_, i) => i + 1 + Math.floor((payload?.skip || 1 - 1) / pageSize) * pageSize,
  )

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 animate-fade-in">
        <div>
          <h2 className="text-4xl font-bold text-black mb-2 flex items-center gap-3">
            <Database className="h-8 w-8 text-orange-500 animate-pulse" />
            Lending List
          </h2>
          <p className="text-gray-600">Manage your lending transactions efficiently</p>
        </div>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl border-[1px] border-black"
          onClick={() => setAddLendingModal(true)}
        >
          <Plus className="h-5 w-5" />
          Create New Lending
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-[1px] border-black rounded-2xl shadow-2xl p-8 mb-8 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Filter className="h-6 w-6 text-orange-500 animate-bounce" />
          <h3 className="text-xl font-bold text-black">Search & Filter Options</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Search Category */}
          <div className="space-y-3 animate-fade-in-delay-1">
            <label className="text-sm font-bold text-black flex items-center gap-2">
              <Search className="h-4 w-4 text-orange-500" />
              Search Category
            </label>
            <select
              className="w-full border-[1px] border-black rounded-xl p-3 text-black bg-white focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 hover:shadow-lg font-medium"
              value={payload.searchCategory}
              onChange={(e) => {
                setPayload((prev) => ({
                  ...prev,
                  searchCategory: e.target.value as
                    | EParamsDefault.all
                    | EParamsDefault.transactionid
                    | EParamsDefault.fullname,
                  skip: 1,
                }))
              }}
            >
              <option value={EParamsDefault.all}>None</option>
              <option value={EParamsDefault.transactionid}>By Transaction ID</option>
              <option value={EParamsDefault.fullname}>By Fullname</option>
            </select>
          </div>

          {/* Search Input */}
          {payload.searchCategory !== "all" && (
            <div className="space-y-3 animate-slide-in-right">
              <label className="text-sm font-bold text-black flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-500" />
                Search Term
              </label>
              <input
                type="text"
                placeholder={`Search by ${
                  payload.searchCategory === EParamsDefault.transactionid ? "transaction ID" : "full name"
                }`}
                className="w-full border-[1px] border-black rounded-xl p-3 text-black focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 hover:shadow-lg font-medium placeholder-gray-500"
                onChange={(e) => setDebouncedSearchText(e.target.value)}
              />
            </div>
          )}

          {/* Payment Status */}
          <div className="space-y-3 animate-fade-in-delay-2">
            <label className="text-sm font-bold text-black flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-orange-500" />
              Payment Status
            </label>
            <select
              className="w-full border-[1px] border-black rounded-xl p-3 text-black bg-white focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 hover:shadow-lg font-medium"
              value={payload.searchStatus}
              onChange={(e) => {
                setPayload((prev) => ({
                  ...prev,
                  searchStatus: e.target.value as EParamsDefault.all | EParamsDefault.unpaid | EParamsDefault.paid,
                  searchText: "",
                  skip: 1,
                }))
              }}
            >
              <option value={EParamsDefault.all}>None</option>
              <option value={EParamsDefault.paid}>Paid</option>
              <option value={EParamsDefault.unpaid}>Not paid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border-[1px] border-black rounded-2xl shadow-2xl overflow-hidden mb-8 animate-slide-up-delay relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-2xl">
            <div className="flex flex-col items-center gap-4">
              <Database className="h-12 w-12 text-orange-500 animate-spin" />
              <p className="text-lg font-bold text-orange-500 animate-pulse">Loading lending data...</p>
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-4 divide-black">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-center text-sm font-bold">Transaction Date</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Transaction ID</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Remaining Balance</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Payment</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Full Name</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Actions</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Mobile Number</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Email</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y-2 divide-gray-200">
              {lendingData.length > 0 ? (
                lendingData.map((item, index) => (
                  <CLendingTableBody key={index} lending={item} getLending={getLending} index={index} />
                ))
              ) : (
                <tr className="animate-pulse">
                  <td className="py-12 px-6 text-black text-center text-xl font-bold" colSpan={9}>
                    <div className="flex flex-col items-center gap-4">
                      <Database className="h-16 w-16 text-orange-500 animate-bounce" />
                      <span>No data available</span>
                      <p className="text-gray-600 text-sm">Try adjusting your search filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center animate-fade-in-up">
        <nav className="inline-flex rounded-2xl shadow-2xl border-[1px] border-black overflow-hidden">
          <button
            onClick={handlePrevious}
            disabled={payload.skip === 1}
            className={`relative inline-flex items-center px-4 py-3 text-sm font-bold transition-all duration-200 ${
              payload.skip === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-orange-500"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="ml-1">Previous</span>
          </button>

          {paginationNumbers.map((page, index) => (
            <button
              key={page}
              onClick={() => setPayload((prev) => ({ ...prev, skip: page }))}
              className={`relative inline-flex items-center px-4 py-3 text-sm font-bold transition-all duration-200 transform hover:scale-105 ${
                payload.skip === page ? "bg-orange-500 text-white" : "bg-white text-black hover:bg-orange-100"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={payload.skip === totalPages}
            className={`relative inline-flex items-center px-4 py-3 text-sm font-bold transition-all duration-200 ${
              payload.skip === totalPages ? "bg-gray-200 text-gray-400" : "bg-white hover:bg-orange-500"
            }`}
          >
            <span className="mr-1">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>

      {addLendingModal && <CLendingAddLendingModal setAddLendingModal={setAddLendingModal} getLending={getLending} />}
    </div>
  )
}

export default CLendingTable
