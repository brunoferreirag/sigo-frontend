import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ThemePalette } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Armazem } from "src/app/models/armazem";
import { Booleano } from "src/app/models/booleano";
import { AlertaService } from "src/app/shared/service/alerta-service.service";
import { ArmazemService } from "../armazem.service";


@Component({
    selector: 'app-armazem-formulario',
    templateUrl: './armazem-formulario.component.html',
    styleUrls: ['./armazem-formulario.component.css']
  })
  export class ArmazemFormularioComponent implements OnInit {
    formArmazem: FormGroup;
    booleanos: Array<Booleano>;
    id: string;
  
    escolherTodos() {
      this.booleanos.every(f => f.escolhido);
    }

    constructor(public formBuilder: FormBuilder, private alertaService: AlertaService, private armazemService: ArmazemService, private route:ActivatedRoute,  public router: Router){
      this.booleanos = [
        {
          'descricao':'Armazena items para compra?',
          'escolhido':false
        },
        {
          'descricao':'Armazena items para venda?',
          'escolhido':false
        }
      ]
      this.formArmazem = this.formBuilder.group({
        id: [null, [Validators.required, Validators.maxLength(20)]],
        endereco: [null, [Validators.required, Validators.maxLength(150)]],
        cep: [null, [Validators.required, Validators.maxLength(8)]],
        cidadeEstado: [null, [Validators.required,Validators.maxLength(100)]],
        bairro: [null, [Validators.required,Validators.maxLength(100)]],
        funcoes: new FormArray([]),
      });

      this.id = this.route.snapshot.paramMap.get('id');
    }
    ngOnInit(): void {
      if(this.id){
        this.armazemService.getArmazemById(this.id).subscribe(result =>{
          this.formArmazem.get("id").setValue(result.id);
          this.formArmazem.get("id").disable();
          this.formArmazem.get("endereco").setValue(result.endereco);
          this.formArmazem.get("cep").setValue(result.cep);
          this.formArmazem.get("cidadeEstado").setValue(result['cidade-estado']);
          this.formArmazem.get("bairro").setValue(result['bairro']);
          this.booleanos.forEach((b) =>{
            if(result['armazena-items-para-venda'] && b.descricao.includes('venda')){
              b.escolhido = true;
            } else if (result['armazena-items-para-compra'] && b.descricao.includes('compra')){
              b.escolhido = true;
            }
            else{
              b.escolhido = false;
            }
          })


        })
      }
    }

    salvar(): void {
       const armazem : Armazem = new Armazem();
       armazem.id= this.formArmazem.get('id').value;
       armazem.endereco= this.formArmazem.get('endereco').value;
       armazem['cidade-estado']= this.formArmazem.get('cidadeEstado').value;
       armazem.bairro= this.formArmazem.get('bairro').value;
       armazem.cep= this.formArmazem.get('cep').value;
       armazem['armazena-items-para-venda']=false;
       armazem['armazena-items-para-compra']=false;
       const booleanosEscolhidos = this.booleanos.filter(p=>p.escolhido === true);
       booleanosEscolhidos.forEach(b =>{
        if(b.escolhido && b.descricao.includes('venda')){
          armazem['armazena-items-para-venda'] = true;
        }
        else if (b.escolhido && b.descricao.includes('compra')){
          armazem['armazena-items-para-compra'] = true;
        }
       });
       if(this.id){
         armazem.id= this.id;
         this.armazemService.editar(armazem).subscribe((result) =>{
           this.alertaService.success("Edição enviada para o sistema de logística com sucesso!",true);
           this.router.navigate(['/armazens']);
         })
       }
       else{
        this.armazemService.incluir(armazem).subscribe((result) =>{
          this.alertaService.success("Inclusão enviada para o sistema de logística com sucesso!",true);
          this.router.navigate(['/armazens']);
        })
       }
    }

    cancelar(){
      this.router.navigate(['/armazens']);
    }
    
  }