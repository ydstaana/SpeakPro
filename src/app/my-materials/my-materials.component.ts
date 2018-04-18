import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-my-materials',
  templateUrl: './my-materials.component.html',
  styleUrls: ['./my-materials.component.css']
})
export class MyMaterialsComponent implements OnInit {
  files: any[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAvailableMaterials();
  }

  getAvailableMaterials() {
    this.userService.getAvailableMaterials()
      .subscribe((response: any[]) => this.files = response);
  }

  uploadMaterial(){

  }
}
