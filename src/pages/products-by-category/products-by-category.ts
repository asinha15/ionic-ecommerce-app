import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.page = 1;
    this.category = this.navParams.get("category");

    this.WooCommerce = WC({
      url: "http://localhost/wordpress/",
      consumerKey: "ck_ce3db1db0fcfde7b2025e8784f62be6668c46520",
      consumerSecret: "cs_5e61d2ca56142377a7ad82b5db08aecd70ddd7e6"
    });

    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

  loadMoreProducts(event){
    this.page ++;
    
    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug +
                                "&page=" + this.page).then((data) => {
      console.log(JSON.parse(data.body));
      this.products = this.products.concat(JSON.parse(data.body).products);

      if (event != null)
        {
          event.complete();
        }

      if (JSON.parse(data.body).products.length < 10 ){
        event.enable(false);

        this.toastCtrl.create({
          message: "No more products!",
          duration: 5000
        }).present();
      }

      }, (err) => {
      console.log(err)
    })
  }

}
