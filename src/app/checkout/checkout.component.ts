import { ClassService } from './../../service/class.service';
import { PaymentService } from './../../service/payment.service';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Sched } from '../../model/sched';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { MaterializeAction } from 'angular2-materialize';
import { toast } from 'angular2-materialize';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [PaymentService]
})

export class CheckoutComponent implements OnInit {
  cart: any = null;
  confirmationModal: EventEmitter<string | MaterializeAction>;
  creditCardForm: FormGroup;
  totalPrice = 0;

  constructor(private classService: ClassService, private paymentService: PaymentService, private router: Router, private fb: FormBuilder, private auth: AuthService) {
    this.getCart();
    this.confirmationModal = new EventEmitter<string | MaterializeAction>();
    this.creditCardForm = this.createCCForm();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    TCO.loadPubKey('sandbox');
  }

  getCart(){
    this.cart = null;
    this.totalPrice = 0;
    this.paymentService.getCart()
      .subscribe((response: any) => {
        if (response.success !== false) {
          this.cart = response.content;
          this.totalPrice = (this.cart.length * 6.00);
        }
        else {
          alert('Your session has expired. Please login again to continue.')
          this.auth.logout();
        }
      }, (err) => toast('An error occured', 2000));
  }


  createCCForm() {
    return this.fb.group({
      sellerId: ['901378548'],
      publishableKey: ['CF3531E4-3895-4E14-8110-3662393C7B6C'],
      ccNo: ['4000000000000002', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      expMonth: ['', [Validators.required, Validators.maxLength(2), Validators.pattern(/^[0-9]{2}$/)]],
      expYear: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(/^[0-9]{4}$/)]],
    });
  }

  checkout(credentials) {
    TCO.requestToken((res) => {
      const data = { tcoToken: res.response.token.token, total: this.totalPrice };
      this.openModal();
      this.paymentService.checkout(data).subscribe(
        response => {
          this.classService.addClass(this.cart)
            .subscribe((response: any) => {
              if (response.success !== false) {
                this.closeModal();
                toast('You have successfully enrolled these classes', 2000)
                this.router.navigate(['dashboard/my-schedule']);
              }
              else {
                alert('Your session has expired. Please login again to continue.')
                this.auth.logout();
              }
            })
        },
        error => {
          this.closeModal();
          toast('Failed to authorize the provided credit card details. Please try again.', 2000);
        });
    }, (err) => toast(err.errorMsg, 2000), credentials);
  }

  openModal() {
    this.confirmationModal.emit({ action: "modal", params: ['open'] });
  }

  closeModal() {
    this.confirmationModal.emit({ action: "modal", params: ['close'] });
  }

  removeItem(item){
    this.paymentService.removeItem(item._id)
      .subscribe((response: any) => {
        if (response.success !== false) {
          toast(`You have successfully remove an item from cart`, 2000);
          this.getCart();
        }
        else {
          alert('Your session has expired. Please login again to continue.')
          this.auth.logout();
        }
      }, (err) => toast(err.errorMsg, 2000));
  }
}
