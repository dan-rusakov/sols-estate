import { type Prisma } from "@prisma/client";
import { type findVerificationTokenInput, type createVerificationTokenInput, type verifyTokenInput, type createNotificationInfoInput, type sendNotificationsInput } from "../schema/notification";
import { type InnerTRPCContext } from "../trpc";
import { createNotificationInfo, createVerificationToken, findVerificationToken } from "../services/notification";
import dayjs from "dayjs";
import { TRPCError } from "@trpc/server";
import { findAllTrackingsHandler } from "./trackings";
import { findAgentHandler, findAllAgentsHandler } from "./agents";
import TelegramBot from "node-telegram-bot-api";
import { env } from "~/env.mjs";
import { cellRangeValue, formatDateToDateStringMarkdown, getCommissionLabel } from "~/utils/table";
import { mapDictById, mapDictByName, mapDictBySlug } from "~/utils/dictionaries";
import { findDeclarationHandler } from "./declarations";
import { getTelegramDeepLink, getViberDeepLink, getWhatsappDeepLink } from "~/utils/url";

export const createVerificationTokenHandler = async (ctx: InnerTRPCContext, input: createVerificationTokenInput) => {
    try {
        const expires = dayjs().add(1, 'h').toISOString();
        const createTokenData: Prisma.NotificationVerificationTokenCreateArgs['data'] = {
            identifier: input.identifier,
            token: input.token,
            expires,
        };

        await createVerificationToken(ctx, createTokenData);

        return {
            status: 'success',
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const findVerificationTokenHandler = async (ctx: InnerTRPCContext, input: findVerificationTokenInput) => {
    try {
        const findTokenWhere: Prisma.NotificationVerificationTokenFindUniqueArgs['where'] = {
            token: input.token,
        };

        const verificationToken = await findVerificationToken(ctx, findTokenWhere);

        return {
            status: 'success',
            data: verificationToken,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const verifyTokenHandler = async (ctx: InnerTRPCContext, input: verifyTokenInput) => {
    try {
        const verificationToken = await findVerificationTokenHandler(ctx, {
            token: input.token,
        });

        if (!verificationToken.data) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Verification failed. Please, try again',
            });
        }

        if (dayjs(verificationToken.data.expires).isBefore(dayjs().toISOString())) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Verification failed. The code has expired',
            });
        }

        await createNotificationInfoHandler(ctx, {
            telegramId: verificationToken.data.identifier,
            userId: input.userId,
        });

        return {
            status: 'success',
            data: verificationToken,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const createNotificationInfoHandler = async (ctx: InnerTRPCContext, input: createNotificationInfoInput) => {
    try {
        const createNotificationData: Prisma.NotificationInfoCreateArgs['data'] = {
            telegramId: input.telegramId,
            agent: {
                connect: {
                    userId: input.userId
                }
            }
        };

        await createNotificationInfo(ctx, createNotificationData);

        return {
            status: 'success',
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const sendNotificationsHandler = async (ctx: InnerTRPCContext, input: sendNotificationsInput) => {
    try {
        const declaration = await findDeclarationHandler(ctx, {
            declarationId: input.declarationId,
        });

        const { district, city, region, propertyType, complex, priceMin, priceMax, commission, roomsMin, roomsMax, checkinDate, checkoutDate } = declaration.data ?? {};
        const trackings = await findAllTrackingsHandler(ctx, {
            districtSlug: district?.map(mapDictBySlug),
            citySlug: city?.map(mapDictBySlug),
            regionSlug: region?.map(mapDictBySlug),
            propertyTypeSlug: propertyType?.map(mapDictBySlug),
            complexId: complex?.map(mapDictById),
            priceMin,
            priceMax,
            roomsMin,
            roomsMax,
            commission,
            byDeclaration: true,
        });
        const agentIds = trackings.data[1].map(tracking => tracking.agentId);

        const [agents, userAgent] = await Promise.all([
            findAllAgentsHandler(ctx, {
                page: null,
                agentStatusType: null,
                agentIds,
            }),
            findAgentHandler(ctx, {
                agentId: input.userId,
            }),
        ]);

        const telegramIds = agents.data[1].map(agent => agent.notificationInfo?.telegramId).filter(Boolean) as string[];
        const { telegramLink, whatsappLink, viberLink } = userAgent.data?.contactInfo ?? {};
        const createMarkdownLink = (title: string, link: string) => `[${title}](${link})`;
        const agentContacts = (telegramLink?: string | null, whatsappLink?: string | null, viberLink?: string | null): string => {
            if (!telegramLink && !whatsappLink && !viberLink) {
                return '—';
            }

            return `${telegramLink ? createMarkdownLink('TG', getTelegramDeepLink(telegramLink)) : ''} ${whatsappLink ? createMarkdownLink('Whatsapp', getWhatsappDeepLink(whatsappLink)) : ''} ${viberLink ? createMarkdownLink('Viber', getViberDeepLink(viberLink)) : ''}`
        }

        const bot = new TelegramBot(env.TELEGRAM_BOT_SECRET);
        const notificationPromises = telegramIds.map(id => bot.sendMessage(
            id,
            `New request that fits one of your trackings was added\\.
            
location: *${district ? district.map(mapDictByName).join(', ') || '—' : '—'}*
complex name: *${complex ? complex.map(mapDictByName).join(', ') || '—' : '—'}*
property type: *${propertyType?.length ? propertyType.map(mapDictByName).join(', ') : 'Any'}*
price: *${cellRangeValue(priceMin ?? null, priceMax ?? null)}*
commission: *${typeof commission === 'number' ? getCommissionLabel(commission) : ''}*
dates of stay: *${cellRangeValue(
                checkinDate
                    ? formatDateToDateStringMarkdown(checkinDate)
                    : null,
                checkoutDate
                    ? formatDateToDateStringMarkdown(checkoutDate)
                    : null,
            )}*
rooms: *${cellRangeValue(roomsMin ?? null, roomsMax ?? null)}*
agent name: *${userAgent.data?.firstName ?? ''} ${userAgent.data?.lastName ?? ''}*
contacts: ${agentContacts(telegramLink, whatsappLink, viberLink)}`,
            {
                parse_mode: 'MarkdownV2',
            }
        ));

        await Promise.all(notificationPromises);

        return {
            status: 'success',
        };
    } catch (err: unknown) {
        throw err;
    }
};