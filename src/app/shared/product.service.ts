import { Injectable, EventEmitter } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/Rx";

@Injectable()
export class ProductService {

	searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

/*	private products:Product[] = [
  		new Product(1,"第一个商品",1.99,4.5,"这是商品描述",["电子商品"]),
  		new Product(2,"第二个商品",2.99,1.5,"这是商品描述",["电子商品"]),
  		new Product(3,"第三个商品",3.99,2.5,"这是商品描述",["电子商品"]),
  		new Product(4,"第四个商品",4.99,3.5,"这是商品描述",["电子商品"]),
  		new Product(5,"第五个商品",5.99,1.5,"这是商品描述",["电子商品"]),
  		new Product(6,"第六个商品",6.99,5,"这是商品描述",["电子商品"])
  	]

  	private comments:Comment[] =[
  		new Comment(1,1,"2017-05-21 10:12:54","张三",4,"东西不错1"),
  		new Comment(2,1,"2016-05-20 10:12:54","李四",3,"东西不错2"),
  		new Comment(3,1,"2015-05-11 10:12:54","王麻子",2,"东西不错3"),
  		new Comment(4,1,"2014-05-05 10:12:54","赵六",1,"东西不错4"),
  		new Comment(5,2,"2013-05-12 10:12:54","哈哈",5,"东西不错5")
  	]*/

  dataResource: Observable<any>;
  products: Array<any> = [];

  constructor( private http: Http) { 
  	this.dataResource = this.http.get("/api/products")
  		.map(res => res.json());
  }

  getProducts():Observable <Product[]>{
  	/*this.dataResource.subscribe(data => this.products = data);
  	return this.products;*/
  	return this.http.get("/api/products").map(res => res.json());
  }

  getProduct(id:number): Observable<Product>{
  	return this.http.get("/api/product/"+ id).map(res => res.json());
  }

  getCommentsForProductId(id: number):Observable<Comment[]>{
  	return this.http.get("/api/product/"+ id + "/comment").map(res => res.json());
  }


  search(params: ProductSearchParams): Observable<Product[]> {
  	//return this.http.get("/api/products",{search: this.encodeParams(params)})
  	return this.http.get("/api/products", {search: this.encodeParams(params)}).map(res => res.json());
  }


  private encodeParams(params: ProductSearchParams){
  	return Object.keys(params).filter(key => params[key])
  								.reduce(function(sum:URLSearchParams, key:string){
  									sum.append(key,params[key]);
  									return sum;
  								}, new URLSearchParams)
  }

}


export class ProductSearchParams {
	constructor (public title: string,
				 public price: number,
				 public category: string
	){}
}


export class Product{

	constructor(
		public id: number,
		public title: string,
		public price: number,
		public rating: number,
		public desc: string,
		public categories: Array<string>
	){}

}


export class Comment {
	constructor(public id: number,
				public productId: number,
				public time: string,
				public user: string,
				public rating: number,
				public content: string
	){}
}