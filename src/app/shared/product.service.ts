import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validators  } from '@angular/forms';
import { HttpClient,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  ProductList:any;
  form:FormGroup=new FormGroup({
    $key:new FormControl(null),
    name : new FormControl('Product name',Validators.required),
    description : new FormControl('Please make sure that your text wont be longer than this place holder for better user experience'),
    image : new FormControl('../../../assets/Insert Image.svg'),
    quantity: new FormControl(0),
    price : new FormControl(10)
    
  });
 
 
  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      name: '',
      description: '',
      image: '../../../assets/Insert Image.svg',
      quantity: 0,
      price: 1
    });
  

  }
  Productid
ProductName
ProductDescription
ProductPrice
ProductImage
ProductQte

getProducts(){
    return this.http.get(`http://localhost:44300/api/Products`);}
InsertProduct(Product:any){
  let ProductInsert={ProductName:Product.name,ProductDescription:Product.description,ProductImage:Product.image,ProductQte:Product.quantity,ProductPrice:Product.price}
  this.http.post(`http://localhost:8080/api/Products`,ProductInsert,{responseType: "text",}).subscribe((data)=>{
    console.log(data);
  })
}
UpdateProduct(Product){
  let ProductInsert={Productid:Product.$key,ProductName:Product.name,ProductDescription:Product.description,ProductImage:Product.image,ProductQte:Product.quantity,ProductPrice:Product.price}

  this.http.put(`http://localhost:8080/api/Products/`+Product.$key,Product,{responseType:"text"}).subscribe((data)=>{
    console.log(data);
  })
}
DeleteProduct($key){
  console.log($key);
  return this.http.delete(`http://localhost:8080/api/Products/${$key}`,{responseType:"text"});
}
  
complete(Product){
  this.form.setValue({
    $key:Product.id,
    name:Product.name,
    description:Product.description,
    image:Product.image,
    quantity:Product.quantity,
    price:Product.price
  });

}

}