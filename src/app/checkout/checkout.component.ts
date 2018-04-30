import { ClassService } from './../../service/class.service';
import { PaymentService } from './../../service/payment.service';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Sched } from '../../model/sched';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { MaterializeAction } from 'angular2-materialize';
import { toast } from 'angular2-materialize';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [PaymentService]
})

export class CheckoutComponent implements OnInit {
  cart: any = [];
  confirmationModal: EventEmitter<string | MaterializeAction>;
  creditCardForm: FormGroup;
  totalPrice: string;

  constructor(private classService: ClassService, private paymentService: PaymentService, private router: Router, private fb: FormBuilder) {
    this.cart = this.classService.getCart();
    this.confirmationModal = new EventEmitter<string | MaterializeAction>();
    this.creditCardForm = this.createCCForm();
    this.totalPrice = (this.cart.length * 6.00).toFixed(2).toString();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    TCO.loadPubKey('sandbox');
  }


  createCCForm() {
    return this.fb.group({
      sellerId: ['901378548'],
      publishableKey: ['CF3531E4-3895-4E14-8110-3662393C7B6C'],
      ccNo: ['', Validators.required],
      cvv: ['', Validators.required],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
    });
  }

  checkout(credentials) {
    const selectedClasses = this.cart.map((selected) => {
      return selected._id;
    })

    TCO.requestToken((res) => {
      const data = { tcoToken: res.response.token.token, total: this.totalPrice };

      this.openModal();

      console.log(data);
      forkJoin([this.paymentService.checkout(data),
      this.classService.addClass(selectedClasses)])
        .subscribe((res) => {
          this.closeModal();
          toast('You have successfully enrolled these classes', 2000)
          this.router.navigate(['dashboard/my-schedule']);
        });

    }, (err) => toast(err.errorMsg, 2000), credentials);
  }

  openModal() {
    this.confirmationModal.emit({ action: "modal", params: ['open'] });
  }

  closeModal() {
    this.confirmationModal.emit({ action: "modal", params: ['close'] });
  }
}