import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/component/modal.component';
import { AlertaService } from 'src/app/shared/service/alerta-service.service';
import { ArmazemService } from '../armazem.service';
import { ArmazemDataSource } from './armazem-datasource';

@Component({
  selector: 'app-armazem-listagem',
  templateUrl: './armazem-listagem.component.html',
  styleUrls: ['./armazem-listagem.component.css']
})
export class ArmazemListagemComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'endereco', 'cidade-estado','bairro','cep','armazena-items-para-compra','armazena-items-para-venda','acao-editar','acao-excluir'];
  armazemDataSource: ArmazemDataSource;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  currentScreenWidth: string = '';
  flexMediaWatcher: Subscription;
 
  constructor(private mediaObserver: MediaObserver, private armazemService: ArmazemService, public dialog: MatDialog, private alertaService: AlertaService,private router: Router) { 
    this.flexMediaWatcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias !== this.currentScreenWidth) {
          this.currentScreenWidth = change.mqAlias;
          this.setupTable();
      }
  }); 
  }
  ngOnDestroy(): void {
    if(this.flexMediaWatcher){
      this.flexMediaWatcher.unsubscribe(); 
    }
  }

  setupTable() {
   
    if (this.currentScreenWidth === 'xl' || this.currentScreenWidth === 'lg' || this.currentScreenWidth === 'md' || this.currentScreenWidth === 'sm') { 
      this.displayedColumns =['id', 'endereco', 'cidade-estado','bairro','cep','armazena-items-para-compra','armazena-items-para-venda','acao-editar','acao-excluir'];
    }
    else{
      this.displayedColumns = ['id', 'endereco', 'cidade-estado','acao-editar','acao-excluir'];
    }
}
 
  ngOnInit() {
    this.armazemDataSource = new ArmazemDataSource(this.armazemService);
    this.armazemDataSource.loadArmazens();
  }
 
  ngAfterViewInit() {
    this.armazemDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();
 
    this.paginator.page
      .pipe(
        tap(() => this.loadArmazens())
      )
      .subscribe();
  }
 
  loadArmazens() {
    this.armazemDataSource.loadArmazens(this.paginator.pageIndex, this.paginator.pageSize);
  }

  irParaTelaInclusao(){
    this.router.navigate(['/armazem']);
  }

  excluirArmazem(id:string):void{
    const dialogRef = this.dialog.open(ModalComponent,{
      width: '380px',
      data: {mensagem:'Deseja excluir o armazen ' + id + ' ?',titulo:'Armazéns'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.armazemService.excluirArmazem(id).subscribe(()=>{
          this.alertaService.success('Armazém excluído com sucesso');
          this.loadArmazens();
        })
      }
    });
  }
 

}
