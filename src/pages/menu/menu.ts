import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage  } from '../home/home';
import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage  } from '../products-by-category/products-by-category';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: Component;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage
    this.categories=[];

    this.WooCommerce = WC({
      url: "http://localhost/wordpress/",
      consumerKey: "ck_ce3db1db0fcfde7b2025e8784f62be6668c46520",
      consumerSecret: "cs_5e61d2ca56142377a7ad82b5db08aecd70ddd7e6"
    });

    this.WooCommerce.getAsync("products/categories").then((data)=>{
      console.log(JSON.parse(data.body).product_categories)
      let temp: any[] = JSON.parse(data.body).product_categories;

      for (let i = 0; i < temp.length; i ++){
        if(temp[i].parent == 0){
          if(temp[i].slug == "clothing")
            temp[i].icon = "shirt"
          if(temp[i].slug == "music")
            temp[i].icon = "musical-notes"
          if(temp[i].slug == "posters")
            temp[i].icon = "images"

          this.categories.push(temp[i]);
        }
          
      }
    }, (err)=>{
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openCategoryPage(category){

    this.childNavCtrl.setRoot(ProductsByCategoryPage, { "category": category })
  }

}
