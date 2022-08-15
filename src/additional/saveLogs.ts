import { mkdir, readdir, appendFile, stat } from 'fs/promises';
import { join } from 'path';

const createFile = async (path: string) => {
  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const datestring =
    day + '-' + month + '-' + date.getFullYear() + ' ' + hours + '-' + minutes;
  const pathToFile = join(path, `${datestring}.log`);
  await appendFile(pathToFile, '');
  return pathToFile;
};

const saveData = async (file: string, message: string, obj: unknown) => {
  return appendFile(
    file,
    `[${new Date().toUTCString()}] ${message} ${JSON.stringify(obj)}\n`,
  );
};

const checkSize = async (
  folder: string,
  path: string,
  message: string,
  obj: unknown,
) => {
  const maxSize = +process.env.LOG_SIZE_KB * 1024;
  const fileStat = await stat(path);
  const messageSize = Buffer.byteLength(
    `[${new Date().toUTCString()}] ${message} ${JSON.stringify(obj)}\n`,
  );
  if (fileStat.size + messageSize > maxSize) {
    const createdName = await createFile(folder);
    return createdName;
  } else {
    return path;
  }
};

export const saveLog = async (type: string, message: string, obj: unknown) => {
  const folder = join(process.cwd() + '/logs/' + type);
  let file: string;
  try {
    const folderFiles = await readdir(folder);
    file = join(folder, `${folderFiles[folderFiles.length - 1]}`);
    file = await checkSize(folder, file, message, obj);
    await saveData(file, message, obj);
  } catch (e) {
    await mkdir(folder, { recursive: true });
    const createdName = await createFile(folder);
    await saveData(createdName, message, obj);
  }
};
