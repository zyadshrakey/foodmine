import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../shared/models/User';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  user!: User;
  isEditing: boolean = false;
  profileForm!: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.initForm();
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(3)]],
      address: [
        this.user.address,
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  get fc() {
    return this.profileForm.controls;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.initForm(); // Reset form when starting edit
    }
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      this.toastr.warning('Please check your inputs', 'Invalid Form');
      return;
    }

    const updatedUser = { ...this.user, ...this.profileForm.value };

    this.userService.updateProfile(updatedUser).subscribe({
      next: (user) => {
        this.user = user;
        this.isEditing = false;
        this.toastr.success('Profile updated successfully', 'Success');
      },
      error: () => {
        this.toastr.error('Failed to update profile', 'Error');
      },
    });
  }
}
