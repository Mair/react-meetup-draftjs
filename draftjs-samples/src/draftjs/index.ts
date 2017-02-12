import {addMDHOC} from './addMDHOC';
import {Simple} from './a_simple';
import {RichUtilsSample} from './b_rich-utils';
import {Blockfn} from './c_blockfn';
import {ContentStateView} from './contentstate-view';
import {SelectionStateView} from './selectionState-view';
import {CreateContentState} from './createContentState';

export const SimpleWithDoc = addMDHOC(Simple,  '/placeholder.md');
export const RichUtilsSampleWithDoc = addMDHOC(RichUtilsSample, '/placeholder.md');
export const BlockfnWithDoc = addMDHOC(Blockfn, '/placeholder.md');
export const ContentStateViewWithDoc = addMDHOC(ContentStateView, '/contentState.md');
export const SelectionStateViewWithDoc = addMDHOC(SelectionStateView, '/selectionState-view.md');
export const CreateEditorStateWithDoc = addMDHOC(CreateContentState,  '/createContentState.md');
