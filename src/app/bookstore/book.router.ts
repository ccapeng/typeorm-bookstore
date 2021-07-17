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
  IBook, 
  createBook, 
  getBook, 
  updateBook, 
  deleteBook } from './book.service';

@Tags('Book')
@Route('/api/books')
export class BookController extends Controller {

  // GET ALL
  @Get('')
  public async getAll() {
    //return getBook();
    let objs = await getBook();
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
  public async create(@Body() book: IBook) {
    return createBook(book)
  }

  //GET By ID
  @Get('/{bookId}')
  public async getWithId(@Path('bookId') bookId: number) {
    return getBook(bookId)
  }

  // UPDATE
  @Put('/{bookId}/')
  public async update(
    @Path('bookId') bookId: string, 
    @Body() body: { 
        title: string,
        categoryId: string,
        publisherId: string,
        authorId: string
      }
  ) {
    return updateBook({ 
      id: Number(bookId), 
      title: body.title,
      categoryId: Number(body.categoryId), 
      publisherId: Number(body.publisherId), 
      authorId: Number(body.authorId)
    });
  }

  // DELETE
  @Delete('/{bookId}')
  public async delete(@Path('bookId') bookId: number) {
    return deleteBook(bookId)
  }

}