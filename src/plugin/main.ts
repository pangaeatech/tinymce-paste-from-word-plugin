/**
 * Copyright (c) Tiny Technologies, Inc. and Pangaea Information Technologies, Ltd.
 * All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import tinymce, { Editor } from "tinymce";
import { isWordContent, preProcess, PreProcessEvent } from "./WordFilter";

export default (): void => {
  tinymce.PluginManager.add("paste_from_word", (editor: Editor) => {
    editor.on("PastePreProcess", (args: PreProcessEvent) => {
      if (isWordContent(args.content)) {
        args.content = preProcess(editor, args.content);
      }
    });

    return {
      getMetadata: () => ({
        name: "Paste from Word",
        url: "https://github.com/pangaeatech/tinymce-paste-from-word-plugin",
      }),
    };
  });
};
