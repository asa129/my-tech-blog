import { NextResponse } from "next/server";

export async function GET() {
  const url: string = process.env.QIITA_API_URL!;
  const token: string = process.env.QIITA_API_TOKEN!;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status !== 200) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: res.status }
    );
  }
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
