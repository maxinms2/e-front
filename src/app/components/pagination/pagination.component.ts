import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage: number=1;
  @Input() totalPages: number=0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  getPageNumbers(): number[] {
    const visiblePages = 5; // Número de páginas visibles
    const pages: number[] = [];

    let startPage: number, endPage: number;

    if (this.totalPages <= visiblePages) {
      // Si el total de páginas es menor o igual al número de páginas visibles, muestra todas
      startPage = 1;
      endPage = this.totalPages;
    } else {
      // Caso general, muestra la página actual al inicio del rango visible
      startPage = Math.floor((this.currentPage - 1) / visiblePages) * visiblePages + 1;
      endPage = Math.min(startPage + visiblePages - 1, this.totalPages);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  nextPage(): void {
    console.log("this.currentPage=="+this.currentPage+ " de "+this.totalPages)
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.pageChange.emit(pageNumber);
    }
  }

  goToFirstPage(): void {
    this.pageChange.emit(1);
  }

  goToLastPage(): void {
    this.pageChange.emit(this.totalPages);
  }
}
