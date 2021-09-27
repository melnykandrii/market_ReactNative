import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../../infrastructure/theme";
import { Text } from "../text/text.component.js";

const InputContainer = styled.View`
  width: 100%;
`;

const ErrorContainer = styled.View`
  margin-vertical: ${(props) => props.theme.sizepx[0]};
`;

const StyledInput = styled.TextInput`
  padding-horizontal: 2px;
  padding-vertical: 5px;
  border-bottom-color: ${(props) =>
    props.borderColor || theme.colors.ui.primary};
  border-bottom-width: 1px;
  color: ${(props) => props.mainColor || theme.colors.ui.primary};
`;

const StyledLabel = styled(Text)`
  color: ${(props) => props.textColor || theme.colors.ui.primary};
  font-family: ${(props) => props.theme.fonts.title};
  font-weight: ${theme.fontWeights.regular};
  margin-top: 10px;
`;

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

export const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <InputContainer>
      <StyledLabel {...props}>{props.label}</StyledLabel>
      <StyledInput
        {...props}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        onSubmitEditing={props.submit}
        keyboardType={props.keyboard}
        returnKeyType={props.returnKey}
        ref={props.inputRef}
        blurOnSubmit={props.blur}
        selectionColor={theme.colors.bg.grey}
        cursorColor={theme.colors.ui.primary}
        placeholder={props.placeholder}
        placeholderTextColor={props.phtextColor || theme.colors.bg.grey}
      />
      {!inputState.isValid && inputState.touched && (
        <ErrorContainer>
          <Text variant="error">{props.errorText}</Text>
        </ErrorContainer>
      )}
    </InputContainer>
  );
};
