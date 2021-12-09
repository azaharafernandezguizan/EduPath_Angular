import { DummyData } from './../../models/dummy';
import { DummiRestApiService } from './../../services/dummi-rest-api.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { DummyDeleteResponse, DummyListResponse } from 'src/app/models/dummyResponses';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dummiesList: DummyData[] | undefined;

  dtOptions: any = {};
  dtLanguageConfig = {};
  dtResponsive = {};

  processing: string | undefined;
  lengthMenu: string | undefined;
  zeroRecords: string | undefined;
  emptyTable: string | undefined;
  tableInfo: string | undefined;
  tableInfoEmpty: string | undefined;
  tableInfoFiltered: string | undefined;
  tableInfoPostFix: string | undefined;
  search: string | undefined;
  url: string | undefined;
  thousands: string | undefined;
  loadingRecords: string | undefined;
  decimal: string | undefined;
  searchPlaceholder: string | undefined;
  first: string | undefined;
  last: string | undefined;
  next: string | undefined;
  previous: string | undefined;
  sortAscending: string | undefined;
  sortDescending: string | undefined;
  titlePage: string | undefined;
  reloadBtn: string | undefined;
  noUsers: string | undefined;
  errorLoadingData = '';
  errorDownloading = '';

  isTableDisplayed = true;

  constructor(private translate: TranslateService,
              private dummieService: DummiRestApiService,
              private commonsService: SharedService,
              private renderer: Renderer2,
              private router: Router) { }

  ngOnInit(): void {
    this.translateTexts();
  }

  translateTexts(): void {
    const processing = this.translate.get('dummies.processing');
    const lengthMenu = this.translate.get('dummies.lengthMenu');
    const zeroRecords = this.translate.get('dummies.zeroRecords');
    const emptyTable = this.translate.get('dummies.emptyTable');
    const tableInfo = this.translate.get('dummies.tableInfo');
    const tableInfoEmpty = this.translate.get('dummies.tableInfoEmpty');
    const tableInfoFiltered = this.translate.get('dummies.tableInfoFiltered');
    const tableInfoPostFix = this.translate.get('dummies.tableInfoPostFix');
    const search = this.translate.get('dummies.search');
    const url = this.translate.get('dummies.url');
    const thousands = this.translate.get('dummies.thousands');
    const loadingRecords = this.translate.get('dummies.loadingRecords');
    const decimal = this.translate.get('dummies.decimal');
    const searchPlaceholder = this.translate.get('dummies.searchPlaceholder');
    const first = this.translate.get('dummies.first');
    const last = this.translate.get('dummies.last');
    const next = this.translate.get('dummies.next');
    const previous = this.translate.get('dummies.previous');
    const sortAscending = this.translate.get('dummies.sortAscending');
    const sortDescending = this.translate.get('dummies.sortDescending');
    
    forkJoin([processing,
      lengthMenu,
      zeroRecords,
      emptyTable,
      tableInfo,
      tableInfoEmpty,
      tableInfoFiltered,
      tableInfoPostFix,
      search,
      url,
      thousands,
      loadingRecords,
      decimal,
      searchPlaceholder,
      first,
      last,
      next,
      previous,
      sortAscending,
      sortDescending
    ]).subscribe((results: (string)[]) => {
      this.processing =  results[0];
      this.lengthMenu = results[1];
      this.zeroRecords = results[2];
      this.emptyTable = results[3];
      this.tableInfo = results[4];
      this.tableInfoEmpty = results[5];
      this.tableInfoFiltered = results[6];
      this.tableInfoPostFix = results[7];
      this.search = results[8];
      this.url = results[9];
      this.thousands = results[10];
      this.loadingRecords = results[11];
      this.decimal = results[12];
      this.searchPlaceholder = results[13];
      this.first = results[14];
      this.last = results[15];
      this.next = results[16];
      this.previous = results[17];
      this.sortAscending = results[18];
      this.sortDescending = results[19];

      this.getData();
    });
  }

  getData(): void {
    this.dummieService.getDummyList().subscribe(
      (response: any) => {
        this.dummiesList = response.data;
        this.setDataTableOptions();
      },
      (error: any) => {
        console.log('Error: ' + error.toString());
      }
    );
  }

  setDataTableOptions(): void {
    this.setLanguageOption();
    this.setResponsiveOptions();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthChange: false,
      language: this.dtLanguageConfig,
      responsive: this.dtResponsive,
      scrollX: false
    };
  }

  setLanguageOption(): void {
    this.dtLanguageConfig = {
      processing: this.processing,
      lengthMenu: this.lengthMenu,
      zeroRecords: this.zeroRecords,
      emptyTable: this.emptyTable,
      info: this.tableInfo,
      infoEmpty: this.tableInfoEmpty,
      infoFiltered: this.tableInfoFiltered,
      infoPostFix: this.tableInfoPostFix,
      search: this.search,
      url: this.url,
      thousands: this.thousands,
      loadingRecords: this.loadingRecords,
      decimal: this.decimal,
      searchPlaceholder: this.searchPlaceholder,
      paginate: {
        first: this.first,
        last: this.last,
        next: this.next,
        previous: this.previous
      },
      aria: {
        sortAscending: this.sortAscending,
        sortDescending: this.sortDescending,
      },
    };
  }

  setResponsiveOptions(): void {
    this.dtResponsive = {
      responsive: true,
      breakpoints: [
        { name: 'bigdesktop', width: Infinity },
        { name: 'meddesktop', width: 1480 },
        { name: 'smalldesktop', width: 1280 },
        { name: 'medium', width: 1188 },
        { name: 'tabletl', width: 1024 },
        { name: 'btwtabllandp', width: 848 },
        { name: 'tabletp', width: 768 },
        { name: 'mobilel', width: 480 },
        { name: 'mobilep', width: 320 }
      ]
    };
  }

  onViewDetail(dummyId: number | undefined): void{
    if (dummyId && dummyId > 0){
      this.router.navigate(['employees/' + dummyId]);
    }
  }

  createNew(): void{
    this.router.navigate(['employees/0']);
  }

  onDelete(dummyId: number | undefined): void{
    if (dummyId && dummyId > 0){
      this.dummieService.deleteDummy(dummyId).subscribe(
        (response: DummyDeleteResponse) => {
          console.log('Eliminado');
        },
        (error: any) => {
          console.log('Error: ' + error.toString());
        }
      );
    }
  }

}
