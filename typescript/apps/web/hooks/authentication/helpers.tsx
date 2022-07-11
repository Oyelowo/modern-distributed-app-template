export type GraphqlErrorResponse = {
  response: {
    data: null;
    errors: Array<{
      message: string;
      locations: Array<{ line: number; column: number }>;
      extenstions: {
        code: number;
        details: string;
      };
    }>;
  };
};

export class GraphqlIoError {
  constructor(private errorResponse: GraphqlErrorResponse | null) {
    this.errorResponse = errorResponse;
  }

  getTitle = () => {
    const firstError = this.errorResponse?.response.errors?.[0];
    return firstError?.extenstions?.details ?? firstError?.message;
  };

  getDetails = () => {
    const firstError = this.errorResponse?.response.errors?.[0];
    return firstError?.extenstions?.details ?? firstError?.message;
  };
}

type UserData = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  socialMedia: string;
  age: number;
};

type ServerTypeProps<TData, TError> = {
  status: 'loading' | 'error' | 'success' | 'idle';
  data: TData;
  error: TError;
};

export function mapToServerData<TData, TError>({
  status,
  data,
  error,
}: ServerTypeProps<TData, TError>): ServerData<TData, TError> {
  switch (status) {
    case 'loading':
      return {
        status: 'loading',
      };
    case 'error':
      return {
        status: 'error',
        error,
      };
    case 'success':
      return {
        status: 'success',
        data,
      };

    default:
      return {
        status: 'idle',
      };
  }
}

type ServerData<TData, TError> =
  | {
      status: 'error';
      error: TError;
    }
  | {
      status: 'loading';
    }
  | {
      status: 'idle';
    }
  | {
      status: 'success';
      data: TData;
    };
