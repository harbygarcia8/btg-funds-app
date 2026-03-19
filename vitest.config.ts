import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    {
      name: 'angular-vitest-plugin',
      transform(code, id) {
        if (id.endsWith('.ts') && !id.endsWith('.spec.ts')) {
          // Simplest transformation for Angular components in tests
          // Note: In a real project, we'd use @analogjs/vitest-angular or similar
          return code;
        }
      },
    },
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup-vitest.ts'],
    include: ['src/**/*.{spec,test}.ts'],
  },
});
