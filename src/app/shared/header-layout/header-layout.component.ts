import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'header-layout',
  imports: [
    NzButtonModule,
    NzDescriptionsModule,
    NzPageHeaderModule,
    NzSpaceModule,
  ],
  standalone: true,
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.css',
})
export class HeaderLayoutComponent {
  constructor(private router: Router) {}

  handleNavigate() {
    this.router.navigate(['/']);
  }
}
