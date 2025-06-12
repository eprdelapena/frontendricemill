export enum EParamsDefault {
  IPAddress = "http://localhost",
  admin = "admin",
  user = "user",
  emptystring = "",
  succesStatusCode = 200,
  success = "success",
  ondelivery = "ondelivery",
  pending = "pending",
  transactionid = "transactionid",

  ongoing = "ongoing",

  documentid = "documentid",
  orderid = "orderid",
  title = "title",
  applicationid = "applicationid",
  regdate = "regdate",
  paymentid = "paymentid",
  username = "username",
  deliveryid = "deliveryid",
  accounttype = "accounttype",
  fullname = "fullname",

  unpaid = "unpaid",
  paid = "paid",
  extractionid = "extractionid",
  position = "position",
  email = "email",
  companyname = "companyname",
  truckplate = "truckplate",
  status = "status",
  affliation = "affliation",
  all = "all",
  permittee = "permittee",
  location = "location",
}

export enum EAccountType {
  admin = "admin",
  user = "user",
}

export enum EAdminRoutes {
  LOGIN = "/login",
  DASHBOARDLENDING = "/dashboard/lending",
  DASHBOARDORDERS = "/dashboard/orders",
  DASHBOARDPOSTORDER = "/dashboard/postorder",
  DASHBOARDPRODUCT = "/dashboard/product",
  DASHBOARDSUMMARY = "/dashboard/summary",
  DASHBOARDADMIN = "/dashboard/admin",
  DASHBOARDVIEWORDER = "/dashboard/vieworder",
}

export enum EAPIStatusCodes {
  success = 200,
  servererror = 500,
}
