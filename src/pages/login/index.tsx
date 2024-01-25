import AuthFormItem from "@/components/auth-form-item";

import * as S from "@/pages/login/login.styled";
import { auth } from "@/utils/firebase";
import { firebaseAuthError } from "@/utils/functions";
import { Button, TextField } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    authenticationCode: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || inputs.email === "" || inputs.password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code);
        window.alert(firebaseAuthError(e.code));
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <S.Wrapper onSubmit={handleSubmitLoginForm}>
      <AuthFormItem title={"이메일"}>
        <TextField
          name="email"
          variant="outlined"
          value={inputs.email}
          onChange={handleInputChange}
        />
      </AuthFormItem>
      <AuthFormItem title={"비밀번호"}>
        <TextField
          type="password"
          name="password"
          variant="outlined"
          value={inputs.password}
          onChange={handleInputChange}
        />
      </AuthFormItem>

      <Button
        disabled={inputs.email && inputs.password ? false : true}
        type="submit"
        variant="contained"
      >
        로그인하기
      </Button>
    </S.Wrapper>
  );
}
