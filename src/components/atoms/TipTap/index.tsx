'use client';

import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type TiptapProp = {
    description: string;
    onChange: (richText: string) => void;
};

const Tiptap = ({description, onChange}: TiptapProp) => {
    const editor = useEditor({
        extensions: [StarterKit.configure()],
        content: description,
        // editorProps: {
        //     attributes: {
        //         class: 'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        //     },
        // },
        onUpdate({editor}) {
            onChange(editor.getHTML());
            console.log(editor.getHTML());
        },
    });

    return (
        <div className='w-full'>
            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;
