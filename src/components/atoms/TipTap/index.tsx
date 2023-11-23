'use client';
import './styles.scss';

import {Color} from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import {EditorProvider} from '@tiptap/react';
import ListItem from '@tiptap/extension-list-item';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import BulletList from '@tiptap/extension-bullet-list';
import Image from '@tiptap/extension-image';

import TipTapToolbar from '../TipTapToolbar';

import styles from './styles.module.scss';

type TiptapProp = {
    content?: string;
    onChange: (richText: string) => void;
};

const Tiptap = ({content, onChange}: TiptapProp) => {
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
        <div className={styles.editorHFull}>
            <EditorProvider
                injectCSS={true}
                content={content}
                slotBefore={<TipTapToolbar />}
                extensions={extensions}
                onUpdate={(e) => {
                    onChange(e.editor.getHTML());
                    console.log(e.editor.getHTML());
                }}
                // eslint-disable-next-line react/no-children-prop
                children={undefined}
            />
        </div>
    );
};

export default Tiptap;
