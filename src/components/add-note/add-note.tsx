import { Component, Event, EventEmitter, h, State } from '@stencil/core';
import { gql, request } from 'graphql-request';

const mutation = gql`
  mutation AddNote ($name:String, $body:String) {
    noteCreate (record:{name:$name, body:$body}) {
      record {
        _id
        name
        body
      }
    }
  }
`

@Component({
  tag: 'add-note',
  styleUrl: 'add-note.css',
  shadow: true,
})
export class AddNote {
  nameInput!: HTMLInputElement;
  @State() name: String;

  bodyInput!: HTMLInputElement;
  @State() body: String;

  @Event() noteAdded: EventEmitter<Object>;

  handleNameChange = (event: UIEvent) => {
    const htmlInput: HTMLInputElement = event.target as HTMLInputElement;
    this.name = htmlInput.value;
  }

  handleBodyChange = (event: UIEvent) => {
    const htmlInput: HTMLInputElement = event.target as HTMLInputElement;
    this.body = htmlInput.value;
  }

  createNote = async () => {
    const variables = { name: this.name, body: this.body };
    const result = await request('http://localhost:3000/graphql', mutation, variables);
    const note = result.noteCreate.record;
    this.noteAdded.emit(note);
    this.nameInput.value = '';
    this.bodyInput.value = '';
  }

  render() {
    return (
      <div class="add-note">
        <paper-input class="name-input" label="Enter note name" onKeyUp={this.handleNameChange} ref={(el) => this.nameInput = el as HTMLInputElement} />

        <iron-autogrow-textarea class="body-input" placeholder="Enter note body" onKeyUp={this.handleBodyChange} ref={(el) => this.bodyInput = el as HTMLInputElement} />

        <paper-button class="create-button" onClick={this.createNote}>Create Note</paper-button>
      </div>
    );
  }
}
