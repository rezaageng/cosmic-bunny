declare global {
  interface Window {
    snap: {
      pay: (
        transactionToken: string,
        callbacks: {
          onSuccess: () => void | Promise<void>;
          onError: () => void | Promise<void>;
          onClose: () => void | Promise<void>;
        },
      ) => void;
    };
  }
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      MIDTRANS_URL: string;
      NEXT_PUBLIC_MIDTRANS_CLIENT_KEY: string;
      MIDTRANS_SERVER_KEY: string;
    }
  }
}

export {};
