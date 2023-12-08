import { isWordContent, preProcess } from "./WordFilter";
import tinymce, { Editor } from "tinymce";

interface PreProcessEvent {
    content: string;
    internal: boolean;
}
  
export default (): void => {
    tinymce.PluginManager.add("paste_from_word", (editor: Editor) => {
        editor.on("PastePreProcess", ({ content }: PreProcessEvent) => {
            if (isWordContent(content)) {
                content = preProcess(editor, content);
            }
        });

        return {
            getMetadata: () => ({
                name: "Paste from Word",
                url: "https://github.com/pangaeatech/tinymce-paste-from-word-plugin"
            })
        };
    });
}

