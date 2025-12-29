import { render } from 'solid-js/web';
import { createSignal, For } from 'solid-js';
import './input.css';

interface Field {
  name: string;
  type: string;
  required: boolean;
}

const fieldTypes = ['text', 'number', 'email', 'textarea', 'date', 'boolean'];

function NewEntityForm() {
  const app = document.getElementById('app');
  if (!app) return;

  const [name, setName] = createSignal('');
  const [fields, setFields] = createSignal<Field[]>([]);
  const [newFieldName, setNewFieldName] = createSignal('');
  const [newFieldType, setNewFieldType] = createSignal('text');
  const [newFieldRequired, setNewFieldRequired] = createSignal(false);

  const addField = () => {
    if (newFieldName().trim()) {
      setFields([...fields(), {
        name: newFieldName(),
        type: newFieldType(),
        required: newFieldRequired(),
      }]);
      setNewFieldName('');
      setNewFieldType('text');
      setNewFieldRequired(false);
    }
  };

  const removeField = (index: number) => {
    setFields(fields().filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const response = await fetch('/entities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name(), fields: fields() }),
    });
    if (response.ok) {
      window.location.href = '/entities';
    }
  };

  return (
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">New Entity</h1>
      <form onSubmit={handleSubmit} class="bg-white shadow-md rounded-lg p-6">
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Entity Name</label>
          <input
            type="text"
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Fields</h3>
          <div class="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Field name"
              value={newFieldName()}
              onInput={(e) => setNewFieldName(e.currentTarget.value)}
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={newFieldType()}
              onChange={(e) => setNewFieldType(e.currentTarget.value)}
              class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <For each={fieldTypes}>
                {(type) => <option value={type}>{type}</option>}
              </For>
            </select>
            <label class="flex items-center gap-2 px-3 py-2">
              <input
                type="checkbox"
                checked={newFieldRequired()}
                onChange={(e) => setNewFieldRequired(e.currentTarget.checked)}
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="text-sm text-gray-700">Required</span>
            </label>
            <button
              type="button"
              onClick={addField}
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Add
            </button>
          </div>

          <div class="border border-gray-300 rounded-md p-4 bg-gray-50">
            <For each={fields()}>
              {(field, index) => (
                <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                  <span class="text-sm text-gray-900">
                    <strong>{field.name}</strong> ({field.type}) {field.required && <span class="text-red-600">*</span>}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeField(index())}
                    class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}
            </For>
            {fields().length === 0 && (
              <div class="text-gray-500 text-center py-8">No fields added yet</div>
            )}
          </div>
        </div>

        <div class="flex gap-3">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Entity
          </button>
          <a
            href="/entities"
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors inline-block text-center"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

render(() => <NewEntityForm />, app);

