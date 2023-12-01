import NotificationSettings from './NotificationSettings';
import ResetUserPassword from './ResetUserPassword';

const SettingsPage = async () => {
    return (
        <div className="py-4 lg:p-4 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <div className="text-2xl font-bold">{'Konto'}</div>
                    <div className="h-[1px] w-full bg-black opacity-10" />
                </div>
                <ResetUserPassword />
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <div className="text-2xl font-bold">{'Powiadomienia'}</div>
                    <div className="h-[1px] w-full bg-black opacity-10" />
                </div>
                <NotificationSettings />
            </div>
        </div>
    );
};

export default SettingsPage;
