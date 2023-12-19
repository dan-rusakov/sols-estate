import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import dayjs from "dayjs";
import { type NextApiRequest, type NextApiResponse } from "next/types";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { ISO_DATE_FORMAT } from "~/utils/date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const context = await createTRPCContext({
      req,
      res,
    });
    const caller = appRouter.createCaller(context);

    const dateSevenDaysBeforeCurrent = dayjs()
      .subtract(7, "day")
      .format(ISO_DATE_FORMAT);
    const declarations = await caller.declarations.getAllDeclarations({
      priceMin: null,
      priceMax: null,
      roomsMin: null,
      roomsMax: null,
      districtSlug: null,
      propertyTypeSlug: null,
      page: null,
      createdAtMax: dateSevenDaysBeforeCurrent,
    });
    const declarationIds = declarations?.data[1].map(
      (declaration) => declaration.id,
    );
    const deleteDeclarationPromises = declarationIds.map((declarationId) =>
      caller.declarations.removeDeclaration({
        declarationId,
      }),
    );

    await Promise.all(deleteDeclarationPromises);

    res.status(200).json({ data: { status: "success" } });
  } catch (cause) {
    if (cause instanceof TRPCError) {
      const httpStatusCode = getHTTPStatusCodeFromError(cause);

      res.status(httpStatusCode).json({ error: { message: cause.message } });
      return;
    }

    res.status(500).json({
      error: { message: `Error while deleting declaration` },
    });
  }
}
