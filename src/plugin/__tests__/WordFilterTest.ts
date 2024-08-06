import { test, expect } from "@jest/globals";

window.matchMedia = () => ({ parseStyle: () => "" }) as any;
import tinymce from "tinymce";

import { preProcess } from "../WordFilter";
import * as Strings from "../__mocks__/Strings";

test("TBA: Paste Word fake list", () => {
  const editor = new tinymce.Editor(
    "id",
    { pastefromword_valid_elements: "-ul,-ol,-li,-p" },
    tinymce,
  );

  expect(preProcess(editor, Strings.wordList2)).toEqual(
    '<ul><li> Item 1</li><li> Item 2</li><li> Item 3</li><li> Item 4</li><li> Item 5</li><li> Item 6</li></ul>',
  );

  expect(
    preProcess(
      editor,
      '<p class="ListStyle" style="margin-top:0cm;margin-right:0cm;margin-bottom:3.0pt;margin-left:18.0pt;mso-add-space:auto;text-align:justify;text-indent:-18.0pt;mso-list:l0 level1 lfo1;tab-stops:list 18.0pt"><span lang="DE" style="font-family:Verdana;mso-fareast-font-family:Verdana;mso-bidi-font-family:Verdana;color:black"><span style="mso-list:Ignore">\u25CF<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></span><span lang="DE" style="font-family:Arial;mso-fareast-font-family:Arial;mso-bidi-font-family:Arial;color:black">Item&nbsp; Spaces.<o:p></o:p></span></p>',
    ),
  ).toEqual(
    '<ul><li style="text-align: justify; tab-stops: list 18.0pt;">Item\u00A0 Spaces.</li></ul>',
  );

  expect(
    preProcess(
      editor,
      '<p class="ListStyle" style="margin-left:36.0pt;mso-add-space:auto;text-indent:-18.0pt;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span lang="EN-US" style="color:black;mso-ansi-language:EN-US"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span lang="EN-US" style="font-family:Arial;mso-fareast-font-family:Arial;mso-bidi-font-family:Arial;color:black;mso-ansi-language:EN-US">Version 7.0</span><span lang="EN-US" style="font-family:Arial;mso-fareast-font-family:Arial;mso-bidi-font-family:Arial;color:black;mso-ansi-language:EN-US">:<o:p></o:p></span></p>',
    ),
  ).toEqual(
    '<ol><li style="tab-stops: list 36.0pt;"> Version 7.0:</li></ol>',
  );
});

test("TBA: Paste Word fake list of ten items with roman numerals", () => {
  const editor = new tinymce.Editor(
    "id",
    { pastefromword_valid_elements: "-ul,-ol,-li,-p" },
    tinymce,
  );

  expect(
    preProcess(
      editor,
      `<p class=MsoListParagraphCxSpFirst style='text-indent:-36.0pt;mso-text-indent-alt:
      -18.0pt;mso-list:l0 level1 lfo1'><![if !supportLists]><span lang=en-FI
      style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span
      style='mso-list:Ignore'><span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>i.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><span lang=EN-US style='mso-ansi-language:EN-US'>One</span><span
      lang=en-FI><o:p></o:p></span></p>

      <p class=MsoListParagraphCxSpMiddle style='text-indent:-36.0pt;mso-text-indent-alt:
      -18.0pt;mso-list:l0 level1 lfo1'><![if !supportLists]><span lang=en-FI
      style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span
      style='mso-list:Ignore'><span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>ii.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><span lang=EN-US style='mso-ansi-language:EN-US'>Two</span><span
      lang=en-FI><o:p></o:p></span></p>

      <p class=MsoListParagraphCxSpMiddle style='text-indent:-36.0pt;mso-text-indent-alt:
      -18.0pt;mso-list:l0 level1 lfo1'><![if !supportLists]><span lang=en-FI
      style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span
      style='mso-list:Ignore'><span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;
      </span>iii.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><span lang=EN-US style='mso-ansi-language:EN-US'>Three</span><span
      lang=en-FI><o:p></o:p></span></p>

      <p class=MsoListParagraphCxSpMiddle style='text-indent:-36.0pt;mso-text-indent-alt:
      -18.0pt;mso-list:l0 level1 lfo1'><![if !supportLists]><span lang=en-FI
      style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span
      style='mso-list:Ignore'><span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;
      </span>iv.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><span lang=EN-US style='mso-ansi-language:EN-US'>Four</span><span
      lang=en-FI><o:p></o:p></span></p>

      <p class=MsoListParagraphCxSpMiddle style='text-indent:-36.0pt;mso-text-indent-alt:
      -18.0pt;mso-list:l0 level1 lfo1'><![if !supportLists]><span lang=en-FI
      style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span
      style='mso-list:Ignore'><span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>v.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><span lang=EN-US style='mso-ansi-language:EN-US'>Five</span><span
      lang=en-FI><o:p></o:p></span></p>

      <p class=MsoListParagraphCxSpMiddle style='text-indent:-36.0pt;mso-text-indent-alt:
      -18.0pt;mso-list:l0 level1 lfo1'><![if !supportLists]><span lang=en-FI
      style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span
      style='mso-list:Ignore'><span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;
      </span>vi.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><span lang=EN-US style='mso-ansi-language:EN-US'>Six</span><span
      lang=en-FI><o:p></o:p></span></p>

      <p class=MsoListParagraphCxSpMiddle style='text-indent:-36.0pt;mso-text-indent-alt:
      -18.0pt;mso-list:l0 level1 lfo1'><![if !supportLists]><span lang=en-FI
      style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span
      style='mso-list:Ignore'><span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;
      </span>vii.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><span lang=EN-US style='mso-ansi-language:EN-US'>Seven</span><span
      lang=en-FI><o:p></o:p></span></p>

      <p class=MsoListParagraphCxSpMiddle style='text-indent:-36.0pt;mso-text-indent-alt:
      -18.0pt;mso-list:l0 level1 lfo1'><![if !supportLists]><span lang=en-FI
      style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span
      style='mso-list:Ignore'><span style='font:7.0pt "Times New Roman"'>&nbsp; </span>viii.<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><span lang=EN-US style='mso-ansi-language:EN-US'>Eight</span><span
      lang=en-FI><o:p></o:p></span></p>

      <p class=MsoListParagraphCxSpMiddle style='text-indent:-36.0pt;mso-text-indent-alt:
      -18.0pt;mso-list:l0 level1 lfo1'><![if !supportLists]><span lang=en-FI
      style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span
      style='mso-list:Ignore'><span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>ix.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><span lang=EN-US style='mso-ansi-language:EN-US'>Nine</span><span
      lang=en-FI><o:p></o:p></span></p>

      <p class=MsoListParagraphCxSpLast style='text-indent:-36.0pt;mso-text-indent-alt:
      -18.0pt;mso-list:l0 level1 lfo1'><![if !supportLists]><span lang=en-FI
      style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span
      style='mso-list:Ignore'><span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>x.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><span lang=EN-US style='mso-ansi-language:EN-US'>Ten</span><span
      lang=en-FI><o:p></o:p></span></p>`,
    ),
  ).toEqual(
    '<ol><li>  One</li><li>  Two</li><li>  Three</li><li>  Four</li><li>  Five</li><li>  Six</li><li>  Seven</li><li>  Eight</li><li>  Nine</li><li>  Ten</li></ol>',
  );
});

test("TBA: Paste Word fake list before BR", () => {
  const editor = new tinymce.Editor(
    "id",
    { pastefromword_valid_elements: "-ul,-ol,-li,-p,-br" },
    tinymce,
  );

  expect(preProcess(editor, Strings.wordList1 + "<p><br />a</p>")).toEqual(
    '<ul><li> Item 1</li><li> Item 2</li><li> Item 3</li><li> Item 4</li><li> Item 5</li><li> Item 6</li></ul><p>a</p>',
  );
});

test("TBA: Paste Word fake lists interrupted by header", () => {
  const editor = new tinymce.Editor(
    "id",
    { pastefromword_valid_elements: "-ul,-ol,-li,-p,-h1" },
    tinymce,
  );

  expect(
    preProcess(
      editor,
      `<p class=MsoListParagraphCxSpFirst style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family: Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><![endif]>List before heading A<o:p></o:p></p>  <p class=MsoListParagraphCxSpLast style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family: Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><![endif]>List before heading B<o:p></o:p></p>  <h1>heading<o:p></o:p></h1>  <p class=MsoListParagraphCxSpFirst style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family: Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><![endif]>List after heading A<o:p></o:p></p>  <p class=MsoListParagraphCxSpLast style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family: Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><![endif]>List after heading B<o:p></o:p></p>`,
    ),
  ).toEqual(
    '<ul><li> List before heading A</li><li> List before heading B</li></ul><h1>heading</h1><ul><li> List after heading A</li><li> List after heading B</li></ul>',
  );
});

test("TBA: Paste list like paragraph and list", () => {
  const editor = new tinymce.Editor(
    "id",
    { pastefromword_valid_elements: "-ul,-ol,-li,-p" },
    tinymce,
  );

  expect(
    preProcess(
      editor,
      `<p class=MsoNormal><span style='font-size:10.0pt;line-height:115%;font-family:"Trebuchet MS","sans-serif";color:#666666'>ABC. X<o:p></o:p></span></p><p class=MsoListParagraph style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span style='mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></span><![endif]>Y</p>`,
    ),
  ).toEqual('<p>ABC. X</p><ol><li>Y</li></ol>');
});

test("TBA: Paste list like paragraph and list (disabled)", () => {
  const editor = new tinymce.Editor(
    "id",
    {
      pastefromword_convert_fake_lists: false,
      pastefromword_valid_elements: "-ul,-ol,-li,-p",
    },
    tinymce,
  );

  expect(
    preProcess(
      editor,
      `<p class=MsoNormal><span style='font-size:10.0pt;line-height:115%;font-family:"Trebuchet MS","sans-serif";color:#666666'>ABC. X<o:p></o:p></span></p><p class=MsoListParagraph style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span style='mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></span><![endif]>Y</p>`,
    ),
  ).toEqual(
    '<p>ABC. X</p><p style="text-indent: -.25in;">1.\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Y</p>',
  );
});

test("TBA: Paste Word table", () => {
  const editor = new tinymce.Editor("id", {}, tinymce);

  expect(preProcess(editor, Strings.table)).toEqual(
    '<table style="margin-left: 36pt; border-collapse: collapse;"><tbody><tr><td width="307" style="border: 1pt solid black; padding: 0cm 5.4pt; width: 230.3pt;"><p style="margin: 0cm 0cm 0.0001pt; line-height: normal;">Cell 1</p></td><td width="307" style="border-style: solid solid solid none; border-color: black black black -moz-use-text-color; border-width: 1pt 1pt 1pt medium; padding: 0cm 5.4pt; width: 230.3pt;"><p style="margin: 0cm 0cm 0.0001pt; line-height: normal;">Cell 2</p></td></tr><tr><td width="307" style="border-style: none solid solid; border-color: -moz-use-text-color black black; border-width: medium 1pt 1pt; padding: 0cm 5.4pt; width: 230.3pt;"><p style="margin: 0cm 0cm 0.0001pt; line-height: normal;">Cell 3</p></td><td width="307" style="border-style: none solid solid none; border-color: -moz-use-text-color black black -moz-use-text-color; border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; width: 230.3pt;"><p style="margin: 0cm 0cm 0.0001pt; line-height: normal;">Cell 4</p></td></tr></tbody></table><p> </p>',
  );
});

test("TBA: Paste Office 365", () => {
  const editor = new tinymce.Editor(
    "id",
    { pastefromword_valid_elements: "-ul,-ol,-li,-p,-div" },
    tinymce,
  );

  expect(
    preProcess(
      editor,
      '<div class="OutlineElement Ltr SCX195156559">Test</div>',
    ),
  ).toEqual("<div>Test</div>");
});

test("TBA: Paste Google Docs 1", () => {
  const editor = new tinymce.Editor(
    "id",
    { pastefromword_valid_elements: "-ul,-ol,-li,-p" },
    tinymce,
  );

  expect(
    preProcess(
      editor,
      '<meta charset="utf-8">' +
        '<b style="font-weight:normal;" id="docs-internal-guid-adeb6845-fec6-72e6-6831-5e3ce002727c">' +
        '<p dir="ltr">a</p>' +
        '<p dir="ltr">b</p>' +
        '<p dir="ltr">c</p>' +
        "</b>" +
        '<br class="Apple-interchange-newline">',
    ),
  ).toEqual("<p>a</p><p>b</p><p>c</p>");
});

test("TBA: Paste Word without mso markings", () => {
  const editor = new tinymce.Editor(
    "id",
    { pastefromword_valid_elements: "-ul,-ol,-li,-p" },
    tinymce,
  );

  expect(
    preProcess(
      editor,
      '<font face="Times New Roman" size="3"></font>' +
        '<p style="margin: 0in 0in 10pt;">' +
        `<span style='line-height: 115%; font-family: "Comic Sans MS"; font-size: 22pt;'>Comic Sans MS</span>` +
        "</p>" +
        '<font face="Times New Roman" size="3"></font>',
    ),
  ).toEqual('<p style="margin: 0in 0in 10pt;">Comic Sans MS</p>');
});

test("TBA: Paste Word links", () => {
  const editor = new tinymce.Editor("id", {}, tinymce);

  expect(
    preProcess(
      editor,
      '<p class="MsoNormal">' +
        '<a href="file:///C:/somelocation/filename.doc#_Toc238571849">1</a>' +
        '<a href="#_Toc238571849">2</a>' +
        '<a name="Toc238571849">3</a>' +
        '<a name="_Toc238571849">4</a>' +
        '<a href="#_ftn238571849" name="_ftnref238571849">[5]</a>' +
        '<a href="#_ftnref238571849" name="_ftn238571849">[5]</a>' +
        '<a href="#_edn238571849" name="_ednref238571849">[6]</a>' +
        '<a href="#_ednref238571849" name="_edn238571849">[7]</a>' +
        '<a href="http://domain.tinymce.com/someurl">8</a>' +
        '<a name="#unknown">9</a>' +
        '<a href="http://domain.tinymce.com/someurl" name="named_link">named_link</a>' +
        "<a>5</a>" +
        "</p>",
    ),
  ).toEqual(
    "<p>" +
      '<a href="#_Toc238571849">1</a>' +
      '<a href="#_Toc238571849">2</a>' +
      '<a name="Toc238571849"></a>3' +
      '<a name="_Toc238571849"></a>4' +
      '<a href="#_ftn238571849" name="_ftnref238571849">[5]</a>' +
      '<a href="#_ftnref238571849" name="_ftn238571849">[5]</a>' +
      '<a href="#_edn238571849" name="_ednref238571849">[6]</a>' +
      '<a href="#_ednref238571849" name="_edn238571849">[7]</a>' +
      '<a href="http://domain.tinymce.com/someurl">8</a>' +
      "9" +
      "named_link" +
      "5" +
      "</p>",
  );
});

test("TBA: Paste Word retain styles", () => {
  const editor = new tinymce.Editor("id", {}, tinymce);

  // Test color
  expect(
    preProcess(editor, '<p class="MsoNormal" style="color: #ff0000">Test</p>'),
  ).toEqual('<p style="color: #ff0000;">Test</p>');

  // Test background-color
  expect(
    preProcess(
      editor,
      '<p class="MsoNormal" style="background-color: #ff0000">Test</p>',
    ),
  ).toEqual('<p style="background-color: #ff0000;">Test</p>');
});

test("TBA: Paste Word retain bold/italic styles to elements", () => {
  const editor = new tinymce.Editor("id", {}, tinymce);

  expect(
    preProcess(
      editor,
      '<p class="MsoNormal">' +
        '<span style="font-weight: bold">bold</span>' +
        '<span style="font-style: italic">italic</span>' +
        '<span style="font-weight: bold; font-style: italic">bold + italic</span>' +
        '<span style="font-weight: bold; color: red">bold + color</span>' +
        "</p>",
    ),
  ).toEqual(
    '<p><b>bold</b><i>italic</i><b><i>bold + italic</i></b><b><span style="color: red;">bold + color</span></b></p>',
  );
});

test("TBA: paste track changes comment", () => {
  const editor = new tinymce.Editor("id", {}, tinymce);

  expect(
    preProcess(
      editor,
      '<p class="MsoNormal">1</p>' +
        '<div style="mso-element: comment;">2</div>' +
        '<span class="msoDel">3</span>' +
        "<del>4</del>",
    ),
  ).toEqual("<p>1</p>");
});

test("TBA: paste nested (UL) word list", () => {
  const editor = new tinymce.Editor(
    "id",
    { pastefromword_valid_elements: "-ul,-ol,-li,-p" },
    tinymce,
  );

  expect(
    preProcess(
      editor,
      `<p class=MsoListParagraphCxSpFirst style='text-indent:-18.0pt;mso-list:l0 level1 lfo1'>` +
        `<![if !supportLists]><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:Symbol'>` +
        `<span style='mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
        `</span></span></span><![endif]>a</p>` +
        `<p class=MsoListParagraphCxSpMiddle style='margin-left:72.0pt;mso-add-space:auto;text-indent:-18.0pt;mso-list:l0 level2 lfo1'>` +
        `<![if !supportLists]><span style='font-family:"Courier New";mso-fareast-font-family:"Courier New"'>` +
        `<span style='mso-list:Ignore'>o<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;</span></span></span><![endif]>b</p>` +
        `<p class=MsoListParagraphCxSpLast style='margin-left:108.0pt;mso-add-space:auto;text-indent:-18.0pt;mso-list:l0 level3 lfo1'>` +
        `<![if !supportLists]><span style='font-family:Wingdings;mso-fareast-font-family:Wingdings;mso-bidi-font-family:Wingdings'>` +
        `<span style='mso-list:Ignore'>§<span style='font:7.0pt "Times New Roman"'>&nbsp;</span></span></span><![endif]>c 1. x</p>`,
    ),
  ).toEqual(
    "<ul>" +
      '<li>a' +
      "<ul>" +
      '<li>ob' +
      "<ul>" +
      '<li>c 1. x</li>' +
      "</ul>" +
      "</li>" +
      "</ul>" +
      "</li>" +
      "</ul>",
  );
});

test("TBA: paste nested (OL) word list", () => {
  const editor = new tinymce.Editor(
    "id",
    { pastefromword_valid_elements: "-ul,-ol,-li,-p" },
    tinymce,
  );

  expect(
    preProcess(
      editor,
      `<p class=MsoListParagraphCxSpFirst style='text-indent:-18.0pt;mso-list:l0 level1 lfo1'>` +
        `<![if !supportLists]><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'>` +
        `<span style='mso-list:Ignore'>1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>` +
        `</span></span><![endif]>a</p>` +
        `<p class=MsoListParagraphCxSpMiddle style='margin-left:72.0pt;mso-add-space:auto;text-indent:-18.0pt;mso-list:l0 level2 lfo1'>` +
        `<![if !supportLists]><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>a.` +
        `<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></span><![endif]>b</p>` +
        `<p class=MsoListParagraphCxSpLast style='margin-left:108.0pt;mso-add-space:auto;text-indent:-108.0pt;mso-text-indent-alt:-9.0pt;mso-list:l0 level3 lfo1'>` +
        `<![if !supportLists]><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>` +
        `<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>i.<span style='font:7.0pt "Times New Roman"'>` +
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></span><![endif]>c</p>`,
    ),
  ).toEqual(
    "<ol>" +
      '<li>a' +
      "<ol>" +
      '<li>b' +
      "<ol>" +
      '<li>c</li>' +
      "</ol>" +
      "</li>" +
      "</ol>" +
      "</li>" +
      "</ol>",
  );
});

test("TBA: Paste word DIV as P", () => {
  const editor = new tinymce.Editor("id", {}, tinymce);

  expect(preProcess(editor, '<p class="MsoNormal">1</p><div>2</div>')).toEqual(
    "<p>1</p><p>2</p>",
  );
});

test("TBA: paste nested lists", () => {
  const editor = new tinymce.Editor("id", {}, tinymce);

  expect(
    preProcess(
      editor,
        `<p class=MsoNormal>This is a header<o:p></o:p></p>` +
        `` +
        `<p class=MsoNormal>This is a paragraph.<o:p></o:p></p>` +
        `` +
        `<p class=MsoListParagraphCxSpFirst style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span` +
        `style='mso-bidi-font-family:Aptos;mso-bidi-theme-font:minor-latin'><span` +
        `style='mso-list:Ignore'>1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
        `</span></span></span><![endif]>Numbered Item<o:p></o:p></p>` +
        `` +
        `<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span` +
        `style='mso-bidi-font-family:Aptos;mso-bidi-theme-font:minor-latin'><span` +
        `style='mso-list:Ignore'>2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
        `</span></span></span><![endif]>Numbered Item<o:p></o:p></p>` +
        `` +
        `<p class=MsoListParagraphCxSpMiddle style='margin-left:1.0in;mso-add-space:` +
        `auto;text-indent:-.25in;mso-list:l0 level2 lfo1'><![if !supportLists]><span` +
        `style='mso-bidi-font-family:Aptos;mso-bidi-theme-font:minor-latin'><span` +
        `style='mso-list:Ignore'>a.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
        `</span></span></span><![endif]>Indented<o:p></o:p></p>` +
        `` +
        `<p class=MsoListParagraphCxSpMiddle style='margin-left:117.0pt;mso-add-space:` +
        `auto;text-indent:-.25in;mso-list:l0 level3 lfo1'><![if !supportLists]><span` +
        `style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:` +
        `Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
        `</span></span></span><![endif]>Bullet<o:p></o:p></p>` +
        `` +
        `<p class=MsoListParagraphCxSpMiddle style='margin-left:1.0in;mso-add-space:` +
        `auto;text-indent:-.25in;mso-list:l0 level2 lfo1'><![if !supportLists]><span` +
        `style='mso-bidi-font-family:Aptos;mso-bidi-theme-font:minor-latin'><span` +
        `style='mso-list:Ignore'>b.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
        `</span></span></span><![endif]>Indented again<o:p></o:p></p>` +
        `` +
        `<p class=MsoListParagraphCxSpMiddle style='margin-left:117.0pt;mso-add-space:` +
        `auto;text-indent:-.25in;mso-list:l0 level3 lfo1'><![if !supportLists]><span` +
        `style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:` +
        `Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
        `</span></span></span><![endif]>Bullet again<o:p></o:p></p>` +
        `` +
        `<p class=MsoListParagraphCxSpMiddle style='margin-left:117.0pt;mso-add-space:` +
        `auto;text-indent:-.25in;mso-list:l0 level3 lfo1'><![if !supportLists]><span` +
        `style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:` +
        `Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
        `</span></span></span><![endif]>Bullet again again<o:p></o:p></p>` +
        `` +
        `<p class=MsoListParagraphCxSpLast style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span` +
        `style='mso-bidi-font-family:Aptos;mso-bidi-theme-font:minor-latin'><span` +
        `style='mso-list:Ignore'>3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
        `</span></span></span><![endif]>Numbered again<o:p></o:p></p>` +
        `` +
        `<p class=MsoNormal><span style='color:red;background:yellow;mso-highlight:yellow'>This` +
        `is a highlighted colored paragraph.</span><span style='color:red'><o:p></o:p></span></p>` +
        `` +
        `<p class=MsoNormal><span style='mso-no-proof:yes'><!--[if gte vml 1]><v:shapetype` +
        ` id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t"` +
        ` path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f">` +
        ` <v:stroke joinstyle="miter"/>` +
        ` <v:formulas>` +
        `  <v:f eqn="if lineDrawn pixelLineWidth 0"/>` +
        `  <v:f eqn="sum @0 1 0"/>` +
        `  <v:f eqn="sum 0 0 @1"/>` +
        `  <v:f eqn="prod @2 1 2"/>` +
        `  <v:f eqn="prod @3 21600 pixelWidth"/>` +
        `  <v:f eqn="prod @3 21600 pixelHeight"/>` +
        `  <v:f eqn="sum @0 0 1"/>` +
        `  <v:f eqn="prod @6 1 2"/>` +
        `  <v:f eqn="prod @7 21600 pixelWidth"/>` +
        `  <v:f eqn="sum @8 21600 0"/>` +
        `  <v:f eqn="prod @7 21600 pixelHeight"/>` +
        `  <v:f eqn="sum @10 21600 0"/>` +
        ` </v:formulas>` +
        ` <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>` +
        ` <o:lock v:ext="edit" aspectratio="t"/>` +
        `</v:shapetype><v:shape id="Picture_x0020_1" o:spid="_x0000_i1025" type="#_x0000_t75"` +
        ` alt="Space shuttle launch" style='width:111.6pt;height:2in;visibility:visible;` +
        ` mso-wrap-style:square'>` +
        ` <v:imagedata src="file:///C:/Users/User/AppData/Local/Temp/msohtmlclip1/01/clip_image001.jpg"` +
        `  o:title="Space shuttle launch"/>` +
        `</v:shape><![endif]--><![if !vml]><img width=149 height=192` +
        `src="file:///C:/Users/User/AppData/Local/Temp/msohtmlclip1/01/clip_image002.jpg"` +
        `alt="Space shuttle launch" v:shapes="Picture_x0020_1"><![endif]></span><o:p></o:p></p>` +
        `` +
        `<p class=MsoNormal><s>This</s> is below a <u>picture</u> of the<b> space shuttle</b>.<o:p></o:p></p>` +
        `` +
        `<p class=MsoNormal><o:p>&nbsp;</o:p></p>`,
    ),
  ).toEqual(
      "<p>This is a header</p>" +
      "<p>This is a paragraph.</p>" +
      "<ol>" +
      "<li>Numbered Item</li>" +
      "<li>Numbered Item" +
      "<ol>" +
      "<li>Indented" +
      "<ul>" +
      "<li>Bullet</li>" +
      "</ul>" +
      "</li>" +
      "<li>Indented again" +
      "<ul>" +
      "<li>Bullet again</li>" +
      "<li>Bullet again again</li>" +
      "</ul>" +
      "</li>" +
      "<li>Numbered again</li>" +
      "</ol>" +
      "</li>" +
      "</ol>" +
      `<p><span style=\"color: red; background: yellow;\">Thisis a highlighted colored paragraph.</span></p>` +
      `<p><strike>This</strike> is below a <u>picture</u> of the<strong> space shuttle</strong>.</p>` +
      "<p> </p>",
  );
});


