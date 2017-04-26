import { Component, Inject  } from '@angular/core';
import { MdDialogRef} from '@angular/material';

import template from './start.html';

@Component({
  selector: 'front-dialog-start',
  template
})

export class FrontDialogStartComponent {

  constructor(public dialogRef: MdDialogRef<FrontDialogStartComponent>) {}

  onSubmit () {
    console.log('send');
  }
}
