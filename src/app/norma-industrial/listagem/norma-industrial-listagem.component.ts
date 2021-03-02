import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class NormaIndustrialListagemComponent implements OnInit,OnDestroy {
  displayedColumns = ['codigo','versao','data-vigor','titulo','autor','acao-editar','acao-excluir'];
  normaIndustrialDataSource: NormaIndustrialDataSource;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  searchForm: FormGroup;
  currentScreenWidth: string = '';
  flexMediaWatcher: Subscription;
 
  constructor(private mediaObserver: MediaObserver,private normaIndustrialService: NormaIndustrialService, public dialog: MatDialog, private alertaService: AlertaService,private router: Router, private formBuilder: FormBuilder) {
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
      this.displayedColumns =['codigo','data-vigor','titulo','versao','acao-editar'];
    }
    else{
      this.displayedColumns = ['codigo','data-vigor','versao','acao-editar'];
    }
}
 
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

}
