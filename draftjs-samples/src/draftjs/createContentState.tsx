import * as React from 'react';
import * as Draft from 'draft-js';
const rawSampleJson = require('./rawContentSample.json');

interface CreateContentStateState {
    editorState: Draft.EditorState;
    plainText: string;
    html: string;
}

export class CreateContentState extends React.Component<null, CreateContentStateState> {
    state = {
        editorState: Draft.EditorState.createEmpty(),
        plainText: 'This is a plain string of text',
        html: '<h1>Header</h1> <b>Bold text</b>, <i>Italic text</i><br/ ><br />'
    };

    editorStateChanged = (newEditorState: Draft.EditorState) => this.setState({ editorState: newEditorState });

    createWithPlainText = () => {
        const contentState = Draft.ContentState.createFromText(this.state.plainText);
        const newEditorState = Draft.EditorState.createWithContent(contentState);
        this.setState({ editorState: newEditorState });
    }

    createWithHTML = () => {
        const contentBlocks = Draft.convertFromHTML(this.state.html);
        const contentState = Draft.ContentState.createFromBlockArray(contentBlocks);
        const newEditorState = Draft.EditorState.createWithContent(contentState);
        this.setState({ editorState: newEditorState });
    }

    createWithRawContent = () => {
        const contentState = Draft.convertFromRaw(rawSampleJson);
        const newEditorState = Draft.EditorState.createWithContent(contentState);
        this.editorStateChanged(newEditorState);
    }

    render() {
        return <div >
            <div className="editor">
                <Draft.Editor
                    editorState={this.state.editorState}
                    onChange={this.editorStateChanged}
                />
            </div >
            <table>
                <tbody>
                    <tr>
                        <td>
                            <input
                                type="text"
                                value={this.state.plainText}
                                onChange={e => this.setState({ plainText: e.target.value })}
                            />
                        </td>
                        <td>
                            <button onClick={this.createWithPlainText}>create with text</button>
                        </td>
                    </tr>
                    <tr>
                        <td><pre>see json in document below... </pre></td>
                        <td><button onClick={this.createWithRawContent}>create with raw content</button></td>
                    </tr>

                    <tr>
                        <td>
                            <textarea
                                value={this.state.html}
                                onChange={e => this.setState({ html: e.target.value })}
                            />
                        </td>
                        <td><button onClick={this.createWithHTML}>create with HTML</button></td>
                    </tr>

                </tbody>
            </table>
        </div>;
    }
}