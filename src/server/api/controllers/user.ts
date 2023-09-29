import { type Prisma } from "@prisma/client";
import { type updateUserEmailInput } from "../schema/user";
import { type InnerTRPCContext } from "../trpc";
import { updateUserEmail } from "../services/user";

export const updateUserEmailHandler = async (ctx: InnerTRPCContext, input: updateUserEmailInput) => {
    try {
        const fintUserWhere: Prisma.UserWhereUniqueInput = {
            id: input.userId,
        }
        const updateUserEmailData: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput> = {
            email: input.email,
        };

        const user = await updateUserEmail(ctx, fintUserWhere, updateUserEmailData);

        return {
            status: 'success',
            data: user,
        };
    } catch (err: unknown) {
        throw err;
    }
};