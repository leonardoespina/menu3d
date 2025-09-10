// useFileUpload.js
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

export const useFileUpload = () => {
  const uploadProgress = ref(0);
  const isUploading = ref(false);
  const uploadError = ref(null);
  const uploadSuccess = ref(false);
  const authStore = useAuthStore();

  const resetUploadState = () => {
    uploadProgress.value = 0;
    isUploading.value = false;
    uploadError.value = null;
    uploadSuccess.value = false;
  };

  const uploadFile = (url, formData, isEdit = false) => {
    return new Promise((resolve, reject) => {
      resetUploadState();
      isUploading.value = true;

      try {
        if (!url || typeof url !== "string") {
          throw new Error("URL no proporcionada o inválida");
        }
        if (url.includes("undefined") || url.includes("null")) {
          throw new Error(`URL contiene valores no definidos: ${url}`);
        }

        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            uploadProgress.value = Math.round(
              (event.loaded / event.total) * 100
            );
          }
        });

        xhr.addEventListener("load", () => {
          isUploading.value = false;
          if (xhr.status >= 200 && xhr.status < 300) {
            uploadSuccess.value = true;
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch (e) {
              resolve(xhr.responseText);
            }
          } else {
            uploadError.value = `Error ${xhr.status}: ${
              xhr.statusText || "Error desconocido"
            }`;
            reject(new Error(uploadError.value));
          }
        });

        xhr.addEventListener("error", () => {
          isUploading.value = false;
          uploadError.value = "Error de red al subir el archivo";
          reject(new Error(uploadError.value));
        });

        xhr.addEventListener("abort", () => {
          isUploading.value = false;
          uploadError.value = "Subida cancelada";
          reject(new Error(uploadError.value));
        });

        const API_BASE_URL =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
        const cleanUrl = url.startsWith("/") ? url : `/${url}`;
        const cleanApiBase = API_BASE_URL.endsWith("/")
          ? API_BASE_URL.slice(0, -1)
          : API_BASE_URL;
        const fullUrl = `${cleanApiBase}${cleanUrl}`;

        new URL(fullUrl); // Validar URL

        xhr.open(isEdit ? "PUT" : "POST", fullUrl);
        xhr.setRequestHeader("Authorization", `Bearer ${authStore.token}`);
        xhr.send(formData);
      } catch (error) {
        isUploading.value = false;
        uploadError.value = error.message;
        reject(error);
      }
    });
  };

  return {
    uploadProgress,
    isUploading,
    uploadError,
    uploadSuccess,
    uploadFile,
    resetUploadState,
  };
};
