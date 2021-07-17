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
  IAuthor, 
  createAuthor, 
  getAuthor, 
  updateAuthor, 
  deleteAuthor } from './author.service';

@Tags('Author')
@Route('/api/authors')
export class AuthorController extends Controller {

  // GET ALL
  @Get('')
  public async getAll() {
    //return getAuthor()
    let objs = await getAuthor();
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
  public async create(@Body() author: IAuthor) {
    return createAuthor(author)
  }

  //GET By ID
  @Get('/{authorId}')
  public async getWithId(@Path('authorId') authorId: number) {
    return getAuthor(authorId)
  }

  // UPDATE
  @Put('/{authorId}/')
  public async update(
    @Path('authorId') authorId: string, 
    @Body() body: { lastName: string, firstName: string}
  ) {
    return updateAuthor({ 
      id: Number(authorId), 
      lastName: body.lastName,
      firstName: body.firstName,
    });
  }

  // DELETE
  @Delete('/{authorId}')
  public async delete(@Path('authorId') authorId: number) {
    return deleteAuthor(authorId)
  }

}