import { promises as fs } from 'fs';
import * as path from 'path';

export const saveImageLocally = async (
  imageBase64: string,
): Promise<string> => {
  const buffer = Buffer.from(imageBase64, 'base64');

  const fileName = `image_${Date.now()}.jpg`;
  const filePath = path.join(__dirname, '..', '..', 'uploads', fileName);

  await fs.writeFile(filePath, buffer);
  return `http://localhost:3000/uploads/${fileName}`;
};
