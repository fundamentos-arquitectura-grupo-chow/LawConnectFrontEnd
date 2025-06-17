import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { Notification } from '../../model/notification';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  // Colecciones de notificaciones
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];

  // Control de filtrado
  activeFilter: string = 'all';

  // Para gestionar la finalización de suscripciones
  private destroy$ = new Subject<void>();

  // Para simular notificaciones leídas/no leídas
  private readNotificationsIds: Set<number> = new Set<number>();

  constructor(
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadNotifications(): void {
    this.authService.currentUserId
      .pipe(takeUntil(this.destroy$))
      .subscribe(clientId => {
        if (clientId) {
          this.notificationService.getAllNotificationsByClientId(clientId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (notifications) => {
                this.notifications = notifications;
                this.applyFilter(this.activeFilter);
              },
              error: (error) => {
                console.error('Error al cargar notificaciones:', error);
                this.snackBar.open('Error al cargar notificaciones', 'Cerrar', {
                  duration: 3000,
                  panelClass: 'error-snackbar'
                });
              }
            });
        }
      });
  }

  filterNotifications(filter: string): void {
    this.activeFilter = filter;
    this.applyFilter(filter);
  }

  private applyFilter(filter: string): void {
    if (filter === 'all') {
      this.filteredNotifications = [...this.notifications];
    } else if (filter === 'unread') {
      this.filteredNotifications = this.notifications.filter(
        notification => !this.readNotificationsIds.has(notification.id)
      );
    }
  }

  deleteNotification(id: number): void {
    this.notificationService.deleteNotification(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notifications = this.notifications.filter(n => n.id !== id);
          this.applyFilter(this.activeFilter);
          this.snackBar.open('Notificación eliminada', 'OK', {
            duration: 2000
          });
        },
        error: (error) => {
          console.error('Error al eliminar la notificación:', error);
          this.snackBar.open('Error al eliminar la notificación', 'Cerrar', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
        }
      });
  }

  markAsRead(notification: Notification): void {
    // Simulación de marcar como leída - en un caso real esto llamaría a un servicio
    this.readNotificationsIds.add(notification.id);

    // Si el filtro actual es "no leídas", actualizamos la lista
    if (this.activeFilter === 'unread') {
      this.applyFilter(this.activeFilter);
    }
  }

  isRead(notification: Notification): boolean {
    return this.readNotificationsIds.has(notification.id);
  }

  // Función para simular tiempo transcurrido
  getTimeAgo(notification: Notification): string {
    // En un caso real, usaríamos la fecha de creación de la notificación
    // Aquí solo devolvemos un valor estático para la demostración
    return 'Hace 2 horas';
  }
}
