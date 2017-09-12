import * as React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

export class RichUtilsSample extends React.Component<null, { editorState: EditorState }> {
  state = { editorState: EditorState.createEmpty() };

  editorStateChanged = (newEditorState: EditorState) => this.setState({ editorState: newEditorState });

  handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.editorStateChanged(newState);
      return "handled";
    }
    return "not-handled";
  };

  render() {
    return (
      <div className="editor">
        {" "}
        <Editor
          editorState={this.state.editorState}
          onChange={this.editorStateChanged}
          handleKeyCommand={this.handleKeyCommand}
        />
      </div>
    );
  }
}
