'use server';

import * as fs from 'fs/promises';
import path from 'path';

type FormState = {
  message: string;
};

export async function handleUpload(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const csvFile = formData.get('csv') as File;

  if (!csvFile || csvFile.size === 0) {
    return { message: 'Error: Please select a file to upload.' };
  }

  try {
    const buffer = await csvFile.arrayBuffer();
    const csvBuffer = Buffer.from(buffer);
    const sharedDataDir = path.resolve(process.cwd(), '..', 'uploads');
    const filePath = path.join(sharedDataDir, csvFile.name);

    await fs.mkdir(sharedDataDir, { recursive: true });

    await fs.writeFile(filePath, csvBuffer);

    console.log(`File successfully saved to: ${filePath}`);

    return { message: `Success! File "${csvFile.name}" saved for processing.` };
  } catch (error) {
    console.error('File saving failed:', error);
    return { message: `Error: Failed to save file. Check server logs.` };
  }
}
