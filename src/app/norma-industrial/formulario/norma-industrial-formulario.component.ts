import { Component, OnInit } from "@angular/core";
import {  FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { NormaIndustrial } from "src/app/models/norma-industrial";
import { AlertaService } from "src/app/shared/service/alerta-service.service";
import { AutenticacaoService } from "src/app/shared/service/autenticacao.service";
import { NormaIndustrialService } from "../norma-industrial.service";
@Component({
    selector: 'app-norma-industrial-formulario',
    templateUrl: './norma-industrial-formulario.component.html',
    styleUrls: ['./norma-industrial-formulario.component.css']
  })
  export class NormaIndustrialFormularioComponent implements OnInit {
    formNormaIndustrial: FormGroup;
    id: string;
    urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    constructor(public formBuilder: FormBuilder, private alertaService: AlertaService, private normaIndustrialService: NormaIndustrialService, private route:ActivatedRoute,  public router: Router, private autenticacaoService: AutenticacaoService){
      this.formNormaIndustrial = this.formBuilder.group({
        codigo: [null, [Validators.required, Validators.maxLength(30)]],
        titulo: [null, [Validators.required,Validators.maxLength(300)]],
        versao: [null, [Validators.required, Validators.maxLength(3)]],
        autor: [null, [Validators.required, Validators.maxLength(100)]],
        link: [null, [Validators.required, Validators.maxLength(500),Validators.pattern(this.urlRegex)]],
        userNameCriacao: [null],
        userNameAlteracao: [null],
        dataCriacao: [null],
        dataAlteracao: [null],
        dataVigor: [null ,  [Validators.required]]
      });

      this.id = this.route.snapshot.paramMap.get('id');
    }
    ngOnInit(): void {
      if(this.id){
        this.normaIndustrialService.getNormaIndustrialById(this.id).subscribe(result =>{
          this.formNormaIndustrial.get("codigo").setValue(result.codigo);
          this.formNormaIndustrial.get("titulo").setValue(result['titulo']);
          this.formNormaIndustrial.get("versao").setValue(result['versao']);
          this.formNormaIndustrial.get("autor").setValue(result['autor']);
          this.formNormaIndustrial.get("link").setValue(result['link']);
          this.formNormaIndustrial.get("dataVigor").setValue(moment(result['data-vigor']).format('YYYY-MM-DD'));
        })
      }
    }
    voltar(){
      this.router.navigate(['/normas-industriais']);
    }
    
  }