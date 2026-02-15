import { useCallback, useState } from 'react';

export type FocusState = string | null;

export function useFocusState() {
  const [focusedState, setFocusedState] = useState<FocusState>(null);

  const setFocused = useCallback((fieldId: string) => {
    setFocusedState(fieldId);
  }, []);

  const clearFocus = useCallback(() => {
    setFocusedState(null);
  }, []);

  const isFocused = useCallback((fieldId: string) => focusedState === fieldId, [focusedState]);

  return {
    focusedState,
    setFocused,
    clearFocus,
    isFocused,
  };
}
