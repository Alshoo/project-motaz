import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";  


export async function POST(request) {
  // الحصول على توكن NextAuth من الطلب
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const backendResponse = await fetch("https://dash.motazmcqs.com/api/login-googel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token.accessToken }),
  });

  if (!backendResponse.ok) {
    return NextResponse.json({ error: "Backend error" }, { status: backendResponse.status });
  }

  const data = await backendResponse.json();
  // نتوقع إن data تحتوي على بيانات المستخدم وتوكن خاص باسم customToken

  // ضبط الكوكيز باستخدام API الكوكيز المدمجة
  const response = NextResponse.json({ user: data.user });
  response.cookies.set("customToken", data.token, {
    httpOnly: true,  // كوكيز متاحة بس من جهة السيرفر
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,  // لمدة يوم واحد (تقدر تغير حسب المطلوب)
    path: "/",
  });

  return response;
}
