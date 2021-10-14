import { UnderlineType } from 'docx';

const paragraphStyles = [
  {
    id: 'Heading1',
    name: 'Heading 1',
    basedOn: 'Normal',
    next: 'Normal',
    quickFormat: true,
    run: {
      size: 40,
      bold: true,
    },
    // paragraph: {
    //   spacing: {
    //       after: 120,
    //   },
    // },
  },
  {
    id: 'Heading2',
    name: 'Heading2',
    basedOn: 'Normal',
    next: 'Normal',
    quickFormat: true,
    run: {
      size: 18,
      bold: true,
      color: 'aaaaab',
    },
  },
  {
    id: 'Heading2Value',
    name: 'Heading 2 Value',
    basedOn: 'Normal',
    next: 'Normal',
    quickFormat: true,
    run: {
      size: 18,
      color: '333333',
    },
  },
  {
    id: 'Heading3',
    name: 'Heading3',
    basedOn: 'Normal',
    next: 'Normal',
    quickFormat: true,
    run: {
      size: 14,
      // bold: true,
      // color: 'aaaaab',
    },
  },
  {
    id: 'Heading3Value',
    name: 'Heading 3 Value',
    basedOn: 'Normal',
    next: 'Normal',
    quickFormat: true,
    run: {
      size: 12,
      color: '333333',
    },
  },
  {
    id: 'aside',
    name: 'Aside',
    basedOn: 'Normal',
    next: 'Normal',
    run: {
      color: '999999',
      italics: true,
    },
    paragraph: {
      indent: {
        left: 720,
      },
      spacing: {
        line: 276,
      },
    },
  },
  {
    id: 'wellSpaced',
    name: 'Well Spaced',
    basedOn: 'Normal',
    quickFormat: true,
    paragraph: {
      spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
    },
  },
  {
    id: 'ListParagraph',
    name: 'List Paragraph',
    basedOn: 'Normal',
    quickFormat: true,
  },
];

export { paragraphStyles };
