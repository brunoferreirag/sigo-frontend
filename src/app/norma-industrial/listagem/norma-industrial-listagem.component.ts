import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/component/modal.component';
import { AlertaService } from 'src/app/shared/service/alerta-service.service';
import { NormaIndustrialService } from '../norma-industrial.service';
import { NormaIndustrialDataSource } from './norma-industrial-datasource';

@Component({
  selector: 'app-norma-industrial-listagem',
  templateUrl: './norma-industrial-listagem.component.html',
  styleUrls: ['./norma-industrial-listagem.component.css']
})
export class NormaIndustrialListagemComponent implements OnInit {
  displayedColumns = ['codigo','versao','data-vigor','titulo','autor', 'data-alteracao', 'data-inclusao','username-criacao','username-alteracao','acao-editar','acao-excluir'];
  normaIndustrialDataSource: NormaIndustrialDataSource;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  searchForm: FormGroup;
 
  constructor(private normaIndustrialService: NormaIndustrialService, public dialog: MatDialog, private alertaService: AlertaService,private router: Router, private formBuilder: FormBuilder) { }
 
  ngOnInit() {
    this.normaIndustrialDataSource = new NormaIndustrialDataSource(this.normaIndustrialService,this.alertaService);
    this.searchForm = this.formBuilder.group({
      codigo: [null],
      titulo: [null],
      versao: [null]
    });
    this.normaIndustrialDataSource.loadNormaIndustrial(null,null,null,0, 10);
  }
 
  ngAfterViewInit() {
    this.normaIndustrialDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();
 
    this.paginator.page
      .pipe(
        tap(() => this.loadNormaIndustrial())
      )
      .subscribe();
  }
 
  loadNormaIndustrial() {
    const codigo = this.searchForm.get('codigo').value;
    const titulo = this.searchForm.get('titulo').value;
    const versao = this.searchForm.get('versao').value;
    this.normaIndustrialDataSource.loadNormaIndustrial(codigo,titulo,versao,this.paginator.pageIndex, this.paginator.pageSize);
  }

  irParaTelaInclusao(){
    this.router.navigate(['/norma-industrial']);
  }

  excluirNormaIndustrial(id:string, titulo:string):void{
    const dialogRef = this.dialog.open(ModalComponent,{
      width: '380px',
      data: {mensagem:'Deseja excluir a norma-industrial ' + titulo + ' ?',titulo:'Norma Industrial'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.normaIndustrialService.excluirNormaIndustrial(id).subscribe(()=>{
          this.alertaService.success('Norma Industrial excluído com sucesso');
          this.loadNormaIndustrial();
        })
      }
    });
  }
 

}
