import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://giving-sunrise-e8474a0478.strapiapp.com/api/ig',
      { cache: 'no-store' }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
