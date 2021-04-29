import { Publisher } from '@entity/publisher';

export interface IPublisher {
  name: string
}

// CREATE
export const createPublisher = async (publisher: IPublisher) => {
  try {
    const _publisher = new Publisher();
    _publisher['name'] = publisher['name'];
    return await _publisher.save();
  } catch (e) {
    console.error(e);
  }
}

// GET
export const getPublisher = async (publisherId?: number) => {
  try {
    if (publisherId) {
      return await Publisher.findOne({
        where: { id: publisherId },
      });
    } else {        // get all
      return await Publisher.find();
    }
  } catch (e) {
    console.error(e);
  }
}

// UPDATE
export const updatePublisher = async (publisher: { id: number } & IPublisher) => {
  try {
    const _publisher = await Publisher.findOne({ where: { id: publisher['id'] } });
    if (!_publisher) {
      return { message: "publisher is not found." };
    }

    if (publisher['name']) {
      _publisher['name'] = publisher['name'];
    }

    return await _publisher.save();

  } catch (e) {
    console.error(e);
  }
}

// DELETE
export const deletePublisher = async (publisherId: number) => {
  try {
    const _publisher = await Publisher.findOne({ where: { id: publisherId } });
    if (!_publisher) {
      return { message: "Publisher is not found." };
    }
    return await _publisher.remove();
  } catch (e) {
    console.error(e);
  }
}