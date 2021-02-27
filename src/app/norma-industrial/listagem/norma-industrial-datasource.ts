import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { NormaIndustrial } from 'src/app/models/norma-industrial';
import { NormaIndustrialListResponse } from 'src/app/models/norma-industrial-response';
import { NormaIndustrialService } from '../norma-industrial.service';
import { AlertaService } from 'src/app/shared/service/alerta-service.service';

 
export class NormaIndustrialDataSource implements DataSource<NormaIndustrial>{
 
    private normaIndustrialSubject = new BehaviorSubject<NormaIndustrial[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();
 
    constructor(private normaIndustrialService: NormaIndustrialService, private alertaService: AlertaService) { }
 
    connect(collectionViewer: CollectionViewer): Observable<NormaIndustrial[]> {
        return this.normaIndustrialSubject.asObservable();
    }
 
    disconnect(collectionViewer: CollectionViewer): void {
        this.normaIndustrialSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }
 
    loadNormaIndustrial(codigo,titulo,versao,page = 0, size = 10, isLoad=false) {
        this.loadingSubject.next(true);
        this.normaIndustrialService.getAll( codigo,titulo,versao,page, size )
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((result: NormaIndustrialListResponse) => {
                this.normaIndustrialSubject.next(result.content);
                this.countSubject.next(result.totalElements);
                if(result.totalElements===0){
                    this.alertaService.error('Nenhum resultado encontrado');
                }
                else{
                    if(isLoad){
                        this.alertaService.error('');
                    }
                   
                }
            }
            );
    }
 
}