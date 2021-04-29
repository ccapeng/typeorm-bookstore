import { Category } from '@entity/category';

export interface ICategory {
  name: string
}

// CREATE
export const createCategory = async (category: ICategory) => {
  try {
    const _category = new Category();
    _category['name'] = category['name'];
    console.log("name", _category['name']);
    return await _category.save();
  } catch (e) {
    console.log("error message:", e.message);
    return Promise.reject(e.message);
  }
}

// GET
export const getCategory = async (categoryId?: number) => {
  try {
    if (categoryId) {
      return await Category.findOne({
        where: { id: categoryId },
      });
    } else {        // get all
      return await Category.find();
    }
  } catch (e) {
    console.error(e);
  }
}

// UPDATE
export const updateCategory = async (category: { id: number } & ICategory) => {
  try {
    const _category = await Category.findOne({ where: { id: category['id'] } });
    if (!_category) {
      return { message: "Category is not found." };
    }

    if (category['name']) {
      _category['name'] = category['name'];
    }

    return await _category.save();

  } catch (e) {
    console.error(e);
  }
}

// DELETE
export const deleteCategory = async (categoryId: number) => {
  try {
    const _category = await Category.findOne({ where: { id: categoryId } });
    if (!_category) {
      return { message: "Category is not found." };
    }
    return await _category.remove();
  } catch (e) {
    console.error(e);
  }
}