import { NextRequest, NextResponse } from "next/server";
import payload from "payload";
import { CollectionAfterChangeHook } from "payload/types";

export async function POST(req: NextRequest) {
    const { phone, otp } = await req.json();
    const now = new Date();

    try {
        const { docs } = await payload.find({
            collection: "users",
            where: {
                phone: { equals: phone },
                otp: { equals: otp },
                otpExpiry: { greater_than_equal: now.toISOString() },
            },
        });

        if (docs.length === 0) {
            return NextResponse.json(
                { error: "کد نامعتبر یا منقضی شده" },
                { status: 400 }
            );
        }

        // ایجاد توکن دسترسی
        const token = await payload.createToken({ id: docs[0].id });

        return NextResponse.json({
            token,
            user: docs[0],
        });
    } catch (error) {
        return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
    }
}
