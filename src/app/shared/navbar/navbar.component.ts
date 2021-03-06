import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import { Header } from './../navbar/header.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean;
  header: Header[];
  logoImage: string;
  dropdownShow = false;
email;
  constructor(public sharedService: SharedService , private router: Router) { }

  ngOnInit() {
    this.allHeader();
  }
  navBarShow()   {
    this.dropdownShow = !this.dropdownShow;
  }
  allHeader() {
    this.sharedService.getHeaderDetails().subscribe(data => {
      this.header = data;
      this.header.map(elememt =>        {
          this.logoImage = elememt.logoImageName;
        }
      );
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  logOut()    {
    this.sharedService.sessionLogout();
    this.router.navigate(['account/signin']);
  }
}
