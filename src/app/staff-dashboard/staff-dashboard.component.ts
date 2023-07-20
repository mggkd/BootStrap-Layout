import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../shared/service/leave-application-form.service';
import { LeaveForm } from '../shared/model/leave-application-form.model';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent implements OnInit {
  leaveDataList: LeaveForm[] = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.leaveService.getLeavesFromFirebase().subscribe(
      (leaveData: any) => {
        this.leaveDataList = Object.values(leaveData);
      },
      (error) => {
        console.error('Error fetching leave data:', error);
      }
    );
  }
}
