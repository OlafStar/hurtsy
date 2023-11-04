'use client';
import './styles.scss';

import {Color} from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import {EditorProvider} from '@tiptap/react';
import ListItem from '@tiptap/extension-list-item';
import StarterKit from '@tiptap/starter-kit';
import React, {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from 'react';
import TipTapToolbar from '../TipTapToolbar';
import BulletList from '@tiptap/extension-bullet-list';
import Image from '@tiptap/extension-image';

interface DescriptionImageContextType {
    descriptionImages: File[];
    setDescriptionImages: Dispatch<SetStateAction<File[]>>;
}

const DescriptionImageContext = createContext<DescriptionImageContextType>({
    descriptionImages: [],
    setDescriptionImages: () => {},
});

export const DescriptionImageContextProvider = ({
    children,
    descriptionImages,
    setDescriptionImages,
}: PropsWithChildren & DescriptionImageContextType) => {
    return (
        <DescriptionImageContext.Provider
            value={{descriptionImages, setDescriptionImages}}
        >
            {children}
        </DescriptionImageContext.Provider>
    );
};

export const useDescriptionImageContext = () => {
    const context = useContext(DescriptionImageContext);
    if (!context) {
        throw new Error(
            'useDescriptionImageContext must be used within a DescriptionImageContextProvider',
        );
    }
    return context;
};

type TiptapProp = {
    content?: string;
    onChange: (richText: string) => void;
    descriptionImages: File[];
    setDescriptionImages: Dispatch<SetStateAction<File[]>>;
};

const Tiptap = ({
    content,
    onChange,
    descriptionImages,
    setDescriptionImages,
}: TiptapProp) => {
    const extensions = [
        StarterKit.configure({
            orderedList: {
                keepMarks: true,
                keepAttributes: false,
            },
        }),
        Image.configure({
            inline: true,
        }),
        Color.configure({types: [TextStyle.name, ListItem.name]}),
        BulletList.configure({
            itemTypeName: 'listItem',
            keepMarks: true,
            keepAttributes: false,
        }),
    ];

    return (
        <div className="w-full">
            <DescriptionImageContextProvider
                descriptionImages={descriptionImages}
                setDescriptionImages={setDescriptionImages}
            >
                <EditorProvider
                    content={content}
                    slotBefore={<TipTapToolbar />}
                    extensions={extensions}
                    onUpdate={(e) => {
                        onChange(e.editor.getHTML());
                        console.log(e.editor.getHTML());
                    }}
                    children={undefined}
                />
            </DescriptionImageContextProvider>
        </div>
    );
};

export default Tiptap;
