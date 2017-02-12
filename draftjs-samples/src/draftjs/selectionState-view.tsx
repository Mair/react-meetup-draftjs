import * as React from 'react';
import * as Draft from 'draft-js';

interface SelectionStateViewState {
    editorState: Draft.EditorState;
    offset: number;
    endOffset: number;
}

export class SelectionStateView extends React.Component<null, Partial<SelectionStateViewState>> {
    state = {
        editorState: Draft.EditorState.createEmpty(),
        offset: 0,
        endOffset: 0
    };

    editorStateChanged = (newEditorState: Draft.EditorState) => {
        this.setState({ editorState: newEditorState });
    }

    get selectionState() {
        // the editorState ahs a setSelection() method to get the selection
        const selectionState = this.state.editorState.getSelection();

        // sample of some data we can get from the selection state
        const offset = selectionState.getAnchorOffset();
        const focusOffset = selectionState.getFocusOffset();
        const isBackwards = selectionState.getIsBackward();
        return {
            offset,
            focusOffset,
            isBackwards
        };
    }

    setSelection = (offset: number, focusOffset: number) => {
        const {editorState} = this.state;
        const selectionState = editorState.getSelection();

        // we cant set the selection state directly because its immutable.
        // so make a copy  
        const newSelection = selectionState.merge({
            anchorOffset: offset,
            focusOffset: focusOffset,
        }) as Draft.SelectionState;

        // Draft API helper set the selection into a new editorState
        const newEditorState = Draft.EditorState.forceSelection(editorState, newSelection);

        // update the editorState 
        this.editorStateChanged(newEditorState);
    }

    render() {
        return <div>
            <div className="editor">
                <Draft.Editor
                    editorState={this.state.editorState}
                    onChange={this.editorStateChanged}
                />
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>offset:</td>
                        <td>{this.selectionState.offset}</td>
                    </tr>
                    <tr>
                        <td>Focus Offset:</td>
                        <td>{this.selectionState.focusOffset}</td>
                    </tr>
                    <tr>
                        <td>is backwards:</td>
                        <td>{this.selectionState.isBackwards ? 'true' : 'false'}</td>
                    </tr>
                </tbody>
            </table>
            {/*<div>offset: {this.selectionState.offset}</div>
            <div>Focus Offset: {this.selectionState.focusOffset}</div>
            <div>is backwards: {this.selectionState.isBackwards ? 'true' : 'false'}</div>*/}
            <SetSelectionForm callback={this.setSelection} />
        </div >;
    }
}

interface SetSelectionprops {
    callback: (offset: number, focusOffset: number) => void;
}
interface SetSelectionState {
    offset: number;
    focusOffset: number;
}

class SetSelectionForm extends React.Component<SetSelectionprops, SetSelectionState> {
    state = {
        offset: 0,
        focusOffset: 0
    };
    render() {
        return <div className="form">
            <div>
                offset <input
                    type="number"
                    value={this.state.offset}
                    onChange={e => this.setState({ offset: Number.parseInt(e.target.value) })}
                />
            </div>
            <div>
                end offset <input
                    type="number"
                    value={this.state.focusOffset}
                    onChange={e => this.setState({ focusOffset: Number.parseInt(e.target.value) })}
                />
            </div>
            <button onClick={() => this.props.callback(this.state.offset, this.state.focusOffset)} >
                set selection state
                </button>
        </div>;
    }
}
