import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Path, 
  Post, 
  Put, 
  Route, 
  Tags } from 'tsoa';
import { 
  ICategory, 
  createCategory, 
  getCategory, 
  updateCategory, 
  deleteCategory } from './category.service';

@Tags('Category')
@Route('/api/categories')
export class CategoryController extends Controller {

  // GET ALL
  @Get('')
  public async getAll() {
    //return getCategory();
    let objs = await getCategory();
    if (Array.isArray(objs)) {
      let total = objs.length;
      // react-admin
      this.setHeader('Access-Control-Expose-Headers', 'X-Total-Count')
      this.setHeader('X-Total-Count', total+"")
    }
    return objs;
  }

  // CREATE
  @Post('')
  public async create(@Body() category: ICategory) {
    try {
      let obj = await createCategory(category);
      if (typeof(obj) === "undefined") {
        this.setStatus(201);
      }
      return obj;
    } catch (error) {
      this.setStatus(500);
      return {
        message: error
      }
    }
  }

  //GET By ID
  @Get('/{categoryId}')
  public async getWithId(@Path('categoryId') categoryId: number) {
    console.log("categoryId:", categoryId);
    let obj = await getCategory(categoryId);
    if (typeof(obj) === "undefined") {
      this.setStatus(404);
    }
    return obj;
  }

  // UPDATE
  @Put('/{categoryId}/')
  public async update(@Path('categoryId') categoryId: string, @Body() body: { name: string}) {
    console.log("update:", categoryId, body);
    return updateCategory({ id: Number(categoryId), name: body.name });
  }

  // DELETE
  @Delete('/{categoryId}')
  public async delete(@Path('categoryId') categoryId: number) {
    let obj = await deleteCategory(categoryId);
    if (typeof(obj) === "undefined") {
      this.setStatus(204);
    }
    return obj;
  }

}