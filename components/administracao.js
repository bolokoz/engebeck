import { jsPDF } from 'jspdf'

const OutputType = {
  Save: 'save', // save pdf as a file
  DataUriString: 'datauristring', // returns the data uri string
  DataUri: 'datauri', // opens the data uri in current window
  DataUrlNewWindow: 'dataurlnewwindow', // opens the data uri in new window
  Blob: 'blob', // return blob format of the doc,
  ArrayBuffer: 'arraybuffer', // return ArrayBuffer format
}

export { OutputType, jsPDF }

/**
 *
 * @param { {
 *  outputType: OutputType | string,
 *  returnJsPDFDocObject?: boolean,
 *  fileName: string,
 *  orientationLandscape?: boolean,
 *  logo?: {
 *      src?: string,
 *      width?: number,
 *      height?: number,
 *      margin?: {
 *        top?: number,
 *        left?: number
 *      }
 *   },
 *   business?: {
 *       name?: string,
 *       address?: string,
 *       phone?: string,
 *       email?: string,
 *       email_1?: string,
 *       website?: string,
 *   },
 *   contact?: {
 *       label?: string,
 *       name?: string,
 *       address?: string,
 *       phone?: string,
 *       email?: string,
 *       otherInfo?: string,
 *   },
 *   invoice?: {
 *       label?: string,
 *       num?: number,
 *       invDate?: string,
 *       invGenDate?: string,
 *       headerBorder?: boolean,
 *       tableBodyBorder?: boolean,
 *       header?: string[],
 *       table?: any,
 *       invTotalLabel?: string,
 *       invTotal?: string,
 *       invCurrency?: string,
 *       invDescLabel?: string,
 *       invDesc?: string,
 *       row1?: {
 *           col1?: string,
 *           col2?: string,
 *           col3?: string,
 *           style?: {
 *               fontSize?: number
 *           }
 *       },
 *       row2?: {
 *           col1?: string,
 *           col2?: string,
 *           col3?: string,
 *           style?: {
 *               fontSize?: number
 *           }
 *       },
 *   },
 *   footer?: {
 *       text?: string,
 *   },
 *   pageEnable?: boolean,
 *   pageLabel?: string, } } props
 */
export function relatorioAdministracao(props) {
  const param = {
    outputType: props.outputType || 'save',
    returnJsPDFDocObject: props.returnJsPDFDocObject || false,
    fileName: props.fileName || '',
    orientationLandscape: props.orientationLandscape || false,
    logo: {
      src: props.logo?.src || '',
      width: props.logo?.width || '',
      height: props.logo?.height || '',
      margin: {
        top: props.logo?.margin?.top || 0,
        left: props.logo?.margin?.left || 0,
      },
    },
    business: {
      name: props.business?.name || '',
      address: props.business?.address || '',
      phone: props.business?.phone || '',
      email: props.business?.email || '',
      email_1: props.business?.email_1 || '',
      website: props.business?.website || '',
    },
    contact: {
      label: props.contact?.label || '',
      name: props.contact?.name || '',
      address: props.contact?.address || '',
      phone: props.contact?.phone || '',
      email: props.contact?.email || '',
      otherInfo: props.contact?.otherInfo || '',
    },
    invoice: {
      label: props.invoice?.label || '',
      invTotalLabel: props.invoice?.invTotalLabel || '',
      num: props.invoice?.num || '',
      invDate: props.invoice?.invDate || '',
      invGenDate: props.invoice?.invGenDate || '',
      headerBorder: props.invoice?.headerBorder || false,
      tableBodyBorder: props.invoice?.tableBodyBorder || false,
      header: props.invoice?.header || [],
      table: props.invoice?.table || [],
      invTotal: props.invoice?.invTotal || '',
      invCurrency: props.invoice?.invCurrency || '',
      invDescLabel: props.invoice?.invDescLabel || '',
      invDesc: props.invoice?.invDesc || '',
      assinante1: props.invoice?.assinante1 || '',
      assinante2: props.invoice?.assinante2 || '',
      row1: {
        col1: props.invoice?.row1?.col1 || '',
        col2: props.invoice?.row1?.col2 || '',
        col3: props.invoice?.row1?.col3 || '',
        style: {
          fontSize: props.invoice?.row1?.style?.fontSize || 12,
        },
      },
      row2: {
        col1: props.invoice?.row2?.col1 || '',
        col2: props.invoice?.row2?.col2 || '',
        col3: props.invoice?.row2?.col3 || '',
        style: {
          fontSize: props.invoice?.row2?.style?.fontSize || 12,
        },
      },
    },
    footer: {
      text: props.footer?.text || '',
    },
    pageEnable: props.pageEnable || false,
    pageLabel: props.pageLabel || 'Page',
  }

  const splitTextAndGetHeight = (text, size) => {
    const lines = doc.splitTextToSize(text, size)
    return {
      text: lines,
      height: doc.getTextDimensions(lines).h,
    }
  }
  if (param.invoice.table && param.invoice.table.length) {
    if (param.invoice.table[0].length !== param.invoice.header.length)
      throw new Error('Length of header and table column must be equal.')
  }

  const options = {
    orientation: param.orientationLandscape ? 'landscape' : '',
  }

  const doc = new jsPDF(options)

  const docWidth = doc.internal.pageSize.width
  const docHeight = doc.internal.pageSize.height

  const colorBlack = '#000000'
  const colorGray = '#4d4e53'
  // starting at 15mm
  let currentHeight = 15
  // var startPointRectPanel1 = currentHeight + 6;

  const pdfConfig = {
    headerTextSize: 20,
    labelTextSize: 12,
    fieldTextSize: 10,
    lineHeight: 6,
    subLineHeight: 4,
  }

  doc.setFontSize(pdfConfig.headerTextSize)
  doc.setTextColor(colorBlack)
  doc.text(docWidth - 10, currentHeight, param.business.name, 'right')
  doc.setFontSize(pdfConfig.fieldTextSize)

  if (param.logo.src) {
    const imageHeader = new Image()
    imageHeader.src = param.logo.src
    // doc.text(htmlDoc.sessionDateText, docWidth - (doc.getTextWidth(htmlDoc.sessionDateText) + 10), currentHeight);
    doc.addImage(
      imageHeader,
      10 + param.logo.margin.left,
      currentHeight - 5 + param.logo.margin.top,
      param.logo.width,
      param.logo.height
    )
  }

  doc.setTextColor(colorGray)

  currentHeight += pdfConfig.subLineHeight
  currentHeight += pdfConfig.subLineHeight
  doc.text(docWidth - 10, currentHeight, param.business.address, 'right')
  currentHeight += pdfConfig.subLineHeight
  doc.text(docWidth - 10, currentHeight, param.business.phone, 'right')
  doc.setFontSize(pdfConfig.fieldTextSize)
  // doc.setTextColor(colorGray);
  currentHeight += pdfConfig.subLineHeight
  doc.text(docWidth - 10, currentHeight, param.business.email, 'right')

  currentHeight += pdfConfig.subLineHeight
  doc.text(docWidth - 10, currentHeight, param.business.email_1, 'right')

  currentHeight += pdfConfig.subLineHeight
  doc.text(docWidth - 10, currentHeight, param.business.website, 'right')

  // line breaker after logo & business info
  if (param.invoice.header.length) {
    currentHeight += pdfConfig.subLineHeight
    doc.line(10, currentHeight, docWidth - 10, currentHeight)
  }

  // Contact part
  // doc.setTextColor(colorGray)
  // doc.setFontSize(pdfConfig.fieldTextSize)
  currentHeight += pdfConfig.lineHeight
  if (param.contact.label || param.invoice.invGenDate) {
    doc.text(10, currentHeight, param.contact.label)
    doc.text(docWidth - 10, currentHeight, param.invoice.invGenDate, 'right')

    currentHeight += pdfConfig.lineHeight
  }

  doc.setTextColor(colorBlack)
  doc.setFontSize(pdfConfig.headerTextSize - 5)
  if (param.contact.name) doc.text(10, currentHeight, param.contact.name)

  if (param.invoice.label && param.invoice.num) {
    doc.text(
      docWidth - 10,
      currentHeight,
      param.invoice.label + param.invoice.num,
      'right'
    )
  }

  if (param.contact.name || (param.invoice.label && param.invoice.num))
    currentHeight += pdfConfig.subLineHeight

  doc.setTextColor(colorGray)
  doc.setFontSize(pdfConfig.fieldTextSize - 2)

  if (param.contact.address || param.invoice.invDate) {
    doc.text(10, currentHeight, param.contact.address)

    // texto maior
    doc.setTextColor(colorBlack)
    doc.setFontSize(pdfConfig.headerTextSize - 7)
    doc.text(docWidth - 10, currentHeight + 2, param.invoice.invDate, 'right')
    currentHeight += pdfConfig.subLineHeight
  }
  // voltar texto pequeno
  doc.setTextColor(colorGray)
  doc.setFontSize(pdfConfig.fieldTextSize - 2)
  if (param.contact.phone) {
    doc.text(10, currentHeight, param.contact.phone)
    currentHeight += pdfConfig.subLineHeight
  }

  if (param.contact.email) {
    doc.text(10, currentHeight, param.contact.email)
    currentHeight += pdfConfig.subLineHeight
  }

  if (param.contact.otherInfo)
    doc.text(10, currentHeight, param.contact.otherInfo)
  else currentHeight -= pdfConfig.subLineHeight
  // end contact part

  // TABLE PART
  // var tdWidth = 31.66;
  // 10 margin left - 10 margin right
  const tdWidth = (doc.getPageWidth() - 20) / param.invoice.header.length
  const lastIndex = param.invoice.header.length - 1

  const addTableHeaderBoarder = () => {
    currentHeight += 2
    for (let i = 0; i < param.invoice.header.length; i++) {
      if (i === 0) doc.rect(10, currentHeight, tdWidth, 7)
      else doc.rect(tdWidth * i + 10, currentHeight, tdWidth, 7)
    }
    currentHeight -= 2
  }
  const addTableBodyBoarder = (lineHeight) => {
    for (let i = 0; i < param.invoice.header.length; i++) {
      if (i === 0) doc.rect(10, currentHeight, tdWidth, lineHeight)
      else doc.rect(tdWidth * i + 10, currentHeight, tdWidth, lineHeight)
    }
  }
  const addTableHeader = () => {
    if (param.invoice.headerBorder) addTableHeaderBoarder()

    currentHeight += pdfConfig.subLineHeight
    doc.setTextColor(colorBlack)
    doc.setFontSize(pdfConfig.fieldTextSize)
    // border color
    doc.setDrawColor(colorGray)
    currentHeight += 2

    param.invoice.header.forEach(function (row, index) {
      if (index === 0) doc.text(row, 11, currentHeight)
      else if (index === 1) doc.text(row, 15, currentHeight)
      else if (index === 2) doc.text(row, 3 * tdWidth, currentHeight)
      else if (index === 3) doc.text(row, 4 * tdWidth, currentHeight)
      else if (index === lastIndex)
        doc.text(row, docWidth - 25, currentHeight, 'right')
      else doc.text(row, index * tdWidth + 11, currentHeight)
    })

    currentHeight += pdfConfig.subLineHeight - 1
    doc.setTextColor(colorGray)
  }
  addTableHeader()

  // table body
  const tableBodyLength = param.invoice.table.length
  param.invoice.table.forEach(function (row, index) {
    doc.line(10, currentHeight, docWidth - 10, currentHeight)

    // get nax height for the current row
    const rowsHeight = []
    const getRowsHeight = function () {
      row.forEach(function (rr) {
        // size should be the same used in other td
        const item = splitTextAndGetHeight(rr.toString(), tdWidth - 1) // minus 1, to fix the padding issue between borders
        rowsHeight.push(item.height)
      })
    }
    getRowsHeight()
    const maxHeight = Math.max(...rowsHeight)

    // body borders
    if (param.invoice.tableBodyBorder) addTableBodyBoarder(maxHeight + 1)

    // display text into row cells
    // Object.entries(row).forEach(function(col, index) {
    row.forEach(function (rr, index) {
      const item = splitTextAndGetHeight(rr.toString(), 3 * tdWidth) // minus 1, to fix the padding issue between borders

      if (index === 0) doc.text(item.text, 11, currentHeight + 4)
      else if (index === 1) doc.text(item.text, 15, currentHeight + 4)
      else if (index === 2) doc.text(item.text, 3 * tdWidth, currentHeight + 4)
      else if (index === 3) doc.text(item.text, 4 * tdWidth, currentHeight + 4)
      else if (index === lastIndex)
        doc.text(item.text, docWidth - 25, currentHeight + 4, 'right')
      else doc.text(item.text, 11 + index * tdWidth, currentHeight + 4)
    })

    currentHeight += maxHeight - 4

    // td border height
    currentHeight += 5

    // pre-increase currentHeight to check the height based on next row
    if (index + 1 < tableBodyLength) currentHeight += maxHeight

    if (
      param.orientationLandscape &&
      (currentHeight > 185 ||
        (currentHeight > 178 && doc.getNumberOfPages() > 1))
    ) {
      doc.addPage()
      currentHeight = 10
      if (index + 1 < tableBodyLength) addTableHeader()
    }

    if (
      !param.orientationLandscape &&
      (currentHeight > 265 ||
        (currentHeight > 255 && doc.getNumberOfPages() > 1))
    ) {
      doc.addPage()
      currentHeight = 10
      if (index + 1 < tableBodyLength) addTableHeader()
      //       else
      //         currentHeight += pdfConfig.subLineHeight + 2 + pdfConfig.subLineHeight - 1; //same as in addtableHeader
    }

    // reset the height that was increased to check the next row
    if (index + 1 < tableBodyLength && currentHeight > 30)
      // check if new page
      currentHeight -= maxHeight
  })
  //     doc.line(10, currentHeight, docWidth - 10, currentHeight); //nese duam te shfaqim line ne fund te tabeles

  const invDescSize = splitTextAndGetHeight(
    param.invoice.invDesc,
    docWidth / 2
  ).height
  // END TABLE PART

  if (param.orientationLandscape && currentHeight + invDescSize > 173) {
    doc.addPage()
    currentHeight = 10
  }

  if (!param.orientationLandscape && currentHeight + invDescSize > 270) {
    doc.addPage()
    currentHeight = 10
  }

  doc.setTextColor(colorBlack)
  doc.setFontSize(pdfConfig.labelTextSize)
  currentHeight += pdfConfig.lineHeight

  // line breaker before invoce total
  if (
    param.invoice.header.length &&
    (param.invoice.invTotal ||
      param.invoice.invTotalLabel ||
      param.invoice.invCurrency)
  ) {
    doc.line(docWidth / 2, currentHeight, docWidth - 10, currentHeight)
    currentHeight += pdfConfig.lineHeight
  }

  //     doc.text("Faleminderit!", 10, currentHeight);
  doc.text(docWidth / 1.5, currentHeight, param.invoice.invTotalLabel, 'right')
  doc.text(docWidth - 25, currentHeight, param.invoice.invTotal, 'right')
  doc.text(docWidth - 10, currentHeight, param.invoice.invCurrency, 'right')

  // row1
  if (
    param.invoice.row1 &&
    (param.invoice.row1.col1 ||
      param.invoice.row1.col2 ||
      param.invoice.row1.col3)
  ) {
    currentHeight += pdfConfig.lineHeight
    doc.setFontSize(param.invoice.row1.style.fontSize)

    doc.text(docWidth / 1.5, currentHeight, param.invoice.row1.col1, 'right')
    doc.text(docWidth - 25, currentHeight, param.invoice.row1.col2, 'right')
    doc.text(docWidth - 10, currentHeight, param.invoice.row1.col3, 'right')
  }
  // end row1

  // row2
  if (
    param.invoice.row2 &&
    (param.invoice.row2.col1 ||
      param.invoice.row2.col2 ||
      param.invoice.row2.col3)
  ) {
    currentHeight += pdfConfig.lineHeight
    doc.setFontSize(param.invoice.row2.style.fontSize)

    doc.text(docWidth / 1.5, currentHeight, param.invoice.row2.col1, 'right')
    doc.text(docWidth - 25, currentHeight, param.invoice.row2.col2, 'right')
    doc.text(docWidth - 10, currentHeight, param.invoice.row2.col3, 'right')
  }
  // end row2

  if (param.orientationLandscape && currentHeight + invDescSize > 173) {
    doc.addPage()
    currentHeight = 10
  }

  if (!param.orientationLandscape && currentHeight + invDescSize > 270) {
    doc.addPage()
    currentHeight = 10
  }

  doc.setTextColor(colorBlack)
  currentHeight += pdfConfig.subLineHeight
  currentHeight += pdfConfig.subLineHeight
  //   currentHeight += pdfConfig.subLineHeight;
  doc.setFontSize(pdfConfig.labelTextSize)

  // add num of pages at the bottom
  if (doc.getNumberOfPages() > 1) {
    for (let i = 1; i <= doc.getNumberOfPages(); i++) {
      doc.setFontSize(pdfConfig.fieldTextSize - 2)
      doc.setTextColor(colorGray)

      if (param.pageEnable) {
        doc.text(docWidth / 2, docHeight - 10, param.footer.text, 'center')
        doc.setPage(i)
        doc.text(
          param.pageLabel + ' ' + i + ' / ' + doc.getNumberOfPages(),
          docWidth - 20,
          doc.internal.pageSize.height - 6
        )
      }

      if (param.orientationLandscape && currentHeight + invDescSize > 183) {
        doc.addPage()
        currentHeight = 10
      }

      if (!param.orientationLandscape && currentHeight + invDescSize > 270) {
        doc.addPage()
        currentHeight = 10
      }
    }
  }

  const addSigning = () => {
    doc.setFontSize(pdfConfig.labelTextSize - 4)
    doc.setTextColor(colorBlack)

    const lineHeight = docHeight - 40
    const signatureHeight = docHeight - 37

    doc.line(10, lineHeight, docWidth / 2 - 10, lineHeight, 'F')
    doc.line(docWidth / 2 + 10, lineHeight, docWidth - 10, lineHeight, 'F')
    doc.text(
      param.invoice.assinante1.toUpperCase(),
      0.25 * docWidth,
      signatureHeight,
      'center'
    )
    doc.text(
      param.invoice.assinante2.toUpperCase(),
      0.75 * docWidth,
      signatureHeight,
      'center'
    )
    currentHeight = docHeight - 30
    doc.setTextColor(colorGray)
    doc.setFontSize(pdfConfig.fieldTextSize - 1)

    const lines = doc.splitTextToSize(param.invoice.invDesc, docWidth * 0.9)
    // text in left half
    doc.text(lines, 10, currentHeight)
    currentHeight +=
      doc.getTextDimensions(lines).h > 5
        ? doc.getTextDimensions(lines).h + 6
        : pdfConfig.lineHeight

    return currentHeight
  }
  addSigning()

  // add num of page at the bottom
  if (doc.getNumberOfPages() === 1 && param.pageEnable) {
    doc.setFontSize(pdfConfig.fieldTextSize - 2)
    doc.setTextColor(colorGray)
    doc.text(docWidth / 2, docHeight - 10, param.footer.text, 'center')
    doc.text(
      param.pageLabel + '1 / 1',
      docWidth - 20,
      doc.internal.pageSize.height - 6
    )
  }

  let returnObj = {
    pagesNumber: doc.getNumberOfPages(),
  }

  if (param.returnJsPDFDocObject) {
    returnObj = {
      ...returnObj,
      jsPDFDocObject: doc,
    }
  }

  if (param.outputType === 'save') doc.save(param.fileName)
  else if (param.outputType === 'blob') {
    const blobOutput = doc.output('blob')
    returnObj = {
      ...returnObj,
      blob: blobOutput,
    }
  } else if (param.outputType === 'datauristring') {
    returnObj = {
      ...returnObj,
      dataUriString: doc.output('datauristring', {
        filename: param.fileName,
      }),
    }
  } else if (param.outputType === 'arraybuffer') {
    returnObj = {
      ...returnObj,
      arrayBuffer: doc.output('arraybuffer'),
    }
  } else
    doc.output(param.outputType, {
      filename: param.fileName,
    })

  return returnObj
}
