import { HttpClient } from "@angular/common/http";
import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort"
import { MatPaginator } from "@angular/material/paginator";
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  ListData : MatTableDataSource <any>;
  DisplayedColumns:string[]=['image','name','description','price','Quantity','Actions'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  searchKey: string;
  
    constructor(private service:ProductService,private http:HttpClient,private dialog:MatDialog) { }
  list:any;
    ngOnInit(): void {
      this.service.getProducts().subscribe((data)=>{
        this.list=data;
        console.log(this.list);
        this.ListData = new MatTableDataSource(this.list);
        this.ListData.sort=this.sort;
        this.ListData.paginator=this.paginator;
        
      });
  
  
      
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.ListData.filter = this.searchKey.trim().toLowerCase();
  }
  
  onCreate(){
  //   const dialogconfig = new MatDialogConfig();
  //   dialogconfig.disableClose=true;
  //   dialogconfig.autoFocus=true;
  //   dialogconfig.width="68%";
  //   dialogconfig.height="90%";
  // const dialogref=this.dialog.open(ProductchildComponent,dialogconfig);
  // dialogref.afterClosed().subscribe((result)=>{
  //   console.log("this one works")
  //   this.ngOnInit();
  // });
  }
  onEdit(row){
  this.service.complete(row);
  // const dialogconfig = new MatDialogConfig();
  // dialogconfig.disableClose=true;
  // dialogconfig.autoFocus=true;
  // dialogconfig.width="70%";
  // dialogconfig.height="90%";
  // const dialogref=this.dialog.open(ProductchildComponent,dialogconfig);
  // dialogref.afterClosed().subscribe((result)=>{
  //   console.log("this one works")
  //   this.ngOnInit();
  // });
  
  }
  onDelete(row){
    this.service.DeleteProduct(row.id).subscribe((data)=>{
      this.ngOnInit();
    });
  }
  
  }
  