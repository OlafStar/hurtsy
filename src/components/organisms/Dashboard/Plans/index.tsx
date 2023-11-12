import BillingForm from '~components/molecules/BillingForm';
import {getUserSubscriptionPlan} from '~lib/stripe';

const Plans = async () => {
    const subscriptionPlan = await getUserSubscriptionPlan();
    return <BillingForm {...{subscriptionPlan}} />;
};

export default Plans;
