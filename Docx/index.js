import {
  Document,
  Table,
  WidthType,
  TableRow,
  TableCell,
  ImageRun,
  Packer,
  Paragraph,
  AlignmentType,
  HeadingLevel,
  UnderlineType,
  TextRun,
} from 'docx';

import imageBase64Data from './imageBase64Data.js';
import { paragraphStyles } from './styles.js';

const paraFont = ({ name = 'Arial' }) => ({
  name: name,
});

const emptyLine = new Paragraph({
  text: '',
  spacing: {
    before: 300,
  },
});

const BasicTable = ({ rows = [], tableAlignment = null, borders = null }) => {
  return new Table({
    ...(tableAlignment !== null && { alignment: tableAlignment }),
    ...(borders !== null && { borders: borders }),
    rows: (rows || []).map(
      ({ height = 0, cell = [] }, rowIndex) =>
        new TableRow({
          ...(height > 0 && { height: { value: height } }),
          children: (cell || []).map(
            (
              {
                text = '',
                colSpan = 0,
                rowSpan = 0,
                width = 100,
                textStyle = 'Normal',
                font = paraFont({}),
                textAlignment = 'left',
              },
              cellIndex
            ) => {
              return new TableCell({
                ...(colSpan > 0 && { columnSpan: colSpan }),
                ...(colSpan > 0 && { rowSpan: rowSpan }),
                width: { size: width, type: WidthType.PERCENTAGE },

                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: text,
                        font: font,                        
                      }),
                    ],
                    alignment: textAlignment,
                    heading: textStyle,
                  }),
                ],
              });
            }
          ),
        })
    ),
  });
};

const InvoiceHeading = new Table({
  alignment: AlignmentType.LEFT,
  borders: 0,
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          children: [
            new Paragraph({
              children: [
                new ImageRun({
                  data: Uint8Array.from(atob(imageBase64Data), (c) =>
                    c.charCodeAt(0)
                  ),
                  transformation: {
                    width: 100,
                    height: 100,
                  },
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          children: [
            BasicTable({
              rows: [
                {
                  cell: [
                    {
                      text: 'Tax Invoice',
                      colSpan: 2,
                      textStyle: 'Heading1',
                      textAlignment: 'right',
                    },
                  ],
                },
                {
                  cell: [
                    {
                      colSpan: 2,
                      textAlignment: 'right',
                    },
                  ],
                },
                {
                  cell: [
                    {
                      text: 'Invoice',
                      width: 60,
                      textStyle: 'Heading2',
                      textAlignment: 'right',
                    },
                    {
                      text: '0011225',
                      width: 40,
                      textStyle: 'Heading2Value',
                      textAlignment: 'right',
                    },
                  ],
                },
                {
                  cell: [
                    {
                      text: 'Date Issued',
                      width: 60,
                      textStyle: 'Heading2',
                      textAlignment: 'right',
                    },
                    {
                      text: '09, 2021',
                      width: 40,
                      textStyle: 'Heading2Value',
                      textAlignment: 'right',
                    },
                  ],
                },
                {
                  cell: [
                    {
                      text: 'Registration #',
                      width: 60,
                      textStyle: 'Heading2',
                      textAlignment: 'right',
                    },
                    {
                      text: '787878',
                      width: 40,
                      textStyle: 'Heading2Value',
                      textAlignment: 'right',
                    },
                  ],
                },
              ],
              tableAlignment: AlignmentType.RIGHT,
              borders: 0,
            }),
          ],
        }),
      ],
    }),
  ],
});

const footerNote = new Paragraph({
    children: [
        new TextRun({
            text: "Note:   ",
            bold: true,
        }),        
        new TextRun({
            text: "Please Read this note, Please Read this note, Please Read this note, Please Read this note, Please Read this note, Please Read this note, Please Read this note, Please Read this note, Please Read this note, Please Read this note, Please Read this note.",
            underline: {},
        }),
    ],
    heading: 'Heading3',
  }),


const mailingAddress = BasicTable({
  rows: [
    {
      height: 400,
      cell: [
        {
          text: 'To',
          width: 50,
          textStyle: 'Heading2',
        },
        {
          text: 'From',
          width: 50,
          textStyle: 'Heading2',
        },
      ],
    },
    {
      cell: [
        {
          text: '0011225\n0011225\n0011225',
          rowSpan: 4,
          width: 50,
          textStyle: 'Heading2Value',
        },
        {
          text: '0011225',
          rowSpan: 4,
          width: 50,
          textStyle: 'Heading2Value',
        },
      ],
    },
    {
      cell: [
        {
          text: '0011225\n0011225\n0011225',
          width: 50,
          textStyle: 'Heading2Value',
        },
        {
          text: '0011225',
          width: 50,
          textStyle: 'Heading2Value',
        },
      ],
    },
    {
      cell: [
        {
          text: '0011225\n0011225\n0011225',
          width: 50,
          textStyle: 'Heading2Value',
        },
        {
          text: '0011225',
          width: 50,
          textStyle: 'Heading2Value',
        },
      ],
    },
  ],
  tableAlignment: AlignmentType.RIGHT,
  borders: 0,
});

const doc = new Document({
  styles: {
    paragraphStyles: paragraphStyles,
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 600,
            bottom: 600,
            left: 600,
            right: 600,
          },
        },
      },
      children: [
        InvoiceHeading, emptyLine, mailingAddress, emptyLine, footerNote
      ],
    },
  ],
});

export default doc;
