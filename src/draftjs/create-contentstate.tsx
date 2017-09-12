import * as React from "react";
import * as Draft from "draft-js";
const rawSampleJson = require("./rawContentSample.json");

interface CreateContentStateState {
  editorState: Draft.EditorState;
  plainText: string;
  html: string;
}

export class CreateContentState extends React.Component<null, CreateContentStateState> {
  state = {
    editorState: Draft.EditorState.createEmpty(),
    plainText: "This is a plain string of text",
    html: "<h1>Header</h1> <b>Bold text</b>, <i>Italic text</i><br/ ><br />"
  };

  editorStateChanged = (newEditorState: Draft.EditorState) => this.setState({ editorState: newEditorState });

  createWithPlainText = () => {
    const contentState = Draft.ContentState.createFromText(this.state.plainText);
    const newEditorState = Draft.EditorState.createWithContent(contentState);
    this.setState({ editorState: newEditorState });
  };

  createWithHTML = () => {
    const contentBlocks = Draft.convertFromHTML(this.state.html);
    const contentState = Draft.ContentState.createFromBlockArray(contentBlocks);
    const newEditorState = Draft.EditorState.createWithContent(contentState);
    this.setState({ editorState: newEditorState });
  };

  createWithRawContent = () => {
    const contentState = Draft.convertFromRaw(rawSampleJson);
    const newEditorState = Draft.EditorState.createWithContent(contentState);
    this.editorStateChanged(newEditorState);
  };

  render() {
    return (
      <div>
        <div className="editor">
          <Draft.Editor editorState={this.state.editorState} onChange={this.editorStateChanged} />
        </div>

        <div className="form-horizontal col-sm-12">
          <div className="form-group  col-sm-12">
            <input
              type="text"
              value={this.state.plainText}
              onChange={e => this.setState({ plainText: e.target.value })}
              className="col-sm-6"
            />
            <button className="col-sm-6" onClick={this.createWithPlainText}>
              create with text
            </button>
          </div>
          <div className="form-group  col-sm-12">
            <label className="control-label col-sm-6">see json in document below...</label>
            <button className="col-sm-6" onClick={this.createWithRawContent}>
              create with raw content
            </button>
          </div>
          <div className="form-group  col-sm-12">
            <textarea
              value={this.state.html}
              onChange={e => this.setState({ plainText: e.target.value })}
              className="col-sm-6"
            />
            <button className="col-sm-6" onClick={this.createWithHTML}>
              create with HTML
            </button>
          </div>
        </div>
      </div>
    );
  }
}
