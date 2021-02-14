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
          this.formNormaIndustrial.get("userNameCriacao").setValue(result['username-criacao']);
          this.formNormaIndustrial.get("userNameCriacao").disable();
          this.formNormaIndustrial.get("userNameAlteracao").setValue(result['username-alteracao']);
          this.formNormaIndustrial.get("userNameAlteracao").disable();
          this.formNormaIndustrial.get("dataCriacao").setValue(moment(result['data-criacao']).format('DD/MM/YYYY'));
          this.formNormaIndustrial.get("dataVigor").setValue(moment(result['data-vigor']).format('YYYY-MM-DD'));
          this.formNormaIndustrial.get("dataCriacao").disable();
          if(result['data-alteracao']){
            this.formNormaIndustrial.get("dataAlteracao").setValue(moment(result['data-alteracao']).format('DD/MM/YYYY'));
          }
         
          this.formNormaIndustrial.get("dataAlteracao").disable();
        })
      }
      else{
        this.formNormaIndustrial.get("dataCriacao").setValue(moment(new Date()).format('DD/MM/YYYY'));
        this.formNormaIndustrial.get("dataCriacao").disable();
        this.formNormaIndustrial.get("dataAlteracao").disable();
        this.formNormaIndustrial.get("userNameAlteracao").disable();
        this.formNormaIndustrial.get("userNameCriacao").setValue(this.autenticacaoService.usuarioAtualValue['user-name']);
        this.formNormaIndustrial.get("userNameCriacao").disable();
      }
    }

    salvar(): void {
       const normaIndustrial : NormaIndustrial = new NormaIndustrial();
       normaIndustrial.autor= this.formNormaIndustrial.get('autor').value;
       normaIndustrial.codigo= this.formNormaIndustrial.get('codigo').value;
       normaIndustrial.link= this.formNormaIndustrial.get('link').value;
       normaIndustrial.titulo= this.formNormaIndustrial.get('titulo').value;
       normaIndustrial.versao= this.formNormaIndustrial.get('versao').value;
       normaIndustrial['data-vigor']= moment(this.formNormaIndustrial.get('dataVigor').value,'YYYY-MM-DD').toDate();
       
       if(this.id){
         normaIndustrial.id= this.id;
         normaIndustrial['data-alteracao']= new Date();
         normaIndustrial['username-alteracao']=  this.autenticacaoService.usuarioAtualValue['user-name'];
         normaIndustrial['data-criacao']= moment(this.formNormaIndustrial.get('dataCriacao').value,'DD/MM/YYYY').toDate();
         normaIndustrial['username-criacao']= this.formNormaIndustrial.get('userNameCriacao').value;
         this.normaIndustrialService.editar(normaIndustrial).subscribe((result) =>{
           this.alertaService.success("Norma Industrial editada com sucesso!",true);
           this.router.navigate(['/normas-industriais']);
         })
       }
       else{
        normaIndustrial['username-criacao']=  this.autenticacaoService.usuarioAtualValue['user-name'];
        normaIndustrial['data-criacao']= new Date();
        this.normaIndustrialService.incluir(normaIndustrial).subscribe((result) =>{
          this.alertaService.success("Norma Industrial Incluída com sucesso!",true);
          this.router.navigate(['/normas-industriais']);
        })
       }
    }

    cancelar(){
      this.router.navigate(['/normas-industriais']);
    }
    
  }