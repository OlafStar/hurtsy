import {getCurrentUser} from '~lib/session';
import {publicProcedure, privateProcedure, router} from './trpc';
import {TRPCError} from '@trpc/server';
import prismadb from '~lib/prismadb';
import {companyCreationSchema} from '~validations/company';

export const appRouter = router({
    // authCallback: publicProcedure.query(async () => {
    //     const user = await getCurrentUser();
    //     //@TODO change name to id
    //     if (!user?.name || user?.email) {
    //         throw new TRPCError({code: 'UNAUTHORIZED'});
    //     }
    //     const dbUser = prismadb.user.findFirst({
    //         where: {
    //             email: user.email,
    //         },
    //     });
    //     if (!dbUser) {
    //     }
    //     return {success: true};
    // }),
    getUserCompany: privateProcedure.query(async ({ctx}) => {
        const {
            user: {id},
        } = ctx;

        return await prismadb.company.findUnique({
            where: {
                id,
            },
        });
    }),
    createCompany: privateProcedure
        .input(companyCreationSchema)
        .mutation(async ({input, ctx}) => {
            const {
                user: {id},
            } = ctx;

            const existingCompany = await prismadb.company.findUnique({
                where: {
                    userId: id,
                },
            });

            if (existingCompany) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'User already has a company.',
                });
            }
            // Validate input
            const validatedInput = companyCreationSchema.safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            // Create company in the database
            // const company = await prismadb.company.create({
            //     data: {
            //         name: validatedInput.data.companyName,
            //         city: validatedInput.data.city,
            //         phone: validatedInput.data.phoneNumber,
            //         website: validatedInput.data.website,
            //         street: validatedInput.data.address,
            //         postCode: validatedInput.data.postalCode,
            //         country: validatedInput.data.country,
            //         establishment: validatedInput.data.established,
            //         type: validatedInput.data.type,
            //         userId: ctx.user.id,
            //     },
            // });

            const company = {
                name: validatedInput.data.companyName,
                city: validatedInput.data.city,
                phone: validatedInput.data.phoneNumber,
                website: validatedInput.data.website,
                street: validatedInput.data.address,
                postCode: validatedInput.data.postalCode,
                country: validatedInput.data.country,
                establishment: validatedInput.data.established,
                type: validatedInput.data.type,
                userId: ctx.user.id,
            };

            console.log(company);

            return company;
        }),
});

export type AppRouter = typeof appRouter;
