import { createSignal, For } from 'solid-js';
import './input.css';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  type: 'success' | 'warning' | 'info';
}

interface RecentOrder {
  id: number;
  customer: string;
  product: string;
  amount: string;
  status: 'pending' | 'completed' | 'cancelled';
}

function Dashboard() {
  const [stats] = createSignal<StatCard[]>([
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up' },
    { title: 'Subscriptions', value: '+2,350', change: '+180.1%', trend: 'up' },
    { title: 'Sales', value: '+12,234', change: '+19%', trend: 'up' },
    { title: 'Active Now', value: '+573', change: '+201', trend: 'up' },
  ]);

  const [activities] = createSignal<Activity[]>([
    { id: 1, user: 'John Doe', action: 'Created new entity', time: '2 minutes ago', type: 'success' },
    { id: 2, user: 'Jane Smith', action: 'Updated product catalog', time: '15 minutes ago', type: 'info' },
    { id: 3, user: 'Bob Johnson', action: 'Deleted expired record', time: '1 hour ago', type: 'warning' },
    { id: 4, user: 'Alice Williams', action: 'Processed payment', time: '2 hours ago', type: 'success' },
    { id: 5, user: 'Charlie Brown', action: 'Updated user profile', time: '3 hours ago', type: 'info' },
  ]);

  const [recentOrders] = createSignal<RecentOrder[]>([
    { id: 1, customer: 'Olivia Martin', product: 'Premium Plan', amount: '$1,999.00', status: 'completed' },
    { id: 2, customer: 'Jackson Lee', product: 'Basic Plan', amount: '$499.00', status: 'pending' },
    { id: 3, customer: 'Isabella Nguyen', product: 'Enterprise Plan', amount: '$4,999.00', status: 'completed' },
    { id: 4, customer: 'William Kim', product: 'Pro Plan', amount: '$999.00', status: 'cancelled' },
    { id: 5, customer: 'Sophia Davis', product: 'Starter Plan', amount: '$199.00', status: 'completed' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="max-w-7xl mx-auto space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Export Report
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <For each={stats()}>
            {(stat) => (
              <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 class="text-sm font-medium text-gray-600">{stat.title}</h3>
                  <svg
                    class="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="text-2xl font-bold">{stat.value}</div>
                <p class="text-xs text-gray-500 mt-1">
                  <span class={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>{' '}
                  from last month
                </p>
              </div>
            )}
          </For>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold">Recent Activity</h2>
              <p class="text-sm text-gray-600 mt-1">Latest actions from your team</p>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <For each={activities()}>
                  {(activity) => (
                    <div class="flex items-start space-x-4">
                      <div class={`w-2 h-2 rounded-full mt-2 ${getActivityColor(activity.type)}`}></div>
                      <div class="flex-1 space-y-1">
                        <p class="text-sm font-medium">{activity.user}</p>
                        <p class="text-sm text-gray-600">{activity.action}</p>
                        <p class="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold">Recent Orders</h2>
              <p class="text-sm text-gray-600 mt-1">Latest transactions and subscriptions</p>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <For each={recentOrders()}>
                  {(order) => (
                    <div class="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div class="space-y-1">
                        <p class="text-sm font-medium">{order.customer}</p>
                        <p class="text-sm text-gray-600">{order.product}</p>
                      </div>
                      <div class="text-right space-y-1">
                        <p class="text-sm font-medium">{order.amount}</p>
                        <span class={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-lg font-semibold">Sales Overview</h2>
            <p class="text-sm text-gray-600 mt-1">Monthly revenue and growth metrics</p>
          </div>
          <div class="p-6">
            <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div class="text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p class="mt-2 text-sm text-gray-600">Chart visualization placeholder</p>
                <p class="text-xs text-gray-400">Integrate with a charting library like Chart.js or Recharts</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold">Top Products</h2>
              <p class="text-sm text-gray-600 mt-1">Best performing items</p>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm">Premium Plan</span>
                  <span class="text-sm font-medium">$12,450</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">Enterprise Plan</span>
                  <span class="text-sm font-medium">$8,900</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">Pro Plan</span>
                  <span class="text-sm font-medium">$5,200</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold">User Growth</h2>
              <p class="text-sm text-gray-600 mt-1">New users this month</p>
            </div>
            <div class="p-6">
              <div class="text-3xl font-bold">2,543</div>
              <p class="text-sm text-gray-600 mt-2">+12.5% from last month</p>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold">Conversion Rate</h2>
              <p class="text-sm text-gray-600 mt-1">Overall conversion metrics</p>
            </div>
            <div class="p-6">
              <div class="text-3xl font-bold">3.24%</div>
              <p class="text-sm text-gray-600 mt-2">+0.5% from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

