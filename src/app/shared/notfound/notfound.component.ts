import { Component, OnInit } from "@angular/core";
import { AlertaService } from "../service/alerta-service.service";

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotFoundComponent implements OnInit {
  
  constructor(private alertaSerive: AlertaService) { 
   }
 
  ngOnInit() {
    this.alertaSerive.error('Não encontramos a página procurada. Verifique o endereço da página digitada e tente novamente.')
  }
}
