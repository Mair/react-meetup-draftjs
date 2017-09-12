import * as React from 'react';
import { Editor, EditorState } from 'draft-js';

export class BlockStyling extends React.Component<null, { editorState: EditorState }> {
  state = { editorState: EditorState.createEmpty() };

  editorStateChanged = newEditorState => this.setState({ editorState: newEditorState });

  fontStyler = contentBlock => {
    return 'fantasy-font';
  }

  render() {
    return (
      <div className="editor">
        <Editor
          editorState={this.state.editorState}
          onChange={this.editorStateChanged}
          blockStyleFn={this.fontStyler}
        />
      </div>
    );
  }
}
