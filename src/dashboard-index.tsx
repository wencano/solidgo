import { render } from 'solid-js/web';
import Dashboard from './dashboard';

const root = document.getElementById('app');
if (root) {
  render(() => <Dashboard />, root);
}

