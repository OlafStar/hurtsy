import {QuestionMarkCircledIcon} from '@radix-ui/react-icons';
import {PropsWithChildren} from 'react';

type EmptyStateProps = {
    title: string;
    description: string;
    icon?: React.ReactNode;
};

const EmptyState = ({
    children,
    title,
    icon,
    description,
}: PropsWithChildren & EmptyStateProps) => {
    return (
        <div className="flex-1 flex  justify-center items-center text-center">
            <div className="flex flex-col items-center gap-2">
                {icon ? (
                    icon
                ) : (
                    <QuestionMarkCircledIcon className="w-[48px] h-[48px] opacity-20" />
                )}
                <div className="text-xl font-medium">{title}</div>
                <div className="opacity-50">{description}</div>
                {children}
            </div>
        </div>
    );
};

export default EmptyState;
