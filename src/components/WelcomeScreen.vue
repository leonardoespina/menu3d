<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useEmpresa } from "../composables/useEmpresa";

const router = useRouter();
const { empresa, getLogoUrl } = useEmpresa();
const isLoading = ref(true);
const hasError = ref(false);
const errorMessage = ref("");

// Datos por defecto para cuando no hay información de la empresa
const empresaDefault = {
  nombre: "Mi Empresa",
  rif: "J-123456789",
  direccion: "Av. Principal, Centro Comercial XYZ, Local #5",
  telefono: "+58 412-1234567",
  imagen: "default-logo.png",
};

// Función para verificar si los datos de empresa son válidos
const esEmpresaValida = (emp) => {
  return (
    emp &&
    emp.nombre &&
    emp.nombre !== empresaDefault.nombre &&
    Object.keys(emp).length > 0
  );
};

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    // Esperar un momento para permitir que los datos se carguen
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verificar si ya tenemos datos válidos de empresa
    if (empresa.value && esEmpresaValida(empresa.value)) {
      hasError.value = false;
    } else {
      hasError.value = true;
      errorMessage.value = "Usando datos de demostración";
    }
  } catch (error) {
    console.error("Error verificando datos de la empresa:", error);
    hasError.value = true;
    errorMessage.value = "Error cargando datos, usando información por defecto";
  } finally {
    isLoading.value = false;
  }
});

// Watch para cambios en los datos de empresa
watch(
  empresa,
  (newEmpresa) => {
    if (newEmpresa && esEmpresaValida(newEmpresa)) {
      hasError.value = false;
    }
  },
  { immediate: true }
);

const enterMenu = () => {
  router.push("/menu");
};

const enterLogin = () => {
  router.push("/login");
};

// Función para recargar la página
const reloadPage = () => {
  window.location.reload();
};

// Función para manejar errores de imagen
const handleImageError = (event) => {
  console.log("Error cargando imagen del logo");
  // Podrías establecer una imagen por defecto aquí si lo deseas
  // event.target.src = '/images/default-logo.png';
};

// Función para obtener la empresa actual o la por defecto
const empresaActual = () => {
  // Si tenemos empresa válida, usarla
  if (empresa.value && esEmpresaValida(empresa.value)) {
    return empresa.value;
  }
  // Si no, usar datos por defecto
  return empresaDefault;
};

// Función para obtener la URL del logo
const obtenerLogo = () => {
  const emp = empresaActual();

  // Si getLogoUrl existe y es una función, usarla
  if (typeof getLogoUrl === "function") {
    return getLogoUrl(emp.imagen);
  }

  // Si no, devolver la imagen directamente o una por defecto
  return emp.imagen || "/images/default-logo.png";
};
</script>

<template>
  <div id="welcome-screen">
    <!-- Estado de carga -->
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>Cargando información...</p>
    </div>

    <!-- Contenido principal -->
    <div v-else class="login-container">
      <!-- Solo mostrar advertencia si realmente estamos usando datos por defecto -->
      <div
        v-if="hasError && (!empresa || !esEmpresaValida(empresa))"
        class="data-warning"
      >
        <span>⚠️ Usando datos de demostración</span>
      </div>

      <div class="titulo">{{ empresaActual().nombre }}</div>
      <div class="welcome-footer">Rif: {{ empresaActual().rif }}</div>
      <div class="subtitulo">Bienvenidos</div>

      <div class="imagen-circular">
        <img
          :src="obtenerLogo()"
          :alt="'Logo de ' + empresaActual().nombre"
          @error="handleImageError"
        />
      </div>

      <div class="mensaje">Gracias por tu visita</div>

      <a href="#" class="btn" @click.prevent="enterMenu">Entrar</a>

      <div class="registro">
        <router-link to="/register">Regístrate ahora</router-link>
      </div>

      <div class="registro">
        Login <a href="#" @click.prevent="enterLogin">Accede Ahora</a>
      </div>

      <footer class="welcome-footer">
        <p>{{ empresaActual().direccion }}</p>
        <p>Teléfono: {{ empresaActual().telefono }}</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
#welcome-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/3.jpg") no-repeat center center;
  background-size: cover;
  z-index: 2000;
}

#welcome-screen::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
}

.login-container {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 520px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  animation: fadeIn 0.5s ease-out;
}

.data-warning {
  background: rgba(255, 193, 7, 0.2);
  border: 1px solid rgba(255, 193, 7, 0.5);
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.8rem;
  color: #ffc107;
}

.titulo {
  font-family: "Dancing Script", cursive;
  font-size: 3.5rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  margin-bottom: 10px;
  text-align: center;
}

.subtitulo {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.95);
  text-align: center;
  font-weight: 500;
}

.imagen-circular {
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.imagen-circular:hover {
  transform: scale(1.05);
}

.imagen-circular img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.mensaje {
  margin: 15px 0;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-weight: 500;
}

.btn {
  display: block;
  margin: 20px auto;
  width: fit-content;
  background: #22c55e;
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  background: #16a34a;
}

.registro {
  margin-top: 15px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
}

.registro a {
  color: #93c5fd;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.registro a:hover {
  color: #bfdbfe;
  text-decoration: underline;
}

.welcome-footer {
  margin-top: 25px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.85rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}

.welcome-footer p {
  margin: 5px 0;
}

/* Estados de carga */
.loading-container {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 40px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .login-container {
    padding: 20px;
    margin: 10px;
  }

  .titulo {
    font-size: 2.5rem;
  }

  .imagen-circular {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 480px) {
  .titulo {
    font-size: 2rem;
  }

  .subtitulo {
    font-size: 1.2rem;
  }

  .btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style>
