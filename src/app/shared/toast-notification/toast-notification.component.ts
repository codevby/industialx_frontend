import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast-service.service';

@Component({
  selector: 'toast-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css',
})
export class ToastNotificationComponent implements OnInit {
  isVisible = false;
  message = '';
  type: 'success' | 'error' | 'info' | 'warning' = 'info';

  private cd = inject(ChangeDetectorRef);

  private timeout: any;
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.toastService.toast$.subscribe(({ message, type, duration }) => {
      this.showToast(message, type, duration);
    });
  }

  showToast(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration = 2000
  ): void {
    this.message = message;
    this.type = type;
    this.isVisible = true;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.close();
    }, duration);
  }

  close(): void {
    this.isVisible = false;
    this.cd.detectChanges();
  }
}
