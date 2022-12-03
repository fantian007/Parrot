import { AxiosResponse } from 'axios';
import FileSaver from 'file-saver';
import { isNil } from 'lodash';

/**
 * 从 xhr 响应头 获取 文件名
 */
export function getFileName(headers: any, name = 'data') {
  const filenameMatch = headers['content-disposition'].match(/filename\**=([^\.]*(\..*)?)/);
  const suffix = filenameMatch[2] || '.csv';
  let filename = `${name}${suffix}`;

  if (/^[\d\w-\.]+$/.test(filenameMatch[1])) {
    filename = filenameMatch[1];
  }

  if (filename[0] === '.') {
    filename = `${name}${filename}`;
  }
  return filename;
}

/**
 * file-saver 保存为文件
 * @param config
 */
export function saveFileByFileSaver({
  data,
  headers,
  filename,
}: {
  data: Blob;
  headers: AxiosResponse['headers'];
  filename: string | undefined;
}) {
  const name = filename ?? getFileName(headers) ?? 'download.csv';

  if (!isNil(data)) {
    FileSaver.saveAs(data, name, {
      autoBom: false,
    });
  }
}

/**
 * a 标签 保存文件
 */
export function saveFileByALink({
  data,
  headers,
  filename,
}: {
  data: Blob;
  headers: AxiosResponse['headers'];
  filename: string | undefined;
}) {
  const _filename = filename ?? getFileName(headers) ?? 'download.csv';

  // @ts-ignore
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // @ts-ignore
    window.navigator.msSaveBlob(data, filename);
  } else {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.setAttribute('download', _filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
}
