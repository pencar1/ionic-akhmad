import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MinumanService {
  server:string = 'http://localhost/warteg-api/'

  constructor(
    public http : HttpClient
  ) { }

  getMinuman(){
    return this.http.get(this.server + 'minuman.php?id=')
  }

  getOneMinuman(id:any){
    return this.http.get(this.server + 'minuman.php?id=' + id)
  }

  addMinuman(namaMinuman:any,hargaMinuman:any,detailMinuman:any){
    return this.http.post(
      this.server + 'minuman.php',
      {
        nama : namaMinuman,
        harga : hargaMinuman,
        detail : detailMinuman
      }
      )
  }

  editMinuman(idMinuman:any,namaMinuman:any,hargaMinuman:any,detailMinuman:any){
    return this.http.put(
      this.server + 'minuman.php?id=' + idMinuman,
      {
        nama : namaMinuman,
        harga : hargaMinuman,
        detail : detailMinuman
      }
      )
  }

  deleteMinuman(id:any){
    return this.http.delete(this.server + 'minuman.php?id=' + id)
  }
}
