import { useCallback, useState } from 'react';

/**
 * Custom hook for managing focus state across form inputs
 *
 * @returns {object} - The focus state and helper functions
 * @returns {string | null} focused - The currently focused field ID
 * @returns {function} setFocused - Set the focused field ID
 * @returns {function} clearFocus - Clear the focused field ID
 * @returns {function} isFocused - Check if a field is focused
 *
 * @example
 * ```tsx
 * const { focused, setFocused, clearFocus, isFocused } = useFocusState();
 *
 * <Input
 *   onFocus={() => setFocused('email')}
 *   onBlur={clearFocus}
 *   focused={isFocused('email')}
 * />
 * ```
 */
export type FocusState = string | null;

export function useFocusState() {
  const [focused, setFocusedState] = useState<FocusState>(null);

  const setFocused = useCallback((fieldId: string) => {
    setFocusedState(fieldId);
  }, []);

  const clearFocus = useCallback(() => {
    setFocusedState(null);
  }, []);

  const isFocused = useCallback((fieldId: string) => focused === fieldId, [focused]);

  return {
    focused,
    setFocused,
    clearFocus,
    isFocused,
  };
}
