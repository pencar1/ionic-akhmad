import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MakananService {

  server:string = 'http://localhost/warteg-api/'

  constructor(
    public http : HttpClient
  ) { }

  getMakanan(){
    return this.http.get(this.server + 'makanan.php?id=')
  }

  getOneMakanan(id:any){
    return this.http.get(this.server + 'makanan.php?id=' + id)
  }

  addMakanan(namaMakanan:any,hargaMakanan:any,detailMakanan:any){
    return this.http.post(
      this.server + 'makanan.php',
      {
        nama : namaMakanan,
        harga : hargaMakanan,
        detail : detailMakanan
      }
      )
  }

  editMakanan(idMakanan:any,namaMakanan:any,hargaMakanan:any,detailMakanan:any){
    return this.http.put(
      this.server + 'makanan.php?id=' + idMakanan,
      {
        nama : namaMakanan,
        harga : hargaMakanan,
        detail : detailMakanan
      }
      )
  }

  deleteMakanan(id:any){
    return this.http.delete(this.server + 'makanan.php?id=' + id)
  }

  
}
