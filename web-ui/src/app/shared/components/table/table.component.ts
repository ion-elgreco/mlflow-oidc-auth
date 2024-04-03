import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ml-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnInit {
  @Input() columnConfig: { title: string, key: string }[] = [];
  @Input() data: T[] = [];
  @Input() isActionsActive = false;

  @Output() editEvent = new EventEmitter<any>();

  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

  columns: string[] = [];
  searchValue = '';

  constructor() {
  }

  ngOnInit(): void {
    this.columns = this.columnConfig.map(c => c.key);
    this.dataSource = new MatTableDataSource(this.data);
  }

  edit(item: T) {
    this.editEvent.emit(item);
  }

  filter(value: Event) {
    const filterValue = (value.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}