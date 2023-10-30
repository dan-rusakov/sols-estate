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
import { cellRangeValue, formatDateToDateString, getCommissionLabel, getComplexName } from "~/utils/table";
import { getNameFromDict, propertyTypeDict } from "~/utils/dictionaries";
import { findAllApartmentLocationsHandler, findAllDistrictsHandler, findAllVillaLocationsHandler } from "./locationDict";
import { validatePropertyTypeAnyValue } from "~/utils/entities";

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
        const trackings = await findAllTrackingsHandler(ctx, {
            district: input.district,
            city: input.city,
            region: input.region,
            propertyType: validatePropertyTypeAnyValue(input.propertyType),
            villaLocation: input.villaLocation,
            apartmentLocation: input.apartmentLocation,
            priceMin: input.priceMin,
            priceMax: input.priceMax,
            roomsMin: input.roomsMin,
            roomsMax: input.roomsMax,
            commission: input.commission,
            byDeclaration: true,
        });
        const agentIds = trackings.data[1].map(tracking => tracking.agentId);

        const [agents, userAgent, districts, villaLocations, apartmentLocations] = await Promise.all([
            findAllAgentsHandler(ctx, {
                page: null,
                agentStatusType: null,
                agentIds,
            }),
            findAgentHandler(ctx, {
                agentId: input.userId,
            }),
            findAllDistrictsHandler(ctx),
            findAllVillaLocationsHandler(ctx),
            findAllApartmentLocationsHandler(ctx),
        ]);

        const telegramIds = agents.data[1].map(agent => agent.notificationInfo?.telegramId).filter(Boolean) as string[];
        const { lineLink, telegramLink, whatsappLink, viberLink } = userAgent.data?.contactInfo ?? {};
        const createMarkdownLink = (title: string, link: string) => `[${title}](${link})`;
        const agentContacts = (lineLink?: string | null, telegramLink?: string | null, whatsappLink?: string | null, viberLink?: string | null): string => {
            return `${lineLink ? createMarkdownLink('Line', lineLink) : ''} ${telegramLink ? createMarkdownLink('TG', telegramLink) : ''} ${whatsappLink ? createMarkdownLink('Whatsapp', whatsappLink) : ''} ${viberLink ? createMarkdownLink('Viber', viberLink) : ''}`
        }
        const propertyTypeWithNull = validatePropertyTypeAnyValue(input.propertyType);

        const bot = new TelegramBot(env.TELEGRAM_BOT_SECRET);
        const notificationPromises = telegramIds.map(id => bot.sendMessage(
            id,
            `New request that fits one of your trackings was added\\.
            
location: *${getNameFromDict(
                input.district,
                districts?.data,
            )}*
complex name: *${getComplexName(
                input.villaLocation,
                input.apartmentLocation,
                villaLocations?.data,
                apartmentLocations?.data,
            )}*
property type: *${propertyTypeWithNull ? propertyTypeDict[propertyTypeWithNull] : 'Any'}*
price: *${cellRangeValue(input.priceMin, input.priceMax)}*
commission: *${getCommissionLabel(input.commission)}*
dates of stay: *${cellRangeValue(
                input.checkinDate
                    ? formatDateToDateString(input.checkinDate)
                    : null,
                input.checkoutDate
                    ? formatDateToDateString(input.checkoutDate)
                    : null,
            )}*
rooms: *${cellRangeValue(input.roomsMin, input.roomsMax)}*
agent name: *${userAgent.data?.firstName ?? ''} ${userAgent.data?.lastName ?? ''}*
contacts: ${agentContacts(lineLink, telegramLink, whatsappLink, viberLink)}`,
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