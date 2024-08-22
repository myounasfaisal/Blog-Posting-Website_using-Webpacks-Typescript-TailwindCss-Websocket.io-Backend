import { appendComment } from "./appendComment";

export const appendCommentsToBlog = async (Data: Array<object>) => {
  Data.forEach((commentData: object) => {
    appendComment(commentData);
  });
};
