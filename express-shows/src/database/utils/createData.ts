import { promises as fs } from 'fs';

export enum filenames {
  users = 'users.json',
  bands = 'bands.json',
  shows = 'shows.json',
  reservations = 'reservations.json',
}

const getDbPath = () => {
  return 'db';
};
export async function getJSONfromFile(
  filename: filenames,
  dbPath: string
): Promise<any> {
  const filePath = dbPath + filename;

  const data = await fs.readFile(filePath);
  return JSON.parse(data.toString());
}
