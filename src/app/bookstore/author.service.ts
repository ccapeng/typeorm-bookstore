import { Author } from '@entity/author';

export interface IAuthor {
  lastName: string,
  firstName: string
}

// CREATE
export const createAuthor = async (author: IAuthor) => {
  try {
    const _author = new Author();
    _author['lastName'] = author['lastName'];
    _author['firstName'] = author['firstName'];
    return await _author.save();
  } catch (e) {
    console.error(e);
  }
}

// GET
export const getAuthor = async (authorId?: number) => {
  try {
    if (authorId) {
      return await Author.findOne({
        where: { id: authorId },
      });
    } else {        // get all
      return await Author.find();
    }
  } catch (e) {
    console.error(e);
  }
}

// UPDATE
export const updateAuthor = async (author: { id: number } & IAuthor) => {
  try {
    const _author = await Author.findOne({ where: { id: author['id'] } });
    if (!_author) {
      return { message: "Author is not found." };
    }

    if (author['lastName']) {
      _author['lastName'] = author['lastName'];
    }
    if (author['firstName']) {
      _author['firstName'] = author['firstName'];
    }
    return await _author.save();

  } catch (e) {
    console.error(e);
  }
}

// DELETE
export const deleteAuthor = async (authorId: number) => {
  try {
    const _author = await Author.findOne({ where: { id: authorId } });
    if (!_author) {
      return { message: "Author is not found." };
    }
    return await _author.remove();
  } catch (e) {
    console.error(e);
  }
}