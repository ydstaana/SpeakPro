import { ClassService } from './../../service/class.service';
import { CheckoutService } from './../../service/checkout.service';
import { Component, OnInit, Input } from '@angular/core';
import { Sched } from '../../model/sched';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  cart: any = null;
  cardNumber :any;
  month :any;
  year :any;
  cvc :any;
  price = 0.00;

  constructor(private classService: ClassService, private checkoutService: CheckoutService,private router: Router) { }

  ngOnInit() {
    this.cart = this.classService.getCart();
    this.price = this.cart.length * 6.00;
  }

  ngAfterViewInit() {
    this.on2COready();
  }

  on2COready(){
    TCO.loadPubKey('sandbox', function() {

    });​
  }

  checkout() {
    let arr = this.cart.map((selected) => {
      return selected._id;
    })
    
    var args = {
      sellerId: "901378548",
      publishableKey: "CF3531E4-3895-4E14-8110-3662393C7B6C",
      ccNo: "4000000000000002",
      cvv: this.cvc,
      expMonth: this.month,
      expYear: this.year
    };

    console.log(args);
    
    TCO.requestToken(data => {
      var params = {
        tcoToken : data.response.token.token,
        total: this.price
      }
      console.log(params);

      this.checkoutService.checkoutClasses(params).subscribe(res => {
        this.classService.addClass(arr)
        .subscribe(res => {
          console.log(res);
          alert('You have successfully enrolled these classes');
          this.router.navigate(['/add-classes']);

        })
      });
     
    }, err => {
      if (err.errorCode === 200) {
        // This error code indicates that the ajax call failed. We recommend that you retry the token request.
      } else {
        alert(err.errorMsg);
      }
    }, args);
   
  }

}
