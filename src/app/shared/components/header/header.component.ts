import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, computed, effect, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
   isLoggedIn = false;
  
  constructor(private apiService: ApiService, private cd:ChangeDetectorRef) {}
  ngOnInit(): void {
    this.isLoggedIn = this.apiService.checkLoggedIn();
  }
  logout() {
    this.apiService.logout();
    this.cd.detectChanges();
  }

}
