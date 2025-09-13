import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = body.data;
  const ogpImageList = await Promise.all(
    data.map(async (qiita_data: any) => {
      const url = qiita_data.url;
      const res = await fetch(url, {
        headers: {
          "X-Linkpreview-Api-Key": process.env.LINKPREVIEW_API_KEY!,
        },
      });

      if (res.status != 200) {
        return NextResponse.json(
          { error: "Failed to fetch data" },
          { status: res.status }
        );
      }
      const data = await res.text();
      const $ = load(data);
      const ogpImage = $("meta[property='og:image']").attr("content");

      return { id: qiita_data.id, ogpImage: ogpImage };
    })
  );

  return NextResponse.json(ogpImageList, { status: 200 });
}
