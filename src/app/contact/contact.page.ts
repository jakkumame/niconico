import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RealtimebaseService } from '../service/realtimebase/realtimebase.service';
import { Inquiry } from '../interface/inquiry';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {
  contactForm = this.fb.group({
    name: ['', Validators.required ],
    age: ['', Validators.required ],
    gender: ['', Validators.required ],
    inquiryType: ['', Validators.required ],
    tel: ['', Validators.required ],
    email: ['', [Validators.required, Validators.email] ],
    address: ['', Validators.required ]
  });

  constructor(private fb: FormBuilder, private rb: RealtimebaseService) {}

  onSubmit() {
    console.log(this.contactForm.value);
    if (this.contactForm.valid) {
      this.rb.submitInquiry(this.contactForm.value as Inquiry)
        .then(() => alert('Inquiry submitted!'))
        .catch((err) => alert('An error occurred while submitting the inquiry: ' + err));
    } else {
      alert('Please fill out all required fields.');
    }
  }


}
