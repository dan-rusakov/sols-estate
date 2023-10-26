import { type NextApiRequest, type NextApiResponse } from "next/types";
import TelegramBot from 'node-telegram-bot-api';
import { env } from "~/env.mjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const bot = new TelegramBot(env.TELEGRAM_BOT_SECRET);

        await bot.setWebHook(`${env.WEBSITE_HOST}/api/bots/telegram`);

        res.status(200).json({ data: { status: 'success' } });
    } catch (err) {
        res.status(500).json({
            error: { message: `Error connecting telegram bot, ${JSON.stringify(err)}` },
        });
    }
}