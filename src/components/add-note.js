import { gql, request } from 'https://jspm.dev/graphql-request';
import {
  html,
  PolymerElement,
} from 'https://unpkg.com/@polymer/polymer/polymer-element.js';

const mutation = gql`
  mutation AddNote($name: String, $body: String) {
    noteCreate(record: { name: $name, body: $body }) {
      record {
        _id
        name
        body
      }
    }
  }
`;

export class AddNoteComponent extends PolymerElement {
  handleNameChange = (event) => {
    const htmlInput = event.target;
    this.name = htmlInput.value;
  };

  handleBodyChange = (event) => {
    const htmlInput = event.target;
    this.body = htmlInput.value;
  };

  createNote = async () => {
    const variables = { name: this.name, body: this.body };
    const result = await request(
      'http://localhost:3000/graphql',
      mutation,
      variables
    );
    const note = result.noteCreate.record;
    this.dispatchEvent(new CustomEvent('note', { detail: note }));
    this.name = '';
    this.body = '';
  };

  static get template() {
    return html`
      <div class="add-note">
        <div>
          <input
            type="text"
            class="name-input"
            label="Enter note name"
            value="{{name::input}}"
          />
        </div>
        <div>
          <textarea
            class="body-input"
            placeholder="Enter note body"
            value="{{body::input}}"
          ></textarea>
        </div>

        <div>
          <button class="create-button" on-click="createNote">
            Create Note
          </button>
        </div>
      </div>
    `;
  }

  async ready() {
    super.ready();
  }
}

customElements.define('add-note', AddNoteComponent);
