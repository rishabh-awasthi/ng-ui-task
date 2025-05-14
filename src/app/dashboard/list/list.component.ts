import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit,OnDestroy {
  users: any[] = [];
  page = 1;
  loading = false;
userDataObs:any;
  constructor(private apiService: ApiService, private spinnerService:NgxSpinnerService, private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    if (this.loading) return;
    this.loading = true;

    this.spinnerService.show();
 this.userDataObs =   this.apiService.fetchUserList(this.page).subscribe(data => {

  this.spinnerService.hide();
  
      this.users = [...this.users, ...data.data];
      this.page++;
      this.loading = false;
      this.cd.markForCheck();
      });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
  
  @HostListener("window:scroll", [])
  onScroll(): void {
    const scrollPosition = Math.ceil(window.innerHeight + window.scrollY);
    const pageHeight = Math.ceil(document.documentElement.scrollHeight);

    if (scrollPosition >= pageHeight - 100 && !this.loading) {
      this.loadUsers();
    }
  }

  ngOnDestroy(): void {
     this.userDataObs.unsubscribe();
  }
}
