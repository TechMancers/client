import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}

  imageUpload(imageForm: FormData,folder: string, uploadType: string) {
    console.log('imageForm in service:', imageForm);
    const formDataEntries = imageForm as any;
    for (let pair of formDataEntries.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    const headers = new HttpHeaders({
      'uploadType': uploadType,
      'folder': folder
    });
    console.log('header', headers);
    return this.http.post('http://localhost:3000/upload', imageForm,{headers: headers});
  }

  removeImage(key: any) {
    return this.http.delete(`http://localhost:3000/delete/${key}`);
  }
}
