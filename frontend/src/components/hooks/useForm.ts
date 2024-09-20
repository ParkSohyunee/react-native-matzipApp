import {useEffect, useState} from 'react';

interface UseFormProps<T> {
  initialState: T;
  validate: (inputs: T) => Record<keyof T, string>;
}

export default function useForm<T>({initialState, validate}: UseFormProps<T>) {
  const [inputs, setInputs] = useState(initialState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeInputs = (name: keyof T, text: string) => {
    setInputs(prev => ({
      ...prev,
      [name]: text,
    }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  const getTextInputProps = (name: keyof T) => {
    const input = inputs[name];
    const onChangeText = (text: string) => handleChangeInputs(name, text);
    const onBlur = () => {
      handleBlur(name);
    };

    return {input, onChangeText, onBlur};
  };

  useEffect(() => {
    const newErrors = validate(inputs);
    setErrors(newErrors);
  }, [inputs, validate]);

  return {inputs, touched, errors, getTextInputProps};
}
