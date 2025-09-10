// useSwiperInteractions.js
export function useSwiperInteractions(emit) {
  const handleInteractionStart = () => {
    emit("interactionStart");
  };

  const handleInteractionEnd = () => {
    emit("interactionEnd");
  };

  return {
    handleInteractionStart,
    handleInteractionEnd
  };
}