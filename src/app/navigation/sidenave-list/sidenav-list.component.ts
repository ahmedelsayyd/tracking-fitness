import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app-state/app.redusers'


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenaveListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>()
  isAuth$: Observable<boolean>

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {

    this.isAuth$ = this.store.select(fromRoot.getIsAuth)

    // this.subscribtion = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus
    // })
  }

  onClose() {
    this.closeSideNav.emit()
    this.router.navigate(['/'])
  }

}
