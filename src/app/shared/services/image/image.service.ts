import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class ImageService {

  constructor(private fireStorage: Storage) { }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.fireStorage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        url = await getDownloadURL(storageRef);
      } catch (error: any) { console.error(error) }
    } else { console.log('Wrong format') }
    return Promise.resolve(url);
  }

  deleteFile(imagePath: string): Promise<void> {
    const task = ref(this.fireStorage, imagePath);
    return deleteObject(task);
  }
}
