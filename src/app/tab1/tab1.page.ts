import { Component } from '@angular/core';
import { MakananService } from '../services/makanan.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  listMakanan : any
  listOneMakanan : any
  isModalOpen = false
  isModalOpenEdit = false
  namaMenu : any
  hargaMenu : any
  detailMenu : any
  namaMenuEdit : any
  hargaMenuEdit : any
  detailMenuEdit : any
  id : any
  
  constructor(
    private makananService:MakananService,
    public toastCtrl : ToastController,
  ) {}


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpenEdit(isOpen: boolean, id:any = false){
    this.isModalOpenEdit = isOpen;
    this.makananService.getOneMakanan(id).subscribe(
      (res:any) => {
        if(res["result"]=="success"){ // JIKA HASIL SUCCESS
          this.listOneMakanan = res["data"];
          this.namaMenuEdit = this.listOneMakanan.nama
          this.hargaMenuEdit = this.listOneMakanan.harga
          this.detailMenuEdit = this.listOneMakanan.detail
          this.id = this.listOneMakanan.id
        }else{ // JIKA HASIL ERROR
          
        }
      },
      err => {
        console.log(err.error)
      }
    )
    
  }

  ionViewWillEnter(){
    // MEMANGGIL API LIST NOTE
    this.makananService.getMakanan().subscribe(
      (res:any) => {
        if(res["result"]=="success"){ // JIKA HASIL SUCCESS
   
          this.listMakanan = res["data"];
         
        }else{ // JIKA HASIL ERROR
         
          this.presentToast(res["message"]);
         
        }
      },
      err => {
        console.log(err.error)
      }
    )
  }
  
  addMakanan(){
    this.makananService.addMakanan(
      this.namaMenu,
      this.hargaMenu,
      this.detailMenu
    ).subscribe(
      (res:any) => {
        if(res["result"]=="success"){ // JIKA HASIL SUCCESS
          this.namaMenu = ''
          this.hargaMenu = ''
          this.detailMenu = ''
          this.presentToast("data berhasil ditambahkan");
          this.setOpen(false)
          this.ionViewWillEnter()
        }else{ // JIKA HASIL ERROR
         
          this.presentToast(res["message"]);
         
        }
      },
      err => {
        console.log(err.error)
      }
    )
  }

  updateMakanan(id:any){
    this.makananService.editMakanan(
      id,
      this.namaMenuEdit,
      this.hargaMenuEdit,
      this.detailMenuEdit
    ).subscribe(
      (res:any) => {
        if(res["result"]=="success"){ // JIKA HASIL SUCCESS
          
          this.presentToast("data berhasil ubah");
          this.setOpenEdit(false)
          this.ionViewWillEnter()
        }else{ // JIKA HASIL ERROR
         
          this.presentToast(res["message"]);
         
        }
      },
      err => {
        console.log(err.error)
      }
    )
    
  }

  deleteMakanan(id:any){
    this.makananService.deleteMakanan(id).subscribe(
      (res:any) => {
        if(res["result"]=="success"){ // JIKA HASIL SUCCESS
          this.presentToast('Data Berhasil dihapus');
          this.ionViewWillEnter()
        }else{ // JIKA HASIL ERROR
         
          this.presentToast(res["message"]);
        }
      },
      err => {
        console.log(err.error)
      }
    )
  }
   
  //FUNCTION PRESENT TOAST
  async presentToast(a:any){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

}
