import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import config from '../../../shared/firebase/firebase.config';

@Injectable()
export class FileService {
  constructor() {
    initializeApp(config.firebaseConfig);
  }

  async upload(file: Express.Multer.File) {
    const storage = getStorage();
    const dateTime = this.giveCurrentDateTime();

    const storageRef = ref(
      storage,
      `files/${dateTime + '-' + file.originalname}`,
    );

    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata,
    );

    const downloadURL = await getDownloadURL(snapshot.ref);
    return {
      message: 'file uploaded to firebase storage',
      name: file.originalname,
      type: file.mimetype,
      downloadURL: downloadURL,
    };
  }

  giveCurrentDateTime = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
  };
}
