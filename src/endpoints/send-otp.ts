import type { PayloadRequest } from "payload";

import axios from "axios";

// Helper function to generate a random 6-digit OTP
const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

export const sendOTPHandler = async (
    req: PayloadRequest
): Promise<Response> => {
    let phone;
    try {
        if (typeof req.json !== "function") {
            return Response.json(
                { error: "Invalid request: Expected a JSON body." },
                { status: 400 }
            );
        }
        const body = await req.json();
        phone = body.phone;
    } catch (error) {
        return Response.json(
            { error: "بدنه درخواست نامعتبر است" },
            { status: 400 }
        );
    }

    if (!phone) {
        return Response.json(
            { error: "شماره همراه الزامی است" },
            { status: 400 }
        );
    }

    // Validate the phone number format
    if (!/^09\d{9}$/.test(phone)) {
        return Response.json(
            { error: "شماره همراه معتبر نیست" },
            { status: 400 }
        );
    }

    try {
        const { payload } = req;

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

        // Check if user exists
        const { docs: users } = await payload.find({
            collection: "users",
            limit: 1,
            where: { phone: { equals: phone } },
        });

        const userExists = users.length > 0;

        if (userExists) {
            // Update existing user with new OTP
            await payload.update({
                id: users[0].id,
                collection: "users",
                data: { otp, otpExpiry: otpExpiry.toISOString() },
            });
        } else {
            // Create a new user with the OTP
            await payload.create({
                collection: "users",
                data: {
                    email: `${phone}@example.com`,
                    emailVerified: null,
                    isVerified: false,
                    otp,
                    otpExpiry: otpExpiry.toISOString(),
                    phone,
                },
            });
        }

        // Send OTP via MeliPayamak service
        // Note: You need to configure MELI_PAYAMAK_API_URL and MELI_PAYAMAK_API_KEY in your .env file
        // The API payload structure might be different, adjust it according to the MeliPayamak documentation.
        // For example:
        /*
      await axios.post(process.env.MELI_PAYAMAK_API_URL, {
        to: phone,
        from: 'your_sender_id',
        text: `کد تایید شما: ${otp}`
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.MELI_PAYAMAK_API_KEY}`
        }
      });
      */
        let code;
        try {
            const res = await axios.post(`${process.env.MELI_PAYAMAK}`, {
                to: phone,
            });

            code = res.data.code; // فرض کنید API کد را در `data.code` برمی‌گرداند
        } catch (error: any) {
            console.error("خطا در ارسال پیامک:", error.message);
            return new Response(
                JSON.stringify({
                    message: "خطا در ارسال پیامک. لطفاً دوباره تلاش کنید.",
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 500,
                }
            );
        }

        return Response.json(
            {
                message: "کد تایید با موفقیت ارسال شد",
                success: true,
                userExists,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error in sendOTPHandler:", error);
        return Response.json(
            { error: error.message || "خطا در ارسال کد تایید" },
            { status: 500 }
        );
    }
};
