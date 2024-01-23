import { Component } from '@angular/core';
import { MinumanService } from '../services/minuman.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  listMinuman : any
  listOneMinuman : any
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
    private minumanService:MinumanService,
    public toastCtrl : ToastController,
  ) {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpenEdit(isOpen: boolean, id:any = false){
    this.isModalOpenEdit = isOpen;
    this.minumanService.getOneMinuman(id).subscribe(
      (res:any) => {
        if(res["result"]=="success"){ // JIKA HASIL SUCCESS
          this.listOneMinuman = res["data"];
          this.namaMenuEdit = this.listOneMinuman.nama
          this.hargaMenuEdit = this.listOneMinuman.harga
          this.detailMenuEdit = this.listOneMinuman.detail
          this.id = this.listOneMinuman.id
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
    this.minumanService.getMinuman().subscribe(
      (res:any) => {
        if(res["result"]=="success"){ // JIKA HASIL SUCCESS
   
          this.listMinuman = res["data"];
         
        }else{ // JIKA HASIL ERROR
         
          this.presentToast(res["message"]);
         
        }
      },
      err => {
        console.log(err.error)
      }
    )
  }

  addMinuman(){
    this.minumanService.addMinuman(
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

  updateMinuman(id:any){
    this.minumanService.editMinuman(
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

   deleteMinuman(id:any){
    this.minumanService.deleteMinuman(id).subscribe(
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

  async presentToast(a:any){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }



}
