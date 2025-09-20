export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("model-viewer"),
        },
      },
    }),
    tailwindcss(),
  ],
  base: "/", // ✅ ¡Cambiado a la raíz!
});
