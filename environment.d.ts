declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BRICKSET_API_KEY: string;
      BRICKSET_USERNAME: string;
      BRICKSET_PASSWORD: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
