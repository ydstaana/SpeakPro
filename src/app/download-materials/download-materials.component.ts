import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-materials',
  templateUrl: './download-materials.component.html',
  styleUrls: ['./download-materials.component.css']
})
export class DownloadMaterialsComponent implements OnInit {
  files: any[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAvailableMaterials();
  }

  getAvailableMaterials() {
    this.userService.getAvailableMaterials()
      .subscribe((response: any[]) => this.files = response);
  }


  download(filename) {
    this.userService.downloadFile(filename)
      .subscribe((response) => {
        // const blob = new Blob([response]);
        // const url = window.URL.createObjectURL(blob);
        // window.open(url);
      });
  }

  formatBytes(bytes) {
    if (bytes !== 0) {
      const k = 1024;
      const dm = 2;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    return '0 B'
  }
}
