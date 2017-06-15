import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product, Comment } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  comments: Comment[];

  newRating: number = 5;
  newComment: string = "";
  isShowTextarea: boolean = false;

  constructor( private routerInfo:ActivatedRoute,
  			   private productService: ProductService
  ) { }

  ngOnInit() {
  	let productId:number = this.routerInfo.snapshot.params["id"];
  	this.productService.getProduct(productId).subscribe(data => this.product = data);
  	this.productService.getCommentsForProductId(productId).subscribe( data => this.comments = data);
  }

  submitComment(){
  	let  comment = new  Comment(0, this.product.id, new Date().toISOString(), "somebody", this.newRating, this.newComment)
  	console.log(comment);
  	this.comments.unshift(comment);

  	let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0)
  	this.product.rating = sum/this.comments.length;

  	this.newRating = 5;
  	this.newComment = "";
  	this.isShowTextarea = false;
  }


}
