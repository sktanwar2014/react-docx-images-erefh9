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

const font = ({ name = 'Calibri (Body)' }) => ({
  name: name,
});

const BasicTable = ({ rows, tableAlignment = null, borders = 0 }) => {
  return new Table({
    ...(tableAlignment !== null && { alignment: AlignmentType.Right }),
    borders: borders,
    rows: (rows || []).map(
      ({ height, cell }, rowIndex) =>
        new TableRow({
          ...(height > 0 && { height: { value: height } }),
          children: (cell || []).map(
            (
              { colSpan, text, width, textStyle, font, textAlignment },
              cellIndex
            ) => {
              return new TableCell({
                ...(colSpan > 0 && { columnSpan: colSpan }),
                width: { size: width, type: WidthType.PERCENTAGE },

                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: text,
                        font: font,
                      }),
                    ],
                    alignment: textAlignment || 'left',
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
                  height: 0,
                  cell: [
                    {
                      text: 'Tax Invoice',
                      colSpan: 2,
                      width: 100,
                      textStyle: 'Heading1',
                      font: font({}),
                      textAlignment: 'right',
                    },
                  ],
                },
                {
                  height: 0,
                  cell: [
                    {
                      text: '',
                      colSpan: 2,
                      width: 100,
                      textStyle: 'Heading2',
                      font: font({}),
                      textAlignment: 'right',
                    },
                  ],
                },
                {
                  height: 0,
                  cell: [
                    {
                      text: 'Invoice',
                      colSpan: 0,
                      width: 50,
                      textStyle: 'Heading2',
                      font: font({}),
                      textAlignment: 'right',
                    },
                    {
                      text: '0011225',
                      colSpan: 0,
                      width: 50,
                      textStyle: 'Heading2Value',
                      font: font({}),
                      textAlignment: 'right',
                    },
                  ],
                },
                {
                  height: 0,
                  cell: [
                    {
                      text: 'Date Issued',
                      colSpan: 0,
                      width: 50,
                      textStyle: 'Heading2',
                      font: font({}),
                      textAlignment: 'right',
                    },
                    {
                      text: '09, 2021',
                      colSpan: 0,
                      width: 50,
                      textStyle: 'Heading2Value',
                      font: font({}),
                      textAlignment: 'right',
                    },
                  ],
                },
                {
                  height: 0,
                  cell: [
                    {
                      text: 'Registration #',
                      colSpan: 0,
                      width: 50,
                      textStyle: 'Heading2',
                      font: font({}),
                      textAlignment: 'right',
                    },
                    {
                      text: '787878',
                      colSpan: 0,
                      width: 50,
                      textStyle: 'Heading2Value',
                      font: font({}),
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

const doc = new Document({
  styles: {
    paragraphStyles: paragraphStyles,
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 400,
            bottom: 400,
            left: 400,
            right: 400,
          },
        },
      },
      children: [
        InvoiceHeading,
        new Paragraph({
          text: '',
          spacing: {
            before: 200,
          },
        }),
        BasicTable({
          rows: [
            {
              height: 400,
              cell: [
                {
                  text: 'To',
                  colSpan: 0,
                  width: 50,
                  textStyle: 'Heading2',
                  font: font({}),
                  textAlignment: 'left',
                },
                {
                  text: 'From',
                  colSpan: 0,
                  width: 50,
                  textStyle: 'Heading2',
                  font: font({}),
                  textAlignment: 'left',
                },
              ],
            },
            {
              height: 0,
              cell: [
                {
                  text: '0011225\n0011225\n0011225',
                  colSpan: 0,
                  width: 50,
                  textStyle: 'Heading2Value',
                  font: font({}),
                  textAlignment: 'left',
                },
                {
                  text: '0011225',
                  colSpan: 0,
                  width: 50,
                  textStyle: 'Heading2Value',
                  font: font({}),
                  textAlignment: 'left',
                },
              ],
            },
          ],
          tableAlignment: AlignmentType.RIGHT,
          borders: 0,
        }),
      ],
    },
  ],
});

export default doc;
