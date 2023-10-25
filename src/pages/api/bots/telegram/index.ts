import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { type NextApiRequest, type NextApiResponse } from "next/types";
import TelegramBot from 'node-telegram-bot-api';
import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { customAlphabet } from 'nanoid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const context = await createTRPCContext({
            req,
            res
        });
        const caller = appRouter.createCaller(context);
        const bot = new TelegramBot(env.TELEGRAM_BOT_SECRET);
        const body = req.body as TelegramBot.Update;

        if (body.message?.text?.match(/\/start/)) {
            const nanoid = customAlphabet('1234567890', 12);
            const OTP = nanoid();
            const formattedOTP = OTP.match(new RegExp('.{1,4}', 'g'))!.join("-");

            await caller.notification.addVerificationToken({
                identifier: body.message.chat.id.toString(),
                token: formattedOTP,
            });
            await bot.sendMessage(body.message.chat.id, `To connect this telegram to your account in Sols Estate, copy the code below and past it on the website.\n\nCode: ${formattedOTP}`);
        }

        if (body.message?.text?.match(/\/info/)) {
            await bot.sendMessage(body.message.chat.id, 'Use command /start to get verification code for this telegram account');
        }

        res.status(200).json({ data: { status: 'success' } });
    } catch (err) {
        if (err instanceof TRPCError) {
            const httpStatusCode = getHTTPStatusCodeFromError(err);

            res.status(httpStatusCode).json({ error: { message: err.message } });
            return;
        }

        res.status(500).json({
            error: { message: `Error handling request from telegram bot, ${JSON.stringify(err)}` },
        });
    }
}