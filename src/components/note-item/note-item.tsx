import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'note-item',
  styleUrl: 'note-item.css',
  shadow: true,
})
export class Note {
  @Prop() name: string;
  @Prop() noteId: string;

  render() {
    return (
      <div class="note-item">

        <stencil-route-link url={`/note/${this.noteId}`}>
          <a>{this.name}</a>
        </stencil-route-link>
      </div>
    );
  }
}
