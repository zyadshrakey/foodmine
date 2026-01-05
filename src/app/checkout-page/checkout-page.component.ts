import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { UserService } from '../services/user/user.service';
import { Order } from '../shared/models/Order';
import { OrderService } from '../services/order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastr.warning('Please fill the inputs', 'Invalid Input');
      return;
    }

    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;

    this.orderService.create(this.order).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.router.navigateByUrl('/payment'); // Or success page
        this.toastr.success('Order placed successfully!', 'Success');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Failed to create order', 'Error');
      },
    });
  }
}
