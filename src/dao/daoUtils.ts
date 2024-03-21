import fs from 'fs/promises';
import * as fsSync from 'fs';

export async function deleteAllFilesInFolder(folderPath: string): Promise<void> {
    if (!fsSync.existsSync(folderPath)) {
        return;
    }

    const files = await fs.readdir(folderPath);

    for (let file of files) {
        await fs.unlink(file);
    }
}