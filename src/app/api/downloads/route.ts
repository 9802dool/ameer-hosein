import { readFile } from "fs/promises";
import path from "path";
import { type NextRequest } from "next/server";
import { products } from "@content/products";
import { readDownload } from "@/lib/orders";

export async function GET(request: NextRequest) {
  const payload = readDownload(request.nextUrl.searchParams.get("token") || "");
  if (!payload) return new Response("This download link is not valid.", { status: 403 });

  const product = products.find(
    (item) => item.id === payload.productId && item.fulfilment === "download" && item.downloadFile,
  );
  if (!product?.downloadFile || product.downloadFile.includes("..") || product.downloadFile.includes("/")) {
    return new Response("File not found.", { status: 404 });
  }

  try {
    const bytes = await readFile(path.join(process.cwd(), "private", "downloads", product.downloadFile));
    return new Response(bytes, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${product.downloadFile}"`,
      },
    });
  } catch {
    return new Response("File not found.", { status: 404 });
  }
}
