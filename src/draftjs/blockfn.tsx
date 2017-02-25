import * as React from 'react';
import * as Draft from 'draft-js';

const renderimg = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const {src} = entity.getData();
    const backgroundImageUrl = `url(${src})`;
    return <div style={{ backgroundImage: backgroundImageUrl }} className="draftImg" />;
};

export class Blockfn extends React.Component<null, { editorState: Draft.EditorState, imgUrl: string }> {
    state = {
        editorState: Draft.EditorState.createEmpty(),
        imgUrl: ''
    };

    editorStateChanged = (newEditorState: Draft.EditorState) => this.setState({ editorState: newEditorState });

    insertImage = () => {
        let {editorState} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'img',
            'IMMUTABLE',
            { src: this.state.imgUrl }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = Draft.EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity }
        );
        const newEditorStateWithBlock = Draft.AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
        this.editorStateChanged(newEditorStateWithBlock);
        this.setState({ imgUrl: '' });
    }

    emojiBlockFn = (contentBlock: Draft.ContentBlock) => {
        if (contentBlock.getType() === 'atomic') {
            return {
                component: renderimg,
                editable: false,
            };
        }
        return null;
    }

    render() {
        return <div>
            <div className="editor">
                <Draft.Editor
                    editorState={this.state.editorState}
                    onChange={this.editorStateChanged}
                    blockRendererFn={this.emojiBlockFn}
                />
            </div>
            <input value={this.state.imgUrl} onChange={e => this.setState({ imgUrl: e.target.value })} />
            <img src={this.state.imgUrl} style={{maxWidth: 200, maxHeight: 200}} />
            <button onClick={this.insertImage} >insert image</button>
          
        </div>;
    }
}
