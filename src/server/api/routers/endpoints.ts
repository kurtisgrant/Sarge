import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const endpointsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  addMessage: protectedProcedure
    .input(z.object({
      content: z.string(),
      sender: z.string(),
      type: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const message = await ctx.prisma.message.create({
        data: {
          ...input,
          timestamp: new Date(),
        },
      });
      return message;
    }),

  getMessages: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.message.findMany({
      orderBy: { timestamp: 'asc' },
    })
  }),

  deleteMessage: protectedProcedure
    .input(z.object({
      index: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const message = await ctx.prisma.message.delete({
        where: { id: input.index.toString() },
      });
      return message;
    }),

});
