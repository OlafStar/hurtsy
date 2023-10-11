'use client';

import {signOut} from 'next-auth/react';

const LogOutButton = () => {
    return (
        <button
            onClick={() => {
                signOut();
            }}
        >
            Log out
        </button>
    );
};

export default LogOutButton;
