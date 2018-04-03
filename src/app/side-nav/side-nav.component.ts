import {MaterializeDirective} from "angular2-materialize";
import {Component} from "@angular/core"
import {Location} from '@angular/common';

@Component({
    selector: "sideNav",
    styles: [`
      nav {
          height: 0px;
      }
      
      li.active {
        background-color: #ee6e73
      }
    `],
    template: `
      <nav>
        <ul id="slide-out" class="side-nav fixed">
          <li routerLinkActive="active"><a href="/edit-profile">Edit Profile</a></li>
          <li routerLinkActive="active"><a [routerLink]="my-schedule">My Schedule</a></li>
          <li routerLinkActive="active"><a [routerLink]="add-classes">Add Classes</a></li>
          <li routerLinkActive="active"><a [routerLink]="materials-modules">Materials and Modules</a></li>
        </ul>
        <a materialize="sideNav" [materializeParams]="[{edge:'left'}]" href="#" data-activates="slide-out" class="button-collapse show-on-large"><i class="mdi-navigation-menu"></i></a>
        
      </nav>
    `
}) 	
export class SideNavComponent {
  routeNames = ["Buttons", "Carousel", "Chips", "Collapsible", "Dialogs", "Dropdown", "Forms", "Tabs", "DatePicker", "Parallax", "ModelBindings"];
}