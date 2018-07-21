import { AuthService } from './../../service/auth.service';
import { UploadService } from './../../service/upload.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-download-materials',
  templateUrl: './download-materials.component.html',
  styleUrls: ['./download-materials.component.css'],
  providers: [UploadService]
})
export class DownloadMaterialsComponent implements OnInit {
  files: any[];

  constructor(private userService: UserService, private uploadService: UploadService, private auth: AuthService) { }

  ngOnInit() {
    this.getAvailableMaterials();
  }

  getAvailableMaterials() {
    this.userService.getAvailableMaterials()
      .subscribe((response: any) => {
        if (response.success !== false) {
          this.files = response
        }
        else {
          alert('Your session has expired. Please login again to continue.')
          this.auth.logout();
        }
      });
  }


  async download(filepath) {
    window.open(filepath);
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
