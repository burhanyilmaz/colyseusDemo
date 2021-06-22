import { type, Context, DefinitionType } from '@colyseus/schema';

function createContext() {
  const context = new Context();
  return function (definition: DefinitionType) {
    return type(definition, context);
  };
}

export default createContext;
