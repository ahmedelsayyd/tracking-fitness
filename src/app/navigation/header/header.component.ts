import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app-state/app.redusers'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideNav = new EventEmitter<void>();
  isAuth$: Observable<boolean>

  constructor(private authService: AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
    // this.subscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus
    // })
  }

  sideNavToggole() {
    this.sideNav.emit()
  }

  logOut() {
    this.authService.logOut()
  }

}
