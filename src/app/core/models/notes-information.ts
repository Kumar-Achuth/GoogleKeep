import { Label } from "./label-list";
import { checkList } from "./check-list";

export interface NotesInformation {
    collaborators: Array<object>,
    color: string,
    createdDate: Date,
    description: string,
    id: string,
    imageUrl:string,
    isArchived: boolean,
    isDeleted: boolean,
    isPined: boolean,
    label: Array<Label>,
    labelIdList:  Array<object>,
    linkUrl: string,
    modifiedDate: Date,
    noteCheckLists: Array<checkList>,
    noteLabels: Array<Label>,
    questionAndAnswerNotes: Array<object>,
    reminder: [Date],
    title: string,
    userId: string,
}

