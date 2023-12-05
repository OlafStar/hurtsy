import React from 'react';
import {PropsWithClassName} from '~types/generalTypes';

type CompanyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    src?: string;
};

const CompanyImage: React.FC<PropsWithClassName & CompanyImageProps> = (props) => {
    return (
        <img {...props} src={props.src ? props.src : '/company-placeholder.png'} />
    );
};

export default CompanyImage;
