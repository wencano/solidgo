import { render } from 'solid-js/web';
import { createSignal, createEffect, Show, For, onCleanup } from 'solid-js';
import './input.css';

interface Notification {
  id: number;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

function NotificationsDropdown() {
  const [notifications, setNotifications] = createSignal<Notification[]>([]);
  const [isOpen, setIsOpen] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        updateBadge(data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {
    fetchNotifications();
  });

  createEffect(() => {
    const button = document.getElementById('notifications-button');
    if (button) {
      const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen());
      };
      button.addEventListener('click', handleClick);
      onCleanup(() => {
        button.removeEventListener('click', handleClick);
      });
    }
  });

  const updateBadge = (notifs: Notification[]) => {
    const unreadCount = notifs.filter(n => !n.read).length;
    const badge = document.getElementById('notifications-badge');
    if (badge) {
      if (unreadCount > 0) {
        badge.textContent = unreadCount > 9 ? '9+' : unreadCount.toString();
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
  };

  createEffect(() => {
    if (isOpen()) {
      fetchNotifications();
      
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const container = document.getElementById('notifications-container');
        if (container && !container.contains(target)) {
          setIsOpen(false);
        }
      };
      
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
      
      onCleanup(() => {
        document.removeEventListener('click', handleClickOutside);
      });
    }
  });

  return (
    <Show when={isOpen()}>
      <div
        onClick={(e) => e.stopPropagation()}
        class="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50"
        style="max-height: calc(100vh - 6rem);"
      >
        <div class="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 rounded-t-lg">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              class="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close notifications"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div class="overflow-y-auto" style="max-height: calc(100vh - 10rem);">
          <Show when={loading()}>
            <div class="p-8 text-center">
              <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p class="mt-2 text-sm text-gray-500">Loading notifications...</p>
            </div>
          </Show>
          <Show when={!loading() && notifications().length === 0}>
            <div class="p-8 text-center text-gray-500">
              <svg class="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p class="text-sm">No notifications</p>
            </div>
          </Show>
          <Show when={!loading() && notifications().length > 0}>
            <div class="divide-y divide-gray-100">
              <For each={notifications()}>
                {(notification) => (
                  <div class={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}>
                    <div class="flex items-start gap-3">
                      <div class={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        !notification.read ? 'bg-blue-600' : 'bg-transparent'
                      }`}></div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                          <span class={`text-xs font-medium px-2 py-0.5 rounded ${
                            notification.type === 'info' ? 'bg-blue-100 text-blue-800' :
                            notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            notification.type === 'error' ? 'bg-red-100 text-red-800' :
                            notification.type === 'success' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {notification.type}
                          </span>
                        </div>
                        <p class="text-sm text-gray-900 leading-relaxed">{notification.message}</p>
                        <p class="text-xs text-gray-500 mt-2">
                          {new Date(notification.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>
    </Show>
  );
}

const dropdownElement = document.getElementById('notifications-dropdown');
if (dropdownElement) {
  render(() => <NotificationsDropdown />, dropdownElement);
}

