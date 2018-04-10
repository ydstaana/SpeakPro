import { ClassService } from './../../service/class.service';
import { Component, OnInit, Input } from '@angular/core';
import { Sched } from '../../model/sched';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: any = null;

  constructor(private classService: ClassService) { }

  ngOnInit() {
    this.cart = this.classService.getCart();
    console.log(this.cart)

  }

  checkout() {
    let arr = this.cart.map((selected) => {
      return selected._id;
    })
    this.classService.addClass(arr)
      .subscribe(res => {
        console.log(res);
        alert('You have successfully enrolled these classes');
      })
  }

}
