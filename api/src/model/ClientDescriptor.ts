import ErrorResponse from '../error/ErrorResponse';

export interface ClientDescriptorModel {
  id: number;
  descriptor: Buffer;
  image: Buffer;
  creation_time: Date;
}

export class ClientDescriptor {
  public static validateCreate(clientDescriptor: any) {
    if (
      typeof clientDescriptor.descriptor !== 'string' ||
      clientDescriptor.descriptor.length <= 0
    )
      throw new ErrorResponse('Invalid descriptor', 400);
    if (
      typeof clientDescriptor.image !== 'string' ||
      clientDescriptor.image.length <= 0
    )
      throw new ErrorResponse('Invalid image', 400);
    return {
      descriptor: Buffer.from(clientDescriptor.descriptor),
      image: Buffer.from(clientDescriptor.image.toString()),
    };
  }

  public static sanitizeForJson(clientDescriptor: ClientDescriptorModel) {
    return {
      ...clientDescriptor,
      descriptor: clientDescriptor.descriptor.toString(),
      image: clientDescriptor.image.toString(),
    };
  }
}
