import { useReducer, useCallback } from 'react';

interface State {
  inputs: any;
  isValid: boolean;
}

type Action =
  | { type: 'SET_INPUT'; inputId: string; value: string; isValid: boolean }
  | { type: 'SET_DATA'; inputData: any; isFormValid: boolean };

const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_INPUT':
      let isFormValid = true;

      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }

        if (inputId === action.inputId) {
          isFormValid = isFormValid && action.isValid;
        } else {
          isFormValid = isFormValid && state.inputs[inputId].isValid;
        }
      }

      return {
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: isFormValid,
      };

    case 'SET_DATA':
      return {
        inputs: action.inputData,
        isValid: action.isFormValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs: any) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: false,
  });

  const setFormInput = useCallback((inputId, value, isValid): void => {
    dispatch({
      type: 'SET_INPUT',
      inputId,
      value,
      isValid,
    });
  }, []);

  const setFormData = useCallback((inputData, isFormValid): void => {
    dispatch({
      type: 'SET_DATA',
      inputData,
      isFormValid,
    });
  }, []);

  return { formState, setFormInput, setFormData };
};
