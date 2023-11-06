import {cn} from '~utils/shadcn';

type LoaderProps = {
    className?: string;
};

const Loader = ({className}: LoaderProps) => {
    return (
        <div
            className={`flex items-center justify-center h-full ${cn(className)}`}
        >
            <div
                className="w-12 h-12 rounded-full animate-spin
border-8 border-solid border-purple-500 border-t-transparent"
            ></div>
        </div>
    );
};

export default Loader;
