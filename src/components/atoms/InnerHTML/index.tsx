import {sanitize} from 'isomorphic-dompurify';
import {useMemo} from 'react';

import {PropsWithClassName} from '~types/generalTypes';
import {cn} from '~utils/shadcn';

import styles from './styles.module.css';

const InnerHTML = ({html, className}: {html: string} & PropsWithClassName) => {
    const sanitized = useMemo(() => sanitize(html), [html]);

    return (
        <div className={`${cn(className)}`}>
            {sanitized && (
                <div
                    className={styles.innerHTMLStyle}
                    dangerouslySetInnerHTML={{
                        __html: sanitized || '',
                    }}
                />
            )}
        </div>
    );
};

export default InnerHTML;
