import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LeaveForm } from '../model/leave-application-form.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private leaveDataList: LeaveForm[] = [];
  leaveSub = new BehaviorSubject<LeaveForm[]>(this.leaveDataList);

  constructor(private http: HttpClient) { }

  getLeaveList(): LeaveForm[] {
    return this.leaveDataList;
  }

  addLeave(newLeave: LeaveForm): void {
    newLeave.status = 'Pending';
    this.leaveDataList.push(newLeave);
    this.leaveSub.next(this.leaveDataList);

    this.http.post('https://task-5-sw-default-rtdb.firebaseio.com/user-leaves.json', newLeave)
      .subscribe({
        next: () => {
          console.log('Leave data successfully sent to Firebase');
        },
        error: (error) => {
          console.error('Error sending leave data to Firebase:', error);
        }
      });
  }

  getLeavesFromFirebase(): Observable<LeaveForm[]> {
    return this.http.get<LeaveForm[]>('https://task-5-sw-default-rtdb.firebaseio.com/user-leaves.json');
  }

  updateLeaveStatus(leave: LeaveForm, newStatus: string): Observable<void> {
    const leaveToUpdate = this.leaveDataList.find(
      (item) => item.startDate === leave.startDate && item.endDate === leave.endDate
    );

    if (leaveToUpdate) {
      leaveToUpdate.status = newStatus;
      this.leaveSub.next(this.leaveDataList);

      return this.http.put<void>(`https://task-5-sw-default-rtdb.firebaseio.com/user-leaves.json`, this.leaveDataList);
    } else {
      return new Observable<void>((observer) => {
        observer.error('Leave not found');
      });
    }
  }
}
