import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pictureFile: string | ArrayBuffer | undefined;
  public Form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.Form = this.formBuilder.group({
      pictureFile: ['',],
      idType: [''],
      idNumer: [''],
      firstName: [''],
      lastName: [''],
      address: [''],
      phoneNumber: [''],
      email: [''],
      originCity: [''],
    });
  }

  public onSelectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        if (event.target?.result) {
          this.pictureFile = event.target.result;
          this.Form.patchValue({
            pictureFile: reader.result
          });
        }
      }
    }
  }

  async onSubmit(): Promise<void> {
    try {
      await this.clientService.create(this.Form.value)
    } catch (error) {
      console.log(error);
    }
  }
}
