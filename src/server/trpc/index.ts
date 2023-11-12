import {router} from './trpc';
import {companyProcedures} from './procedures/company';
import {representativesProcedures} from './procedures/representatives';
import {s3Procedures} from './procedures/s3';
import {productProcedures} from './procedures/product';
import {imagesProcedures} from './procedures/images';
import {stripeProcedures} from './procedures/stripe';

export const appRouter = router({
    ...companyProcedures,
    ...representativesProcedures,
    ...productProcedures,
    ...s3Procedures,
    ...imagesProcedures,
    ...stripeProcedures,
});

export type AppRouter = typeof appRouter;
