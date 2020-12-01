import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../Core/Services/storage.service';
import { UserStorage } from '../../../Core/Models/storage.model';
import { navbar } from '../../../Animations/animations';

@Component({
  selector: 'app-nav-bar-emp',
  templateUrl: './nav-bar-emp.component.html',
  styleUrls: ['./nav-bar-emp.component.sass'],
  animations: [ navbar ]
})
export class NavBarEmpComponent implements OnInit {

  private storage: StorageService;
  private vUser: UserStorage;
  public userName = 'Not Session';
  public isOpen = false;
	public imgUser : string = '';
	public nameUser : string = '';

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
  constructor() {
    this.storage = new StorageService();
    this.vUser = new UserStorage('','','','','','','','','',false);
    if(this.storage.getCurrentSession() != null){
      this.vUser.setSession(this.storage.getCurrentSession());
      this.userName = this.vUser.getName();
    }
  }

  ngOnInit(): void {
		this.storage = new StorageService();
		if( this.storage.getCurrentSession() != null ){
			this.vUser.setSession( this.storage.getCurrentSession());
			this.nameUser = this.vUser.getName();
			if( this.vUser.getImg() != '' ){
				this.imgUser = this.vUser.getImg();
			}else{
				this.imgUser = '';
			}
		}
  }

}
