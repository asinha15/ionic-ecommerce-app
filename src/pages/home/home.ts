import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];

  @ViewChild('productSlides') productSlides: Slides;


  constructor(public navCtrl: NavController) {

    this.WooCommerce = WC({
      url: "http://localhost/wordpress/",
      consumerKey: "ck_ce3db1db0fcfde7b2025e8784f62be6668c46520",
      consumerSecret: "cs_5e61d2ca56142377a7ad82b5db08aecd70ddd7e6"
    });

    this.WooCommerce.getAsync("products").then((data) => {
        console.log(JSON.parse(data.body));
        this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad(){
    //Make Product Slides manually due to defect in ionic.
    setInterval(()=> {
      if (this.productSlides.getActiveIndex() == this.productSlides.length() -1)
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();
    }, 3000)
  }

}
