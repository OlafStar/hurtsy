import {redirect} from 'next/navigation';
import {authOptions} from '~lib/auth';
import {getCurrentUser} from '~lib/session';

const DashboardPage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect(authOptions?.pages?.signIn || '/login');
    }

    console.log(user);

    return <div></div>;
};

export default DashboardPage;
