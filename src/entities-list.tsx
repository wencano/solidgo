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

function EntitiesList() {
  const app = document.getElementById('app');
  if (!app) return;

  const dataAttr = app.getAttribute('data-entities');
  const initialEntities: Entity[] = dataAttr ? JSON.parse(dataAttr) : [];
  
  const [entities, setEntities] = createSignal<Entity[]>(initialEntities);
  const [selectedEntity, setSelectedEntity] = createSignal<Entity | null>(null);
  const [isPanelOpen, setIsPanelOpen] = createSignal(false);

  const handleView = (entity: Entity, e: Event) => {
    e.preventDefault();
    setSelectedEntity(entity);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setSelectedEntity(null);
  };

  return (
    <div>
      <div class="container mx-auto px-4 py-8">
        <div class="mb-6 flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900">Entities</h1>
          <a href="/entities/new" class="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            New Entity
          </a>
        </div>
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fields</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <For each={entities()}>
                {(entity) => (
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entity.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entity.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entity.fields.length} field{entity.fields.length !== 1 ? 's' : ''}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={(e) => handleView(entity, e)}
                        class="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </button>
                      <a href={`/entities/${entity.id}/edit`} class="text-green-600 hover:text-green-900">Edit</a>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>

      <Show when={isPanelOpen() && selectedEntity()}>
        <div
          class="fixed inset-0 z-50 overflow-hidden"
          onClick={closePanel}
        >
          <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>
          <div
            class="absolute right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div class="h-full overflow-y-auto">
              <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-2xl font-bold text-gray-900">{selectedEntity()!.name}</h2>
                  <button
                    onClick={closePanel}
                    class="text-2xl text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div class="mb-6">
                  <strong class="text-gray-700">ID:</strong> <span class="text-gray-900">{selectedEntity()!.id}</span>
                </div>

                <div class="mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Fields ({selectedEntity()!.fields.length})</h3>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <For each={selectedEntity()!.fields}>
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
                    href={`/entities/${selectedEntity()!.id}/edit`}
                    class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
                  >
                    Edit
                  </a>
                  <button
                    onClick={closePanel}
                    class="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}

const appElement = document.getElementById('app');
if (appElement) {
  render(() => <EntitiesList />, appElement);
}

