import purify from 'dompurify';

import {PropsWithClassName} from '~types/generalTypes';
import {cn} from '~utils/shadcn';

import styles from './styles.module.css';

const InnerHTML = ({html, className}: {html: string} & PropsWithClassName) => {
    return (
        <div className={`${cn(className)}`}>
            <div
                className={styles.innerHTMLStyle}
                dangerouslySetInnerHTML={{
                    __html: purify.sanitize(html) || '',
                }}
            />
        </div>
    );
};

export default InnerHTML;
