import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  productId: number;
  constructor() { }

  ngOnInit(): void {
    this.productId = +window.location.pathname.split('/')[2];
  }

}
