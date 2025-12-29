import { render } from 'solid-js/web';
import { createSignal, For, Show } from 'solid-js';
import './input.css';

interface Field {
  name: string;
  type: string;
  required: boolean;
}

interface Entity {
  id: number;
  name: string;
  fields: Field[];
}

function ViewEntity() {
  const app = document.getElementById('app');
  if (!app) return;

  const dataAttr = app.getAttribute('data-entity');
  const entity: Entity = dataAttr ? JSON.parse(dataAttr) : { id: 0, name: '', fields: [] };
  const [isOpen, setIsOpen] = createSignal(true);

  return (
    <div class="flex h-screen">
      <Show when={isOpen()}>
        <div class="w-96 bg-gray-50 border-r border-gray-300 p-6 overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">{entity.name}</h2>
            <button
              onClick={() => setIsOpen(false)}
              class="text-2xl text-gray-600 hover:text-gray-900 transition-colors"
            >
              ×
            </button>
          </div>
          
          <div class="mb-6">
            <strong class="text-gray-700">ID:</strong> <span class="text-gray-900">{entity.id}</span>
          </div>

          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Fields ({entity.fields.length})</h3>
            <div class="bg-white rounded-lg p-4 shadow-sm">
              <For each={entity.fields}>
                {(field) => (
                  <div class="py-3 border-b border-gray-200 last:border-b-0">
                    <div class="font-semibold text-gray-900 mb-2">
                      {field.name}
                      {field.required && <span class="text-red-600 ml-1">*</span>}
                    </div>
                    <div class="text-sm text-gray-600">Type: {field.type}</div>
                    <div class="text-sm text-gray-600">
                      Required: {field.required ? 'Yes' : 'No'}
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>

          <div class="flex gap-3">
            <a
              href={`/entities/${entity.id}/edit`}
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
            >
              Edit
            </a>
            <a
              href="/entities"
              class="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-center"
            >
              Back to List
            </a>
          </div>
        </div>
      </Show>

      <Show when={!isOpen()}>
        <button
          onClick={() => setIsOpen(true)}
          class="fixed left-0 top-1/2 -translate-y-1/2 px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
        >
          ▶
        </button>
      </Show>

      <div class="flex-1 p-8 overflow-y-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Entity Details</h1>
        <p class="text-gray-600">Use the side panel to view entity information.</p>
      </div>
    </div>
  );
}

render(() => <ViewEntity />, app);

