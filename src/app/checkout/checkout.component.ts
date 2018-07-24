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
import { visitValue } from '@angular/compiler/src/util';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [PaymentService]
})

export class CheckoutComponent implements OnInit {
  cart: any = null;
  ccProviders: Object = [];
  ccRegex: Object;
  confirmationModal: EventEmitter<string | MaterializeAction>;
  creditCardForm: FormGroup;
  totalPrice = 0;

  constructor(private classService: ClassService, private paymentService: PaymentService, private router: Router, private fb: FormBuilder, private auth: AuthService) {
    this.getCart();
    this.confirmationModal = new EventEmitter<string | MaterializeAction>();
    this.creditCardForm = this.createCCForm();
  }

  ngOnInit() {
    this.ccProviders = this.paymentService.getCCProviders();
    this.ccRegex = this.paymentService.getCCRegex();
    this.onCCProviderChange();
  }

  ngAfterViewInit() {
    TCO.loadPubKey('sandbox');
  }

  /*******************
*  Form-related Functions
*********************/
  createCCForm() {
    return this.fb.group({
      sellerId: ['901378548'],
      publishableKey: ['CF3531E4-3895-4E14-8110-3662393C7B6C'],
      ccProvider: ['Visa'],
      ccNo: ['', [Validators.required, Validators.pattern(/^4[0-9]{12}(?:[0-9]{3})?$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      expMonth: ['', [Validators.required, Validators.maxLength(2), Validators.pattern(/^[0-9]{2}$/)]],
      expYear: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(/^(2018|2019|20[2-9][0-9])$/)]],
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

  /*******************
*  Cart-related Functions
*********************/
  getCart() {
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

  removeItem(item) {
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

  /*******************
*  Modal Functions
*********************/
  openModal() {
    this.confirmationModal.emit({ action: "modal", params: ['open'] });
  }

  closeModal() {
    this.confirmationModal.emit({ action: "modal", params: ['close'] });
  }

  /*
    Replaces current regex with the regex of the selected credit card provider
    and validate the credit card number field using the new regex
  */
  onCCProviderChange() {
    this.creditCardForm.get('ccProvider').valueChanges.subscribe((value) => {
      this.ccNo.setValidators([Validators.required, Validators.pattern(this.ccRegex[value])]);
      this.ccNo.updateValueAndValidity();
    });
  }

  /****************************************************
  *  Shorthand Function for Accessing Form Controls
******************************************************/
  get ccNo() {
    return this.creditCardForm.get('ccNo');
  }

  get cvv() {
    return this.creditCardForm.get('cvv');
  }

  get expMonth() {
    return this.creditCardForm.get('expMonth');
  }

  get expYear() {
    return this.creditCardForm.get('expYear');
  }
}
