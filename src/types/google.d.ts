interface Window {
  google: {
    accounts: {
      id: {
        initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void;
        renderButton: (element: HTMLElement | null, options: { theme: string; size: string; text?: string }) => void;
        prompt: () => void;
      };
    };
  };
} 