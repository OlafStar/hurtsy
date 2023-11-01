import prismadb from '~lib/prismadb';
import {privateProcedure} from '../trpc';
import { TRPCError } from '@trpc/server';
import { companyCreationSchema } from '~validations/company';
import { getUserCompany } from '../utils/getUserCompany';

export const companyProcedures = {
    getUserCompany: privateProcedure.query(async ({ctx}) => {
        const {
            user: {id},
        } = ctx;

        return await prismadb.company.findUnique({
            where: {
                userId: id,
            },
        });
    }),
    createCompany: privateProcedure
        .input(companyCreationSchema)
        .mutation(async ({input, ctx}) => {
            const {
                user: {email},
            } = ctx;

            const existingCompany = await getUserCompany(ctx)

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

            const company = await prismadb.company.create({
                data: {
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
                },
            });

            await prismadb.representative.create({
                data: {
                    companyId: company.id,
                    name: company.name,
                    email: email as string,
                    phone: validatedInput.data.phoneNumber,
                },
            });

            console.log(company);

            return company;
        }),
};
