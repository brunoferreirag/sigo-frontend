import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ThemePalette } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { Linha } from "src/app/models/linha";
import { ParadaProducao } from "src/app/models/parada-producao";
import { Turno } from "src/app/models/turno";
import { AlertaService } from "src/app/shared/service/alerta-service.service";
import { ParadaProducaoService } from "../parada-producao.service";


@Component({
    selector: 'app-parada-producao-formulario',
    templateUrl: './parada-producao-formulario.component.html',
    styleUrls: ['./parada-producao-formulario.component.css']
  })
  export class ParadaProducaoFormularioComponent implements OnInit {
    formParadaProducao: FormGroup;
    listaLinhasProducao: Array<Linha>;
    listaTurnos: Array<Turno>;
    id: string;
  
    constructor(public formBuilder: FormBuilder, private alertaService: AlertaService, private paradaProducaoService: ParadaProducaoService, private route:ActivatedRoute,  public router: Router){
      
      this.formParadaProducao = this.formBuilder.group({
        linhaProducao: [null, [Validators.required]],
        turno: [null, [Validators.required]],
        dataInicio: [null, [Validators.required]],
        dataFim: [null],
        funcoes: new FormArray([]),
      });

      this.id = this.route.snapshot.paramMap.get('id');
      this.preencherLinhas();
      this.preencherTurno();
    }
    ngOnInit(): void {
      if(this.id){
        this.paradaProducaoService.getParadaProducaoById(this.id).subscribe(result =>{
          this.formParadaProducao.get("linhaProducao").setValue(result.linha);
          this.formParadaProducao.get("turno").setValue(result.turno);
          const dataInicio = moment(result["data-hora-inicio"]).format('yyyy-MM-DDTHH:mm');
          this.formParadaProducao.get("dataInicio").setValue(dataInicio);
          const dataFim = result['data-hora-fim'];
          if(dataFim){
            this.formParadaProducao.get("dataFim").setValue(moment(result["data-hora-fim"]).format('yyyy-MM-DDTHH:mm'));
          }
         
        })
      }
    }

    salvar(): void {
       const paradaProducao : ParadaProducao = new ParadaProducao();
       let dataHoraInicio = this.formParadaProducao.get('dataInicio').value;
       if(dataHoraInicio){
         dataHoraInicio= new Date(dataHoraInicio+':'+new Date().getSeconds());
       }
       let dataHoraFim = this.formParadaProducao.get('dataFim').value;;
       if(dataHoraFim){
         dataHoraFim = new Date(dataHoraFim+':'+ new Date().getSeconds());
       }
       paradaProducao["data-hora-inicio"]=dataHoraInicio;
       paradaProducao["data-hora-fim"]=dataHoraFim;
       paradaProducao['turno'] = this.formParadaProducao.get('turno').value;
       paradaProducao['linha'] = this.formParadaProducao.get('linhaProducao').value;
       
       if(this.id){
         paradaProducao.id= this.id;
         this.paradaProducaoService.editar(paradaProducao).subscribe((result) =>{
           this.alertaService.success("Edição concluída com sucesso",true);
           this.router.navigate(['/paradas-producao']);
         })
       }
       else{
        this.paradaProducaoService.incluir(paradaProducao).subscribe((result) =>{
          this.alertaService.success("Inclusão concuída com sucesso!",true);
          this.router.navigate(['/paradas-producao']);
        })
       }
    }

    cancelar(){
      this.router.navigate(['/paradas-producao']);
    }

    preencherTurno(){
      this.paradaProducaoService.getAllTurnos().subscribe(result =>{
        this.listaTurnos = result;
      })
    }

    preencherLinhas(){
      this.paradaProducaoService.getAllLinhasProducao().subscribe(result =>{
        this.listaLinhasProducao = result;
      })
    }
    
  }