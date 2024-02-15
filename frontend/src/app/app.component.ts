import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Renderer2, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';


/**
 * Represents a surgeon.
 * @interface Surgeon
 */
interface Surgeon {
  name: string;
  speciality: string;
  interventionCount: number;
  favoriteAnesthetist: string;
  favoriteNurse: string;
  mostFrequentRoom: string;
  mostFrequentProcedure: string;
  [key: string]: any; 
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Surgeon';

  // Represents the list of surgeons.
  surgeons : any;

  dataSource : any;
  
  // The search control for the application.
  searchControl = new FormControl();

  displayedColumns: string[] = ['name', 'speciality', 'interventionCount', 'favoriteAnesthetist', 'favoriteNurse', 'mostFrequentRoom', 'mostFrequentProcedure'];

  // Sort used for the table
  @ViewChild(MatSort, { static: true }) sort !: MatSort;

  // Whether the mouse is hovered over the table.
  isHovered = false;

  // Surgeon hovered in the table
  surgeonHovered: string = '';

  /**
   * Constructs a new instance of the AppComponent.
   * 
   * @param http - The HttpClient used for making HTTP requests.
   */
  constructor(
    private http: HttpClient,
  ) {
    // Make an HTTP GET request to retrieve the list of surgeons.
    this.http.get('http://localhost:3000/api/interventions').subscribe(
      (data: any) => {
        // Set the list of surgeons to the data retrieved from the server.
        this.surgeons = data;
        this.dataSource = new MatTableDataSource(this.surgeons);
        this.dataSource.sortingDataAccessor = (item: Surgeon, property: string) => {
          switch (property) {
            case 'name':
              return item.name;
            case 'favoriteAnesthetist': 
              return item.favoriteAnesthetist;
            case 'speciality':
              return item.speciality;
            case 'interventionCount':
              return item.interventionCount;
            case 'favoriteNurse':
              return item.favoriteNurse;
            case 'mostFrequentRoom':
              return item.mostFrequentRoom;
            case 'mostFrequentProcedure':
              return item.mostFrequentProcedure;
            default:
              return item[property];
          }
        };
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error(error.error);
      }
    );
  }

  /**
   * Initializes the component and subscribes to changes in the search control value.
   * Performs an HTTP GET request to retrieve surgeons based on the search value.
   * Updates the data source and applies sorting to the table.
   */
  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400), // wait 400ms after the last event before emitting last event
        distinctUntilChanged() // only emit if value is different from previous value
      )
      .subscribe(value => {
          // Make an HTTP GET request to retrieve the list of surgeons based on the search value.
          this.http.get(`http://localhost:3000/api/interventions/${value}`).subscribe(
          (data: any) => {
            // Update the surgeons and data source.
            this.surgeons = data;
            this.dataSource = new MatTableDataSource(this.surgeons);
            this.dataSource.sortingDataAccessor = (item: Surgeon, property: string) => {
              switch (property) {
                case 'name':
                  return item.name;
                case 'favoriteAnesthetist': 
                  return item.favoriteAnesthetist;
                case 'speciality':
                  return item.speciality;
                case 'interventionCount':
                  return item.interventionCount;
                case 'favoriteNurse':
                  return item.favoriteNurse;
                case 'mostFrequentRoom':
                  return item.mostFrequentRoom;
                case 'mostFrequentProcedure':
                  return item.mostFrequentProcedure;
                default:
                  return item[property];
              }
            };
            this.dataSource.sort = this.sort;
          },
          (error) => {
            console.error(error.error);
          }
        );
      });
  }

  /***************************************************************************************/
  /**
   * Function used to activate the hover.
   */
  onMouseEnter(surgeonHovered: string) {
    this.isHovered = true;
    this.surgeonHovered = surgeonHovered;
  }

  /***************************************************************************************/
  /**
   * Function used to deactivate the hover.
   */
  onMouseLeave() {
    this.isHovered = false;
    this.surgeonHovered = '';
  }
}


