import { NextResponse } from "next/server";
import {
    TDataGetLending,
  TParamsDeleteProduct,
  TParamsDeleteUser,
  TParamsPostOrderUser,
  TUserSession,
} from "@/schema/main_schema";
import client from "@/api/api_main";
import { EAPIStatusCodes } from "@/enum/main_enum";
import authOptions from "@/utils/next_auth";
import { getServerSession } from "next-auth";
import { getRequestConfig } from "@/utils/main_utils";
import ExcelJS from "exceljs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error();
    }

    const config = getRequestConfig({
      session: (session as unknown as { user: TUserSession }).user.token,
    });


    const response = await client.mainDownloadLending(config);
    const result = response?.data as TDataGetLending[] || [];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Lending Records");

    if (!result.length) {
      worksheet.addRow(["No records found"]);
    } else {
      // Add header row using object keys
      const headers = Object.keys(result[0]);
      worksheet.addRow(headers);


    if (!result.length) {
      worksheet.addRow(["No records found"]);
    } else {
      const headers = Object.keys(result[0]);
      worksheet.addRow(headers);
      result.forEach((row) => {
        worksheet.addRow(headers.map((key) => row[key as keyof typeof row]));
      });
    }
    const buffer = await workbook.xlsx.writeBuffer();
    const safeFilename = `lending_${Date.now()}.xlsx`;

    return new Response(buffer, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(
            safeFilename
          )}`,
        },
      });

  } 
}catch(error){
    console.error;
    return error;
}
}
