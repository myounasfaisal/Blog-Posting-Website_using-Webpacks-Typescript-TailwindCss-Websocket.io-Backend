import { appendBlogDocs } from "../../../functions/appendBlogDocs";
import { getBlogId } from "../../../utils/getBlogId";
import { appendDetails } from "./appendDetails";
import { getBlogAndAuthorDetail } from "./request/getBlogAndAuthorDetail";

export const postReqForBlogAndAuthor = async () => {
  const id = getBlogId();
  const data = await getBlogAndAuthorDetail(id);
  console.log("2nd : ", data);
  appendDetails(data);

  return data;
};
