import { IGenericErrorMessage } from '../interfaces/error';
import { Prisma } from '@prisma/client';

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  let message =""
  let errors: IGenericErrorMessage[] = [];

  const statusCode = 400;

  if(error.code === 'p2025'){
    message = (error.meta?.cause as string) ||   "record not found " 
    errors =[ 
      {
        path:"",
        message 
      }
    
  ]
}

  else if (error.message === 'P2003'){
    if(error.message.includes("delete()` invocation")){
      message = "delete Failed"
      errors = [
        {
          path:"",
          message
        }
      ]
    }
  }
  


  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export default handleClientError
