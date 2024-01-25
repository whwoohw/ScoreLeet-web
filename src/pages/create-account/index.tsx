import * as S from "@/pages/create-account/create-account.styled";
import { auth, db } from "@/utils/firebase";
import { emailRegex, passwordRegex } from "@/utils/regex";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputAdornment, TextField } from "@mui/material";
import AuthFormItem from "@/components/auth-form-item";
// import emailjs from "@emailjs/browser";
import { createRandomCode } from "@/utils/functions";

// const {
//   VITE_EMAILJS_SERVICE_ID,
//   VITE_EMAILJS_TEMPLATE_ID,
//   VITE_EMAILJS_PUBLIC_KEY,
// } = import.meta.env;

const verificationCode = createRandomCode();

export default function CreateAccount() {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const [verificationValues, setVerificationValues] = useState({
    verificationCode: "",
    isVerificationCodeSent: false,
    isVerified: false,
  });

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "verificationCode") {
      setVerificationValues({ ...verificationValues, verificationCode: value });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }

    if (name === "email") {
      setErrors({
        ...errors,
        email: value ? !emailRegex.test(value) : false,
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        password: value ? !passwordRegex.test(value) : false,
      });
    } else if (name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPassword: formValues.password !== value,
      });
    }
  };

  const handleSubmitEmailAuthentication = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // const formData = { email: formValues.email, code: verificationCode };

    // // Create a form element
    // const form = document.createElement("form");

    // // Set form attributes if needed
    // form.method = "post"; // or 'get'
    // form.action = "/your-submit-endpoint"; // replace with your form submission endpoint

    // // Loop through the object properties and create input elements
    // for (const key in formData) {
    //   if (formData.hasOwnProperty(key)) {
    //     const input = document.createElement("input");
    //     input.type = "hidden"; // use hidden inputs to store the data
    //     input.name = key;
    //     input.value = formData[key];

    //     // Append the input to the form
    //     form.appendChild(input);
    //   }
    // }

    window.alert("인증번호가 발송되었습니다");

    // // 여기서 인증번호 발송하기
    // emailjs
    //   .sendForm(
    //     VITE_EMAILJS_SERVICE_ID,
    //     VITE_EMAILJS_TEMPLATE_ID,
    //     form,
    //     VITE_EMAILJS_PUBLIC_KEY
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );

    setVerificationValues({
      ...verificationValues,
      isVerificationCodeSent: true,
    });
  };

  const handleSubmitverificationCode = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (verificationCode === verificationValues.verificationCode) {
      window.alert("인증이 완료되었습니다.");
      setVerificationValues({ ...verificationValues, isVerified: true });
    } else {
      window.alert("잘못된 인증번호입니다.");
    }
  };

  const handleSubmitCreateAccountForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (isLoading || formValues.email === "" || formValues.password === "")
      return;
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );

      await setDoc(doc(db, "users", credentials.user.uid), {
        uid: credentials.user.uid,
        email: credentials.user.email,
        createdAt: Timestamp.now(),
      });

      await setDoc(doc(db, "userInfos", credentials.user.uid), {});

      window.alert("회원가입이 완료되었습니다.");

      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        window.alert(`${e.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(verificationCode);

  return (
    <S.Wrapper onSubmit={handleSubmitCreateAccountForm}>
      <AuthFormItem
        title={"이메일 인증"}
        subtitle="보내기 버튼을 누른 후, 해당 이메일로 전송된 인증코드를 입력해주세요."
      >
        <TextField
          type="email"
          disabled={verificationValues.isVerificationCodeSent}
          sx={
            verificationValues.isVerificationCodeSent
              ? { backgroundColor: "#bdbdbd" }
              : null
          }
          error={errors.email}
          helperText={errors.email ? "올바른 이메일 형식이 아닙니다." : ""}
          name="email"
          variant="outlined"
          value={formValues.email}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  disabled={
                    formValues.email &&
                    !errors.email &&
                    !verificationValues.isVerificationCodeSent
                      ? false
                      : true
                  }
                  variant={"contained"}
                  onClick={handleSubmitEmailAuthentication}
                >
                  보내기
                </Button>
              </InputAdornment>
            ),
          }}
        />
        {verificationValues.isVerificationCodeSent ? (
          <TextField
            sx={{
              mt: "15px",
              ...(verificationValues.isVerified
                ? { backgroundColor: "#bdbdbd" }
                : null),
            }}
            disabled={verificationValues.isVerified}
            type="password"
            name="verificationCode"
            variant="outlined"
            value={verificationValues.verificationCode}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    disabled={verificationValues.isVerified}
                    variant={"contained"}
                    onClick={handleSubmitverificationCode}
                  >
                    확인
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        ) : null}
      </AuthFormItem>

      <AuthFormItem
        title={"비밀번호"}
        subtitle="비밀번호는 영문,숫자,특수기호 조합 8자리 이상이어야 합니다."
      >
        <TextField
          error={errors.password}
          helperText={errors.password ? "올바른 비밀번호 형식이 아닙니다." : ""}
          type="password"
          name="password"
          variant="outlined"
          value={formValues.password}
          onChange={handleInputChange}
        />
      </AuthFormItem>

      <AuthFormItem title={"비밀번호 확인"}>
        <TextField
          error={errors.confirmPassword}
          helperText={
            errors.confirmPassword ? "비밀번호가 일치하지 않습니다." : ""
          }
          type="password"
          name="confirmPassword"
          variant="outlined"
          value={formValues.confirmPassword}
          onChange={handleInputChange}
        />
      </AuthFormItem>

      <Button
        variant="contained"
        disabled={
          formValues.email &&
          formValues.password &&
          formValues.confirmPassword &&
          !errors.email &&
          !errors.password &&
          !errors.confirmPassword &&
          verificationValues.isVerified
            ? false
            : true
        }
        type="submit"
      >
        회원가입하기
      </Button>
    </S.Wrapper>
  );
}
