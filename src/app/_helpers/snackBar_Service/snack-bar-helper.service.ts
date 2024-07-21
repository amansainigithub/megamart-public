import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarHelperService {

  constructor(private _snackbar:MatSnackBar) { }

  

  OpenSnackbar_verticalPosition_top(msg:any,undo:any,duraion:any)
      {
        this._snackbar.open(msg, undo, {
            duration: duraion,
            // here specify the position
            verticalPosition: 'top',
            panelClass: ['blue-snackbar']
          });
      }

      OpenSnackbar_verticalPosition_top_right(msg:any,undo:any,duraion:any)
      {
        this._snackbar.open(msg, undo, {
            duration: duraion,
            // here specify the position
            verticalPosition: 'top',
            horizontalPosition:'right',
            panelClass: ['blue-snackbar']
          });
      }


      OpenSnackbar_horizontalPosition_end(msg:any,undo:any,duraion:any)
      {
        this._snackbar.open(msg, undo, {
            duration: duraion,
            // here specify the position
            horizontalPosition : 'end'
          });
      }

      
      OpenSnackbar_horizontalPosition_start(msg:any,undo:any,duraion:any)
      {
        this._snackbar.open(msg, undo, {
            duration: duraion,
            // here specify the position
            horizontalPosition : 'start'
          });
      }

      normalSnackBar(msg:any,undo:any,duraion:any)
      {
        this._snackbar.open(msg, undo, {
          duration: duraion
        });
      }
}
