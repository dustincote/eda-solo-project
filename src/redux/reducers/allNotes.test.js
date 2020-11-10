import allNotes from './allNotes.reducer';
const notes ={ type:'SET_ALL_NOTES', payload:[{note:'test note'}, {note:'test note'}]}

describe('allNotesReducer', () =>{

    test('should set default state',() => {
        const newState = allNotes(undefined, {});
        expect(newState).not.toBeUndefined();
    });//end set default state
    test('should set notes into an array', ()=> {
        const newState= allNotes(undefined, notes);
        expect(newState).toHaveLength(2);
    })
});//end allNotesReducer test suit