import concurrently from 'concurrently';

concurrently([
   {
      name: 'server',
      command: 'bun run build',
      cwd: 'packages/server',
      prefixColor: 'cyan',
   },
   {
      name: 'client',
      command: 'bun run build',
      cwd: 'packages/client',
      prefixColor: 'green',
   },
]);
