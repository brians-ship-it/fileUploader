import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { resolve } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  percent = 0;
  fileName = '';
  bar: string;
  selectedFile: File = null;
  // uri = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fileName = this.selectedFile.name
    console.log(event);
  }

  onUpload(event) {
    this.bar = 'bar'
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    
    return this.http.post('https://us-central1-fileuploader-787db.cloudfunctions.net/uploadFile', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(res => {
      if (res.type === HttpEventType.UploadProgress) {
        this.percent = Math.round((res.loaded / res.total) * 100);
        console.log('Upload progress' + this.percent  + '%')
      } else {
        console.log(res);
      }
    })
  }
}
