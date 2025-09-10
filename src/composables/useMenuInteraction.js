import { ref, watch } from "vue";

export function useMenuInteraction(menuStore, viewer) {
  const cardInfo = ref(null);

  const triggerSlideUp = () => {
    if (cardInfo.value?.classList) {
      cardInfo.value.classList.add("slide-up");
      setTimeout(() => {
        if (cardInfo.value?.classList) {
          cardInfo.value.classList.remove("slide-up");
        }
      }, 500);
    }
  };

  const handleFilterInteractionStart = () => {
    if (viewer?.value) {
      viewer.value.cameraControls = false;
    }
  };

  const handleFilterInteractionEnd = () => {
    if (viewer?.value) {
      viewer.value.cameraControls = true;
    }
  };

  // Configurar el watch solo si menuStore existe y tiene currentIndex
  if (menuStore && "currentIndex" in menuStore) {
    watch(
      () => menuStore.currentIndex,
      () => {
        triggerSlideUp();
        if (menuStore.setLoading) {
          menuStore.setLoading(true);
        }

        setTimeout(() => {
          if (menuStore.setLoading) {
            menuStore.setLoading(false);
          }
        }, 800);
      }
    );
  }

  return {
    cardInfo,
    triggerSlideUp,
    handleFilterInteractionStart,
    handleFilterInteractionEnd,
  };
}
