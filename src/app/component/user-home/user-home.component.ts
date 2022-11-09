import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Currency } from 'src/app/model/Currency';
import { District } from 'src/app/model/District';
import { Home } from 'src/app/model/Home';
import { HomeType } from 'src/app/model/HomeType';
import { Neighbourhood } from 'src/app/model/Neighbourhood';
import { RoomNumber } from 'src/app/model/RoomNumber';
import { Status } from 'src/app/model/Status';
import { Type } from 'src/app/model/Type';
import { User } from 'src/app/model/User';
import { CurrencyService } from 'src/app/service/currency.service';
import { HomeTypeService } from 'src/app/service/home-types.service';
import { HomeService } from 'src/app/service/home.service';
import { NeighbourhoodService } from 'src/app/service/neighbourhood.service';
import { RoomNumbersService } from 'src/app/service/room-numbers.service';
import { StatusService } from 'src/app/service/status.service';
import { TypesService } from 'src/app/service/types.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  public homes!: Home[];
  public neighbourhoods!: Neighbourhood[];
  public types!: Type[];
  public roomNumbers!: RoomNumber[]
  public currencies!: Currency[];
  public homeTypes!: HomeType[];
  public users!: User[];
  public statuses!: Status[];


  public selectedNeighbourhood!: District;
  public selectedHomeType!: HomeType;
  public selectedRoomNumber!: RoomNumber;
  public selectedType!: Type;
  public selectedCurrency!: Currency;
  public selectedUser!: User;
  public selectedStatus!: Status;
  public deleteHome!: Home;
  public editHome!: Home;
  public userId!: any;
  public currentUser!: User;


  constructor(
    private homeService: HomeService,
    private neighbourhoodService: NeighbourhoodService,
    private typeService: TypesService,
    private roomNumberService: RoomNumbersService,
    private currencyService: CurrencyService,
    private homeTypeService: HomeTypeService,
    private userService: UsersService,
    private statusServcie: StatusService,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userId = id;
    this.getAllNeighbourhood();
    this.getAllHomeByUserId(id);
    this.getAllCurrency();
    this.getAllHomeType();
    this.getAllRoomNumber();
    this.getAllStatus();
    this.getAllUser();
    this.getAllType();
  }

  public getAllNeighbourhood(): void {
    this.neighbourhoodService.getAll().subscribe(
      (response: Neighbourhood[]) => {
        this.neighbourhoods = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAllType(): void {
    this.typeService.getAll().subscribe(
      (response: Type[]) => {
        this.types = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAllRoomNumber(): void {
    this.roomNumberService.getAll().subscribe(
      (response: RoomNumber[]) => {
        this.roomNumbers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAllCurrency(): void {
    this.currencyService.getAll().subscribe(
      (response: Currency[]) => {
        this.currencies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAllHomeType(): void {
    this.homeTypeService.getAll().subscribe(
      (response: HomeType[]) => {
        this.homeTypes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAllUser(): void {
    this.userService.getUserId(this.userId).subscribe(
      (response: User) => {
        this.currentUser= response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAllStatus(): void {
    this.statusServcie.getAll().subscribe(
      (response: Status[]) => {
        this.statuses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(home: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      console.log("add")
      button.setAttribute('data-target', '#addHomeModal');
    }
    if (mode === 'edit') {
      this.editHome = home;
      this.selectedCurrency = home.currency;
      this.selectedNeighbourhood = home.neighbourhood;
      this.selectedType = home.type;
      this.selectedHomeType = home.homeType;
      this.selectedRoomNumber = home.roomNumber;
      this.selectedStatus = home.status;
      button.setAttribute('data-target', '#updateHomeModal');
    }
    if (mode === 'delete') {
      this.deleteHome = home;
      console.log("Delete")
      button.setAttribute('data-target', '#deleteHomeModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
  }
  // public onSelect(home: Home) {
  //   this.router.navigate([home.id], { relativeTo: this.activatedRoute })
  // }


  // ***** CRUD**********
  // Read
  public getAllHomeByUserId(id: any): void {
    this.homeService.getAllById(id).subscribe(
      (response: Home[]) => {
        console.log(response)
        this.homes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Create
  public onAddHome(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-home-form')?.click();
    this.homeService.insert(addForm.value).subscribe(
      (response: Home) => {
        this.getAllHomeByUserId(this.userId);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  // Update
  public onUpdateHome(home: Home): void {
    console.log(home)
    this.homeService.update(home).subscribe(
      (response: Home) => {
        console.log(response);
        this.getAllHomeByUserId(this.userId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  // Delete
  public onDeleteHome(contactId: number): void {
    this.homeService.deleteById(contactId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllHomeByUserId(this.userId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Search 
  public search(key: string): void {
    console.log(key);
    const results: Home[] = [];
    for (let home of this.homes) {
      if (home.neighbourhood.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.neighbourhood.district.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.neighbourhood.district.city.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.type.type.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.roomNumber.roomNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.homeType.homeType.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.user.agencyId.agencyName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.user.employeeId.firstname.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.user.employeeId.position.positionName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.user.employeeId.surname.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.user.employeeId.tcNo.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.user.positionId.positionName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.user.email.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.user.phoneNumber.contactNo.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.address.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.details.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.status.status.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        home.neighbourhood.id == parseInt(key) ||
        home.neighbourhood.district.id == parseInt(key) ||
        home.id == parseInt(key)) {
        results.push(home);
      }
    }
    this.homes = results;
    if (!key) {
      this.getAllHomeByUserId(this.userId);
    }
  }


}
