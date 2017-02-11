import * as React from 'react';
import * as Draft from 'draft-js';

export class ContentStateView extends React.Component<null, { editorState: Draft.EditorState }> {
    state = {
        editorState: Draft.EditorState.createEmpty()
    };

    editorStateChanged = (newEditorState: Draft.EditorState) => {
        this.setState({ editorState: newEditorState });
    }

    get contentState() {
        const contentState = this.state.editorState.getCurrentContent();
        const rawJson = Draft.convertToRaw(contentState);
        const jsonStr = JSON.stringify(rawJson, null, 1);
        const plainText = contentState.getPlainText();
        return {
            jsonStr,
            plainText
        };
    }

    render() {
        return <div>
            <div className="editor">
                <Draft.Editor
                    editorState={this.state.editorState}
                    onChange={this.editorStateChanged}
                />
            </div>
            <pre>{this.contentState.jsonStr}</pre>
            <div>{this.contentState.plainText}</div>
        </div>;
    }
}  