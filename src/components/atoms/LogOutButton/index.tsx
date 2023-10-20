'use client';

import {signOut} from 'next-auth/react';

const LogOutButton = () => {
    return (
        <button
            onClick={() => {
                signOut();
            }}
            
            className='h-10 bg-[#3360FF] rounded-full text-sm text-white'
        >
            Log out
        </button>
    );
};

export default LogOutButton;
