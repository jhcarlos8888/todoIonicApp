import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'path';
import { Lista } from '../models/lista.model';
import { ListaService } from '../services/lista.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {


lista: Lista;
 

  constructor(
    private router: ActivatedRoute,
    public listaService: ListaService,
    
  ) { 
    //Variable que obtendra de la URL el numero idLista que fue
    //declarada en el archivo app-routing.module.ts
      let idLista = this.router.snapshot.paramMap.get('idLista');
      let listaResult:any = this.listaService.obtenerLista(String(idLista) || Number(idLista));
      this.lista = listaResult;
      console.log(this.lista) 
  }

  ngOnInit() {
  }



}
