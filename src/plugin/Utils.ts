import tinymce from "tinymce";

type RegExpFilter =
  | RegExp
  | [RegExp, string]
  | [RegExp, (match: string, ...args: any[]) => string];

const isRegExp = (val: unknown): val is RegExp => val.constructor === RegExp;

export function filter(content: string, items: RegExpFilter[]): string {
  tinymce.util.Tools.each(items, (v) => {
    if (isRegExp(v)) {
      content = content.replace(v, "");
    } else {
      content = content.replace(v[0], v[1] as any);
    }
  });

  return content;
}
