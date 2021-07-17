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
  IPublisher, 
  createPublisher, 
  getPublisher, 
  updatePublisher, 
  deletePublisher } from './publisher.service';

@Tags('Publisher')
@Route('/api/publishers')
export class PublisherController extends Controller {

  // GET ALL
  @Get('')
  public async getAll() {
    //return getPublisher()
    let objs = await getPublisher();
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
  public async create(@Body() publisher: IPublisher) {
    let obj = createPublisher(publisher);
    if (obj !== null) {
      this.setStatus(201);
    }
    return obj;
  }

  //GET By ID
  @Get('/{publisherId}')
  public async getWithId(@Path('publisherId') publisherId: number) {
    return getPublisher(publisherId)
  }

  // UPDATE
  @Put('/{publisherId}/')
  public async update(@Path('publisherId') publisherId: string, @Body() body: { name: string}) {
    return updatePublisher({ id: Number(publisherId), name: body.name });
  }

  // DELETE
  @Delete('/{publisherId}')
  public async delete(@Path('publisherId') publisherId: number) {
    //return deletePublisher(publisherId)
    let obj = deletePublisher(publisherId)
    if (obj !== null) {
      this.setStatus(204);
    }
    return obj;
  }

}