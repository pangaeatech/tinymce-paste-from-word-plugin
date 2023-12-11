/**
 * Copyright (c) Tiny Technologies, Inc. and Pangaea Information Technologies, Ltd.
 * All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
import type { Editor } from "tinymce";
import { isWordContent, preProcess, PreProcessEvent } from "./WordFilter";

export default (editor: Editor, args: PreProcessEvent): void => {
  if (isWordContent(args.content)) {
    args.content = preProcess(editor, args.content);
  }
};
