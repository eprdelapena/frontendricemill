import { NextResponse } from "next/server";
import {
  TDataGetLending,
  TUserSession,
} from "@/schema/main_schema";
import client from "@/api/api_main";
import authOptions from "@/utils/next_auth";
import { getServerSession } from "next-auth";
import { getRequestConfig } from "@/utils/main_utils";
import ExcelJS from "exceljs";

export async function POST(req: Request): Promise<Response> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const config = getRequestConfig({
      session: (session as unknown as { user: TUserSession }).user.token,
    });

    const response = await client.mainDownloadLending(config);
    const result = (response?.data as TDataGetLending[]) || [];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Lending Records");

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

  } catch (error) {
    console.error("Error in download_lending route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
